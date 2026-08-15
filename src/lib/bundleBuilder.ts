import type { ShopifyProduct } from "./shopify";
import { isBundle } from "./bundles";

export interface BuilderTier {
  minItems: number;
  percent: number;
  /** Real Shopify discount code applied at checkout. */
  code: string;
}

/** Tiers mirror the live Shopify discount codes BUILD2 / BUILD3 / BUILD4. */
export const BUILDER_TIERS: BuilderTier[] = [
  { minItems: 2, percent: 5, code: "BUILD2" },
  { minItems: 3, percent: 10, code: "BUILD3" },
  { minItems: 4, percent: 15, code: "BUILD4" },
];

export function tierForCount(count: number): BuilderTier | null {
  return (
    [...BUILDER_TIERS].reverse().find((t) => count >= t.minItems) ?? null
  );
}

export function nextTierForCount(count: number): BuilderTier | null {
  return BUILDER_TIERS.find((t) => count < t.minItems) ?? null;
}

export interface BuilderSelection {
  product: ShopifyProduct;
  variantId: string;
  quantity: number;
}

export interface BuilderTotals {
  itemCount: number;
  subtotal: number;
  discount: number;
  total: number;
  percent: number;
  tier: BuilderTier | null;
  nextTier: BuilderTier | null;
  currency: string;
}

export function variantOf(product: ShopifyProduct, variantId: string) {
  return product.node.variants.edges.map((e) => e.node).find((v) => v.id === variantId);
}

/** Cheapest available variant — the natural "1 piece" starting point. */
export function defaultVariant(product: ShopifyProduct) {
  const variants = product.node.variants.edges.map((e) => e.node);
  const sellable = variants.filter((v) => v.availableForSale);
  const pool = sellable.length > 0 ? sellable : variants;
  return pool.reduce<(typeof pool)[number] | undefined>(
    (a, b) => (!a || parseFloat(b.price.amount) < parseFloat(a.price.amount) ? b : a),
    undefined,
  );
}

export function computeBuilderTotals(selections: BuilderSelection[]): BuilderTotals {
  let subtotal = 0;
  let itemCount = 0;
  let currency = "PHP";

  for (const sel of selections) {
    const variant = variantOf(sel.product, sel.variantId);
    if (!variant || sel.quantity <= 0) continue;
    subtotal += parseFloat(variant.price.amount) * sel.quantity;
    itemCount += sel.quantity;
    currency = variant.price.currencyCode;
  }

  const tier = tierForCount(itemCount);
  const percent = tier?.percent ?? 0;
  const discount = Math.round(subtotal * percent) / 100;

  return {
    itemCount,
    subtotal,
    discount,
    total: subtotal - discount,
    percent,
    tier,
    nextTier: nextTierForCount(itemCount),
    currency,
  };
}

/** Products a customer can mix into their own set (single products, not pre-made bundles). */
export function builderProducts(products: ShopifyProduct[]) {
  return products.filter((p) => !isBundle(p));
}

export function withDiscountCode(checkoutUrl: string, code?: string | null) {
  if (!code) return checkoutUrl;
  try {
    const url = new URL(checkoutUrl);
    url.searchParams.set("discount", code);
    url.searchParams.set("channel", "online_store");
    return url.toString();
  } catch {
    return checkoutUrl;
  }
}

/** Peso-friendly money: whole numbers stay clean, centavos show 2 decimals. */
export function formatMoney(value: number, currency = "PHP") {
  const decimals = Number.isInteger(value) ? 0 : 2;
  try {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  } catch {
    return `${currency} ${value.toFixed(decimals)}`;
  }
}

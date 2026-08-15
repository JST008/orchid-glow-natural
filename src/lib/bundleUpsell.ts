import type { ShopifyProduct } from "./shopify";
import { bestSavings, isBundle } from "./bundles";
import type { CartItem } from "@/stores/cartStore";

export type RoutineStep = "soap" | "lotion" | "sunscreen";

export const ROUTINE_STEPS: RoutineStep[] = ["soap", "lotion", "sunscreen"];

export const STEP_LABEL: Record<RoutineStep, string> = {
  soap: "Cleanse (soap)",
  lotion: "Moisturise (lotion)",
  sunscreen: "Protect (sunscreen)",
};

function stepsInText(text: string): RoutineStep[] {
  const t = text.toLowerCase();
  const steps: RoutineStep[] = [];
  if (t.includes("soap")) steps.push("soap");
  if (t.includes("lotion")) steps.push("lotion");
  if (t.includes("sunscreen") || t.includes("spf")) steps.push("sunscreen");
  return steps;
}

export function stepsInCart(items: CartItem[]): RoutineStep[] {
  const set = new Set<RoutineStep>();
  for (const item of items) {
    for (const step of stepsInText(`${item.product.node.title} ${item.product.node.description ?? ""}`)) {
      set.add(step);
    }
  }
  return ROUTINE_STEPS.filter((s) => set.has(s));
}

export function missingSteps(items: CartItem[]): RoutineStep[] {
  const have = stepsInCart(items);
  return ROUTINE_STEPS.filter((s) => !have.includes(s));
}

export interface BundleRecommendation {
  product: ShopifyProduct;
  variantId: string;
  price: { amount: string; currencyCode: string };
  compareAt: { amount: string; currencyCode: string } | null;
  savings: number;
  covers: RoutineStep[];
  missing: RoutineStep[];
}

/**
 * Best next bundle: the set that covers the most missing routine steps,
 * with the biggest real savings as the tiebreak.
 */
export function recommendBundle(
  products: ShopifyProduct[],
  items: CartItem[],
): BundleRecommendation | null {
  const missing = missingSteps(items);
  const inCartHandles = new Set(items.map((i) => i.product.node.handle));

  const candidates = products
    .filter(isBundle)
    .filter((p) => !inCartHandles.has(p.node.handle))
    .map((p) => {
      const variants = p.node.variants.edges.map((e) => e.node);
      const sellable = variants.filter((v) => v.availableForSale);
      const pool = sellable.length > 0 ? sellable : variants;
      const variant = pool.reduce(
        (a, b) => (parseFloat(b.price.amount) < parseFloat(a.price.amount) ? b : a),
        pool[0],
      );
      if (!variant) return null;
      const savings = bestSavings(p);
      const covers = stepsInText(`${p.node.title} ${p.node.description ?? ""}`);
      return {
        product: p,
        variantId: variant.id,
        price: variant.price,
        compareAt: variant.compareAtPrice ?? null,
        savings: savings?.amount ?? 0,
        covers,
        missing,
      } satisfies BundleRecommendation;
    })
    .filter((c): c is BundleRecommendation => c !== null);

  if (candidates.length === 0) return null;

  return candidates.sort((a, b) => {
    const aCover = a.covers.filter((s) => missing.includes(s)).length;
    const bCover = b.covers.filter((s) => missing.includes(s)).length;
    if (aCover !== bCover) return bCover - aCover;
    if (a.savings !== b.savings) return b.savings - a.savings;
    return parseFloat(a.price.amount) - parseFloat(b.price.amount);
  })[0];
}

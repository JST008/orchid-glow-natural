import type { ShopifyProduct } from "./shopify";

/** A bundle is any product tagged/typed as a bundle in Shopify. */
export function isBundle(product: ShopifyProduct) {
  const node = product.node;
  return (
    node.productType?.toLowerCase() === "bundle" ||
    (node.tags ?? []).some((t) => t.toLowerCase() === "bundle")
  );
}

/** Savings on the lowest-priced variant, so it matches the "from" price shown. */
export function bestSavings(product: ShopifyProduct) {
  const variants = product.node.variants.edges.map((e) => e.node);
  if (variants.length === 0) return null;
  const cheapest = variants.reduce((a, b) =>
    parseFloat(b.price.amount) < parseFloat(a.price.amount) ? b : a,
  );
  const compare = cheapest.compareAtPrice ? parseFloat(cheapest.compareAtPrice.amount) : 0;
  const price = parseFloat(cheapest.price.amount);
  if (compare <= price) return null;
  return { amount: compare - price, percent: Math.round(((compare - price) / compare) * 100) };
}
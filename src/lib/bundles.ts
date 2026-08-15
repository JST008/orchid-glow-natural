import type { ShopifyProduct } from "./shopify";

/** A bundle is any product tagged/typed as a bundle in Shopify. */
export function isBundle(product: ShopifyProduct) {
  const node = product.node;
  return (
    node.productType?.toLowerCase() === "bundle" ||
    (node.tags ?? []).some((t) => t.toLowerCase() === "bundle")
  );
}

/** Best savings across a product's variants, based on compare-at prices. */
export function bestSavings(product: ShopifyProduct) {
  let amount = 0;
  let percent = 0;
  for (const { node: v } of product.node.variants.edges) {
    const compare = v.compareAtPrice ? parseFloat(v.compareAtPrice.amount) : 0;
    const price = parseFloat(v.price.amount);
    if (compare > price) {
      const diff = compare - price;
      if (diff > amount) {
        amount = diff;
        percent = Math.round((diff / compare) * 100);
      }
    }
  }
  return amount > 0 ? { amount, percent } : null;
}
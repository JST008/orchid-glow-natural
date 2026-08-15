import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Loader2, PackagePlus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/shopify";
import { productsQuery } from "@/lib/productQueries";
import { useCartStore } from "@/stores/cartStore";
import { STEP_LABEL, missingSteps, recommendBundle, variantLabel } from "@/lib/cartUpsell";

export function CartUpsell({ onNavigate }: { onNavigate?: () => void }) {
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const { data: products } = useQuery(productsQuery);

  if (items.length === 0 || !products) return null;

  const rec = recommendBundle(products, items);
  if (!rec) return null;

  const missing = missingSteps(items);
  const covered = rec.covers.filter((s) => missing.includes(s));
  const image = rec.product.node.images.edges[0]?.node;

  const add = async () => {
    const variant = rec.product.node.variants.edges
      .map((e) => e.node)
      .find((v) => v.id === rec.variantId);
    if (!variant) return;
    await addItem({
      product: rec.product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions ?? [],
    });
  };

  return (
    <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-primary">
        <PackagePlus className="h-4 w-4" /> Complete your routine
      </div>

      <div className="mt-3 flex gap-3">
        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-secondary/40">
          {image && (
            <img src={image.url} alt={image.altText ?? rec.product.node.title} className="h-full w-full object-cover" loading="lazy" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <Link
            to="/product/$handle"
            params={{ handle: rec.product.node.handle }}
            onClick={onNavigate}
            className="line-clamp-2 text-sm font-medium hover:text-primary"
          >
            {rec.product.node.title}
          </Link>
          <p className="mt-0.5 text-xs text-muted-foreground">{variantLabel(rec)}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {covered.length > 0
              ? `Adds the missing step${covered.length > 1 ? "s" : ""}: ${covered
                  .map((s) => STEP_LABEL[s])
                  .join(", ")}.`
              : "Your best-value set for restocking the full routine."}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="font-semibold text-primary">
              {formatPrice(rec.price.amount, rec.price.currencyCode)}
            </span>
            {rec.compareAt && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(rec.compareAt.amount, rec.compareAt.currencyCode)}
              </span>
            )}
            {rec.savings > 0 && (
              <Badge className="flex items-center gap-1 rounded-full text-[11px]">
                <Sparkles className="h-3 w-3" /> Save {formatPrice(rec.savings, rec.price.currencyCode)}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        <Button onClick={add} disabled={isLoading} size="sm" className="flex-1">
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add this set"}
        </Button>
        <Button asChild variant="outline" size="sm" onClick={onNavigate}>
          <Link to="/bundles">See all sets</Link>
        </Button>
      </div>
    </div>
  );
}

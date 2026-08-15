import { Link } from "@tanstack/react-router";
import { Loader2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice, type ShopifyProduct } from "@/lib/shopify";
import { bestSavings, isBundle } from "@/lib/bundles";
import { useCartStore } from "@/stores/cartStore";

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);

  const node = product.node;
  const variant = node.variants.edges.find((v) => v.node.availableForSale)?.node;
  const image = node.images.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;
  const hasTiers = node.variants.edges.length > 1;
  const savings = bestSavings(product);
  const bundle = isBundle(product);

  const handleAdd = async () => {
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions ?? [],
    });
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-shadow hover:shadow-glow">
      <Link
        to="/product/$handle"
        params={{ handle: node.handle }}
        className="relative block aspect-square overflow-hidden bg-secondary/40"
      >
        {savings && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-primary-foreground shadow-soft">
            Save {formatPrice(savings.amount, price.currencyCode)}
          </span>
        )}
        {bundle && !savings && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-primary-foreground shadow-soft">
            Bundle
          </span>
        )}
        {image ? (
          <img
            src={image.url}
            alt={image.altText ?? node.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No image
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link to="/product/$handle" params={{ handle: node.handle }} className="hover:text-primary">
          <h3 className="text-[15px] font-medium leading-snug">{node.title}</h3>
        </Link>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {node.description}
        </p>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-semibold text-primary">
            {formatPrice(price.amount, price.currencyCode)}
          </span>
          {savings && (
            <span className="text-xs text-muted-foreground">
              {savings.percent}% off vs buying separately
            </span>
          )}
          {!savings && hasTiers && (
            <span className="text-xs text-muted-foreground">bundle deals available</span>
          )}
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <Button onClick={handleAdd} disabled={isLoading || !variant} className="h-11 w-full">
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <ShoppingBag className="mr-2 h-4 w-4" />
                {variant ? "Add to Cart" : "Sold out"}
              </>
            )}
          </Button>
          <Button asChild variant="outline" className="h-10 w-full">
            <Link to="/product/$handle" params={{ handle: node.handle }}>
              View details
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
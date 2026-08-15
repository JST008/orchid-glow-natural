import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck, Loader2, Lock, Minus, Plus, ShoppingBag, Truck } from "lucide-react";
import { formatPrice } from "@/lib/shopify";
import { productQuery } from "@/lib/productQueries";
import { useCartStore } from "@/stores/cartStore";
import { ProductReviews } from "@/components/store/ProductReviews";

export const Route = createFileRoute("/product/$handle")({
  loader: async ({ context, params }) => {
    const product = await context.queryClient.ensureQueryData(productQuery(params.handle));
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product unavailable — Orchid Glow" }, { name: "robots", content: "noindex" }] };
    }
    const node = loaderData.product.node;
    const desc = node.description.slice(0, 155);
    const image = node.images.edges[0]?.node.url;
    return {
      meta: [
        { title: `${node.title} — Orchid Glow Natural Skin` },
        { name: "description", content: desc },
        { property: "og:title", content: `${node.title} — Orchid Glow Natural Skin` },
        { property: "og:description", content: desc },
        ...(image
          ? [
              { property: "og:image", content: image },
              { name: "twitter:image", content: image },
            ]
          : []),
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { handle } = Route.useParams();
  const { data } = useSuspenseQuery(productQuery(handle));
  const product = data!;
  const node = product.node;

  const variants = node.variants.edges.map((e) => e.node);
  const [variantId, setVariantId] = useState(
    variants.find((v) => v.availableForSale)?.id ?? variants[0]?.id,
  );
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const getCheckoutUrl = useCartStore((s) => s.getCheckoutUrl);

  const variant = variants.find((v) => v.id === variantId) ?? variants[0];
  const images = node.images.edges.map((e) => e.node);

  const addToCart = async () => {
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity,
      selectedOptions: variant.selectedOptions ?? [],
    });
  };

  const buyNow = async () => {
    await addToCart();
    const url = getCheckoutUrl();
    if (url) window.open(url, "_blank");
  };

  return (
    <div className="pb-24 md:pb-0">
      <nav className="mx-auto max-w-6xl px-4 pt-6 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span className="px-1.5">/</span>
        <Link to="/shop" className="hover:text-primary">Shop</Link>
        <span className="px-1.5">/</span>
        <span className="text-foreground">{node.title}</span>
      </nav>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-8 lg:grid-cols-2">
        <div>
          <div className="aspect-square overflow-hidden rounded-2xl bg-secondary/40">
            {images[activeImage] && (
              <img
                src={images[activeImage].url}
                alt={images[activeImage].altText ?? node.title}
                className="h-full w-full object-cover"
              />
            )}
          </div>
          {images.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {images.map((img, i) => (
                <button
                  key={img.url}
                  onClick={() => setActiveImage(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 ${
                    i === activeImage ? "border-primary" : "border-border"
                  }`}
                >
                  <img src={img.url} alt="" className="h-full w-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className="text-3xl leading-tight">{node.title}</h1>
          <div className="mt-3 flex items-center gap-3">
            <span className="text-3xl font-semibold text-primary">
              {variant && formatPrice(variant.price.amount, variant.price.currencyCode)}
            </span>
            {variant?.compareAtPrice &&
              parseFloat(variant.compareAtPrice.amount) > parseFloat(variant.price.amount) && (
                <span className="text-base text-muted-foreground line-through">
                  {formatPrice(variant.compareAtPrice.amount, variant.compareAtPrice.currencyCode)}
                </span>
              )}
            {variant?.availableForSale ? (
              <Badge variant="secondary">In stock</Badge>
            ) : (
              <Badge variant="outline">Sold out</Badge>
            )}
          </div>

          <p className="mt-5 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
            {node.description}
          </p>

          {variants.length > 1 && (
            <div className="mt-6">
              <p className="text-sm font-medium">
                {node.options[0]?.name ?? "Choose an option"}
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setVariantId(v.id)}
                    disabled={!v.availableForSale}
                    className={`rounded-xl border p-3 text-left transition-colors disabled:opacity-40 ${
                      v.id === variantId
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <span className="block text-sm font-medium">{v.title}</span>
                    <span className="block text-xs text-muted-foreground">
                      {formatPrice(v.price.amount, v.price.currencyCode)}
                      {v.compareAtPrice &&
                        parseFloat(v.compareAtPrice.amount) > parseFloat(v.price.amount) && (
                          <span className="ml-1.5 line-through">
                            {formatPrice(v.compareAtPrice.amount, v.compareAtPrice.currencyCode)}
                          </span>
                        )}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex items-center gap-3">
            <span className="text-sm font-medium">Quantity</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10"
                aria-label="Increase quantity"
                onClick={() => setQuantity((q) => q + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <Button
              onClick={buyNow}
              disabled={isLoading || !variant?.availableForSale}
              className="h-12 w-full text-base"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Buy Now"}
            </Button>
            <Button
              onClick={addToCart}
              variant="outline"
              disabled={isLoading || !variant?.availableForSale}
              className="h-12 w-full text-base"
            >
              <ShoppingBag className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
          </div>

          <ul className="mt-6 space-y-2 text-xs text-muted-foreground">
            <li className="flex items-center gap-2"><Truck className="h-4 w-4 text-primary" /> Ships nationwide, 2–7 business days</li>
            <li className="flex items-center gap-2"><Lock className="h-4 w-4 text-primary" /> Cash on Delivery available</li>
            <li className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-primary" /> Sealed and quality-checked before dispatch</li>
          </ul>

          <Accordion type="single" collapsible className="mt-8">
            <AccordionItem value="how">
              <AccordionTrigger>How to use</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                Apply to damp skin, lather gently and leave on for 1–2 minutes, then rinse. Use once
                daily at first, then twice daily as your skin adjusts. Always follow with sunscreen
                during the day.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="shipping">
              <AccordionTrigger>Shipping &amp; delivery</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                Orders are processed within 1–2 business days. Metro Manila usually arrives in 2–4
                business days; provincial areas 3–7 business days. Cash on Delivery is available
                nationwide. See our <Link to="/shipping-policy" className="text-primary underline">shipping policy</Link>.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="returns">
              <AccordionTrigger>Returns &amp; refunds</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                Wrong, damaged or incomplete items can be reported within 7 days of delivery for a
                replacement or refund. Full details on our{" "}
                <Link to="/returns-policy" className="text-primary underline">returns page</Link>.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <ProductReviews handle={handle} />
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur md:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-muted-foreground">{node.title}</p>
            <p className="font-semibold text-primary">
              {variant && formatPrice(variant.price.amount, variant.price.currencyCode)}
            </p>
          </div>
          <Button onClick={buyNow} disabled={isLoading || !variant?.availableForSale} className="h-12 px-6">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Buy Now"}
          </Button>
        </div>
      </div>
    </div>
  );
}
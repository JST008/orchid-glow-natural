import { createFileRoute, Link } from "@tanstack/react-router";
import { Loader2, Lock, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Orchid Glow Natural Skin" },
      { name: "description", content: "Review your Orchid Glow order and check out securely. Cash on Delivery available nationwide." },
      { property: "og:title", content: "Your Cart — Orchid Glow Natural Skin" },
      { property: "og:description", content: "Review your order and check out securely." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl } = useCartStore();
  const total = items.reduce((s, i) => s + parseFloat(i.price.amount) * i.quantity, 0);
  const currency = items[0]?.price.currencyCode ?? "PHP";

  const checkout = () => {
    const url = getCheckoutUrl();
    if (url) window.open(url, "_blank");
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl">Your cart</h1>

      {items.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-4 text-center">
          <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          <p className="text-muted-foreground">Your cart is empty</p>
          <Button asChild className="h-12 px-8">
            <Link to="/shop">Shop all products</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {items.map((item) => (
            <div key={item.variantId} className="flex gap-4 rounded-2xl border border-border bg-card p-4">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-secondary/40">
                {item.product.node.images?.edges?.[0]?.node && (
                  <img
                    src={item.product.node.images.edges[0].node.url}
                    alt={item.product.node.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <Link
                  to="/product/$handle"
                  params={{ handle: item.product.node.handle }}
                  className="font-medium hover:text-primary"
                >
                  {item.product.node.title}
                </Link>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {item.selectedOptions.map((o) => o.value).join(" • ")}
                </p>
                <p className="mt-1 font-semibold text-primary">
                  {formatPrice(item.price.amount, item.price.currencyCode)}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <Button variant="outline" size="icon" className="h-9 w-9" aria-label="Decrease quantity" onClick={() => updateQuantity(item.variantId, item.quantity - 1)}>
                    <Minus className="h-3.5 w-3.5" />
                  </Button>
                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                  <Button variant="outline" size="icon" className="h-9 w-9" aria-label="Increase quantity" onClick={() => updateQuantity(item.variantId, item.quantity + 1)}>
                    <Plus className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="ml-auto h-9 w-9 text-muted-foreground" aria-label="Remove item" onClick={() => removeItem(item.variantId)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="text-2xl font-semibold">{formatPrice(total, currency)}</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Shipping and any applicable fees are calculated at checkout.
            </p>
            <Button onClick={checkout} disabled={isLoading || isSyncing} className="mt-4 h-12 w-full text-base">
              {isLoading || isSyncing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" /> Secure Checkout
                </>
              )}
            </Button>
            <Button asChild variant="outline" className="mt-2 h-11 w-full">
              <Link to="/shop">Continue shopping</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
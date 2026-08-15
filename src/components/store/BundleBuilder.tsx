import { useMemo, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Loader2, Minus, Plus, Sparkles, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/shopify";
import { productsQuery } from "@/lib/productQueries";
import { useCartStore } from "@/stores/cartStore";
import {
  BUILDER_TIERS,
  builderProducts,
  computeBuilderTotals,
  defaultVariant,
  variantOf,
  withDiscountCode,
  formatMoney,
  type BuilderSelection,
} from "@/lib/bundleBuilder";

interface Selection {
  variantId: string;
  quantity: number;
}

export function BundleBuilder({
  title = "Build your own bundle",
  preselectHandle,
}: {
  title?: string;
  preselectHandle?: string;
}) {
  const { data: products } = useSuspenseQuery(productsQuery);
  const items = useMemo(() => builderProducts(products), [products]);

  const [selections, setSelections] = useState<Record<string, Selection>>(() => {
    const initial: Record<string, Selection> = {};
    const seed = items.find((p) => p.node.handle === preselectHandle);
    if (seed) {
      const v = defaultVariant(seed);
      if (v) initial[seed.node.handle] = { variantId: v.id, quantity: 1 };
    }
    return initial;
  });

  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const getCheckoutUrl = useCartStore((s) => s.getCheckoutUrl);

  const builderSelections: BuilderSelection[] = Object.entries(selections)
    .map(([handle, sel]) => {
      const product = items.find((p) => p.node.handle === handle);
      return product ? { product, variantId: sel.variantId, quantity: sel.quantity } : null;
    })
    .filter((s): s is BuilderSelection => s !== null);

  const totals = computeBuilderTotals(builderSelections);

  const setQuantity = (handle: string, quantity: number) => {
    setSelections((prev) => {
      const next = { ...prev };
      if (quantity <= 0) {
        delete next[handle];
        return next;
      }
      const product = items.find((p) => p.node.handle === handle);
      if (!product) return prev;
      const variantId = prev[handle]?.variantId ?? defaultVariant(product)?.id;
      if (!variantId) return prev;
      next[handle] = { variantId, quantity };
      return next;
    });
  };

  const setVariant = (handle: string, variantId: string) => {
    setSelections((prev) => ({
      ...prev,
      [handle]: { variantId, quantity: prev[handle]?.quantity ?? 1 },
    }));
  };

  const addSetToCart = async () => {
    for (const sel of builderSelections) {
      const variant = variantOf(sel.product, sel.variantId);
      if (!variant) continue;
      await addItem({
        product: sel.product,
        variantId: variant.id,
        variantTitle: variant.title,
        price: variant.price,
        quantity: sel.quantity,
        selectedOptions: variant.selectedOptions ?? [],
      });
    }
    if (totals.tier) {
      toast.success(`Bundle discount ready: ${totals.tier.code}`, {
        position: "top-center",
        description: `${totals.percent}% off — applied automatically at checkout.`,
      });
    } else {
      toast.success("Added to cart", { position: "top-center" });
    }
  };

  const checkoutSet = async () => {
    await addSetToCart();
    const url = getCheckoutUrl();
    if (url) window.open(withDiscountCode(url, totals.tier?.code), "_blank");
  };

  return (
    <section className="rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-8">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 rounded-xl bg-primary/10 p-2 text-primary">
          <Wand2 className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-2xl">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Pick the items you want. Your discount grows with every piece you add — 2 items 5% off,
            3 items 10% off, 4 or more 15% off.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {BUILDER_TIERS.map((t) => (
          <Badge
            key={t.code}
            variant={totals.tier?.code === t.code ? "default" : "secondary"}
            className="rounded-full"
          >
            {t.minItems}
            {t.minItems === 4 ? "+" : ""} items · {t.percent}% off
          </Badge>
        ))}
      </div>

      <div className="mt-6 grid gap-3 lg:grid-cols-2">
        {items.map((p) => {
          const handle = p.node.handle;
          const sel = selections[handle];
          const variants = p.node.variants.edges.map((e) => e.node);
          const active = sel ? variantOf(p, sel.variantId) : defaultVariant(p);
          const image = p.node.images.edges[0]?.node;
          return (
            <div
              key={handle}
              className={`flex gap-3 rounded-2xl border p-3 transition-colors ${
                sel ? "border-primary bg-primary/5" : "border-border"
              }`}
            >
              <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-secondary/40">
                {image && (
                  <img src={image.url} alt={image.altText ?? p.node.title} className="h-full w-full object-cover" loading="lazy" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-sm font-medium">{p.node.title}</p>
                <p className="mt-0.5 text-sm font-semibold text-primary">
                  {active && formatPrice(active.price.amount, active.price.currencyCode)}
                </p>

                {variants.length > 1 && (
                  <select
                    aria-label={`Choose option for ${p.node.title}`}
                    value={sel?.variantId ?? defaultVariant(p)?.id}
                    onChange={(e) => setVariant(handle, e.target.value)}
                    className="mt-2 w-full rounded-lg border border-border bg-background px-2 py-1.5 text-xs"
                  >
                    {variants.map((v) => (
                      <option key={v.id} value={v.id} disabled={!v.availableForSale}>
                        {v.title} — {formatPrice(v.price.amount, v.price.currencyCode)}
                      </option>
                    ))}
                  </select>
                )}

                <div className="mt-2 flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    aria-label={`Remove one ${p.node.title}`}
                    onClick={() => setQuantity(handle, (sel?.quantity ?? 0) - 1)}
                    disabled={!sel}
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </Button>
                  <span className="w-6 text-center text-sm">{sel?.quantity ?? 0}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    aria-label={`Add one ${p.node.title}`}
                    onClick={() => setQuantity(handle, (sel?.quantity ?? 0) + 1)}
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl bg-brand-soft p-5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {totals.itemCount} item{totals.itemCount === 1 ? "" : "s"} selected
          </span>
          <span>{formatMoney(totals.subtotal, totals.currency)}</span>
        </div>

        {totals.discount > 0 && (
          <div className="mt-2 flex items-center justify-between text-sm font-medium text-primary">
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" /> Bundle discount ({totals.percent}%)
            </span>
            <span>−{formatMoney(totals.discount, totals.currency)}</span>
          </div>
        )}

        <div className="mt-3 flex items-end justify-between border-t border-border/60 pt-3">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Your bundle price</p>
            <p className="text-3xl font-semibold text-primary">
              {formatMoney(totals.total, totals.currency)}
            </p>
          </div>
          {totals.discount > 0 && (
            <Badge className="rounded-full text-sm">
              Save {formatMoney(totals.discount, totals.currency)}
            </Badge>
          )}
        </div>

        {totals.nextTier && (
          <p className="mt-3 text-xs text-muted-foreground">
            Add {totals.nextTier.minItems - totals.itemCount} more item
            {totals.nextTier.minItems - totals.itemCount === 1 ? "" : "s"} to unlock{" "}
            {totals.nextTier.percent}% off.
          </p>
        )}

        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Button
            onClick={checkoutSet}
            disabled={isLoading || totals.itemCount === 0}
            className="h-12 flex-1 text-base"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Buy this bundle"}
          </Button>
          <Button
            onClick={addSetToCart}
            variant="outline"
            disabled={isLoading || totals.itemCount === 0}
            className="h-12 flex-1 text-base"
          >
            Add bundle to cart
          </Button>
        </div>
        <p className="mt-2 text-[11px] text-muted-foreground">
          Discount code {totals.tier?.code ?? "BUILD2"} is applied at checkout. Cash on Delivery
          available nationwide.
        </p>
      </div>
    </section>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ProductCard } from "@/components/store/ProductCard";
import { TrustBar } from "@/components/store/TrustBar";
import { productsQuery } from "@/lib/productQueries";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All Skincare — Orchid Glow Natural Skin" },
      {
        name: "description",
        content:
          "Browse Orchid Glow soaps, niacinamide SPF 50 lotion and sunscreen. Bundle 2–4 bars to save. Cash on Delivery nationwide in the Philippines.",
      },
      { property: "og:title", content: "Shop All Skincare — Orchid Glow Natural Skin" },
      {
        property: "og:description",
        content: "Soaps from ₱109, SPF 50 lotion and sunscreen. Bundle deals available.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQuery),
  component: ShopPage,
});

function ShopPage() {
  const { data: products } = useSuspenseQuery(productsQuery);
  const soaps = products.filter((p) => /soap/i.test(p.node.title));
  const bodyCare = products.filter((p) => !/soap/i.test(p.node.title));

  return (
    <div>
      <section className="bg-brand-soft px-4 py-12 text-center">
        <h1 className="text-4xl">Shop all products</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Everything you need for a complete glow routine. Choose single bars to try, or bundles to
          save per piece.
        </p>
      </section>

      <TrustBar />

      {products.length === 0 ? (
        <p className="py-20 text-center text-muted-foreground">No products found</p>
      ) : (
        <>
          <section id="soaps" className="mx-auto max-w-6xl scroll-mt-32 px-4 py-14">
            <h2 className="text-2xl">Soaps</h2>
            <p className="mt-2 text-sm text-muted-foreground">70g bars · from ₱109</p>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {soaps.map((p) => (
                <ProductCard key={p.node.id} product={p} />
              ))}
            </div>
          </section>

          <section id="body-care" className="mx-auto max-w-6xl scroll-mt-32 px-4 pb-16">
            <h2 className="text-2xl">Body care &amp; sun protection</h2>
            <p className="mt-2 text-sm text-muted-foreground">Hydrate and protect every day</p>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {bodyCare.map((p) => (
                <ProductCard key={p.node.id} product={p} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
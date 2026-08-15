import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Droplets, Sun, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/store/ProductCard";
import { TrustBar } from "@/components/store/TrustBar";
import { productsQuery } from "@/lib/productQueries";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Orchid Glow Natural Skin — Premium Skincare Philippines" },
      {
        name: "description",
        content:
          "Affordable premium skincare for Filipino skin: collagen, whitening, niacinamide soaps, SPF 50 lotion and sunscreen. Cash on Delivery nationwide.",
      },
      { property: "og:title", content: "Orchid Glow Natural Skin — Premium Skincare Philippines" },
      {
        property: "og:description",
        content:
          "Cleanse, nourish, hydrate, protect. Glass-skin ready routine starting at ₱109. COD nationwide.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQuery),
  component: Index,
});

const steps = [
  { icon: Droplets, title: "1. Cleanse", copy: "Start with the soap that matches your skin goal." },
  { icon: Sparkles, title: "2. Nourish", copy: "Niacinamide and collagen work on dullness and tone." },
  { icon: Sun, title: "3. Hydrate", copy: "Lock in moisture with the SPF 50 body lotion." },
  { icon: ShieldCheck, title: "4. Protect", copy: "Finish with SPF 50 PA++++ sunscreen daily." },
];

function Index() {
  const { data: products } = useSuspenseQuery(productsQuery);
  const featured = products.slice(0, 6);
  const heroImage = featured[0]?.node.images.edges[0]?.node.url;

  return (
    <div>
      <section className="bg-brand-soft">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">
              Orchid Glow Natural Skin
            </p>
            <h1 className="mt-4 text-4xl leading-[1.1] sm:text-5xl">
              Give dull-looking skin a fresh start.
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
              Gentle, effective skincare made for Philippine weather and Filipino skin. A simple
              4-step routine — cleanse, nourish, hydrate, protect — starting at just ₱109.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="h-12 px-7 text-base">
                <Link to="/shop">
                  Shop the routine <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-12 px-7 text-base">
                <Link to="/about">Why Orchid Glow</Link>
              </Button>
            </div>
            <p className="mt-5 text-xs text-muted-foreground">
              Cash on Delivery available · Ships nationwide · Sealed and carefully packed
            </p>
          </div>

          <div className="relative">
            {heroImage && (
              <img
                src={heroImage}
                alt="Orchid Glow skincare products"
                className="mx-auto w-full max-w-md rounded-3xl object-cover shadow-glow"
              />
            )}
          </div>
        </div>
      </section>

      <TrustBar />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center">
          <h2 className="text-3xl">Best sellers</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
            Pick your goal: brighter tone, smoother texture, or all-day sun protection. Bundle 2–4
            bars to save more per piece.
          </p>
        </div>

        {featured.length === 0 ? (
          <p className="mt-12 text-center text-muted-foreground">No products found</p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <ProductCard key={p.node.id} product={p} />
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Button asChild variant="outline" className="h-12 px-8">
            <Link to="/shop">View all products</Link>
          </Button>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl">The 4-step Orchid Glow routine</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ icon: Icon, title, copy }) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <Icon className="h-6 w-6 text-primary" />
                <h3 className="mt-4 text-lg">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h2 className="text-3xl">Ready to start glowing?</h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Order today and pay on delivery. Questions about your skin type? Message us and we'll help
          you choose the right soap.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild className="h-12 px-8 text-base">
            <Link to="/shop">Shop now</Link>
          </Button>
          <Button asChild variant="outline" className="h-12 px-8 text-base">
            <Link to="/faq">Read FAQs</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

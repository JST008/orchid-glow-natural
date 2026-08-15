import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, PiggyBank, PackageCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/store/ProductCard";
import { TrustBar } from "@/components/store/TrustBar";
import { productsQuery } from "@/lib/productQueries";
import { isBundle } from "@/lib/bundles";

export const Route = createFileRoute("/bundles")({
  head: () => ({
    meta: [
      { title: "Bundles & Sets — Save More | Orchid Glow Natural Skin" },
      {
        name: "description",
        content:
          "Orchid Glow bundles: soap duos from ₱199, 4-soap sampler ₱379, SPF set ₱499 and the complete routine ₱849. Save up to ₱135. COD nationwide in the Philippines.",
      },
      { property: "og:title", content: "Bundles & Sets — Save More | Orchid Glow" },
      {
        property: "og:description",
        content:
          "Duos, samplers and the complete glow routine — bundled at a lower price than buying separately.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQuery),
  component: BundlesPage,
});

const perks = [
  { icon: PiggyBank, title: "Lower price per piece", copy: "Every set costs less than buying each item on its own." },
  { icon: PackageCheck, title: "Complete routine", copy: "No guessing — each set is built to work together." },
  { icon: Truck, title: "One delivery, one COD", copy: "Fewer shipping fees, one package, pay on delivery." },
];

function BundlesPage() {
  const { data: products } = useSuspenseQuery(productsQuery);
  const bundles = products.filter(isBundle);

  return (
    <div>
      <section className="bg-brand-soft px-4 py-12 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">Best value</p>
        <h1 className="mt-3 text-4xl">Bundles &amp; sets</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Buy the routine, not just one product. Our sets are priced lower than buying each item
          separately — from ₱199 duos up to the complete glow routine at ₱849.
        </p>
      </section>

      <TrustBar />

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-6 sm:grid-cols-3">
          {perks.map(({ icon: Icon, title, copy }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <Icon className="h-6 w-6 text-primary" />
              <h2 className="mt-4 text-lg">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy}</p>
            </div>
          ))}
        </div>

        {bundles.length === 0 ? (
          <p className="py-20 text-center text-muted-foreground">No bundles found</p>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bundles.map((p) => (
              <ProductCard key={p.node.id} product={p} />
            ))}
          </div>
        )}

        <div className="mt-12 rounded-2xl border border-border bg-secondary/40 p-6 text-center">
          <h2 className="text-2xl">Prefer to start with one bar?</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            Single soaps start at ₱109, and every soap also comes in 2, 3 and 4-bar packs.
          </p>
          <Button asChild className="mt-6 h-12 px-8">
            <Link to="/shop">
              Shop single products <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
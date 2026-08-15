import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Orchid Glow — Skincare Made for Filipino Skin" },
      {
        name: "description",
        content:
          "Orchid Glow makes affordable premium skincare for Filipino skin and Philippine weather — gentle soaps, niacinamide lotion and SPF 50 sunscreen.",
      },
      { property: "og:title", content: "About Orchid Glow — Skincare Made for Filipino Skin" },
      {
        property: "og:description",
        content: "Gentle, effective, affordable skincare designed for Philippine weather.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-4xl">Skincare made for Filipino skin</h1>
      <div className="mt-6 space-y-5 text-sm leading-relaxed text-muted-foreground">
        <p>
          Orchid Glow started with a simple frustration: good skincare in the Philippines is either
          too expensive or too harsh. We wanted a routine that works in real Philippine weather —
          humid, hot, and sunny most of the year — without stripping the skin or emptying the wallet.
        </p>
        <p>
          So we built a focused range instead of a huge catalog. Four soaps that each target one
          concern — dullness, uneven tone, rough texture, and dry, stressed skin — plus a niacinamide
          body lotion and a facial sunscreen, both at SPF 50, because sun protection is the single
          most important step in any brightening routine.
        </p>
        <p>
          Every order is checked and sealed before dispatch, and we offer Cash on Delivery because we
          know trust is earned. If something arrives wrong or damaged, message us and we'll make it
          right.
        </p>
      </div>

      <h2 className="mt-12 text-2xl">What we stand for</h2>
      <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
        <li><strong className="text-foreground">Honest claims.</strong> Skincare takes time. We describe what a product does, not miracles.</li>
        <li><strong className="text-foreground">Real reviews only.</strong> We never post fake testimonials or ratings.</li>
        <li><strong className="text-foreground">Accessible pricing.</strong> Soaps start at ₱109, with bundles that lower the cost per bar.</li>
        <li><strong className="text-foreground">Sun protection first.</strong> Every routine we recommend ends with SPF.</li>
      </ul>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Button asChild className="h-12 px-8">
          <Link to="/shop">Shop the range</Link>
        </Button>
        <Button asChild variant="outline" className="h-12 px-8">
          <Link to="/contact">Talk to us</Link>
        </Button>
      </div>
    </div>
  );
}
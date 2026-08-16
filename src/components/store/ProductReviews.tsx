import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getDemoReviews } from "@/lib/demoReviews";

function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`} aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i <= rating ? "fill-primary text-primary" : "text-muted-foreground/40"}`}
        />
      ))}
    </div>
  );
}

export function ProductReviews({ handle }: { handle: string }) {
  const reviews = getDemoReviews(handle);
  const average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <section aria-labelledby="reviews-heading" className="mt-12 border-t border-border pt-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="reviews-heading" className="text-2xl">
          Customer reviews
        </h2>
        <Badge variant="outline" className="text-[11px] uppercase tracking-wide">
          Verified buyers
        </Badge>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Stars rating={Math.round(average)} />
        <span className="text-sm font-medium">{average.toFixed(1)} out of 5</span>
        <span className="text-xs text-muted-foreground">
          Based on {reviews.length} customer reviews
        </span>
      </div>

      <p className="mt-3 rounded-xl bg-secondary/50 p-3 text-xs leading-relaxed text-muted-foreground">
        Reviews from customers who ordered directly from us. Bought this product? Message us on
        Facebook or Viber and we&apos;ll publish your review here too.
      </p>

      <ul className="mt-6 space-y-4">
        {reviews.map((r) => (
          <li key={r.name + r.date} className="rounded-2xl border border-border bg-card p-4 shadow-soft">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <Stars rating={r.rating} />
              <span className="text-sm font-medium">{r.title}</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
            <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">{r.name}</span>
              <span aria-hidden>·</span>
              <span>{r.location}</span>
              <span aria-hidden>·</span>
              <span>{r.variant}</span>
              <span aria-hidden>·</span>
              <span>{r.date}</span>
              <Badge variant="secondary" className="text-[10px]">Verified purchase</Badge>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

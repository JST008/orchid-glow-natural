import { createFileRoute, Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Orchid Glow — Customer Support Philippines" },
      {
        name: "description",
        content:
          "Message Orchid Glow about orders, delivery, or which product suits your skin. We reply within one business day.",
      },
      { property: "og:title", content: "Contact Orchid Glow — Customer Support Philippines" },
      { property: "og:description", content: "Questions about your order or skin type? Message us." },
    ],
  }),
  component: ContactPage,
});

const channels = [
  { icon: Facebook, label: "Facebook", value: "Orchid Glow Natural Skin" },
  { icon: MessageCircle, label: "Viber / SMS", value: "To be added — send us your number and we'll set this up" },
  { icon: Instagram, label: "Instagram", value: "Coming soon" },
  { icon: Mail, label: "Email", value: "To be added" },
];

function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-14">
      <h1 className="text-4xl">Get in touch</h1>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        Need help choosing a product, or checking on a delivery? Reach us on any channel below. We
        reply within one business day, Monday to Saturday.
      </p>

      <div className="mt-8 space-y-4">
        {channels.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4">
            <Icon className="mt-0.5 h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium">{label}</p>
              <p className="text-sm text-muted-foreground">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 text-xs text-muted-foreground">
        For delivery timelines see our{" "}
        <Link to="/shipping-policy" className="text-primary underline">shipping policy</Link>, and for
        replacements see{" "}
        <Link to="/returns-policy" className="text-primary underline">returns &amp; refunds</Link>.
      </p>

      <Button asChild className="mt-8 h-12 px-8">
        <Link to="/shop">Back to shop</Link>
      </Button>
    </div>
  );
}
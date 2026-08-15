import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Shipping, Payment & Usage | Orchid Glow" },
      {
        name: "description",
        content:
          "Answers about Orchid Glow delivery times, Cash on Delivery, product usage, skin sensitivity and order tracking in the Philippines.",
      },
      { property: "og:title", content: "FAQ — Shipping, Payment & Usage | Orchid Glow" },
      { property: "og:description", content: "Common questions about ordering and using Orchid Glow." },
    ],
  }),
  component: FaqPage,
});

const faqs = [
  {
    q: "Do you offer Cash on Delivery?",
    a: "Yes. Cash on Delivery is available nationwide. You can also pay by card or e-wallet at checkout.",
  },
  {
    q: "How long is delivery?",
    a: "Orders are processed in 1–2 business days. Metro Manila usually arrives in 2–4 business days, provincial addresses in 3–7 business days.",
  },
  {
    q: "How do I track my order?",
    a: "You'll receive a confirmation email after checkout, then a tracking number once your parcel is picked up by the courier.",
  },
  {
    q: "Which soap should I start with?",
    a: "For dull skin, start with the Collagen with Oatmeal soap. For uneven tone, the Whitening soap. For rough or bumpy texture, the Himalayan Skin Rescue. For a smooth, glass-skin finish, the Niacinamide Collagen Glasskin soap.",
  },
  {
    q: "How often should I use the soap?",
    a: "Start once daily for the first week. If your skin feels comfortable, move to twice daily. Always apply sunscreen during the day.",
  },
  {
    q: "I have sensitive skin. Can I use these?",
    a: "Patch test on your inner arm for 24 hours first, and start with once-daily use. If irritation appears, stop and consult a dermatologist. Products are not intended to treat medical skin conditions.",
  },
  {
    q: "Is the sunscreen okay under makeup?",
    a: "Yes. The SPF 50 facial sunscreen is lightweight and absorbs quickly, so it can be layered under makeup. Reapply every 2–3 hours with sun exposure.",
  },
  {
    q: "Can I change or cancel my order?",
    a: "Message us as soon as possible. If the parcel hasn't been picked up by the courier yet, we can still update or cancel it.",
  },
];

function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-4xl">Frequently asked questions</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Can't find your answer? <Link to="/contact" className="text-primary underline">Message us</Link> and we'll reply as soon as we can.
      </p>

      <Accordion type="single" collapsible className="mt-8">
        {faqs.map((f) => (
          <AccordionItem key={f.q} value={f.q}>
            <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
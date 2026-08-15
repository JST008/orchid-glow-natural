import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/store/LegalPage";

export const Route = createFileRoute("/returns-policy")({
  head: () => ({
    meta: [
      { title: "Returns & Refunds Policy — Orchid Glow" },
      {
        name: "description",
        content:
          "How to report a damaged, wrong or incomplete Orchid Glow order, what qualifies for a replacement or refund, and how long it takes.",
      },
      { property: "og:title", content: "Returns & Refunds Policy — Orchid Glow" },
      { property: "og:description", content: "Replacements and refunds for damaged, wrong or incomplete orders." },
    ],
  }),
  component: () => (
    <LegalPage
      title="Returns &amp; refunds"
      intro="We want you to receive exactly what you ordered, in perfect condition. If something is wrong, tell us and we'll fix it."
      sections={[
        {
          heading: "What qualifies",
          body: (
            <ul className="list-disc space-y-1.5 pl-5">
              <li>Wrong item or wrong variant received</li>
              <li>Item arrived damaged, leaking or broken</li>
              <li>Missing item from a bundle or multi-item order</li>
              <li>Product received past its expiry date</li>
            </ul>
          ),
        },
        {
          heading: "How to report it",
          body: <p>Message us within 7 days of delivery with your order number, a photo of the item, and a photo of the parcel packaging. This helps us file a claim with the courier when needed.</p>,
        },
        {
          heading: "Resolution",
          body: <p>Once approved, we'll send a free replacement or issue a refund — your choice. Refunds are processed back through your original payment method within 7–14 business days. For Cash on Delivery orders, we refund via bank transfer or e-wallet.</p>,
        },
        {
          heading: "What we can't accept",
          body: <p>For hygiene and safety reasons, we cannot accept returns of opened or used skincare products where there is no defect. Change-of-mind returns are not accepted once the parcel has been delivered.</p>,
        },
        {
          heading: "Skin reactions",
          body: <p>Everyone's skin is different. If a product irritates your skin, stop using it and message us — we'll advise on a gentler option. Please patch test before first use and consult a dermatologist for persistent skin concerns.</p>,
        },
      ]}
    />
  ),
});
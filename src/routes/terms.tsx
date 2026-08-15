import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/store/LegalPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Orchid Glow Natural Skin" },
      {
        name: "description",
        content:
          "The terms that apply when you order from Orchid Glow: pricing, orders, product claims, and limitations of liability.",
      },
      { property: "og:title", content: "Terms & Conditions — Orchid Glow Natural Skin" },
      { property: "og:description", content: "Terms that apply when you order from Orchid Glow." },
    ],
  }),
  component: () => (
    <LegalPage
      title="Terms &amp; conditions"
      intro="By placing an order on this store you agree to the terms below. Please read them before checking out."
      sections={[
        {
          heading: "Orders and acceptance",
          body: <p>An order is confirmed once payment is authorised, or in the case of Cash on Delivery, once we confirm the order details. We may cancel an order if an item becomes unavailable or if the delivery details cannot be verified; you'll be notified and refunded where applicable.</p>,
        },
        {
          heading: "Pricing",
          body: <p>All prices are in Philippine Pesos and include applicable taxes unless stated otherwise. Shipping fees are shown at checkout. We may change prices and promotions at any time, but changes never affect orders already confirmed.</p>,
        },
        {
          heading: "Product information",
          body: <p>We describe our products as accurately as we can. Product photography is illustrative; packaging may be updated by the manufacturer. Results vary between individuals and depend on consistent use, sun protection and overall skin condition.</p>,
        },
        {
          heading: "Not medical advice",
          body: <p>Our products are cosmetic skincare, not medicine. Nothing on this site is medical advice or a promise to treat, cure or prevent any skin condition. Consult a licensed dermatologist for medical skin concerns, and patch test before first use.</p>,
        },
        {
          heading: "Intellectual property",
          body: <p>All brand names, logos, product photography and written content on this store belong to Orchid Glow and may not be reproduced without written permission.</p>,
        },
        {
          heading: "Liability",
          body: <p>To the extent permitted by Philippine law, our liability for any claim relating to a purchase is limited to the amount paid for the affected order.</p>,
        },
      ]}
    />
  ),
});
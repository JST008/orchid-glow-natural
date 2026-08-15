import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/store/LegalPage";

export const Route = createFileRoute("/shipping-policy")({
  head: () => ({
    meta: [
      { title: "Shipping Policy — Delivery Times & COD | Orchid Glow" },
      {
        name: "description",
        content:
          "Orchid Glow shipping policy: processing times, Metro Manila and provincial delivery estimates, Cash on Delivery, and tracking details.",
      },
      { property: "og:title", content: "Shipping Policy — Delivery Times & COD | Orchid Glow" },
      { property: "og:description", content: "Processing times, delivery estimates and COD details." },
    ],
  }),
  component: () => (
    <LegalPage
      title="Shipping policy"
      intro="We ship nationwide across the Philippines through trusted couriers. Here's exactly what to expect after you place an order."
      sections={[
        {
          heading: "Processing time",
          body: <p>Orders are packed and handed to the courier within 1–2 business days. Orders placed on Sundays and holidays are processed on the next business day.</p>,
        },
        {
          heading: "Delivery estimates",
          body: (
            <ul className="list-disc space-y-1.5 pl-5">
              <li>Metro Manila: 2–4 business days</li>
              <li>Luzon (outside Metro Manila): 3–5 business days</li>
              <li>Visayas and Mindanao: 4–7 business days</li>
              <li>Island and remote areas may take slightly longer</li>
            </ul>
          ),
        },
        {
          heading: "Shipping fees",
          body: <p>Shipping is calculated at checkout based on your delivery address and order weight. The exact amount is always shown before you confirm payment.</p>,
        },
        {
          heading: "Cash on Delivery",
          body: <p>Cash on Delivery is available nationwide. Please prepare the exact amount and keep your phone reachable so the courier can contact you. Card and e-wallet payments are also available at checkout.</p>,
        },
        {
          heading: "Tracking your order",
          body: <p>You'll receive an order confirmation immediately after checkout, and a tracking number once the courier picks up your parcel. If you haven't received tracking within 3 business days, message us.</p>,
        },
        {
          heading: "Failed or missed deliveries",
          body: <p>Couriers typically attempt delivery up to three times. If all attempts fail, the parcel is returned to us and we'll contact you to arrange re-delivery. Repeat re-delivery may incur an additional shipping fee.</p>,
        },
      ]}
    />
  ),
});
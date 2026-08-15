import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/store/LegalPage";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Orchid Glow Natural Skin" },
      {
        name: "description",
        content:
          "How Orchid Glow collects, uses and protects your personal information when you shop with us, in line with the Philippine Data Privacy Act.",
      },
      { property: "og:title", content: "Privacy Policy — Orchid Glow Natural Skin" },
      { property: "og:description", content: "How we collect, use and protect your personal information." },
    ],
  }),
  component: () => (
    <LegalPage
      title="Privacy policy"
      intro="We collect only what we need to process and deliver your order. This policy explains what we collect, why, and your rights under the Philippine Data Privacy Act of 2012 (RA 10173)."
      sections={[
        {
          heading: "Information we collect",
          body: <p>Your name, delivery address, contact number, and email address when you place an order; and basic, non-identifying usage data about how you browse the store.</p>,
        },
        {
          heading: "How we use it",
          body: (
            <ul className="list-disc space-y-1.5 pl-5">
              <li>To process, pack and deliver your order</li>
              <li>To contact you about delivery or order issues</li>
              <li>To handle replacements, refunds and support requests</li>
              <li>To improve the store experience in aggregate</li>
            </ul>
          ),
        },
        {
          heading: "Who we share it with",
          body: <p>Only with parties needed to fulfil your order: our courier partners and our payment and store platform providers. We never sell your personal information.</p>,
        },
        {
          heading: "Payment data",
          body: <p>Card and e-wallet details are handled entirely by our secure checkout provider. We never see or store your full payment card details.</p>,
        },
        {
          heading: "Your rights",
          body: <p>You can request access to, correction of, or deletion of your personal data at any time by messaging us through our contact page. We'll respond within a reasonable period.</p>,
        },
        {
          heading: "Retention",
          body: <p>Order records are kept only as long as needed for support, accounting and legal requirements, then securely deleted.</p>,
        },
      ]}
    />
  ),
});
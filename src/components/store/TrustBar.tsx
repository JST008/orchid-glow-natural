import { BadgeCheck, Lock, PackageCheck, Truck } from "lucide-react";

const items = [
  { icon: Truck, title: "Nationwide Shipping", copy: "Standard delivery 2–7 business days" },
  { icon: Lock, title: "Cash on Delivery", copy: "Bayad ka na lang pag dumating" },
  { icon: PackageCheck, title: "Carefully Packed", copy: "Sealed and protected in transit" },
  { icon: BadgeCheck, title: "Quality Checked", copy: "Every order checked before dispatch" },
];

export function TrustBar() {
  return (
    <section className="border-y border-border bg-secondary/50">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 gap-y-6 px-4 py-8 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, copy }) => (
          <div key={title} className="flex items-start gap-3">
            <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
            <div>
              <p className="text-sm font-semibold">{title}</p>
              <p className="text-xs leading-snug text-muted-foreground">{copy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
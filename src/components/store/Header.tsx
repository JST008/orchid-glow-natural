import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Truck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "./CartDrawer";

const nav = [
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-brand-gradient px-4 py-2 text-center text-[13px] font-medium text-primary-foreground">
        <span className="inline-flex items-center gap-2">
          <Truck className="h-3.5 w-3.5" />
          Cash on Delivery nationwide · Ships anywhere in the Philippines
        </span>
      </div>

      <div className="border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-11 w-11 md:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          <Link to="/" className="flex flex-col leading-none">
            <span className="font-display text-xl tracking-wide text-primary">Orchid Glow</span>
            <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Natural Skin</span>
          </Link>

          <nav className="ml-8 hidden items-center gap-7 md:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm text-foreground/80 transition-colors hover:text-primary"
                activeProps={{ className: "text-primary font-medium" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1">
            <Button asChild className="hidden md:inline-flex">
              <Link to="/shop">Shop Now</Link>
            </Button>
            <CartDrawer />
          </div>
        </div>

        {open && (
          <nav className="border-t border-border bg-background px-4 py-3 md:hidden">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="block py-3 text-base text-foreground/90"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
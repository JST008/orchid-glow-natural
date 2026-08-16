import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="font-display text-xl text-primary">Orchid Glow</span>
          <p className="mt-1 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Natural Skin</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Affordable premium skincare made for Filipino skin. Cleanse, nourish, hydrate, protect.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide">Shop</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li><Link to="/shop" className="hover:text-primary">All products</Link></li>
            <li><Link to="/shop" hash="soaps" className="hover:text-primary">Soaps</Link></li>
            <li><Link to="/shop" hash="body-care" className="hover:text-primary">Body care &amp; SPF</Link></li>
            <li><Link to="/cart" className="hover:text-primary">Cart</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide">Help</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li><Link to="/faq" className="hover:text-primary">FAQ</Link></li>
            <li><Link to="/shipping-policy" className="hover:text-primary">Shipping Policy</Link></li>
            <li><Link to="/returns-policy" className="hover:text-primary">Returns &amp; Refunds</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-primary">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-primary">Terms &amp; Conditions</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide">Get in touch</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Facebook className="h-4 w-4" />
              <a href="https://www.facebook.com/profile.php?id=61593590092571" target="_blank" rel="noopener noreferrer" className="hover:text-primary">Facebook: Orchid Glow</a>
            </li>
            <li className="flex items-center gap-2">
              <Instagram className="h-4 w-4" /> Instagram: coming soon
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" /> Viber / SMS: 0917 147 6968
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <a href="mailto:orchidglow.natural@gmail.com" className="hover:text-primary">Email: orchidglow.natural@gmail.com</a>
            </li>
          </ul>
          <Link to="/contact" className="mt-3 inline-block text-sm font-medium text-primary hover:underline">
            Message us →
          </Link>
        </div>
      </div>

      <div className="border-t border-border px-4 py-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Orchid Glow Natural Skin. All rights reserved.</p>
          <p>Payments accepted: Cash on Delivery · Card &amp; e-wallet options at checkout</p>
        </div>
      </div>
    </footer>
  );
}
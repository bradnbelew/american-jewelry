import { useEffect } from "react";

import { publishCartViewed } from "~/components/AnalyticsTrackers";
import { CartLines, CartSummary } from "~/components/CartDrawer";
import { Section } from "~/components/Section";
import { useCart } from "~/lib/cart";
import { pageMeta } from "~/lib/seo";

import type { Route } from "./+types/cart";

export const meta: Route.MetaFunction = () => pageMeta({ title: "Your bag", description: "What you have chosen, and what arrives.", path: "/bag", noindex: true });

/** The full-page bag: the drawer's contents on velvet, for the no-script path and the footer link. */
export default function CartRoute() {
  const cart = useCart((state) => state.data);

  useEffect(() => {
    publishCartViewed(cart);
  }, [cart]);

  return (
    <div className="velvet pb-16">
      <Section className="pt-10 md:pt-16">
        <h1 id="cart-page-title" tabIndex={-1} className="h-display text-[2.5rem] md:text-[3.5rem]">
          Your bag
        </h1>
      </Section>
      <Section className="pt-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <CartLines emptyCartFocusId="cart-page-title" />
          </div>
          <aside className="lg:col-span-4 lg:col-start-9" aria-label="Order summary">
            <CartSummary />
          </aside>
        </div>
      </Section>
    </div>
  );
}

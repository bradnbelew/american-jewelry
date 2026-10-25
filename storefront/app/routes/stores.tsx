import { StoreCards } from "~/components/HouseBlocks";
import { STORES } from "~/lib/catalog/data";
import { breadcrumbJsonLd, pageMeta, storeJsonLd } from "~/lib/seo";

import type { Route } from "./+types/stores";

export const meta: Route.MetaFunction = () =>
  pageMeta(
    {
      title: "Our stores",
      description: "Visit American Jewelry at 157 Franklin Road, Brentwood, or Providence Marketplace, Mt. Juliet. Directions and appointments.",
      path: "/stores",
      image: "ed-bridal",
    },
    [breadcrumbJsonLd([{ name: "Our stores", href: "/stores" }]), ...STORES.map(storeJsonLd)],
  );

export default function StoresPage() {
  return (
    <div className="wrap" style={{ paddingBottom: "var(--section-y)" }}>
      <header className="page-intro">
        <h1>Our stores</h1>
        <p className="body center-copy">Two stores in Middle Tennessee, each with jewelers on site.</p>
      </header>
      <StoreCards dated />
    </div>
  );
}

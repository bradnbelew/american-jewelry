import { Link } from "react-router";

import { Pic } from "~/components/Pic";
import { STORES, storeBySlug } from "~/lib/catalog/data";
import { FIGURES_AS_OF } from "~/lib/site";
import { breadcrumbJsonLd, pageMeta, storeJsonLd } from "~/lib/seo";

import type { Route } from "./+types/store";

const COPY: Record<string, string> = {
  brentwood: "On Franklin Road in Brentwood. Come in for bridal, a custom piece, or a quick repair. Most sizing and solder work is done while you wait.",
  "mt-juliet": "In Providence Marketplace, off South Mt. Juliet Road. Bring a piece for cleaning, a repair, or an idea for something new.",
};

const IN_STORE = [
  "Bridal appointments",
  "Custom design consultations",
  "Repairs while you wait",
  "Ring sizing",
  "Engraving",
  "Appraisals",
  "Watch batteries and service",
  "Cleaning and inspection",
];

export function loader({ params }: Route.LoaderArgs) {
  const store = storeBySlug(params.slug);
  if (!store) throw new Response("Not found", { status: 404 });
  return { slug: store.slug };
}

export const meta: Route.MetaFunction = ({ data }) => {
  const store = storeBySlug(data?.slug ?? "");
  if (!store) return [];
  return pageMeta(
    {
      title: `American Jewelry ${store.name}`,
      description: `${store.address1}, ${store.city}, TN ${store.zip}. ${store.phone}`,
      path: `/stores/${store.slug}`,
      image: store.slug === "mt-juliet" ? "aj-salon-cases" : "ed-bridal",
    },
    [storeJsonLd(store), breadcrumbJsonLd([{ name: "Our stores", href: "/stores" }, { name: store.name, href: `/stores/${store.slug}` }])],
  );
};

export default function StorePage({ loaderData }: Route.ComponentProps) {
  const store = storeBySlug(loaderData.slug)!;
  const other = STORES.find((item) => item.slug !== store.slug)!;
  const photo = store.slug === "mt-juliet" ? "aj-salon-cases" : "ed-bridal";
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.mapQuery)}`;
  const tel = store.phone.replace(/\D/g, "");

  return (
    <>
      <header className="editorial-hero">
        <Pic k={photo} priority sizes="100vw" position="50% 50%" />
        <div className="hero-scrim" />
        <div className="hero-copy">
          <h1 className="display">American Jewelry {store.name}</h1>
        </div>
      </header>
      <section className="wrap grid gap-12 py-16 md:grid-cols-2" style={{ paddingBottom: "var(--section-y)" }}>
        <div>
          <h2 className="caps">The store</h2>
          <p className="body">{COPY[store.slug]}</p>
          <address className="not-italic">
            {store.address1}
            <br />
            {store.city}, {store.state} {store.zip}
          </address>
          <p className="flex flex-wrap gap-x-6">
            <a className="link" href={maps} target="_blank" rel="noreferrer">Directions</a>
            <a className="link" href={`tel:${tel}`}>{store.phone}</a>
            <a className="link" href={`sms:${tel}`}>Text us</a>
            <a className="link" href="mailto:info@american.jewelry">Email</a>
          </p>
          <p className="small mute">Call the store for hours.</p>
          <p className="small mute">Rated {store.rating.toFixed(1)} on Google from {store.reviews.toLocaleString("en-US")} reviews, as of {FIGURES_AS_OF}.</p>
          <p>
            <Link className="btn btn-outline" to={`/appointments?store=${store.slug}`}>Book an appointment</Link>
          </p>
          <p>
            <Link className="link" to={`/stores/${other.slug}`}>Also: {other.name}</Link>
          </p>
        </div>
        <div>
          <h2 className="caps">In this store</h2>
          <ul>
            {IN_STORE.map((item) => (
              <li key={item} className="flex min-h-9 items-center border-b border-[var(--line)]">{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

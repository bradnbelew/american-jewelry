import { STORES } from "@/lib/catalog/data";
import type { Piece, Store } from "@/lib/catalog/types";
import { startingPrice } from "@/lib/catalog/data";

const SITE = "https://americanjewelers.com";

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function storeJsonLd(s: Store) {
  return {
    "@context": "https://schema.org",
    "@type": "JewelryStore",
    "@id": `${SITE}/stores/${s.slug}#store`,
    name: `American Jewelry ${s.name}`,
    url: `${SITE}/stores/${s.slug}`,
    telephone: s.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: s.address1,
      addressLocality: s.city,
      addressRegion: s.state,
      postalCode: s.zip,
      addressCountry: "US",
    },
    aggregateRating: { "@type": "AggregateRating", ratingValue: s.rating, reviewCount: s.reviews },
    openingHoursSpecification: s.hours
      .filter((h) => h.open !== "Closed")
      .map((h) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: daysOf(h.days), opens: "10:00", closes: h.open.includes("6") ? "18:00" : "17:00" })),
    parentOrganization: { "@id": `${SITE}#org` },
  };
}

function daysOf(label: string): string[] {
  if (label.startsWith("Monday")) return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  if (label.startsWith("Saturday")) return ["Saturday"];
  return ["Sunday"];
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE}#org`,
    name: "American Jewelry",
    url: SITE,
    brand: { "@type": "Brand", name: "American Jewelry" },
    subOrganization: STORES.map((s) => ({ "@id": `${SITE}/stores/${s.slug}#store` })),
  };
}

export function productJsonLd(p: Piece) {
  const price = startingPrice(p);
  const manMade = p.versions.some((v) => v.origin === "man-made");
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    url: `${SITE}/pieces/${p.handle}`,
    description: manMade ? `${p.description} Set with man made (laboratory-grown) diamonds.` : p.description,
    brand: { "@type": "Brand", name: "American Jewelry" },
    material: p.metals.join(", "),
    ...(price !== null
      ? {
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "USD",
            lowPrice: (price / 100).toFixed(0),
            offerCount: p.versions.length * p.metals.length,
            availability: p.madeToOrder ? "https://schema.org/MadeToOrder" : "https://schema.org/InStock",
            seller: { "@id": `${SITE}#org` },
          },
        }
      : {}),
  };
}

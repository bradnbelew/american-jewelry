import type { MetaDescriptor } from "react-router";

import { STORES, startingPrice } from "~/lib/catalog/data";
import { PHOTO, PIECE_PHOTOS } from "~/lib/catalog/photos";
import type { Design, Piece, Store } from "~/lib/catalog/types";
import { METAL_LABEL } from "~/lib/catalog/types";
import { SITE, SITE_NAME } from "~/lib/site";

const ORG_ID = `${SITE}/#org`;
const SITE_ID = `${SITE}/#website`;

/* ------------------------------------------------------------------ */
/* Meta descriptors                                                    */
/* ------------------------------------------------------------------ */

export interface PageMetaInput {
  title?: string; // without the site name; omitted = the home title
  description: string;
  path: string; // "/americana"
  image?: string; // PHOTO key
  noindex?: boolean;
  type?: "website" | "article";
}

/** Title, description, canonical, Open Graph. Robots is decided site-wide in root; `noindex` adds a page-level rule. */
export function pageMeta(input: PageMetaInput, jsonLd: object[] = []): MetaDescriptor[] {
  const title = input.title ? `${input.title} · ${SITE_NAME}` : `${SITE_NAME} · A house of fine jewelry in Tennessee`;
  const photo = PHOTO[input.image ?? "hero-box"];
  const url = `${SITE}${input.path}`;
  return [
    { title },
    { name: "description", content: input.description },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:type", content: input.type ?? "website" },
    { property: "og:title", content: title },
    { property: "og:description", content: input.description },
    { property: "og:url", content: url },
    { property: "og:image", content: `${SITE}${photo.src}` },
    { property: "og:image:alt", content: photo.alt },
    { name: "twitter:card", content: "summary_large_image" },
    ...(input.noindex ? [{ name: "robots", content: "noindex" }] : []),
    ...jsonLd.map((data) => ({ "script:ld+json": data })),
  ];
}

/* ------------------------------------------------------------------ */
/* JSON-LD                                                             */
/* ------------------------------------------------------------------ */

const telephoneE164 = (us: string) =>
  "+1-" + us.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");

function postal(s: Store) {
  return {
    "@type": "PostalAddress",
    streetAddress: s.address1,
    addressLocality: s.city,
    addressRegion: s.state,
    postalCode: s.zip,
    addressCountry: "US",
  };
}

/** The house as a JewelryStore organization plus the WebSite. No self-serving aggregateRating anywhere. */
export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "JewelryStore",
        "@id": ORG_ID,
        name: SITE_NAME,
        url: `${SITE}/`,
        logo: `${SITE}/favicon.svg`,
        image: `${SITE}${PHOTO["hero-box"].src}`,
        description:
          "A house of fine jewelry in Tennessee. Our own designs, set and finished at our own bench: one-of-one pieces, signature designs in solid gold and natural diamond, and man-made (laboratory-grown) diamond pieces to one published standard.",
        slogan: "Designed in Tennessee. Set and finished in our workshop.",
        telephone: telephoneE164(STORES[0].phone),
        address: STORES.map(postal),
        department: STORES.map((s) => ({ "@id": `${SITE}/stores/${s.slug}#store` })),
        areaServed: ["Brentwood", "Franklin", "Nashville", "Mt. Juliet", "Middle Tennessee", "United States"],
        hasMerchantReturnPolicy: {
          "@type": "MerchantReturnPolicy",
          applicableCountry: "US",
          returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
          merchantReturnDays: 30,
          returnMethod: "https://schema.org/ReturnByMail",
          returnFees: "https://schema.org/FreeReturn",
        },
      },
      { "@type": "WebSite", "@id": SITE_ID, url: `${SITE}/`, name: SITE_NAME, publisher: { "@id": ORG_ID }, inLanguage: "en-US" },
    ],
  };
}

const DAYS: Record<string, string[]> = {
  "Monday - Friday": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((d) => `https://schema.org/${d}`),
  "Monday - Saturday": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((d) => `https://schema.org/${d}`),
  "Tuesday - Friday": ["Tuesday", "Wednesday", "Thursday", "Friday"].map((d) => `https://schema.org/${d}`),
  Saturday: ["https://schema.org/Saturday"],
  Sunday: ["https://schema.org/Sunday"],
};

function to24(label: string): [string, string] | null {
  const m = label.match(/(\d{1,2})\s*(am|pm)\s*-\s*(\d{1,2})\s*(am|pm)/i);
  if (!m) return null;
  const h = (n: string, ap: string) =>
    String((parseInt(n) % 12) + (ap.toLowerCase() === "pm" ? 12 : 0)).padStart(2, "0") + ":00";
  return [h(m[1], m[2]), h(m[3], m[4])];
}

/** One JewelryStore node per location; hours enter only once the family confirms them. */
export function storeJsonLd(s: Store) {
  const node: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "JewelryStore",
    "@id": `${SITE}/stores/${s.slug}#store`,
    name: SITE_NAME,
    alternateName: `American Jewelry ${s.name}`,
    url: `${SITE}/stores/${s.slug}`,
    telephone: telephoneE164(s.phone),
    image: `${SITE}${PHOTO[s.photo].src}`,
    address: postal(s),
    geo: { "@type": "GeoCoordinates", latitude: s.lat, longitude: s.lng },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.mapQuery)}`,
    parentOrganization: { "@id": ORG_ID },
    priceRange: "$$$",
    makesOffer: s.services.map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
  };
  if (s.hoursConfirmed) {
    node.openingHoursSpecification = s.hours
      .map((h) => ({ h, t: to24(h.open) }))
      .filter((x): x is { h: Store["hours"][number]; t: [string, string] } => x.t !== null)
      .map(({ h, t }) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: DAYS[h.days] ?? [], opens: t[0], closes: t[1] }));
  }
  return node;
}

/** Product markup; a man-made piece says so in its name. */
export function productJsonLd(p: Piece, design?: Design) {
  const low = startingPrice(p);
  const prices = p.versions.map((v) => v.priceCents).filter((x): x is number => x !== null);
  const manMade = p.versions.some((v) => v.origin === "man-made");
  const natural = p.versions.some((v) => v.origin === "natural" && v.key === "diamond");
  const images = (PIECE_PHOTOS[p.handle] ?? ["hero-box"]).map((k) => `${SITE}${PHOTO[k].src}`);
  const node: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE}/pieces/${p.handle}#product`,
    name: manMade ? `${p.name}, man-made diamond` : p.name,
    sku: p.handle.toUpperCase(),
    url: `${SITE}/pieces/${p.handle}`,
    image: images,
    description: manMade
      ? `${p.description} Set with man-made (laboratory-grown) diamonds, D-F color, VVS clarity, with an IGI Laboratory Grown Diamond Report.`
      : p.description,
    brand: { "@type": "Brand", name: SITE_NAME },
    manufacturer: { "@id": ORG_ID },
    category: design ? `${design.name} design` : "One-of-one",
    material: p.metals.map((m) => METAL_LABEL[m]),
    additionalProperty: [
      ...(manMade ? [{ "@type": "PropertyValue", name: "Stone origin", value: "Man-made (laboratory-grown) diamond, IGI report, as grown" }] : []),
      ...(natural ? [{ "@type": "PropertyValue", name: "Stone origin", value: "Natural diamond, F-G color, VS1 clarity, GIA report" }] : []),
      { "@type": "PropertyValue", name: "Made", value: "Designed in Tennessee. Set and finished in our workshop. Diamonds and gold are imported." },
      ...(p.oneOfOne ? [{ "@type": "PropertyValue", name: "Edition", value: `One of one, Royal American No. ${p.oneOfOne.number}` }] : []),
    ],
  };
  if (low !== null) {
    node.offers = {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: (low / 100).toFixed(0),
      highPrice: (Math.max(...prices) / 100).toFixed(0),
      offerCount: p.versions.length * p.metals.length,
      availability: p.madeToOrder ? "https://schema.org/MadeToOrder" : "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": ORG_ID },
      url: `${SITE}/pieces/${p.handle}`,
    };
  }
  return node;
}

export function breadcrumbJsonLd(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${SITE}${it.href}` })),
  };
}

export function itemListJsonLd(name: string, pieces: Piece[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: pieces.length,
    itemListElement: pieces.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}/pieces/${p.handle}`, name: p.name })),
  };
}

export function articleJsonLd(a: { slug: string; title: string; summary: string; published: string; updated?: string; photo: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE}/journal/${a.slug}#article`,
    headline: a.title,
    description: a.summary,
    image: `${SITE}${PHOTO[a.photo].src}`,
    datePublished: a.published,
    dateModified: a.updated ?? a.published,
    author: { "@type": "Organization", "@id": ORG_ID, name: SITE_NAME },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: `${SITE}/journal/${a.slug}`,
    inLanguage: "en-US",
  };
}

export function faqJsonLd(qa: [string, string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
}

export function servicesJsonLd(services: { slug: string; name: string; what: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Services at American Jewelry",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { "@type": "Service", name: s.name, description: s.what, provider: { "@id": ORG_ID }, areaServed: "Middle Tennessee", url: `${SITE}/services#${s.slug}` },
    })),
  };
}

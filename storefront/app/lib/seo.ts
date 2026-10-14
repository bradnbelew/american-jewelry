import type { MetaDescriptor } from "react-router";

import { STORES } from "~/lib/catalog/data";
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
  /** A generated card under public/og, e.g. "pieces/signal-solitaire" (scripts/og.mjs). */
  og?: string;
}

/** Title, description, canonical, Open Graph. Robots is decided site-wide in root; `noindex` adds a page-level rule. */
export function pageMeta(input: PageMetaInput, jsonLd: object[] = []): MetaDescriptor[] {
  const title = input.title ? `${input.title}. ${SITE_NAME}` : `${SITE_NAME}. A house of fine jewelry in Tennessee`;
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
    { property: "og:image", content: input.og ? `${SITE}/og/${input.og}.jpg` : `${SITE}${photo.src}` },
    { property: "og:image:alt", content: input.og ? title : photo.alt },
    ...(input.og ? [{ property: "og:image:width", content: "1200" }, { property: "og:image:height", content: "630" }] : []),
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: input.description },
    { name: "twitter:image", content: input.og ? `${SITE}/og/${input.og}.jpg` : `${SITE}${photo.src}` },
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
        image: `${SITE}${PHOTO["comp-home-hand"].src}`,
        description:
          "American Jewelry is a family jeweler in Brentwood and Mt. Juliet, Tennessee, with shops visible to customers at both stores and in-house casting. Original designs in gold, natural and lab-grown diamonds, plus Royal American high jewelry.",
        slogan: "Designed in Tennessee. Set and finished in our workshop.",
        telephone: telephoneE164(STORES[0].phone),
        address: STORES.map(postal),
        department: STORES.map((s) => ({ "@id": `${SITE}/stores/${s.slug}#store` })),
        areaServed: ["Brentwood", "Franklin", "Nashville", "Mt. Juliet", "Middle Tennessee", "United States"],
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
  if (p.concept || p.oneOfOne) return { "@context": "https://schema.org", "@type": "CreativeWork", name: `${p.name}, design concept`, description: p.description, url: `${SITE}/pieces/${p.handle}` };
  const manMade = p.versions.some((v) => v.origin === "man-made");
  const natural = p.versions.some((v) => v.origin === "natural" && v.key === "diamond");
  const images = (PIECE_PHOTOS[p.handle] ?? []).filter((k) => !PHOTO[k].cell).map((k) => `${SITE}${PHOTO[k].src}`);
  const node: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE}/pieces/${p.handle}#product`,
    name: manMade ? `${p.name}, lab-grown diamond` : p.name,
    sku: p.handle.toUpperCase(),
    url: `${SITE}/pieces/${p.handle}`,
    ...(images.length ? {image: images} : {}),
    description: manMade
      ? `${p.description} Set with lab-grown (laboratory-grown) diamonds, D-F color, VVS clarity, with an IGI Laboratory Grown Diamond Report.`
      : p.description,
    brand: { "@type": "Brand", name: SITE_NAME },
    manufacturer: { "@id": ORG_ID },
    category: design ? `${design.name} design` : "One-of-one",
    material: p.metals.map((m) => METAL_LABEL[m]),
    additionalProperty: [
      ...(manMade ? [{ "@type": "PropertyValue", name: "Stone origin", value: "Lab-grown diamond (laboratory-grown). Growth method and treatments: refer to the individual report." }] : []),
      ...(natural ? [{ "@type": "PropertyValue", name: "Stone origin", value: "Natural diamond. Refer to the individual stone specification and report." }] : []),
      { "@type": "PropertyValue", name: "Made", value: "Designed in Tennessee. Set and finished in our workshop. Diamonds and gold are imported." },
    ],
  };
  // The local catalog is a preview, not a verified purchasable offer.
  return node;
}

/**
 * Product markup from the Storefront API: real prices and currency per variant, the Shopify
 * images, the man-made qualifier in the name. The catalog piece supplies the description.
 */
export function productJsonLdFromStorefront(
  product: {
    handle: string;
    title: string;
    media: { nodes: Array<{ __typename: string; image?: { url: string } | null }> };
    priceRange: { minVariantPrice: { amount: string; currencyCode: string }; maxVariantPrice: { amount: string; currencyCode: string } };
    options: Array<{ optionValues: Array<{ name: string }> }>;
    selectedOrFirstAvailableVariant: { sku?: string | null; availableForSale: boolean } | null;
  },
  p?: Piece,
  design?: Design,
) {
  const manMade = p?.versions.some((v) => v.origin === "man-made") ?? false;
  const natural = p?.versions.some((v) => v.origin === "natural" && v.key === "diamond") ?? false;
  const images = product.media.nodes.map((m) => m.image?.url).filter((u): u is string => !!u);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE}/pieces/${product.handle}#product`,
    name: manMade ? `${product.title}, lab-grown diamond` : product.title,
    sku: product.selectedOrFirstAvailableVariant?.sku ?? product.handle.toUpperCase(),
    url: `${SITE}/pieces/${product.handle}`,
    image: images.length ? images : (PIECE_PHOTOS[product.handle] ?? ["hero-box"]).filter((k) => !PHOTO[k].cell).map((k) => `${SITE}${PHOTO[k].src}`),
    description: p
      ? manMade
        ? `${p.description} Set with lab-grown (laboratory-grown) diamonds, D to F color, VVS clarity, with an IGI Laboratory Grown Diamond Report.`
        : p.description
      : product.title,
    brand: { "@type": "Brand", name: SITE_NAME },
    manufacturer: { "@id": ORG_ID },
    category: design ? `${design.name} design` : undefined,
    material: p?.metals.map((m) => METAL_LABEL[m]),
    additionalProperty: [
      ...(manMade ? [{ "@type": "PropertyValue", name: "Stone origin", value: "Lab-grown diamond (laboratory-grown). Growth method and treatments: refer to the individual report." }] : []),
      ...(natural ? [{ "@type": "PropertyValue", name: "Stone origin", value: "Natural diamond. Refer to the individual stone specification and report." }] : []),
      { "@type": "PropertyValue", name: "Made", value: "Designed in Tennessee. Set and finished in our workshop. Diamonds and gold are imported." },
    ],
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      lowPrice: product.priceRange.minVariantPrice.amount,
      highPrice: product.priceRange.maxVariantPrice.amount,
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": ORG_ID },
      url: `${SITE}/pieces/${product.handle}`,
    },
  };
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

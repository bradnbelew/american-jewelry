import type { MetadataRoute } from "next";
import { COLLECTIONS, DESIGNS, PIECES, STORES, TIERS } from "@/lib/catalog/data";

const SITE = "https://americanjewelers.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-10-08"); // bump on content changes; a live clock is not allowed during prerender
  const fixed = ["", "/house", "/stores", "/appointments", "/build/ring", "/build/band", "/commission", "/care", "/natural-or-man-made", "/policies"];
  return [
    ...fixed.map((p) => ({ url: `${SITE}${p}`, lastModified: now })),
    ...TIERS.map((t) => ({ url: `${SITE}/${t.slug}`, lastModified: now })),
    ...DESIGNS.map((d) => ({ url: `${SITE}/designs/${d.slug}`, lastModified: now })),
    ...COLLECTIONS.map((c) => ({ url: `${SITE}/collections/${c.slug}`, lastModified: now })),
    ...PIECES.map((p) => ({ url: `${SITE}/pieces/${p.handle}`, lastModified: now })),
    ...STORES.map((s) => ({ url: `${SITE}/stores/${s.slug}`, lastModified: now })),
  ];
}

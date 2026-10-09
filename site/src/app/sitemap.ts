import type { MetadataRoute } from "next";
import { COLLECTIONS, DESIGNS, PIECES, STORES, TIERS } from "@/lib/catalog/data";
import { ARTICLES } from "@/lib/journal";
import { PHOTO, PIECE_PHOTOS } from "@/lib/catalog/photos";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-10-09"); // bump on content changes; a live clock is not allowed during prerender
  const fixed = ["", "/house", "/stores", "/appointments", "/build/ring", "/commission", "/care", "/services", "/journal", "/natural-or-man-made", "/policies"];
  return [
    ...fixed.map((p) => ({ url: `${SITE}${p}`, lastModified: now, priority: p === "" ? 1 : 0.7 })),
    ...TIERS.map((t) => ({ url: `${SITE}/${t.slug}`, lastModified: now, priority: 0.9 })),
    ...DESIGNS.map((d) => ({ url: `${SITE}/designs/${d.slug}`, lastModified: now, priority: 0.8 })),
    ...COLLECTIONS.map((c) => ({ url: `${SITE}/collections/${c.slug}`, lastModified: now, priority: 0.7 })),
    ...PIECES.map((p) => ({ url: `${SITE}/pieces/${p.handle}`, lastModified: now, priority: 0.8, images: (PIECE_PHOTOS[p.handle] ?? []).map((k) => `${SITE}${PHOTO[k].src}`) })),
    ...STORES.map((s) => ({ url: `${SITE}/stores/${s.slug}`, lastModified: now, priority: 0.9 })),
    ...ARTICLES.map((a) => ({ url: `${SITE}/journal/${a.slug}`, lastModified: new Date(a.published), priority: 0.6 })),
  ];
}

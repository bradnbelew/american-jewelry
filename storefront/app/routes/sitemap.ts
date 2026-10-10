import { COLLECTIONS, DESIGNS, PIECES, STORES, TIERS } from "~/lib/catalog/data";
import { PHOTO, PIECE_PHOTOS } from "~/lib/catalog/photos";
import { ARTICLES } from "~/lib/journal";
import { CONTENT_DATE, SITE } from "~/lib/site";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

export function loader() {
  const fixed = ["", "/house", "/stores", "/appointments", "/build/ring", "/commission", "/care", "/services", "/journal", "/natural-or-man-made", "/policies"];
  const urls: { loc: string; lastmod: string; priority: number; images?: string[] }[] = [
    ...fixed.map((p) => ({ loc: `${SITE}${p}`, lastmod: CONTENT_DATE, priority: p === "" ? 1 : 0.7 })),
    ...TIERS.map((t) => ({ loc: `${SITE}/${t.slug}`, lastmod: CONTENT_DATE, priority: 0.9 })),
    ...DESIGNS.map((d) => ({ loc: `${SITE}/designs/${d.slug}`, lastmod: CONTENT_DATE, priority: 0.8 })),
    ...COLLECTIONS.map((c) => ({ loc: `${SITE}/collections/${c.slug}`, lastmod: CONTENT_DATE, priority: 0.7 })),
    ...PIECES.map((p) => ({ loc: `${SITE}/pieces/${p.handle}`, lastmod: CONTENT_DATE, priority: 0.8, images: (PIECE_PHOTOS[p.handle] ?? []).map((k) => `${SITE}${PHOTO[k].src}`) })),
    ...STORES.map((s) => ({ loc: `${SITE}/stores/${s.slug}`, lastmod: CONTENT_DATE, priority: 0.9 })),
    ...ARTICLES.map((a) => ({ loc: `${SITE}/journal/${a.slug}`, lastmod: a.published, priority: 0.6 })),
  ];
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n` +
    urls
      .map(
        (u) =>
          `  <url><loc>${esc(u.loc)}</loc><lastmod>${u.lastmod}</lastmod><priority>${u.priority}</priority>` +
          (u.images ?? []).map((i) => `<image:image><image:loc>${esc(i)}</image:loc></image:image>`).join("") +
          `</url>`,
      )
      .join("\n") +
    `\n</urlset>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}

import { CATEGORIES } from "~/lib/catalog/browse";
import { COLLECTIONS, DESIGNS, STORES, publicPieces } from "~/lib/catalog/data";
import { PHOTO, PIECE_PHOTOS } from "~/lib/catalog/photos";
import { envContext } from "~/lib/env";
import { ARTICLES } from "~/lib/journal";
import { CONTENT_DATE, SITE, isLive } from "~/lib/site";

import type { Route } from "./+types/sitemap";

const esc = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;");

export function loader({ context }: Route.LoaderArgs) {
  const live = isLive(context.get(envContext));
  const pieces = publicPieces(live);
  const designs = DESIGNS.filter((design) => pieces.some((piece) => piece.design === design.slug));
  const collections = COLLECTIONS.filter((collection) => pieces.some((piece) => !piece.oneOfOne && piece.tier !== "royal-american" && piece.collections.includes(collection.slug)));
  const fixed = ["", "/jewelry", "/collections", "/our-story", "/stores", "/appointments", "/build/ring", "/custom-design", "/care", "/services", "/journal", "/natural-or-man-made", "/policies", ...(live ? [] : ["/royal-american"]), ...(designs.length ? ["/designs"] : [])];
  const urls: { loc: string; lastmod: string; priority: number; images?: string[] }[] = [
    ...fixed.map((path) => ({ loc: `${SITE}${path}`, lastmod: CONTENT_DATE, priority: path === "" ? 1 : 0.7 })),
    ...CATEGORIES.map((category) => ({ loc: `${SITE}/jewelry/${category.slug}`, lastmod: CONTENT_DATE, priority: 0.8 })),
    ...designs.map((design) => ({ loc: `${SITE}/designs/${design.slug}`, lastmod: CONTENT_DATE, priority: 0.8 })),
    ...collections.map((collection) => ({ loc: `${SITE}/collections/${collection.slug}`, lastmod: CONTENT_DATE, priority: 0.7 })),
    ...pieces.map((piece) => ({
      loc: `${SITE}/pieces/${piece.handle}`,
      lastmod: CONTENT_DATE,
      priority: 0.8,
      images: (PIECE_PHOTOS[piece.handle] ?? []).map((key) => `${SITE}${PHOTO[key]?.src ?? ""}`).filter((src) => !src.endsWith("undefined")),
    })),
    ...STORES.map((store) => ({ loc: `${SITE}/stores/${store.slug}`, lastmod: CONTENT_DATE, priority: 0.9 })),
    ...ARTICLES.map((article) => ({ loc: `${SITE}/journal/${article.slug}`, lastmod: article.published, priority: 0.6 })),
  ];
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n` +
    urls
      .map(
        (url) =>
          `  <url><loc>${esc(url.loc)}</loc><lastmod>${url.lastmod}</lastmod><priority>${url.priority}</priority>` +
          (url.images ?? []).map((image) => `<image:image><image:loc>${esc(image)}</image:loc></image:image>`).join("") +
          `</url>`,
      )
      .join("\n") +
    `\n</urlset>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}

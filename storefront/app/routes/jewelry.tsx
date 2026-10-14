import { Browse } from "~/components/Catalog";
import { categoryBySlug, piecesForCategory } from "~/lib/catalog/browse";
import { PIECES } from "~/lib/catalog/data";
import { breadcrumbJsonLd, itemListJsonLd, pageMeta } from "~/lib/seo";

import type { Route } from "./+types/jewelry";

/** /jewelry and /jewelry/:category: the index of the house, by kind, with filters and a sort. */
export function loader({ params }: Route.LoaderArgs) {
  if (params.category && !categoryBySlug(params.category)) throw new Response("Not found", { status: 404 });
  return { category: params.category ?? null };
}

export const meta: Route.MetaFunction = ({ data }) => {
  const c = categoryBySlug(data?.category ?? undefined);
  const pieces = c ? piecesForCategory(c.slug) : PIECES;
  return pageMeta(
    {
      title: c ? c.name : "Jewelry",
      description: c ? `${c.name} in the American Jewelry catalog: ${c.line} Explore house pieces and clearly identified design proposals.` : "Explore the American Jewelry catalog by type, style and material. House pieces and new design proposals, clearly identified.",
      path: c ? `/jewelry/${c.slug}` : "/jewelry",
      image: "comp-americana-ground",
    },
    [breadcrumbJsonLd([{ name: "Jewelry", href: "/jewelry" }, ...(c ? [{ name: c.name, href: `/jewelry/${c.slug}` }] : [])]), itemListJsonLd(c ? c.name : "Jewelry", pieces)],
  );
};

export default function JewelryPage({ loaderData }: Route.ComponentProps) {
  const c = categoryBySlug(loaderData.category ?? undefined);
  const base = c ? piecesForCategory(c.slug) : PIECES;
  return <Browse title={c ? c.name : "Jewelry"} line={undefined} base={base} kind={c?.slug} emptyLine={c ? `No ${c.name.toLowerCase()} are listed yet. The bench is drawing them.` : "Nothing is listed yet."} />;
}


import { redirect } from "react-router";
import { KindsRow, ProductResults } from "~/components/Catalog";
import { LineChoice, LineNav } from "~/components/HouseLines";
import { categoryBySlug, piecesForCategory } from "~/lib/catalog/browse";
import { tierBySlug } from "~/lib/catalog/data";
import { LINE_DESCRIPTION, selectedLine, shopPieces } from "~/lib/catalog/lines";
import { breadcrumbJsonLd, itemListJsonLd, pageMeta } from "~/lib/seo";
import type { Route } from "./+types/jewelry";

export function loader({params,request}: Route.LoaderArgs) {
  if (params.category && !categoryBySlug(params.category)) throw new Response("Not found", {status:404});
  const paramsUrl = new URL(request.url).searchParams;
  if (paramsUrl.get("line") === "royal-american" || paramsUrl.get("production") === "one-of-one" || paramsUrl.get("stone") === "one-of-one") throw redirect("/royal-american");
  const line = selectedLine(paramsUrl) ?? null;
  if (line && paramsUrl.get("line") !== line) {
    paramsUrl.set("line",line);
    throw redirect(`${new URL(request.url).pathname}?${paramsUrl}`);
  }
  return {category:params.category ?? null, line};
}
export const meta: Route.MetaFunction = ({data}) => {
  const c = categoryBySlug(data?.category ?? undefined);
  const title = c?.name ?? "Jewelry";
  const pieces = data?.line ? shopPieces(data.line,c ? piecesForCategory(c.slug) : undefined) : [];
  return pageMeta({title,description:"Explore Americana, New American and the one-of-one world of Royal American.",path:c ? `/jewelry/${c.slug}` : "/jewelry",image:"comp-americana-ground"},[breadcrumbJsonLd([{name:title,href:c ? `/jewelry/${c.slug}` : "/jewelry"}]),...(pieces.length ? [itemListJsonLd(title,pieces)] : [])]);
};
export default function JewelryPage({loaderData}: Route.ComponentProps) {
  const c = categoryBySlug(loaderData.category ?? undefined);
  const line = loaderData.line;
  const path = c ? `/jewelry/${c.slug}` : "/jewelry";
  if (!line) return <LineChoice title={c?.name ?? "Jewelry"} path={path} includeRoyal={!c} />;
  const base = shopPieces(line,c ? piecesForCategory(c.slug) : undefined);
  return <div className="house-wrap line-browse">
    <LineNav current={line} path={path} />
    <header className="line-browse-heading"><div><p className="label">{tierBySlug(line).name}</p><h1>{c?.name ?? "Jewelry"}</h1></div><p>{LINE_DESCRIPTION[line]}</p></header>
    <KindsRow current={c?.slug} line={line} />
    <ProductResults base={base} hide={["line"]} />
  </div>;
}

import { Link, redirect } from "react-router";
import { Pic } from "~/components/Pic";
import { ProductResults } from "~/components/Catalog";
import { LineChoice, LineNav } from "~/components/HouseLines";
import { VisitInvitation } from "~/components/HouseExperience";
import { collectionBySlug, piecesForCollection, tierBySlug } from "~/lib/catalog/data";
import { SHOP_LINES, selectedLine, shopPieces, lineHref } from "~/lib/catalog/lines";
import { COLLECTION_PHOTO, PIECE_PHOTOS, TIER_PHOTO } from "~/lib/catalog/photos";
import { breadcrumbJsonLd, itemListJsonLd, pageMeta } from "~/lib/seo";
import type { Route } from "./+types/collection";
export function loader({params,request}: Route.LoaderArgs) {
  const c=collectionBySlug(params.slug); if(!c) throw new Response("Not found",{status:404});
  const query=new URL(request.url).searchParams;
  if(query.get("line")==="royal-american") throw redirect("/royal-american");
  const line=selectedLine(query) ?? (c.slug==="bridal" ? null : "americana");
  const available=SHOP_LINES.filter(l=>shopPieces(l,piecesForCollection(c.slug)).length);
  if(line && available.length && !available.includes(line)) throw redirect(lineHref(`/collections/${c.slug}`,available[0],query));
  if(line && !query.has("line") && selectedLine(query)) { query.set("line",line); throw redirect(`/collections/${c.slug}?${query}`); }
  return {slug:c.slug,line};
}
export const meta: Route.MetaFunction = ({data}) => {
  const c=collectionBySlug(data?.slug ?? ""); if(!c) return [];
  return pageMeta({title:`${c.name} collection`,description:c.slug==="bridal" ? "Choose Americana for natural diamonds or New American for lab-grown diamonds. Engagement rings and wedding bands." : c.intro,path:`/collections/${c.slug}`,image:COLLECTION_PHOTO[c.slug]},[breadcrumbJsonLd([{name:c.name,href:`/collections/${c.slug}`}]),...(data?.line ? [itemListJsonLd(c.name,shopPieces(data.line,piecesForCollection(c.slug)))] : [])]);
};
export default function CollectionPage({loaderData}: Route.ComponentProps) {
  const c=collectionBySlug(loaderData.slug)!; const line=loaderData.line; const bridal=c.slug==="bridal";
  if(bridal && !line) return <><LineChoice title="Bridal" bridal path="/collections/bridal" includeRoyal={false} /><VisitInvitation /></>;
  const selected=line ?? "americana";
  const pieces=shopPieces(selected,piecesForCollection(c.slug));
  return <>
    <div className="house-wrap"><LineNav current={selected} path={`/collections/${c.slug}`} lines={SHOP_LINES.filter(l=>shopPieces(l,piecesForCollection(c.slug)).length)} /></div>
    <header className={`collection-heading house-wrap ${bridal ? "bridal-selected" : ""}`}><div className="collection-heading-copy"><p className="label">{bridal ? "Bridal" : tierBySlug(selected).name}</p><h1>{bridal ? tierBySlug(selected).name : c.name}</h1><p>{bridal ? selected==="americana" ? "Natural diamonds. A ring made yours." : "Lab-grown diamonds. A ring made yours." : c.story}</p>{bridal && <Link className="link" to={`/build/ring?line=${selected}`}>Build your ring</Link>}{bridal && <p className="label">The photograph is a solitaire and a band from the house.</p>}</div><div className="collection-object"><Pic k={bridal ? "aj-solitaire-hand" : selected==="new-american" ? (pieces[0] ? PIECE_PHOTOS[pieces[0].handle][0] : TIER_PHOTO[selected]) : COLLECTION_PHOTO[c.slug]} priority /></div></header>
    <section className="family-section house-wrap" id="pieces">{bridal && <div className="house-heading"><h2>{selected==="americana" ? "Wedding bands" : "Rings & bands"}</h2></div>}<ProductResults base={pieces} hide={["line"]} emptyLine={`No ${c.name.toLowerCase()} pieces in ${tierBySlug(selected).name} yet.`} /><p className="concept-note">Concept photographs. Price before sales tax.</p></section>
    <VisitInvitation />
  </>;
}

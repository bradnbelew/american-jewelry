import { Link } from "react-router";
import { PieceIndex } from "~/components/Catalog";
import { Campaign, SignatureCabinet, VisitInvitation } from "~/components/HouseExperience";
import { designBySlug, piecesForDesign, tierBySlug } from "~/lib/catalog/data";
import { DESIGN_PHOTO } from "~/lib/catalog/photos";
import { breadcrumbJsonLd, itemListJsonLd, pageMeta } from "~/lib/seo";
import type { Route } from "./+types/design";
export function loader({params}: Route.LoaderArgs) {
 const d=designBySlug(params.slug); if(!d) throw new Response("Not found",{status:404}); return {slug:d.slug};
}
export const meta: Route.MetaFunction = ({data}) => {
 const d=designBySlug(data?.slug ?? ""); if(!d) return [];
 return pageMeta({title:`${d.name}, a house design`,description:d.motif,path:`/designs/${d.slug}`,og:`designs/${d.slug}`,image:DESIGN_PHOTO[d.slug]},[breadcrumbJsonLd([{name:d.name,href:`/designs/${d.slug}`}]),itemListJsonLd(d.name,piecesForDesign(d.slug))]);
};
export default function DesignPage({loaderData}: Route.ComponentProps) {
 const d=designBySlug(loaderData.slug)!; const tier=tierBySlug(d.tier);
 return <>
  {!d.concept && d.slug !== "grid" ? <Campaign photo={DESIGN_PHOTO[d.slug]} title={d.name} label={tier.name} href="#pieces" action="Discover the pieces" className="design-campaign" /> : <header className="house-story-title house-wrap"><p className="label">{d.concept ? "Proposed design" : tier.name}</p><h1>{d.name}</h1><p>{d.motif}</p></header>}
  <div className="line-intro house-wrap"><p>{d.story}</p></div>
  <SignatureCabinet key={d.slug} initial={d.slug} single />
  <section className="family-section house-wrap" id="pieces"><div className="house-heading !mb-8"><h2>Every {d.name} piece</h2><Link className="link" to={`/jewelry?design=${d.slug}`}>Filter the pieces</Link></div><PieceIndex pieces={piecesForDesign(d.slug)} /></section>
  <VisitInvitation />
 </>;
}

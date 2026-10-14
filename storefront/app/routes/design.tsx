import { ProductResults } from "~/components/Catalog";
import { VisitInvitation } from "~/components/HouseExperience";
import { Pic } from "~/components/Pic";
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
  <header className="collection-heading design-heading house-wrap"><div className="collection-heading-copy"><p className="label">{d.concept ? "Proposed design" : tier.name}</p><h1>{d.name}</h1><p>{d.story}</p></div><div className="collection-object"><Pic k={DESIGN_PHOTO[d.slug]} priority /></div></header>
  <section className="family-section house-wrap" id="pieces"><ProductResults base={piecesForDesign(d.slug)} hide={["design", "line"]} /><p className="concept-note">Concept photographs. Final details and available versions are confirmed with the house.</p></section>
  <VisitInvitation />
 </>;
}

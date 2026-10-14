import { Pic } from "~/components/Pic";
import { ProductResults } from "~/components/Catalog";
import { Campaign, VisitInvitation } from "~/components/HouseExperience";
import { collectionBySlug, piecesForCollection } from "~/lib/catalog/data";
import { COLLECTION_PHOTO } from "~/lib/catalog/photos";
import { breadcrumbJsonLd, itemListJsonLd, pageMeta } from "~/lib/seo";
import type { Route } from "./+types/collection";
export function loader({params}: Route.LoaderArgs) {
 const c=collectionBySlug(params.slug); if(!c) throw new Response("Not found",{status:404}); return {slug:c.slug};
}
export const meta: Route.MetaFunction = ({data}) => {
 const c=collectionBySlug(data?.slug ?? ""); if(!c) return [];
 return pageMeta({title:`${c.name} collection`,description:c.intro,path:`/collections/${c.slug}`,image:COLLECTION_PHOTO[c.slug]},[breadcrumbJsonLd([{name:c.name,href:`/collections/${c.slug}`}]),itemListJsonLd(c.name,piecesForCollection(c.slug))]);
};
export default function CollectionPage({loaderData}: Route.ComponentProps) {
 const c=collectionBySlug(loaderData.slug)!; const pieces=piecesForCollection(c.slug); const bridal=c.slug==="bridal";
 return <>
  {bridal ? <Campaign photo={COLLECTION_PHOTO.bridal} title="A ring, considered." label="Bridal" line="Engagement and wedding rings. Natural or lab-grown diamonds, clearly chosen." href="/build/ring" action="Begin with a setting" position="50% 46%" className="bridal-campaign" /> : <header className="collection-heading house-wrap"><div className="collection-heading-copy"><p className="label">The collections</p><h1>{c.name}</h1><p>{c.story}</p></div><div className="collection-object"><Pic k={COLLECTION_PHOTO[c.slug]} priority /></div></header>}
  <section className="family-section house-wrap" id="pieces"><ProductResults base={pieces} /><p className="concept-note">Concept photographs. Price before sales tax.</p></section>
  <VisitInvitation />
 </>;
}

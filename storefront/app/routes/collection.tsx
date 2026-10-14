import { Link } from "react-router";
import { Pic } from "~/components/Pic";
import { PieceIndex } from "~/components/Catalog";
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
  {bridal ? <Campaign photo={COLLECTION_PHOTO.bridal} title="A ring, considered." label="Bridal" line="Engagement and wedding rings. Natural or lab-grown diamonds, clearly chosen." href="/build/ring" action="Begin with a setting" position="50% 46%" className="bridal-campaign" /> : <header className="collection-heading house-wrap"><div><p className="label">The collections</p><h1>{c.name}</h1><p>{c.intro}</p></div><div className="collection-object"><Pic k={COLLECTION_PHOTO[c.slug]} priority /></div></header>}
  <section className="family-section house-wrap" id="pieces"><div className="family-section-heading"><div><h2>{bridal?"Bridal pieces":c.name}</h2><span className="label">{pieces.length} pieces</span></div><p>{bridal ? "Choose the setting, then the stone. Natural diamonds belong to Americana; lab-grown diamonds to New American." : c.story}</p></div><PieceIndex pieces={pieces} /><p className="concept-note">Concept photographs. Price before sales tax.</p></section>
  {bridal && <section className="house-essay house-wrap"><h2>Make it yours.</h2><div><p>Consider the stone, the metal and the way the ring sits on your hand. Explore the settings in our ring builder, or see them with us in person.</p><Link className="btn" to="/build/ring">Build a ring</Link></div></section>}
  <VisitInvitation />
 </>;
}

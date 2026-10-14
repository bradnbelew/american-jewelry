import { Link } from "react-router";
import { PieceIndex } from "~/components/Catalog";
import { Campaign, RoyalPreview, VisitInvitation } from "~/components/HouseExperience";
import { TIERS, designsForTier, piecesForDesign, piecesForTier } from "~/lib/catalog/data";
import { TIER_PHOTO } from "~/lib/catalog/photos";
import type { TierSlug } from "~/lib/catalog/types";
import { breadcrumbJsonLd, itemListJsonLd, pageMeta } from "~/lib/seo";
import type { Route } from "./+types/line";

export function loader({request}: Route.LoaderArgs) {
  const slug = new URL(request.url).pathname.replace(/^\/+|\/+$/g, "") as TierSlug;
  if (!TIERS.some((t) => t.slug === slug)) throw new Response("Not found", {status:404});
  return {slug};
}
export const meta: Route.MetaFunction = ({data}) => {
  const tier = TIERS.find((t) => t.slug === data?.slug)!;
  return pageMeta({title:tier.slug === "royal-american" ? "High Jewelry | Royal American" : tier.name, description: `${tier.tagline} ${tier.stones}`, path:`/${tier.slug}`, og:`lines/${tier.slug}`, image:TIER_PHOTO[tier.slug]}, [breadcrumbJsonLd([{name:tier.name,href:`/${tier.slug}`}]), itemListJsonLd(tier.name,piecesForTier(tier.slug))]);
};
export default function LinePage({loaderData}: Route.ComponentProps) {
  const slug = loaderData.slug;
  const tier = TIERS.find((t) => t.slug === slug)!;
  if (slug === "royal-american") return <><RoyalPreview full /><VisitInvitation /></>;
  const designs = designsForTier(slug);
  const lab = slug === "new-american";
  return <>
    <Campaign photo={TIER_PHOTO[slug]} title={tier.name} label={lab ? "Lab-grown diamonds" : "Gold, gemstone and natural diamond"} line={lab ? "The clarity of a single idea." : "A signature in every form."} href={`#${designs[0].slug}`} action="Explore the pieces" className={`line-campaign ${lab ? "line-campaign-light" : ""}`} position={lab ? "65% 50%" : "60% 50%"} />
    <nav className="line-contents" aria-label={`${tier.name} designs`}>{designs.map((d) => <a key={d.slug} href={`#${d.slug}`}>{d.name}</a>)}<Link to={`/jewelry?line=${slug}`}>All {tier.name}</Link>{lab && <a href="#standard">The diamond standard</a>}</nav>
    <div className="line-intro house-wrap"><p>{lab ? "Signal lifts the stone into the light. Grid draws it into a continuous line. Distinct forms, each set with clearly identified lab-grown diamonds." : "A star and its trail. The facets of a prism. Original house designs, expressed in solid gold, natural gemstones and natural diamonds."}</p></div>
    {designs.map((d) => <section className="family-section house-wrap" id={d.slug} key={d.slug}><div className="family-section-heading"><div>{d.concept && <p className="label">Proposed design</p>}<h2>{d.name}</h2><Link to={`/designs/${d.slug}`} className="link">Inside the design</Link></div><p>{d.motif}</p></div><PieceIndex pieces={piecesForDesign(d.slug)} /></section>)}
    {lab && <section className="house-essay house-wrap" id="standard"><h2>The New American Standard</h2><div><p>Lab-grown diamonds, D to F color, VVS1 or VVS2 clarity. Growth method and any treatment are disclosed on the individual report.</p><p>Center stones from 0.30 ct carry an IGI report. Confirm the specification of your selected version before ordering.</p><Link to="/natural-or-man-made" className="link">Natural and lab-grown diamonds</Link></div></section>}
    <VisitInvitation />
  </>;
}

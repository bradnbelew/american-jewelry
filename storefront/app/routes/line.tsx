import { Link } from "react-router";
import { KindsRow, ProductResults } from "~/components/Catalog";
import { Campaign, VisitInvitation } from "~/components/HouseExperience";
import { RoyalCollection } from "~/components/RoyalCollection";
import { LineNav } from "~/components/HouseLines";
import { TIERS, piecesForTier } from "~/lib/catalog/data";
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
  if (slug === "royal-american") return <><div className="house-wrap royal-line-nav"><LineNav current={slug} /></div><RoyalCollection /></>;
  const lab = slug === "new-american";
  return <>
    <div className="house-wrap"><LineNav current={slug} /></div>
    <Campaign photo={TIER_PHOTO[slug]} title={tier.name} label={lab ? "Lab-grown diamonds" : "Gold, gemstones and natural diamonds"} href="#pieces" action="The pieces" line="A photograph from the house. The designs below are waiting to be photographed." className="line-opener" />
    <section className="family-section house-wrap" id="pieces"><KindsRow line={slug} /><ProductResults base={piecesForTier(slug)} hide={["line"]} /><p className="concept-note">Concept photographs. Price before sales tax.</p></section>
    {lab && <section className="house-essay house-wrap" id="standard"><h2>The New American Standard</h2><div><p>Lab-grown diamonds, D to F color, VVS1 or VVS2 clarity. Growth method and any treatment are disclosed on the individual report.</p><p>Center stones from 0.30 ct carry an IGI report. Confirm the specification of your selected version before ordering.</p><Link to="/natural-or-man-made" className="link">Natural and lab-grown diamonds</Link></div></section>}
    <VisitInvitation />
  </>;
}

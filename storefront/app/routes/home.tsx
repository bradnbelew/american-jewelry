import { BridalPortrait, Campaign, CollectionEdit, RoyalPreview, SignatureCabinet, VisitInvitation } from "~/components/HouseExperience";
import { pageMeta } from "~/lib/seo";
import type { Route } from "./+types/home";

export const meta: Route.MetaFunction = () => pageMeta({description: "American Jewelry. Original designs in gold, natural and lab-grown diamonds. Discover Shooting Star, Prism, Signal and Grid, and Royal American high jewelry.", path: "/", og: "pages/home"});

export default function Home() {
  return <>
    <Campaign photo="comp-home-hand" tall="comp-home-hand-tall" position="62% 45%" title="Shooting Star" label="Americana" href="/designs/shooting-star" action="Discover the design" className="home-campaign" />
    <SignatureCabinet />
    <CollectionEdit />
    <RoyalPreview />
    <BridalPortrait />
    <VisitInvitation />
  </>;
}

import { Link } from "react-router";
import { Pic } from "~/components/Pic";
import { VisitInvitation } from "~/components/HouseExperience";
import { breadcrumbJsonLd, pageMeta } from "~/lib/seo";
import type { Route } from "./+types/house";

export const meta: Route.MetaFunction = () => pageMeta({title:"The House", description:"American Jewelry: a family house of original designs, with shops in Brentwood and Mt. Juliet, Tennessee.", path:"/house", og:"pages/house"}, [breadcrumbJsonLd([{name:"The House",href:"/house"}])]);

export default function HousePage() {
  return <>
    <header className="house-story-title house-wrap">
      <p className="label">Brentwood and Mt. Juliet, Tennessee</p>
      <h1>The House</h1>
    </header>
    <div className="house-story-image"><Pic k="aj-bench-hands" priority sizes="100vw" /></div>
    <section className="house-essay house-wrap">
      <h2>A family house</h2>
      <div>
        <p>American Jewelry is a family business, with stores in Brentwood and Mt. Juliet.</p>
        <p>The existing designs are drawn by a member of the family. Shooting Star, Prism, Signal and Grid each begin with a distinct form.</p>
        <p>Meridian, Ribbon, Horizon and Petal are proposals for this mockup. They are not in the cases, and they have no price.</p>
        <Link to="/designs" className="link">The signatures</Link>
      </div>
    </section>
    <section className="house-made house-wrap">
      <div className="house-made-photo"><Pic k="aj-name-necklace" sizes="(min-width: 900px) 48vw, 100vw" /></div>
      <div>
        <h2>What the house already makes</h2>
        <p>Names, signets, bands and stones, in gold. You can see them in either store.</p>
        <p>The new designs join this page when they have been photographed.</p>
      </div>
    </section>
    <section className="house-essay house-wrap">
      <h2>The workshop</h2>
      <div>
        <p>Both stores have working shops visible to customers. Casting is in-house.</p>
        <p>Designed in Tennessee. Set and finished in our workshop. Diamonds and gold are imported.</p>
        <p>Bring a repair, a resize, an engraving or a commission. The work is quoted before it begins. Royal American is one of one, and it is seen by private viewing.</p>
        <Link to="/services" className="link">Care and repair</Link>
      </div>
    </section>
    <VisitInvitation />
  </>;
}

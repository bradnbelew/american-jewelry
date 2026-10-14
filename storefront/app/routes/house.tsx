import { Link } from "react-router";
import { Pic } from "~/components/Pic";
import { VisitInvitation } from "~/components/HouseExperience";
import { breadcrumbJsonLd, pageMeta } from "~/lib/seo";
import type { Route } from "./+types/house";
export const meta: Route.MetaFunction = () => pageMeta({title:"The House", description:"American Jewelry: a family house of original designs, with shops in Brentwood and Mt. Juliet, Tennessee.", path:"/house", og:"pages/house"}, [breadcrumbJsonLd([{name:"The House",href:"/house"}])]);
export default function HousePage() {
  return <>
    <header className="house-story-title house-wrap"><h1>The House</h1></header>
    <div className="house-story-image"><Pic k="comp-prism-campaign" priority sizes="100vw" position="50% 55%" /></div>
    <section className="house-essay house-wrap"><h2>A family house</h2><div><p>A Tennessee family business, with original jewelry designed by a member of the family.</p><p>Shooting Star, Prism, Signal and Grid each begin with a distinct form.</p><Link to="/designs" className="link">Explore the signatures</Link><p className="concept-note">Meridian, Ribbon, Horizon and Petal are new design proposals created for this mockup.</p></div></section>
    <section className="house-essay house-wrap"><h2>Our workshops</h2><div><p>We cast in-house. Our Brentwood and Mt. Juliet stores both have working shops visible to customers.</p><Link to="/commission" className="link">Discuss a commission</Link></div></section>
    <VisitInvitation />
  </>;
}

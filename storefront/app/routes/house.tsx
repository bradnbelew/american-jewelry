import { Link } from "react-router";
import { Pic } from "~/components/Pic";
import { VisitInvitation } from "~/components/HouseExperience";
import { breadcrumbJsonLd, pageMeta } from "~/lib/seo";
import type { Route } from "./+types/house";
export const meta: Route.MetaFunction = () => pageMeta({title:"The House", description:"American Jewelry: a family house of original designs, with shops in Brentwood and Mt. Juliet, Tennessee.", path:"/house", og:"pages/house"}, [breadcrumbJsonLd([{name:"The House",href:"/house"}])]);
export default function HousePage() {
  return <>
    <header className="house-story-title house-wrap"><p className="label">American Jewelry</p><h1>A family house.<br />A singular point of view.</h1><p>Original designs, from a star in flight to the edge of a prism.</p></header>
    <div className="house-story-image"><Pic k="comp-prism-campaign" priority sizes="100vw" position="50% 55%" /></div>
    <section className="house-essay house-wrap"><h2>One designer.<br />A family of forms.</h2><div><p>American Jewelry is a family business in Tennessee. The owner's brother designs the house's existing pieces.</p><p>Shooting Star, Prism, Signal and Grid carry distinct ideas through a family of forms. The line, the setting and the way a piece sits on the body are considered together.</p><Link to="/designs" className="link">Explore the signatures</Link><p className="concept-note">Meridian, Ribbon, Horizon and Petal are new design proposals created for this mockup.</p></div></section>
    <section className="house-essay house-wrap"><h2>Close to the making.</h2><div><p>We cast in-house. Our Brentwood and Mt. Juliet stores both have working shops visible to customers.</p><p>Design, setting, engraving and repair keep us close to the pieces we make, and to the people who wear them. A commission starts with a conversation about form, stone and proportion.</p><Link to="/commission" className="link">Discuss a commission</Link><p className="!text-base !mt-6">Designed in Tennessee. Set and finished in our workshop. Diamonds and gold are imported.</p></div></section>
    <VisitInvitation />
  </>;
}

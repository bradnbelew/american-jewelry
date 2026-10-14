import { Link } from "react-router";
import { Pic } from "~/components/Pic";
import { Section } from "~/components/Section";
import { breadcrumbJsonLd, pageMeta } from "~/lib/seo";
import type { Route } from "./+types/commission";
export const meta: Route.MetaFunction = () => pageMeta({title:"Commission a piece", description:"Custom jewelry and heirloom redesign at American Jewelry. Consultation, CAD review, and in-house casting.", path:"/commission", image:"ring-halo"},[breadcrumbJsonLd([{name:"Commission a piece",href:"/commission"}])]);
export default function CommissionPage(){return <>
  <header className="collection-heading house-wrap"><div><h1>Commission a piece</h1><p>A new design, or a new setting for a stone you own.</p><Link className="link" to="/appointments?kind=commission">Discuss a commission</Link></div><div className="collection-object"><Pic k="ring-halo" priority /></div></header>
  <Section screen width="text"><ol className="commission-process">
    <li><h2>Consultation</h2><p>Bring your ideas, budget and any jewelry you wish to rework.</p></li>
    <li><h2>Design</h2><p>Review the CAD by email. Confirm the design and quote before production.</p></li>
    <li><h2>Making</h2><p>In-house casting, setting and finishing. Allow about four to six weeks; timing is confirmed with your design.</p></li>
    <li><h2>Fitting</h2><p>See the finished piece and check its fit with us.</p></li>
  </ol></Section>
</>}

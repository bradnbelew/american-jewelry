import { Link } from "react-router";
import { Pic } from "~/components/Pic";
import { DESIGNS, piecesForDesign } from "~/lib/catalog/data";
import { DESIGN_PHOTO } from "~/lib/catalog/photos";
import { pageMeta } from "~/lib/seo";
import type { Route } from "./+types/designs";
export const meta: Route.MetaFunction = () => pageMeta({title:"The styles",description:"Shooting Star, Prism, Signal, Grid and new design concepts. Explore the signature forms of American Jewelry.",path:"/designs"});
export default function DesignsPage() {
 return <div className="house-wrap"><header className="house-story-title"><h1>The signatures</h1></header><div className="styles-index">{DESIGNS.map((d) => <Link to={`/designs/${d.slug}`} key={d.slug}><div className={`style-image style-${d.slug}`}><Pic k={DESIGN_PHOTO[d.slug]} /></div><div className="style-caption"><h2>{d.name}</h2><span className="label">{piecesForDesign(d.slug).length} pieces{d.concept ? " / Design concept" : ""}</span></div><p>{d.motif}</p></Link>)}</div></div>;
}

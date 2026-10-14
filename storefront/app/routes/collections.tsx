import { Link } from "react-router";
import { Pic } from "~/components/Pic";
import { COLLECTIONS, piecesForCollection } from "~/lib/catalog/data";
import { COLLECTION_PHOTO } from "~/lib/catalog/photos";
import { pageMeta } from "~/lib/seo";
import type { Route } from "./+types/collections";
export const meta: Route.MetaFunction = () => pageMeta({title:"Collections",description:"Family, Bridal, Signets and The Stack. Explore the American Jewelry collections.",path:"/collections"});
export default function CollectionsPage() {
 return <div className="house-wrap"><header className="house-story-title"><p className="label">American Jewelry</p><h1>The collections</h1><p>Different ways to make a piece your own.</p></header><div className="collections-grid">{COLLECTIONS.map((c) => <Link key={c.slug} to={`/collections/${c.slug}`}><div className="collections-image"><Pic k={COLLECTION_PHOTO[c.slug]} /></div><h2>{c.name}</h2><p>{c.intro}</p><span className="link">Explore {piecesForCollection(c.slug).length} pieces</span></Link>)}</div></div>;
}

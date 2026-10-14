import { Link, useSearchParams } from "react-router";
import { LineNav } from "~/components/HouseLines";
import { SHOP_LINES, selectedLine, shopPieces } from "~/lib/catalog/lines";
import { Pic } from "~/components/Pic";
import { COLLECTIONS, piecesForCollection } from "~/lib/catalog/data";
import { COLLECTION_PHOTO, PIECE_PHOTOS } from "~/lib/catalog/photos";
import { pageMeta } from "~/lib/seo";
import type { Route } from "./+types/collections";
export const meta: Route.MetaFunction = () => pageMeta({title:"Collections",description:"Family, Bridal, Signets and The Stack. Explore the American Jewelry collections.",path:"/collections"});
export default function CollectionsPage() {
 const [params]=useSearchParams(); const line=selectedLine(params) ?? "americana";
 return <div className="house-wrap"><LineNav current={line} path="/collections" lines={SHOP_LINES} /><header className="house-story-title"><h1>Collections</h1></header><div className="collections-grid">{COLLECTIONS.filter(c=>c.slug==="bridal" || shopPieces(line,piecesForCollection(c.slug)).length).map((c) => <Link key={c.slug} to={c.slug==="bridal" ? "/collections/bridal" : `/collections/${c.slug}?line=${line}`}><div className="collections-image"><Pic k={line==="new-american" ? PIECE_PHOTOS[shopPieces(line,piecesForCollection(c.slug))[0].handle][0] : COLLECTION_PHOTO[c.slug]} /></div><div className="style-caption"><h2>{c.name}</h2><span className="label">{c.slug==="bridal" ? "Engagement & wedding" : `${shopPieces(line,piecesForCollection(c.slug)).length} ${shopPieces(line,piecesForCollection(c.slug)).length===1 ? "piece" : "pieces"}`}</span></div></Link>)}</div></div>;
}

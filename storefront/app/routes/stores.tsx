import { Link } from "react-router";
import { STORES } from "~/lib/catalog/data";
import { breadcrumbJsonLd, pageMeta, storeJsonLd } from "~/lib/seo";
import type { Route } from "./+types/stores";
export const meta: Route.MetaFunction = () => pageMeta({title:"Visit the house | Brentwood and Mt. Juliet", description:"Visit American Jewelry in Brentwood or Mt. Juliet, Tennessee. Store addresses, phone numbers and private appointments.",path:"/stores",og:"pages/stores"}, [breadcrumbJsonLd([{name:"Stores",href:"/stores"}]), ...STORES.map(storeJsonLd)]);
export default function StoresPage() {
 return <>
   <header className="stores-heading house-wrap"><h1>Visit us</h1></header>
   <section className="stores-grid house-wrap" aria-label="Our stores">{STORES.map((s) => <article key={s.slug}><h2><Link to={`/stores/${s.slug}`}>{s.name}</Link></h2><address>{s.address1}<br />{s.city}, {s.state} {s.zip}</address><a className="store-phone" href={`tel:${s.phone.replace(/\D/g,"")}`}>{s.phone}</a><p className="label">{s.hoursConfirmed ? s.hours.map((h) => `${h.days}: ${h.open}`).join(". ") : "Call for hours and piece availability."}</p><div className="store-actions"><Link to={`/appointments?store=${s.slug}`} className="btn">Arrange a visit</Link><a className="link" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.mapQuery)}`} target="_blank" rel="noreferrer">Directions</a></div></article>)}</section>
   <section className="house-essay house-wrap"><h2>Care and repair</h2><div><p>Bring your jewelry to either store for assessment.</p><Link to="/services" className="link">Care and services</Link></div></section>
 </>;
}

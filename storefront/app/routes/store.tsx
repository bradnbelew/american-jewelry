import { Link } from "react-router";
import { STORES, storeBySlug } from "~/lib/catalog/data";
import { breadcrumbJsonLd, pageMeta, storeJsonLd } from "~/lib/seo";
import type { Route } from "./+types/store";
export function loader({params}: Route.LoaderArgs) {
 const s=storeBySlug(params.slug); if(!s) throw new Response("Not found",{status:404}); return {slug:s.slug};
}
export const meta: Route.MetaFunction = ({data}) => {
 const s=storeBySlug(data?.slug ?? ""); if(!s) return [];
 return pageMeta({title:"Visit "+s.name,description:s.address1+", "+s.city+", TN "+s.zip+". "+s.phone,path:"/stores/"+s.slug},[storeJsonLd(s),breadcrumbJsonLd([{name:"Visit us",href:"/stores"},{name:s.name,href:"/stores/"+s.slug}])]);
};
export default function StorePage({loaderData}: Route.ComponentProps) {
 const s=storeBySlug(loaderData.slug)!; const other=STORES.find(x=>x.slug!==s.slug)!;
 const maps="https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(s.mapQuery);
 return <>
 <header className="house-story-title house-wrap"><p className="label">Visit American Jewelry</p><h1>{s.name}</h1><p>Try on a piece. Meet the people who make it.</p></header>
 <section className="store-detail house-wrap">
 <div><h2>Find us</h2><address>{s.address1}<br />{s.city}, {s.state} {s.zip}</address><p>{s.place}</p><a className="link" href={maps} target="_blank" rel="noreferrer">Get directions</a><a className="store-phone" href={"tel:"+s.phone.replace(/\D/g,"")}>{s.phone}</a>{s.hoursConfirmed ? <dl>{s.hours.map(h=><div key={h.days}><dt>{h.days}</dt><dd>{h.open}</dd></div>)}</dl> : <p>Call for current opening hours.</p>}<Link className="btn" to={"/appointments?store="+s.slug}>Plan a visit</Link></div>
 <div><h2>At the store</h2><p>Explore the house designs and see our working shop, visible to customers. Contact us before your visit to confirm a particular piece or service.</p><ul>{s.services.map(service=><li key={service}>{service}</li>)}</ul><Link className="link" to="/services">Explore our services</Link></div>
 </section>
 <div className="store-other house-wrap"><p>Also in Tennessee</p><Link className="link" to={"/stores/"+other.slug}>{other.name}</Link></div>
 </>;
}

import { CATEGORIES } from "./catalog/browse";
import { COLLECTIONS, DESIGNS, STORES } from "./catalog/data";
export interface NavLink { href: string; label: string; note?: string; }
export interface NavColumn { title: string; links: NavLink[]; }
export interface NavPanel { label: string; href: string; columns: NavColumn[]; photo?: {key:string;caption:string;href:string;position?:string}; line?:string; }
/** Type, style, collection and material are distinct routes into the same catalog. */
export const NAV: NavPanel[] = [
 {label:"Jewelry",href:"/jewelry",columns:[
  {title:"By type",links:[...CATEGORIES.map(c=>({href:`/jewelry/${c.slug}`,label:c.name})),{href:"/jewelry",label:"All jewelry"}]},
  {title:"By style",links:DESIGNS.map(d=>({href:`/designs/${d.slug}`,label:d.name}))},
  {title:"By material",links:[{href:"/jewelry?stone=gold",label:"Gold"},{href:"/jewelry?stone=natural",label:"Natural diamonds"},{href:"/jewelry?stone=man-made",label:"Lab-grown diamonds"},{href:"/jewelry?stone=birthstone",label:"Gemstones"}]},
 ],photo:{key:"comp-prism-campaign",caption:"Prism",href:"/designs/prism"}},
 {label:"Collections",href:"/collections",columns:[
  {title:"The collections",links:COLLECTIONS.filter(c=>c.slug!=="bridal").map(c=>({href:`/collections/${c.slug}`,label:c.name}))},
  {title:"The house lines",links:[{href:"/americana",label:"Americana"},{href:"/new-american",label:"New American"},{href:"/royal-american",label:"Royal American"}]},
 ],photo:{key:"campaign-07-family-collection-editorial",caption:"Family",href:"/collections/family"}},
 {label:"Bridal",href:"/collections/bridal",columns:[
  {title:"Rings",links:[{href:"/collections/bridal",label:"Engagement and wedding"},{href:"/pieces/signal-solitaire",label:"Signal Solitaire"},{href:"/collections/the-stack",label:"Bands to pair"}]},
  {title:"Your ring",links:[{href:"/build/ring",label:"Build a ring"},{href:"/appointments?kind=bridal",label:"Arrange a fitting"},{href:"/natural-or-man-made",label:"Choose your diamond"},{href:"/care#sizing",label:"Find your size"}]},
 ],photo:{key:"comp-new-american-opener",caption:"Signal",href:"/pieces/signal-solitaire"}},
 {label:"High Jewelry",href:"/royal-american",columns:[
  {title:"Royal American",links:[{href:"/royal-american",label:"The registry"},{href:"/pieces/no-001-the-cumberland",label:"The Cumberland"},{href:"/pieces/no-002-tennessee-star",label:"Tennessee Star"},{href:"/pieces/no-003-the-harpeth",label:"The Harpeth"}]},
  {title:"By appointment",links:[{href:"/appointments?tier=royal-american",label:"Private viewing"},{href:"/commission",label:"Commission a piece"}]},
 ],photo:{key:"comp-cumberland-velvet",caption:"Royal American",href:"/royal-american"}},
 {label:"The House",href:"/house",columns:[
  {title:"American Jewelry",links:[{href:"/house",label:"Our story"},{href:"/designs",label:"The signatures"},{href:"/journal",label:"Journal"}]},
  {title:"Visit",links:[...STORES.map(s=>({href:`/stores/${s.slug}`,label:s.name})),{href:"/appointments",label:"Appointments"}]},
  {title:"At your service",links:[{href:"/services",label:"Care and repair"},{href:"/commission",label:"Custom design"},{href:"/care",label:"Caring for your jewelry"},{href:"/policies",label:"Ordering and delivery"}]},
 ],photo:{key:"comp-prism-campaign",caption:"A family house",href:"/house"}},
];

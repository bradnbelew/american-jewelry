import { CATEGORIES } from "./catalog/browse";
import { COLLECTIONS, STORES } from "./catalog/data";
export interface NavLink { href: string; label: string; note?: string; }
export interface NavColumn { title: string; links: NavLink[]; }
export interface NavPanel { label: string; href: string; columns: NavColumn[]; photo?: {key:string;caption:string;href:string;position?:string}; line?:string; }
/** Type, style, collection and material are distinct routes into the same catalog. */
export const NAV: NavPanel[] = [
 {label:"Royal American",href:"/royal-american",columns:[
  {title:"Royal American",links:[{href:"/royal-american",label:"The collection"},{href:"/pieces/no-001-the-cumberland",label:"The Cumberland"},{href:"/pieces/no-002-tennessee-star",label:"Tennessee Star"},{href:"/pieces/no-003-the-harpeth",label:"The Harpeth"}]},
  {title:"By appointment",links:[{href:"/appointments?tier=royal-american",label:"Private viewing"},{href:"/commission",label:"Commission a piece"}]},
 ],photo:{key:"aj-round-brilliant",caption:"Seen by appointment",href:"/royal-american"}},
 {label:"Jewelry",href:"/jewelry",columns:[
  {title:"Americana",links:[{href:"/americana",label:"Explore Americana",note:"Gold, gemstones & natural diamonds"},...CATEGORIES.map(c=>({href:`/jewelry/${c.slug}?line=americana`,label:c.name}))]},
  {title:"New American",links:[{href:"/new-american",label:"Explore New American",note:"Lab-grown diamonds"},...CATEGORIES.map(c=>({href:`/jewelry/${c.slug}?line=new-american`,label:c.name}))]},
  {title:"Royal American",links:[{href:"/royal-american",label:"One of one"},{href:"/appointments?tier=royal-american",label:"Private viewing"}]},
 ]},
 {label:"Bridal",href:"/collections/bridal",columns:[
  {title:"Americana",links:[{href:"/collections/bridal?line=americana",label:"Natural diamonds"},{href:"/build/ring?line=americana",label:"Build your ring"}]},
  {title:"New American",links:[{href:"/collections/bridal?line=new-american",label:"Lab-grown diamonds"},{href:"/build/ring?line=new-american",label:"Build your ring"}]},
  {title:"With the house",links:[{href:"/appointments?kind=bridal",label:"Book a visit"},{href:"/natural-or-man-made",label:"Natural or lab-grown?"},{href:"/care#sizing",label:"Find your size"}]},
 ],photo:{key:"aj-solitaire-hand",caption:"A solitaire and a band",href:"/collections/bridal"}},
 {label:"Collections",href:"/collections",columns:[
  {title:"The collections",links:COLLECTIONS.filter(c=>c.slug!=="bridal").map(c=>({href:`/collections/${c.slug}`,label:c.name}))},
  {title:"The house lines",links:[{href:"/americana",label:"Americana"},{href:"/new-american",label:"New American"},{href:"/royal-american",label:"Royal American"}]},
 ],photo:{key:"aj-signet-worn",caption:"A signet, worn",href:"/collections/signets"}},
 {label:"The House",href:"/house",columns:[
  {title:"American Jewelry",links:[{href:"/house",label:"Our story"},{href:"/designs",label:"The signatures"},{href:"/journal",label:"Journal"}]},
  {title:"Visit",links:[...STORES.map(s=>({href:`/stores/${s.slug}`,label:s.name})),{href:"/appointments",label:"Book a visit"}]},
  {title:"At your service",links:[{href:"/services",label:"Care and repair"},{href:"/commission",label:"Custom design"},{href:"/care",label:"Caring for your jewelry"},{href:"/policies",label:"Ordering and delivery"}]},
 ],photo:{key:"aj-bench-hands",caption:"The workshop",href:"/house"}},
];

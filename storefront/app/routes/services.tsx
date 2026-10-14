import { Link } from "react-router";

import { Section } from "~/components/Section";
import { Pic } from "~/components/Pic";
import { STORES } from "~/lib/catalog/data";
import { breadcrumbJsonLd, pageMeta, servicesJsonLd } from "~/lib/seo";

import type { Route } from "./+types/services";

const SERVICES: { slug: string; name: string; what: string; how: string; where: string }[] = [
  { slug: "repair", name: "Repair and restoration", what: "Retipping, re-shanking, chain and clasp repair, stone replacement and laser welding.", how: "Quoted under the loupe before anything begins.", where: "Contact either store to arrange an assessment." },
  { slug: "resizing", name: "Resizing", what: "Ring sizing and assessment. Full eternity bands may need remaking.", how: "Timing, suitability and any charge are confirmed after assessment.", where: "Contact either store to discuss the work." },
  { slug: "engraving", name: "Engraving", what: "Initials, dates and personal inscriptions.", how: "Included on pieces we make. Quoted on others.", where: "Either store." },
  { slug: "cleaning", name: "Cleaning and inspection", what: "Cleaning and setting checks suited to your jewelry.", how: "Contact us for suitable care.", where: "Either store." },
  { slug: "appraisal", name: "Appraisal", what: "A written insurance appraisal with photographs, metal and stone details and report numbers.", how: "By appointment. From $149 per item.", where: "Either store." },
  { slug: "custom", name: "Custom and heirloom work", what: "A grandmother's diamond reset in a house design. A family sapphire at the center of a signet.", how: "Discuss a design and review the CAD before approval.", where: "By appointment." },
];

/** Prices carried from the old site's published list; the family confirms before launch. */
const PRICES: [string, string][] = [
  ["Simple solder, chain repair", "from $39"],
  ["Prong retip", "from $49"],
  ["Small stone replacement", "from $49"],
  ["Laser engraving", "from $60"],
  ["Clasp replacement", "from $69"],
  ["Ring sizing", "from $69"],
  ["Ring refinish", "from $75"],
  ["Rhodium plating", "$85"],
  ["Insurance appraisal", "from $149 per item"],
  ["Watch battery", "from $20"],
];

export const meta: Route.MetaFunction = () =>
  pageMeta(
    { title: "Services", description: "Jewelry repair with American Jewelry in Brentwood and Mt. Juliet, Tennessee: laser welding, retipping, stone setting, resizing, engraving, cleaning and appraisals. Quoted before any work begins.", path: "/services", og: "pages/services", image: "bench" },
    [breadcrumbJsonLd([{ name: "Services", href: "/services" }]), servicesJsonLd(SERVICES)],
  );

export default function ServicesPage() {
  return (
    <>
      <Section className="pt-10 md:pt-16">
        <div className="grid items-center gap-8 md:grid-cols-12 md:gap-16">
          <div className="flex flex-col gap-6 md:col-span-5">
            <h1 className="h-display measure-display text-[44px] md:text-[64px]">Services</h1>
            <p className="lede measure">Repair, resizing, engraving and care. Quoted before work begins.</p>
            <Link to="/appointments?kind=care" className="btn self-start">
              Book a care visit
            </Link>
          </div>
          <div className="settle relative aspect-[4/5] overflow-hidden md:col-span-7 md:aspect-[4/3]">
            <Pic k="comp-bench-hands" priority sizes="(min-width: 768px) 58vw, 100vw" position="50% 40%" />
          </div>
        </div>
      </Section>

      <Section screen className="service-content">
        <div className="flex flex-col gap-14">
          {SERVICES.map((s) => (
            <article key={s.slug} id={s.slug} className="grid gap-4 md:grid-cols-12 md:gap-10">
              <h2 className="h-section text-[1.75rem] md:col-span-4 md:text-[2rem]">{s.name}</h2>
              <div className="font-text flex flex-col gap-3 text-ink-2 md:col-span-8">
                <p>{s.what}</p>
                <p className="label">
                  {s.how} {s.where}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section className="service-content pb-8">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <h2 className="h-section text-[1.75rem] md:col-span-4 md:text-[2rem]">Service prices</h2>
          <table className="spec md:col-span-7 md:col-start-6">
            <tbody>
              {PRICES.map(([k, v]) => (
                <tr key={k}>
                  <th scope="row" className="!w-auto !normal-case !tracking-normal !text-ink !font-text !text-[0.9375rem]">
                    {k}
                  </th>
                  <td className="num text-right">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-20 grid gap-10 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col gap-3">
            <h2 className="h-section text-[1.75rem]">Watches</h2>
            <p className="font-text text-ink-2">Battery and band changes at either store. Pre-owned Rolex, authenticated by our watchmaker, by appointment. We are an independent jeweler, not affiliated with Rolex.</p>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="h-section text-[1.75rem]">For life</h2>
            <p className="font-text text-ink-2">Cleaning, inspection and polishing on every piece we make, at either store, for as long as you own it.</p>
            <Link to="/care" className="link self-start">
              Lifetime care
            </Link>
          </div>
        </div>
        <p className="label mt-12">{STORES.map((s) => `${s.name} ${s.phone}`).join(". ")}.</p>
      </Section>
    </>
  );
}

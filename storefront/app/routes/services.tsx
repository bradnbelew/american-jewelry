import { Link } from "react-router";

import { Section, SplitOpener } from "~/components/Section";
import { STORES } from "~/lib/catalog/data";
import { breadcrumbJsonLd, pageMeta, servicesJsonLd } from "~/lib/seo";

import type { Route } from "./+types/services";

const SERVICES: { slug: string; name: string; what: string; how: string; where: string }[] = [
  { slug: "repair", name: "Repair and restoration", what: "Retipping, re-shanking, chain and clasp repair, lost stones, laser welding next to stones that cannot take a torch.", how: "Quoted under the loupe before anything begins.", where: "The bench in Mt. Juliet; Brentwood takes pieces in." },
  { slug: "resizing", name: "Resizing", what: "Sized up or down at the bench, the join finished so it disappears. Full eternity bands are remade.", how: "While you wait when the bench is free. One free resize within 60 days on rings we made.", where: "Mt. Juliet, or taken in at Brentwood." },
  { slug: "engraving", name: "Engraving", what: "Initials, a date, a line, in the house script or Roman capitals. Monograms on signets by hand.", how: "Included on pieces we make. Quoted on others.", where: "Either store." },
  { slug: "cleaning", name: "Cleaning and inspection", what: "Ultrasonic and steam, a loupe over every setting, prongs tightened.", how: "Walk in. Fifteen minutes, no charge, for life.", where: "Either store." },
  { slug: "appraisal", name: "Appraisal", what: "A written insurance appraisal with photographs, metal and stone details and report numbers.", how: "By appointment. From $149 per item.", where: "Either store." },
  { slug: "custom", name: "Custom and heirloom work", what: "A grandmother's diamond reset in a house design. A family sapphire at the center of a signet.", how: "Drawings within a week; a model you can hold before anything is cast.", where: "Brentwood, by appointment." },
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
    { title: "Services", description: "Jewelry repair at our own bench in Mt. Juliet, Tennessee: laser welding, retipping, stone setting, resizing, engraving, cleaning and appraisals. Quoted before any work begins.", path: "/services", image: "bench" },
    [breadcrumbJsonLd([{ name: "Services", href: "/services" }]), servicesJsonLd(SERVICES)],
  );

export default function ServicesPage() {
  return (
    <>
      <SplitOpener title="Services" lede="A house that makes its own pieces looks after everyone else's too. Every service is quoted before any work begins, at a bench you can watch." photo="bench">
        <Link to="/appointments?kind=care" className="btn self-start">
          Book a care visit
        </Link>
      </SplitOpener>

      <Section screen width="text">
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

      <Section className="pb-8" width="text">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <h2 className="h-section text-[1.75rem] md:col-span-4 md:text-[2rem]">While you wait</h2>
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

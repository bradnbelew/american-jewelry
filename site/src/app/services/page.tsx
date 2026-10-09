import type { Metadata } from "next";
import Link from "next/link";
import { Section, SplitOpener } from "@/components/Section";
import { STORES } from "@/lib/catalog/data";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services: repair, resizing, engraving, appraisal",
  description: "Jewelry repair at our own bench in Mt. Juliet, Tennessee: laser welding, retipping, stone setting, resizing, engraving, cleaning and appraisals. Quoted before any work begins.",
  alternates: { canonical: "/services" },
};

const SERVICES: { slug: string; name: string; what: string; how: string; where: string }[] = [
  {
    slug: "repair",
    name: "Repair and restoration",
    what: "Retipping worn prongs, re-shanking a thin band, chain and clasp repair, replacing a lost stone, straightening a bent ring, and laser welding next to stones that cannot take a torch.",
    how: "Bring the piece to either store. We look at it under the loupe with you, quote the work before anything begins, and tell you plainly when a repair is not worth making.",
    where: "The bench in Mt. Juliet. Brentwood takes pieces in and carries them over.",
  },
  {
    slug: "resizing",
    name: "Resizing",
    what: "Rings sized up or down at the bench, with the shank finished so the join disappears. Full eternity bands cannot be resized; we remake them.",
    how: "Sized while you wait when the bench is free; otherwise within the week. One free resize within 60 days on rings we made.",
    where: "Mt. Juliet, or taken in at Brentwood.",
  },
  {
    slug: "engraving",
    name: "Engraving",
    what: "Initials, a date, a line, inside a band or on the back of a pendant or signet, in the house script or Roman capitals. Monograms and crests on signets by hand.",
    how: "Included on pieces we make. On other pieces, quoted at the counter. Engraved pieces are final sale.",
    where: "Either store.",
  },
  {
    slug: "cleaning",
    name: "Cleaning and inspection",
    what: "Ultrasonic and steam cleaning, a loupe over every setting, prongs tightened, and a note of anything to watch before it becomes a repair.",
    how: "Walk in. Fifteen minutes, no charge, on anything we made and on most pieces we did not.",
    where: "Either store.",
  },
  {
    slug: "appraisal",
    name: "Appraisal",
    what: "A written insurance appraisal at retail replacement value, with photographs, metal and stone details and report numbers, prepared for your insurer.",
    how: "By appointment. Included with pieces we make above a threshold we state on the receipt; quoted for pieces from elsewhere. Update every two or three years.",
    where: "Either store, by appointment.",
  },
  {
    slug: "custom",
    name: "Custom and heirloom work",
    what: "A grandmother's diamond reset in a house design, a family sapphire at the center of a signet, a new piece drawn to the stones you already own.",
    how: "Start with a conversation in the salon. Drawings within a week; a model you can turn and a wax you can hold before anything is cast.",
    where: "Brentwood, by appointment.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Services", href: "/services" }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Services at American Jewelry",
          itemListElement: SERVICES.map((s, i) => ({ "@type": "ListItem", position: i + 1, item: { "@type": "Service", name: s.name, description: s.what, provider: { "@id": `${SITE}/#org` }, areaServed: "Middle Tennessee", url: `${SITE}/services#${s.slug}` } })),
        }}
      />
      <SplitOpener
        title="Services"
        lede="A house that makes its own pieces can look after everyone else's too. Every service is quoted before any work begins, and most of it happens at a bench you can watch."
        photo="bench"
      >
        <Link href="/appointments?kind=care" className="btn self-start">
          Book a care visit
        </Link>
      </SplitOpener>

      <Section className="pt-20 md:pt-28" width="text" reveal>
        <div className="flex flex-col divide-y divide-hair hair">
          {SERVICES.map((s) => (
            <article key={s.slug} id={s.slug} className="grid md:grid-cols-12 gap-6 md:gap-10 py-10 scroll-mt-32">
              <h2 className="md:col-span-4 h-section text-[1.75rem] md:text-[2rem]">{s.name}</h2>
              <div className="md:col-span-8 flex flex-col gap-4 text-ink-2 leading-relaxed">
                <p>{s.what}</p>
                <dl className="grid grid-cols-[6rem_1fr] gap-y-1.5 gap-x-4 text-[0.875rem]">
                  <dt className="text-muted">How</dt>
                  <dd>{s.how}</dd>
                  <dt className="text-muted">Where</dt>
                  <dd>{s.where}</dd>
                </dl>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section className="pt-20 md:pt-28" width="text" reveal>
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 hair pt-10">
          <div className="flex flex-col gap-4">
            <h2 className="h-section text-[1.75rem]">Watches</h2>
            <p className="text-ink-2 leading-relaxed">
              Battery and band changes at either store. We also sell pre-owned Rolex watches, authenticated by our watchmaker. We are an independent jeweler, not affiliated with or authorized by Rolex.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="h-section text-[1.75rem]">The Lifetime Care Program</h2>
            <p className="text-ink-2 leading-relaxed">Every piece we make comes with cleaning, inspection and polishing for as long as you own it, at either store, at no charge. It is a service, not a warranty; the warranty is separate and written down.</p>
            <Link href="/care" className="link self-start">
              The program
            </Link>
          </div>
        </div>
        <p className="text-[0.8125rem] text-muted mt-12">
          {STORES.map((s) => `${s.name} ${s.phone}`).join(" · ")}
        </p>
      </Section>
    </>
  );
}

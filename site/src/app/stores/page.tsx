import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Section";
import { Pic } from "@/components/Pic";
import { STORES, TOTAL_REVIEWS } from "@/lib/catalog/data";
import { FIGURES_AS_OF } from "@/lib/site";
import { JsonLd, breadcrumbJsonLd, storeJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Stores in Brentwood and Mt. Juliet, Tennessee",
  description: "American Jewelry has two stores in Middle Tennessee: the salon on Franklin Road in Brentwood and the workshop at Providence Marketplace in Mt. Juliet. Hours, phone numbers, services and appointments.",
  alternates: { canonical: "/stores" },
};

export default function StoresPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Stores", href: "/stores" }])} />
      {STORES.map((s) => (
        <JsonLd key={s.slug} data={storeJsonLd(s)} />
      ))}
      <Section className="pt-12 md:pt-20 pb-12 md:pb-16">
        <div className="flex flex-col gap-5 max-w-3xl">
          <h1 className="h-display text-[3rem] md:text-[4.5rem]">Two stores. One bench.</h1>
          <p className="lede measure">
            Brentwood is the salon, where the pieces are shown. Mt. Juliet is the workshop, where they are made and cared for. Between them, {TOTAL_REVIEWS.toLocaleString()} Google reviews as of {FIGURES_AS_OF}.
          </p>
        </div>
      </Section>

      <div className="flex flex-col gap-24 md:gap-32">
        {STORES.map((s, i) => (
          <Section key={s.slug} reveal>
            <div className={`grid md:grid-cols-12 gap-8 md:gap-12 items-start`}>
              <Link href={`/stores/${s.slug}`} className={`md:col-span-7 ${i % 2 === 1 ? "md:col-start-6 md:order-2" : ""} relative aspect-[4/3] md:aspect-[3/2] overflow-hidden bg-paper img-hover block`}>
                <Pic k={s.photo} sizes="(min-width: 768px) 58vw, 100vw" priority={i === 0} />
              </Link>
              <div className={`md:col-span-5 ${i % 2 === 1 ? "md:col-start-1 md:row-start-1" : ""} flex flex-col gap-6`}>
                <div className="flex flex-col gap-2">
                  <h2 className="h-section text-[2.5rem] md:text-[3.25rem]">{s.name}</h2>
                  <p className="text-ink-2">{s.role}</p>
                </div>
                <address className="not-italic text-ink-2 leading-relaxed">
                  {s.address1}
                  <br />
                  {s.city}, {s.state} {s.zip}
                  <br />
                  <a href={`tel:${s.phone.replace(/\D/g, "")}`} className="link-quiet">
                    {s.phone}
                  </a>
                </address>
                <dl className="flex flex-col gap-1 text-sm hair pt-4">
                  {s.hours.map((h) => (
                    <div key={h.days} className="flex justify-between gap-4 max-w-xs">
                      <dt className="text-muted">{h.days}</dt>
                      <dd className="text-ink-2">{h.open}</dd>
                    </div>
                  ))}
                  {!s.hoursConfirmed && <dd className="text-[0.75rem] text-muted pt-1">Hours shown are provisional; call before a long drive.</dd>}
                </dl>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link href={`/appointments?store=${s.slug}`} className="btn">
                    Book in {s.name}
                  </Link>
                  <Link href={`/stores/${s.slug}`} className="btn btn-outline">
                    The store
                  </Link>
                </div>
              </div>
            </div>
          </Section>
        ))}
      </div>

      <Section className="pt-24 md:pt-32" width="text" reveal>
        <div className="hair pt-8 grid md:grid-cols-2 gap-8 md:gap-16">
          <h2 className="h-section text-[1.75rem] md:text-[2rem]">Walk in, or book</h2>
          <div className="flex flex-col gap-4 text-ink-2 leading-relaxed">
            <p>Walk-ins are welcome at both stores for cleaning, inspection, repairs and a look at the cases. For bridal, a commission, or a Royal American viewing, book an hour so the right pieces and the right person are waiting.</p>
            <p>Both stores take the same appointment form, and either can pull up a design code from the ring builder.</p>
          </div>
        </div>
      </Section>
    </>
  );
}

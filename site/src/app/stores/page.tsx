import type { Metadata } from "next";
import Link from "next/link";
import { Section, PageTitle } from "@/components/Section";
import { Pic } from "@/components/Pic";
import { STORES, TOTAL_REVIEWS } from "@/lib/catalog/data";
import { STORE_PHOTO } from "@/lib/catalog/photos";
import { JsonLd, storeJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Stores",
  description: "American Jewelry in Brentwood and Mt. Juliet, Tennessee. Salon, workshop, hours and appointments.",
};

export default function StoresPage() {
  return (
    <>
      {STORES.map((s) => (
        <JsonLd key={s.slug} data={storeJsonLd(s)} />
      ))}
      <Section className="pt-16 md:pt-24 pb-12 md:pb-16">
        <PageTitle eyebrow="Tennessee" title="Two stores. One bench." lede={`Brentwood is the salon; Mt. Juliet is the workshop. ${TOTAL_REVIEWS.toLocaleString()} Google reviews between them.`} />
      </Section>
      <Section>
        <div className="grid md:grid-cols-2 gap-10 md:gap-12">
          {STORES.map((s) => (
            <div key={s.slug} className="flex flex-col gap-6">
              <Link href={`/stores/${s.slug}`} className="relative aspect-[16/10] overflow-hidden bg-ivory img-hover block">
                <Pic k={STORE_PHOTO[s.slug]} sizes="(min-width: 768px) 50vw, 100vw" />
              </Link>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <span className="h-section text-[1.75rem]">{s.name}</span>
                  <span className="text-sm text-ink-2 leading-relaxed">
                    {s.address1}
                    <br />
                    {s.city}, {s.state} {s.zip}
                    <br />
                    <span className="select-all">{s.phone}</span>
                  </span>
                  <span className="caps-sm text-muted mt-1">
                    {s.rating.toFixed(1)} ★ · {s.reviews.toLocaleString()} reviews
                  </span>
                </div>
                <dl className="flex flex-col gap-1 text-sm">
                  {s.hours.map((h) => (
                    <div key={h.days} className="flex justify-between gap-4">
                      <dt className="text-muted">{h.days}</dt>
                      <dd className="text-ink-2">{h.open}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href={`/appointments?store=${s.slug}`} className="btn">
                  Book an appointment
                </Link>
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.mapQuery)}`} target="_blank" rel="noreferrer" className="btn btn-outline">
                  Directions
                </a>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[0.75rem] text-muted mt-10">Hours are placeholders until confirmed.</p>
      </Section>
    </>
  );
}

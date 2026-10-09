import type { Metadata } from "next";
import Link from "next/link";
import { Section, Heading } from "@/components/Section";
import { STORES, TOTAL_REVIEWS } from "@/lib/catalog/data";
import { JsonLd, storeJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Stores",
  description: "American Jewelry in Brentwood and Mt. Juliet, Tennessee. Salon, workshop, hours, and appointments.",
};

export default function StoresPage() {
  return (
    <>
      {STORES.map((s) => (
        <JsonLd key={s.slug} data={storeJsonLd(s)} />
      ))}
      <Section className="pt-20 pb-14">
        <Heading eyebrow="Tennessee" title="Two stores. One bench." lede={`Brentwood is the salon; Mt. Juliet is the workshop. ${TOTAL_REVIEWS.toLocaleString()} reviews between them.`} size="xl" />
      </Section>
      <Section>
        <div className="grid md:grid-cols-2 gap-8">
          {STORES.map((s) => (
            <div key={s.slug} className="border border-line bg-paper p-8 flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <span className="eyebrow">{s.role}</span>
                <h2 className="font-display text-4xl text-navy">{s.name}</h2>
              </div>
              <div className="text-ink/85 leading-relaxed">
                {s.address1}
                <br />
                {s.city}, {s.state} {s.zip}
                <br />
                <span className="select-all">{s.phone}</span>
              </div>
              <dl className="grid grid-cols-[9rem_1fr] gap-y-1 text-sm">
                {s.hours.map((h) => (
                  <div key={h.days} className="contents">
                    <dt className="text-muted">{h.days}</dt>
                    <dd className="text-ink/85">{h.open}</dd>
                  </div>
                ))}
              </dl>
              <span className="label text-navy">
                {s.rating.toFixed(1)} ★ · {s.reviews.toLocaleString()} Google reviews
              </span>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href={`/stores/${s.slug}`} className="btn">
                  This store
                </Link>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.mapQuery)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-ghost"
                >
                  Directions
                </a>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted mt-6">Hours shown are placeholders until confirmed by the family.</p>
      </Section>
    </>
  );
}

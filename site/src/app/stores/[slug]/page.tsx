import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section, Heading } from "@/components/Section";
import { STORES, storeBySlug } from "@/lib/catalog/data";
import { JsonLd, storeJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return STORES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = storeBySlug(slug);
  return s
    ? {
        title: `${s.name} store`,
        description: `American Jewelry ${s.name}: ${s.address1}, ${s.city}, TN. ${s.role} ${s.rating} stars from ${s.reviews.toLocaleString()} reviews.`,
      }
    : {};
}

export default async function StorePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = storeBySlug(slug);
  if (!s) notFound();
  const other = STORES.find((x) => x.slug !== s.slug)!;

  return (
    <>
      <JsonLd data={storeJsonLd(s)} />
      <Section className="pt-20 pb-14">
        <Heading eyebrow={`American Jewelry · ${s.city}, Tennessee`} title={s.name} lede={s.role} size="xl" />
      </Section>
      <Section>
        <div className="grid md:grid-cols-[1fr_1fr_1.2fr] gap-10 border-t border-navy pt-8">
          <div className="flex flex-col gap-4">
            <span className="label text-gilt">Address</span>
            <p className="text-ink/85 leading-relaxed">
              {s.address1}
              <br />
              {s.city}, {s.state} {s.zip}
            </p>
            <span className="label text-gilt">Phone</span>
            <p className="text-ink/85 select-all">{s.phone}</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.mapQuery)}`}
              target="_blank"
              rel="noreferrer"
              className="label text-navy hover:text-gilt"
            >
              Directions →
            </a>
          </div>
          <div className="flex flex-col gap-4">
            <span className="label text-gilt">Hours</span>
            <dl className="flex flex-col gap-1 text-sm">
              {s.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-4">
                  <dt className="text-muted">{h.days}</dt>
                  <dd className="text-ink/85">{h.open}</dd>
                </div>
              ))}
            </dl>
            <span className="label text-navy">
              {s.rating.toFixed(1)} ★ · {s.reviews.toLocaleString()} Google reviews
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <span className="label text-gilt">At this store</span>
            <ul className="flex flex-col gap-2 text-ink/85">
              {s.services.map((x) => (
                <li key={x} className="border-b border-line pb-2">
                  {x}
                </li>
              ))}
            </ul>
            <Link href={`/appointments?store=${s.slug}`} className="btn self-start mt-2">
              Book an appointment in {s.name}
            </Link>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <span className="text-ink/80">Looking for {other.name}?</span>
          <Link href={`/stores/${other.slug}`} className="label text-navy hover:text-gilt">
            {other.name} store →
          </Link>
        </div>
      </Section>
    </>
  );
}

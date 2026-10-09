import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageFallback } from "@/components/PageFallback";
import { Section, PageTitle } from "@/components/Section";
import { PhotoBand } from "@/components/PhotoBand";
import { STORES, storeBySlug } from "@/lib/catalog/data";
import { STORE_PHOTO } from "@/lib/catalog/photos";
import { JsonLd, storeJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return STORES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = storeBySlug(slug);
  return s ? { title: `${s.name} store`, description: `American Jewelry ${s.name}: ${s.address1}, ${s.city}, TN. ${s.role}` } : {};
}

export default function StorePage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<PageFallback />}>
      <StorePageContent params={params} />
    </Suspense>
  );
}

async function StorePageContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = storeBySlug(slug);
  if (!s) notFound();
  const other = STORES.find((x) => x.slug !== s.slug)!;

  return (
    <>
      <JsonLd data={storeJsonLd(s)} />
      <Section className="pt-16 md:pt-24 pb-12 md:pb-16">
        <PageTitle eyebrow={`American Jewelry · ${s.city}, Tennessee`} title={s.name} lede={s.role} />
      </Section>
      <Section>
        <PhotoBand k={STORE_PHOTO[s.slug]} />
      </Section>
      <Section className="pt-16 md:pt-24">
        <div className="grid md:grid-cols-3 gap-10 hair pt-10">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <span className="caps-sm text-muted">Address</span>
              <p className="text-ink-2 leading-relaxed">
                {s.address1}
                <br />
                {s.city}, {s.state} {s.zip}
              </p>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="caps-sm text-muted">Phone</span>
              <p className="text-ink-2 select-all">{s.phone}</p>
            </div>
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.mapQuery)}`} target="_blank" rel="noreferrer" className="link self-start">
              Directions
            </a>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <span className="caps-sm text-muted">Hours</span>
              <dl className="flex flex-col gap-1 text-sm">
                {s.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-4 max-w-xs">
                    <dt className="text-muted">{h.days}</dt>
                    <dd className="text-ink-2">{h.open}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <span className="caps-sm text-muted">
              {s.rating.toFixed(1)} ★ · {s.reviews.toLocaleString()} Google reviews
            </span>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <span className="caps-sm text-muted">At this store</span>
              <ul className="flex flex-col text-sm text-ink-2">
                {s.services.map((x) => (
                  <li key={x} className="py-2 border-b border-hair">
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <Link href={`/appointments?store=${s.slug}`} className="btn self-start">
              Book in {s.name}
            </Link>
          </div>
        </div>
        <div className="mt-20 hair pt-6 flex flex-wrap items-center justify-between gap-4">
          <span className="text-ink-2">Looking for {other.name}?</span>
          <Link href={`/stores/${other.slug}`} className="link">
            {other.name} store
          </Link>
        </div>
      </Section>
    </>
  );
}

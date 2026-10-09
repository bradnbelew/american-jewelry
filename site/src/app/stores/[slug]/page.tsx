import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageFallback } from "@/components/PageFallback";
import { Section, SplitOpener } from "@/components/Section";
import { STORES, storeBySlug } from "@/lib/catalog/data";
import { FIGURES_AS_OF } from "@/lib/site";
import { JsonLd, breadcrumbJsonLd, storeJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return STORES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = storeBySlug(slug);
  return s
    ? {
        title: `American Jewelry, ${s.city}, Tennessee`,
        description: `American Jewelry in ${s.city}: ${s.address1}, ${s.city}, TN ${s.zip}. ${s.phone}. ${s.role} Appointments, hours and services.`,
        alternates: { canonical: `/stores/${s.slug}` },
      }
    : {};
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
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.mapQuery)}`;

  return (
    <>
      <JsonLd data={storeJsonLd(s)} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Stores", href: "/stores" }, { name: s.name, href: `/stores/${s.slug}` }])} />
      <SplitOpener kicker={`American Jewelry, ${s.city}, Tennessee`} title={s.name} lede={s.role} photo={s.photo}>
        <div className="flex flex-wrap gap-3">
          <Link href={`/appointments?store=${s.slug}`} className="btn">
            Book in {s.name}
          </Link>
          <a href={maps} target="_blank" rel="noreferrer" className="btn btn-outline">
            Directions
          </a>
        </div>
      </SplitOpener>

      <Section className="pt-20 md:pt-28" reveal>
        <div className="grid md:grid-cols-12 gap-10 hair pt-10">
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <h2 className="h-item text-[1.125rem]">Address</h2>
              <address className="not-italic text-ink-2 leading-relaxed">
                {s.address1}
                <br />
                {s.city}, {s.state} {s.zip}
              </address>
              <p className="text-[0.875rem] text-muted">{s.place}</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <h2 className="h-item text-[1.125rem]">Phone</h2>
              <a href={`tel:${s.phone.replace(/\D/g, "")}`} className="link-quiet self-start text-ink-2">
                {s.phone}
              </a>
            </div>
            <div className="flex flex-col gap-1.5">
              <h2 className="h-item text-[1.125rem]">Hours</h2>
              <dl className="flex flex-col gap-1 text-sm">
                {s.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-4 max-w-xs">
                    <dt className="text-muted">{h.days}</dt>
                    <dd className="text-ink-2">{h.open}</dd>
                  </div>
                ))}
              </dl>
              {!s.hoursConfirmed && <p className="text-[0.75rem] text-muted">Hours shown are provisional; call before a long drive.</p>}
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h2 className="h-item text-[1.125rem]">What to expect</h2>
              <p className="text-ink-2 leading-relaxed">{s.expect}</p>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="h-item text-[1.125rem]">Reviews</h2>
              <p className="text-ink-2 leading-relaxed">
                {s.reviews.toLocaleString()} Google reviews for this store as of {FIGURES_AS_OF}, averaging {s.rating.toFixed(1)}. Read them on Google; we show none here so that none are chosen for you.
              </p>
              <a href={maps} target="_blank" rel="noreferrer" className="link-quiet self-start text-ink-2">
                Read the reviews on Google
              </a>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h2 className="h-item text-[1.125rem]">At this store</h2>
              <ul className="flex flex-col text-sm text-ink-2">
                {s.services.map((x) => (
                  <li key={x} className="py-2 border-b border-hair">
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <Link href="/services" className="link self-start">
              All services
            </Link>
          </div>
        </div>
      </Section>

      <Section className="pt-24 md:pt-32" width="text" reveal>
        <div className="hair pt-8 flex flex-wrap items-center justify-between gap-6">
          <p className="text-ink-2 max-w-xl leading-relaxed">
            {s.slug === "brentwood"
              ? "Repairs, resizing and lifetime care happen at the bench in Mt. Juliet. Bring a piece to Brentwood and we carry it over; or go straight to the workshop."
              : "Royal American pieces and most bridal fittings are shown in the Brentwood salon by appointment. The workshop can bring any piece over for you."}
          </p>
          <Link href={`/stores/${other.slug}`} className="link">
            The {other.name} store
          </Link>
        </div>
      </Section>
    </>
  );
}

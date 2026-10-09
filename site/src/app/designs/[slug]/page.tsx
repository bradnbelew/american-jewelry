import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import { PageFallback } from "@/components/PageFallback";
import { Section, PageTitle } from "@/components/Section";
import { PhotoBand } from "@/components/PhotoBand";
import { ProductTile } from "@/components/ProductTile";
import { DESIGNS, designBySlug, piecesForDesign, tierBySlug } from "@/lib/catalog/data";
import { DESIGN_PHOTO } from "@/lib/catalog/photos";

export function generateStaticParams() {
  return DESIGNS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = designBySlug(slug);
  return d ? { title: `${d.name} design`, description: d.motif } : {};
}

export default function DesignPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<PageFallback />}>
      <DesignPageContent params={params} />
    </Suspense>
  );
}

async function DesignPageContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = designBySlug(slug);
  if (!d) notFound();
  const tier = tierBySlug(d.tier);
  const pieces = piecesForDesign(d.slug);

  return (
    <>
      <Section className="pt-16 md:pt-24 pb-12 md:pb-16">
        <PageTitle eyebrow={`${tier.name} · Design`} title={d.name} lede={d.motif} />
      </Section>
      <Section>
        <PhotoBand k={DESIGN_PHOTO[d.slug]} />
      </Section>
      <Section className="pt-16 md:pt-24" width="text">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 hair pt-10">
          <p className="lede">{d.story}</p>
          <dl className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <dt className="caps-sm text-muted">Signature</dt>
              <dd className="text-ink-2 leading-relaxed">{d.signature}</dd>
            </div>
            <div className="flex flex-col gap-1.5">
              <dt className="caps-sm text-muted">Versions</dt>
              <dd className="text-ink-2 leading-relaxed">
                {d.tier === "americana"
                  ? "Solid gold, birthstone, and natural diamond. Same drawing, three ways."
                  : "Man-made diamonds only, D–F, VVS, to the New American Standard."}
              </dd>
            </div>
            <Link href={`/${tier.slug}`} className="link self-start">
              All of {tier.name}
            </Link>
          </dl>
        </div>
      </Section>
      <Section className="pt-16 md:pt-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 md:gap-x-8">
          {pieces.map((p) => (
            <ProductTile key={p.handle} piece={p} />
          ))}
        </div>
      </Section>
    </>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import { PageFallback } from "@/components/PageFallback";
import { Section, PageTitle } from "@/components/Section";
import { PhotoBand } from "@/components/PhotoBand";
import { ProductTile } from "@/components/ProductTile";
import { COLLECTIONS, collectionBySlug, piecesForCollection, tierBySlug } from "@/lib/catalog/data";
import { COLLECTION_PHOTO } from "@/lib/catalog/photos";

export const dynamicParams = false;

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = collectionBySlug(slug);
  return c ? { title: `${c.name} collection`, description: c.intro } : {};
}

export default function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<PageFallback />}>
      <CollectionPageContent params={params} />
    </Suspense>
  );
}

async function CollectionPageContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = collectionBySlug(slug);
  if (!c) notFound();
  const pieces = piecesForCollection(c.slug);

  return (
    <>
      <Section className="pt-16 md:pt-24 pb-12 md:pb-16">
        <PageTitle eyebrow="Collection" title={c.name} lede={c.intro} />
      </Section>
      <Section>
        <PhotoBand k={COLLECTION_PHOTO[c.slug]} />
      </Section>
      <Section className="pt-16 md:pt-24" width="text">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 hair pt-10">
          <p className="lede">{c.story}</p>
          {c.slug === "bridal" ? (
            <div className="flex flex-col gap-4">
              <span className="caps-sm text-muted">Start with the setting</span>
              <p className="text-ink-2 leading-relaxed">
                Choose the setting, then the stone: natural (Americana) or man-made (New American). The builder shows the
                price for each side by side and labels every ring with which stone it holds.
              </p>
              <Link href="/build/ring" className="btn self-start">
                Build a ring
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <span className="caps-sm text-muted">Made to order</span>
              <p className="text-ink-2 leading-relaxed">
                Every piece here is made for you after you order it. Expect two to five weeks, and a note from the bench
                when it is cast.
              </p>
            </div>
          )}
        </div>
      </Section>
      <Section className="pt-16 md:pt-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 md:gap-x-8">
          {pieces.map((p) => (
            <ProductTile key={p.handle} piece={p} eyebrow={tierBySlug(p.tier).name} />
          ))}
        </div>
      </Section>
    </>
  );
}

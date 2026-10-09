import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import { PageFallback } from "@/components/PageFallback";
import { Section, SplitOpener } from "@/components/Section";
import { ProductTile } from "@/components/ProductTile";
import { Pic } from "@/components/Pic";
import { COLLECTIONS, collectionBySlug, piecesForCollection, tierBySlug } from "@/lib/catalog/data";
import { COLLECTION_PHOTO } from "@/lib/catalog/photos";
import { SETTINGS } from "@/lib/builder/model";
import { DESIGN_NOTES, SETTING_PHOTO } from "@/lib/builder/notes";
import { JsonLd, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = collectionBySlug(slug);
  return c ? { title: `${c.name} collection`, description: c.intro, alternates: { canonical: `/collections/${c.slug}` } } : {};
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
  const bridal = c.slug === "bridal";

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: `${c.name} collection`, href: `/collections/${c.slug}` }])} />
      <JsonLd data={itemListJsonLd(`${c.name} collection`, pieces)} />
      <SplitOpener kicker="A collection" title={c.name} lede={c.intro} photo={COLLECTION_PHOTO[c.slug]}>
        {bridal && (
          <Link href="/build/ring" className="btn self-start">
            Build a ring
          </Link>
        )}
      </SplitOpener>

      <Section className="pt-20 md:pt-28" reveal>
        <div className="grid md:grid-cols-12 gap-10 md:gap-12 hair pt-8">
          <p className="md:col-span-7 h-section text-[1.75rem] md:text-[2.25rem] measure">{c.story}</p>
          <div className="md:col-span-4 md:col-start-9 flex flex-col gap-3 text-ink-2 leading-relaxed">
            {bridal ? (
              <>
                <span className="h-item text-[1.125rem] text-ink">Two stones, one setting</span>
                <p>Every engagement setting is sold with either stone. A natural diamond places the ring in Americana; a man-made diamond places it in New American. The ring builder prices both side by side and labels each plainly.</p>
              </>
            ) : (
              <>
                <span className="h-item text-[1.125rem] text-ink">Made to order</span>
                <p>Every piece here is made for you after you order it. Expect two to five weeks, and a note from the bench when it is cast.</p>
              </>
            )}
          </div>
        </div>
      </Section>

      {bridal && (
        <Section className="pt-20 md:pt-28" reveal>
          <h2 className="h-section text-[2rem] md:text-[2.5rem] mb-10 hair pt-8">Three settings, two stones</h2>
          <ul className="grid grid-cols-3 gap-4 md:gap-8">
            {SETTINGS.map((s) => (
              <li key={s}>
                <Link href={`/build/ring?setting=${s}`} className="group flex flex-col gap-3">
                  <span className="relative block aspect-[4/5] overflow-hidden bg-paper img-hover">
                    <Pic k={SETTING_PHOTO[s]} sizes="30vw" />
                  </span>
                  <span className="h-item text-[1.25rem] md:text-[1.5rem] group-hover:text-muted transition-colors">{DESIGN_NOTES[s].name}</span>
                  <span className="text-[0.8125rem] text-muted leading-snug hidden sm:block">{DESIGN_NOTES[s].line}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section className="pt-24 md:pt-32" reveal>
        <div className="flex items-end justify-between gap-6 mb-10 md:mb-12 hair pt-8">
          <h2 className="h-section text-[2rem] md:text-[2.5rem]">{bridal ? "Bands and ready settings" : `The ${c.name} pieces`}</h2>
          <span className="text-[0.8125rem] text-muted">{pieces.length} pieces</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 md:gap-x-8">
          {pieces.map((p) => (
            <ProductTile key={p.handle} piece={p} eyebrow={tierBySlug(p.tier).name} />
          ))}
        </div>
      </Section>
    </>
  );
}

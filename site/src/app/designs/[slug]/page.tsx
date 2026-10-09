import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import { PageFallback } from "@/components/PageFallback";
import { Section, SplitOpener } from "@/components/Section";
import { Pic } from "@/components/Pic";
import { ProductTile } from "@/components/ProductTile";
import { DESIGNS, designBySlug, piecesForDesign, tierBySlug } from "@/lib/catalog/data";
import { DESIGN_PHOTO, PIECE_PHOTOS } from "@/lib/catalog/photos";
import { SETTINGS, type SettingKey } from "@/lib/builder/model";
import { JsonLd, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return DESIGNS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = designBySlug(slug);
  return d ? { title: `${d.name}, a house design`, description: `${d.motif} ${d.story}`, alternates: { canonical: `/designs/${d.slug}` } } : {};
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
  const drawable = (SETTINGS as readonly string[]).includes(d.slug) ? (d.slug as SettingKey) : null;
  const second = pieces.find((p) => (PIECE_PHOTOS[p.handle] ?? [])[0] !== DESIGN_PHOTO[d.slug]);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: tier.name, href: `/${tier.slug}` }, { name: d.name, href: `/designs/${d.slug}` }])} />
      <JsonLd data={itemListJsonLd(`${d.name} design`, pieces)} />
      <SplitOpener kicker={`${/^[aeiou]/i.test(tier.name) ? "An" : "A"} ${tier.name} design`} title={d.name} lede={d.motif} photo={DESIGN_PHOTO[d.slug]}>
        <Link href={`/${tier.slug}`} className="link self-start">
          All of {tier.name}
        </Link>
      </SplitOpener>

      {/* The biography: the story, the signature, the versions, and the drawing where one exists. */}
      <Section className="pt-20 md:pt-28" reveal>
        <div className="grid md:grid-cols-12 gap-10 md:gap-12">
          <div className="md:col-span-7 flex flex-col gap-8">
            <p className="h-section text-[1.75rem] md:text-[2.25rem] measure">{d.story}</p>
            <dl className="grid sm:grid-cols-2 gap-8 hair pt-8">
              <div className="flex flex-col gap-2">
                <dt className="h-item text-[1.125rem]">The signature</dt>
                <dd className="text-ink-2 leading-relaxed">{d.signature}</dd>
              </div>
              <div className="flex flex-col gap-2">
                <dt className="h-item text-[1.125rem]">The versions</dt>
                <dd className="text-ink-2 leading-relaxed">
                  {d.tier === "americana"
                    ? "Solid gold, birthstone, and natural diamond. The same drawing, three ways, so a piece can begin in gold and be set later."
                    : "Man-made diamonds only, D-F color and VVS clarity, to the New American Standard. The same setting takes a natural diamond in the ring builder."}
                </dd>
              </div>
            </dl>
          </div>
          <div className="md:col-span-4 md:col-start-9 flex flex-col gap-4">
            {second && (
              <div className="relative aspect-[4/5] overflow-hidden bg-paper">
                <Pic k={(PIECE_PHOTOS[second.handle] ?? ["hero-box"])[0]} sizes="(min-width: 768px) 33vw, 100vw" />
              </div>
            )}
          </div>
        </div>
      </Section>

      <Section className="pt-24 md:pt-32" reveal>
        <div className="flex items-end justify-between gap-6 mb-10 md:mb-12 hair pt-8">
          <h2 className="h-section text-[2rem] md:text-[2.5rem]">Every {d.name} piece</h2>
          <span className="text-[0.8125rem] text-muted">{pieces.length} pieces</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 md:gap-x-8">
          {pieces.map((p) => (
            <ProductTile key={p.handle} piece={p} />
          ))}
        </div>
      </Section>

      {drawable && (
        <Section className="pt-24 md:pt-32" width="text" reveal>
          <div className="hair pt-8 flex flex-wrap items-center justify-between gap-6">
            <p className="text-ink-2 max-w-xl leading-relaxed">{d.name} is one of the three settings in the ring builder. Choose the stone, the metal and the fit, and see the ring as you decide.</p>
            <Link href={`/build/ring?setting=${drawable}`} className="btn">
              Build on {d.name}
            </Link>
          </div>
        </Section>
      )}
    </>
  );
}

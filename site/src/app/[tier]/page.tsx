import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import { PageFallback } from "@/components/PageFallback";
import { Section, SplitOpener, PhotoOpener } from "@/components/Section";
import { Pic } from "@/components/Pic";
import { ProductTile } from "@/components/ProductTile";
import { TIERS, designsForTier, piecesForTier, piecesForDesign } from "@/lib/catalog/data";
import { DESIGN_PHOTO, PIECE_PHOTOS, TIER_PHOTO } from "@/lib/catalog/photos";
import type { TierSlug } from "@/lib/catalog/types";
import { JsonLd, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return TIERS.map((t) => ({ tier: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ tier: string }> }): Promise<Metadata> {
  const { tier } = await params;
  const t = TIERS.find((x) => x.slug === tier);
  return t ? { title: t.name, description: `${t.tagline} ${t.stones}`, alternates: { canonical: `/${t.slug}` } } : {};
}

export default function TierPage({ params }: { params: Promise<{ tier: string }> }) {
  return (
    <Suspense fallback={<PageFallback />}>
      <TierPageContent params={params} />
    </Suspense>
  );
}

async function TierPageContent({ params }: { params: Promise<{ tier: string }> }) {
  const { tier } = await params;
  const t = TIERS.find((x) => x.slug === tier);
  if (!t) notFound();
  const slug = t.slug as TierSlug;
  const designs = designsForTier(slug);
  const pieces = piecesForTier(slug);

  if (slug === "royal-american") {
    return (
      <>
        <JsonLd data={breadcrumbJsonLd([{ name: t.name, href: `/${t.slug}` }])} />
        <JsonLd data={itemListJsonLd(t.name, pieces)} />
        <PhotoOpener photo={TIER_PHOTO[slug]} position="50% 45%" title="Royal American" lede="Pieces made once and never again, numbered, and entered in the house registry under the name of the person who wears them." />

        <Section className="pt-20 md:pt-28" width="text" reveal>
          <p className="h-section text-[1.75rem] md:text-[2.5rem] text-center max-w-4xl mx-auto">
            Each begins as a drawing. The stone is found for it, the drawing is made for the stone, and when it is finished the design is retired. There is one, and it is yours.
          </p>
        </Section>

        <div className="mt-20 md:mt-28 flex flex-col gap-24 md:gap-36">
          {pieces.map((p, i) => {
            const photos = PIECE_PHOTOS[p.handle] ?? ["hero-box"];
            const stones = p.versions[0];
            return (
              <article key={p.handle} className="reveal">
                <Section>
                  <Link href={`/pieces/${p.handle}`} className="relative block aspect-[4/3] md:aspect-[2.4/1] overflow-hidden bg-paper img-hover">
                    <Pic k={photos[0]} sizes="100vw" priority={i === 0} />
                  </Link>
                </Section>
                <Section className="pt-10 md:pt-14">
                  <div className="grid md:grid-cols-12 gap-8 md:gap-12">
                    <div className="md:col-span-5 flex flex-col gap-3">
                      <span className="text-[0.8125rem] text-muted">Royal American No. {p.oneOfOne?.number}</span>
                      <h2 className="h-display text-[2.5rem] md:text-[3.5rem]">{p.name.replace(/^No\. \d+ · /, "")}</h2>
                      <span className="text-ink-2">{stones.stones}</span>
                    </div>
                    <div className="md:col-span-6 md:col-start-7 flex flex-col gap-6">
                      <p className="lede measure">{p.description}</p>
                      <dl className="grid grid-cols-[7rem_1fr] gap-y-2 gap-x-4 text-[0.875rem] hair pt-5">
                        {p.specs.map((s) => (
                          <div key={s.label} className="contents">
                            <dt className="text-muted">{s.label}</dt>
                            <dd className="text-ink-2">{s.value}</dd>
                          </div>
                        ))}
                        <dt className="text-muted">Status</dt>
                        <dd className="text-ink-2">{p.leadTime}</dd>
                      </dl>
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
                        <Link href={`/appointments?tier=royal-american&piece=${p.handle}`} className="btn">
                          Request a private viewing
                        </Link>
                        <Link href={`/pieces/${p.handle}`} className="link">
                          The piece
                        </Link>
                      </div>
                    </div>
                  </div>
                </Section>
              </article>
            );
          })}
        </div>

        <section className="mt-24 md:mt-36 bg-paper">
          <Section className="py-20 md:py-28" width="text" reveal>
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
              <h2 className="h-section text-[2rem] md:text-[2.5rem]">The registry</h2>
              <div className="flex flex-col gap-5 text-ink-2 leading-relaxed">
                <p>
                  Every Royal American piece is numbered in the order it was finished and entered in the house registry with the name of its owner, the drawing it came from, the reports on its stones and the hands that made it. The house undertakes never to make it again.
                </p>
                <p>Pieces are shown in the Brentwood salon by appointment. Prices are not published. A release is announced to the client list first; what remains is shown here. Pieces that have found their owners stay in the registry.</p>
                <div className="flex flex-wrap gap-x-6 gap-y-3 pt-2">
                  <Link href="/appointments?tier=royal-american" className="btn self-start">
                    Request a private viewing
                  </Link>
                  <Link href="/commission" className="link self-center">
                    Commission a one-of-one
                  </Link>
                </div>
              </div>
            </div>
          </Section>
        </section>
      </>
    );
  }

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: t.name, href: `/${t.slug}` }])} />
      <JsonLd data={itemListJsonLd(t.name, pieces)} />
      <SplitOpener kicker={t.tagline} title={t.name} lede={t.intro} photo={TIER_PHOTO[slug]} position="50% 40%">
        <p className="text-[0.875rem] text-ink-2">{t.stones}</p>
      </SplitOpener>

      {slug === "new-american" && <Standard />}

      {designs.map((d) => {
        const ps = piecesForDesign(d.slug);
        return (
          <Section key={d.slug} className="pt-24 md:pt-32" reveal>
            <Link href={`/designs/${d.slug}`} className="group relative block aspect-[4/5] sm:aspect-[16/9] md:aspect-[2.6/1] overflow-hidden bg-navy mb-12 md:mb-16">
              <Pic k={DESIGN_PHOTO[d.slug]} sizes="100vw" position="50% 45%" />
              <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-6 md:p-12 flex flex-col gap-3 text-white on-photo">
                <span className="h-display text-[2.75rem] md:text-[4.5rem]">{d.name}</span>
                <span className="lede !text-white/90 max-w-xl">{d.motif}</span>
                <span className="link link-light self-start mt-2">The design</span>
              </span>
            </Link>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 md:gap-x-8">
              {ps.map((p) => (
                <ProductTile key={p.handle} piece={p} />
              ))}
            </div>
          </Section>
        );
      })}

      <Section className="pt-24 md:pt-32" width="text" reveal>
        <div className="hair pt-8 flex flex-wrap items-center justify-between gap-6">
          <p className="text-ink-2 max-w-xl leading-relaxed">
            {slug === "americana"
              ? "Every Americana design is also a bridal setting. Choose it in the ring builder with a natural diamond and it stays in Americana; choose a man-made diamond and the same ring is New American."
              : "Every New American setting is also available with a natural diamond. Choose it in the ring builder and the same ring is Americana."}
          </p>
          <Link href="/build/ring" className="btn">
            Build a ring
          </Link>
        </div>
      </Section>
    </>
  );
}

function Standard() {
  const rows: [string, string][] = [
    ["Color", "D, E or F only. Colorless, every stone, including the small ones."],
    ["Clarity", "VVS1 or VVS2. Nothing visible under a loupe at a glance."],
    ["Cut", "Excellent or Ideal, Hearts and Arrows on round centers."],
    ["Grading", "IGI Laboratory Grown Diamond Report on every center stone 0.30 ct and above, laser inscribed."],
    ["Disclosure", "Every piece says man-made diamond, names the growth method, and any post-growth treatment."],
    ["Metal", "Solid 14k or 18k gold or platinum. Never plated, never vermeil, never hollow."],
    ["Made", "Designed in Tennessee. Set and finished at our bench. Diamonds and gold are imported."],
    ["Care", "Lifetime Care Program: cleaning, prong checks and polishing at either store."],
  ];
  return (
    <section className="mt-20 md:mt-28 bg-paper">
      <Section className="py-16 md:py-24" reveal>
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-4 flex flex-col gap-4">
            <h2 className="h-section text-[2.25rem] md:text-[3rem]">The New American Standard</h2>
            <p className="text-ink-2 leading-relaxed">
              A man-made diamond is grown, not mined, and its value is in the design, the gold and the hands that set it. So we never sell it by the carat. We sell it by this, published on every piece.
            </p>
          </div>
          <dl className="md:col-span-7 md:col-start-6 grid sm:grid-cols-2 gap-x-10 gap-y-6">
            {rows.map(([k, v]) => (
              <div key={k} className="flex flex-col gap-1.5 hair pt-4">
                <dt className="h-item text-[1.125rem]">{k}</dt>
                <dd className="text-sm text-ink-2 leading-relaxed">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>
    </section>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import { PageFallback } from "@/components/PageFallback";
import { Section, PageTitle } from "@/components/Section";
import { PhotoBand } from "@/components/PhotoBand";
import { ProductTile } from "@/components/ProductTile";
import { TIERS, designsForTier, piecesForTier, piecesForDesign } from "@/lib/catalog/data";
import { TIER_PHOTO } from "@/lib/catalog/photos";
import type { TierSlug } from "@/lib/catalog/types";

export function generateStaticParams() {
  return TIERS.map((t) => ({ tier: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ tier: string }> }): Promise<Metadata> {
  const { tier } = await params;
  const t = TIERS.find((x) => x.slug === tier);
  return t ? { title: t.name, description: `${t.tagline} ${t.stones}` } : {};
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

  return (
    <>
      <Section className="pt-16 md:pt-24 pb-12 md:pb-16">
        <PageTitle eyebrow={`Tier ${t.numeral}`} title={t.name} lede={t.intro} />
      </Section>
      <Section>
        <PhotoBand k={TIER_PHOTO[slug]} position={slug === "royal-american" ? "50% 45%" : "50% 40%"} />
      </Section>

      {slug === "new-american" && <Standard />}

      {slug === "royal-american" ? (
        <>
          <Section className="pt-20 md:pt-28">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-10 md:gap-x-8">
              {pieces.map((p) => (
                <ProductTile key={p.handle} piece={p} eyebrow={`No. ${p.oneOfOne?.number}`} />
              ))}
            </div>
          </Section>
          <Section className="pt-20 md:pt-28" width="text">
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start hair pt-10">
              <p className="h-section text-[1.75rem] md:text-[2.25rem]">
                Each Royal American piece is made once, numbered, and entered in the house registry under its owner&apos;s name.
              </p>
              <div className="flex flex-col gap-5 text-ink-2 leading-relaxed">
                <p>
                  Pieces are shown in the Brentwood salon by appointment. Prices are not published. A release is announced to
                  the client list first; what remains is shown here.
                </p>
                <Link href="/appointments?tier=royal-american" className="btn self-start">
                  Request a private viewing
                </Link>
              </div>
            </div>
          </Section>
        </>
      ) : (
        designs.map((d) => {
          const ps = piecesForDesign(d.slug);
          return (
            <Section key={d.slug} className="pt-20 md:pt-28">
              <div className="grid md:grid-cols-[1fr_1.4fr] gap-6 md:gap-16 items-end hair pt-8 mb-10 md:mb-12">
                <div className="flex flex-col gap-2">
                  <span className="caps-sm text-muted">Design</span>
                  <h2 className="h-section text-[2.25rem] md:text-[3rem]">{d.name}</h2>
                </div>
                <div className="flex flex-col gap-4">
                  <p className="lede">{d.motif}</p>
                  <Link href={`/designs/${d.slug}`} className="link self-start">
                    The design
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 md:gap-x-8">
                {ps.map((p) => (
                  <ProductTile key={p.handle} piece={p} />
                ))}
              </div>
            </Section>
          );
        })
      )}
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
    <section className="mt-20 md:mt-28 bg-ivory">
      <Section className="py-16 md:py-24">
        <div className="grid md:grid-cols-[1fr_1.6fr] gap-10 md:gap-20">
          <div className="flex flex-col gap-4">
            <span className="caps text-muted">Published on every piece</span>
            <h2 className="h-section text-[2.25rem] md:text-[3rem]">The New American Standard</h2>
            <p className="text-ink-2 leading-relaxed">
              A man-made diamond is grown, not mined, and its value is in the design, the gold and the hands that set it.
              So we never sell it by the carat. We sell it by this.
            </p>
          </div>
          <dl className="grid sm:grid-cols-2 gap-x-10 gap-y-6">
            {rows.map(([k, v]) => (
              <div key={k} className="flex flex-col gap-1.5 hair pt-4">
                <dt className="caps-sm text-muted">{k}</dt>
                <dd className="text-sm text-ink leading-relaxed">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>
    </section>
  );
}

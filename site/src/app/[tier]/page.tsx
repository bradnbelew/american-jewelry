import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageFallback } from "@/components/PageFallback";
import type { Metadata } from "next";
import { Section, Heading } from "@/components/Section";
import { PieceCard } from "@/components/PieceCard";
import { TIERS, designsForTier, piecesForTier, piecesForDesign } from "@/lib/catalog/data";
import type { TierSlug } from "@/lib/catalog/types";

const SLUGS = TIERS.map((t) => t.slug);

export function generateStaticParams() {
  return SLUGS.map((tier) => ({ tier }));
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
      <Section className="pt-20 pb-16">
        <Heading eyebrow={`Tier ${t.numeral}`} title={t.name} lede={t.intro} size="xl" />
      </Section>

      {slug === "new-american" && <Standard />}

      {slug === "royal-american" ? (
        <Section>
          <div className="grid md:grid-cols-3 gap-8">
            {pieces.map((p) => (
              <PieceCard key={p.handle} piece={p} />
            ))}
          </div>
          <div className="mt-16 border-t border-navy pt-8 grid md:grid-cols-2 gap-8 items-start">
            <p className="font-display text-3xl text-navy balance">
              Each Royal American piece is made once, numbered, and entered in the house registry under its owner&apos;s name.
            </p>
            <div className="flex flex-col gap-4 text-ink/80 leading-relaxed">
              <p>
                Pieces are shown in the Brentwood salon by appointment only. Prices are not published. A release is
                announced to the client list first; what remains is shown here.
              </p>
              <Link href="/appointments?tier=royal-american" className="btn self-start">
                Request a private viewing
              </Link>
            </div>
          </div>
        </Section>
      ) : (
        designs.map((d) => {
          const ps = piecesForDesign(d.slug);
          return (
            <Section key={d.slug} className="pb-20">
              <div className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16 border-t border-navy pt-8 mb-10">
                <div className="flex flex-col gap-3">
                  <span className="eyebrow">Design</span>
                  <Link href={`/designs/${d.slug}`} className="font-display text-4xl md:text-5xl text-navy hover:text-gilt transition-colors">
                    {d.name}
                  </Link>
                  <span className="text-muted">{d.motif}</span>
                </div>
                <p className="text-ink/80 leading-relaxed text-lg max-w-2xl self-end">{d.story}</p>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {ps.map((p) => (
                  <PieceCard key={p.handle} piece={p} />
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
    ["Grading", "Independent IGI report on every center stone 0.30 ct and above, laser inscribed."],
    ["Disclosure", "Every piece says man made diamond, names the growth method, and any post-growth treatment."],
    ["Metal", "Solid 14k or 18k gold or platinum. Never plated, never vermeil, never hollow."],
    ["Made", "Designed by our designer, cast and set at our bench in Tennessee."],
    ["Care", "Lifetime cleaning, prong checks and rhodium refresh at either store."],
  ];
  return (
    <section className="bg-navy text-cream mb-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 grid md:grid-cols-[1fr_1.6fr] gap-10">
        <div className="flex flex-col gap-4">
          <span className="eyebrow !text-gilt-2">Published on every piece</span>
          <h2 className="font-display text-4xl md:text-5xl leading-tight">The New American Standard</h2>
          <p className="text-cream/75 leading-relaxed">
            A man made diamond is grown, not mined, and its value is in the design, the gold and the hands that made
            it. So we never sell it by the carat. We sell it by this.
          </p>
        </div>
        <dl className="grid sm:grid-cols-2 gap-x-10 gap-y-6">
          {rows.map(([k, v]) => (
            <div key={k} className="flex flex-col gap-1 border-t border-cream/20 pt-4">
              <dt className="label text-gilt-2">{k}</dt>
              <dd className="text-sm text-cream/85 leading-relaxed">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

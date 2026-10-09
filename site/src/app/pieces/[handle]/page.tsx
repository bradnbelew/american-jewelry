import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import { PageFallback } from "@/components/PageFallback";
import { Section } from "@/components/Section";
import { ProductTile } from "@/components/ProductTile";
import { PieceConfigurator } from "@/components/PieceConfigurator";
import { PieceGallery } from "@/components/PieceGallery";
import { PIECES, STORES, designBySlug, pieceByHandle, piecesForDesign, tierBySlug } from "@/lib/catalog/data";
import { PIECE_PHOTOS } from "@/lib/catalog/photos";
import { METAL_LABEL, PIECE_TYPE_LABEL, type Piece } from "@/lib/catalog/types";
import { JsonLd, breadcrumbJsonLd, productJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return PIECES.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params;
  const p = pieceByHandle(handle);
  if (!p) return {};
  const manMade = p.versions.some((v) => v.origin === "man-made");
  return {
    title: manMade ? `${p.name}, man-made diamond` : p.name,
    description: p.description,
    alternates: { canonical: `/pieces/${p.handle}` },
  };
}

const RING_TYPES = new Set(["ring", "band", "solitaire", "eternity-band", "stack-band", "signet"]);

/** One sentence that says what the piece is made of, with the material words carried in ink. */
function madeOf(p: Piece): { text: string; key?: boolean }[] {
  const metals = p.metals.map((m) => METAL_LABEL[m].replace("14k ", "").replace("18k ", ""));
  const uniqueMetals = Array.from(new Set(metals));
  const metalText = uniqueMetals.length === 1 ? METAL_LABEL[p.metals[0]] : uniqueMetals.length === 2 ? `${uniqueMetals[0]} or ${uniqueMetals[1]}` : `${uniqueMetals.slice(0, -1).join(", ")} or ${uniqueMetals[uniqueMetals.length - 1]}`;
  const manMade = p.versions.some((v) => v.origin === "man-made");
  const natural = p.versions.some((v) => v.key === "diamond" && v.origin === "natural");
  const gem = p.versions.some((v) => v.key === "gemstone");
  const stone = p.oneOfOne ? p.versions[0].stones ?? "" : manMade ? "man-made diamonds" : natural && gem ? "a birthstone or natural diamonds" : natural ? "natural diamonds" : "";
  const type = PIECE_TYPE_LABEL[p.pieceType].toLowerCase();
  const parts: { text: string; key?: boolean }[] = [{ text: `A ${type} in ` }, { text: metalText, key: true }];
  if (stone) parts.push({ text: p.oneOfOne ? ", set with " : ", set with " }, { text: stone, key: true });
  parts.push({ text: ", designed in Tennessee and finished at our bench." });
  return parts;
}

export default function PiecePage({ params }: { params: Promise<{ handle: string }> }) {
  return (
    <Suspense fallback={<PageFallback />}>
      <PiecePageContent params={params} />
    </Suspense>
  );
}

async function PiecePageContent({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const piece = pieceByHandle(handle);
  if (!piece) notFound();
  const tier = tierBySlug(piece.tier);
  const design = designBySlug(piece.design);
  const siblings = piecesForDesign(piece.design).filter((p) => p.handle !== piece.handle).slice(0, 4);
  const is3d = RING_TYPES.has(piece.pieceType);
  const setting = piece.design === "shooting-star" ? "shooting-star" : piece.design === "prism" ? "prism" : "signal";
  const carat = piece.pieceType === "solitaire" ? 1.5 : piece.pieceType === "signet" ? 0.5 : 0.75;
  const manMade = piece.versions.some((v) => v.origin === "man-made");
  const royal = piece.tier === "royal-american";
  const salon = STORES[0];

  const crumbs = [{ name: tier.name, href: `/${tier.slug}` }, ...(design ? [{ name: design.name, href: `/designs/${design.slug}` }] : []), { name: piece.name, href: `/pieces/${piece.handle}` }];

  return (
    <>
      <JsonLd data={productJsonLd(piece, design)} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Section className="pt-6 md:pt-8">
        <nav className="text-[0.8125rem] text-muted flex flex-wrap gap-x-2" aria-label="Breadcrumb">
          <Link href={`/${tier.slug}`} className="hover:text-ink">
            {tier.name}
          </Link>
          {design && (
            <>
              <span aria-hidden>/</span>
              <Link href={`/designs/${design.slug}`} className="hover:text-ink">
                {design.name}
              </Link>
            </>
          )}
          <span aria-hidden>/</span>
          <span className="text-ink">{PIECE_TYPE_LABEL[piece.pieceType]}</span>
        </nav>
      </Section>

      <Section className="pt-6 md:pt-8">
        <div className="grid lg:grid-cols-[1.25fr_1fr] gap-10 lg:gap-20 items-start">
          <PieceGallery photos={PIECE_PHOTOS[piece.handle] ?? ["hero-box"]} three={is3d && !royal ? { metal: piece.metals[0], setting, carat } : undefined} />

          <div className="lg:sticky lg:top-32 flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <span className="text-[0.8125rem] text-muted">
                {tier.name}
                {design ? `, ${design.name}` : royal ? `, No. ${piece.oneOfOne?.number}` : ""}
              </span>
              <h1 className="h-section text-[2.25rem] md:text-[2.75rem]">{royal ? piece.name.replace(/^No\. \d+ · /, "") : piece.name}</h1>
              <p className="text-[0.8125rem] text-muted">Reference {piece.handle.toUpperCase().replace(/-/g, " ").replace(/^NO (\d+) /, "No. $1, ")}</p>
              <p className="text-ink-2 leading-relaxed">{piece.description}</p>
            </div>

            <PieceConfigurator piece={piece} />

            <div className="hair">
              <details className="acc border-b border-hair" open>
                <summary>Details</summary>
                <dl className="pb-5 flex flex-col gap-2 text-sm">
                  {piece.specs.map((s) => (
                    <div key={s.label} className="grid grid-cols-[7rem_1fr] gap-4">
                      <dt className="text-muted">{s.label}</dt>
                      <dd className="text-ink-2">{s.value}</dd>
                    </div>
                  ))}
                  <div className="grid grid-cols-[7rem_1fr] gap-4">
                    <dt className="text-muted">Made</dt>
                    <dd className="text-ink-2">Designed in Tennessee. Set and finished in our workshop. Diamonds and gold are imported.</dd>
                  </div>
                </dl>
              </details>
              <details className="acc border-b border-hair">
                <summary>{manMade ? "The stone and its report" : "The stones"}</summary>
                <div className="pb-5 text-sm text-ink-2 leading-relaxed flex flex-col gap-3">
                  {manMade ? (
                    <>
                      <p>
                        Every center stone is a man-made (laboratory-grown) diamond, D to F color, VVS1 or VVS2 clarity, Ideal cut, grown by chemical vapor deposition and sold as grown with no post-growth treatment. Not mined.
                      </p>
                      <p>
                        Stones of 0.30 ct and above carry an IGI Laboratory Grown Diamond Report, with the report number laser-inscribed on the girdle. The report travels with the piece and can be verified at{" "}
                        <a href="https://www.igi.org/verify-your-report/" className="link-quiet" target="_blank" rel="noreferrer">
                          igi.org
                        </a>
                        .
                      </p>
                    </>
                  ) : (
                    <>
                      <p>Natural diamonds are F to G color and VS1 clarity with Excellent cut. Center stones carry a GIA Diamond Grading Report; any treatment is disclosed before purchase.</p>
                      <p>Birthstone versions are set with one natural gemstone of your choosing. We will tell you plainly which stones suit daily wear and which want a quieter life.</p>
                    </>
                  )}
                </div>
              </details>
              <details className="acc border-b border-hair">
                <summary>Care and warranty</summary>
                <p className="pb-5 text-sm text-ink-2 leading-relaxed">
                  The Lifetime Care Program comes with every piece: cleaning, prong checks and polishing at either store for as long as you own it, and one free resize within 60 days on rings we made. The Limited Lifetime Warranty covers defects in materials and workmanship for the original owner; the full terms are on the{" "}
                  <Link href="/policies#warranty" className="link-quiet">
                    policies page
                  </Link>
                  .
                </p>
              </details>
              <details className="acc border-b border-hair">
                <summary>Delivery and returns</summary>
                <p className="pb-5 text-sm text-ink-2 leading-relaxed">
                  Insured, adult signature required, in the house box. Or collect in either store and we size it on the spot. Ready-to-ship pieces may be returned within 30 days. Made-to-order, engraved and sized pieces are exchangeable, not refundable, once the design is approved.
                </p>
              </details>
            </div>

            <div className="flex flex-col gap-2 text-sm text-ink-2 leading-relaxed">
              <span className="h-item text-[1.125rem] text-ink">A question about this piece</span>
              <p>
                Call the Brentwood salon at{" "}
                <a href={`tel:${salon.phone.replace(/\D/g, "")}`} className="link-quiet">
                  {salon.phone}
                </a>{" "}
                and ask for the bench, or{" "}
                <Link href={`/appointments?piece=${piece.handle}`} className="link-quiet">
                  book an hour
                </Link>{" "}
                and we will have it on the table.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="pt-24 md:pt-32" width="text" reveal>
        <p className="h-display text-[2rem] md:text-[3rem] lg:text-[3.5rem] text-center max-w-5xl mx-auto text-ink-2">
          {madeOf(piece).map((part, i) => (
            <span key={i} className={part.key ? "text-ink" : ""}>
              {part.text}
            </span>
          ))}
        </p>
      </Section>

      {design && (
        <Section className="pt-24 md:pt-32" width="text" reveal>
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 hair pt-10">
            <h2 className="md:col-span-4 h-section text-[1.75rem] md:text-[2rem]">Behind the design</h2>
            <div className="md:col-span-8 flex flex-col gap-5">
              <p className="lede">{design.story}</p>
              <p className="text-ink-2 leading-relaxed">{design.signature}</p>
              <Link href={`/designs/${design.slug}`} className="link self-start">
                The {design.name} design
              </Link>
            </div>
          </div>
        </Section>
      )}

      {siblings.length > 0 && design && (
        <Section className="pt-24 md:pt-32" reveal>
          <div className="flex items-end justify-between gap-6 mb-10">
            <h2 className="h-section text-[1.75rem] md:text-[2.25rem]">Complete the set</h2>
            <span className="text-[0.8125rem] text-muted">The other {design.name} pieces</span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 md:gap-x-8">
            {siblings.map((p) => (
              <ProductTile key={p.handle} piece={p} />
            ))}
          </div>
        </Section>
      )}

      {royal && (
        <Section className="pt-24 md:pt-32" width="text" reveal>
          <div className="hair pt-8 grid md:grid-cols-2 gap-8 md:gap-16">
            <h2 className="h-section text-[1.75rem] md:text-[2rem]">One of one</h2>
            <div className="flex flex-col gap-4 text-ink-2 leading-relaxed">
              <p>Made once, numbered, and entered in the house registry under the name of its owner, with the drawing it came from and the reports on its stones. The house undertakes never to make it again.</p>
              <Link href="/royal-american" className="link self-start">
                The registry
              </Link>
            </div>
          </div>
        </Section>
      )}
    </>
  );
}

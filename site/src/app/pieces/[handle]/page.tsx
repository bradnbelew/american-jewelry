import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import { PageFallback } from "@/components/PageFallback";
import { Section } from "@/components/Section";
import { ProductTile } from "@/components/ProductTile";
import { PieceConfigurator } from "@/components/PieceConfigurator";
import { PieceGallery } from "@/components/PieceGallery";
import { PIECES, designBySlug, pieceByHandle, piecesForDesign, tierBySlug } from "@/lib/catalog/data";
import { PIECE_PHOTOS } from "@/lib/catalog/photos";
import { PIECE_TYPE_LABEL } from "@/lib/catalog/types";
import { JsonLd, productJsonLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return PIECES.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params;
  const p = pieceByHandle(handle);
  return p ? { title: p.name, description: p.description } : {};
}

const RING_TYPES = new Set(["ring", "band", "solitaire", "eternity-band", "stack-band", "signet"]);

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
  const carat = piece.pieceType === "solitaire" ? 1.5 : piece.pieceType === "signet" ? 0.5 : 0.35;
  const manMade = piece.versions.some((v) => v.origin === "man-made");

  return (
    <>
      <JsonLd data={productJsonLd(piece)} />
      <Section className="pt-6 md:pt-8">
        <nav className="caps-sm text-muted flex flex-wrap gap-2" aria-label="Breadcrumb">
          <Link href={`/${tier.slug}`} className="hover:text-ink">
            {tier.name}
          </Link>
          {design && (
            <>
              <span>/</span>
              <Link href={`/designs/${design.slug}`} className="hover:text-ink">
                {design.name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-ink">{PIECE_TYPE_LABEL[piece.pieceType]}</span>
        </nav>
      </Section>

      <Section className="pt-6 md:pt-8">
        <div className="grid lg:grid-cols-[1.25fr_1fr] gap-10 lg:gap-20 items-start">
          <PieceGallery photos={PIECE_PHOTOS[piece.handle] ?? ["hero-box"]} three={is3d ? { metal: piece.metals[0], setting, carat } : undefined} />

          <div className="lg:sticky lg:top-32 flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <span className="caps-sm text-muted">
                {tier.name}
                {design ? ` · ${design.name}` : ""}
                {piece.family ? ` · ${piece.family}` : ""}
              </span>
              <h1 className="h-section text-[2.25rem] md:text-[2.75rem]">{piece.name}</h1>
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
                  {manMade && (
                    <div className="grid grid-cols-[7rem_1fr] gap-4">
                      <dt className="text-muted">Origin</dt>
                      <dd className="text-ink-2">Man-made (laboratory-grown) · IGI Laboratory Grown Diamond Report · as grown, no post-growth treatment</dd>
                    </div>
                  )}
                  <div className="grid grid-cols-[7rem_1fr] gap-4">
                    <dt className="text-muted">Made</dt>
                    <dd className="text-ink-2">Designed in Tennessee. Set and finished in our workshop. Diamonds and gold are imported.</dd>
                  </div>
                </dl>
              </details>
              <details className="acc border-b border-hair">
                <summary>Lifetime Care Program</summary>
                <p className="pb-5 text-sm text-ink-2 leading-relaxed">
                  Cleaning, prong checks and polishing at either store, for as long as you own the piece. One free resize within
                  60 days on rings we made.
                </p>
              </details>
              <details className="acc border-b border-hair">
                <summary>Delivery and returns</summary>
                <p className="pb-5 text-sm text-ink-2 leading-relaxed">
                  Insured, adult signature required, in the house box. Or collect in store and we size it on the spot. Made-to-order,
                  engraved and sized pieces are exchangeable, not refundable; ready-to-ship pieces may be returned within 30 days.
                </p>
              </details>
            </div>
          </div>
        </div>
      </Section>

      {siblings.length > 0 && design && (
        <Section className="pt-24 md:pt-32">
          <div className="flex items-end justify-between gap-6 mb-10">
            <h2 className="h-section text-[1.75rem] md:text-[2.25rem]">More in {design.name}</h2>
            <Link href={`/designs/${design.slug}`} className="link">
              The design
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 md:gap-x-8">
            {siblings.map((p) => (
              <ProductTile key={p.handle} piece={p} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}

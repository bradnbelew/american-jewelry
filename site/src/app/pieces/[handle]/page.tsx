import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageFallback } from "@/components/PageFallback";
import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { PieceArt } from "@/components/PieceArt";
import { PieceCard } from "@/components/PieceCard";
import { PieceConfigurator } from "@/components/PieceConfigurator";
import { RingViewer } from "@/components/three/RingViewer";
import { PIECES, designBySlug, pieceByHandle, piecesForDesign, tierBySlug } from "@/lib/catalog/data";
import { PIECE_TYPE_LABEL } from "@/lib/catalog/types";
import { JsonLd, productJsonLd } from "@/lib/seo";

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

  return (
    <>
      <JsonLd data={productJsonLd(piece)} />
      <Section className="pt-8">
        <nav className="text-xs text-muted flex flex-wrap gap-2" aria-label="Breadcrumb">
          <Link href={`/${tier.slug}`} className="hover:text-navy">
            {tier.name}
          </Link>
          {design && (
            <>
              <span>/</span>
              <Link href={`/designs/${design.slug}`} className="hover:text-navy">
                {design.name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-navy">{PIECE_TYPE_LABEL[piece.pieceType]}</span>
        </nav>
      </Section>

      <Section className="pt-8 pb-20">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16 items-start">
          <div className="flex flex-col gap-4">
            <div className="aspect-square border border-line overflow-hidden plate">
              {is3d ? (
                <RingViewer metal={piece.metals[0]} setting={setting} carat={carat} className="w-full h-full" />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-16">
                  <PieceArt art={piece.art} className="w-full h-full" />
                </div>
              )}
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="aspect-square border border-line plate flex items-center justify-center p-5">
                  <PieceArt art={piece.art} className="w-full h-full opacity-70" tone={i % 2 ? "gilt" : "navy"} />
                </div>
              ))}
            </div>
            <p className="text-xs text-muted">
              {is3d ? "Drag to turn. A stand-in model until the piece's own CAD is exported." : "Photography in progress. Line drawings stand in."}
            </p>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <span className="eyebrow">
                {tier.name}
                {design ? ` · ${design.name}` : ""}
                {piece.family ? ` · ${piece.family}` : ""}
              </span>
              <h1 className="font-display text-4xl md:text-5xl text-navy leading-tight balance">{piece.name}</h1>
              <p className="text-lg text-ink/85 leading-relaxed">{piece.description}</p>
            </div>

            <PieceConfigurator piece={piece} />

            <dl className="border-t border-navy divide-y divide-line">
              {piece.specs.map((s) => (
                <div key={s.label} className="grid grid-cols-[8rem_1fr] gap-4 py-3 text-sm">
                  <dt className="label text-muted">{s.label}</dt>
                  <dd className="text-ink/85">{s.value}</dd>
                </div>
              ))}
              <div className="grid grid-cols-[8rem_1fr] gap-4 py-3 text-sm">
                <dt className="label text-muted">Care</dt>
                <dd className="text-ink/85">Lifetime cleaning, prong checks and polishing at either store. Included.</dd>
              </div>
              <div className="grid grid-cols-[8rem_1fr] gap-4 py-3 text-sm">
                <dt className="label text-muted">Delivery</dt>
                <dd className="text-ink/85">Insured, signature required, in the house box. Or collect at the store and we size it on the spot.</dd>
              </div>
            </dl>
          </div>
        </div>
      </Section>

      {siblings.length > 0 && design && (
        <Section>
          <div className="flex items-end justify-between gap-6 mb-8">
            <h2 className="font-display text-3xl md:text-4xl text-navy">More in {design.name}</h2>
            <Link href={`/designs/${design.slug}`} className="label text-navy hover:text-gilt">
              The whole design →
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {siblings.map((p) => (
              <PieceCard key={p.handle} piece={p} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}

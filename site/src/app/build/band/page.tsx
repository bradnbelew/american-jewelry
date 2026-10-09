import type { Metadata } from "next";
import Link from "next/link";
import { Section, Heading } from "@/components/Section";
import { PieceCard } from "@/components/PieceCard";
import { PIECES } from "@/lib/catalog/data";

export const metadata: Metadata = {
  title: "Build a band",
  description: "House bands in solid gold, gemstone, natural diamond and man made diamond versions, made to stack.",
};

export default function BuildBandPage() {
  const bands = PIECES.filter((p) => ["band", "eternity-band", "stack-band"].includes(p.pieceType));
  return (
    <>
      <Section className="pt-16 pb-12">
        <Heading eyebrow="Made to order" title="Build a band" lede="Start with a design. Choose the version and the metal on the piece. The full band builder, with width, profile and stone layout, arrives with the launch." />
      </Section>
      <Section>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {bands.map((p) => (
            <PieceCard key={p.handle} piece={p} showTier />
          ))}
        </div>
        <div className="mt-12 border-t border-navy pt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-ink/80">Want a band that matches a ring you already own? Bring it in; we draw to it.</p>
          <Link href="/appointments" className="btn btn-ghost">
            Book an appointment
          </Link>
        </div>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Section, PageTitle } from "@/components/Section";
import { ProductTile } from "@/components/ProductTile";
import { PIECES, tierBySlug } from "@/lib/catalog/data";

export const metadata: Metadata = {
  title: "Build a band",
  description: "House bands in solid gold, gemstone, natural diamond and man-made diamond versions, made to stack.",
};

export default function BuildBandPage() {
  const bands = PIECES.filter((p) => ["band", "eternity-band", "stack-band"].includes(p.pieceType));
  return (
    <>
      <Section className="pt-16 md:pt-24 pb-12 md:pb-16">
        <PageTitle eyebrow="Made to order" title="Build a band" lede="Start with a design and choose the version and metal on the piece. The full band builder, with width, profile and stone layout, arrives with the launch." />
      </Section>
      <Section>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 md:gap-x-8">
          {bands.map((p) => (
            <ProductTile key={p.handle} piece={p} eyebrow={tierBySlug(p.tier).name} />
          ))}
        </div>
        <div className="mt-16 hair pt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-ink-2">Want a band that matches a ring you already own? Bring it in; we draw to it.</p>
          <Link href="/appointments" className="link">
            Book an appointment
          </Link>
        </div>
      </Section>
    </>
  );
}

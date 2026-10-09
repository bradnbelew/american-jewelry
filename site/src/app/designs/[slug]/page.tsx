import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Section, Heading } from "@/components/Section";
import { PieceCard } from "@/components/PieceCard";
import { DESIGNS, designBySlug, piecesForDesign, tierBySlug } from "@/lib/catalog/data";

export function generateStaticParams() {
  return DESIGNS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = designBySlug(slug);
  return d ? { title: `${d.name} design`, description: d.motif } : {};
}

export default async function DesignPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = designBySlug(slug);
  if (!d) notFound();
  const tier = tierBySlug(d.tier);
  const pieces = piecesForDesign(d.slug);

  return (
    <>
      <Section className="pt-20 pb-14">
        <Heading eyebrow={`${tier.name} · design`} title={d.name} lede={d.motif} size="xl" />
      </Section>
      <Section className="pb-16">
        <div className="grid md:grid-cols-2 gap-10 border-t border-navy pt-8">
          <p className="text-lg text-ink/85 leading-relaxed">{d.story}</p>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="label text-gilt">Signature</span>
              <span className="text-ink/85">{d.signature}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="label text-gilt">Versions</span>
              <span className="text-ink/85">
                {d.tier === "americana"
                  ? "Solid gold, birthstone, and natural diamond. Same drawing, three ways."
                  : "Man made diamonds only, D–F, VVS, to the New American Standard."}
              </span>
            </div>
            <Link href={`/${tier.slug}`} className="label text-navy hover:text-gilt">
              All of {tier.name} →
            </Link>
          </div>
        </div>
      </Section>
      <Section>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {pieces.map((p) => (
            <PieceCard key={p.handle} piece={p} />
          ))}
        </div>
      </Section>
    </>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Section, Heading } from "@/components/Section";
import { PieceCard } from "@/components/PieceCard";
import { COLLECTIONS, collectionBySlug, piecesForCollection } from "@/lib/catalog/data";

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = collectionBySlug(slug);
  return c ? { title: `${c.name} collection`, description: c.intro } : {};
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = collectionBySlug(slug);
  if (!c) notFound();
  const pieces = piecesForCollection(c.slug);

  return (
    <>
      <Section className="pt-20 pb-14">
        <Heading eyebrow="Collection" title={c.name} lede={c.intro} size="xl" />
      </Section>
      <Section className="pb-16">
        <div className="grid md:grid-cols-2 gap-10 border-t border-navy pt-8">
          <p className="text-lg text-ink/85 leading-relaxed">{c.story}</p>
          {c.slug === "bridal" ? (
            <div className="flex flex-col gap-4 bg-paper border border-line p-6">
              <span className="label text-gilt">Start with the setting</span>
              <p className="text-ink/85 leading-relaxed">
                Choose the setting, then the stone: natural (Americana) or man made (New American). The builder shows the
                price for each, side by side, and labels every ring with which stone it holds.
              </p>
              <Link href="/build/ring" className="btn self-start">
                Build a ring
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <span className="label text-gilt">Made to order</span>
              <p className="text-ink/85 leading-relaxed">
                Every piece in this collection is made for you after you order it. Expect two to five weeks, and a note from the
                bench when it is cast.
              </p>
            </div>
          )}
        </div>
      </Section>
      <Section>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {pieces.map((p) => (
            <PieceCard key={p.handle} piece={p} showTier />
          ))}
        </div>
      </Section>
    </>
  );
}

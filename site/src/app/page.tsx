import Link from "next/link";
import { PhotoOpener, Section } from "@/components/Section";
import { ProductTile } from "@/components/ProductTile";
import { Pic } from "@/components/Pic";
import { PIECES, STORES, TIERS, TOTAL_REVIEWS, designBySlug, piecesForDesign } from "@/lib/catalog/data";
import { DESIGN_PHOTO, TIER_PHOTO } from "@/lib/catalog/photos";
import { DESIGN_NOTES, SETTING_PHOTO } from "@/lib/builder/notes";
import { SETTINGS } from "@/lib/builder/model";
import { FIGURES_AS_OF } from "@/lib/site";

export default function Home() {
  const featured = designBySlug("shooting-star")!;
  const featuredPieces = piecesForDesign(featured.slug).slice(0, 3);
  const selected = ["signal-solitaire", "prism-signet", "grid-tennis-bracelet", "shooting-star-pendant", "prism-necklace", "grid-eternity-band", "signal-studs", "shooting-star-signet"]
    .map((h) => PIECES.find((p) => p.handle === h)!)
    .filter(Boolean);

  return (
    <>
      <PhotoOpener photo="hero-box" position="50% 45%" title="An American house of fine jewelry." lede="Our own designs, set and finished at our own bench in Tennessee. One designer, one workshop, nothing bought from a catalog.">
        <div className="flex flex-wrap gap-3 mt-1">
          <Link href="/americana" className="btn btn-light">
            The designs
          </Link>
          <Link href="/appointments" className="link link-light self-center ml-2">
            Book an appointment
          </Link>
        </div>
      </PhotoOpener>

      {/* The featured design: one design, its story, three of its pieces. */}
      <Section className="pt-20 md:pt-28" reveal>
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-end">
          <div className="md:col-span-7 relative aspect-[4/5] md:aspect-[5/4] overflow-hidden bg-paper img-hover">
            <Link href={`/designs/${featured.slug}`} className="absolute inset-0">
              <Pic k={DESIGN_PHOTO[featured.slug]} sizes="(min-width: 768px) 58vw, 100vw" />
            </Link>
          </div>
          <div className="md:col-span-5 flex flex-col gap-6 md:pb-6">
            <h2 className="h-display text-[3rem] md:text-[4rem]">{featured.name}</h2>
            <p className="lede measure">{featured.story}</p>
            <Link href={`/designs/${featured.slug}`} className="link self-start">
              Discover the design
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-x-5 gap-y-10 md:gap-x-8 mt-12 md:mt-16">
          {featuredPieces.map((p) => (
            <ProductTile key={p.handle} piece={p} />
          ))}
        </div>
      </Section>

      {/* The three names as a ledger: name, what it is, and one photograph each. */}
      <Section className="pt-24 md:pt-36" reveal>
        <h2 className="sr-only">Royal American, Americana and New American</h2>
        <ol className="hair">
          {TIERS.map((t) => (
            <li key={t.slug} className="border-b border-hair">
              <Link href={`/${t.slug}`} className="group grid grid-cols-[1fr_auto] md:grid-cols-12 gap-x-6 gap-y-4 py-8 md:py-10 items-center">
                <div className="md:col-span-4 flex flex-col gap-2">
                  <span className="h-section text-[2rem] md:text-[2.75rem] group-hover:text-muted transition-colors">{t.name}</span>
                  <span className="text-sm text-muted">{t.tagline}</span>
                </div>
                <p className="col-span-2 md:col-span-5 md:col-start-5 text-ink-2 leading-relaxed measure order-3 md:order-none">{t.intro}</p>
                <div className="md:col-span-2 md:col-start-11 relative w-28 md:w-full aspect-square overflow-hidden bg-paper img-hover justify-self-end">
                  <Pic k={TIER_PHOTO[t.slug]} sizes="(min-width: 768px) 16vw, 112px" />
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </Section>

      {/* The ring builder: the one thing a store cannot offer. */}
      <section className="mt-24 md:mt-36 bg-paper">
        <Section className="py-20 md:py-28" reveal>
          <div className="grid md:grid-cols-12 gap-10 md:gap-12 items-center">
            <div className="md:col-span-5 flex flex-col gap-6">
              <h2 className="h-section text-[2.25rem] md:text-[3rem]">Build a ring on a house setting.</h2>
              <p className="lede measure">
                Three settings we drew. Choose the band, the prongs, the stone at a set quality, the metal and the fit, and watch the ring change as you decide. It is priced from its own geometry and made to order at our bench.
              </p>
              <Link href="/build/ring" className="btn self-start">
                Build a ring
              </Link>
            </div>
            <ul className="md:col-span-7 grid grid-cols-3 gap-4 md:gap-6">
              {SETTINGS.map((s) => (
                <li key={s}>
                  <Link href={`/build/ring?setting=${s}`} className="group flex flex-col gap-3">
                    <span className="relative block aspect-[4/5] overflow-hidden bg-white img-hover">
                      <Pic k={SETTING_PHOTO[s]} sizes="(min-width: 768px) 19vw, 30vw" />
                    </span>
                    <span className="h-item text-[1.125rem] md:text-[1.375rem] group-hover:text-muted transition-colors">{DESIGN_NOTES[s].name}</span>
                    <span className="text-[0.8125rem] text-muted leading-snug hidden sm:block">{DESIGN_NOTES[s].line}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      </section>

      {/* Pieces */}
      <Section className="pt-24 md:pt-36" reveal>
        <div className="flex items-end justify-between gap-6 mb-10 md:mb-14">
          <h2 className="h-section text-[2rem] md:text-[2.75rem]">From the bench</h2>
          <Link href="/americana" className="link">
            All designs
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 md:gap-x-8">
          {selected.map((p) => (
            <ProductTile key={p.handle} piece={p} />
          ))}
        </div>
      </Section>

      {/* A statement on stones, in plain words. */}
      <Section className="pt-24 md:pt-36" width="text" reveal>
        <div className="hair pt-10 md:pt-14 flex flex-col items-center text-center gap-6">
          <p className="h-section text-[1.75rem] md:text-[2.5rem] max-w-4xl">
            We sell natural diamonds and man-made diamonds, and we say which is which on every tag, every listing and every certificate. The design, the gold and the hands are the same.
          </p>
          <Link href="/natural-or-man-made" className="link">
            Natural or man-made
          </Link>
        </div>
      </Section>

      {/* The bench */}
      <Section className="pt-24 md:pt-36" reveal>
        <div className="grid md:grid-cols-12 gap-10 md:gap-12 items-center">
          <div className="md:col-span-7 relative aspect-[4/3] overflow-hidden bg-paper">
            <Pic k="bench" sizes="(min-width: 768px) 58vw, 100vw" />
          </div>
          <div className="md:col-span-5 flex flex-col gap-6">
            <h2 className="h-section text-[2.25rem] md:text-[3rem]">The bench is behind glass.</h2>
            <p className="lede measure">
              In Mt. Juliet you can watch a stone being set while you wait, and the person who sets it is usually the one who says hello. Every piece is drawn by our designer, set and finished at this bench, and marked inside with the AJ hallmark.
            </p>
            <Link href="/house" className="link self-start">
              The House
            </Link>
          </div>
        </div>
      </Section>

      {/* Stores */}
      <Section className="pt-24 md:pt-36" reveal>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {STORES.map((s) => (
            <Link key={s.slug} href={`/stores/${s.slug}`} className="group flex flex-col gap-5">
              <div className="relative aspect-[16/10] overflow-hidden bg-paper img-hover">
                <Pic k={s.photo} sizes="(min-width: 768px) 50vw, 100vw" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="h-section text-[1.75rem] md:text-[2rem] group-hover:text-muted transition-colors">{s.name}</span>
                <span className="text-sm text-ink-2">
                  {s.address1}, {s.city}
                </span>
                <span className="text-[0.8125rem] text-muted">{s.role}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="hair mt-14 pt-6 flex flex-wrap items-baseline justify-between gap-4">
          <p className="text-sm text-ink-2">
            {TOTAL_REVIEWS.toLocaleString()} Google reviews across the two stores, as of {FIGURES_AS_OF}.
          </p>
          <Link href="/appointments" className="link">
            Book an appointment
          </Link>
        </div>
      </Section>
    </>
  );
}

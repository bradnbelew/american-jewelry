import Link from "next/link";
import { Section } from "@/components/Section";
import { PieceCard } from "@/components/PieceCard";
import { Mark } from "@/components/Mark";
import { COLLECTIONS, PIECES, STORES, TIERS, TOTAL_REVIEWS } from "@/lib/catalog/data";
import { JsonLd, organizationJsonLd } from "@/lib/seo";

export default function Home() {
  const featured = ["signal-solitaire", "shooting-star-pendant", "prism-signet", "grid-tennis-bracelet"]
    .map((h) => PIECES.find((p) => p.handle === h)!)
    .filter(Boolean);

  return (
    <>
      <JsonLd data={organizationJsonLd()} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 md:px-8 pt-20 pb-24 md:pt-32 md:pb-36 grid gap-12 md:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="flex flex-col gap-7">
            <span className="eyebrow">Brentwood · Mt. Juliet · Tennessee</span>
            <h1 className="font-display font-light leading-[0.98] text-navy text-[3.4rem] md:text-[5.6rem] balance">
              A jewelry house,
              <br />
              <em className="font-normal">made in America.</em>
            </h1>
            <p className="text-lg md:text-xl text-ink/80 leading-relaxed max-w-xl">
              We draw every design, cast every piece and set every stone at our own bench in Tennessee. One-of-one
              pieces, signature designs in natural diamond and solid gold, and man made diamonds held to a standard no
              one else publishes.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/americana" className="btn">
                See the designs
              </Link>
              <Link href="/appointments" className="btn btn-ghost">
                Book an appointment
              </Link>
            </div>
          </div>
          <div className="plate aspect-[4/5] border border-line flex items-center justify-center">
            <Mark className="w-1/2 text-navy/90" />
          </div>
        </div>
      </section>

      {/* Three tiers */}
      <Section className="pt-4">
        <div className="grid md:grid-cols-3 border-t border-navy">
          {TIERS.map((t, i) => (
            <Link
              key={t.slug}
              href={`/${t.slug}`}
              className={`group flex flex-col gap-4 py-10 pr-8 ${i > 0 ? "md:pl-8 md:border-l border-line" : ""} border-b border-line md:border-b-0`}
            >
              <span className="label text-muted">Tier {t.numeral}</span>
              <span className="font-display text-4xl text-navy group-hover:text-gilt transition-colors">{t.name}</span>
              <span className="font-display text-xl italic text-ink/80">{t.tagline}</span>
              <span className="text-sm text-muted leading-relaxed">{t.stones}</span>
              <span className="label text-gilt mt-2">Enter →</span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Featured pieces */}
      <Section className="pt-24">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div className="flex flex-col gap-3">
            <span className="eyebrow">From the bench</span>
            <h2 className="font-display text-4xl md:text-5xl text-navy">Four pieces to start with</h2>
          </div>
          <Link href="/americana" className="label text-navy hover:text-gilt hidden sm:inline">
            All designs →
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featured.map((p) => (
            <PieceCard key={p.handle} piece={p} showTier />
          ))}
        </div>
      </Section>

      {/* The bench / the house */}
      <section className="bg-navy text-cream mt-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-24 grid gap-14 md:grid-cols-2 items-center">
          <div className="flex flex-col gap-6">
            <span className="eyebrow !text-gilt-2">The house</span>
            <h2 className="font-display font-light text-4xl md:text-6xl leading-[1.02] balance">
              We don&apos;t buy jewelry and sell it. We make it.
            </h2>
            <p className="text-cream/80 text-lg leading-relaxed max-w-xl">
              Most jewelers are stores. Their cases are filled by vendors who fill everyone else&apos;s cases too. Ours
              are filled from our own bench: drawn by our designer, cast in our workshop, set by hand, and struck with
              a mark you will not find anywhere else.
            </p>
            <Link href="/house" className="btn !bg-transparent !border-cream/50 !text-cream hover:!bg-cream hover:!text-navy self-start">
              Our story
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-px bg-cream/15 border border-cream/15">
            {[
              ["Drawn", "Every design begins as a drawing by our designer. Nothing is licensed, bought or copied."],
              ["Cast", "Lost-wax casting in our own workshop. Solid gold and platinum, never plated, never hollow."],
              ["Set", "Stones set by hand at a bench you can watch through glass in Mt. Juliet."],
              ["Marked", "The AJ hallmark struck inside every shank, with the tier mark above it."],
            ].map(([k, v]) => (
              <div key={k} className="bg-navy p-7 flex flex-col gap-3">
                <span className="font-display text-3xl text-gilt-2">{k}</span>
                <span className="text-sm text-cream/75 leading-relaxed">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections */}
      <Section className="pt-24">
        <div className="flex flex-col gap-3 mb-10">
          <span className="eyebrow">Collections</span>
          <h2 className="font-display text-4xl md:text-5xl text-navy">Designs, gathered by what they are for</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {COLLECTIONS.map((c) => (
            <Link key={c.slug} href={`/collections/${c.slug}`} className="group border border-line p-7 flex flex-col gap-3 hover:border-gilt transition-colors bg-paper">
              <span className="font-display text-3xl text-navy">{c.name}</span>
              <span className="text-sm text-muted leading-relaxed">{c.intro}</span>
              <span className="label text-gilt mt-auto pt-4">View →</span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Stores + reviews */}
      <Section className="pt-24">
        <div className="grid gap-10 md:grid-cols-[1fr_1fr_1.2fr] items-start">
          {STORES.map((s) => (
            <Link key={s.slug} href={`/stores/${s.slug}`} className="group flex flex-col gap-3 border-t border-navy pt-6">
              <span className="font-display text-3xl text-navy group-hover:text-gilt transition-colors">{s.name}</span>
              <span className="text-sm text-ink/80">
                {s.address1}
                <br />
                {s.city}, {s.state} {s.zip}
              </span>
              <span className="text-sm text-muted">{s.role}</span>
              <span className="label text-navy">
                {s.rating.toFixed(1)} ★ · {s.reviews.toLocaleString()} reviews
              </span>
            </Link>
          ))}
          <div className="border-t border-navy pt-6 flex flex-col gap-4">
            <span className="font-display text-5xl text-navy">{TOTAL_REVIEWS.toLocaleString()}</span>
            <span className="text-sm text-ink/80 leading-relaxed">
              Google reviews across two stores, averaging 4.9 stars. Families in Williamson and Wilson County have trusted us
              with engagement rings, heirlooms and repairs for years. The house is built on that.
            </span>
            <Link href="/appointments" className="btn self-start">
              Book an appointment
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}

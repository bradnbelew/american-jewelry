import Link from "next/link";
import { Section, SectionTitle } from "@/components/Section";
import { ProductTile } from "@/components/ProductTile";
import { Pic } from "@/components/Pic";
import { COLLECTIONS, PIECES, STORES, TIERS, TOTAL_REVIEWS } from "@/lib/catalog/data";
import { COLLECTION_PHOTO, STORE_PHOTO, TIER_PHOTO } from "@/lib/catalog/photos";
import { JsonLd, organizationJsonLd } from "@/lib/seo";

export default function Home() {
  const selected = ["signal-solitaire", "shooting-star-pendant", "prism-signet", "signal-studs", "grid-tennis-bracelet", "shooting-star-ring", "grid-eternity-band", "prism-necklace"]
    .map((h) => PIECES.find((p) => p.handle === h)!)
    .filter(Boolean);

  return (
    <>
      <JsonLd data={organizationJsonLd()} />

      {/* Hero */}
      <section className="relative h-[78vh] min-h-[520px] max-h-[900px] overflow-hidden bg-navy">
        <Pic k="hero-box" priority sizes="100vw" position="50% 45%" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-[1440px] px-5 md:px-10 pb-14 md:pb-20 flex flex-col items-start gap-6 text-white">
            <span className="caps text-white/85">Brentwood · Mt. Juliet, Tennessee</span>
            <h1 className="h-display text-[3rem] md:text-[5.25rem] max-w-3xl">The American jewelry house.</h1>
            <Link href="/house" className="link link-light">
              Discover the house
            </Link>
          </div>
        </div>
      </section>

      {/* Statement */}
      <Section className="py-20 md:py-28">
        <p className="font-display font-light text-[1.75rem] md:text-[2.5rem] leading-[1.25] text-center max-w-4xl mx-auto text-balance">
          We draw every design, set every stone and finish every piece at our own bench. Three tiers, one hand, and a mark
          you will not find anywhere else.
        </p>
      </Section>

      {/* Tiers */}
      <Section>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {TIERS.map((t) => (
            <Link key={t.slug} href={`/${t.slug}`} className="group flex flex-col gap-4">
              <div className="relative aspect-[4/5] overflow-hidden bg-ivory img-hover">
                <Pic k={TIER_PHOTO[t.slug]} sizes="(min-width: 768px) 33vw, 100vw" />
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="caps-sm text-muted">Tier {t.numeral}</span>
                <span className="font-display text-[1.75rem] leading-tight">{t.name}</span>
                <span className="text-sm text-ink-2">{t.tagline}</span>
                <span className="link mt-2 self-start">Discover</span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Editorial: Americana */}
      <section className="mt-24 md:mt-32 relative h-[70vh] min-h-[460px] overflow-hidden bg-ivory">
        <Pic k="hero-hand" sizes="100vw" position="50% 40%" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-5 text-white px-5">
          <span className="caps text-white/85">Tier II</span>
          <h2 className="h-display text-[2.75rem] md:text-[4.5rem]">Americana</h2>
          <p className="lede text-white/90 max-w-xl">The signature designs, in solid gold, birthstone and natural diamond versions.</p>
          <Link href="/americana" className="link link-light mt-2">
            See the designs
          </Link>
        </div>
      </section>

      {/* Selected pieces */}
      <Section className="pt-24 md:pt-32">
        <SectionTitle eyebrow="From the bench" title="Selected pieces" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 md:gap-x-8 mt-12">
          {selected.map((p) => (
            <ProductTile key={p.handle} piece={p} />
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <Link href="/americana" className="btn btn-outline">
            All designs
          </Link>
        </div>
      </Section>

      {/* The bench */}
      <Section className="pt-24 md:pt-32">
        <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-center">
          <div className="relative aspect-[4/3] overflow-hidden bg-ivory">
            <Pic k="bench" sizes="(min-width: 768px) 50vw, 100vw" />
          </div>
          <div className="flex flex-col gap-6 md:pr-10">
            <span className="caps text-muted">The House</span>
            <h2 className="h-section text-[2.25rem] md:text-[3.25rem]">Most jewelers are stores. We are a house.</h2>
            <p className="lede">
              A store buys what vendors make and sells it. A house draws its own designs, sets its own stones, finishes
              every piece by hand, marks it, and stands behind it for life. In Mt. Juliet you can watch it happen through
              the glass.
            </p>
            <Link href="/house" className="link self-start">
              Our story
            </Link>
          </div>
        </div>
      </Section>

      {/* Collections */}
      <Section className="pt-24 md:pt-32">
        <SectionTitle eyebrow="Collections" title="Gathered by what they are for" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8 mt-12">
          {COLLECTIONS.map((c) => (
            <Link key={c.slug} href={`/collections/${c.slug}`} className="group flex flex-col gap-3">
              <div className="relative aspect-square overflow-hidden bg-ivory img-hover">
                <Pic k={COLLECTION_PHOTO[c.slug]} sizes="(min-width: 1024px) 25vw, 50vw" />
              </div>
              <span className="font-display text-[1.375rem]">{c.name}</span>
              <span className="text-[0.8125rem] text-ink-2 -mt-2">{c.intro}</span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Stores */}
      <section className="mt-24 md:mt-32 bg-ivory">
        <Section className="py-20 md:py-28">
          <SectionTitle eyebrow="Tennessee" title="Two stores. One bench." />
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 mt-12">
            {STORES.map((s) => (
              <Link key={s.slug} href={`/stores/${s.slug}`} className="group flex flex-col gap-4">
                <div className="relative aspect-[16/10] overflow-hidden bg-white img-hover">
                  <Pic k={STORE_PHOTO[s.slug]} sizes="(min-width: 768px) 50vw, 100vw" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-display text-[1.75rem]">{s.name}</span>
                  <span className="text-sm text-ink-2">
                    {s.address1}, {s.city}
                  </span>
                  <span className="text-[0.8125rem] text-muted">{s.role}</span>
                </div>
              </Link>
            ))}
          </div>
          <p className="caps-sm text-muted text-center mt-14">{TOTAL_REVIEWS.toLocaleString()} Google reviews · 4.9 stars across both stores</p>
        </Section>
      </section>
    </>
  );
}

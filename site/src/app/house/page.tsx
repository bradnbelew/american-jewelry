import type { Metadata } from "next";
import Link from "next/link";
import { Section, SplitOpener } from "@/components/Section";
import { Pic } from "@/components/Pic";
import { STORES, TIERS } from "@/lib/catalog/data";
import { TIER_PHOTO } from "@/lib/catalog/photos";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "The House",
  description: "Why American Jewelry is a house and not a store: one designer, one bench in Tennessee, one hallmark, and what we will and will not say about where things come from.",
  alternates: { canonical: "/house" },
};

export default function HousePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "The House", href: "/house" }])} />
      <SplitOpener
        title="The House"
        lede="A store buys what vendors make and sells it. A house draws its own designs, makes them, marks them, and stands behind them for life. This is how ours works."
        photo="bench"
        position="50% 50%"
      />

      {/* A letter, not a timeline: the founding year and the dates are the family's to supply. */}
      <Section className="pt-20 md:pt-28" width="text" reveal>
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-4">
            <h2 className="h-section text-[2rem] md:text-[2.5rem]">A letter from the family</h2>
          </div>
          <div className="md:col-span-8 prose-house text-ink-2 leading-relaxed text-[1.0625rem]">
            <p>
              For years we were what most jewelers are: a good store. We sold what the trade made, we repaired what came through the door, and people in Brentwood and Mt. Juliet were kind enough to tell each other about us. Two thousand five hundred of them have said so in writing.
            </p>
            <p>
              Somewhere in those years we noticed that the pieces people loved most were the ones we had drawn ourselves and made at our own bench. So we decided to stop being a store. Everything that carries our mark from now on is ours: drawn by one of us, modeled, cast, set and finished here, and entered in our books under the name of the person who wears it.
            </p>
            <p>
              We are not the first American jewelry house, and we will not pretend to be. We would like to be the one that makes its own things, says plainly where they come from, and is still here for your grandchildren&apos;s repairs.
            </p>
            <p className="font-display italic text-[1.25rem] text-ink">The family, Brentwood and Mt. Juliet, Tennessee</p>
          </div>
        </div>
      </Section>

      {/* How a piece is made */}
      <section className="mt-24 md:mt-36 bg-paper">
        <Section className="py-20 md:py-28" reveal>
          <h2 className="h-section text-[2rem] md:text-[2.75rem] mb-12 md:mb-16">How a piece is made here</h2>
          <ol className="grid md:grid-cols-12 gap-x-10 gap-y-12">
            {[
              ["Drawn", "Every design begins as a drawing by our designer. A motif is drawn once, then worked across a ring, a band, a pendant, a bracelet and a signet, so a family of pieces shares one hand."],
              ["Modeled", "The drawing becomes a model: the proportions, the weight in the hand, the seat for each stone. For a commission you can turn it on screen and hold a printed wax before anything is cast."],
              ["Cast", "The model is cast in the metal you chose, solid 14k or 18k gold or platinum, karat-marked. Never plated, never hollow."],
              ["Set and finished", "Stones are set by hand at our bench. The piece is cleaned, polished and struck inside with the AJ hallmark and the mark of its name: a crown, a star or a line. In Mt. Juliet, you can watch through the glass."],
            ].map(([k, v], i) => (
              <li key={k} className={`md:col-span-6 ${i % 2 === 1 ? "md:col-start-7" : ""} flex gap-6 hair pt-6`}>
                <span className="font-display text-[2rem] text-muted leading-none w-10 shrink-0">{i + 1}</span>
                <div className="flex flex-col gap-2">
                  <h3 className="h-item text-[1.375rem]">{k}</h3>
                  <p className="text-ink-2 leading-relaxed">{v}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>
      </section>

      {/* The three names */}
      <Section className="pt-24 md:pt-36" reveal>
        <h2 className="h-section text-[2rem] md:text-[2.75rem] mb-10 md:mb-14">What we make</h2>
        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {TIERS.map((t) => (
            <Link key={t.slug} href={`/${t.slug}`} className="group flex flex-col gap-4">
              <div className="relative aspect-[4/5] overflow-hidden bg-paper img-hover">
                <Pic k={TIER_PHOTO[t.slug]} sizes="(min-width: 768px) 33vw, 100vw" />
              </div>
              <h3 className="h-section text-[1.75rem] group-hover:text-muted transition-colors">{t.name}</h3>
              <p className="text-ink-2 leading-relaxed text-[0.9375rem]">{t.intro}</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* The mark and the words */}
      <Section className="pt-24 md:pt-36" width="text" reveal>
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 hair pt-10">
          <div className="md:col-span-4 flex flex-col gap-6">
            <h2 className="h-section text-[2rem] md:text-[2.5rem]">The mark</h2>
          </div>
          <div className="md:col-span-8 prose-house text-ink-2 leading-relaxed">
            <p>
              Every piece carries the AJ hallmark inside, with a small mark beside it for its tier: a crown for Royal American, a star for Americana, a line for New American. Every piece also carries a numbered certificate with the drawing it came from, the hands that made it, and the report on its stones.
            </p>
            <p>
              The mark is a promise about where a piece comes from, so we are careful with the words. We say &ldquo;Designed in Tennessee. Set and finished in our workshop.&rdquo; We do not say &ldquo;Made in America,&rdquo; because our diamonds and gold are imported, and we do not say &ldquo;handmade,&rdquo; because a cast piece is not. We say &ldquo;man-made diamond&rdquo; every time we mean one. If a sentence on this site ever says more than we can prove, tell us and we will change it.
            </p>
            <Link href="/journal/what-designed-in-tennessee-means" className="link self-start mt-2">
              What the words mean
            </Link>
          </div>
        </div>
      </Section>

      {/* Visit */}
      <Section className="pt-24 md:pt-36" reveal>
        <div className="grid md:grid-cols-12 gap-10 md:gap-12 items-center">
          <div className="md:col-span-7 relative aspect-[4/3] overflow-hidden bg-paper">
            <Pic k={STORES[1].photo} sizes="(min-width: 768px) 58vw, 100vw" />
          </div>
          <div className="md:col-span-5 flex flex-col gap-6">
            <h2 className="h-section text-[2rem] md:text-[2.75rem]">Come and see the bench.</h2>
            <p className="lede measure">
              In Mt. Juliet the workshop is behind glass, and the person who will set your stone is usually the one who says hello. In Brentwood the salon is quieter, and Royal American pieces are shown by appointment.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              <Link href="/stores" className="btn">
                The stores
              </Link>
              <Link href="/appointments" className="link self-center">
                Book an appointment
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

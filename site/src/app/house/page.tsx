import type { Metadata } from "next";
import Link from "next/link";
import { Section, Heading } from "@/components/Section";
import { TIERS } from "@/lib/catalog/data";

export const metadata: Metadata = {
  title: "The House",
  description: "How American Jewelry designs, casts and sets its own jewelry in Tennessee, and why.",
};

export default function HousePage() {
  return (
    <>
      <Section className="pt-20 pb-16" width="5xl">
        <Heading
          eyebrow="The House"
          title="Most jewelers are stores. We are a house."
          lede="The difference is simple. A store buys what vendors make and sells it. A house draws its own designs, makes them, marks them, and stands behind them for life."
          size="xl"
        />
      </Section>

      <Section width="5xl" className="pb-20">
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-12 border-t border-navy pt-10">
          <div className="flex flex-col gap-4">
            <span className="eyebrow">Design</span>
            <h2 className="font-display text-4xl text-navy">One designer. Every piece.</h2>
          </div>
          <div className="flex flex-col gap-5 text-lg text-ink/85 leading-relaxed">
            <p>
              Everything in the house begins as a drawing by our designer. A motif is drawn once, then worked across a ring, a
              band, a pendant, a bracelet, a signet, so a family of pieces shares the same hand. Nothing is licensed. Nothing is
              bought from a catalog. If it carries our mark, we drew it.
            </p>
            <p>
              From the drawing we build the model, cut the wax, cast the metal, and set the stones. The whole chain is ours,
              which is why we can promise what we promise.
            </p>
          </div>
        </div>
      </Section>

      <Section width="5xl" className="pb-20">
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-12 border-t border-navy pt-10">
          <div className="flex flex-col gap-4">
            <span className="eyebrow">Three tiers</span>
            <h2 className="font-display text-4xl text-navy">One house, three doors.</h2>
          </div>
          <div className="flex flex-col divide-y divide-line">
            {TIERS.map((t) => (
              <Link key={t.slug} href={`/${t.slug}`} className="group grid sm:grid-cols-[6rem_1fr] gap-2 py-5">
                <span className="label text-muted">Tier {t.numeral}</span>
                <span className="flex flex-col gap-1">
                  <span className="font-display text-2xl text-navy group-hover:text-gilt transition-colors">{t.name}</span>
                  <span className="text-ink/80">{t.intro}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <Section width="5xl" className="pb-20">
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-12 border-t border-navy pt-10">
          <div className="flex flex-col gap-4">
            <span className="eyebrow">The mark</span>
            <h2 className="font-display text-4xl text-navy">Struck inside every shank.</h2>
          </div>
          <div className="flex flex-col gap-5 text-lg text-ink/85 leading-relaxed">
            <p>
              Every piece carries the AJ hallmark inside, with a small mark above it that says which tier it belongs to: a crown
              for Royal American, a star for Americana, a line for New American. Every piece also carries a numbered certificate
              with the drawing it came from, the hands that made it, and the report on its stones.
            </p>
            <p>Lifetime cleaning, prong checks and polishing are included. Bring it to either store, any time.</p>
          </div>
        </div>
      </Section>

      <Section width="5xl">
        <div className="bg-navy text-cream p-10 md:p-14 grid md:grid-cols-[1.4fr_1fr] gap-8 items-center">
          <p className="font-display text-3xl md:text-4xl leading-tight balance">
            Come see the bench. In Mt. Juliet the workshop is behind glass, and the person who will set your stone is usually
            the one who says hello.
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/stores" className="btn !bg-gilt !border-gilt !text-navy">
              Our stores
            </Link>
            <Link href="/appointments" className="btn !bg-transparent !border-cream/50 !text-cream hover:!bg-cream hover:!text-navy">
              Book an appointment
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Section, PageTitle } from "@/components/Section";
import { PhotoBand } from "@/components/PhotoBand";
import { Pic } from "@/components/Pic";
import { TIERS } from "@/lib/catalog/data";

export const metadata: Metadata = {
  title: "The House",
  description: "How American Jewelry designs, sets and finishes its own jewelry in Tennessee, and why.",
};

export default function HousePage() {
  return (
    <>
      <Section className="pt-16 md:pt-24 pb-12 md:pb-16">
        <PageTitle
          eyebrow="The House"
          title="Most jewelers are stores. We are a house."
          lede="A store buys what vendors make and sells it. A house draws its own designs, makes them, marks them, and stands behind them for life."
        />
      </Section>
      <Section>
        <PhotoBand k="bench" />
      </Section>

      <Chapter eyebrow="Design" title="One designer. Every piece.">
        <p>
          Everything in the house begins as a drawing by our designer. A motif is drawn once, then worked across a ring, a band,
          a pendant, a bracelet, a signet, so a family of pieces shares the same hand. Nothing is licensed. Nothing is bought from
          a catalog. If it carries our mark, we drew it.
        </p>
        <p>From the drawing we build the model, cast the metal, set the stones and finish every surface by hand at our bench.</p>
      </Chapter>

      <Chapter eyebrow="Three tiers" title="One house, three doors.">
        <div className="flex flex-col divide-y divide-hair -mt-2">
          {TIERS.map((t) => (
            <Link key={t.slug} href={`/${t.slug}`} className="group flex py-5">
              <span className="flex flex-col gap-1">
                <span className="font-display text-[1.5rem] group-hover:text-muted transition-colors">{t.name}</span>
                <span className="text-ink-2 leading-relaxed">{t.intro}</span>
              </span>
            </Link>
          ))}
        </div>
      </Chapter>

      <Chapter eyebrow="The mark" title="Struck inside every shank.">
        <p>
          Every piece carries the AJ hallmark inside, with a small mark above it that says which tier it belongs to: a crown for
          Royal American, a star for Americana, a line for New American. Every piece also carries a numbered certificate with the
          drawing it came from, the hands that made it, and the report on its stones.
        </p>
        <p>Designed in Tennessee. Set and finished in our workshop. Diamonds and gold are imported.</p>
      </Chapter>

      <Section className="pt-20 md:pt-28">
        <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-center">
          <div className="relative aspect-[4/3] overflow-hidden bg-ivory">
            <Pic k="hero-box" sizes="(min-width: 768px) 50vw, 100vw" />
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="h-section text-[2rem] md:text-[2.75rem]">
              Come see the bench. In Mt. Juliet the workshop is behind glass, and the person who will set your stone is usually the
              one who says hello.
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/stores" className="btn">
                Our stores
              </Link>
              <Link href="/appointments" className="btn btn-outline">
                Book an appointment
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function Chapter({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <Section width="text" className="pt-20 md:pt-28">
      <div className="grid md:grid-cols-[1fr_1.5fr] gap-6 md:gap-16 hair pt-10">
        <div className="flex flex-col gap-3">
          <span className="caps-sm text-muted">{eyebrow}</span>
          <h2 className="h-section text-[2rem] md:text-[2.5rem]">{title}</h2>
        </div>
        <div className="flex flex-col gap-5 lede">{children}</div>
      </div>
    </Section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Section, PageTitle } from "@/components/Section";

export const metadata: Metadata = {
  title: "Lifetime Care Program",
  description: "Cleaning, prong checks, polishing, resizing and repair at American Jewelry's workshop in Mt. Juliet.",
};

export default function CarePage() {
  return (
    <>
      <Section className="pt-16 md:pt-24 pb-12 md:pb-16">
        <PageTitle eyebrow="Included with every piece" title="Lifetime Care Program" lede="Bring it in two or three times a year. We clean it, check every prong, and polish it while you wait. No charge, for as long as you own it." />
      </Section>
      <Section width="text">
        <div className="grid md:grid-cols-3 gap-10 hair pt-10">
          {[
            ["Clean and check", "Ultrasonic and steam clean, a loupe over every setting, a note of anything to watch. Fifteen minutes, free."],
            ["Resize", "One free resize within 60 days on rings we made; after that, at cost. Full eternity bands are remade, not resized."],
            ["Repair", "Retipping, re-shanking, chain and clasp repair, stone replacement and laser welding at the bench in Mt. Juliet."],
          ].map(([k, v]) => (
            <div key={k} className="flex flex-col gap-2">
              <span className="font-display text-[1.5rem]">{k}</span>
              <p className="text-ink-2 leading-relaxed">{v}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section width="text" id="sizing" className="pt-16">
        <div className="hair pt-6 flex flex-col gap-3 max-w-2xl">
          <span className="caps-sm text-muted">Sizing</span>
          <p className="text-ink-2 leading-relaxed">
            Fingers change size with the weather and the hour. Come in and we size you properly, free, or order and we resize once at
            no charge. If you must measure at home, use a ring that already fits and measure its inside diameter in millimeters; we
            will match it. Bands over 4 mm wide usually need a half size up.
          </p>
          <Link href="/appointments?kind=care" className="link self-start">
            Book a care visit
          </Link>
        </div>
      </Section>
    </>
  );
}

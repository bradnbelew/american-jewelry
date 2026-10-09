import type { Metadata } from "next";
import Link from "next/link";
import { Section, Heading } from "@/components/Section";

export const metadata: Metadata = {
  title: "Lifetime care",
  description: "Cleaning, prong checks, polishing, resizing and repair at American Jewelry's workshop in Mt. Juliet.",
};

export default function CarePage() {
  return (
    <>
      <Section className="pt-20 pb-14" width="5xl">
        <Heading eyebrow="Included with every piece" title="Lifetime care" lede="Bring it in two or three times a year. We clean it, check every prong, and polish it while you wait. No charge, for as long as you own it." size="xl" />
      </Section>
      <Section width="5xl" className="pb-16">
        <div className="grid md:grid-cols-3 gap-8 border-t border-navy pt-8">
          {[
            ["Clean and check", "Ultrasonic and steam clean, a loupe over every setting, a note of anything to watch. Fifteen minutes, free."],
            ["Resize", "One free resize within a year on rings we made; after that, at cost. Eternity bands are remade, not resized."],
            ["Repair", "Retipping, re-shanking, chain and clasp repair, stone replacement, laser welding, at the bench in Mt. Juliet."],
          ].map(([k, v]) => (
            <div key={k} className="flex flex-col gap-2">
              <span className="font-display text-2xl text-navy">{k}</span>
              <p className="text-ink/85 leading-relaxed">{v}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section width="5xl" id="sizing">
        <div className="border border-line bg-paper p-8 flex flex-col gap-3 max-w-2xl">
          <span className="eyebrow">Sizing</span>
          <p className="text-ink/85 leading-relaxed">
            Fingers change size with the weather and the hour. Come in and we size you properly, free, or order and we resize
            once at no charge. If you must measure at home, use a ring that already fits and measure its inside diameter in
            millimeters; we will match it.
          </p>
          <Link href="/appointments?kind=care" className="label text-navy hover:text-gilt">
            Book a care visit →
          </Link>
        </div>
      </Section>
    </>
  );
}

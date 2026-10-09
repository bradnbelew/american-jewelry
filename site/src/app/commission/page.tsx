import type { Metadata } from "next";
import Link from "next/link";
import { Section, PageTitle } from "@/components/Section";
import { PhotoBand } from "@/components/PhotoBand";

export const metadata: Metadata = {
  title: "Commission a piece",
  description: "How a custom piece is made at American Jewelry: conversation, drawing, model, casting, setting.",
};

const STEPS: [string, string][] = [
  ["Conversation", "An hour in the salon. What it is for, who it is for, what you already own, what you have in mind, and what you would rather not say out loud about budget. We say it for you."],
  ["Drawing", "Our designer draws it. Two or three directions, by hand, within a week. You keep the drawings."],
  ["Model", "The chosen drawing becomes a 3D model you can turn on screen and a printed wax you can hold. Changes are free until you approve."],
  ["Casting and setting", "Cast in the metal you chose, cleaned, polished, set by hand, and struck with the AJ mark."],
  ["Delivery", "Collected in store or delivered insured, with the numbered certificate, the drawing it came from, and the Lifetime Care Program."],
];

export default function CommissionPage() {
  return (
    <>
      <Section className="pt-16 md:pt-24 pb-12 md:pb-16">
        <PageTitle title="Commission a piece" lede="Something that exists nowhere yet, made here. Four to eight weeks from the first conversation; a deposit of a third to begin, refundable until you approve the drawing." />
      </Section>
      <Section>
        <PhotoBand k="ring-halo" />
      </Section>
      <Section width="text" className="pt-16 md:pt-24">
        <ol className="hair divide-y divide-hair">
          {STEPS.map(([k, v], i) => (
            <li key={k} className="grid md:grid-cols-[3rem_12rem_1fr] gap-3 md:gap-6 py-7">
              <span className="font-display text-[1.75rem] text-muted leading-none pt-1">{i + 1}</span>
              <span className="font-display text-[1.5rem]">{k}</span>
              <p className="text-ink-2 leading-relaxed">{v}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Section width="text" className="pt-16">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="flex flex-col gap-3 hair pt-6">
            <span className="caps-sm text-muted">Heirlooms</span>
            <p className="text-ink-2 leading-relaxed">Bring the stones you have. A grandmother&apos;s diamond reset in a Shooting Star, a family sapphire at the center of a Prism signet. We draw to the stone.</p>
          </div>
          <div className="flex flex-col gap-3 hair pt-6">
            <span className="caps-sm text-muted">Royal American</span>
            <p className="text-ink-2 leading-relaxed">A commission can be entered in the Royal American registry as a numbered one-of-one, with the house undertaking never to repeat it.</p>
          </div>
        </div>
        <div className="mt-12">
          <Link href="/appointments?kind=commission" className="btn">
            Start the conversation
          </Link>
        </div>
      </Section>
    </>
  );
}

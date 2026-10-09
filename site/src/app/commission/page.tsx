import type { Metadata } from "next";
import Link from "next/link";
import { Section, Heading } from "@/components/Section";

export const metadata: Metadata = {
  title: "Commission a piece",
  description: "How a custom piece is made at American Jewelry: conversation, drawing, model, casting, setting.",
};

const STEPS: [string, string][] = [
  ["Conversation", "An hour in the salon. What it is for, who it is for, what you already own, what you have in mind, and what you would rather not say out loud about budget. We say it for you."],
  ["Drawing", "Our designer draws it. Two or three directions, by hand, within a week. You keep the drawings."],
  ["Model", "The chosen drawing becomes a 3D model you can turn on screen and a printed wax you can hold. Changes are free until you approve."],
  ["Casting and setting", "Cast in our workshop in the metal you chose, cleaned, polished, set by hand, and struck with the AJ mark."],
  ["Delivery", "Collected in store or delivered insured, with the numbered certificate, the drawing it came from, and lifetime care."],
];

export default function CommissionPage() {
  return (
    <>
      <Section className="pt-20 pb-14" width="5xl">
        <Heading eyebrow="Bespoke" title="Commission a piece" lede="Something that exists nowhere, made here. Four to eight weeks from the first conversation; a deposit of a third to begin." size="xl" />
      </Section>
      <Section width="5xl" className="pb-16">
        <ol className="border-t border-navy divide-y divide-line">
          {STEPS.map(([k, v], i) => (
            <li key={k} className="grid md:grid-cols-[4rem_14rem_1fr] gap-4 py-7">
              <span className="font-display text-3xl text-gilt">{i + 1}</span>
              <span className="font-display text-2xl text-navy">{k}</span>
              <p className="text-ink/85 leading-relaxed">{v}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Section width="5xl">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border border-line bg-paper p-8 flex flex-col gap-3">
            <span className="eyebrow">Heirlooms</span>
            <p className="text-ink/85 leading-relaxed">
              Bring the stones you have. A grandmother&apos;s diamond reset in a Shooting Star, a family sapphire at the center of a Prism signet. We draw to the stone.
            </p>
          </div>
          <div className="border border-line bg-paper p-8 flex flex-col gap-3">
            <span className="eyebrow">Royal American</span>
            <p className="text-ink/85 leading-relaxed">
              A commission can be entered in the Royal American registry as a numbered one-of-one, with the house undertaking never to repeat it.
            </p>
          </div>
        </div>
        <div className="mt-10">
          <Link href="/appointments?kind=commission" className="btn">
            Start the conversation
          </Link>
        </div>
      </Section>
    </>
  );
}

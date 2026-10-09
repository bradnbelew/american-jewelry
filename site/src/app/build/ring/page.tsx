import type { Metadata } from "next";
import { Section, Heading } from "@/components/Section";
import { RingBuilder } from "@/components/RingBuilder";

export const metadata: Metadata = {
  title: "Build a ring",
  description: "Choose a house setting, a natural or man made diamond, the metal and the fit. Made to order at our bench in Tennessee.",
};

export default function BuildRingPage() {
  return (
    <>
      <Section className="pt-16 pb-12">
        <Heading eyebrow="Made to order" title="Build a ring" lede="Four decisions. Every one of them is yours, and every setting is ours." />
      </Section>
      <Section>
        <RingBuilder />
      </Section>
    </>
  );
}

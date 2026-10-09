import type { Metadata } from "next";
import { Section, PageTitle } from "@/components/Section";
import { RingBuilder } from "@/components/RingBuilder";

export const metadata: Metadata = {
  title: "Build a ring",
  description: "Choose a house setting, a natural or man-made diamond, the metal and the fit. Made to order at our bench in Tennessee.",
};

export default function BuildRingPage() {
  return (
    <>
      <Section className="pt-16 md:pt-24 pb-12 md:pb-16">
        <PageTitle eyebrow="Made to order" title="Build a ring" lede="Four decisions. Every one of them is yours, and every setting is ours." />
      </Section>
      <Section>
        <RingBuilder />
      </Section>
    </>
  );
}

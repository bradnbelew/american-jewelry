import type { Metadata } from "next";
import { Suspense } from "react";
import { Section, PageTitle } from "@/components/Section";
import { RingBuilder } from "@/components/builder/RingBuilder";
import { decodeCode } from "@/lib/builder/code";
import { SETTINGS, type RingConfig, type SettingKey } from "@/lib/builder/model";

export const metadata: Metadata = {
  title: "Build a ring",
  description: "Choose a house setting, make it yours, choose a natural or man-made diamond at a set quality, the metal and the fit. Made to order at our bench in Tennessee.",
};

export default function BuildRingPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return (
    <>
      <Section className="pt-16 md:pt-24 pb-12 md:pb-16">
        <PageTitle eyebrow="Made to order" title="Build a ring" lede="Five decisions. Every one of them is yours, and every setting is ours." />
      </Section>
      <Section>
        <Suspense fallback={<div className="aspect-[4/3] sm:aspect-square max-w-2xl bg-ivory" aria-busy="true" />}>
          <Prefilled searchParams={searchParams} />
        </Suspense>
      </Section>
    </>
  );
}

async function Prefilled({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  let initial: Partial<RingConfig> | undefined;
  if (typeof sp.code === "string") initial = decodeCode(sp.code) ?? undefined;
  if (!initial && typeof sp.setting === "string" && SETTINGS.includes(sp.setting as SettingKey)) initial = { setting: sp.setting as SettingKey };
  return <RingBuilder initial={initial} />;
}

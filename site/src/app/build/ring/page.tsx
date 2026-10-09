import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Section } from "@/components/Section";
import { Pic } from "@/components/Pic";
import { RingBuilder } from "@/components/builder/RingBuilder";
import { decodeCode } from "@/lib/builder/code";
import { SETTINGS, STONE_STANDARD, type RingConfig, type SettingKey } from "@/lib/builder/model";
import { DESIGN_NOTES, SETTING_PHOTO } from "@/lib/builder/notes";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Build a ring",
  description:
    "Choose one of three house settings, a natural or man-made diamond at a set quality, and the metal. The ring is priced from its own geometry and made to order at our bench in Tennessee.",
  alternates: { canonical: "/build/ring" },
};

export default function BuildRingPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Bridal", href: "/collections/bridal" }, { name: "Build a ring", href: "/build/ring" }])} />
      <Section className="pt-12 md:pt-20 pb-10 md:pb-14">
        <div className="flex flex-col gap-5 max-w-3xl">
          <h1 className="h-display text-[3rem] md:text-[4.5rem]">Build a ring</h1>
          <p className="lede measure">Three settings we drew. Three choices that are yours. The rest is decided the way we would decide it, and the ring is made to order at our bench.</p>
        </div>
      </Section>
      <Section>
        <Suspense fallback={<div className="grid lg:grid-cols-12 gap-10"><div className="lg:col-span-7 aspect-[4/3] sm:aspect-square lg:aspect-[5/4] bg-paper" aria-busy="true" /></div>}>
          <Prefilled searchParams={searchParams} />
        </Suspense>
      </Section>

      {/* Server-rendered: what the settings are and what the house decided, readable without JavaScript. */}
      <Section className="pt-28 md:pt-40" width="text" reveal>
        <h2 className="h-section text-[2rem] md:text-[2.75rem] mb-12">The three settings</h2>
        <div className="flex flex-col divide-y divide-hair hair">
          {SETTINGS.map((s) => {
            const n = DESIGN_NOTES[s];
            return (
              <article key={s} className="grid md:grid-cols-12 gap-6 md:gap-10 py-10">
                <div className="md:col-span-3 relative aspect-square overflow-hidden bg-paper">
                  <Pic k={SETTING_PHOTO[s]} sizes="(min-width: 768px) 20vw, 100vw" />
                </div>
                <div className="md:col-span-9 flex flex-col gap-4">
                  <h3 className="h-section text-[1.75rem]">
                    {n.name}
                    <span className="block h-item text-[1.125rem] text-ink-2 italic mt-1">{n.line}</span>
                  </h3>
                  <p className="text-ink-2 leading-relaxed measure">{n.why}</p>
                  <div className="grid sm:grid-cols-2 gap-6 text-[0.875rem] pt-2">
                    <div>
                      <span className="text-muted">The house decided</span>
                      <ul className="mt-2 flex flex-col gap-1 text-ink-2">
                        {n.fixed.map((x) => (
                          <li key={x}>{x}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="text-muted">Yours to decide</span>
                      <ul className="mt-2 flex flex-col gap-1 text-ink-2">
                        {n.yours.map((x) => (
                          <li key={x}>{x}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <Link href={`/build/ring?setting=${s}`} className="link self-start mt-2">
                    Build on {n.name}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <Section className="pt-20 md:pt-28" width="text" reveal>
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 hair pt-10">
          <div className="flex flex-col gap-4">
            <h2 className="h-section text-[1.75rem]">One quality for each stone</h2>
            <p className="text-ink-2 leading-relaxed">
              We do not keep a stone inventory to browse. Every natural diamond we set is {STONE_STANDARD.natural.grade.toLowerCase()}, with a {STONE_STANDARD.natural.report.toLowerCase()}. Every man-made diamond is {STONE_STANDARD["man-made"].grade.toLowerCase()}, with an {STONE_STANDARD["man-made"].report}. You choose the size; the quality is settled.
            </p>
            <Link href="/natural-or-man-made" className="link self-start">
              Natural or man-made
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="h-section text-[1.75rem]">How the price is made</h2>
            <p className="text-ink-2 leading-relaxed">
              The ring is priced from its own geometry: the band&apos;s volume at your size and width, in your metal, at the day&apos;s metal price; the bench work the setting needs; and the stone at its set quality. Open &ldquo;Where the price comes from&rdquo; under the ring to see the three lines.
            </p>
            <Link href="/appointments?build=ring" className="link self-start">
              See it in store first
            </Link>
          </div>
        </div>
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

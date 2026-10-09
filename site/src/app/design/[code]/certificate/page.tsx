import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageFallback } from "@/components/PageFallback";
import { certificateNumber, decodeCode } from "@/lib/builder/code";
import { BIRTHSTONES, HAND_LABEL, METAL_LABEL, PROFILE_LABEL, PRONG_LABEL, STONE_STANDARD, leadTimeWeeks, ringName, stoneDiameterMm } from "@/lib/builder/model";
import { DESIGN_NOTES } from "@/lib/builder/notes";
import { metalGrams } from "@/lib/builder/pricing";

export const metadata: Metadata = { title: "Certificate", robots: { index: false } };

export default function CertificatePage({ params }: { params: Promise<{ code: string }> }) {
  return (
    <Suspense fallback={<PageFallback />}>
      <Content params={params} />
    </Suspense>
  );
}

async function Content({ params }: { params: Promise<{ code: string }> }) {
  const { code: raw } = await params;
  const code = decodeURIComponent(raw);
  const c = decodeCode(code);
  if (!c) notFound();
  const note = DESIGN_NOTES[c.setting];
  const number = certificateNumber(code);

  const rows: [string, string][] = [
    ["Design", `${note.name}, drawn by the house`],
    ["Band", `${c.setting === "prism" ? "Faceted" : PROFILE_LABEL[c.profile]} · ${c.width.toFixed(1)} mm${c.taper ? " · tapered shank" : ""}`],
    ...(c.setting !== "prism" ? ([["Head", `${c.prongs} ${PRONG_LABEL[c.prongStyle].toLowerCase()} prongs${c.halo ? " · hidden halo of twelve stones" : ""}`]] as [string, string][]) : []),
    ...(c.setting === "shooting-star" ? ([["Tail", `${c.tail === "long" ? "Five" : "Three"} graduated stones${c.birthstone ? ` · ${BIRTHSTONES[c.birthstone - 1].stone} (${BIRTHSTONES[c.birthstone - 1].name})` : ""}`]] as [string, string][]) : []),
    ["Center stone", `${c.carat.toFixed(2)} ct round brilliant, ${stoneDiameterMm(c.carat).toFixed(1)} mm · ${STONE_STANDARD[c.origin].short}`],
    ["Grade", STONE_STANDARD[c.origin].grade],
    ["Report", `${STONE_STANDARD[c.origin].report} · No. ________`],
    ["Origin", c.origin === "man-made" ? "Man-made (laboratory-grown), chemical vapor deposition, as grown with no post-growth treatment. Not mined." : "Natural, mined. Treatment, if any, stated on the report."],
    ["Metal", `${METAL_LABEL[c.metal]}, approximately ${metalGrams(c).toFixed(1)} g, karat-marked`],
    ["Size", c.size],
    ...(c.engraving ? ([["Engraving", `“${c.engraving}” · ${HAND_LABEL[c.hand]}, cut by hand`]] as [string, string][]) : []),
    ["Made", `Designed in Tennessee. Set and finished in our workshop. Diamonds and gold are imported. About ${leadTimeWeeks(c)} weeks.`],
    ["Care", "Lifetime Care Program: cleaning, prong checks and polishing at either store, for as long as it is yours."],
  ];

  return (
    <section className="mx-auto max-w-3xl px-5 md:px-10 pt-16 md:pt-24 pb-24 print:pt-6">
      <div className="border border-ink p-8 md:p-12 flex flex-col gap-10 print:border-0 print:p-0">
        <div className="flex flex-col items-center text-center gap-3">
          <span className="font-display text-[1.375rem] tracking-[0.26em] uppercase">American Jewelry</span>
          <span className="caps-sm text-muted">Certificate of making</span>
          <span className="font-display text-[2rem] md:text-[2.5rem] leading-tight">{ringName(c)}</span>
          <span className="caps-sm">No. {number}</span>
        </div>
        <div className="grid md:grid-cols-[12rem_1fr] gap-10 items-start">
          <div className="flex flex-col gap-3">
            <span className="caps-sm text-muted">The design</span>
            <span className="font-display text-[1.25rem] italic text-ink-2">{note.line}</span>
            <span className="text-[0.8125rem] text-muted">The designer&apos;s drawing is printed here on the issued certificate.</span>
          </div>
          <dl className="grid grid-cols-[7.5rem_1fr] gap-y-3 gap-x-5 text-[0.875rem]">
            {rows.map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="caps-sm text-muted pt-0.5">{k}</dt>
                <dd className="text-ink-2 leading-relaxed">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid sm:grid-cols-3 gap-8 hair pt-8">
          {["Designed by", "Set by", "Finished by"].map((k) => (
            <div key={k} className="flex flex-col gap-6">
              <span className="caps-sm text-muted">{k}</span>
              <span className="border-b border-ink h-6" />
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-baseline justify-between gap-4 text-[0.75rem] text-muted">
          <span>Design code {code}</span>
          <span>Preview. Issued with the finished piece, with the report number and the hands that made it.</span>
        </div>
      </div>
      <p className="text-[0.75rem] text-muted mt-6 print:hidden">Use your browser&apos;s print command for a copy.</p>
    </section>
  );
}

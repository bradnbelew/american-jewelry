"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { RingViewer } from "@/components/three/RingViewer";
import type { MetalKey, SettingKey } from "@/components/three/RingScene";
import { METAL_LABEL } from "@/lib/catalog/types";
import { formatPrice } from "@/lib/catalog/data";
import { Swatch } from "./PieceConfigurator";
import { useBag } from "./bag/BagProvider";

/**
 * Ring builder. Pricing is a model, not a quote:
 *   price = setting (by design × metal) + stone (by origin × carat)
 * The structure is what the Shopify cart handoff will carry: variant (metal × size) + line attributes (stone, engraving, design code).
 */

type Origin = "natural" | "man-made";
type Step = 1 | 2 | 3 | 4;

const SETTINGS: { key: SettingKey; name: string; line: string; base: number }[] = [
  { key: "signal", name: "Signal", line: "One stone, open on four sides, knife-edge band.", base: 900 },
  { key: "shooting-star", name: "Shooting Star", line: "The star beside the stone, the tail down the shoulder.", base: 1400 },
  { key: "prism", name: "Prism", line: "A faceted band that meets the stone in a six-sided head.", base: 1300 },
];

const METALS: MetalKey[] = ["14k-yellow", "14k-white", "14k-rose", "18k-yellow", "platinum"];
const METAL_ADD: Record<MetalKey, number> = { "14k-yellow": 0, "14k-white": 0, "14k-rose": 0, "18k-yellow": 350, platinum: 900 };
const CARATS = [0.75, 1.0, 1.25, 1.5, 2.0, 2.5, 3.0];
const stonePrice = (origin: Origin, ct: number) => (origin === "natural" ? Math.round(4200 * Math.pow(ct, 1.9)) : Math.round(950 + 650 * ct));
const SIZES = ["4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "10"];
const STEPS = ["Setting", "Stone", "Metal", "Fit"] as const;

export function RingBuilder() {
  const [step, setStep] = useState<Step>(1);
  const [setting, setSetting] = useState<SettingKey>("signal");
  const [origin, setOrigin] = useState<Origin>("man-made");
  const [carat, setCarat] = useState(1.5);
  const [metal, setMetal] = useState<MetalKey>("14k-yellow");
  const [size, setSize] = useState("6.5");
  const [engrave, setEngrave] = useState("");
  const { add } = useBag();

  const s = SETTINGS.find((x) => x.key === setting)!;
  const total = useMemo(() => (s.base + METAL_ADD[metal] + stonePrice(origin, carat)) * 100, [s, metal, origin, carat]);
  const tierName = origin === "natural" ? "Americana" : "New American";
  const stoneLabel = `${carat.toFixed(2)} ct ${origin === "natural" ? "natural" : "man-made"} diamond`;
  const summary = new URLSearchParams({ build: "ring", setting, stone: origin, carat: String(carat), metal, size, ...(engrave ? { engrave } : {}) }).toString();

  return (
    <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-20 items-start">
      <div className="lg:sticky lg:top-32 flex flex-col gap-4">
        <div className="relative aspect-square overflow-hidden bg-ivory">
          <RingViewer metal={metal} setting={setting} carat={carat} className="absolute inset-0" autoRotate={step === 1} />
        </div>
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 hair pt-4">
          <div className="flex flex-col min-w-0">
            <span className="caps-sm text-muted">{tierName}</span>
            <span className="font-display text-[1.375rem] leading-snug">
              {s.name} · {stoneLabel} · {METAL_LABEL[metal]}
            </span>
          </div>
          <span className="font-display text-[1.75rem] tabular-nums whitespace-nowrap">{formatPrice(total)}</span>
        </div>
        <p className="text-[0.75rem] text-muted">Prices are a working model for this preview. Stand-in 3D model until the design CAD is exported.</p>
      </div>

      <div className="flex flex-col gap-8">
        <ol className="grid grid-cols-4 hair">
          {STEPS.map((label, i) => {
            const n = (i + 1) as Step;
            return (
              <li key={label}>
                <button type="button" onClick={() => setStep(n)} className={`w-full h-12 caps-sm border-t -mt-px ${step === n ? "border-ink text-ink" : "border-transparent text-muted hover:text-ink"}`}>
                  {n}. {label}
                </button>
              </li>
            );
          })}
        </ol>

        {step === 1 && (
          <StepBlock title="Choose the setting" lede="Every setting is a house design. The same setting takes a natural or a man-made stone.">
            <div className="flex flex-col gap-2">
              {SETTINGS.map((x) => (
                <button key={x.key} type="button" className="opt !min-h-[4.5rem] py-3" aria-pressed={setting === x.key} onClick={() => setSetting(x.key)}>
                  <span className="flex flex-col gap-0.5">
                    <span className="font-display text-[1.25rem]">{x.name}</span>
                    <span className="text-[0.8125rem] text-muted">{x.line}</span>
                  </span>
                  <span className="text-[0.8125rem] text-ink-2 whitespace-nowrap tabular-nums">from {formatPrice(x.base * 100)}</span>
                </button>
              ))}
            </div>
            <Next onClick={() => setStep(2)} />
          </StepBlock>
        )}

        {step === 2 && (
          <StepBlock title="Choose the stone" lede="Natural puts this ring in Americana. Man-made puts it in New American. Both are labeled plainly, always.">
            <div className="grid sm:grid-cols-2 gap-2">
              {(
                [
                  ["man-made", "Man-made diamond", "D–F, VVS, Ideal cut, IGI report, inscribed."],
                  ["natural", "Natural diamond", "F–G, VS and up, GIA report. Hand-selected for you."],
                ] as const
              ).map(([key, name, line]) => (
                <button key={key} type="button" className="opt !min-h-[6rem] py-3 !items-start" aria-pressed={origin === key} onClick={() => setOrigin(key)}>
                  <span className="flex flex-col gap-1">
                    <span className="font-display text-[1.25rem]">{name}</span>
                    <span className="text-[0.8125rem] text-muted leading-relaxed">{line}</span>
                    <span className="text-[0.8125rem] text-ink-2 tabular-nums">{formatPrice(stonePrice(key, carat) * 100)} at {carat.toFixed(2)} ct</span>
                  </span>
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <span className="caps-sm">Carat</span>
              <div className="flex flex-wrap gap-2">
                {CARATS.map((c) => (
                  <button key={c} type="button" className="pill" aria-pressed={carat === c} onClick={() => setCarat(c)}>
                    {c.toFixed(2)}
                  </button>
                ))}
              </div>
              <p className="text-[0.75rem] text-muted">Round brilliant shown. Oval, cushion, emerald and pear in store.</p>
            </div>
            <Next onClick={() => setStep(3)} />
          </StepBlock>
        )}

        {step === 3 && (
          <StepBlock title="Choose the metal" lede="Solid gold or platinum. Never plated, never hollow.">
            <div className="flex flex-col gap-2">
              {METALS.map((m) => (
                <button key={m} type="button" className="opt" aria-pressed={metal === m} onClick={() => setMetal(m)}>
                  <span className="flex items-center gap-3">
                    <Swatch metal={m} />
                    {METAL_LABEL[m]}
                  </span>
                  <span className="text-[0.8125rem] text-muted tabular-nums">{METAL_ADD[m] ? `+ ${formatPrice(METAL_ADD[m] * 100)}` : "included"}</span>
                </button>
              ))}
            </div>
            <Next onClick={() => setStep(4)} />
          </StepBlock>
        )}

        {step === 4 && (
          <StepBlock title="Fit and finish" lede="We size in store for free, and resize once at no charge within 60 days.">
            <div className="flex flex-col gap-3">
              <span className="caps-sm">Size</span>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((x) => (
                  <button key={x} type="button" className="pill" aria-pressed={size === x} onClick={() => setSize(x)}>
                    {x}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <span className="caps-sm">Engraving</span>
              <input id="build-engrave" value={engrave} onChange={(e) => setEngrave(e.target.value.slice(0, 20))} placeholder="Initials, a date, a word" className="field font-display text-lg" />
            </div>
            <div className="hair pt-6 flex flex-col gap-4">
              <div className="flex items-baseline justify-between">
                <span className="caps-sm text-muted">Your ring</span>
                <span className="font-display text-[1.75rem] tabular-nums">{formatPrice(total)}</span>
              </div>
              <ul className="text-sm text-ink-2 flex flex-col gap-1">
                <li>{s.name} setting · {tierName}</li>
                <li>{stoneLabel}, {origin === "natural" ? "GIA report" : "D–F, VVS, IGI report"}</li>
                <li>{METAL_LABEL[metal]} · size {size}</li>
                {engrave && <li>Engraved “{engrave}”</li>}
                <li>Made to order · about {origin === "natural" ? "3" : "2"} weeks</li>
              </ul>
              <button
                type="button"
                className="btn"
                onClick={() =>
                  add({
                    id: `build-ring|${setting}|${origin}|${carat}|${metal}|${size}|${engrave}`,
                    handle: "signal-solitaire",
                    name: `${s.name} ring`,
                    detail: `${stoneLabel} · ${METAL_LABEL[metal]} · size ${size}${engrave ? ` · “${engrave}”` : ""}`,
                    priceCents: total,
                    photo: setting === "signal" ? "ring-halo" : setting === "prism" ? "signet-b" : "ring-radiant",
                  })
                }
              >
                Add to bag
              </button>
              <Link href={`/appointments?${summary}`} className="btn btn-outline">
                See it in store first
              </Link>
              <p className="text-[0.75rem] text-muted leading-relaxed">
                {origin === "man-made"
                  ? "Origin: man-made (laboratory-grown) diamond, grown by chemical vapor deposition, as grown with no post-growth treatment. Not mined."
                  : "Natural diamond. Origin and report shown before purchase."}
              </p>
            </div>
          </StepBlock>
        )}
      </div>
    </div>
  );
}

function StepBlock({ title, lede, children }: { title: string; lede: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="h-section text-[1.75rem] md:text-[2rem]">{title}</h2>
        <p className="text-ink-2">{lede}</p>
      </div>
      {children}
    </div>
  );
}

function Next({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="btn btn-outline self-start">
      Continue
    </button>
  );
}

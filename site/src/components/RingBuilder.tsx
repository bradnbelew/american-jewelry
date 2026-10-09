"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { RingViewer } from "@/components/three/RingViewer";
import type { MetalKey, SettingKey } from "@/components/three/RingScene";
import { METAL_LABEL } from "@/lib/catalog/types";
import { formatPrice } from "@/lib/catalog/data";
import { Swatch } from "./PieceConfigurator";

/**
 * Ring builder prototype. Pricing is a model, not a quote:
 *   price = setting (by design × metal) + stone (by origin × carat) + options
 * The structure is what matters: it is what the Shopify cart handoff will carry as line-item properties.
 */

type Origin = "natural" | "man-made";
type Step = 1 | 2 | 3 | 4;

const SETTINGS: { key: SettingKey; name: string; tier: string; line: string; base: number }[] = [
  { key: "signal", name: "Signal", tier: "Solitaire", line: "One stone, open on four sides, knife-edge band.", base: 900 },
  { key: "shooting-star", name: "Shooting Star", tier: "Americana", line: "The star beside the stone, the tail down the shoulder.", base: 1400 },
  { key: "prism", name: "Prism", tier: "Americana", line: "A faceted band that meets the stone in a six-sided head.", base: 1300 },
];

const METALS: MetalKey[] = ["14k-yellow", "14k-white", "14k-rose", "18k-yellow", "platinum"];
const METAL_ADD: Record<MetalKey, number> = { "14k-yellow": 0, "14k-white": 0, "14k-rose": 0, "18k-yellow": 350, platinum: 900 };

const CARATS = [0.75, 1.0, 1.25, 1.5, 2.0, 2.5, 3.0];

// Illustrative stone price curves. Natural: steep; man made: flat and modest. Replace with live inventory later.
const stonePrice = (origin: Origin, ct: number) =>
  origin === "natural" ? Math.round(4200 * Math.pow(ct, 1.9)) : Math.round(950 + 650 * ct);

const SIZES = ["4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "10"];

export function RingBuilder() {
  const [step, setStep] = useState<Step>(1);
  const [setting, setSetting] = useState<SettingKey>("signal");
  const [origin, setOrigin] = useState<Origin>("man-made");
  const [carat, setCarat] = useState(1.5);
  const [metal, setMetal] = useState<MetalKey>("14k-yellow");
  const [size, setSize] = useState("6.5");
  const [engrave, setEngrave] = useState("");

  const s = SETTINGS.find((x) => x.key === setting)!;
  const total = useMemo(() => (s.base + METAL_ADD[metal] + stonePrice(origin, carat)) * 100, [s, metal, origin, carat]);
  const tierName = origin === "natural" ? "Americana" : "New American";

  const summary = new URLSearchParams({
    build: "ring",
    setting,
    stone: origin,
    carat: String(carat),
    metal,
    size,
    ...(engrave ? { engrave } : {}),
  }).toString();

  return (
    <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-start">
      {/* viewer */}
      <div className="lg:sticky lg:top-24 flex flex-col gap-4">
        <div className="aspect-square border border-line overflow-hidden">
          <RingViewer metal={metal} setting={setting} carat={carat} className="w-full h-full" autoRotate={step === 1} />
        </div>
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-navy pt-4">
          <div className="flex flex-col min-w-0">
            <span className="label text-muted">{tierName}</span>
            <span className="font-display text-2xl text-navy">
              {s.name} · {carat.toFixed(2)} ct {origin === "natural" ? "natural" : "man made"} diamond · {METAL_LABEL[metal]}
            </span>
          </div>
          <span className="font-display text-3xl text-navy whitespace-nowrap">{formatPrice(total)}</span>
        </div>
        <p className="text-xs text-muted">Prices are a working model for this preview. Stand-in 3D model until the design CAD is exported.</p>
      </div>

      {/* steps */}
      <div className="flex flex-col gap-8">
        <ol className="flex gap-6 border-b border-line pb-4">
          {(["Setting", "Stone", "Metal", "Fit"] as const).map((label, i) => {
            const n = (i + 1) as Step;
            return (
              <li key={label}>
                <button type="button" onClick={() => setStep(n)} className={`label ${step === n ? "text-navy" : "text-muted hover:text-navy"}`}>
                  <span className="font-display text-lg mr-2">{n}</span>
                  {label}
                </button>
              </li>
            );
          })}
        </ol>

        {step === 1 && (
          <StepBlock title="Choose the setting" lede="Every setting is a house design. The same setting takes a natural or a man made stone.">
            <div className="flex flex-col gap-3">
              {SETTINGS.map((x) => (
                <button
                  key={x.key}
                  type="button"
                  onClick={() => setSetting(x.key)}
                  aria-pressed={setting === x.key}
                  className={`text-left border p-5 flex items-start justify-between gap-6 transition-colors ${setting === x.key ? "border-navy bg-paper" : "border-line hover:border-gilt"}`}
                >
                  <span className="flex flex-col gap-1">
                    <span className="font-display text-2xl text-navy">{x.name}</span>
                    <span className="text-sm text-muted">{x.line}</span>
                  </span>
                  <span className="text-sm text-navy whitespace-nowrap">from {formatPrice(x.base * 100)}</span>
                </button>
              ))}
            </div>
            <Next onClick={() => setStep(2)} />
          </StepBlock>
        )}

        {step === 2 && (
          <StepBlock title="Choose the stone" lede="Natural puts this ring in Americana. Man made puts it in New American. Both are labeled plainly, always.">
            <div className="grid sm:grid-cols-2 gap-3">
              {(
                [
                  ["man-made", "Man made diamond", "D–F color, VVS, Ideal cut, IGI report, inscribed. The New American Standard."],
                  ["natural", "Natural diamond", "F–G color, VS clarity and up, GIA report. We hand-select the stone for you."],
                ] as const
              ).map(([key, name, line]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setOrigin(key)}
                  aria-pressed={origin === key}
                  className={`text-left border p-5 flex flex-col gap-2 transition-colors ${origin === key ? "border-navy bg-paper" : "border-line hover:border-gilt"}`}
                >
                  <span className="font-display text-2xl text-navy">{name}</span>
                  <span className="text-sm text-muted leading-relaxed">{line}</span>
                  <span className="text-sm text-navy mt-1">{carat.toFixed(2)} ct · {formatPrice(stonePrice(key, carat) * 100)}</span>
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <span className="label text-navy">Carat</span>
              <div className="flex flex-wrap gap-2">
                {CARATS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCarat(c)}
                    aria-pressed={carat === c}
                    className={`px-4 py-2 border text-sm ${carat === c ? "border-navy bg-navy text-cream" : "border-line bg-paper text-navy hover:border-gilt"}`}
                  >
                    {c.toFixed(2)}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted">Round brilliant shown. Oval, cushion, emerald and pear in store.</p>
            </div>
            <Next onClick={() => setStep(3)} />
          </StepBlock>
        )}

        {step === 3 && (
          <StepBlock title="Choose the metal" lede="Solid gold or platinum. Never plated, never hollow.">
            <div className="flex flex-col gap-2">
              {METALS.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMetal(m)}
                  aria-pressed={metal === m}
                  className={`flex items-center justify-between border px-5 py-4 transition-colors ${metal === m ? "border-navy bg-paper" : "border-line hover:border-gilt"}`}
                >
                  <span className="flex items-center gap-3 text-navy">
                    <Swatch metal={m} />
                    {METAL_LABEL[m]}
                  </span>
                  <span className="text-sm text-muted">{METAL_ADD[m] ? `+ ${formatPrice(METAL_ADD[m] * 100)}` : "included"}</span>
                </button>
              ))}
            </div>
            <Next onClick={() => setStep(4)} />
          </StepBlock>
        )}

        {step === 4 && (
          <StepBlock title="Fit and finish" lede="We size in store for free, and resize once at no charge within a year.">
            <div className="flex flex-col gap-3">
              <span className="label text-navy">Size</span>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((x) => (
                  <button
                    key={x}
                    type="button"
                    onClick={() => setSize(x)}
                    aria-pressed={size === x}
                    className={`px-3 py-1.5 min-w-11 border text-sm ${size === x ? "border-navy bg-navy text-cream" : "border-line bg-paper text-navy hover:border-gilt"}`}
                  >
                    {x}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <span className="label text-navy">Engraving</span>
              <input
                id="build-engrave"
                value={engrave}
                onChange={(e) => setEngrave(e.target.value.slice(0, 20))}
                placeholder="Initials, a date, a word"
                className="w-full bg-paper border border-line px-4 py-3 font-display text-xl text-navy placeholder:text-muted/60 focus:outline-none focus:border-gilt"
              />
            </div>
            <div className="border-t border-navy pt-6 flex flex-col gap-3">
              <div className="flex items-baseline justify-between">
                <span className="label text-muted">Your ring</span>
                <span className="font-display text-3xl text-navy">{formatPrice(total)}</span>
              </div>
              <ul className="text-sm text-ink/85 flex flex-col gap-1">
                <li>{s.name} setting · {tierName}</li>
                <li>
                  {carat.toFixed(2)} ct {origin === "natural" ? "natural diamond, GIA report" : "man made diamond, D–F, VVS, IGI report"}
                </li>
                <li>{METAL_LABEL[metal]} · size {size}</li>
                {engrave && <li>Engraved: “{engrave}”</li>}
                <li>Made to order at our bench · about {origin === "natural" ? "3" : "2"} weeks</li>
              </ul>
              <button type="button" className="btn opacity-60 cursor-not-allowed mt-2" aria-disabled title="Checkout opens with the launch">
                Add to bag · opens at launch
              </button>
              <Link href={`/appointments?${summary}`} className="btn btn-ghost">
                Reserve a fitting with this ring
              </Link>
              <p className="text-xs text-muted leading-relaxed">
                {origin === "man-made"
                  ? "Man made (laboratory-grown) diamond, grown by chemical vapor deposition, untreated after growth. Not mined."
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
        <h2 className="font-display text-3xl text-navy">{title}</h2>
        <p className="text-ink/80">{lede}</p>
      </div>
      {children}
    </div>
  );
}

function Next({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="btn self-start">
      Continue
    </button>
  );
}

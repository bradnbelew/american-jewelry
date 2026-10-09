"use client";

import Link from "next/link";
import { useCallback, useMemo, useRef, useState } from "react";
import type * as THREE from "three";
import { RingViewer } from "@/components/three/RingViewer";
import type { View } from "@/components/three/ParametricRing";
import { DesignDrawing } from "@/components/DesignDrawing";
import { Swatch } from "@/components/PieceConfigurator";
import { useBag } from "@/components/bag/BagProvider";
import {
  BIRTHSTONES,
  CARATS,
  HANDS,
  HAND_LABEL,
  METALS,
  METAL_LABEL,
  PROFILES,
  PROFILE_LABEL,
  PRONG_COUNTS,
  PRONG_LABEL,
  PRONG_STYLES,
  SETTINGS,
  SIZES,
  STONE_STANDARD,
  WIDTHS,
  leadTimeWeeks,
  normalize,
  ringName,
  stoneDiameterMm,
  type RingConfig,
} from "@/lib/builder/model";
import { price, usd } from "@/lib/builder/pricing";
import { encodeCode } from "@/lib/builder/code";
import { DESIGN_NOTES } from "@/lib/builder/notes";
import { MARKET_AS_OF } from "@/lib/builder/market";
import { TrueScale } from "./TrueScale";
import { ARView } from "./ARView";

type Step = 1 | 2 | 3 | 4 | 5;
const STEPS: { n: Step; label: string; view: View }[] = [
  { n: 1, label: "Setting", view: "hero" },
  { n: 2, label: "Stone", view: "stone" },
  { n: 3, label: "Metal", view: "side" },
  { n: 4, label: "Fit", view: "inside" },
  { n: 5, label: "Review", view: "review" },
];

export function RingBuilder({ initial }: { initial?: Partial<RingConfig> }) {
  const [c, setC] = useState<RingConfig>(() => normalize(initial ?? {}));
  const [step, setStep] = useState<Step>(1);
  const [scale, setScale] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const { add } = useBag();

  const set = useCallback(<K extends keyof RingConfig>(k: K, v: RingConfig[K]) => setC((prev) => normalize({ ...prev, [k]: v })), []);
  const p = useMemo(() => price(c), [c]);
  const code = useMemo(() => encodeCode(c), [c]);
  const name = ringName(c);
  const note = DESIGN_NOTES[c.setting];
  const weeks = leadTimeWeeks(c);
  const view = STEPS.find((s) => s.n === step)!.view;
  const onGroup = useCallback((g: THREE.Group | null) => {
    groupRef.current = g;
  }, []);

  const copy = async (text: string, what: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(what);
      setTimeout(() => setCopied(null), 1800);
    } catch {}
  };

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const shareUrl = `${origin}/design/${code}`;
  const hintUrl = `${origin}/design/${code}?hint=1`;

  return (
    <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-start">
      {/* The piece */}
      <div className="lg:sticky lg:top-32 flex flex-col gap-4">
        <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-ivory">
          <RingViewer config={c} view={view} autoRotate={step === 1} className="absolute inset-0" onGroup={onGroup} />
          <div className="absolute left-4 bottom-4 flex flex-wrap gap-2">
            <button type="button" className="pill bg-white/90" aria-pressed={scale} onClick={() => setScale((v) => !v)}>
              True scale
            </button>
            <ARView getGroup={() => groupRef.current} />
          </div>
        </div>
        {scale && (
          <div className="border border-hair p-5">
            <TrueScale config={c} />
          </div>
        )}
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 hair pt-4">
          <div className="flex flex-col min-w-0">
            <span className="caps-sm text-muted">{STONE_STANDARD[c.origin].tier}</span>
            <span className="font-display text-[1.375rem] leading-snug">{name}</span>
          </div>
          <span className="font-display text-[1.75rem] tabular-nums whitespace-nowrap">{usd(p.total)}</span>
        </div>
        <details className="acc border-b border-hair">
          <summary>Where the price comes from</summary>
          <dl className="pb-4 text-[0.8125rem] text-ink-2 grid grid-cols-[1fr_auto] gap-y-1.5 gap-x-6">
            <dt>
              Metal · {p.grams.toFixed(1)} g {METAL_LABEL[c.metal]}
            </dt>
            <dd className="tabular-nums text-right">{usd(p.metal)}</dd>
            <dt>Bench · {p.benchItems.join(", ").toLowerCase()}</dt>
            <dd className="tabular-nums text-right">{usd(p.bench)}</dd>
            <dt>
              Stone · {c.carat.toFixed(2)} ct {STONE_STANDARD[c.origin].short.toLowerCase()}, {STONE_STANDARD[c.origin].grade.split(" · ")[0]}
            </dt>
            <dd className="tabular-nums text-right">{usd(p.stone)}</dd>
            <dt className="text-muted pt-1">Working model for this preview; metal priced as of {MARKET_AS_OF}.</dt>
            <dd />
          </dl>
        </details>
      </div>

      {/* Decisions */}
      <div className="flex flex-col gap-8">
        <ol className="grid grid-cols-5 hair">
          {STEPS.map((s) => (
            <li key={s.n}>
              <button type="button" onClick={() => setStep(s.n)} className={`w-full h-12 caps-sm border-t -mt-px ${step === s.n ? "border-ink text-ink" : "border-transparent text-muted hover:text-ink"}`}>
                <span className="hidden sm:inline">{s.n}. </span>
                {s.label}
              </button>
            </li>
          ))}
        </ol>

        {step === 1 && (
          <Block title="Choose the setting" lede="Three house designs. Each was drawn once and is made here. Choose one, then make it yours.">
            <div className="grid grid-cols-3 gap-3">
              {SETTINGS.map((s) => (
                <button key={s} type="button" className="opt !flex-col !items-stretch !justify-start !px-3 !py-4 gap-2 !min-h-0" aria-pressed={c.setting === s} onClick={() => set("setting", s)}>
                  <DesignDrawing setting={s} className="w-full h-auto text-ink" />
                  <span className="font-display text-[1.125rem] text-center leading-tight">{DESIGN_NOTES[s].name}</span>
                </button>
              ))}
            </div>

            <div className="hair pt-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="caps-sm text-muted">From the designer</span>
                <p className="font-display text-[1.5rem] leading-snug">{note.line}</p>
              </div>
              <p className="text-ink-2 leading-relaxed">{note.why}</p>
              <div className="grid sm:grid-cols-2 gap-6 text-[0.8125rem]">
                <div>
                  <span className="caps-sm text-muted">The house decided</span>
                  <ul className="mt-2 flex flex-col gap-1 text-ink-2">
                    {note.fixed.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="caps-sm text-muted">Yours to decide</span>
                  <ul className="mt-2 flex flex-col gap-1 text-ink-2">
                    {note.yours.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="hair pt-6 flex flex-col gap-6">
              {c.setting !== "prism" && (
                <Field label="Band profile">
                  <div className="flex flex-wrap gap-2">
                    {PROFILES.map((x) => (
                      <button key={x} type="button" className="pill" aria-pressed={c.profile === x} onClick={() => set("profile", x)}>
                        {PROFILE_LABEL[x]}
                      </button>
                    ))}
                  </div>
                </Field>
              )}
              <Field label="Band width" hint={c.width >= 2.4 ? "Wider bands wear tighter; we size up a half" : undefined}>
                <div className="flex flex-wrap gap-2">
                  {WIDTHS.map((x) => (
                    <button key={x} type="button" className="pill" aria-pressed={c.width === x} onClick={() => set("width", x)}>
                      {x.toFixed(1)} mm
                    </button>
                  ))}
                </div>
              </Field>
              {c.setting !== "prism" && (
                <Field label="Prongs">
                  <div className="flex flex-wrap gap-2">
                    {PRONG_STYLES.map((x) => (
                      <button key={x} type="button" className="pill" aria-pressed={c.prongStyle === x} onClick={() => set("prongStyle", x)}>
                        {PRONG_LABEL[x]}
                      </button>
                    ))}
                    <span className="w-px bg-hair mx-1" aria-hidden />
                    {PRONG_COUNTS.map((x) => (
                      <button key={x} type="button" className="pill" aria-pressed={c.prongs === x} onClick={() => set("prongs", x)}>
                        {x}
                      </button>
                    ))}
                  </div>
                </Field>
              )}
              <div className="grid sm:grid-cols-2 gap-2">
                {c.setting !== "prism" && (
                  <button type="button" className="opt" aria-pressed={c.taper} onClick={() => set("taper", !c.taper)}>
                    <span className="flex flex-col">
                      <span>Tapered shank</span>
                      <span className="text-[0.75rem] text-muted">Thinner at the bottom, lighter on the hand</span>
                    </span>
                    <span className="text-[0.75rem] text-muted">{c.taper ? "On" : "Off"}</span>
                  </button>
                )}
                {c.setting !== "shooting-star" && (
                  <button type="button" className="opt" aria-pressed={c.halo} onClick={() => set("halo", !c.halo)}>
                    <span className="flex flex-col">
                      <span>Hidden halo</span>
                      <span className="text-[0.75rem] text-muted">Twelve stones beneath the center, seen from the side</span>
                    </span>
                    <span className="text-[0.75rem] text-muted">{c.halo ? "On" : "Off"}</span>
                  </button>
                )}
                {c.setting === "shooting-star" && (
                  <button type="button" className="opt" aria-pressed={c.tail === "long"} onClick={() => set("tail", c.tail === "long" ? "short" : "long")}>
                    <span className="flex flex-col">
                      <span>Long tail</span>
                      <span className="text-[0.75rem] text-muted">Five stones down the shoulder instead of three</span>
                    </span>
                    <span className="text-[0.75rem] text-muted">{c.tail === "long" ? "On" : "Off"}</span>
                  </button>
                )}
              </div>
            </div>
            <Next onClick={() => setStep(2)} />
          </Block>
        )}

        {step === 2 && (
          <Block title="Choose the stone" lede="One quality for each, at set sizes. Natural puts this ring in Americana; man-made puts it in New American. Both are labeled plainly, always.">
            <div className="grid sm:grid-cols-2 gap-2">
              {(["natural", "man-made"] as const).map((o) => (
                <button key={o} type="button" className="opt !min-h-0 !items-start py-4" aria-pressed={c.origin === o} onClick={() => set("origin", o)}>
                  <span className="flex flex-col gap-1.5">
                    <span className="font-display text-[1.25rem]">{STONE_STANDARD[o].short}</span>
                    <span className="text-[0.8125rem] text-muted leading-relaxed">{STONE_STANDARD[o].grade}</span>
                    <span className="text-[0.8125rem] text-muted">{STONE_STANDARD[o].report}</span>
                    <span className="caps-sm text-ink pt-1">{STONE_STANDARD[o].tier}</span>
                  </span>
                </button>
              ))}
            </div>
            <Field label="Carat" hint={`${stoneDiameterMm(c.carat).toFixed(1)} mm across`}>
              <div className="flex flex-wrap gap-2">
                {CARATS.map((x) => (
                  <button key={x} type="button" className="pill" aria-pressed={c.carat === x} onClick={() => set("carat", x)}>
                    {x.toFixed(2)}
                  </button>
                ))}
              </div>
            </Field>
            <p className="text-[0.8125rem] text-ink-2 leading-relaxed">
              Every stone we set meets the line above; we do not offer stones below it, and we do not sell by the carat. Round brilliant is shown. Oval, cushion, emerald and pear are chosen in the salon with the stone in your hand.
            </p>
            <Next onClick={() => setStep(3)} />
          </Block>
        )}

        {step === 3 && (
          <Block title="Choose the metal" lede="Solid gold or platinum, karat-marked. Never plated, never hollow. White gold is rhodium finished.">
            <div className="flex flex-col gap-2">
              {METALS.map((m) => (
                <button key={m} type="button" className="opt" aria-pressed={c.metal === m} onClick={() => set("metal", m)}>
                  <span className="flex items-center gap-3">
                    <Swatch metal={m} />
                    {METAL_LABEL[m]}
                  </span>
                  <span className="text-[0.8125rem] text-muted tabular-nums">{usd(price({ ...c, metal: m }).total)}</span>
                </button>
              ))}
            </div>
            <Next onClick={() => setStep(4)} />
          </Block>
        )}

        {step === 4 && (
          <Block title="Fit and finish" lede="We size in the store for free and resize once at no charge within sixty days. The engraving is cut by hand inside the band.">
            <Field label="Size" hint={c.width >= 2.4 ? "This width wears tighter; consider a half size up" : "Not sure? Choose your best guess; we confirm in store"}>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((x) => (
                  <button key={x} type="button" className="pill" aria-pressed={c.size === x} onClick={() => set("size", x)}>
                    {x}
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Engraving" hint="Up to 20 characters · included">
              <input id="build-engrave" value={c.engraving} onChange={(e) => set("engraving", e.target.value.slice(0, 20))} placeholder="Initials, a date, a word" className="field font-display text-lg" />
              <div className="flex flex-wrap gap-2 mt-2">
                {HANDS.map((h) => (
                  <button key={h} type="button" className="pill" aria-pressed={c.hand === h} onClick={() => set("hand", h)}>
                    {HAND_LABEL[h]}
                  </button>
                ))}
              </div>
              <p className="text-[0.75rem] text-muted">Turn the ring to read it inside the band.</p>
            </Field>
            {c.setting === "shooting-star" && (
              <Field label="A family stone" hint="Set in the first stone of the tail">
                <select id="birthstone" className="field" value={c.birthstone} onChange={(e) => set("birthstone", parseInt(e.target.value))}>
                  <option value={0}>None, diamonds all the way</option>
                  {BIRTHSTONES.map((b) => (
                    <option key={b.month} value={b.month}>
                      {b.name} · {b.stone}
                    </option>
                  ))}
                </select>
              </Field>
            )}
            <Next onClick={() => setStep(5)} label="Review the piece" />
          </Block>
        )}

        {step === 5 && (
          <Block title="Your ring" lede={`Made to order at our bench. About ${weeks} weeks. A numbered certificate and the Lifetime Care Program come with it.`}>
            <div className="hair pt-5 flex flex-col gap-3">
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-display text-[1.5rem] leading-snug">{name}</span>
                <span className="font-display text-[1.75rem] tabular-nums whitespace-nowrap">{usd(p.total)}</span>
              </div>
              <ul className="text-[0.875rem] text-ink-2 flex flex-col gap-1">
                <li>
                  {note.name} setting · {c.setting === "prism" ? "faceted band" : `${PROFILE_LABEL[c.profile].toLowerCase()} band`} · {c.width.toFixed(1)} mm{c.taper ? ", tapered" : ""}
                </li>
                {c.setting !== "prism" && (
                  <li>
                    {c.prongs} {PRONG_LABEL[c.prongStyle].toLowerCase()} prongs{c.halo ? " · hidden halo" : ""}
                  </li>
                )}
                {c.setting === "shooting-star" && (
                  <li>
                    Tail of {c.tail === "long" ? "five" : "three"} stones{c.birthstone ? ` · ${BIRTHSTONES[c.birthstone - 1].stone} for ${BIRTHSTONES[c.birthstone - 1].name}` : ""}
                  </li>
                )}
                <li>
                  {c.carat.toFixed(2)} ct {STONE_STANDARD[c.origin].short.toLowerCase()} · {STONE_STANDARD[c.origin].grade} · {STONE_STANDARD[c.origin].report}
                </li>
                <li>
                  {METAL_LABEL[c.metal]} · size {c.size}
                  {c.engraving ? ` · engraved “${c.engraving}” in ${HAND_LABEL[c.hand].toLowerCase()}` : ""}
                </li>
              </ul>
            </div>

            <div className="hair pt-5 flex flex-col gap-3">
              <div className="flex items-baseline justify-between gap-4">
                <span className="caps-sm">Design code</span>
                <span className="text-[0.75rem] text-muted">Bring it to either store; we pull it up at the counter.</span>
              </div>
              <div className="flex gap-2">
                <input id="design-code" readOnly value={code} className="field font-display text-lg tracking-[0.08em]" />
                <button type="button" className="btn btn-outline !px-4" onClick={() => copy(code, "code")}>
                  {copied === "code" ? "Copied" : "Copy"}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="button" className="pill" onClick={() => copy(shareUrl, "share")}>
                  {copied === "share" ? "Link copied" : "Copy a link to this ring"}
                </button>
                <button type="button" className="pill" onClick={() => copy(hintUrl, "hint")}>
                  {copied === "hint" ? "Hint copied" : "Send a hint (price hidden)"}
                </button>
                <Link href={`/design/${code}/certificate`} className="pill">
                  Preview the certificate
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <button
                type="button"
                className="btn"
                onClick={() =>
                  add({
                    id: `ring|${code}`,
                    handle: "signal-solitaire",
                    name: `${note.name} ring`,
                    detail: `${name} · size ${c.size} · ${code}`,
                    priceCents: p.total * 100,
                    photo: c.setting === "signal" ? "ring-halo" : c.setting === "prism" ? "signet-b" : "ring-radiant",
                  })
                }
              >
                Add to bag
              </button>
              <Link href={`/appointments?build=ring&code=${encodeURIComponent(code)}`} className="btn btn-outline">
                See it in store first
              </Link>
              <Link href={`/commission?code=${encodeURIComponent(code)}`} className="link self-start mt-2">
                Start a bespoke piece from this design
              </Link>
              <p className="text-[0.75rem] text-muted leading-relaxed">
                {c.origin === "man-made"
                  ? "Origin: man-made (laboratory-grown) diamond, grown by chemical vapor deposition, as grown with no post-growth treatment. Not mined."
                  : "Natural diamond with a GIA report; any treatment is disclosed before purchase."}{" "}
                Designed in Tennessee. Set and finished in our workshop. Diamonds and gold are imported.
              </p>
            </div>
          </Block>
        )}
      </div>
    </div>
  );
}

function Block({ title, lede, children }: { title: string; lede: string; children: React.ReactNode }) {
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

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-4 min-h-5">
        <span className="caps-sm">{label}</span>
        {hint && <span className="text-[0.75rem] text-muted text-right">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function Next({ onClick, label = "Continue" }: { onClick: () => void; label?: string }) {
  return (
    <button type="button" onClick={onClick} className="btn btn-outline w-full sm:w-auto sm:self-start">
      {label}
    </button>
  );
}

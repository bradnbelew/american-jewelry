"use client";

import Link from "next/link";
import { useCallback, useMemo, useRef, useState } from "react";
import type * as THREE from "three";
import { RingViewer } from "@/components/three/RingViewer";
import type { View } from "@/components/three/ParametricRing";
import { Pic } from "@/components/Pic";
import { Swatch } from "@/components/PieceConfigurator";
import { useBag } from "@/components/bag/BagProvider";
import { useSaved } from "@/components/saved/SavedProvider";
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
import { DESIGN_NOTES, SETTING_PHOTO } from "@/lib/builder/notes";
import { MARKET_AS_OF } from "@/lib/builder/market";

/** Which camera to show after a given decision, so the ring turns to show what just changed. */
const VIEW_FOR: Partial<Record<keyof RingConfig, View>> = {
  setting: "hero",
  origin: "stone",
  carat: "stone",
  halo: "side",
  metal: "side",
  profile: "side",
  width: "side",
  taper: "side",
  prongs: "stone",
  prongStyle: "stone",
  tail: "hero",
  birthstone: "hero",
  size: "inside",
  engraving: "inside",
  hand: "inside",
};

/**
 * The ring builder, as one calm page. The ring arrives complete, decided the way the house would decide it.
 * Three choices are in front of the visitor (setting, stone, metal); fit and engraving sit beneath; every
 * finer adjustment lives under one disclosure. Nothing moves when something is clicked.
 */
export function RingBuilder({ initial }: { initial?: Partial<RingConfig> }) {
  const [c, setC] = useState<RingConfig>(() => normalize(initial ?? {}));
  const [view, setView] = useState<View>("hero");
  const [idle, setIdle] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const { add } = useBag();
  const { has, toggle, ready } = useSaved();

  const set = useCallback(<K extends keyof RingConfig>(k: K, v: RingConfig[K]) => {
    setC((prev) => normalize({ ...prev, [k]: v }));
    const next = VIEW_FOR[k];
    if (next) {
      setView(next);
      setIdle(false);
    }
  }, []);

  const p = useMemo(() => price(c), [c]);
  const code = useMemo(() => encodeCode(c), [c]);
  const name = ringName(c);
  const note = DESIGN_NOTES[c.setting];
  const weeks = leadTimeWeeks(c);
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
  const savedId = `design:${code}`;
  const saved = ready && has(savedId);
  const photo = SETTING_PHOTO[c.setting];

  return (
    <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
      {/* The ring */}
      <div className="lg:col-span-7 lg:sticky lg:top-32 flex flex-col gap-5">
        <div className="relative aspect-[4/3] sm:aspect-square lg:aspect-[5/4] overflow-hidden bg-paper">
          <RingViewer config={c} view={view} autoRotate={idle} className="absolute inset-0" onGroup={onGroup} />
        </div>
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <div className="flex flex-col min-w-0">
            <span className="text-[0.8125rem] text-muted">{STONE_STANDARD[c.origin].tier}</span>
            <span className="h-item text-[1.375rem] md:text-[1.5rem]">{name}</span>
          </div>
          <span className="h-item text-[1.75rem] md:text-[2rem] tabular-nums whitespace-nowrap">{usd(p.total)}</span>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-[0.8125rem]">
          <details className="acc">
            <summary className="!min-h-0 !p-0 !text-[0.8125rem] !font-normal !tracking-normal !normal-case link-quiet h-6 gap-2">Where the price comes from</summary>
            <dl className="pt-4 pb-2 text-[0.8125rem] text-ink-2 grid grid-cols-[1fr_auto] gap-y-1.5 gap-x-6">
              <dt>
                Metal, {p.grams.toFixed(1)} g {METAL_LABEL[c.metal]}
              </dt>
              <dd className="tabular-nums text-right">{usd(p.metal)}</dd>
              <dt>Bench: {p.benchItems.join(", ").toLowerCase()}</dt>
              <dd className="tabular-nums text-right">{usd(p.bench)}</dd>
              <dt>
                Stone, {c.carat.toFixed(2)} ct {STONE_STANDARD[c.origin].short.toLowerCase()}
              </dt>
              <dd className="tabular-nums text-right">{usd(p.stone)}</dd>
              <dt className="text-muted pt-1">A working model for this preview. Metal priced as of {MARKET_AS_OF}.</dt>
              <dd />
            </dl>
          </details>
        </div>
      </div>

      {/* The decisions */}
      <div className="lg:col-span-5 flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <h2 className="h-section text-[1.75rem] md:text-[2.25rem]">Your ring, as we would make it.</h2>
          <p className="text-ink-2 leading-relaxed">
            Everything is already decided the way the house would decide it. Change the setting, the stone and the metal; leave the rest to us, or open it up below.
          </p>
        </div>

        {/* 1. Setting */}
        <Group label="The setting">
          <div className="grid grid-cols-3 gap-3" role="radiogroup" aria-label="Setting">
            {SETTINGS.map((s) => (
              <button key={s} type="button" role="radio" aria-checked={c.setting === s} className="opt !flex-col !items-stretch !justify-start !p-1.5 gap-2 !min-h-0" aria-pressed={c.setting === s} onClick={() => set("setting", s)}>
                <span className="relative block aspect-square overflow-hidden bg-paper">
                  <Pic k={SETTING_PHOTO[s]} sizes="(min-width: 1024px) 12vw, 30vw" />
                </span>
                <span className="h-item text-[1.0625rem] text-center pb-1">{DESIGN_NOTES[s].name}</span>
              </button>
            ))}
          </div>
          <p className="h-item text-[1.125rem] text-ink-2 italic min-h-[1.75rem]">{note.line}</p>
        </Group>

        {/* 2. Stone */}
        <Group label="The stone">
          <div className="grid sm:grid-cols-2 gap-2" role="radiogroup" aria-label="Stone origin">
            {(["natural", "man-made"] as const).map((o) => (
              <button key={o} type="button" role="radio" aria-checked={c.origin === o} className="opt !min-h-0 !items-start py-3.5" aria-pressed={c.origin === o} onClick={() => set("origin", o)}>
                <span className="flex flex-col gap-1">
                  <span className="h-item text-[1.125rem]">{STONE_STANDARD[o].short}</span>
                  <span className="text-[0.75rem] text-muted leading-snug">{STONE_STANDARD[o].grade}</span>
                  <span className="text-[0.75rem] text-muted leading-snug">{STONE_STANDARD[o].tier}</span>
                </span>
              </button>
            ))}
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-4 items-center">
            <label className="flex flex-col gap-2">
              <span className="text-[0.8125rem] text-muted">Carat, at set sizes</span>
              <select className="field" value={c.carat} onChange={(e) => set("carat", parseFloat(e.target.value) as RingConfig["carat"])} aria-label="Carat">
                {CARATS.map((x) => (
                  <option key={x} value={x}>
                    {x.toFixed(2)} ct · {stoneDiameterMm(x).toFixed(1)} mm across
                  </option>
                ))}
              </select>
            </label>
            <span className="text-[0.75rem] text-muted max-w-[11rem] leading-snug pt-6">{STONE_STANDARD[c.origin].report}.</span>
          </div>
        </Group>

        {/* 3. Metal */}
        <Group label="The metal">
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Metal">
            {METALS.map((m) => (
              <button key={m} type="button" role="radio" aria-checked={c.metal === m} className="pill gap-2" aria-pressed={c.metal === m} onClick={() => set("metal", m)}>
                <Swatch metal={m} />
                {METAL_LABEL[m]}
              </button>
            ))}
          </div>
        </Group>

        {/* Fit and engraving */}
        <Group label="Fit and engraving">
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="flex flex-col gap-2">
              <span className="text-[0.8125rem] text-muted">Size</span>
              <select className="field" value={c.size} onChange={(e) => set("size", e.target.value as RingConfig["size"])} aria-label="Ring size">
                {SIZES.map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-[0.8125rem] text-muted">Inside the band, up to 20 characters</span>
              <input value={c.engraving} onChange={(e) => set("engraving", e.target.value.slice(0, 20))} placeholder="Initials, a date, a word" className="field font-display text-lg" aria-label="Engraving" />
            </label>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.8125rem] text-muted min-h-6">
            <span>{c.width >= 2.4 ? "This width wears a little tighter; we usually size up a half." : "Not sure of the size? Choose your best guess. We size in store, free, and resize once at no charge."}</span>
          </div>
          {c.engraving && (
            <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Engraving hand">
              {HANDS.map((h) => (
                <button key={h} type="button" role="radio" aria-checked={c.hand === h} className="pill" aria-pressed={c.hand === h} onClick={() => set("hand", h)}>
                  {HAND_LABEL[h]}
                </button>
              ))}
            </div>
          )}
        </Group>

        {/* The jeweler's adjustments */}
        <details className="acc hair">
          <summary>The jeweler&apos;s adjustments</summary>
          <div className="flex flex-col gap-7 pt-2 pb-6">
            <p className="text-[0.8125rem] text-ink-2 leading-relaxed">
              These are set the way we would set them for this design. Change them if you have a preference; the price follows the metal and the work.
            </p>
            {c.setting !== "prism" && (
              <Field label="Band profile">
                {PROFILES.map((x) => (
                  <button key={x} type="button" className="pill" aria-pressed={c.profile === x} onClick={() => set("profile", x)}>
                    {PROFILE_LABEL[x]}
                  </button>
                ))}
              </Field>
            )}
            <Field label="Band width">
              {WIDTHS.map((x) => (
                <button key={x} type="button" className="pill" aria-pressed={c.width === x} onClick={() => set("width", x)}>
                  {x.toFixed(1)} mm
                </button>
              ))}
            </Field>
            {c.setting !== "prism" && (
              <Field label="Prongs">
                {PRONG_STYLES.map((x) => (
                  <button key={x} type="button" className="pill" aria-pressed={c.prongStyle === x} onClick={() => set("prongStyle", x)}>
                    {PRONG_LABEL[x]}
                  </button>
                ))}
                <span className="w-px bg-hair mx-1 self-stretch" aria-hidden />
                {PRONG_COUNTS.map((x) => (
                  <button key={x} type="button" className="pill" aria-pressed={c.prongs === x} onClick={() => set("prongs", x)}>
                    {x}
                  </button>
                ))}
              </Field>
            )}
            <div className="grid sm:grid-cols-2 gap-2">
              {c.setting !== "prism" && <Toggle on={c.taper} label="Tapered shank" hint="Thinner at the bottom, lighter on the hand" onClick={() => set("taper", !c.taper)} />}
              {c.setting !== "shooting-star" && <Toggle on={c.halo} label="Hidden halo" hint="Twelve stones beneath the center, seen from the side" onClick={() => set("halo", !c.halo)} />}
              {c.setting === "shooting-star" && <Toggle on={c.tail === "long"} label="Long tail" hint="Five stones down the shoulder instead of three" onClick={() => set("tail", c.tail === "long" ? "short" : "long")} />}
            </div>
            {c.setting === "shooting-star" && (
              <label className="flex flex-col gap-2">
                <span className="text-[0.8125rem] text-muted">A family stone, set in the first stone of the tail</span>
                <select className="field" value={c.birthstone} onChange={(e) => set("birthstone", parseInt(e.target.value))} aria-label="Birthstone">
                  <option value={0}>None, diamonds all the way</option>
                  {BIRTHSTONES.map((b) => (
                    <option key={b.month} value={b.month}>
                      {b.name}, {b.stone.toLowerCase()}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>
        </details>

        {/* Actions */}
        <div className="flex flex-col gap-4 hair pt-8">
          <p className="text-[0.875rem] text-ink-2 leading-relaxed">
            Made to order at our bench, about {weeks} weeks. A numbered certificate and the Lifetime Care Program come with it.
          </p>
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
                photo,
              })
            }
          >
            Add to bag
          </button>
          <Link href={`/appointments?build=ring&code=${encodeURIComponent(code)}`} className="btn btn-outline">
            See it in store first
          </Link>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[0.8125rem] pt-1">
            <button type="button" className="link-quiet text-left h-6 min-w-[3.5rem]" aria-pressed={saved} onClick={() => toggle({ id: savedId, href: `/design/${code}`, name: `${note.name} ring`, detail: name, photo })}>
              {saved ? "Saved" : "Save"}
            </button>
            <button type="button" className="link-quiet text-left h-6 min-w-[7.5rem]" onClick={() => copy(`${origin}/design/${code}`, "share")}>
              {copied === "share" ? "Link copied" : "Copy a link"}
            </button>
            <button type="button" className="link-quiet text-left h-6 min-w-[10rem]" onClick={() => copy(`${origin}/design/${code}?hint=1`, "hint")}>
              {copied === "hint" ? "Hint copied" : "Send a hint, price hidden"}
            </button>
            <Link href={`/design/${code}/certificate`} className="link-quiet h-6">
              The certificate
            </Link>
            <Link href={`/commission?code=${encodeURIComponent(code)}`} className="link-quiet h-6">
              Commission a variation
            </Link>
          </div>
          <div className="flex items-baseline gap-3 text-[0.8125rem]">
            <span className="text-muted">Design code</span>
            <button type="button" className="font-display text-[1.0625rem] tracking-[0.08em] text-left min-w-[11rem] h-6" onClick={() => copy(code, "code")} title="Copy the design code">
              {copied === "code" ? "Copied" : code}
            </button>
            <span className="text-muted">Bring it to either store.</span>
          </div>
          <p className="text-[0.75rem] text-muted leading-relaxed">
            {c.origin === "man-made"
              ? "Origin: man-made (laboratory-grown) diamond, grown by chemical vapor deposition, as grown with no post-growth treatment. Not mined."
              : "Natural diamond with a GIA report; any treatment is disclosed before purchase."}{" "}
            Designed in Tennessee. Set and finished in our workshop. Diamonds and gold are imported.
          </p>
        </div>
      </div>
    </div>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4 hair pt-6" aria-label={label}>
      <h3 className="h-item text-[1.25rem]">{label}</h3>
      {children}
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-[0.8125rem] text-muted">{label}</span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Toggle({ on, label, hint, onClick }: { on: boolean; label: string; hint: string; onClick: () => void }) {
  return (
    <button type="button" className="opt" aria-pressed={on} onClick={onClick}>
      <span className="flex flex-col">
        <span>{label}</span>
        <span className="text-[0.75rem] text-muted">{hint}</span>
      </span>
      <span className="text-[0.75rem] text-muted w-6 text-right">{on ? "On" : "Off"}</span>
    </button>
  );
}

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Form, Link } from "react-router";

import { Pic } from "~/components/Pic";
import { useSaved } from "~/components/saved/SavedProvider";
import type { View } from "~/components/three/ParametricRing.client";
import { RingViewer } from "~/components/three/RingViewer";
import { encodeCode } from "~/lib/builder/code";
import { MARKET_AS_OF } from "~/lib/builder/market";
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
} from "~/lib/builder/model";
import { DESIGN_NOTES, SETTING_PHOTO } from "~/lib/builder/notes";
import { price, usd } from "~/lib/builder/pricing";

/** Which camera to show after a decision, so the ring turns to show what just changed. */
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

const METAL_SWATCH: Record<RingConfig["metal"], string> = {
  "14k-yellow": "#d6b25e",
  "18k-yellow": "#dcb04c",
  "14k-rose": "#d9a083",
  "14k-white": "#e3e4e6",
  platinum: "#cfd2d6",
};

/**
 * The builder: the ring on the left, the decisions on the right. One label row per decision over one control.
 * Everything finer under one disclosure. Nothing moves when something is clicked.
 * "Add to bag" for a designed ring arrives with draft orders in phase 2; today the ring is saved or brought to the store.
 */
export function RingBuilder({ initial }: { initial?: Partial<RingConfig> }) {
  const [c, setC] = useState<RingConfig>(() => normalize(initial ?? {}));
  const [view, setView] = useState<View>("hero");
  const [idle, setIdle] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);
  const { has, toggle, ready } = useSaved();

  const engraveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const set = useCallback(<K extends keyof RingConfig>(k: K, v: RingConfig[K]) => {
    setC((prev) => normalize({ ...prev, [k]: v }));
    const next = VIEW_FOR[k];
    if (!next) return;
    setIdle(false);
    if (k === "engraving") {
      if (engraveTimer.current) clearTimeout(engraveTimer.current);
      engraveTimer.current = setTimeout(() => setView(next), 400);
      return;
    }
    setView(next);
  }, []);
  useEffect(() => () => {
    if (engraveTimer.current) clearTimeout(engraveTimer.current);
  }, []);

  const p = useMemo(() => price(c), [c]);
  const code = useMemo(() => encodeCode(c), [c]);
  const name = ringName(c);
  const note = DESIGN_NOTES[c.setting];
  const weeks = leadTimeWeeks(c);

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
    <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
      <div className="flex flex-col gap-4 lg:sticky lg:top-32 lg:col-span-7">
        <div className="relative aspect-[4/3] overflow-hidden bg-stone sm:aspect-square lg:aspect-[5/4]">
          <RingViewer config={c} view={view} autoRotate={idle} className="absolute inset-0" />
        </div>
        <details className="acc">
          <summary className="label h-6 !min-h-0 !justify-start gap-2 !py-0 !font-normal !tracking-normal !normal-case">Where the price comes from</summary>
          <dl className="num grid max-w-lg grid-cols-[1fr_auto] gap-x-6 gap-y-1 pt-3 pb-1 text-[0.8125rem] text-ink-2">
            <dt className="font-text">
              Metal, {p.grams.toFixed(1)} g {METAL_LABEL[c.metal]}
            </dt>
            <dd className="text-right">{usd(p.metal)}</dd>
            <dt className="font-text">Bench work</dt>
            <dd className="text-right">{usd(p.bench)}</dd>
            <dt className="font-text">
              Stone, {c.carat.toFixed(2)} ct {STONE_STANDARD[c.origin].short.toLowerCase()}
            </dt>
            <dd className="text-right">{usd(p.stone)}</dd>
            <dt className="label pt-1">A working model. Metal priced as of {MARKET_AS_OF}.</dt>
            <dd />
          </dl>
        </details>
      </div>

      <div className="flex flex-col gap-7 lg:col-span-5">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between gap-6">
            <h2 className="h-item text-[1.5rem] leading-snug md:text-[1.75rem]">{note.name}</h2>
            <span className="h-item num whitespace-nowrap text-[1.5rem] md:text-[1.75rem]">{usd(p.total)}</span>
          </div>
          <p className="font-text text-[0.9375rem] text-ink-2">
            {c.carat.toFixed(2)} ct {STONE_STANDARD[c.origin].short.toLowerCase()}, {METAL_LABEL[c.metal]}.
          </p>
          <p className="label">Made to order, about {weeks} weeks. Price before sales tax.</p>
        </div>

        <Row label="Setting" value={note.name}>
          <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Setting">
            {SETTINGS.map((s) => (
              <button key={s} type="button" role="radio" aria-checked={c.setting === s} className="opt !min-h-0 !flex-col !items-stretch !gap-0 !p-1" aria-pressed={c.setting === s} onClick={() => set("setting", s)} title={DESIGN_NOTES[s].name}>
                <span className="relative block aspect-[5/4] overflow-hidden bg-bone">
                  <Pic k={SETTING_PHOTO[s]} sizes="(min-width: 1024px) 11vw, 30vw" />
                </span>
                <span className="flex h-7 items-center justify-center text-[0.75rem] leading-none">{DESIGN_NOTES[s].name}</span>
              </button>
            ))}
          </div>
        </Row>

        <Row label="Stone" value={`${STONE_STANDARD[c.origin].short}, ${c.carat.toFixed(2)} ct`}>
          <div className="grid grid-cols-[1fr_1fr_7.5rem] gap-2" role="radiogroup" aria-label="Stone">
            {(["natural", "man-made"] as const).map((o) => (
              <button key={o} type="button" role="radio" aria-checked={c.origin === o} className="opt !h-12 !min-h-0 !justify-center !px-2 text-[0.8125rem]" aria-pressed={c.origin === o} onClick={() => set("origin", o)} title={STONE_STANDARD[o].grade}>
                {STONE_STANDARD[o].short}
              </button>
            ))}
            <select className="field !h-12 text-[0.8125rem]" value={c.carat} onChange={(e) => set("carat", parseFloat(e.target.value) as RingConfig["carat"])} aria-label="Carat">
              {CARATS.map((x) => (
                <option key={x} value={x}>
                  {x.toFixed(2)} ct
                </option>
              ))}
            </select>
          </div>
          <p className="label min-h-[1.125rem]">
            {STONE_STANDARD[c.origin].grade}. {STONE_STANDARD[c.origin].report}. {stoneDiameterMm(c.carat).toFixed(1)} mm across.
          </p>
        </Row>

        <Row label="Metal" value={METAL_LABEL[c.metal]}>
          <div className="flex gap-2" role="radiogroup" aria-label="Metal">
            {METALS.map((m) => (
              <button key={m} type="button" role="radio" aria-checked={c.metal === m} aria-label={METAL_LABEL[m]} title={METAL_LABEL[m]} className="swatch" aria-pressed={c.metal === m} onClick={() => set("metal", m)}>
                <span className="swatch-dot" style={{ background: METAL_SWATCH[m] }} />
              </button>
            ))}
          </div>
        </Row>

        <Row label="Fit" value={`Size ${c.size}${c.engraving ? ", engraved" : ""}`}>
          <div className="grid grid-cols-[7.5rem_1fr] gap-2">
            <select className="field !h-12 text-[0.8125rem]" value={c.size} onChange={(e) => set("size", e.target.value as RingConfig["size"])} aria-label="Ring size">
              {SIZES.map((x) => (
                <option key={x} value={x}>
                  Size {x}
                </option>
              ))}
            </select>
            <input value={c.engraving} onChange={(e) => set("engraving", e.target.value.slice(0, 20))} placeholder="Engraving, up to 20 characters" className="field font-display !h-12 text-[1rem]" aria-label="Engraving" />
          </div>
          <div className="flex min-h-7 items-center justify-between gap-4">
            <p className="label">{c.width >= 2.4 ? "This width wears a little tighter; we usually size up a half." : "We size in store and resize once at no charge."}</p>
            {c.engraving && (
              <div className="flex shrink-0 gap-1" role="radiogroup" aria-label="Engraving hand">
                {HANDS.map((h) => (
                  <button key={h} type="button" role="radio" aria-checked={c.hand === h} className="pill !h-7 !min-w-0 !px-2 text-[0.6875rem]" aria-pressed={c.hand === h} onClick={() => set("hand", h)}>
                    {HAND_LABEL[h]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </Row>

        <details className="acc hair">
          <summary>The jeweler&apos;s adjustments</summary>
          <div className="flex flex-col gap-5 pt-1 pb-5">
            <p className="label">Set the way we would set them for this design. Change them if you have a preference.</p>
            {c.setting !== "prism" && (
              <Field label="Band profile">
                {PROFILES.map((x) => (
                  <button key={x} type="button" className="pill !h-9 text-[0.75rem]" aria-pressed={c.profile === x} onClick={() => set("profile", x)}>
                    {PROFILE_LABEL[x]}
                  </button>
                ))}
              </Field>
            )}
            <Field label="Band width">
              {WIDTHS.map((x) => (
                <button key={x} type="button" className="pill !h-9 text-[0.75rem]" aria-pressed={c.width === x} onClick={() => set("width", x)}>
                  {x.toFixed(1)} mm
                </button>
              ))}
            </Field>
            {c.setting !== "prism" && (
              <Field label="Prongs">
                {PRONG_STYLES.map((x) => (
                  <button key={x} type="button" className="pill !h-9 text-[0.75rem]" aria-pressed={c.prongStyle === x} onClick={() => set("prongStyle", x)}>
                    {PRONG_LABEL[x]}
                  </button>
                ))}
                <span className="mx-1 w-px self-stretch bg-hair" aria-hidden />
                {PRONG_COUNTS.map((x) => (
                  <button key={x} type="button" className="pill !h-9 text-[0.75rem]" aria-pressed={c.prongs === x} onClick={() => set("prongs", x)}>
                    {x}
                  </button>
                ))}
              </Field>
            )}
            <div className="grid gap-2 sm:grid-cols-2">
              {c.setting !== "prism" && <Toggle on={c.taper} label="Tapered shank" hint="Thinner at the bottom" onClick={() => set("taper", !c.taper)} />}
              {c.setting !== "shooting-star" && <Toggle on={c.halo} label="Hidden halo" hint="Twelve stones beneath the center" onClick={() => set("halo", !c.halo)} />}
              {c.setting === "shooting-star" && <Toggle on={c.tail === "long"} label="Long tail" hint="Five stones instead of three" onClick={() => set("tail", c.tail === "long" ? "short" : "long")} />}
            </div>
            {c.setting === "shooting-star" && (
              <Field label="A family stone in the first stone of the tail" block>
                <select className="field !h-12 text-[0.8125rem]" value={c.birthstone} onChange={(e) => set("birthstone", parseInt(e.target.value))} aria-label="Birthstone">
                  <option value={0}>None, diamonds all the way</option>
                  {BIRTHSTONES.map((b) => (
                    <option key={b.month} value={b.month}>
                      {b.name}, {b.stone.toLowerCase()}
                    </option>
                  ))}
                </select>
              </Field>
            )}
          </div>
        </details>

        <div className="flex flex-col gap-3">
          <Form method="post" action={`/design/${encodeURIComponent(code)}`}>
            <input type="hidden" name="intent" value="request" />
            <input type="hidden" name="code" value={code} />
            <button type="submit" className="btn w-full">
              Request this ring
            </button>
          </Form>
          <Link to={`/appointments?build=ring&code=${encodeURIComponent(code)}`} className="btn btn-outline">
            See it in store first
          </Link>
          <div className="grid grid-cols-3 gap-2 text-[0.75rem]">
            <button type="button" className="quiet" aria-pressed={saved} onClick={() => toggle({ id: savedId, href: `/design/${code}`, name: `${note.name} ring`, detail: name, photo })}>
              {saved ? "Saved" : "Save"}
            </button>
            <button type="button" className="quiet" onClick={() => copy(`${origin}/design/${code}`, "share")}>
              {copied === "share" ? "Copied" : "Copy link"}
            </button>
            <button type="button" className="quiet" onClick={() => copy(`${origin}/design/${code}?hint=1`, "hint")}>
              {copied === "hint" ? "Copied" : "Send a hint"}
            </button>
          </div>
          <div className="flex items-baseline justify-between gap-3 pt-1 text-[0.75rem] text-muted">
            <span>
              Design code{" "}
              <button type="button" className="font-display min-w-[8.5rem] text-left text-[1rem] tracking-[0.06em] text-ink" onClick={() => copy(code, "code")} title="Copy the design code">
                {copied === "code" ? "Copied" : code}
              </button>
            </span>
            <Link to={`/design/${encodeURIComponent(code)}/certificate`} className="link-quiet text-ink">
              The certificate
            </Link>
          </div>
          <p className="label leading-relaxed">
            {c.origin === "man-made" ? "Man-made diamond (laboratory-grown), as grown, not mined." : "Natural diamond with a GIA report; any treatment is disclosed before purchase."} Designed in Tennessee. Set and finished in our workshop. Diamonds and gold are imported.
          </p>
        </div>
      </div>
    </div>
  );
}

/** A decision: its name on the left, what is chosen on the right, the control beneath. The row never changes height. */
function Row({ label, value, children }: { label: string; value: string; children: ReactNode }) {
  return (
    <section className="hair flex flex-col gap-2.5 pt-5" aria-label={label}>
      <div className="flex h-5 items-baseline justify-between gap-4 text-[0.8125rem]">
        <span className="text-ink">{label}</span>
        <span className="truncate text-muted">{value}</span>
      </div>
      {children}
    </section>
  );
}

function Field({ label, children, block = false }: { label: string; children: ReactNode; block?: boolean }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="label">{label}</span>
      {block ? children : <div className="flex flex-wrap gap-1.5">{children}</div>}
    </div>
  );
}

function Toggle({ on, label, hint, onClick }: { on: boolean; label: string; hint: string; onClick: () => void }) {
  return (
    <button type="button" className="opt !h-12 !min-h-0 text-[0.8125rem]" aria-pressed={on} onClick={onClick}>
      <span className="flex flex-col leading-tight">
        <span>{label}</span>
        <span className="text-[0.6875rem] text-muted">{hint}</span>
      </span>
      <span className="w-6 text-right text-[0.6875rem] text-muted">{on ? "On" : "Off"}</span>
    </button>
  );
}

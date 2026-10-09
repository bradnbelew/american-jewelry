"use client";

import Link from "next/link";
import { useMemo } from "react";
import { RingViewer } from "@/components/three/RingViewer";
import { BIRTHSTONES, HAND_LABEL, METAL_LABEL, PROFILE_LABEL, PRONG_LABEL, STONE_STANDARD, leadTimeWeeks, type RingConfig } from "@/lib/builder/model";
import { DESIGN_NOTES } from "@/lib/builder/notes";
import { price, usd } from "@/lib/builder/pricing";

export function DesignView({ config: c, code, hint }: { config: RingConfig; code: string; hint: boolean }) {
  const p = useMemo(() => price(c), [c]);
  const note = DESIGN_NOTES[c.setting];
  return (
    <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-start">
      <div className="relative aspect-square overflow-hidden bg-ivory">
        <RingViewer config={c} view="review" autoRotate className="absolute inset-0" />
      </div>
      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-2">
          <span className="caps-sm text-muted">{STONE_STANDARD[c.origin].tier}</span>
          <h2 className="font-display text-[1.75rem] leading-snug">{note.name}</h2>
          <p className="text-ink-2">{note.line}</p>
        </div>
        <dl className="hair pt-4 grid grid-cols-[7rem_1fr] gap-y-2 gap-x-4 text-[0.875rem]">
          <dt className="text-muted">Band</dt>
          <dd className="text-ink-2">
            {c.setting === "prism" ? "Faceted" : PROFILE_LABEL[c.profile]} · {c.width.toFixed(1)} mm{c.taper ? " · tapered" : ""}
          </dd>
          {c.setting !== "prism" && (
            <>
              <dt className="text-muted">Head</dt>
              <dd className="text-ink-2">
                {c.prongs} {PRONG_LABEL[c.prongStyle].toLowerCase()} prongs{c.halo ? " · hidden halo" : ""}
              </dd>
            </>
          )}
          {c.setting === "shooting-star" && (
            <>
              <dt className="text-muted">Tail</dt>
              <dd className="text-ink-2">
                {c.tail === "long" ? "Five" : "Three"} stones{c.birthstone ? ` · ${BIRTHSTONES[c.birthstone - 1].stone}` : ""}
              </dd>
            </>
          )}
          <dt className="text-muted">Stone</dt>
          <dd className="text-ink-2">
            {c.carat.toFixed(2)} ct {STONE_STANDARD[c.origin].short.toLowerCase()} · {STONE_STANDARD[c.origin].grade}
          </dd>
          <dt className="text-muted">Metal</dt>
          <dd className="text-ink-2">
            {METAL_LABEL[c.metal]} · size {c.size}
          </dd>
          {c.engraving && (
            <>
              <dt className="text-muted">Engraving</dt>
              <dd className="text-ink-2">
                “{c.engraving}” · {HAND_LABEL[c.hand].toLowerCase()}
              </dd>
            </>
          )}
          <dt className="text-muted">Lead time</dt>
          <dd className="text-ink-2">About {leadTimeWeeks(c)} weeks</dd>
          <dt className="text-muted">Code</dt>
          <dd className="font-display text-[1.125rem] tracking-[0.06em]">{code}</dd>
        </dl>
        {!hint && (
          <div className="flex items-baseline justify-between hair pt-4">
            <span className="caps-sm text-muted">Price</span>
            <span className="font-display text-[1.75rem] tabular-nums">{usd(p.total)}</span>
          </div>
        )}
        <div className="flex flex-col gap-3">
          {hint ? (
            <Link href={`/appointments?build=ring&code=${encodeURIComponent(code)}`} className="btn">
              See it in the store
            </Link>
          ) : (
            <>
              <Link href={`/build/ring?code=${encodeURIComponent(code)}`} className="btn">
                Make it mine
              </Link>
              <Link href={`/appointments?build=ring&code=${encodeURIComponent(code)}`} className="btn btn-outline">
                See it in store first
              </Link>
            </>
          )}
          <Link href={`/design/${encodeURIComponent(code)}/certificate`} className="link self-start mt-1">
            The certificate
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { sizeToInnerDiameterMm, stoneDiameterMm, type RingConfig } from "@/lib/builder/model";

const DEFAULT_PX_PER_MM = 96 / 25.4;
const CARD_MM = 85.6;
const QUARTER_MM = 24.26;
const KEY = "aj-px-per-mm";

/** The ring at real size on screen, after a one-time calibration against a bank card. */
export function TrueScale({ config }: { config: RingConfig }) {
  const [pxPerMm, setPxPerMm] = useState(DEFAULT_PX_PER_MM);
  const [calibrating, setCalibrating] = useState(false);

  useEffect(() => {
    try {
      const v = parseFloat(localStorage.getItem(KEY) ?? "");
      if (v > 1 && v < 20) setPxPerMm(v);
    } catch {}
  }, []);
  const save = (v: number) => {
    setPxPerMm(v);
    try {
      localStorage.setItem(KEY, String(v));
    } catch {}
  };

  const inner = sizeToInnerDiameterMm(config.size);
  const stone = stoneDiameterMm(config.carat);
  const mm = (v: number) => v * pxPerMm;
  const W = 300;
  const H = 230;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-baseline justify-between gap-4">
        <span className="caps-sm">True scale</span>
        <button type="button" className="text-[0.75rem] underline underline-offset-4 text-muted hover:text-ink" onClick={() => setCalibrating((v) => !v)}>
          {calibrating ? "Done" : "Calibrate to your screen"}
        </button>
      </div>

      {calibrating ? (
        <div className="flex flex-col gap-3">
          <p className="text-[0.8125rem] text-ink-2">Hold a bank card against the screen and move the slider until the outline matches its width.</p>
          <div className="relative h-24 bg-ivory overflow-hidden">
            <div className="absolute left-4 top-4 border border-ink rounded-[4px]" style={{ width: mm(CARD_MM), height: mm(53.98) }} />
          </div>
          <input id="calibrate" type="range" min={2.5} max={8} step={0.02} value={pxPerMm} onChange={(e) => save(parseFloat(e.target.value))} className="w-full" />
        </div>
      ) : (
        <div className="bg-ivory overflow-x-auto">
          <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="block mx-auto" role="img" aria-label="Ring at real size">
            {/* finger */}
            <rect x={(W - mm(inner)) / 2} y={40} width={mm(inner)} height={H - 40} rx={mm(inner) / 2.2} fill="#ead9c8" />
            {/* band seen across the finger */}
            <rect x={(W - mm(inner)) / 2 - mm(1.2)} y={96} width={mm(inner) + mm(2.4)} height={mm(config.width)} fill="#c9a961" />
            {/* stone */}
            <circle cx={W / 2} cy={96 + mm(config.width) / 2} r={mm(stone) / 2} fill="#ffffff" stroke="#9a9a9a" strokeWidth="1" />
            <circle cx={W / 2} cy={96 + mm(config.width) / 2} r={mm(stone) * 0.28} fill="none" stroke="#bdbdbd" strokeWidth="0.8" />
            {/* quarter for reference */}
            <circle cx={W - 34} cy={60} r={mm(QUARTER_MM) / 2} fill="#d9d9d9" stroke="#9a9a9a" strokeWidth="1" />
            <text x={W - 34} y={64} textAnchor="middle" fontSize="8" fill="#555">
              25¢
            </text>
            {/* labels */}
            <text x={W / 2} y={22} textAnchor="middle" fontSize="11" fill="#555">
              {stone.toFixed(1)} mm stone · {config.width.toFixed(1)} mm band · size {config.size}
            </text>
          </svg>
        </div>
      )}
      <p className="text-[0.75rem] text-muted">Shown at {pxPerMm === DEFAULT_PX_PER_MM ? "an assumed" : "your calibrated"} screen scale. A quarter is drawn for reference.</p>
    </div>
  );
}

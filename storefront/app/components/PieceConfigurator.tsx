import { useState } from "react";
import { Link, useSearchParams } from "react-router";

import { formatPrice } from "~/lib/catalog/data";
import { PIECE_PHOTOS } from "~/lib/catalog/photos";
import type { Metal, Piece, Version } from "~/lib/catalog/types";
import { METAL_LABEL } from "~/lib/catalog/types";
import { explicitSize } from "~/lib/piece-selection";

import { SaveButton } from "./saved/SaveButton";

const METAL_SWATCH: Record<Metal, string> = {
  "14k-yellow": "#d6b25e",
  "18k-yellow": "#dcb04c",
  "14k-rose": "#d9a083",
  "14k-white": "#e3e4e6",
  platinum: "#cfd2d6",
};

export const metalTone = (m: Metal): "yellow" | "white" | "rose" => (m === "14k-rose" ? "rose" : m === "14k-white" || m === "platinum" ? "white" : "yellow");

/**
 * The buy column. Price once, the stone standard in one line, then one control per decision.
 * "Add to bag" arrives with the Shopify link (phase 2); until then the bag is a preview.
 */
export function PieceConfigurator({ piece, onMetal }: { piece: Piece; onMetal?: (m: Metal) => void }) {
  const [params] = useSearchParams();
  const [version, setVersion] = useState<Version>(() => piece.versions.find((v) => v.name === params.get('Version')) ?? piece.versions[0]);
  const [metal, setMetalState] = useState<Metal>(() => piece.metals.find((m) => METAL_LABEL[m] === params.get('Metal')) ?? piece.metals[0]);
  const [size, setSize] = useState(() => explicitSize(piece.sizes, params.get("size")));
  const [engrave, setEngrave] = useState(() => (params.get("engraving") ?? "").slice(0, 20));
  const setMetal = (m: Metal) => {
    setMetalState(m);
    onMetal?.(m);
  };

  const price = version.priceCents;
  const manMade = version.origin === "man-made";
  const query = new URLSearchParams({ piece: piece.handle, version: version.key, metal, ...(size ? { size } : {}), ...(engrave ? {engraving: engrave} : {}) }).toString();
  const photo = (PIECE_PHOTOS[piece.handle] ?? ["hero-box"])[0];
  const savedQuery = new URLSearchParams({Version:version.name, Metal:METAL_LABEL[metal], ...(size ? {size} : {}), ...(engrave ? {engraving: engrave} : {})});

  return (
    <div className="piece-choice-form flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <span className="font-display num text-[1.75rem] leading-none">{price === null ? "Price on request" : formatPrice(price)}</span>
        <span className="piece-stone-description font-text text-base text-ink-2">
          {manMade ? "Lab-grown diamond (laboratory-grown), D to F, VVS, IGI report." : (version.stones ?? "Solid 14k or 18k gold, karat-marked.")}
        </span>
        <span className="label">
          {piece.leadTime}
          {price !== null ? ". Price before sales tax." : ""}
        </span>
      </div>

      <div className="buy-bar fixed inset-x-0 bottom-0 z-30 border-t border-hair bg-paper lg:hidden">
        <div className="wrap flex items-center justify-between gap-4 py-3"><span className="num">{price === null ? "Price on request" : formatPrice(price)}</span><Link to={`/appointments?${query}`} className="btn">Request a viewing</Link></div>
      </div>

      {piece.versions.length > 1 && (
        <Field label="Stone">
          <div className="grid grid-cols-3 gap-2">
            {piece.versions.map((v) => (
              <button key={v.key + v.name} type="button" className="opt flex-col justify-center text-center" aria-pressed={v === version} onClick={() => setVersion(v)}>
                <span>{v.name}</span>
                <span className="num text-[0.8125rem] text-ink-2">{v.priceCents === null ? "On request" : formatPrice(v.priceCents)}</span>
              </button>
            ))}
          </div>
        </Field>
      )}

      <Field label="Metal">
        <div className="metal-options" role="group" aria-label="Metal">
          {piece.metals.map((m) => (
            <button key={m} type="button" aria-label={METAL_LABEL[m]} title={METAL_LABEL[m]} className="metal-option" aria-pressed={m === metal} onClick={() => setMetal(m)}>
              <span className="swatch-dot" style={{ background: METAL_SWATCH[m] }} /><span>{METAL_LABEL[m].replace(" gold", "")}</span>
            </button>
          ))}
        </div>
      </Field>

      <div className="piece-size-engraving">{piece.sizes && (
        <Field label="Size" hint={<Link to="/care#sizing" className="link-quiet">Sizing help</Link>}>
          <select id={`size-${piece.handle}`} className="field" value={size} onChange={(e) => setSize(e.target.value)} aria-label="Ring size">
            <option value="" disabled>Choose your size</option>
            {piece.sizes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
      )}

      {piece.engraving && (
        <details className="engraving-option" open={Boolean(params.get("engraving"))}><summary>Add engraving <span className="label">Optional</span></summary><Field label="Engraving" hint="20 characters">
          <input id={`engrave-${piece.handle}`} value={engrave} onChange={(e) => setEngrave(e.target.value.slice(0, 20))} placeholder="Initials, a date, a word" className="field font-display text-lg" />
        </Field></details>
      )}

      </div><div className="flex flex-col gap-3 pt-1">
        {price === null ? (
          <Link to={`/appointments?${query}`} className="btn">
            Request a private viewing
          </Link>
        ) : (
          <>
            <p className="label">Contact the store to confirm price and availability.</p>
            <div className="flex items-center gap-6">
              <Link to={`/appointments?${query}`} className="btn flex-1">
                Request a viewing
              </Link>
              <SaveButton className="quiet-save" item={{ id: piece.handle, href: `/pieces/${piece.handle}?${savedQuery}`, name: piece.name, detail: [version.name, METAL_LABEL[metal], size ? `Size ${size}` : null].filter(Boolean).join(", "), photo }} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex h-5 items-baseline justify-between gap-4 text-[0.8125rem]">
        <span className="text-ink">{label}</span>
        {hint && <span className="text-muted">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

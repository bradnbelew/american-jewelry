import { useState } from "react";
import { Link } from "react-router";

import { formatPrice } from "~/lib/catalog/data";
import { PIECE_PHOTOS } from "~/lib/catalog/photos";
import type { Metal, Piece, Version } from "~/lib/catalog/types";
import { METAL_LABEL } from "~/lib/catalog/types";

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
  const [version, setVersion] = useState<Version>(piece.versions[0]);
  const [metal, setMetalState] = useState<Metal>(piece.metals[0]);
  const [size, setSize] = useState<string>(piece.sizes?.[6] ?? piece.sizes?.[0] ?? "");
  const [engrave, setEngrave] = useState("");
  const setMetal = (m: Metal) => {
    setMetalState(m);
    onMetal?.(m);
  };

  const price = version.priceCents;
  const manMade = version.origin === "man-made";
  const query = new URLSearchParams({ piece: piece.handle, version: version.key, metal, ...(size ? { size } : {}) }).toString();
  const photo = (PIECE_PHOTOS[piece.handle] ?? ["hero-box"])[0];

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-1.5">
        <span className="font-display num text-[1.75rem]">{price === null ? "Price on request" : formatPrice(price)}</span>
        <span className="font-text text-[0.9375rem] text-ink-2">
          {manMade ? "Man-made diamond (laboratory-grown), D to F, VVS, IGI report." : (version.stones ?? "Solid 14k or 18k gold, karat-marked.")}
        </span>
        <span className="label">
          {piece.leadTime}
          {price !== null ? ". Price before sales tax." : ""}
        </span>
      </div>

      {piece.versions.length > 1 && (
        <Field label="Version">
          <div className="flex flex-col gap-2">
            {piece.versions.map((v) => (
              <button key={v.key + v.name} type="button" className="opt" aria-pressed={v === version} onClick={() => setVersion(v)}>
                <span>{v.name}</span>
                <span className="num text-[0.8125rem] text-ink-2">{v.priceCents === null ? "On request" : formatPrice(v.priceCents)}</span>
              </button>
            ))}
          </div>
        </Field>
      )}

      <Field label="Metal" hint={METAL_LABEL[metal]}>
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Metal">
          {piece.metals.map((m) => (
            <button key={m} type="button" role="radio" aria-checked={m === metal} aria-label={METAL_LABEL[m]} title={METAL_LABEL[m]} className="swatch" aria-pressed={m === metal} onClick={() => setMetal(m)}>
              <span className="swatch-dot" style={{ background: METAL_SWATCH[m] }} />
            </button>
          ))}
        </div>
      </Field>

      {piece.sizes && (
        <Field label="Size" hint={<Link to="/care#sizing" className="link-quiet">Sizing help</Link>}>
          <select id={`size-${piece.handle}`} className="field" value={size} onChange={(e) => setSize(e.target.value)} aria-label="Ring size">
            {piece.sizes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
      )}

      {piece.engraving && (
        <Field label="Engraving" hint="20 characters, included">
          <input id={`engrave-${piece.handle}`} value={engrave} onChange={(e) => setEngrave(e.target.value.slice(0, 20))} placeholder="Initials, a date, a word" className="field font-display text-lg" />
        </Field>
      )}

      <div className="flex flex-col gap-3 pt-1">
        {price === null ? (
          <Link to={`/appointments?${query}`} className="btn">
            Request a private viewing
          </Link>
        ) : (
          <>
            <button type="button" className="btn" disabled title="Checkout opens when the store is connected">
              Add to bag
            </button>
            <div className="grid grid-cols-2 gap-3">
              <Link to={`/appointments?${query}`} className="btn btn-outline">
                See it in store
              </Link>
              <SaveButton item={{ id: piece.handle, href: `/pieces/${piece.handle}`, name: piece.name, detail: version.name, photo }} />
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

"use client";

import Link from "next/link";
import { useState } from "react";
import type { Metal, Piece, Version } from "@/lib/catalog/types";
import { METAL_LABEL } from "@/lib/catalog/types";
import { formatPrice } from "@/lib/catalog/data";
import { PIECE_PHOTOS } from "@/lib/catalog/photos";
import { useBag } from "./bag/BagProvider";
import { SaveButton } from "./saved/SaveButton";

export function PieceConfigurator({ piece }: { piece: Piece }) {
  const [version, setVersion] = useState<Version>(piece.versions[0]);
  const [metal, setMetal] = useState<Metal>(piece.metals[0]);
  const [size, setSize] = useState<string>(piece.sizes?.[6] ?? piece.sizes?.[0] ?? "");
  const [engrave, setEngrave] = useState("");
  const { add } = useBag();

  const price = version.priceCents;
  const manMade = version.origin === "man-made";
  const query = new URLSearchParams({ piece: piece.handle, version: version.key, metal, ...(size ? { size } : {}) }).toString();

  const detail = [version.name, METAL_LABEL[metal], size ? `Size ${size}` : null, engrave ? `Engraved “${engrave}”` : null].filter(Boolean).join(" · ");

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-1.5">
        <span className="font-display text-[1.75rem] tabular-nums">{price === null ? "Price on request" : formatPrice(price)}</span>
        <span className="text-[0.8125rem] text-ink-2">
          {manMade ? "Man-made (laboratory-grown) diamond, D-F color, VVS clarity, IGI report" : version.stones ?? "Solid 14k or 18k gold, karat-marked"}
        </span>
        <span className="text-[0.8125rem] text-muted">{piece.leadTime}</span>
      </div>

      {piece.versions.length > 1 && (
        <Field label="Version">
          <div className="flex flex-col gap-2">
            {piece.versions.map((v) => (
              <button key={v.key + v.name} type="button" className="opt" aria-pressed={v === version} onClick={() => setVersion(v)}>
                <span>{v.name}</span>
                <span className="text-ink-2 tabular-nums text-[0.8125rem]">{v.priceCents === null ? "On request" : formatPrice(v.priceCents)}</span>
              </button>
            ))}
          </div>
        </Field>
      )}

      <Field label="Metal">
        <div className="flex flex-wrap gap-2">
          {piece.metals.map((m) => (
            <button key={m} type="button" className="pill gap-2" aria-pressed={m === metal} onClick={() => setMetal(m)}>
              <Swatch metal={m} />
              {METAL_LABEL[m]}
            </button>
          ))}
        </div>
      </Field>

      {piece.sizes && (
        <Field label="Size" hint={<Link href="/care#sizing" className="link-quiet">Sizing help</Link>}>
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
        <Field label="Engraving" hint="Up to 20 characters · included">
          <input
            id={`engrave-${piece.handle}`}
            value={engrave}
            onChange={(e) => setEngrave(e.target.value.slice(0, 20))}
            placeholder="Initials, a date, a word"
            className="field font-display text-lg"
          />
        </Field>
      )}

      <div className="flex flex-col gap-3 pt-1">
        {price === null ? (
          <Link href={`/appointments?${query}`} className="btn">
            Request a private viewing
          </Link>
        ) : (
          <>
            <button
              type="button"
              className="btn"
              onClick={() =>
                add({
                  id: `${piece.handle}|${version.key}|${metal}|${size}|${engrave}`,
                  handle: piece.handle,
                  name: piece.name,
                  detail,
                  priceCents: price,
                  photo: (PIECE_PHOTOS[piece.handle] ?? ["hero-box"])[0],
                })
              }
            >
              Add to bag
            </button>
            <div className="grid grid-cols-2 gap-3">
              <Link href={`/appointments?${query}`} className="btn btn-outline">
                See it in store
              </Link>
              <SaveButton item={{ id: piece.handle, href: `/pieces/${piece.handle}`, name: piece.name, detail: version.name, photo: (PIECE_PHOTOS[piece.handle] ?? ["hero-box"])[0] }} />
            </div>
          </>
        )}
        <p className="text-[0.75rem] text-muted leading-relaxed">
          {manMade
            ? "Origin: man-made (laboratory-grown) diamond, grown by chemical vapor deposition, as grown with no post-growth treatment. Not mined."
            : piece.madeToOrder
              ? "Designed in Tennessee. Set and finished in our workshop. Diamonds and gold are imported."
              : "Shown by appointment in Brentwood."}
        </p>
      </div>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-4 h-5">
        <span className="caps-sm">{label}</span>
        {hint && <span className="text-[0.75rem] text-muted">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

export function Swatch({ metal }: { metal: Metal }) {
  const c: Record<Metal, string> = {
    "14k-yellow": "#d6b25e",
    "18k-yellow": "#dcb04c",
    "14k-rose": "#d9a083",
    "14k-white": "#e3e4e6",
    platinum: "#cfd2d6",
  };
  return <span className="inline-block w-3 h-3 rounded-full border border-black/15 shrink-0" style={{ background: c[metal] }} aria-hidden />;
}

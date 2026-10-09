"use client";

import Link from "next/link";
import { useState } from "react";
import type { Metal, Piece, Version } from "@/lib/catalog/types";
import { METAL_LABEL } from "@/lib/catalog/types";
import { formatPrice } from "@/lib/catalog/data";

export function PieceConfigurator({ piece }: { piece: Piece }) {
  const [version, setVersion] = useState<Version>(piece.versions[0]);
  const [metal, setMetal] = useState<Metal>(piece.metals[0]);
  const [size, setSize] = useState<string | undefined>(piece.sizes?.[6] ?? piece.sizes?.[0]);
  const [engrave, setEngrave] = useState("");

  const price = version.priceCents;
  const manMade = version.origin === "man-made";

  const query = new URLSearchParams({ piece: piece.handle, version: version.key, metal, ...(size ? { size } : {}) }).toString();

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-2">
        <span className="font-display text-3xl text-navy">{price === null ? "Price on request" : formatPrice(price)}</span>
        {manMade && <span className="label text-gilt">Man made diamond · D–F · VVS · IGI report</span>}
        {version.origin === "natural" && version.stones && <span className="label text-gilt">{version.stones}</span>}
        <span className="text-sm text-muted">{piece.leadTime}</span>
      </div>

      {piece.versions.length > 1 && (
        <Field label="Version">
          <div className="flex flex-wrap gap-2">
            {piece.versions.map((v) => (
              <Chip key={v.key + v.name} active={v === version} onClick={() => setVersion(v)}>
                {v.name}
                {v.priceCents !== null && <span className="text-muted ml-2">{formatPrice(v.priceCents)}</span>}
              </Chip>
            ))}
          </div>
        </Field>
      )}

      <Field label="Metal">
        <div className="flex flex-wrap gap-2">
          {piece.metals.map((m) => (
            <Chip key={m} active={m === metal} onClick={() => setMetal(m)}>
              <Swatch metal={m} />
              {METAL_LABEL[m]}
            </Chip>
          ))}
        </div>
      </Field>

      {piece.sizes && (
        <Field label="Size" hint={<Link href="/care#sizing" className="underline">Not sure? We size you in store, free.</Link>}>
          <div className="flex flex-wrap gap-2">
            {piece.sizes.map((s) => (
              <Chip key={s} active={s === size} onClick={() => setSize(s)} compact>
                {s}
              </Chip>
            ))}
          </div>
        </Field>
      )}

      {piece.engraving && (
        <Field label="Engraving" hint="Hand engraved, up to 20 characters. Included.">
          <input
            id={`engrave-${piece.handle}`}
            value={engrave}
            onChange={(e) => setEngrave(e.target.value.slice(0, 20))}
            placeholder="Initials, a date, a word"
            className="w-full bg-paper border border-line px-4 py-3 font-display text-xl text-navy placeholder:text-muted/60 focus:outline-none focus:border-gilt"
          />
        </Field>
      )}

      <div className="flex flex-col gap-3 pt-2">
        {price === null ? (
          <Link href={`/appointments?${query}`} className="btn">
            Request a private viewing
          </Link>
        ) : (
          <>
            <button type="button" className="btn opacity-60 cursor-not-allowed" aria-disabled title="Checkout opens with the launch">
              Add to bag · opens at launch
            </button>
            <Link href={`/appointments?${query}`} className="btn btn-ghost">
              Reserve a fitting
            </Link>
          </>
        )}
        <p className="text-xs text-muted leading-relaxed">
          {manMade
            ? "This piece is set with man made (laboratory-grown) diamonds, grown by chemical vapor deposition, untreated after growth. Not mined."
            : piece.madeToOrder
              ? "Made to order at our bench in Tennessee. Natural stones are stated on every piece."
              : "Shown by appointment in Brentwood."}
        </p>
      </div>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-4">
        <span className="label text-navy">{label}</span>
        {hint && <span className="text-xs text-muted">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function Chip({ active, onClick, children, compact = false }: { active: boolean; onClick: () => void; children: React.ReactNode; compact?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-2 border text-sm transition-colors ${compact ? "px-3 py-1.5 min-w-11 justify-center" : "px-4 py-2.5"} ${
        active ? "border-navy bg-navy text-cream" : "border-line bg-paper text-navy hover:border-gilt"
      }`}
    >
      {children}
    </button>
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
  return <span className="inline-block w-3.5 h-3.5 rounded-full border border-black/15" style={{ background: c[metal] }} aria-hidden />;
}

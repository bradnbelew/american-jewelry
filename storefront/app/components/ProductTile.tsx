import { Link } from "react-router";

import { formatPrice, startingPrice, tierBySlug } from "~/lib/catalog/data";
import { PIECE_PHOTOS } from "~/lib/catalog/photos";
import type { Piece } from "~/lib/catalog/types";

import { Pic } from "./Pic";

/** Four lines: the photograph, the name, what it is, the price. No second image, no badge, nothing moves. */
export function ProductTile({ piece, showLine = true, wide = false }: { piece: Piece; showLine?: boolean; wide?: boolean }) {
  const price = startingPrice(piece);
  const manMade = piece.versions.some((v) => v.origin === "man-made");
  const keys = PIECE_PHOTOS[piece.handle] ?? ["hero-box"];
  const what = piece.oneOfOne
    ? "One of one"
    : manMade
      ? "Man-made diamond"
      : piece.versions.some((v) => v.key === "diamond")
        ? "Gold, birthstone or natural diamond"
        : "Solid gold";
  return (
    <Link to={`/pieces/${piece.handle}`} viewTransition className="flex min-w-0 flex-col gap-3">
      <div className={`settle relative overflow-hidden bg-white ${wide ? "aspect-[4/5] md:aspect-[8/5]" : "aspect-[4/5]"}`}>
        <Pic k={keys[0]} sizes={wide ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 50vw"} />
      </div>
      <div className="flex min-w-0 flex-col gap-0.5 px-0.5">
        <span className="h-item text-[1.125rem]">{piece.name}</span>
        <span className="text-[0.8125rem] text-muted">
          {showLine ? `${tierBySlug(piece.tier).name}, ` : ""}
          {what}
        </span>
        <span className="num text-[0.8125rem] text-ink-2">{price === null ? "Price on request" : piece.versions.length > 1 ? `From ${formatPrice(price)}` : formatPrice(price)}</span>
      </div>
    </Link>
  );
}

/** The line-page rhythm: rows of two then one wide, alternating, never the same twice. */
export function TileGrid({ pieces, showLine = true }: { pieces: Piece[]; showLine?: boolean }) {
  const rows: Piece[][] = [];
  let i = 0;
  let wideRow = false;
  while (i < pieces.length) {
    const n = wideRow ? 1 : 2;
    rows.push(pieces.slice(i, i + n));
    i += n;
    wideRow = !wideRow;
  }
  return (
    <div className="flex flex-col gap-12 md:gap-20">
      {rows.map((row, r) => (
        <div key={r} className={`grid gap-x-6 gap-y-10 md:gap-x-10 ${row.length === 2 ? "grid-cols-2" : "grid-cols-1 md:grid-cols-12"}`}>
          {row.map((p, j) => (
            <div key={p.handle} className={row.length === 1 ? (r % 4 === 1 ? "md:col-span-8" : "md:col-span-8 md:col-start-5") : j === 1 ? "md:pt-20" : ""}>
              <ProductTile piece={p} showLine={showLine} wide={row.length === 1} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

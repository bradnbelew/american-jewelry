import Link from "next/link";
import type { Piece } from "@/lib/catalog/types";
import { formatPrice, startingPrice, tierBySlug } from "@/lib/catalog/data";
import { PieceArt } from "./PieceArt";

export function PieceCard({ piece, showTier = false }: { piece: Piece; showTier?: boolean }) {
  const price = startingPrice(piece);
  const manMade = piece.versions.some((v) => v.origin === "man-made");
  return (
    <Link href={`/pieces/${piece.handle}`} className="group flex flex-col gap-3 min-w-0">
      <div className="plate aspect-square flex items-center justify-center p-10 border border-line group-hover:border-gilt transition-colors">
        <PieceArt art={piece.art} className="w-full h-full" />
      </div>
      <div className="flex flex-col gap-1 min-w-0">
        {showTier && <span className="eyebrow">{tierBySlug(piece.tier).name}</span>}
        <span className="font-display text-xl text-navy leading-tight">{piece.name}</span>
        <span className="text-sm text-muted">
          {manMade ? "Man made diamond" : piece.oneOfOne ? "One of one" : `${piece.versions.length} versions`}
          {" · "}
          {price === null ? "Price on request" : `from ${formatPrice(price)}`}
        </span>
      </div>
    </Link>
  );
}

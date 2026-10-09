import Link from "next/link";
import type { Piece } from "@/lib/catalog/types";
import { formatPrice, startingPrice, tierBySlug } from "@/lib/catalog/data";
import { PIECE_PHOTOS } from "@/lib/catalog/photos";
import { Pic } from "./Pic";

export function ProductTile({ piece, eyebrow }: { piece: Piece; eyebrow?: string }) {
  const price = startingPrice(piece);
  const manMade = piece.versions.some((v) => v.origin === "man-made");
  const keys = PIECE_PHOTOS[piece.handle] ?? ["hero-box"];
  return (
    <Link href={`/pieces/${piece.handle}`} className="group flex flex-col gap-3 min-w-0">
      <div className="relative aspect-square overflow-hidden bg-ivory img-hover">
        <Pic k={keys[0]} sizes="(min-width: 1024px) 25vw, 50vw" />
        {keys[1] && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <Pic k={keys[1]} sizes="(min-width: 1024px) 25vw, 50vw" />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1 min-w-0 px-0.5">
        {eyebrow && <span className="caps-sm text-muted">{eyebrow}</span>}
        <span className="h-item text-[1.125rem]">{piece.name}</span>
        <span className="text-[0.8125rem] text-muted">
          {eyebrow ? null : tierBySlug(piece.tier).name}
          {eyebrow ? "" : ", "}
          {piece.oneOfOne ? "one of one" : manMade ? "man-made diamond" : piece.versions.some((v) => v.key === "diamond") ? "gold, birthstone or natural diamond" : "solid gold"}
        </span>
        <span className="text-[0.8125rem] text-ink-2">{price === null ? "Price on request" : `From ${formatPrice(price)}`}</span>
      </div>
    </Link>
  );
}

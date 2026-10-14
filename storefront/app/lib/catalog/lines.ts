import { PIECES, designBySlug } from "./data";
import type { Piece, TierSlug } from "./types";

export const SHOP_LINES = ["americana", "new-american"] as const;
export type ShopLine = typeof SHOP_LINES[number];
export const LINE_ORDER: TierSlug[] = [...SHOP_LINES, "royal-american"];
export const LINE_DESCRIPTION: Record<TierSlug, string> = {
  americana: "Gold, gemstones & natural diamonds",
  "new-american": "Lab-grown diamonds",
  "royal-american": "One of one",
};

/** One line is the context for shopping, never a multi-select product facet. */
export function selectedLine(params: URLSearchParams): ShopLine | undefined {
  const line = params.get("line");
  if (line === "americana" || line === "new-american") return line;
  // Retain the intent of older material links without mixing the lines.
  if (params.getAll("stone").includes("man-made")) return "new-american";
  const design = params.getAll("design").map(designBySlug).find(Boolean);
  if (design?.tier === "americana" || design?.tier === "new-american") return design.tier;
  if (params.has("stone") || params.has("metal")) return "americana";
  return undefined;
}

export function shopPieces(line: ShopLine, base: Piece[] = PIECES): Piece[] {
  return base.filter(piece => piece.tier === line && !piece.oneOfOne);
}

/** A line change starts a fresh selection within the same category/collection. */
export function lineHref(path: string, line: TierSlug, params = new URLSearchParams()): string {
  if (line === "royal-american") return "/royal-american";
  const next = new URLSearchParams({line});
  if (params.has("sort")) next.set("sort", params.get("sort")!);
  return `${path}?${next}`;
}

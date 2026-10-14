import { buildProductSelectionSearchParams } from "@shopify/hydrogen";
import { createProductComponents } from "@shopify/hydrogen/react";

import { pieceByHandle } from "~/lib/catalog/data";
import { METAL_LABEL, type Metal } from "~/lib/catalog/types";
import type { PieceProduct } from "~/lib/piece-query";

/** Typed product bindings for the piece page (client-safe: no gql here). */
export const { ProductProvider, useProduct, useProductForm } = createProductComponents<PieceProduct>();

/** The URL for a selection on the piece page, keeping unrelated params. */
export function pieceUrl(product: Pick<PieceProduct, "handle" | "options">, selectedOptions: { name: string; value: string }[], handle = product.handle, base?: URLSearchParams) {
  const params = buildProductSelectionSearchParams({
    selectedOptions,
    optionNames: product.options.map((o) => o.name),
    base,
  });
  return `/pieces/${handle}${params.size ? `?${params}` : ""}`;
}

/** Shopify's Metal option value ("14k yellow gold") back to the catalog key. */
export function metalKeyFromLabel(label: string): Metal | null {
  const hit = (Object.entries(METAL_LABEL) as [Metal, string][]).find(([, l]) => l.toLowerCase() === label.toLowerCase());
  return hit ? hit[0] : null;
}

/**
 * The name of a bag line, with the stone qualifier the canon requires:
 * "Signal Solitaire, 1.50 ct lab-grown diamond, 14k yellow gold".
 * Falls back to the Shopify title and variant title when the handle is not in the catalog.
 */
export function bagLineName(handle: string | null | undefined, productTitle: string, selectedOptions: { name: string; value: string }[] | null | undefined, variantTitle?: string | null): string {
  const opts = Object.fromEntries((selectedOptions ?? []).map((o) => [o.name, o.value]));
  const version: string | undefined = opts.Version;
  const metal: string | undefined = opts.Metal;
  const piece = handle ? pieceByHandle(handle) : undefined;
  if (!piece) return [productTitle, variantTitle].filter(Boolean).join(", ");
  const v = piece.versions.find((x) => x.name === version);
  const stone = v?.origin === "man-made" ? `${version} lab-grown diamond` : v?.key === "diamond" ? "natural diamond" : v?.key === "gemstone" ? "birthstone" : null;
  return [productTitle, stone, metal].filter(Boolean).join(", ");
}

/** Whether the chosen version carries a stone (so the bag can promise its report). */
export function bagLineHasStones(handle: string | null | undefined, selectedOptions: { name: string; value: string }[] | null | undefined): boolean {
  const piece = handle ? pieceByHandle(handle) : undefined;
  const version = (selectedOptions ?? []).find((o) => o.name === "Version")?.value;
  const v = piece?.versions.find((x) => x.name === version);
  return !!v && v.key !== "gold";
}

/** Lead time as the catalog states it; the metafield copy is not used. */
export function bagLineLeadTime(handle: string | null | undefined): string | null {
  const piece = handle ? pieceByHandle(handle) : undefined;
  return piece?.leadTime ?? null;
}

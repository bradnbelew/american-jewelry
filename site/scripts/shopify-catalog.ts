/**
 * Emit the Shopify Admin `productSet` inputs for every piece in the local catalog.
 *
 *   pnpm --dir D:/american-jewelry/site exec tsx scripts/shopify-catalog.ts D:/american-jewelry/site/scripts/out/products.json
 *
 * One product per piece (handle = catalog handle), options Version × Metal, size and
 * engraving as line-item attributes at checkout (made to order; no per-size variants).
 * Royal American one-of-ones are imported as DRAFT with a zero price and the
 * `price-on-request` tag so they are never purchasable online.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { PIECES, DESIGNS, pieceRef, tierBySlug } from "../src/lib/catalog/data";
import { PIECE_PHOTOS, PHOTO } from "../src/lib/catalog/photos";
import { METAL_LABEL, PIECE_TYPE_LABEL } from "../src/lib/catalog/types";

const PUBLIC_HOST = process.env.AJ_PUBLIC_HOST ?? "https://american-jewelry.vercel.app";

const mf = (key: string, type: string, value: string) => ({ namespace: "aj", key, type, value });

export const PRODUCT_METAFIELD_DEFINITIONS = [
  { namespace: "aj", key: "tier", name: "Tier", type: "single_line_text_field" },
  { namespace: "aj", key: "design", name: "Design", type: "single_line_text_field" },
  { namespace: "aj", key: "piece_type", name: "Piece type", type: "single_line_text_field" },
  { namespace: "aj", key: "house_ref", name: "House reference", type: "single_line_text_field" },
  { namespace: "aj", key: "lead_time", name: "Lead time", type: "single_line_text_field" },
  { namespace: "aj", key: "made_to_order", name: "Made to order", type: "boolean" },
  { namespace: "aj", key: "engravable", name: "Engravable", type: "boolean" },
  { namespace: "aj", key: "sizes", name: "Sizes offered", type: "list.single_line_text_field" },
  { namespace: "aj", key: "specs", name: "Specifications", type: "json" },
  { namespace: "aj", key: "collections", name: "House collections", type: "list.single_line_text_field" },
  { namespace: "custom", key: "model_source_embed", name: "iJewel viewer URL", type: "url" },
];

export const VARIANT_METAFIELD_DEFINITIONS = [
  { namespace: "aj", key: "stones", name: "Stones", type: "single_line_text_field" },
  { namespace: "aj", key: "origin", name: "Stone origin", type: "single_line_text_field" },
];

export function toProductSetInput(p: (typeof PIECES)[number]) {
  const tier = tierBySlug(p.tier);
  const design = DESIGNS.find((d) => d.slug === p.design);
  const onRequest = p.versions.every((v) => v.priceCents === null);
  const photoKeys = PIECE_PHOTOS[p.handle] ?? [];

  const variants = p.versions.flatMap((v) =>
    p.metals.map((m) => ({
      optionValues: [
        { optionName: "Version", name: v.name },
        { optionName: "Metal", name: METAL_LABEL[m] },
      ],
      price: v.priceCents === null ? "0.00" : (v.priceCents / 100).toFixed(2),
      sku: `${pieceRef(p).replace(" ", "-")}-${v.key.toUpperCase()}-${m.toUpperCase()}`,
      inventoryPolicy: "CONTINUE",
      inventoryItem: { tracked: false, requiresShipping: true },
      metafields: [
        ...(v.stones ? [mf("stones", "single_line_text_field", v.stones)] : []),
        mf("origin", "single_line_text_field", v.origin),
      ],
    })),
  );

  return {
    handle: p.handle,
    title: p.name,
    descriptionHtml: `<p>${p.description}</p>`,
    vendor: "American Jewelry",
    productType: PIECE_TYPE_LABEL[p.pieceType],
    status: onRequest ? "DRAFT" : "ACTIVE",
    tags: [tier.name, design?.name ?? "Royal American", PIECE_TYPE_LABEL[p.pieceType], ...(onRequest ? ["price-on-request"] : []), ...(p.madeToOrder ? ["made-to-order"] : [])],
    productOptions: [
      { name: "Version", position: 1, values: p.versions.map((v) => ({ name: v.name })) },
      { name: "Metal", position: 2, values: p.metals.map((m) => ({ name: METAL_LABEL[m] })) },
    ],
    variants,
    files: photoKeys.slice(0, 4).map((k) => ({
      originalSource: `${PUBLIC_HOST}${PHOTO[k].src}`,
      alt: PHOTO[k].alt,
      contentType: "IMAGE",
    })),
    metafields: [
      mf("tier", "single_line_text_field", tier.name),
      mf("design", "single_line_text_field", design?.name ?? "Royal American"),
      mf("piece_type", "single_line_text_field", PIECE_TYPE_LABEL[p.pieceType]),
      mf("house_ref", "single_line_text_field", pieceRef(p)),
      mf("lead_time", "single_line_text_field", p.leadTime),
      mf("made_to_order", "boolean", String(p.madeToOrder)),
      mf("engravable", "boolean", String(Boolean(p.engraving))),
      ...(p.sizes ? [mf("sizes", "list.single_line_text_field", JSON.stringify(p.sizes))] : []),
      mf("specs", "json", JSON.stringify(p.specs)),
      ...(p.collections.length ? [mf("collections", "list.single_line_text_field", JSON.stringify(p.collections))] : []),
    ],
  };
}

const out = process.argv[2];
if (out) {
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(
    out,
    JSON.stringify(
      {
        productMetafieldDefinitions: PRODUCT_METAFIELD_DEFINITIONS,
        variantMetafieldDefinitions: VARIANT_METAFIELD_DEFINITIONS,
        products: PIECES.map(toProductSetInput),
      },
      null,
      2,
    ),
  );
  console.log(`${PIECES.length} products → ${out}`);
}

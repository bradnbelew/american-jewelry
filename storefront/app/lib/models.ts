/**
 * 3D models on the site. Two sources:
 *   - `glb`: a file in public/3d/models, rendered by our own viewer (react-three-fiber).
 *   - `embed`: an iJewel embed URL, rendered as an iframe facade. Wins when present.
 *
 * The cast files from the bench are stand-ins mapped onto the catalog pieces they
 * resemble, the way the photographs are. Replace as the real designs are modeled.
 */
export interface PieceModel {
  glb?: string; // slug in public/3d/models
  embed?: string; // iJewel embed URL (also the Shopify metafield custom.model_source_embed)
}

export const PIECE_MODELS: Record<string, PieceModel> = {
  "signal-solitaire": { glb: "solitaire-ring" },
  "signal-mens-signet": { glb: "signet-ring" },
  "prism-signet": { glb: "signet-ring" },
  "shooting-star-signet": { glb: "three-stone-flush-ring" },
  "grid-stack-band": { glb: "stack-band-a" },
  "grid-eternity-band": { glb: "patterned-band" },
  "shooting-star-band": { glb: "plain-band" },
  "prism-band": { glb: "contour-band" },
  "shooting-star-ring": { glb: "hidden-halo-ring" },
  "shooting-star-pendant": { glb: "script-pendant" },
};

export const modelFor = (handle: string): PieceModel | undefined => PIECE_MODELS[handle];
export const glbUrl = (slug: string) => `/3d/models/${slug}.glb`;
export const STUDIO_HDR = "/3d/env/studio_small_09_1k.hdr";

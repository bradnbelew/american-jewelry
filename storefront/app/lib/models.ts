/**
 * 3D models on the site. Two sources:
 *   - `embed`: an iJewel embed URL, rendered as an iframe facade. Wins when present.
 *     The same URL lives on the Shopify product as `custom.model_source_embed`.
 *   - `glb`: a file in public/3d/models, rendered by our own viewer (react-three-fiber).
 *
 * The cast files from the bench are stand-ins mapped onto the catalog pieces they
 * resemble, the way the photographs are. Replace as the real designs are modeled.
 * iJewel ids are the model ids from Drive (Share → link → /files/<id>/view), set public 2026-10-10.
 */
export interface PieceModel {
  glb?: string; // slug in public/3d/models
  embed?: string; // iJewel embed URL
}

const ij = (id: string) => `https://ijewel3d.com/drive/files/${id}/embedded`;

export const PIECE_MODELS: Record<string, PieceModel> = {
  "signal-solitaire": { glb: "solitaire-ring", embed: ij("bhJ8UbclT06Y7QjtSnvbYA") },
  "signal-mens-signet": { glb: "signet-ring", embed: ij("G97isy-tSdKv1n1S6Clbbg") },
  "prism-signet": { glb: "signet-ring", embed: ij("G97isy-tSdKv1n1S6Clbbg") },
  "shooting-star-signet": { glb: "three-stone-flush-ring", embed: ij("QpiNYGImQ9i5me9nB2BwEQ") },
  "grid-stack-band": { glb: "stack-band-a", embed: ij("fgSY2QMjQkarV0BRXQIqJg") },
  "grid-eternity-band": { glb: "patterned-band", embed: ij("HeODzD9ARSGV1wOXsZtOTg") },
  "shooting-star-band": { glb: "plain-band", embed: ij("c9vbivNdTZWECoAZARCFUw") },
  "prism-band": { glb: "contour-band", embed: ij("NqJp-BdATnCznKDbMBnTZw") },
  "shooting-star-ring": { glb: "hidden-halo-ring", embed: ij("StUGkKLoTAG72gaWkD0Qfg") },
  "shooting-star-pendant": { glb: "script-pendant", embed: ij("Wgn5rloUR-ubCdlUlQ5wQg") },
};

/** Drive files without a catalog home yet: rope-edge band bvhVYSQeSfqRiGJPnMWfcw, engagement setting ATNEC5EfQMuZ7GYDLBTZaw. */

export const modelFor = (handle: string): PieceModel | undefined => PIECE_MODELS[handle];
export const glbUrl = (slug: string) => `/3d/models/${slug}.glb`;
export const STUDIO_HDR = "/3d/env/studio_small_09_1k.hdr";

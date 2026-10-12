/**
 * The rework explorations (docs/briefs/HANDOFF-rework-instructions.md §3): type, palette and
 * product-page layout candidates behind `?t=`, `?p=`, `?v=` flags, remembered in a cookie so the
 * owner can walk the site in one candidate. Nothing here changes the tokens; `app/explore.css`
 * overrides them under `data-type` / `data-palette` on <html>. Remove with the decision.
 */
export const TYPE_CANDIDATES = {
  a0: "Libre Caslon (current)",
  a1: "Sorts Mill Goudy",
  a2: "Linden Hill (Deepdene)",
  a3: "Newsreader",
  a4: "Besley (Clarendon)",
} as const;

export const PALETTE_CANDIDATES = {
  b0: "Paper, ink, gold (current)",
  b1: "Limestone, ink, bronze",
  b2: "Chalk, ink, iron",
  b3: "Bone, ink, aubergine",
} as const;

export const LAYOUT_CANDIDATES = {
  c0: "Vertical gallery, sticky buy column (current)",
  c1: "The stage: one object centered, words beside it",
  c2: "The scroll: one frame per view, sticky details, phone bar",
} as const;

export type TypeKey = keyof typeof TYPE_CANDIDATES;
export type PaletteKey = keyof typeof PALETTE_CANDIDATES;
export type LayoutKey = keyof typeof LAYOUT_CANDIDATES;
export interface Explore {
  t: TypeKey;
  p: PaletteKey;
  v: LayoutKey;
}

const COOKIE = "aj-explore";

function pick<T extends string>(value: string | null | undefined, allowed: readonly T[], fallback: T): T {
  return value && (allowed as readonly string[]).includes(value) ? (value as T) : fallback;
}

/** Reads the flags from the URL first, then the cookie. Returns the choice and whether the URL set it. */
export function readExplore(request: Request): { explore: Explore; fromUrl: boolean } {
  const url = new URL(request.url);
  const cookie = Object.fromEntries(
    (request.headers.get("Cookie") ?? "")
      .split(";")
      .map((c) => c.trim().split("="))
      .filter(([k]) => k === COOKIE)
      .flatMap(([, v]) => (v ?? "").split("."))
      .map((kv) => kv.split(":")) as [string, string][],
  );
  const fromUrl = ["t", "p", "v"].some((k) => url.searchParams.has(k));
  const explore: Explore = {
    t: pick(url.searchParams.get("t") ?? cookie.t, Object.keys(TYPE_CANDIDATES) as TypeKey[], "a0"),
    p: pick(url.searchParams.get("p") ?? cookie.p, Object.keys(PALETTE_CANDIDATES) as PaletteKey[], "b0"),
    v: pick(url.searchParams.get("v") ?? cookie.v, Object.keys(LAYOUT_CANDIDATES) as LayoutKey[], "c0"),
  };
  return { explore, fromUrl };
}

export function exploreCookie(e: Explore): string {
  return `${COOKIE}=t:${e.t}.p:${e.p}.v:${e.v}; Path=/; Max-Age=2592000; SameSite=Lax`;
}

export function isDefaultExplore(e: Explore): boolean {
  return e.t === "a0" && e.p === "b0" && e.v === "c0";
}

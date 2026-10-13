import type { RingConfig } from "~/lib/builder/model";

/**
 * "In the light": the pieces that can be shown in the viewing, and what they rest on.
 * The viewing is for stones. A piece without a stone is shown in daylight, on the hand.
 * Royal American rests on the navy velvet it owns; every other piece on the counter (ink).
 * No three.js here, so routes can import it on the server.
 */
export type Lining = "velvet" | "counter";

export type ViewingJewel =
  | { kind: "ring"; config: Partial<RingConfig>; carat?: number }
  | { kind: "eternity"; metal: RingConfig["metal"]; stones: number };

export interface ViewingSpec {
  jewel: ViewingJewel;
  lining: Lining;
  /** the stone in the grader's words, shown when you look closer */
  grade?: string;
}

/** Material values for the 3D room. The grounds are the house tokens: navy and ink. */
export const LININGS: Record<
  Lining,
  { ground: string; cloth: string; sheen: number; sheenColor: string; sheenRoughness: number; light: string; power: number }
> = {
  velvet: { ground: "#16213a", cloth: "#22325c", sheen: 1, sheenColor: "#7088c8", sheenRoughness: 0.32, light: "#ffe4bf", power: 1 },
  counter: { ground: "#121212", cloth: "#2a2927", sheen: 0.55, sheenColor: "#8d867b", sheenRoughness: 0.5, light: "#fff0dc", power: 1 },
};

export const VIEWING: Record<string, ViewingSpec> = {
  "no-001-the-cumberland": {
    lining: "velvet",
    grade: "D color. Internally flawless: nothing inside the stone at 10x. GIA.", // house-lint: allow (the catalog grade is D, IF, GIA: an IF grade on the report)
    jewel: { kind: "ring", carat: 5.02, config: { setting: "signal", metal: "platinum", prongs: 6, prongStyle: "round", profile: "court", width: 2.4, origin: "natural" } },
  },
  "signal-solitaire": {
    lining: "counter",
    grade: "Man-made diamond (laboratory-grown), D to F color, VVS: inclusions very difficult to see at 10x. IGI.",
    jewel: { kind: "ring", carat: 1.5, config: { setting: "signal", metal: "platinum", origin: "man-made", profile: "knife", width: 1.8 } },
  },
  "shooting-star-ring": {
    lining: "counter",
    grade: "Natural diamonds, F to G color, VS clarity. GIA.",
    jewel: { kind: "ring", carat: 1.0, config: { setting: "shooting-star", metal: "18k-yellow", origin: "natural", profile: "court", width: 2.0, tail: "long" } },
  },
  "grid-eternity-band": {
    lining: "counter",
    grade: "Man-made diamonds (laboratory-grown), D to F color, VVS. IGI.",
    jewel: { kind: "eternity", metal: "14k-white", stones: 26 },
  },
};

export const viewingFor = (handle: string | undefined) => (handle ? VIEWING[handle] : undefined);

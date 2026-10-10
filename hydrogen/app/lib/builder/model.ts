/**
 * The ring builder's model: every decision a client can make, and the house decisions they cannot.
 * Stones are offered at set qualities and set sizes only (no inventory). Everything here is serializable
 * into a design code (see code.ts) and priced from geometry (see pricing.ts).
 */

export const SETTINGS = ["signal", "shooting-star", "prism"] as const;
export type SettingKey = (typeof SETTINGS)[number];

export const PROFILES = ["knife", "court", "flat"] as const;
export type Profile = (typeof PROFILES)[number];

export const WIDTHS = [1.6, 1.8, 2.0, 2.4, 3.0] as const; // mm
export type Width = (typeof WIDTHS)[number];

export const PRONG_STYLES = ["claw", "round", "double"] as const;
export type ProngStyle = (typeof PRONG_STYLES)[number];

export const PRONG_COUNTS = [4, 6] as const;
export type ProngCount = (typeof PRONG_COUNTS)[number];

export const ORIGINS = ["natural", "man-made"] as const;
export type Origin = (typeof ORIGINS)[number];

export const CARATS = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0, 2.5, 3.0] as const;
export type Carat = (typeof CARATS)[number];

export const METALS = ["14k-yellow", "14k-white", "14k-rose", "18k-yellow", "platinum"] as const;
export type Metal = (typeof METALS)[number];

export const SIZES = ["4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"] as const;
export type Size = (typeof SIZES)[number];

export const HANDS = ["script", "roman"] as const; // engraving hand
export type Hand = (typeof HANDS)[number];

export const TAILS = ["short", "long"] as const;
export type Tail = (typeof TAILS)[number];

export interface RingConfig {
  setting: SettingKey;
  profile: Profile;
  width: Width;
  prongStyle: ProngStyle;
  prongs: ProngCount;
  taper: boolean;
  halo: boolean; // hidden halo under the center stone
  origin: Origin;
  carat: Carat;
  metal: Metal;
  size: Size;
  engraving: string; // ≤ 20 chars
  hand: Hand;
  birthstone: number; // 0 = none, 1–12 = month (Shooting Star tail only)
  tail: Tail; // Shooting Star only
}

export const DEFAULT_CONFIG: RingConfig = {
  setting: "signal",
  profile: "knife",
  width: 1.8,
  prongStyle: "claw",
  prongs: 4,
  taper: false,
  halo: false,
  origin: "man-made",
  carat: 1.5,
  metal: "14k-yellow",
  size: "6.5",
  engraving: "",
  hand: "script",
  birthstone: 0,
  tail: "short",
};

/* ------------------------------------------------------------------ */
/* Labels and facts                                                    */
/* ------------------------------------------------------------------ */

export const SETTING_LABEL: Record<SettingKey, string> = { signal: "Signal", "shooting-star": "Shooting Star", prism: "Prism" };
export const PROFILE_LABEL: Record<Profile, string> = { knife: "Knife edge", court: "Court", flat: "Flat" };
export const PRONG_LABEL: Record<ProngStyle, string> = { claw: "Claw", round: "Round", double: "Double" };
export const METAL_LABEL: Record<Metal, string> = {
  "14k-yellow": "14k yellow gold",
  "14k-white": "14k white gold",
  "14k-rose": "14k rose gold",
  "18k-yellow": "18k yellow gold",
  platinum: "Platinum",
};
export const HAND_LABEL: Record<Hand, string> = { script: "House script", roman: "Roman capitals" };

/** The house line. Stones below it are not offered. */
export const STONE_STANDARD: Record<Origin, { grade: string; report: string; tier: string; short: string }> = {
  natural: { grade: "F–G color · VS1 clarity · Excellent cut", report: "GIA report, laser inscribed", tier: "Americana", short: "Natural diamond" },
  "man-made": { grade: "D–F color · VVS1–VVS2 · Ideal cut", report: "IGI Laboratory Grown Diamond Report, laser inscribed", tier: "New American", short: "Man-made diamond" },
};

export const BIRTHSTONES: { month: number; name: string; stone: string; hex: string }[] = [
  { month: 1, name: "January", stone: "Garnet", hex: "#8a1c2b" },
  { month: 2, name: "February", stone: "Amethyst", hex: "#7a4fb3" },
  { month: 3, name: "March", stone: "Aquamarine", hex: "#8fd3e8" },
  { month: 4, name: "April", stone: "Diamond", hex: "#ffffff" },
  { month: 5, name: "May", stone: "Emerald", hex: "#1f8a5a" },
  { month: 6, name: "June", stone: "Pearl", hex: "#f2ece0" },
  { month: 7, name: "July", stone: "Ruby", hex: "#b3122d" },
  { month: 8, name: "August", stone: "Peridot", hex: "#9bc53d" },
  { month: 9, name: "September", stone: "Sapphire", hex: "#1f3f9c" },
  { month: 10, name: "October", stone: "Tourmaline", hex: "#e36aa8" },
  { month: 11, name: "November", stone: "Citrine", hex: "#f0b23a" },
  { month: 12, name: "December", stone: "Tanzanite", hex: "#4a5bc4" },
];

/** Round brilliant diameter in mm from carat weight (≈ 6.5 mm at 1.00 ct). */
export const stoneDiameterMm = (carat: number) => 6.5 * Math.cbrt(carat);

/** US ring size → inside diameter in mm. */
export const sizeToInnerDiameterMm = (size: Size) => 11.63 + 0.8128 * parseFloat(size);

export function ringName(c: RingConfig) {
  return `${SETTING_LABEL[c.setting]} · ${c.carat.toFixed(2)} ct ${STONE_STANDARD[c.origin].short.toLowerCase()} · ${METAL_LABEL[c.metal]}`;
}

export function leadTimeWeeks(c: RingConfig) {
  let w = c.origin === "natural" ? 3 : 2;
  if (c.halo) w += 1;
  if (c.setting === "shooting-star" && c.birthstone) w += 1;
  return w;
}

export function normalize(partial: Partial<RingConfig>): RingConfig {
  const c = { ...DEFAULT_CONFIG, ...partial };
  if (!SETTINGS.includes(c.setting)) c.setting = DEFAULT_CONFIG.setting;
  if (!PROFILES.includes(c.profile)) c.profile = DEFAULT_CONFIG.profile;
  if (!WIDTHS.includes(c.width)) c.width = DEFAULT_CONFIG.width;
  if (!PRONG_STYLES.includes(c.prongStyle)) c.prongStyle = DEFAULT_CONFIG.prongStyle;
  if (!PRONG_COUNTS.includes(c.prongs)) c.prongs = DEFAULT_CONFIG.prongs;
  if (!ORIGINS.includes(c.origin)) c.origin = DEFAULT_CONFIG.origin;
  if (!CARATS.includes(c.carat)) c.carat = DEFAULT_CONFIG.carat;
  if (!METALS.includes(c.metal)) c.metal = DEFAULT_CONFIG.metal;
  if (!SIZES.includes(c.size)) c.size = DEFAULT_CONFIG.size;
  if (!HANDS.includes(c.hand)) c.hand = DEFAULT_CONFIG.hand;
  if (!TAILS.includes(c.tail)) c.tail = DEFAULT_CONFIG.tail;
  c.engraving = (c.engraving ?? "").slice(0, 20);
  c.birthstone = c.setting === "shooting-star" ? Math.max(0, Math.min(12, Math.round(c.birthstone))) : 0;
  if (c.setting === "prism") {
    c.prongStyle = "round";
    c.prongs = 6;
  }
  return c;
}

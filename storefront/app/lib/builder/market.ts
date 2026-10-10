/**
 * Market inputs for the pricing model. Everything here is a working assumption for the preview;
 * at launch these come from the bench's cost sheet and a daily metal feed.
 */

export const MARKET_AS_OF = "2026-10-01";

/** Finished-metal cost per gram, including casting loss and finishing. */
export const METAL_PER_GRAM: Record<string, number> = {
  "14k-yellow": 78,
  "14k-white": 80,
  "14k-rose": 78,
  "18k-yellow": 100,
  platinum: 58,
};

/** Density, g/cm³. */
export const METAL_DENSITY: Record<string, number> = {
  "14k-yellow": 13.0,
  "14k-white": 12.8,
  "14k-rose": 13.0,
  "18k-yellow": 15.6,
  platinum: 21.4,
};

/** Bench labor, in dollars. */
export const LABOR = {
  setting: { signal: 450, "shooting-star": 650, prism: 600 } as Record<string, number>,
  perProng: 35,
  doubleProngExtra: 60,
  hiddenHalo: 380, // includes twelve melee stones
  tailStone: 45, // each, set
  birthstone: 210, // stone and setting
  engraving: 0, // included
  taper: 40,
};

/** Set stones at set sizes. Natural: F–G, VS1, GIA. Man-made: D–F, VVS, IGI. Dollars per stone. */
export const STONE_PRICE: Record<"natural" | "man-made", Record<string, number>> = {
  natural: { "0.5": 1600, "0.75": 2600, "1": 4300, "1.25": 6200, "1.5": 8600, "2": 15500, "2.5": 23000, "3": 33000 },
  "man-made": { "0.5": 420, "0.75": 560, "1": 720, "1.25": 880, "1.5": 1050, "2": 1450, "2.5": 1900, "3": 2400 },
};

/** House multipliers applied to cost to reach retail. */
export const MARGIN = { making: 2.4, stone: 1.8 };

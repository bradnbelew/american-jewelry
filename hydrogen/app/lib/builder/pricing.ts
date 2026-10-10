import { LABOR, MARGIN, METAL_DENSITY, METAL_PER_GRAM, STONE_PRICE } from "./market";
import { sizeToInnerDiameterMm, stoneDiameterMm, type RingConfig } from "./model";

/**
 * Price from geometry. The band is a swept profile; its volume is cross-section area × mean circumference,
 * reduced by taper. The head is estimated from the stone size. Everything is in mm and grams.
 */

export function profileAreaMm2(profile: RingConfig["profile"], width: number, thickness: number) {
  switch (profile) {
    case "knife":
      return 0.5 * width * thickness + 0.15 * width * thickness; // triangle plus a small inner flat
    case "court":
      return (Math.PI / 4) * width * thickness * 0.85 + 0.15 * width * thickness; // half-ellipse plus flat
    case "flat":
      return width * thickness * 0.95;
  }
}

export function bandThicknessMm(profile: RingConfig["profile"], width: number) {
  return profile === "knife" ? Math.max(1.5, width * 0.95) : profile === "court" ? Math.max(1.4, width * 0.8) : Math.max(1.3, width * 0.7);
}

export function metalGrams(c: RingConfig) {
  const innerD = sizeToInnerDiameterMm(c.size);
  const t = bandThicknessMm(c.profile, c.width);
  const meanCirc = Math.PI * (innerD + t);
  const area = profileAreaMm2(c.profile, c.width, t);
  const taperFactor = c.taper ? 0.86 : 1;
  const bandMm3 = area * meanCirc * taperFactor;

  const d = stoneDiameterMm(c.carat);
  const prongMm3 = c.prongs * (c.prongStyle === "double" ? 2 : 1) * Math.PI * 0.45 * 0.45 * (d * 0.9);
  const galleryMm3 = Math.PI * d * 0.5 * 0.5 * 2 * 0.6;
  const headMm3 = prongMm3 + galleryMm3 + (c.halo ? Math.PI * (d * 0.7) * 0.9 : 0);
  const ornamentMm3 = c.setting === "shooting-star" ? 9.5 * (c.width / 1.8) + (c.tail === "long" ? 1.2 : 0.8) : c.setting === "prism" ? Math.PI * (d * 0.75) * 1.0 : 0;

  const mm3 = bandMm3 + headMm3 + ornamentMm3;
  const cm3 = mm3 / 1000;
  return cm3 * METAL_DENSITY[c.metal];
}

export interface PriceBreakdown {
  grams: number;
  metal: number; // retail dollars
  bench: number; // retail dollars
  stone: number; // retail dollars
  total: number; // rounded to $25
  benchItems: string[];
}

export function price(c: RingConfig): PriceBreakdown {
  const grams = metalGrams(c);
  const metalCost = grams * METAL_PER_GRAM[c.metal];

  const items: string[] = [];
  let labor = LABOR.setting[c.setting];
  items.push(`${c.setting === "signal" ? "Signal" : c.setting === "shooting-star" ? "Shooting Star" : "Prism"} setting`);
  labor += c.prongs * LABOR.perProng;
  items.push(`${c.prongs} ${c.prongStyle} prongs`);
  if (c.prongStyle === "double") labor += LABOR.doubleProngExtra;
  if (c.halo) {
    labor += LABOR.hiddenHalo;
    items.push("Hidden halo, twelve stones");
  }
  if (c.setting === "shooting-star") {
    const tail = c.tail === "long" ? 5 : 3;
    labor += tail * LABOR.tailStone;
    items.push(`Tail of ${tail} stones`);
    if (c.birthstone) {
      labor += LABOR.birthstone;
      items.push("Birthstone, set in the tail");
    }
  }
  if (c.taper) labor += LABOR.taper;
  if (c.engraving) items.push("Hand engraving, included");

  const stoneCost = STONE_PRICE[c.origin][String(c.carat)] ?? 0;

  const metal = metalCost * MARGIN.making;
  const bench = labor * MARGIN.making;
  const stone = stoneCost * MARGIN.stone;
  const total = Math.round((metal + bench + stone) / 25) * 25;
  return { grams, metal, bench, stone, total, benchItems: items };
}

export const usd = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

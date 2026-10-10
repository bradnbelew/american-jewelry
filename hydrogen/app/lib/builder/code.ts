import {
  CARATS,
  HANDS,
  METALS,
  ORIGINS,
  PROFILES,
  PRONG_COUNTS,
  PRONG_STYLES,
  SETTINGS,
  SIZES,
  TAILS,
  WIDTHS,
  normalize,
  type RingConfig,
} from "./model";

/**
 * Design codes. The whole configuration is packed into one integer (mixed radix), written in
 * Crockford base32 with a check character, and the engraving is appended when present:
 *   AJ-7K3FQ2-M            or            AJ-7K3FQ2-M.SGVsbG8
 * No database is needed to read one back, which is what lets the store pull a code up on any device.
 */

const ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

const FIELDS: { key: keyof RingConfig; radix: number; enc: (c: RingConfig) => number; dec: (n: number) => Partial<RingConfig> }[] = [
  { key: "setting", radix: SETTINGS.length, enc: (c) => SETTINGS.indexOf(c.setting), dec: (n) => ({ setting: SETTINGS[n] }) },
  { key: "profile", radix: PROFILES.length, enc: (c) => PROFILES.indexOf(c.profile), dec: (n) => ({ profile: PROFILES[n] }) },
  { key: "width", radix: WIDTHS.length, enc: (c) => WIDTHS.indexOf(c.width), dec: (n) => ({ width: WIDTHS[n] }) },
  { key: "prongStyle", radix: PRONG_STYLES.length, enc: (c) => PRONG_STYLES.indexOf(c.prongStyle), dec: (n) => ({ prongStyle: PRONG_STYLES[n] }) },
  { key: "prongs", radix: PRONG_COUNTS.length, enc: (c) => PRONG_COUNTS.indexOf(c.prongs), dec: (n) => ({ prongs: PRONG_COUNTS[n] }) },
  { key: "taper", radix: 2, enc: (c) => (c.taper ? 1 : 0), dec: (n) => ({ taper: n === 1 }) },
  { key: "halo", radix: 2, enc: (c) => (c.halo ? 1 : 0), dec: (n) => ({ halo: n === 1 }) },
  { key: "origin", radix: ORIGINS.length, enc: (c) => ORIGINS.indexOf(c.origin), dec: (n) => ({ origin: ORIGINS[n] }) },
  { key: "carat", radix: CARATS.length, enc: (c) => CARATS.indexOf(c.carat), dec: (n) => ({ carat: CARATS[n] }) },
  { key: "metal", radix: METALS.length, enc: (c) => METALS.indexOf(c.metal), dec: (n) => ({ metal: METALS[n] }) },
  { key: "size", radix: SIZES.length, enc: (c) => SIZES.indexOf(c.size), dec: (n) => ({ size: SIZES[n] }) },
  { key: "hand", radix: HANDS.length, enc: (c) => HANDS.indexOf(c.hand), dec: (n) => ({ hand: HANDS[n] }) },
  { key: "birthstone", radix: 13, enc: (c) => c.birthstone, dec: (n) => ({ birthstone: n }) },
  { key: "tail", radix: TAILS.length, enc: (c) => TAILS.indexOf(c.tail), dec: (n) => ({ tail: TAILS[n] }) },
];

function toBase32(n: number, minLen = 6) {
  let s = "";
  do {
    s = ALPHABET[n % 32] + s;
    n = Math.floor(n / 32);
  } while (n > 0);
  return s.padStart(minLen, "0");
}

function fromBase32(s: string) {
  let n = 0;
  for (const ch of s.toUpperCase()) {
    const v = ALPHABET.indexOf(ch);
    if (v < 0) return NaN;
    n = n * 32 + v;
  }
  return n;
}

function check(n: number) {
  return ALPHABET[n % 31];
}

export function encodeCode(config: RingConfig): string {
  const c = normalize(config);
  let n = 0;
  for (const f of FIELDS) n = n * f.radix + Math.max(0, f.enc(c));
  const body = toBase32(n);
  let code = `AJ-${body}-${check(n)}`;
  if (c.engraving) {
    const b64 = typeof btoa === "function" ? btoa(unescape(encodeURIComponent(c.engraving))) : Buffer.from(c.engraving, "utf8").toString("base64");
    code += "." + b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  return code;
}

export function decodeCode(raw: string): RingConfig | null {
  const m = raw.trim().toUpperCase().match(/^AJ-([0-9A-Z]{1,8})-([0-9A-Z])(?:\.(.+))?$/i);
  if (!m) return null;
  const n = fromBase32(m[1]);
  if (!Number.isFinite(n) || check(n) !== m[2].toUpperCase()) return null;
  const parts: Partial<RingConfig> = {};
  let rest = n;
  for (let i = FIELDS.length - 1; i >= 0; i--) {
    const f = FIELDS[i];
    const v = rest % f.radix;
    rest = Math.floor(rest / f.radix);
    Object.assign(parts, f.dec(v));
  }
  if (m[3]) {
    try {
      const b64 = raw.trim().split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
      const text = typeof atob === "function" ? decodeURIComponent(escape(atob(b64))) : Buffer.from(b64, "base64").toString("utf8");
      parts.engraving = text.slice(0, 20);
    } catch {
      parts.engraving = "";
    }
  }
  return normalize(parts);
}

/** A stable certificate number derived from the code. */
export function certificateNumber(code: string, year = 2026) {
  let h = 2166136261;
  for (const ch of code) {
    h ^= ch.charCodeAt(0);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return `AJ-${year}-${String(h % 100000).padStart(5, "0")}`;
}

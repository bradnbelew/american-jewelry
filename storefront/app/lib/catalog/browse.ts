import { COLLECTIONS, DESIGNS, PIECES, TIERS, designBySlug, tierBySlug } from "./data";
import type { Metal, Piece, PieceType, TierSlug, Version } from "./types";
import { METAL_LABEL, PIECE_TYPE_LABEL } from "./types";

/**
 * Browsing the catalog: by category (what it is), by line, design and collection, with filters and a sort.
 * Everything here reads the local catalog; nothing is invented. A category with no pieces is simply empty.
 */

export type CategorySlug = "rings" | "necklaces" | "earrings" | "bracelets";

export interface Category {
  slug: CategorySlug;
  name: string;
  /** one sentence under the name on the category page */
  line: string;
  types: PieceType[];
}

export const CATEGORIES: Category[] = [
  { slug: "rings", name: "Rings", line: "Solitaires, bands, signets and the rings of every house design.", types: ["ring", "band", "signet", "solitaire", "eternity-band", "stack-band"] },
  { slug: "necklaces", name: "Necklaces", line: "Pendants, chains and tennis necklaces.", types: ["pendant", "necklace", "tennis-necklace", "chain", "dog-tag"] },
  { slug: "earrings", name: "Earrings", line: "Studs, hoops and sculptural earrings across the house designs.", types: ["earrings", "studs"] },
  { slug: "bracelets", name: "Bracelets", line: "Link bracelets and tennis bracelets.", types: ["bracelet", "tennis-bracelet"] },
];

export const categoryBySlug = (slug: string | undefined) => CATEGORIES.find((c) => c.slug === slug);
export const categoryOf = (p: Piece) => CATEGORIES.find((c) => c.types.includes(p.pieceType));
export const piecesForCategory = (slug: CategorySlug) => PIECES.filter((p) => categoryOf(p)?.slug === slug);

/** What a piece is made with, for the filter and the tile line. */
export type StoneKey = "gold" | "birthstone" | "natural" | "man-made";
export const STONE_LABEL: Record<StoneKey, string> = {
  gold: "No stone / solid gold",
  birthstone: "Gemstone / birthstone",
  natural: "Natural diamond",
  "man-made": "Lab-grown diamond",
};
const stonesForVersion = (v: Version): StoneKey[] => {
  const out: StoneKey[] = [];
  if (v.key === "gold") out.push("gold");
  if (v.key === "gemstone" || /sapphire|ruby|emerald|gemstone|birthstone/i.test(v.stones ?? "")) out.push("birthstone");
  if (v.key === "diamond") out.push("natural");
  if (v.origin === "man-made") out.push("man-made");
  return out;
};
export const stonesOf = (p: Piece): StoneKey[] => {
  return Array.from(new Set(p.versions.flatMap(stonesForVersion)));
};

/** The tile's second line: what the piece is, in the house's words. */
export const whatItIs = (p: Piece) => {
  if (p.concept) return "Proposed design";
  const s = stonesOf(p);
  if (p.oneOfOne) return `${s.includes("birthstone") ? "Gemstone and natural diamond" : "Natural diamond"}`;
  if (s.includes("man-made")) return "Lab-grown diamond";
  if (s.includes("natural") && s.includes("gold")) return "Gold, gemstone or natural diamond";
  if (s.includes("natural")) return "Natural diamond";
  return "Solid gold";
};

export const PRICE_BANDS: { key: string; label: string; min: number; max: number | null }[] = [
  { key: "to-1000", label: "To $1,000", min: 0, max: 100000 },
  { key: "1000-2500", label: "$1,000 to $2,500", min: 100000, max: 250000 },
  { key: "2500-5000", label: "$2,500 to $5,000", min: 250000, max: 500000 },
  { key: "5000-up", label: "$5,000 and up", min: 500000, max: null },
  { key: "on-request", label: "Price on request", min: -1, max: -1 },
];

export const SORTS: { key: SortKey; label: string }[] = [
  { key: "house", label: "Featured" },
  { key: "price-asc", label: "Price, low to high" },
  { key: "price-desc", label: "Price, high to low" },
  { key: "name", label: "Name" },
];
export type SortKey = "house" | "price-asc" | "price-desc" | "name";

export interface BrowseQuery {
  metal: Metal[];
  stone: StoneKey[];
  price: string[];
  line: TierSlug[];
  design: string[];
  production: ("one-of-one" | "collection" | "concept")[];
  sort: SortKey;
}

export const METALS: Metal[] = ["14k-yellow", "14k-white", "14k-rose", "18k-yellow", "platinum"];
export const isMetal = (s: string): s is Metal => (METALS as string[]).includes(s);
export const isTier = (s: string): s is TierSlug => TIERS.some((t) => t.slug === s);
export const isStone = (s: string): s is StoneKey => Object.hasOwn(STONE_LABEL, s);
export const isSort = (s: string): s is SortKey => SORTS.some((x) => x.key === s);

export function readQuery(params: URLSearchParams): BrowseQuery {
  const all = (k: string) => params.getAll(k).flatMap((v) => v.split(",")).filter(Boolean);
  const sort = params.get("sort") ?? "house";
  return {
    metal: all("metal").filter(isMetal),
    stone: all("stone").filter(isStone),
    price: all("price").filter((p) => PRICE_BANDS.some((b) => b.key === p)),
    line: all("line").filter(isTier),
    design: all("design").filter((d) => !!designBySlug(d)),
    production: [...new Set([...all("production"), ...all("stone").filter((s) => s === "one-of-one")])].filter((s): s is "one-of-one" | "collection" | "concept" => s === "one-of-one" || s === "collection" || s === "concept"),
    sort: isSort(sort) ? sort : "house",
  };
}

export const activeCount = (q: BrowseQuery) => q.metal.length + q.stone.length + q.price.length + q.line.length + q.design.length + q.production.length;

/** Stone and price must match the SAME version, never two different variants of a piece. */
export function matchingVersions(p: Piece, q: BrowseQuery): Version[] {
  if (p.concept && q.price.length) return [];
  return p.versions.filter((v) => {
    if (q.stone.length && !q.stone.some((s) => stonesForVersion(v).includes(s))) return false;
    return !q.price.length || q.price.some((key) => {
      const band = PRICE_BANDS.find((b) => b.key === key);
      if (!band) return false;
      if (key === "on-request") return v.priceCents === null;
      return v.priceCents !== null && v.priceCents >= band.min && (band.max === null || v.priceCents < band.max);
    });
  });
}
export function matchingVersion(p: Piece, q: BrowseQuery): Version | undefined {
  return [...matchingVersions(p, q)].sort((a, b) => (a.priceCents ?? Infinity) - (b.priceCents ?? Infinity))[0];
}

export function applyQuery(pieces: Piece[], q: BrowseQuery): Piece[] {
  let out = pieces.filter((p) => {
    if (q.metal.length && !q.metal.some((m) => p.metals.includes(m))) return false;
    if (q.production.length && !q.production.includes(p.concept ? "concept" : p.oneOfOne ? "one-of-one" : "collection")) return false;
    if (q.line.length && !q.line.includes(p.tier)) return false;
    if (q.design.length && !q.design.includes(p.design)) return false;
    return matchingVersions(p, q).length > 0;
  });
  const priceOf = (p: Piece) => matchingVersion(p, q)?.priceCents ?? Number.POSITIVE_INFINITY;
  if (q.sort === "house") {
    const opening = ["shooting-star-ring", "prism-necklace", "meridian-ring", "signal-solitaire", "petal-ring", "ribbon-pendant", "horizon-earrings", "grid-tennis-bracelet"];
    const rank = (p: Piece) => opening.includes(p.handle) ? opening.indexOf(p.handle) : p.oneOfOne ? 1000 : 100;
    out = [...out].sort((a, b) => rank(a) - rank(b));
  }
  if (q.sort === "price-asc") out = [...out].sort((a, b) => priceOf(a) - priceOf(b));
  else if (q.sort === "price-desc") out = [...out].sort((a, b) => (matchingVersion(b, q)?.priceCents ?? -1) - (matchingVersion(a, q)?.priceCents ?? -1));
  else if (q.sort === "name") out = [...out].sort((a, b) => a.name.localeCompare(b.name));
  return out;
}

/** The filter groups a page offers, with the count each option would leave in the current set. */
export interface FilterOption {
  value: string;
  label: string;
  count: number;
}
export interface FilterGroup {
  key: "metal" | "stone" | "price" | "line" | "design" | "production";
  label: string;
  options: FilterOption[];
}

export function filterGroups(base: Piece[], q: BrowseQuery, hide: FilterGroup["key"][] = []): FilterGroup[] {
  const countWith = (key: FilterGroup["key"], value: string) => applyQuery(base, { ...q, [key]: [value] } as BrowseQuery).length;
  const groups: FilterGroup[] = [
    { key: "line", label: "Line", options: TIERS.map((t) => ({ value: t.slug, label: t.name, count: countWith("line", t.slug) })) },
    { key: "stone", label: "Stone", options: (Object.keys(STONE_LABEL) as StoneKey[]).map((s) => ({ value: s, label: STONE_LABEL[s], count: countWith("stone", s) })) },
    { key: "production", label: "Edition", options: [{value:"one-of-one", label:"One of one", count:countWith("production","one-of-one")}, {value:"collection", label:"Collection piece", count:countWith("production","collection")}, {value:"concept", label:"Design concept", count:countWith("production","concept")}] },
    { key: "metal", label: "Metal", options: METALS.map((m) => ({ value: m, label: METAL_LABEL[m], count: countWith("metal", m) })) },
    { key: "price", label: "Price", options: PRICE_BANDS.map((b) => ({ value: b.key, label: b.label, count: countWith("price", b.key) })) },
    { key: "design", label: "Style", options: DESIGNS.map((d) => ({ value: d.slug, label: d.name, count: countWith("design", d.slug) })) },
  ];
  return groups.sort((a,b) => ["design","metal","stone","price","production","line"].indexOf(a.key) - ["design","metal","stone","price","production","line"].indexOf(b.key)).filter((g) => !hide.includes(g.key)).map((g) => ({ ...g, options: g.options.filter((o) => o.count > 0 || (q[g.key] as string[]).includes(o.value)) })).filter((g) => g.options.length > 1 || (q[g.key] as string[]).length > 0);
}

/* ------------------------------------------------------------------ */
/* Search: the local catalog, by name, design, line, type, collection   */
/* ------------------------------------------------------------------ */

export interface SearchHit {
  kind: "piece" | "design" | "line" | "collection" | "category" | "page";
  name: string;
  href: string;
  line: string;
  piece?: Piece;
}

const PAGES: { name: string; href: string; line: string; words: string }[] = [
  { name: "Build a ring", href: "/build/ring", line: "The house settings, your stone, your fit.", words: "build ring builder engagement setting signal shooting star prism" },
  { name: "Appointments", href: "/appointments", line: "An hour at either store.", words: "appointment book visit viewing" },
  { name: "Stores", href: "/stores", line: "Brentwood and Mt. Juliet, Tennessee.", words: "store stores brentwood mt juliet tennessee hours address phone" },
  { name: "Repair and restoration", href: "/services", line: "Sizing, retipping, stone setting, engraving, appraisal.", words: "repair restoration sizing retipping setting engraving appraisal rolex watch services" },
  { name: "Lifetime care", href: "/care", line: "Cleaning, inspection and the warranty.", words: "care clean cleaning inspection warranty sizing guide size" },
  { name: "Natural or lab-grown diamonds", href: "/natural-or-man-made", line: "The two stones, plainly.", words: "natural lab-grown diamond laboratory grown igi gia stone" },
  { name: "Commission a piece", href: "/commission", line: "A drawing, a CAD, four to six weeks.", words: "commission custom cad heirloom reset" },
  { name: "The House", href: "/house", line: "The family, the designs and the bench.", words: "house letter about family bench history" },
  { name: "Journal", href: "/journal", line: "Reading an IGI report, ring size, how a ring is made.", words: "journal article reading igi report ring size made" },
  { name: "Policies", href: "/policies", line: "Shipping, returns, warranty, privacy.", words: "policy policies shipping returns warranty privacy accessibility disclosures" },
];

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]+/g, " ")
  .replace(/\b(?:lab(?:oratory)?\s*grown|man\s*made)\b/g, "labgrown")
  .replace(/\b(jewellery)\b/g, "jewelry").replace(/\b(diamonds|rings|necklaces|earrings|bracelets|stones|signets)\b/g, (word) => word.slice(0, -1))
  .replace(/\s+/g, " ").trim();

/** Suggest, do not silently reinterpret. Handles one edit and adjacent transpositions. */
function closeWord(a: string, b: string) {
  if (a === b) return true;
  if (a.length < 4 || Math.abs(a.length - b.length) > 1) return false;
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    if (a[i] === b[i]) continue;
    if (a.length > b.length) return a.slice(i + 1) === b.slice(i);
    if (b.length > a.length) return a.slice(i) === b.slice(i + 1);
    return a.slice(i + 1) === b.slice(i + 1) || (a[i] === b[i + 1] && a[i + 1] === b[i] && a.slice(i + 2) === b.slice(i + 2));
  }
  return false;
}
export function searchSuggestion(query: string): string | null {
  if (searchCatalog(query, 1).length) return null;
  const vocabulary = [...DESIGNS.flatMap((d) => norm(d.name).split(" ")), "diamond", "ring", "necklace", "earring", "bracelet", "labgrown", "natural", "gold", "high", "jewelry"];
  const corrected = norm(query).slice(0, 80).split(" ").map((word) => vocabulary.find((v) => v === word) ?? vocabulary.find((v) => closeWord(word, v)) ?? word).join(" ");
  return corrected !== norm(query) && searchCatalog(corrected, 1).length ? corrected.replaceAll("labgrown", "lab-grown") : null;
}

export function searchCatalog(query: string, limit = 12): SearchHit[] {
  const q = norm(query.slice(0, 80));
  if (!q) return [];
  const terms = q.split(" ");
  const score = (hay: string) => {
    const h = norm(hay);
    let s = 0;
    for (const t of terms) {
      if (!t) continue;
      if (h === t) s += 6;
      else if (h.startsWith(t)) s += 4;
      else if (new RegExp(`\\b${t}`).test(h)) s += 3;
      else if (h.includes(t)) s += 1;
      else return 0;
    }
    return s;
  };
  const hits: { hit: SearchHit; s: number }[] = [];
  for (const p of PIECES) {
    // Registry objects are discovered in Royal American, never in a mixed product list.
    if (p.oneOfOne || p.tier === "royal-american") continue;
    const design = designBySlug(p.design);
    const tier = tierBySlug(p.tier);
    const hay = [p.name, design?.name ?? "", tier.name, p.oneOfOne ? "high jewelry registry" : "", PIECE_TYPE_LABEL[p.pieceType], categoryOf(p)?.name ?? "", whatItIs(p), ...p.versions.map((v) => `${v.name} ${v.stones ?? ''}`), ...p.collections.map((c) => COLLECTIONS.find((x) => x.slug === c)?.name ?? ""), ...p.metals.map((m) => METAL_LABEL[m])].join(" ");
    const s = score(hay);
    if (s) hits.push({ hit: { kind: "piece", name: p.name, href: `/pieces/${p.handle}`, line: `${tier.name}. ${whatItIs(p)}.`, piece: p }, s: s + (score(p.name) ? 2 : 0) });
  }
  for (const d of DESIGNS) {
    const s = score(`${d.name} design ${tierBySlug(d.tier).name} ${d.motif}`);
    if (s) hits.push({ hit: { kind: "design", name: `${d.name}, a design`, href: `/designs/${d.slug}`, line: d.motif }, s: s + 1 });
  }
  for (const t of TIERS) {
    const registryNames = t.slug === "royal-american" ? PIECES.filter(p => p.oneOfOne).map(p => p.name).join(" ") : "";
    const s = score(`${registryNames} ${t.name} line ${t.slug === 'royal-american' ? 'high jewelry registry' : ''} ${t.tagline} ${t.stones}`);
    if (s) hits.push({ hit: { kind: "line", name: t.name, href: `/${t.slug}`, line: t.tagline }, s: s + 1 });
  }
  for (const c of COLLECTIONS) {
    const s = score(`${c.name} collection ${c.intro}`);
    if (s) hits.push({ hit: { kind: "collection", name: `${c.name}, a collection`, href: `/collections/${c.slug}`, line: c.intro }, s });
  }
  for (const c of CATEGORIES) {
    const s = score(`${c.name} ${c.types.map((t) => PIECE_TYPE_LABEL[t]).join(" ")}`);
    if (s) hits.push({ hit: { kind: "category", name: c.name, href: `/jewelry/${c.slug}`, line: c.line }, s: s + 1 });
  }
  for (const p of PAGES) {
    const s = score(`${p.name} ${p.words}`);
    if (s) hits.push({ hit: { kind: "page", name: p.name, href: p.href, line: p.line }, s });
  }
  return hits
    .sort((a, b) => b.s - a.s || a.hit.name.localeCompare(b.hit.name))
    .slice(0, limit)
    .map((x) => x.hit);
}

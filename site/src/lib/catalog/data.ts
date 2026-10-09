import type { Collection, Design, Piece, Store, Tier, TierSlug, Version } from "./types";

/* ------------------------------------------------------------------ */
/* Tiers                                                               */
/* ------------------------------------------------------------------ */

export const TIERS: Tier[] = [
  {
    slug: "royal-american",
    name: "Royal American",
    numeral: "I",
    tagline: "One of one.",
    stones: "Natural diamonds and gemstones of exceptional character.",
    intro:
      "Pieces made once and never repeated. Each is numbered, registered to its owner, and shown by appointment in the salon.",
    pricing: "on-request",
    hallmark: "crown",
  },
  {
    slug: "americana",
    name: "Americana",
    numeral: "II",
    tagline: "The signature designs.",
    stones: "Natural diamonds, solid gold, and family gemstones.",
    intro:
      "The house designs: motifs drawn by our designer and worked across rings, bands, pendants and bracelets, in solid gold, gemstone and natural diamond versions.",
    pricing: "listed",
    hallmark: "star",
  },
  {
    slug: "new-american",
    name: "New American",
    numeral: "III",
    tagline: "Man made diamonds. Made in Tennessee.",
    stones: "Man made diamonds, D–F color, VVS clarity, every one.",
    intro:
      "Bolder designs, more light, and a standard most stores cannot meet at any price: colorless, flawless to the loupe, independently graded, set at our bench.",
    pricing: "listed",
    hallmark: "line",
  },
];

export const tierBySlug = (slug: TierSlug) => TIERS.find((t) => t.slug === slug)!;

/* ------------------------------------------------------------------ */
/* Designs (motifs)                                                    */
/* ------------------------------------------------------------------ */

export const DESIGNS: Design[] = [
  {
    slug: "shooting-star",
    name: "Shooting Star",
    tier: "americana",
    motif: "A five-point star with a trailing tail of graduated stones.",
    story:
      "The first design our designer drew for the house. The star is cut sharp; the tail falls away in a line of graduated settings that can hold diamonds, a single birthstone, or nothing at all.",
    signature: "Sharp five-point star, graduated tail, the AJ star struck inside every shank.",
  },
  {
    slug: "prism",
    name: "Prism",
    tier: "americana",
    motif: "Faceted, triangular geometry that breaks light the way a cut stone does.",
    story:
      "Prism takes the geometry of a cut stone and makes it the metal itself. Every surface is a plane; every edge is crisp. In the link pieces the facets interlock; in the signet the whole top is one faceted field.",
    signature: "Triangular facets, knife edges, high polish.",
  },
  {
    slug: "signal",
    name: "Signal",
    tier: "new-american",
    motif: "A single stone lifted on a slender, open-sided setting.",
    story:
      "Signal is about one stone and nothing in its way. The head is open on four sides so light enters from below, and the band is thin enough that the diamond is the whole story.",
    signature: "Four-prong open head, knife-edge band, flush-set accent at the base.",
  },
  {
    slug: "grid",
    name: "Grid",
    tier: "new-american",
    motif: "Stones set edge to edge in a strict, square-grid line.",
    story:
      "Grid is the tennis idea taken seriously: calibrated stones set in a true square grid, no gaps, no gallery, so the line reads as one continuous field of light.",
    signature: "Square-grid setting, calibrated stones, hidden clasp with the AJ line.",
  },
];

export const designBySlug = (slug: string) => DESIGNS.find((d) => d.slug === slug);
export const designsForTier = (tier: TierSlug) => DESIGNS.filter((d) => d.tier === tier);

/* ------------------------------------------------------------------ */
/* Collections                                                         */
/* ------------------------------------------------------------------ */

export const COLLECTIONS: Collection[] = [
  {
    slug: "family",
    name: "Family",
    intro: "The house designs, set with the birthstones of the people you love.",
    story:
      "Every Americana motif is drawn with a place for a stone that is yours. A Shooting Star's tail can hold a child's birthstone; a Prism signet can carry a parent's. Family pieces are made to order and engraved by hand.",
    crossTier: false,
  },
  {
    slug: "bridal",
    name: "Bridal",
    intro: "Engagement and wedding, in natural or man made diamond, in the same house settings.",
    story:
      "The one place our tiers share designs. Choose the setting; then choose the stone: a natural diamond in Americana, or a man made diamond in New American. Every ring is labeled plainly with which it is.",
    crossTier: true,
  },
  {
    slug: "signets",
    name: "Signets",
    intro: "The oldest form of personal jewelry, in every house motif.",
    story:
      "A signet is the piece a house is judged on. Ours are heavy, hand-finished, and engraved on request with a monogram, a crest, or the AJ seal.",
    crossTier: false,
  },
  {
    slug: "the-stack",
    name: "The Stack",
    intro: "Bands made to be worn in multiples and collected over years.",
    story:
      "Thin bands in gold, gemstone and diamond versions, sized to sit flush against one another. Start with one.",
    crossTier: true,
  },
];

export const collectionBySlug = (slug: string) => COLLECTIONS.find((c) => c.slug === slug);

/* ------------------------------------------------------------------ */
/* Pieces                                                              */
/* ------------------------------------------------------------------ */

const usd = (dollars: number) => dollars * 100;

const americanaVersions = (gold: number, gem: number, diamond: number, diamondSpec: string): Version[] => [
  { key: "gold", name: "Solid gold", priceCents: usd(gold), origin: "none" },
  { key: "gemstone", name: "Birthstone", priceCents: usd(gem), stones: "One natural gemstone of your choosing", origin: "natural" },
  { key: "diamond", name: "Natural diamond", priceCents: usd(diamond), stones: diamondSpec, origin: "natural" },
];

const manMade = (name: string, price: number, spec: string): Version => ({
  key: "man-made",
  name,
  priceCents: usd(price),
  stones: `${spec} man made diamond${spec.includes("tw") || spec.includes("stones") ? "s" : ""}, D–F, VVS`,
  origin: "man-made",
});

export const PIECES: Piece[] = [
  /* ---------------- Royal American: one of one ---------------- */
  {
    handle: "no-001-the-cumberland",
    name: "No. 001 · The Cumberland",
    tier: "royal-american",
    design: "royal",
    pieceType: "ring",
    oneOfOne: { number: "001", registered: true },
    versions: [{ key: "diamond", name: "Natural diamond", priceCents: null, stones: "5.02 ct natural diamond, D, IF, GIA", origin: "natural" }],
    metals: ["platinum"],
    leadTime: "Available now, by appointment",
    madeToOrder: false,
    description:
      "A 5.02 carat D-color, internally flawless diamond held in a platinum setting cut like a riverbank: one side rises, the other falls away. Made once.",
    specs: [
      { label: "Center", value: "5.02 ct round brilliant, D, IF, GIA 2231…" },
      { label: "Metal", value: "Platinum 950" },
      { label: "Registry", value: "Royal American No. 001" },
    ],
    collections: [],
    art: "solitaire",
  },
  {
    handle: "no-002-tennessee-star",
    name: "No. 002 · Tennessee Star",
    tier: "royal-american",
    design: "royal",
    pieceType: "necklace",
    oneOfOne: { number: "002", registered: true },
    versions: [{ key: "diamond", name: "Sapphire and diamond", priceCents: null, stones: "12.40 ct natural sapphire, 6.10 ct tw natural diamonds", origin: "natural" }],
    metals: ["platinum"],
    leadTime: "Available now, by appointment",
    madeToOrder: false,
    description:
      "A 12.40 carat Ceylon sapphire at the center of a five-point star of diamonds, on a platinum chain made link by link at the bench.",
    specs: [
      { label: "Center", value: "12.40 ct natural sapphire, unheated" },
      { label: "Diamonds", value: "6.10 ct tw, F–G, VVS" },
      { label: "Registry", value: "Royal American No. 002" },
    ],
    collections: [],
    art: "necklace",
  },
  {
    handle: "no-003-the-harpeth",
    name: "No. 003 · The Harpeth",
    tier: "royal-american",
    design: "royal",
    pieceType: "bracelet",
    oneOfOne: { number: "003", registered: true },
    versions: [{ key: "diamond", name: "Natural diamond", priceCents: null, stones: "14.8 ct tw natural diamonds", origin: "natural" }],
    metals: ["18k-yellow"],
    leadTime: "In the workshop · Spring",
    madeToOrder: false,
    description: "Forty-one graduated natural diamonds in a river of hand-cut 18k gold links. Made once.",
    specs: [
      { label: "Diamonds", value: "14.8 ct tw, 41 stones, E–F, VS1+" },
      { label: "Metal", value: "18k yellow gold" },
      { label: "Registry", value: "Royal American No. 003" },
    ],
    collections: [],
    art: "bracelet",
  },

  /* ---------------- Americana: Shooting Star ---------------- */
  {
    handle: "shooting-star-ring",
    name: "Shooting Star Ring",
    tier: "americana",
    design: "shooting-star",
    pieceType: "ring",
    versions: americanaVersions(1900, 2600, 4800, "0.62 ct tw natural diamonds, F–G, VS"),
    metals: ["14k-yellow", "14k-white", "14k-rose", "18k-yellow", "platinum"],
    sizes: ["4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "10", "11", "12"],
    engraving: true,
    leadTime: "Made to order · about 3 weeks",
    madeToOrder: true,
    description:
      "The star sits on the finger; the tail wraps a third of the way around the band in graduated settings.",
    specs: [
      { label: "Band", value: "2.1 mm, comfort fit" },
      { label: "Star", value: "9 mm across" },
      { label: "Hallmark", value: "AJ star, inside shank" },
    ],
    collections: ["family"],
    art: "ring",
  },
  {
    handle: "shooting-star-band",
    name: "Shooting Star Band",
    tier: "americana",
    design: "shooting-star",
    pieceType: "band",
    versions: americanaVersions(1600, 2200, 3900, "0.48 ct tw natural diamonds, F–G, VS"),
    metals: ["14k-yellow", "14k-white", "14k-rose", "18k-yellow", "platinum"],
    sizes: ["4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "10", "11", "12"],
    engraving: true,
    leadTime: "Made to order · about 3 weeks",
    madeToOrder: true,
    description: "A flat band with the star cut flush into its surface and the tail running on around the finger.",
    specs: [
      { label: "Band", value: "3.0 mm flat, comfort fit" },
      { label: "Hallmark", value: "AJ star, inside shank" },
    ],
    collections: ["family", "the-stack"],
    art: "band",
  },
  {
    handle: "shooting-star-pendant",
    name: "Shooting Star Pendant",
    tier: "americana",
    design: "shooting-star",
    pieceType: "pendant",
    versions: americanaVersions(1450, 1950, 3400, "0.40 ct tw natural diamonds, F–G, VS"),
    metals: ["14k-yellow", "14k-white", "14k-rose", "18k-yellow"],
    engraving: true,
    leadTime: "Made to order · about 3 weeks",
    madeToOrder: true,
    description: "The star hangs from its own tail; the chain runs through the last setting so the piece sits straight.",
    specs: [
      { label: "Star", value: "11 mm across" },
      { label: "Chain", value: "18 in, 1.2 mm cable, same metal" },
    ],
    collections: ["family"],
    art: "pendant",
  },
  {
    handle: "shooting-star-bracelet",
    name: "Shooting Star Bracelet",
    tier: "americana",
    design: "shooting-star",
    pieceType: "bracelet",
    versions: americanaVersions(2800, 3600, 6900, "1.10 ct tw natural diamonds, F–G, VS"),
    metals: ["14k-yellow", "14k-white", "14k-rose", "18k-yellow"],
    leadTime: "Made to order · about 4 weeks",
    madeToOrder: true,
    description: "Three stars in flight along a hand-made chain, each with its own tail.",
    specs: [
      { label: "Length", value: "6.5, 7 or 7.5 in" },
      { label: "Clasp", value: "Hidden box clasp with the AJ star" },
    ],
    collections: ["family"],
    art: "bracelet",
  },
  {
    handle: "shooting-star-signet",
    name: "Shooting Star Signet",
    tier: "americana",
    design: "shooting-star",
    pieceType: "signet",
    versions: americanaVersions(2200, 2900, 4400, "0.55 ct tw natural diamonds, F–G, VS"),
    metals: ["14k-yellow", "18k-yellow", "14k-white", "platinum"],
    sizes: ["6", "7", "8", "9", "10", "11", "12", "13"],
    engraving: true,
    leadTime: "Made to order · about 4 weeks",
    madeToOrder: true,
    description: "A heavy oval signet with the star cut into its face and the tail chased down the shoulder.",
    specs: [
      { label: "Face", value: "14 × 12 mm oval" },
      { label: "Weight", value: "about 14 g in 14k" },
    ],
    collections: ["signets", "family"],
    art: "signet",
  },
  {
    handle: "shooting-star-dog-tag",
    name: "Shooting Star Dog Tag",
    tier: "americana",
    design: "shooting-star",
    pieceType: "dog-tag",
    versions: americanaVersions(2400, 3100, 5200, "0.70 ct tw natural diamonds, F–G, VS"),
    metals: ["14k-yellow", "14k-white", "18k-yellow"],
    engraving: true,
    leadTime: "Made to order · about 3 weeks",
    madeToOrder: true,
    description: "A solid tag, 2 mm thick, with the star struck deep and the tail running off the edge.",
    specs: [
      { label: "Tag", value: "38 × 22 mm, 2 mm solid" },
      { label: "Chain", value: "22 in, 2 mm ball chain, same metal" },
    ],
    collections: ["family"],
    art: "dog-tag",
  },

  /* ---------------- Americana: Prism ---------------- */
  {
    handle: "prism-necklace",
    name: "Prism Link Necklace",
    tier: "americana",
    design: "prism",
    pieceType: "necklace",
    versions: americanaVersions(4200, 4900, 9800, "2.40 ct tw natural diamonds, F–G, VS"),
    metals: ["14k-yellow", "18k-yellow", "14k-white"],
    leadTime: "Made to order · about 5 weeks",
    madeToOrder: true,
    description: "Faceted links that interlock edge to edge. Every link cast, cleaned and polished by hand.",
    specs: [
      { label: "Length", value: "16, 18 or 20 in" },
      { label: "Link", value: "9 mm faceted, knife edge" },
    ],
    collections: [],
    art: "chain",
  },
  {
    handle: "prism-bracelet",
    name: "Prism Link Bracelet",
    tier: "americana",
    design: "prism",
    pieceType: "bracelet",
    versions: americanaVersions(2900, 3500, 6400, "1.30 ct tw natural diamonds, F–G, VS"),
    metals: ["14k-yellow", "18k-yellow", "14k-white"],
    leadTime: "Made to order · about 4 weeks",
    madeToOrder: true,
    description: "The necklace link at the wrist, with a hidden clasp that disappears into the faceting.",
    specs: [
      { label: "Length", value: "6.5, 7 or 7.5 in" },
      { label: "Clasp", value: "Hidden, with the AJ star" },
    ],
    collections: [],
    art: "bracelet",
  },
  {
    handle: "prism-signet",
    name: "Prism Signet",
    tier: "americana",
    design: "prism",
    pieceType: "signet",
    versions: americanaVersions(2400, 3000, 4600, "0.60 ct tw natural diamonds, F–G, VS"),
    metals: ["14k-yellow", "18k-yellow", "14k-white", "platinum"],
    sizes: ["6", "7", "8", "9", "10", "11", "12", "13"],
    engraving: true,
    leadTime: "Made to order · about 4 weeks",
    madeToOrder: true,
    description: "The whole face is one faceted field; the gemstone version sets a single stone at the center facet.",
    specs: [
      { label: "Face", value: "15 × 13 mm cushion" },
      { label: "Weight", value: "about 16 g in 14k" },
    ],
    collections: ["signets", "family"],
    art: "signet",
  },
  {
    handle: "prism-band",
    name: "Prism Band",
    tier: "americana",
    design: "prism",
    pieceType: "band",
    versions: americanaVersions(1700, 2300, 4100, "0.52 ct tw natural diamonds, F–G, VS"),
    metals: ["14k-yellow", "14k-white", "14k-rose", "18k-yellow", "platinum"],
    sizes: ["4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "10", "11", "12"],
    engraving: true,
    leadTime: "Made to order · about 3 weeks",
    madeToOrder: true,
    description: "A knife-edge band faceted all the way around.",
    specs: [{ label: "Band", value: "2.6 mm knife edge, comfort fit" }],
    collections: ["the-stack"],
    art: "band",
  },

  /* ---------------- New American ---------------- */
  {
    handle: "signal-solitaire",
    name: "Signal Solitaire",
    tier: "new-american",
    design: "signal",
    pieceType: "solitaire",
    family: "Solitaire",
    versions: [
      manMade("1.00 ct", 3200, "1.00 ct"),
      manMade("1.50 ct", 4800, "1.50 ct"),
      manMade("2.00 ct", 6400, "2.00 ct"),
    ],
    metals: ["14k-yellow", "14k-white", "14k-rose", "platinum"],
    sizes: ["4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9"],
    engraving: true,
    leadTime: "Made to order · about 2 weeks",
    madeToOrder: true,
    description:
      "One man made diamond, colorless and flawless to the loupe, on an open four-prong head. The same setting is available in Americana with a natural diamond.",
    specs: [
      { label: "Center", value: "Round brilliant man made diamond, D–F, VVS1–VVS2, Ideal cut, IGI report, laser inscribed" },
      { label: "Band", value: "1.8 mm knife edge" },
      { label: "Hallmark", value: "AJ line, inside shank" },
    ],
    collections: ["bridal"],
    art: "solitaire",
  },
  {
    handle: "signal-studs",
    name: "Signal Studs",
    tier: "new-american",
    design: "signal",
    pieceType: "studs",
    family: "Statement studs",
    versions: [
      manMade("1.00 ct tw", 900, "1.00 ct tw"),
      manMade("2.00 ct tw", 1900, "2.00 ct tw"),
      manMade("3.00 ct tw", 3400, "3.00 ct tw"),
    ],
    metals: ["14k-yellow", "14k-white", "14k-rose", "platinum"],
    leadTime: "Made to order · about 2 weeks",
    madeToOrder: true,
    description: "The Signal head as a stud: open on four sides, the stone the whole story.",
    specs: [
      { label: "Stones", value: "Matched pair, man made diamonds, D–F, VVS" },
      { label: "Backs", value: "Screw backs, same metal" },
    ],
    collections: [],
    art: "studs",
  },
  {
    handle: "grid-tennis-bracelet",
    name: "Grid Tennis Bracelet",
    tier: "new-american",
    design: "grid",
    pieceType: "tennis-bracelet",
    family: "Tennis",
    versions: [manMade("5.00 ct tw", 3000, "5.00 ct tw"), manMade("8.00 ct tw", 5200, "8.00 ct tw")],
    metals: ["14k-yellow", "14k-white", "14k-rose"],
    leadTime: "Made to order · about 2 weeks",
    madeToOrder: true,
    description: "Calibrated man made diamonds set edge to edge in a square grid. No gaps, no gallery.",
    specs: [
      { label: "Length", value: "6.5, 7 or 7.5 in" },
      { label: "Clasp", value: "Hidden box clasp with the AJ line, double safety" },
    ],
    collections: [],
    art: "tennis",
  },
  {
    handle: "grid-tennis-necklace",
    name: "Grid Tennis Necklace",
    tier: "new-american",
    design: "grid",
    pieceType: "tennis-necklace",
    family: "Tennis",
    versions: [manMade("12.00 ct tw", 8000, "12.00 ct tw")],
    metals: ["14k-yellow", "14k-white"],
    leadTime: "Made to order · about 3 weeks",
    madeToOrder: true,
    description: "The Grid line at the neck: one continuous field of light, 16 inches of it.",
    specs: [
      { label: "Length", value: "16 or 18 in" },
      { label: "Stones", value: "Calibrated 2.5 mm man made diamonds, D–F, VVS" },
    ],
    collections: [],
    art: "tennis",
  },
  {
    handle: "grid-eternity-band",
    name: "Grid Eternity Band",
    tier: "new-american",
    design: "grid",
    pieceType: "eternity-band",
    family: "Eternity & stack",
    versions: [manMade("2.00 ct tw", 1800, "2.00 ct tw")],
    metals: ["14k-yellow", "14k-white", "14k-rose", "platinum"],
    sizes: ["4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9"],
    leadTime: "Made to order · about 2 weeks",
    madeToOrder: true,
    description: "Man made diamonds all the way around, set in the Grid, with no visible metal between them.",
    specs: [
      { label: "Band", value: "2.4 mm" },
      { label: "Note", value: "Full eternity bands cannot be resized; we remake them" },
    ],
    collections: ["bridal", "the-stack"],
    art: "band",
  },
  {
    handle: "grid-stack-band",
    name: "Grid Stack Band",
    tier: "new-american",
    design: "grid",
    pieceType: "stack-band",
    family: "Eternity & stack",
    versions: [manMade("0.75 ct tw", 800, "0.75 ct tw")],
    metals: ["14k-yellow", "14k-white", "14k-rose"],
    sizes: ["4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9"],
    leadTime: "Made to order · about 2 weeks",
    madeToOrder: true,
    description: "A half-set thin band, made to stack. Buy one; add another on the next anniversary.",
    specs: [{ label: "Band", value: "1.6 mm" }],
    collections: ["the-stack"],
    art: "band",
  },
  {
    handle: "signal-mens-signet",
    name: "Signal Men's Signet",
    tier: "new-american",
    design: "signal",
    pieceType: "signet",
    family: "Men's",
    versions: [manMade("0.50 ct", 1900, "0.50 ct")],
    metals: ["14k-yellow", "14k-white", "platinum"],
    sizes: ["8", "9", "10", "11", "12", "13"],
    engraving: true,
    leadTime: "Made to order · about 3 weeks",
    madeToOrder: true,
    description: "A square signet with one man made diamond flush at the center of a brushed face.",
    specs: [
      { label: "Face", value: "13 mm square, brushed" },
      { label: "Weight", value: "about 15 g in 14k" },
    ],
    collections: ["signets"],
    art: "signet",
  },
  {
    handle: "grid-tennis-chain",
    name: "Grid Tennis Chain",
    tier: "new-american",
    design: "grid",
    pieceType: "chain",
    family: "Men's",
    versions: [manMade("10.00 ct tw", 7500, "10.00 ct tw")],
    metals: ["14k-yellow", "14k-white"],
    leadTime: "Made to order · about 3 weeks",
    madeToOrder: true,
    description: "The Grid at 20 inches with a heavier gauge and a double-locking clasp.",
    specs: [
      { label: "Length", value: "20 or 22 in" },
      { label: "Clasp", value: "Double-locking box, AJ line" },
    ],
    collections: [],
    art: "tennis",
  },
];

export const pieceByHandle = (handle: string) => PIECES.find((p) => p.handle === handle);
export const piecesForTier = (tier: TierSlug) => PIECES.filter((p) => p.tier === tier);
export const piecesForDesign = (design: string) => PIECES.filter((p) => p.design === design);
export const piecesForCollection = (slug: string) => PIECES.filter((p) => p.collections.includes(slug));

export const startingPrice = (p: Piece): number | null => {
  const prices = p.versions.map((v) => v.priceCents).filter((x): x is number => x !== null);
  return prices.length ? Math.min(...prices) : null;
};

export const formatPrice = (cents: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(cents / 100);

/* ------------------------------------------------------------------ */
/* Stores                                                              */
/* ------------------------------------------------------------------ */

export const STORES: Store[] = [
  {
    slug: "brentwood",
    name: "Brentwood",
    address1: "157 Franklin Road",
    city: "Brentwood",
    state: "TN",
    zip: "37027",
    phone: "(615) 457-2089",
    rating: 5.0,
    reviews: 995,
    role: "The salon. Royal American and bridal, by appointment.",
    hours: [
      { days: "Monday – Friday", open: "10 am – 6 pm" },
      { days: "Saturday", open: "10 am – 5 pm" },
      { days: "Sunday", open: "Closed" },
    ],
    mapQuery: "American Jewelry 157 Franklin Rd Brentwood TN 37027",
    services: ["Private viewing room", "Bridal fittings", "Custom commissions", "Engraving", "Appraisals"],
  },
  {
    slug: "mt-juliet",
    name: "Mt. Juliet",
    address1: "401 S Mt Juliet Road, Suite 165",
    city: "Mt. Juliet",
    state: "TN",
    zip: "37122",
    phone: "(615) 754-6046",
    rating: 4.9,
    reviews: 1542,
    role: "The workshop. Casting, setting, repair and lifetime care.",
    hours: [
      { days: "Monday – Friday", open: "10 am – 6 pm" },
      { days: "Saturday", open: "10 am – 5 pm" },
      { days: "Sunday", open: "Closed" },
    ],
    mapQuery: "American Jewelry 401 S Mt Juliet Rd Ste 165 Mt Juliet TN 37122",
    services: ["Workbench behind glass", "Lifetime cleaning and prong checks", "Resizing and repair", "Watch service", "Appraisals"],
  },
];

export const storeBySlug = (slug: string) => STORES.find((s) => s.slug === slug);
export const TOTAL_REVIEWS = STORES.reduce((n, s) => n + s.reviews, 0);

import type { Collection, Design, Piece, Store, Tier, TierSlug, Version } from "./types";

/* ------------------------------------------------------------------ */
/* Tiers                                                               */
/* ------------------------------------------------------------------ */

export const TIERS: Tier[] = [
  {
    slug: "royal-american",
    name: "Royal American",
    numeral: "I",
    tagline: "One of one. Never made again.",
    stones: "Natural diamonds and gemstones of exceptional character.",
    intro:
      "Royal American is our high jewelry collection: one-of-one designs, numbered in the registry and named for Tennessee places. Arrange a viewing to discuss the piece, its stones and its details.",
    pricing: "on-request",
    hallmark: "crown",
  },
  {
    slug: "americana",
    name: "Americana",
    numeral: "II",
    tagline: "Gold, gemstone and natural diamond.",
    stones: "Natural diamonds, solid gold, and family gemstones.",
    intro:
      "The signature designs of the house, drawn in Tennessee and worked in solid gold, birthstone and natural diamond. These are the pieces a family keeps: worn every day, handed down, and recognized across a room.",
    pricing: "listed",
    hallmark: "star",
  },
  {
    slug: "new-american",
    name: "New American",
    numeral: "III",
    tagline: "Lab-grown diamonds. The same hands.",
    stones: "Lab-grown diamonds, D to F color, VVS clarity, every one.",
    intro:
      "Lab-grown diamonds to one published standard: D to F, VVS, Ideal cut, an IGI report on every center stone. Set by the same hands that set everything else we make.",
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
  "concept": true,
  "slug": "meridian",
  "name": "Meridian",
  "tier": "americana",
  "motif": "An open oval in polished gold, interrupted by an emerald-cut green stone.",
  "story": "An open oval in polished gold, interrupted by an emerald-cut green stone. A proposed family of rings, pendants and earrings.",
  "signature": "An open oval in polished gold, interrupted by an emerald-cut green stone."
},
{
  "concept": true,
  "slug": "ribbon",
  "name": "Ribbon",
  "tier": "americana",
  "motif": "One broad gold ribbon folds back on itself, ending in a line of diamonds.",
  "story": "One broad gold ribbon folds back on itself, ending in a line of diamonds. A proposed family of rings, pendants and earrings.",
  "signature": "One broad gold ribbon folds back on itself, ending in a line of diamonds."
},
{
  "concept": true,
  "slug": "horizon",
  "name": "Horizon",
  "tier": "americana",
  "motif": "Two gold lines meet a bridge of three baguette diamonds.",
  "story": "Two gold lines meet a bridge of three baguette diamonds. A proposed family of rings, pendants and earrings.",
  "signature": "Two gold lines meet a bridge of three baguette diamonds."
},
{
  "concept": true,
  "slug": "petal",
  "name": "Petal",
  "tier": "americana",
  "motif": "Three curved gold petals gather around a blue sapphire.",
  "story": "Three curved gold petals gather around a blue sapphire. A proposed family of rings, pendants and earrings.",
  "signature": "Three curved gold petals gather around a blue sapphire."
},
  {
    slug: "shooting-star",
    name: "Shooting Star",
    tier: "americana",
    motif: "A five-point star with a trailing tail of graduated stones.",
    story:
      "The star is cut sharp; the tail falls away in a line of graduated settings that can hold diamonds, a single birthstone, or nothing at all.",
    signature: "Sharp five-point star, graduated tail, the house mark inside every shank.",
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

DESIGNS.sort((a, b) => Number(!!a.concept) - Number(!!b.concept));

export const designBySlug = (slug: string) => DESIGNS.find((d) => d.slug === slug);
export const designsForTier = (tier: TierSlug) => DESIGNS.filter((d) => d.tier === tier);

/* ------------------------------------------------------------------ */
/* Collections                                                         */
/* ------------------------------------------------------------------ */

export const COLLECTIONS: Collection[] = [
  {
    "slug": "family",
    "name": "Family",
    "intro": "For the people you carry with you.",
    "story": "Shooting Star, Prism, Meridian and Petal bring personal meaning to a shared family of forms. Ask the house about birthstones and engraving.",
    "crossTier": true
  },
  {
    "slug": "bridal",
    "name": "Bridal",
    "intro": "Rings for a promise. Jewelry for the day.",
    "story": "Explore engagement settings, wedding bands and a few finishing touches. Proposed designs are identified on each piece.",
    "crossTier": true
  },
  {
    "slug": "signets",
    "name": "Signets",
    "intro": "A personal mark, in gold.",
    "story": "Three interpretations of a familiar form: Shooting Star, Prism and Signal.",
    "crossTier": true
  },
  {
    "slug": "the-stack",
    "name": "The Stack",
    "intro": "One band. Then another.",
    "story": "Narrow bands and contrasting surfaces, collected into your own combination. Confirm the fit of your chosen pieces with the house.",
    "crossTier": true
  },
  {
    "slug": "everyday",
    "name": "Every Day",
    "intro": "The pieces you reach for first.",
    "story": "Pendants, bands and earrings with enough character to wear on their own.",
    "crossTier": true
  },
  {
    "slug": "statement",
    "name": "Statement Pieces",
    "intro": "A little more presence.",
    "story": "Sculptural forms, substantial links and expressive color.",
    "crossTier": true
  },
  {
    "slug": "gifts",
    "name": "Gifts",
    "intro": "Chosen with someone in mind.",
    "story": "Discover pendants, earrings and personal pieces across the house designs.",
    "crossTier": true
  },
  {
    "slug": "color",
    "name": "In Color",
    "intro": "Green, blue, and the stone that means something to you.",
    "story": "Birthstone versions of Shooting Star and Prism meet proposed emerald Meridian and sapphire Petal designs.",
    "crossTier": true
  }
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
  stones: `${spec} lab-grown diamond${spec.includes("tw") || spec.includes("stones") ? "s" : ""} (laboratory-grown), D to F, VVS, IGI report`,
  origin: "man-made",
});

export const PIECES: Piece[] = [
{
  "concept": true,
  "handle": "meridian-ring",
  "name": "Meridian Open Ring",
  "tier": "americana",
  "design": "meridian",
  "pieceType": "ring",
  "versions": [
    {
      "key": "gemstone",
      "name": "Colored gemstone concept",
      "priceCents": null,
      "stones": "Proposed emerald",
      "origin": "natural"
    }
  ],
  "metals": [
    "18k-yellow"
  ],
  "leadTime": "Design proposal; production details to be confirmed",
  "madeToOrder": false,
  "description": "A sculptural open oval of gold with a green emerald-cut stone.",
  "specs": [
    {
      "label": "Design",
      "value": "Proposed design; not an available product"
    },
    {
      "label": "Metal",
      "value": "18k yellow gold proposed"
    },
    {
      "label": "Stone",
      "value": "Emerald proposed"
    }
  ],
  "collections": [
    "family",
    "everyday",
    "statement",
    "color"
  ],
  "art": "ring"
},
{
  "concept": true,
  "handle": "meridian-pendant",
  "name": "Meridian Pendant",
  "tier": "americana",
  "design": "meridian",
  "pieceType": "pendant",
  "versions": [
    {
      "key": "gemstone",
      "name": "Colored gemstone concept",
      "priceCents": null,
      "stones": "Proposed emerald",
      "origin": "natural"
    }
  ],
  "metals": [
    "18k-yellow"
  ],
  "leadTime": "Design proposal; production details to be confirmed",
  "madeToOrder": false,
  "description": "An open gold oval, finished with a green emerald-cut stone.",
  "specs": [
    {
      "label": "Design",
      "value": "Proposed design; not an available product"
    },
    {
      "label": "Metal",
      "value": "18k yellow gold proposed"
    },
    {
      "label": "Stone",
      "value": "Emerald proposed"
    }
  ],
  "collections": [
    "family",
    "everyday",
    "gifts",
    "color"
  ],
  "art": "pendant"
},
{
  "concept": true,
  "handle": "meridian-earrings",
  "name": "Meridian Earrings",
  "tier": "americana",
  "design": "meridian",
  "pieceType": "earrings",
  "versions": [
    {
      "key": "gemstone",
      "name": "Colored gemstone concept",
      "priceCents": null,
      "stones": "Proposed emerald",
      "origin": "natural"
    }
  ],
  "metals": [
    "18k-yellow"
  ],
  "leadTime": "Design proposal; production details to be confirmed",
  "madeToOrder": false,
  "description": "Paired open gold ovals with green emerald-cut accents.",
  "specs": [
    {
      "label": "Design",
      "value": "Proposed design; not an available product"
    },
    {
      "label": "Metal",
      "value": "18k yellow gold proposed"
    },
    {
      "label": "Stone",
      "value": "Emerald proposed"
    }
  ],
  "collections": [
    "family",
    "statement",
    "gifts",
    "color"
  ],
  "art": "studs"
},
{
  "concept": true,
  "handle": "ribbon-ring",
  "name": "Ribbon Fold Ring",
  "tier": "americana",
  "design": "ribbon",
  "pieceType": "ring",
  "versions": [
    {
      "key": "diamond",
      "name": "Diamond concept",
      "priceCents": null,
      "stones": "Proposed natural diamonds",
      "origin": "natural"
    }
  ],
  "metals": [
    "18k-yellow"
  ],
  "leadTime": "Design proposal; production details to be confirmed",
  "madeToOrder": false,
  "description": "A folded gold ribbon with a short diamond-set edge.",
  "specs": [
    {
      "label": "Design",
      "value": "Proposed design; not an available product"
    },
    {
      "label": "Metal",
      "value": "18k yellow gold proposed"
    },
    {
      "label": "Stone",
      "value": "Natural diamonds proposed"
    }
  ],
  "collections": [
    "bridal",
    "statement",
    "gifts"
  ],
  "art": "ring"
},
{
  "concept": true,
  "handle": "ribbon-pendant",
  "name": "Ribbon Pendant",
  "tier": "americana",
  "design": "ribbon",
  "pieceType": "pendant",
  "versions": [
    {
      "key": "diamond",
      "name": "Diamond concept",
      "priceCents": null,
      "stones": "Proposed natural diamonds",
      "origin": "natural"
    }
  ],
  "metals": [
    "18k-yellow"
  ],
  "leadTime": "Design proposal; production details to be confirmed",
  "madeToOrder": false,
  "description": "A single fold of gold, tipped with diamonds.",
  "specs": [
    {
      "label": "Design",
      "value": "Proposed design; not an available product"
    },
    {
      "label": "Metal",
      "value": "18k yellow gold proposed"
    },
    {
      "label": "Stone",
      "value": "Natural diamonds proposed"
    }
  ],
  "collections": [
    "everyday",
    "statement",
    "gifts"
  ],
  "art": "pendant"
},
{
  "concept": true,
  "handle": "ribbon-earrings",
  "name": "Ribbon Earrings",
  "tier": "americana",
  "design": "ribbon",
  "pieceType": "earrings",
  "versions": [
    {
      "key": "diamond",
      "name": "Diamond concept",
      "priceCents": null,
      "stones": "Proposed natural diamonds",
      "origin": "natural"
    }
  ],
  "metals": [
    "18k-yellow"
  ],
  "leadTime": "Design proposal; production details to be confirmed",
  "madeToOrder": false,
  "description": "Sculptural gold folds with diamond-set tips.",
  "specs": [
    {
      "label": "Design",
      "value": "Proposed design; not an available product"
    },
    {
      "label": "Metal",
      "value": "18k yellow gold proposed"
    },
    {
      "label": "Stone",
      "value": "Natural diamonds proposed"
    }
  ],
  "collections": [
    "bridal",
    "statement",
    "gifts"
  ],
  "art": "studs"
},
{
  "concept": true,
  "handle": "horizon-ring",
  "name": "Horizon Band",
  "tier": "americana",
  "design": "horizon",
  "pieceType": "ring",
  "versions": [
    {
      "key": "diamond",
      "name": "Diamond concept",
      "priceCents": null,
      "stones": "Proposed natural diamonds",
      "origin": "natural"
    }
  ],
  "metals": [
    "18k-yellow"
  ],
  "leadTime": "Design proposal; production details to be confirmed",
  "madeToOrder": false,
  "description": "Twin gold rails with a bridge of baguette diamonds.",
  "specs": [
    {
      "label": "Design",
      "value": "Proposed design; not an available product"
    },
    {
      "label": "Metal",
      "value": "18k yellow gold proposed"
    },
    {
      "label": "Stone",
      "value": "Natural diamonds proposed"
    }
  ],
  "collections": [
    "bridal",
    "the-stack",
    "everyday"
  ],
  "art": "ring"
},
{
  "concept": true,
  "handle": "horizon-pendant",
  "name": "Horizon Bar Pendant",
  "tier": "americana",
  "design": "horizon",
  "pieceType": "pendant",
  "versions": [
    {
      "key": "diamond",
      "name": "Diamond concept",
      "priceCents": null,
      "stones": "Proposed natural diamonds",
      "origin": "natural"
    }
  ],
  "metals": [
    "18k-yellow"
  ],
  "leadTime": "Design proposal; production details to be confirmed",
  "madeToOrder": false,
  "description": "Two gold lines, joined by three baguette diamonds.",
  "specs": [
    {
      "label": "Design",
      "value": "Proposed design; not an available product"
    },
    {
      "label": "Metal",
      "value": "18k yellow gold proposed"
    },
    {
      "label": "Stone",
      "value": "Natural diamonds proposed"
    }
  ],
  "collections": [
    "everyday",
    "gifts",
    "statement"
  ],
  "art": "pendant"
},
{
  "concept": true,
  "handle": "horizon-earrings",
  "name": "Horizon Huggies",
  "tier": "americana",
  "design": "horizon",
  "pieceType": "earrings",
  "versions": [
    {
      "key": "diamond",
      "name": "Diamond concept",
      "priceCents": null,
      "stones": "Proposed natural diamonds",
      "origin": "natural"
    }
  ],
  "metals": [
    "18k-yellow"
  ],
  "leadTime": "Design proposal; production details to be confirmed",
  "madeToOrder": false,
  "description": "Small double-rail gold hoops with baguette-diamond bridges.",
  "specs": [
    {
      "label": "Design",
      "value": "Proposed design; not an available product"
    },
    {
      "label": "Metal",
      "value": "18k yellow gold proposed"
    },
    {
      "label": "Stone",
      "value": "Natural diamonds proposed"
    }
  ],
  "collections": [
    "bridal",
    "everyday",
    "gifts"
  ],
  "art": "studs"
},
{
  "concept": true,
  "handle": "petal-ring",
  "name": "Petal Sapphire Ring",
  "tier": "americana",
  "design": "petal",
  "pieceType": "ring",
  "versions": [
    {
      "key": "gemstone",
      "name": "Colored gemstone concept",
      "priceCents": null,
      "stones": "Proposed blue sapphire",
      "origin": "natural"
    }
  ],
  "metals": [
    "18k-yellow"
  ],
  "leadTime": "Design proposal; production details to be confirmed",
  "madeToOrder": false,
  "description": "Three curved gold petals around a blue sapphire.",
  "specs": [
    {
      "label": "Design",
      "value": "Proposed design; not an available product"
    },
    {
      "label": "Metal",
      "value": "18k yellow gold proposed"
    },
    {
      "label": "Stone",
      "value": "Blue sapphire proposed"
    }
  ],
  "collections": [
    "family",
    "statement",
    "gifts",
    "color"
  ],
  "art": "ring"
},
{
  "concept": true,
  "handle": "petal-pendant",
  "name": "Petal Pendant",
  "tier": "americana",
  "design": "petal",
  "pieceType": "pendant",
  "versions": [
    {
      "key": "gemstone",
      "name": "Colored gemstone concept",
      "priceCents": null,
      "stones": "Proposed blue sapphire",
      "origin": "natural"
    }
  ],
  "metals": [
    "18k-yellow"
  ],
  "leadTime": "Design proposal; production details to be confirmed",
  "madeToOrder": false,
  "description": "A small sculptural gold flower with a sapphire center.",
  "specs": [
    {
      "label": "Design",
      "value": "Proposed design; not an available product"
    },
    {
      "label": "Metal",
      "value": "18k yellow gold proposed"
    },
    {
      "label": "Stone",
      "value": "Blue sapphire proposed"
    }
  ],
  "collections": [
    "family",
    "everyday",
    "gifts",
    "color"
  ],
  "art": "pendant"
},
{
  "concept": true,
  "handle": "petal-earrings",
  "name": "Petal Earrings",
  "tier": "americana",
  "design": "petal",
  "pieceType": "earrings",
  "versions": [
    {
      "key": "gemstone",
      "name": "Colored gemstone concept",
      "priceCents": null,
      "stones": "Proposed blue sapphire",
      "origin": "natural"
    }
  ],
  "metals": [
    "18k-yellow"
  ],
  "leadTime": "Design proposal; production details to be confirmed",
  "madeToOrder": false,
  "description": "Gold petals with deep-blue sapphire centers.",
  "specs": [
    {
      "label": "Design",
      "value": "Proposed design; not an available product"
    },
    {
      "label": "Metal",
      "value": "18k yellow gold proposed"
    },
    {
      "label": "Stone",
      "value": "Blue sapphire proposed"
    }
  ],
  "collections": [
    "family",
    "bridal",
    "gifts",
    "color"
  ],
  "art": "studs"
},
  /* ---------------- Royal American: one of one ---------------- */
  {
    handle: "no-001-the-cumberland",
    name: "The Cumberland",
    tier: "royal-american",
    design: "royal",
    pieceType: "ring",
    oneOfOne: { number: "001", registered: false },
    versions: [{ key: "diamond", name: "Natural diamond", priceCents: null, stones: "Illustrative: 5.02 ct natural diamond; individual report unconfirmed", origin: "natural" }],
    metals: ["platinum"],
    leadTime: "Viewing and availability by inquiry",
    madeToOrder: false,
    description:
      "A round brilliant in sculpted platinum. A Royal American registry concept.",
    specs: [
      { label: "Center", value: "Illustrative specification: 5.02 ct round brilliant, D, IF. Actual report to be confirmed." },
      { label: "Metal", value: "Platinum 950" },
      { label: "Registry", value: "Royal American No. 001" },
    ],
    collections: [],
    art: "solitaire",
  },
  {
    handle: "no-002-tennessee-star",
    name: "Tennessee Star",
    tier: "royal-american",
    design: "royal",
    pieceType: "necklace",
    oneOfOne: { number: "002", registered: false },
    versions: [{ key: "diamond", name: "Sapphire and diamond", priceCents: null, stones: "Illustrative: 12.40 ct sapphire and 6.10 ct tw natural diamonds", origin: "natural" }],
    metals: ["platinum"],
    leadTime: "Viewing and availability by inquiry",
    madeToOrder: false,
    description:
      "A blue sapphire at the center of a five-point diamond star. A Royal American registry concept.",
    specs: [
      { label: "Center", value: "Illustrative: 12.40 ct sapphire. Origin and treatment unconfirmed." },
      { label: "Diamonds", value: "Illustrative: 6.10 ct tw diamonds. Individual reports unconfirmed." },
      { label: "Registry", value: "Royal American No. 002" },
    ],
    collections: [],
    art: "necklace",
  },
  {
    handle: "no-003-the-harpeth",
    name: "The Harpeth",
    tier: "royal-american",
    design: "royal",
    pieceType: "bracelet",
    oneOfOne: { number: "003", registered: false },
    versions: [{ key: "diamond", name: "Natural diamond", priceCents: null, stones: "Illustrative: 14.8 ct tw natural diamonds", origin: "natural" }],
    metals: ["18k-yellow"],
    leadTime: "Viewing and availability by inquiry",
    madeToOrder: false,
    description: "Graduated diamonds in a flowing line of gold. A Royal American registry concept.",
    specs: [
      { label: "Diamonds", value: "Illustrative: 14.8 ct tw diamonds. Count and grading unconfirmed." },
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
    versions: americanaVersions(1900, 2600, 4800, "0.62 ct tw natural diamonds, F to G, VS"),
    metals: ["14k-yellow", "14k-white", "14k-rose", "18k-yellow", "platinum"],
    sizes: ["4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "10", "11", "12"],
    engraving: true,
    leadTime: "Made to order, about 3 weeks",
    madeToOrder: true,
    description:
      "The star sits on the finger; the tail wraps a third of the way around the band in graduated settings.",
    specs: [
      { label: "Band", value: "2.1 mm, comfort fit" },
      { label: "Star", value: "9 mm across" },
      { label: "Hallmark", value: "Karat mark, inside the shank" },
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
    versions: americanaVersions(1600, 2200, 3900, "0.48 ct tw natural diamonds, F to G, VS"),
    metals: ["14k-yellow", "14k-white", "14k-rose", "18k-yellow", "platinum"],
    sizes: ["4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "10", "11", "12"],
    engraving: true,
    leadTime: "Made to order, about 3 weeks",
    madeToOrder: true,
    description: "A flat band with the star cut flush into its surface and the tail running on around the finger.",
    specs: [
      { label: "Band", value: "3.0 mm flat, comfort fit" },
      { label: "Hallmark", value: "Karat mark, inside the shank" },
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
    versions: americanaVersions(1450, 1950, 3400, "0.40 ct tw natural diamonds, F to G, VS"),
    metals: ["14k-yellow", "14k-white", "14k-rose", "18k-yellow"],
    engraving: true,
    leadTime: "Made to order, about 3 weeks",
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
    versions: americanaVersions(2800, 3600, 6900, "1.10 ct tw natural diamonds, F to G, VS"),
    metals: ["14k-yellow", "14k-white", "14k-rose", "18k-yellow"],
    leadTime: "Made to order, about 4 weeks",
    madeToOrder: true,
    description: "Three stars in flight along a chain, each star with its own tail.",
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
    versions: americanaVersions(2200, 2900, 4400, "0.55 ct tw natural diamonds, F to G, VS"),
    metals: ["14k-yellow", "18k-yellow", "14k-white", "platinum"],
    sizes: ["6", "7", "8", "9", "10", "11", "12", "13"],
    engraving: true,
    leadTime: "Made to order, about 4 weeks",
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
    versions: americanaVersions(2400, 3100, 5200, "0.70 ct tw natural diamonds, F to G, VS"),
    metals: ["14k-yellow", "14k-white", "18k-yellow"],
    engraving: true,
    leadTime: "Made to order, about 3 weeks",
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
    versions: americanaVersions(4200, 4900, 9800, "2.40 ct tw natural diamonds, F to G, VS"),
    metals: ["14k-yellow", "18k-yellow", "14k-white"],
    leadTime: "Made to order, about 5 weeks",
    madeToOrder: true,
    description: "Faceted links that interlock edge to edge, every link cast, cleaned and polished.",
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
    versions: americanaVersions(2900, 3500, 6400, "1.30 ct tw natural diamonds, F to G, VS"),
    metals: ["14k-yellow", "18k-yellow", "14k-white"],
    leadTime: "Made to order, about 4 weeks",
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
    versions: americanaVersions(2400, 3000, 4600, "0.60 ct tw natural diamonds, F to G, VS"),
    metals: ["14k-yellow", "18k-yellow", "14k-white", "platinum"],
    sizes: ["6", "7", "8", "9", "10", "11", "12", "13"],
    engraving: true,
    leadTime: "Made to order, about 4 weeks",
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
    versions: americanaVersions(1700, 2300, 4100, "0.52 ct tw natural diamonds, F to G, VS"),
    metals: ["14k-yellow", "14k-white", "14k-rose", "18k-yellow", "platinum"],
    sizes: ["4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "10", "11", "12"],
    engraving: true,
    leadTime: "Made to order, about 3 weeks",
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
    leadTime: "Made to order, about 2 weeks",
    madeToOrder: true,
    description:
      "One lab-grown diamond on an open four-prong head; the same setting takes a natural diamond in Americana.",
    specs: [
      { label: "Center", value: "Round brilliant lab-grown diamond, D to F, VVS1 to VVS2, Ideal cut, IGI report, laser inscribed" },
      { label: "Band", value: "1.8 mm knife edge" },
      { label: "Hallmark", value: "Karat mark, inside the shank" },
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
    leadTime: "Made to order, about 2 weeks",
    madeToOrder: true,
    description: "The Signal head as a stud: open on four sides, the stone the whole story.",
    specs: [
      { label: "Stones", value: "Matched pair, lab-grown diamonds, D to F, VVS" },
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
    leadTime: "Made to order, about 2 weeks",
    madeToOrder: true,
    description: "Calibrated lab-grown diamonds set edge to edge in a square grid. No gaps, no gallery.",
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
    leadTime: "Made to order, about 3 weeks",
    madeToOrder: true,
    description: "The Grid line at the neck: one continuous field of light, 16 inches of it.",
    specs: [
      { label: "Length", value: "16 or 18 in" },
      { label: "Stones", value: "Calibrated 2.5 mm lab-grown diamonds, D to F, VVS" },
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
    leadTime: "Made to order, about 2 weeks",
    madeToOrder: true,
    description: "Lab-grown diamonds all the way around, set in the Grid, with no visible metal between them.",
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
    leadTime: "Made to order, about 2 weeks",
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
    leadTime: "Made to order, about 3 weeks",
    madeToOrder: true,
    description: "A square signet with one lab-grown diamond flush at the center of a brushed face.",
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
    leadTime: "Made to order, about 3 weeks",
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

// Preserve the established product reference sequence; proposals follow existing pieces.
PIECES.sort((a, b) => Number(!!a.concept) - Number(!!b.concept));
const curatedEdits: Record<string, string[]> = {
  "family": [
    "shooting-star-ring",
    "shooting-star-band",
    "shooting-star-pendant",
    "shooting-star-bracelet",
    "shooting-star-signet",
    "shooting-star-dog-tag",
    "prism-necklace",
    "prism-bracelet",
    "prism-signet",
    "prism-band"
  ],
  "everyday": [
    "shooting-star-ring",
    "shooting-star-pendant",
    "prism-band",
    "signal-studs",
    "grid-stack-band"
  ],
  "statement": [
    "prism-necklace",
    "prism-bracelet",
    "prism-signet",
    "grid-tennis-necklace",
    "grid-tennis-chain"
  ],
  "gifts": [
    "shooting-star-pendant",
    "shooting-star-bracelet",
    "prism-necklace",
    "signal-studs"
  ],
  "color": [
    "shooting-star-ring",
    "shooting-star-band",
    "shooting-star-pendant",
    "shooting-star-bracelet",
    "shooting-star-signet",
    "shooting-star-dog-tag",
    "prism-necklace",
    "prism-bracelet",
    "prism-signet",
    "prism-band"
  ]
};
for (const [collection, handles] of Object.entries(curatedEdits)) {
  for (const piece of PIECES) if (handles.includes(piece.handle) && !piece.collections.includes(collection)) piece.collections.push(collection);
}

export const pieceByHandle = (handle: string) => PIECES.find((p) => p.handle === handle);

const TIER_CODE: Record<TierSlug, string> = { "royal-american": "RA", americana: "AM", "new-american": "NA" };
/** The house reference for a piece: tier code plus its number in the catalog, stable for as long as the order holds. */
export const pieceRef = (p: Piece) => `${TIER_CODE[p.tier]} ${String(PIECES.indexOf(p) + 1).padStart(3, "0")}`;
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
    role: "Fine jewelry and a working shop visible to customers.",
    hours: [
      { days: "Monday - Friday", open: "10 am - 6 pm" },
      { days: "Saturday", open: "10 am - 5 pm" },
      { days: "Sunday", open: "Closed" },
    ],
    hoursConfirmed: false,
    mapQuery: "American Jewelry 157 Franklin Rd Brentwood TN 37027",
    lat: 36.03433,
    lng: -86.78828,
    photo: "box-peach",
    place: "On Franklin Road in Brentwood.",
    expect:
      "Our Brentwood shop is visible to customers. Tell us what you would like to see when you arrange your visit. We can discuss bridal settings, a commission or a Royal American viewing and confirm what is available.",
    services: ["Private viewing appointments", "Bridal fittings", "Custom commissions", "Engraving", "Appraisals"],
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
    role: "Fine jewelry and a working shop visible to customers.",
    hours: [
      { days: "Monday - Friday", open: "10 am - 6 pm" },
      { days: "Saturday", open: "10 am - 5 pm" },
      { days: "Sunday", open: "Closed" },
    ],
    hoursConfirmed: false,
    mapQuery: "American Jewelry 401 S Mt Juliet Rd Ste 165 Mt Juliet TN 37122",
    lat: 36.16746,
    lng: -86.50746,
    photo: "bench",
    place: "Suite 165 at Providence Marketplace, off South Mt. Juliet Road.",
    expect:
      "Our Mt. Juliet shop is visible to customers. Bring your piece or your ideas. Contact the store to discuss a repair, cleaning, a new design or an appointment; we will confirm the service and timing.",
    services: ["Cleaning and inspection", "Resizing and repair", "Watch service", "Appraisals"],
  },
];

export const storeBySlug = (slug: string) => STORES.find((s) => s.slug === slug);
export const TOTAL_REVIEWS = STORES.reduce((n, s) => n + s.reviews, 0);

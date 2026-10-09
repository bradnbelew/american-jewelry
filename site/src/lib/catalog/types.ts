/**
 * Catalog model for American Jewelry.
 *
 * Hierarchy: Tier → Design (motif) → Piece type → Version, with Collections curated across designs.
 * Shaped so it maps 1:1 onto Shopify later:
 *   Tier, Design, Collection → Shopify metaobjects + collections
 *   Piece (one design × one piece type)  → Shopify product
 *   Version × metal (× size)             → Shopify variants, with line-item properties for engraving/size
 */

export type TierSlug = "royal-american" | "americana" | "new-american";

export type StoneOrigin = "natural" | "man-made" | "none";

export interface Tier {
  slug: TierSlug;
  name: string;
  numeral: "I" | "II" | "III";
  tagline: string;
  stones: string; // plain-English stone promise
  intro: string;
  pricing: "on-request" | "listed";
  hallmark: "crown" | "star" | "line";
}

export interface Design {
  slug: string;
  name: string;
  tier: TierSlug;
  motif: string; // what the design is, in one line
  story: string;
  signature: string; // the consistent style property every piece carries
}

export type PieceType =
  | "ring"
  | "band"
  | "pendant"
  | "necklace"
  | "bracelet"
  | "signet"
  | "dog-tag"
  | "earrings"
  | "studs"
  | "solitaire"
  | "tennis-bracelet"
  | "tennis-necklace"
  | "eternity-band"
  | "stack-band"
  | "chain";

export type VersionKey = "gold" | "gemstone" | "diamond" | "man-made";

export interface Version {
  key: VersionKey;
  name: string; // e.g. "Solid gold", "Birthstone", "Natural diamond", "Man made diamond"
  priceCents: number | null; // null = price on request
  stones?: string; // e.g. "0.42 ct natural diamonds, F–G, VS"
  origin: StoneOrigin;
}

export type Metal = "14k-yellow" | "14k-white" | "14k-rose" | "18k-yellow" | "platinum";

export interface Piece {
  handle: string;
  name: string;
  tier: TierSlug;
  design: string; // Design.slug; one-of-ones use "royal"
  pieceType: PieceType;
  family?: string; // New American product family (Solitaire, Tennis, …)
  oneOfOne?: { number: string; registered: boolean };
  versions: Version[];
  metals: Metal[];
  sizes?: string[];
  engraving?: boolean;
  leadTime: string;
  madeToOrder: boolean;
  description: string;
  specs: { label: string; value: string }[];
  collections: string[]; // Collection.slug
  art: ArtKey; // placeholder illustration key until photography exists
}

export type ArtKey =
  | "ring"
  | "band"
  | "pendant"
  | "necklace"
  | "bracelet"
  | "signet"
  | "dog-tag"
  | "studs"
  | "solitaire"
  | "tennis"
  | "chain";

export interface Collection {
  slug: string;
  name: string;
  intro: string;
  story: string;
  crossTier: boolean;
}

export interface Store {
  slug: "brentwood" | "mt-juliet";
  name: string;
  address1: string;
  city: string;
  state: "TN";
  zip: string;
  phone: string;
  rating: number;
  reviews: number;
  role: string;
  hours: { days: string; open: string }[];
  mapQuery: string;
  services: string[];
}

export const METAL_LABEL: Record<Metal, string> = {
  "14k-yellow": "14k yellow gold",
  "14k-white": "14k white gold",
  "14k-rose": "14k rose gold",
  "18k-yellow": "18k yellow gold",
  platinum: "Platinum",
};

export const PIECE_TYPE_LABEL: Record<PieceType, string> = {
  ring: "Ring",
  band: "Band",
  pendant: "Pendant",
  necklace: "Necklace",
  bracelet: "Bracelet",
  signet: "Signet ring",
  "dog-tag": "Dog tag",
  earrings: "Earrings",
  studs: "Studs",
  solitaire: "Solitaire",
  "tennis-bracelet": "Tennis bracelet",
  "tennis-necklace": "Tennis necklace",
  "eternity-band": "Eternity band",
  "stack-band": "Stack band",
  chain: "Chain",
};

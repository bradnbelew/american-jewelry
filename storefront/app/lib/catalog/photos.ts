/**
 * Photography map. Images are the family's own product photography from american.jewelry,
 * standing in until the new designs are shot. Replace paths here; nothing else changes.
 * `float`: a packshot on white that sits on the page's own ground (multiply), so there is no tile edge.
 * `contain`: a packshot already on the paper, shown whole in its frame (product first frames).
 * `comp-*` keys are generated layout comps the owner allowed for the private mockup only (decisions 2026-10-13);
 * every one is listed in docs/briefs/PHOTOS-TODO.md and must be replaced by a photograph before SITE_LIVE.
 */
export const PHOTO: Record<string, { src: string; alt: string; w: number; h: number; float?: boolean; contain?: boolean }> = {
  "hero-box": { src: "/photos/hero-box.jpg", alt: "Gold signet rings and a chain in a navy velvet box", w: 2400, h: 1854, float: true },
  "hero-hand": { src: "/photos/hero-hand.jpg", alt: "A hand wearing stacked gold and diamond rings", w: 2000, h: 875 },
  names: { src: "/photos/names.jpg", alt: "Gold name necklaces on white linen", w: 2000, h: 875, float: true },
  "box-peach": { src: "/photos/box-peach.jpg", alt: "Earrings and necklaces in a jewelry box", w: 2000, h: 875 },
  "ring-radiant": { src: "/photos/ring-radiant.jpg", alt: "A radiant-cut diamond on a star-set gold band", w: 1050, h: 800, float: true },
  "ring-halo": { src: "/photos/ring-halo.jpg", alt: "An emerald-cut diamond ring with a baguette halo", w: 2000, h: 1546, float: true },
  bench: { src: "/photos/bench.jpg", alt: "Loose diamonds and a grading chart on the bench", w: 2000, h: 1546 },
  "tristar-charm": { src: "/photos/tristar-charm.jpg", alt: "Gold Tennessee tri-star medallion on a chain", w: 1400, h: 1400, float: true },
  "huggie-diamond": { src: "/photos/huggie-diamond.jpg", alt: "Diamond huggie hoops in gold", w: 1400, h: 1400, float: true },
  "name-riley": { src: "/photos/name-riley.jpg", alt: "A gold script name necklace", w: 1400, h: 1400, float: true },
  "huggie-baguette": { src: "/photos/huggie-baguette.jpg", alt: "Baguette diamond huggies in gold", w: 1400, h: 1400, float: true },
  "trio-studs": { src: "/photos/trio-studs.jpg", alt: "Three-stone diamond studs", w: 1400, h: 1400, float: true },
  "script-ring": { src: "/photos/script-ring.jpg", alt: "A gold script ring", w: 1400, h: 1400, float: true },
  "gem-studs": { src: "/photos/gem-studs.jpg", alt: "Birthstone studs in gold", w: 1400, h: 1400, float: true },
  "gem-stack-rings": { src: "/photos/gem-stack-rings.jpg", alt: "Bezel-set gemstone stacking rings", w: 1400, h: 1400, float: true },
  "name-cohen": { src: "/photos/name-cohen.jpg", alt: "A diamond block-letter name necklace", w: 1400, h: 1400, float: true },
  "name-ring": { src: "/photos/name-ring.jpg", alt: "A gold name ring on a crystal", w: 1400, h: 1400 },
  cross: { src: "/photos/cross.jpg", alt: "A textured gold cross pendant", w: 1400, h: 1400, float: true },
  "initial-necklace": { src: "/photos/initial-necklace.jpg", alt: "A diamond initial necklace with a gemstone", w: 1400, h: 1400, float: true },
  "paperclip-bracelet": { src: "/photos/paperclip-bracelet.jpg", alt: "A gold paperclip bracelet with an engraved bar", w: 1400, h: 1400, float: true },
  "bezel-studs": { src: "/photos/bezel-studs.jpg", alt: "Bezel-set diamond studs", w: 1400, h: 1400, float: true },
  "signet-b": { src: "/photos/signet-b.jpg", alt: "A gold oval signet engraved with a B", w: 1400, h: 1400, float: true },
  medallion: { src: "/photos/medallion.jpg", alt: "A beaded gold disc pendant", w: 1400, h: 1400, float: true },
  // Layout comps (AI-generated, mockup only; see PHOTOS-TODO). Keys stay when the photographs replace them.
  "comp-home-hand": { src: "/photos/comp-home-hand.webp", alt: "A hand on linen in window light, wearing the Shooting Star ring in yellow gold", w: 1448, h: 1086 },
  "comp-home-hand-tall": { src: "/photos/comp-home-hand-tall.webp", alt: "A hand on linen in window light, wearing the Shooting Star ring in yellow gold", w: 1122, h: 1402 },
  "comp-cumberland-velvet": { src: "/photos/comp-cumberland-velvet.webp", alt: "A platinum solitaire standing in a navy velvet tray under one lamp", w: 1448, h: 1086 },
  "comp-americana-ground": { src: "/photos/comp-americana-ground.webp", alt: "The Shooting Star ring in yellow gold on deep green leather", w: 1448, h: 1086 },
  "comp-new-american-opener": { src: "/photos/comp-new-american-opener.webp", alt: "A platinum solitaire on pale limestone in north light", w: 1536, h: 1024 },
  "comp-signal-packshot": { src: "/photos/comp-signal-packshot.webp", alt: "The Signal solitaire in platinum, three-quarter view, on paper", w: 1374, h: 1145, contain: true },
  "comp-signal-hand": { src: "/photos/comp-signal-hand.webp", alt: "The Signal solitaire worn on a hand, on linen in daylight", w: 1448, h: 1086 },
  "comp-the-box": { src: "/photos/comp-the-box.webp", alt: "The navy velvet box, open, with a yellow gold ring inside, on paper", w: 1448, h: 1086 },
  "comp-bench-hands": { src: "/photos/comp-bench-hands.webp", alt: "A jeweler's hands at the bench, setting a stone in a ring held in a clamp", w: 1536, h: 1024 },
};

export const PIECE_PHOTOS: Record<string, string[]> = {
  "no-001-the-cumberland": ["comp-cumberland-velvet", "ring-radiant", "ring-halo"],
  "no-002-tennessee-star": ["tristar-charm", "names", "medallion"],
  "no-003-the-harpeth": ["paperclip-bracelet", "hero-box"],
  "shooting-star-ring": ["comp-americana-ground", "comp-home-hand", "gem-stack-rings"],
  "shooting-star-band": ["script-ring", "hero-hand"],
  "shooting-star-pendant": ["tristar-charm", "medallion", "names"],
  "shooting-star-bracelet": ["paperclip-bracelet", "hero-box"],
  "shooting-star-signet": ["signet-b", "hero-box"],
  "shooting-star-dog-tag": ["medallion", "cross"],
  "prism-necklace": ["initial-necklace", "names", "name-cohen"],
  "prism-bracelet": ["paperclip-bracelet", "hero-box"],
  "prism-signet": ["signet-b", "hero-box"],
  "prism-band": ["gem-stack-rings", "hero-hand"],
  "signal-solitaire": ["comp-signal-packshot", "comp-signal-hand", "ring-halo"],
  "signal-studs": ["bezel-studs", "trio-studs"],
  "grid-tennis-bracelet": ["huggie-diamond", "paperclip-bracelet"],
  "grid-tennis-necklace": ["huggie-baguette", "names"],
  "grid-eternity-band": ["huggie-diamond", "hero-hand"],
  "grid-stack-band": ["gem-stack-rings", "hero-hand"],
  "signal-mens-signet": ["signet-b", "hero-box"],
  "grid-tennis-chain": ["paperclip-bracelet", "cross"],
};

export const TIER_PHOTO: Record<string, string> = {
  "royal-american": "comp-cumberland-velvet",
  americana: "comp-americana-ground",
  "new-american": "comp-new-american-opener",
};

export const DESIGN_PHOTO: Record<string, string> = {
  "shooting-star": "comp-americana-ground",
  prism: "signet-b",
  signal: "comp-new-american-opener",
  grid: "huggie-diamond",
};

export const COLLECTION_PHOTO: Record<string, string> = {
  family: "gem-studs",
  bridal: "comp-signal-hand",
  signets: "signet-b",
  "the-stack": "gem-stack-rings",
};

export const STORE_PHOTO: Record<string, string> = {
  brentwood: "box-peach",
  "mt-juliet": "bench",
};

export const photosFor = (handle: string) => (PIECE_PHOTOS[handle] ?? ["hero-box"]).map((k) => PHOTO[k]);

/**
 * Photography map. Images are the family's own product photography from american.jewelry,
 * standing in until the new designs are shot. Replace paths here; nothing else changes.
 */
export const PHOTO: Record<string, { src: string; alt: string; w: number; h: number }> = {
  "hero-box": { src: "/photos/hero-box.jpg", alt: "Gold signet rings and a chain in a navy velvet box", w: 2400, h: 1854 },
  "hero-hand": { src: "/photos/hero-hand.jpg", alt: "A hand wearing stacked gold and diamond rings", w: 2000, h: 875 },
  names: { src: "/photos/names.jpg", alt: "Gold name necklaces on white linen", w: 2000, h: 875 },
  "box-peach": { src: "/photos/box-peach.jpg", alt: "Earrings and necklaces in a jewelry box", w: 2000, h: 875 },
  "ring-radiant": { src: "/photos/ring-radiant.jpg", alt: "A radiant-cut diamond on a star-set gold band", w: 1050, h: 800 },
  "ring-halo": { src: "/photos/ring-halo.jpg", alt: "An emerald-cut diamond ring with a baguette halo", w: 2000, h: 1546 },
  bench: { src: "/photos/bench.jpg", alt: "Loose diamonds and a grading chart on the bench", w: 2000, h: 1546 },
  "tristar-charm": { src: "/photos/tristar-charm.jpg", alt: "Gold Tennessee tri-star medallion on a chain", w: 1400, h: 1400 },
  "huggie-diamond": { src: "/photos/huggie-diamond.jpg", alt: "Diamond huggie hoops in gold", w: 1400, h: 1400 },
  "name-riley": { src: "/photos/name-riley.jpg", alt: "A gold script name necklace", w: 1400, h: 1400 },
  "huggie-baguette": { src: "/photos/huggie-baguette.jpg", alt: "Baguette diamond huggies in gold", w: 1400, h: 1400 },
  "trio-studs": { src: "/photos/trio-studs.jpg", alt: "Three-stone diamond studs", w: 1400, h: 1400 },
  "script-ring": { src: "/photos/script-ring.jpg", alt: "A gold script ring", w: 1400, h: 1400 },
  "gem-studs": { src: "/photos/gem-studs.jpg", alt: "Birthstone studs in gold", w: 1400, h: 1400 },
  "gem-stack-rings": { src: "/photos/gem-stack-rings.jpg", alt: "Bezel-set gemstone stacking rings", w: 1400, h: 1400 },
  "name-cohen": { src: "/photos/name-cohen.jpg", alt: "A diamond block-letter name necklace", w: 1400, h: 1400 },
  "name-ring": { src: "/photos/name-ring.jpg", alt: "A gold name ring on a crystal", w: 1400, h: 1400 },
  cross: { src: "/photos/cross.jpg", alt: "A textured gold cross pendant", w: 1400, h: 1400 },
  "initial-necklace": { src: "/photos/initial-necklace.jpg", alt: "A diamond initial necklace with a gemstone", w: 1400, h: 1400 },
  "paperclip-bracelet": { src: "/photos/paperclip-bracelet.jpg", alt: "A gold paperclip bracelet with an engraved bar", w: 1400, h: 1400 },
  "bezel-studs": { src: "/photos/bezel-studs.jpg", alt: "Bezel-set diamond studs", w: 1400, h: 1400 },
  "signet-b": { src: "/photos/signet-b.jpg", alt: "A gold oval signet engraved with a B", w: 1400, h: 1400 },
  medallion: { src: "/photos/medallion.jpg", alt: "A beaded gold disc pendant", w: 1400, h: 1400 },
};

export const PIECE_PHOTOS: Record<string, string[]> = {
  "no-001-the-cumberland": ["ring-radiant", "hero-hand", "ring-halo"],
  "no-002-tennessee-star": ["tristar-charm", "names", "medallion"],
  "no-003-the-harpeth": ["paperclip-bracelet", "hero-box"],
  "shooting-star-ring": ["gem-stack-rings", "hero-hand", "script-ring"],
  "shooting-star-band": ["hero-hand", "gem-stack-rings"],
  "shooting-star-pendant": ["tristar-charm", "medallion", "names"],
  "shooting-star-bracelet": ["paperclip-bracelet", "hero-box"],
  "shooting-star-signet": ["signet-b", "hero-box"],
  "shooting-star-dog-tag": ["medallion", "cross"],
  "prism-necklace": ["initial-necklace", "names", "name-cohen"],
  "prism-bracelet": ["paperclip-bracelet", "hero-box"],
  "prism-signet": ["signet-b", "hero-box"],
  "prism-band": ["gem-stack-rings", "hero-hand"],
  "signal-solitaire": ["ring-halo", "ring-radiant", "hero-hand"],
  "signal-studs": ["bezel-studs", "trio-studs"],
  "grid-tennis-bracelet": ["huggie-diamond", "paperclip-bracelet"],
  "grid-tennis-necklace": ["huggie-baguette", "names"],
  "grid-eternity-band": ["huggie-diamond", "hero-hand"],
  "grid-stack-band": ["gem-stack-rings", "hero-hand"],
  "signal-mens-signet": ["signet-b", "hero-box"],
  "grid-tennis-chain": ["paperclip-bracelet", "cross"],
};

export const TIER_PHOTO: Record<string, string> = {
  "royal-american": "hero-box",
  americana: "hero-hand",
  "new-american": "ring-halo",
};

export const DESIGN_PHOTO: Record<string, string> = {
  "shooting-star": "tristar-charm",
  prism: "signet-b",
  signal: "ring-halo",
  grid: "huggie-diamond",
};

export const COLLECTION_PHOTO: Record<string, string> = {
  family: "gem-studs",
  bridal: "ring-radiant",
  signets: "signet-b",
  "the-stack": "gem-stack-rings",
};

export const STORE_PHOTO: Record<string, string> = {
  brentwood: "box-peach",
  "mt-juliet": "bench",
};

export const photosFor = (handle: string) => (PIECE_PHOTOS[handle] ?? ["hero-box"]).map((k) => PHOTO[k]);

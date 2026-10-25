/**
 * Photography map. Images are the family's own product photography from american.jewelry,
 * standing in until the new designs are shot. Replace paths here; nothing else changes.
 * `float`: a packshot on white that sits on the page's own ground (multiply), so there is no tile edge.
 * `contain`: a packshot already on the paper, shown whole in its frame (product first frames).
 * `comp-*` keys are generated layout comps the owner allowed for the private mockup only (decisions 2026-10-13);
 * every one is listed in docs/briefs/PHOTOS-TODO.md and must be replaced by a photograph before SITE_LIVE.
 */
export type HousePhoto = { src: string; alt: string; w: number; h: number; float?: boolean; contain?: boolean; cell?: [columns: number, rows: number, column: number, row: number]; concept?: boolean; raw?: boolean };
export const PHOTO: Record<string, HousePhoto> = {
  "hero-box": { src: "/photos/hero-box.jpg", alt: "Gold signet rings and a chain in a navy velvet box", w: 2400, h: 1854, float: true },
  "hero-hand": { src: "/photos/hero-hand.jpg", alt: "A hand wearing stacked gold and diamond rings", w: 2000, h: 875 },
  names: { src: "/photos/names.jpg", alt: "Gold name necklaces on white linen", w: 2000, h: 875, float: true },
  "box-peach": { src: "/photos/box-peach.jpg", alt: "Earrings and necklaces in a jewelry box", w: 2000, h: 875 },
  "ring-radiant": { src: "/photos/ring-radiant.jpg", alt: "A radiant-cut diamond on a star-set gold band", w: 1050, h: 800, float: true },
  "ring-halo": { src: "/photos/ring-halo.jpg", alt: "An emerald-cut diamond ring with a baguette halo", w: 2000, h: 1546, float: true },
  bench: { src: "/photos/bench.jpg", alt: "Loose diamonds and a grading chart on the bench", w: 2000, h: 1546 },
  "aj-solitaire-hand": { src: "/photos/aj-solitaire-hand.jpg", alt: "A hand wearing a yellow gold solitaire and a diamond band", w: 2400, h: 2000 },
  "aj-round-brilliant": { src: "/photos/aj-round-brilliant.jpg", alt: "A round brilliant diamond on a white ground", w: 2400, h: 2000, float: true },
  "aj-wedding-bands": { src: "/photos/aj-wedding-bands.jpg", alt: "Three diamond bands standing on white", w: 2400, h: 1960, float: true, contain: true },
  "aj-name-necklace": { src: "/photos/aj-name-necklace.jpg", alt: "A gold name necklace on white", w: 2400, h: 2000, float: true, contain: true },
  "aj-gemstone-rings": { src: "/photos/aj-gemstone-rings.jpg", alt: "Three gold rings set with blue and green gemstones", w: 2400, h: 2000, float: true, contain: true },
  "aj-signet-worn": { src: "/photos/aj-signet-worn.jpg", alt: "A gold signet worn on a hand, with a chain", w: 2400, h: 1980 },
  "aj-consult-hands": { src: "/photos/aj-consult-hands.jpg", alt: "Hands holding a round diamond over a grading tray", w: 550, h: 800 },
  "aj-bench-hands": { src: "/photos/aj-bench-hands.jpg", alt: "A jeweler's hands at the bench, loupe raised, setting a ring", w: 960, h: 875 },
  "aj-watch-bench": { src: "/photos/aj-watch-bench.jpg", alt: "A watchmaker at the bench with a loupe and a movement", w: 2048, h: 1265 },
  "aj-salon-cases": { src: "/photos/aj-salon-cases.jpg", alt: "Jewelry cases in the Mt. Juliet store", w: 680, h: 700 },
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
  "hero-hands": { src: "/photos/hero-hands.webp", alt: "Two hands on linen, an engagement ring and a wedding band", w: 2000, h: 875 },
  "hero-hands-tall": { src: "/photos/hero-hands-tall.webp", alt: "Two hands on linen, an engagement ring and a wedding band", w: 700, h: 875 },
  "ed-names": { src: "/photos/ed-names.webp", alt: "Four gold name necklaces on white satin", w: 2400, h: 2232, float: true },
  "ed-peach": { src: "/photos/ed-peach.webp", alt: "Diamond hoops, bar necklaces and studs in a peach suede box", w: 2000, h: 875 },
  "ed-signets": { src: "/photos/ed-signets.webp", alt: "Three gold signets, one in a blue velvet box, with gold chains", w: 2400, h: 1743 },
  "ed-opal": { src: "/photos/ed-opal.webp", alt: "An opal ring and pendants in a blue velvet box", w: 2400, h: 2232 },
  "ed-bridal": { src: "/photos/ed-bridal.webp", alt: "Engagement rings and wedding bands in a blue velvet tray", w: 2400, h: 2232 },
  "ed-diamonds": { src: "/photos/ed-diamonds.webp", alt: "Loose diamonds of several cuts on midnight blue", w: 2400, h: 2232 },
  "ed-bands": { src: "/photos/ed-bands.webp", alt: "Stacked eternity bands on a finger", w: 2400, h: 2232 },
  "ed-tennis": { src: "/photos/ed-tennis.webp", alt: "A tennis necklace in a blue velvet case, with studs and bands", w: 2400, h: 2232 },
  "ed-mens": { src: "/photos/ed-mens.webp", alt: "A figaro chain, a cross and men's bands", w: 2400, h: 2232 },
  "ed-watches": { src: "/photos/ed-watches.webp", alt: "Three watches on a leather strap", w: 2400, h: 2232 },
  "ed-radiant": { src: "/photos/ed-radiant.webp", alt: "A radiant solitaire on a gold star-set band", w: 966, h: 768, float: true },
  "ed-cluster": { src: "/photos/ed-cluster.webp", alt: "A baguette and emerald-cut cluster ring", w: 2000, h: 1546, float: true },
  "ed-workshop": { src: "/photos/ed-workshop.webp", alt: "A jeweler's hands with calipers and a scale, measuring a name necklace", w: 2400, h: 2400 },
  "pack-tristar": { src: "/photos/pack-tristar.webp", alt: "Tennessee tri-star charm in yellow gold", w: 2400, h: 2232, float: true, contain: true },
  "pack-disc": { src: "/photos/pack-disc.webp", alt: "Beaded disc pendant in 14k yellow gold", w: 2400, h: 2232, float: true, contain: true },
  "pack-cross": { src: "/photos/pack-cross.webp", alt: "Small gold cross necklace", w: 2400, h: 2232, float: true, contain: true },
  "pack-name-gold": { src: "/photos/pack-name-gold.webp", alt: "Gold script name necklace", w: 2400, h: 2232, float: true, contain: true },
  "pack-paperclip": { src: "/photos/pack-paperclip.webp", alt: "Gold paperclip bracelet", w: 2400, h: 2232, float: true, contain: true },
  "pack-name-diamond": { src: "/photos/pack-name-diamond.webp", alt: "Diamond script name necklace", w: 2400, h: 2232, float: true, contain: true },
  "pack-initial": { src: "/photos/pack-initial.webp", alt: "Diamond initial necklace with a gemstone", w: 2400, h: 2232, float: true, contain: true },
  "pack-signet": { src: "/photos/pack-signet.webp", alt: "Oval gold signet ring", w: 2400, h: 2232, float: true, contain: true },
  "pack-name-wrap": { src: "/photos/pack-name-wrap.webp", alt: "Gold name wrap ring", w: 2400, h: 2232, float: true, contain: true },
  "pack-family-ring": { src: "/photos/pack-family-ring.webp", alt: "Gold family ring", w: 2400, h: 2232, float: true, contain: true },
  "pack-bezel-stack": { src: "/photos/pack-bezel-stack.webp", alt: "Bezel-set gemstone stacking ring", w: 2400, h: 2232, float: true, contain: true },
  "pack-trio": { src: "/photos/pack-trio.webp", alt: "Diamond trio stud earrings", w: 2400, h: 2232, float: true, contain: true },
  "pack-huggie-bag": { src: "/photos/pack-huggie-bag.webp", alt: "Baguette diamond huggie hoops", w: 2400, h: 2232, float: true, contain: true },
  "pack-huggie-mini": { src: "/photos/pack-huggie-mini.webp", alt: "Mini diamond huggie hoops", w: 2400, h: 2232, float: true, contain: true },
  "pack-bezel-stud": { src: "/photos/pack-bezel-stud.webp", alt: "Gold diamond bezel studs", w: 2400, h: 2232, float: true, contain: true },
  "pack-candy": { src: "/photos/pack-candy.webp", alt: "Gemstone stud earrings", w: 2400, h: 2232, float: true, contain: true },
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

export const PIECE_PHOTOS: Record<string, string[]> = {};

export const TIER_PHOTO: Record<string, string> = {
  "royal-american": "aj-round-brilliant",
  americana: "aj-signet-worn",
  "new-american": "aj-round-brilliant",
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
  brentwood: "aj-consult-hands",
  "mt-juliet": "aj-salon-cases",
};

export const photosFor = (handle: string) => (PIECE_PHOTOS[handle] ?? ["hero-box"]).map((k) => PHOTO[k]);

// Generated concept plates, 13 October 2026. Each cell shows one catalog form.
// Pic uses an SVG viewport over the unchanged raster plate. No schematic substitutes.
// Keep these out of public launch until the actual house objects have been photographed.
const plates = [
  {name: "shooting-star", columns: 3, rows: 2, w: 1536, h: 1024, handles: ["shooting-star-ring", "shooting-star-band", "shooting-star-pendant", "shooting-star-bracelet", "shooting-star-signet", "shooting-star-dog-tag"]},
  {name: "prism", columns: 2, rows: 2, w: 1254, h: 1254, handles: ["prism-necklace", "prism-bracelet", "prism-signet", "prism-band"]},
  {name: "new-american", columns: 3, rows: 3, w: 1254, h: 1254, handles: ["signal-solitaire", "signal-studs", "signal-mens-signet", "grid-tennis-bracelet", "grid-tennis-necklace", "grid-eternity-band", "grid-stack-band", "grid-tennis-chain"]},
  {name: "royal", columns: 2, rows: 2, w: 1254, h: 1254, handles: ["no-001-the-cumberland", "no-002-tennessee-star", "no-003-the-harpeth"]},
];
for (const plate of plates) {
  plate.handles.forEach((handle, i) => {
    const key = `comp-object-${handle}`;
    PHOTO[key] = {src: `/photos/comp-${plate.name}-family.webp`, alt: `${handle.replace(/^no-\d+-/, "").replace(/-/g, " ")}, yellow gold`, w: plate.w, h: plate.h, cell: [plate.columns, plate.rows, i % plate.columns, Math.floor(i / plate.columns)], contain: true, concept: true, raw: true};
    PIECE_PHOTOS[handle] = [key];
  });
}
// Selected campaign delivery, 13 October 2026. Full prompts: docs/briefs/campaign-manifest.json.
PHOTO["campaign-02-shooting-star-detail"] = {"src":"/photos/campaign-02-shooting-star-detail.webp","alt":"Yellow-gold Shooting Star ring with five graduated diamonds on forest-green silk","w":1536,"h":1024,"concept":true};
PHOTO["campaign-03-signal-bridal-hand"] = {"src":"/photos/campaign-03-signal-bridal-hand.webp","alt":"Four-prong platinum Signal solitaire on a hand against blue-gray silk","w":1122,"h":1402,"concept":true};
PHOTO["campaign-04-signal-light-study"] = {"src":"/photos/campaign-04-signal-light-study.webp","alt":"Four-prong platinum solitaire in directional light on a cool-gray surface","w":1672,"h":941,"concept":true};
PHOTO["campaign-05-royal-american-velvet"] = {"src":"/photos/campaign-05-royal-american-velvet.webp","alt":"Six-prong platinum solitaire in a midnight-navy velvet tray","w":1672,"h":941,"concept":true};
PHOTO["campaign-meridian-family"] = {"src":"/photos/campaign-meridian-family.webp","alt":"Meridian ring, pendant and matching earrings on a pale gray surface","w":1536,"h":1024,"concept":true};
PHOTO["campaign-ribbon-family"] = {"src":"/photos/campaign-ribbon-family.webp","alt":"Ribbon ring, pendant and matching earrings on a pale gray surface","w":1536,"h":1024,"concept":true};
PHOTO["campaign-horizon-family"] = {"src":"/photos/campaign-horizon-family.webp","alt":"Horizon ring, pendant and matching earrings on a pale gray surface","w":1536,"h":1024,"concept":true};
PHOTO["campaign-petal-family"] = {"src":"/photos/campaign-petal-family.webp","alt":"Petal ring, pendant and matching earrings on a pale gray surface","w":1536,"h":1024,"concept":true};
PHOTO["campaign-meridian-ring"] = {"src":"/photos/campaign-meridian-ring.webp","alt":"Meridian Open Ring, yellow gold on a pale gray surface","w":1254,"h":1254,"concept":true,"contain":true};
PHOTO["comp-object-meridian-ring"] = PHOTO["campaign-meridian-ring"];
PIECE_PHOTOS["meridian-ring"] = ["comp-object-meridian-ring"];
PHOTO["campaign-meridian-pendant"] = {"src":"/photos/campaign-meridian-pendant.webp","alt":"Meridian Pendant, yellow gold on a pale gray surface","w":1254,"h":1254,"concept":true,"contain":true};
PHOTO["comp-object-meridian-pendant"] = PHOTO["campaign-meridian-pendant"];
PIECE_PHOTOS["meridian-pendant"] = ["comp-object-meridian-pendant"];
PHOTO["campaign-meridian-earrings"] = {"src":"/photos/campaign-meridian-earrings.webp","alt":"Meridian Earrings, yellow gold on a pale gray surface","w":1254,"h":1254,"concept":true,"contain":true};
PHOTO["comp-object-meridian-earrings"] = PHOTO["campaign-meridian-earrings"];
PIECE_PHOTOS["meridian-earrings"] = ["comp-object-meridian-earrings"];
PHOTO["campaign-ribbon-ring"] = {"src":"/photos/campaign-ribbon-ring.webp","alt":"Ribbon Fold Ring, yellow gold on a pale gray surface","w":1254,"h":1254,"concept":true,"contain":true};
PHOTO["comp-object-ribbon-ring"] = PHOTO["campaign-ribbon-ring"];
PIECE_PHOTOS["ribbon-ring"] = ["comp-object-ribbon-ring"];
PHOTO["campaign-ribbon-pendant"] = {"src":"/photos/campaign-ribbon-pendant.webp","alt":"Ribbon Pendant, yellow gold on a pale gray surface","w":1254,"h":1254,"concept":true,"contain":true};
PHOTO["comp-object-ribbon-pendant"] = PHOTO["campaign-ribbon-pendant"];
PIECE_PHOTOS["ribbon-pendant"] = ["comp-object-ribbon-pendant"];
PHOTO["campaign-ribbon-earrings"] = {"src":"/photos/campaign-ribbon-earrings.webp","alt":"Ribbon Earrings, yellow gold on a pale gray surface","w":1254,"h":1254,"concept":true,"contain":true};
PHOTO["comp-object-ribbon-earrings"] = PHOTO["campaign-ribbon-earrings"];
PIECE_PHOTOS["ribbon-earrings"] = ["comp-object-ribbon-earrings"];
PHOTO["campaign-horizon-ring"] = {"src":"/photos/campaign-horizon-ring.webp","alt":"Horizon Band, yellow gold on a pale gray surface","w":1254,"h":1254,"concept":true,"contain":true};
PHOTO["comp-object-horizon-ring"] = PHOTO["campaign-horizon-ring"];
PIECE_PHOTOS["horizon-ring"] = ["comp-object-horizon-ring"];
PHOTO["campaign-horizon-pendant"] = {"src":"/photos/campaign-horizon-pendant.webp","alt":"Horizon Bar Pendant, yellow gold on a pale gray surface","w":1254,"h":1254,"concept":true,"contain":true};
PHOTO["comp-object-horizon-pendant"] = PHOTO["campaign-horizon-pendant"];
PIECE_PHOTOS["horizon-pendant"] = ["comp-object-horizon-pendant"];
PHOTO["campaign-horizon-earrings"] = {"src":"/photos/campaign-horizon-earrings.webp","alt":"Horizon Huggies, yellow gold on a pale gray surface","w":1254,"h":1254,"concept":true,"contain":true};
PHOTO["comp-object-horizon-earrings"] = PHOTO["campaign-horizon-earrings"];
PIECE_PHOTOS["horizon-earrings"] = ["comp-object-horizon-earrings"];
PHOTO["campaign-petal-ring"] = {"src":"/photos/campaign-petal-ring.webp","alt":"Petal Sapphire Ring, yellow gold on a pale gray surface","w":1254,"h":1254,"concept":true,"contain":true};
PHOTO["comp-object-petal-ring"] = PHOTO["campaign-petal-ring"];
PIECE_PHOTOS["petal-ring"] = ["comp-object-petal-ring"];
PHOTO["campaign-petal-pendant"] = {"src":"/photos/campaign-petal-pendant.webp","alt":"Petal Pendant, yellow gold on a pale gray surface","w":1254,"h":1254,"concept":true,"contain":true};
PHOTO["comp-object-petal-pendant"] = PHOTO["campaign-petal-pendant"];
PIECE_PHOTOS["petal-pendant"] = ["comp-object-petal-pendant"];
PHOTO["campaign-petal-earrings"] = {"src":"/photos/campaign-petal-earrings.webp","alt":"Petal Earrings, yellow gold on a pale gray surface","w":1254,"h":1254,"concept":true,"contain":true};
PHOTO["comp-object-petal-earrings"] = PHOTO["campaign-petal-earrings"];
PIECE_PHOTOS["petal-earrings"] = ["comp-object-petal-earrings"];
PHOTO["campaign-06-shooting-star-hero-final"] = {"src":"/photos/campaign-06-shooting-star-hero-final.webp","alt":"Hand wearing a yellow-gold Shooting Star ring on forest-green silk","w":1672,"h":941,"concept":true};
PHOTO["campaign-07-family-collection-editorial"] = {"src":"/photos/campaign-07-family-collection-editorial.webp","alt":"Meridian ring, Petal pendant and Shooting Star ring together on navy velvet","w":1672,"h":941,"concept":true};
PHOTO["campaign-08-ribbon-worn-editorial"] = {"src":"/photos/campaign-08-ribbon-worn-editorial.webp","alt":"Hand wearing a sculptural gold Ribbon Fold Ring","w":1122,"h":1402,"concept":true};
PHOTO["campaign-09-shooting-star-hero-mobile"] = {"src":"/photos/campaign-09-shooting-star-hero-mobile.webp","alt":"Hand wearing the Shooting Star ring, vertically composed on forest-green silk","w":1024,"h":1536,"concept":true};

// Stable keys keep supporting pages on the selected photography.
PHOTO['comp-home-hand'] = PHOTO['campaign-06-shooting-star-hero-final'];
PHOTO['comp-home-hand-tall'] = PHOTO['campaign-09-shooting-star-hero-mobile'];
PHOTO['comp-americana-ground'] = PHOTO['campaign-02-shooting-star-detail'];
PHOTO['comp-cumberland-velvet'] = PHOTO['campaign-05-royal-american-velvet'];
PHOTO['comp-new-american-opener'] = PHOTO['campaign-04-signal-light-study'];
PHOTO['comp-signal-hand'] = PHOTO['campaign-03-signal-bridal-hand'];
PHOTO['comp-object-no-001-the-cumberland'] = {...PHOTO['comp-cumberland-velvet'],contain:true};
PHOTO['comp-object-shooting-star-ring'] = {src:'/photos/comp-shooting-star-object.webp',alt:'Shooting Star ring with a gold star and five graduated diamonds',w:1254,h:1254,contain:true,concept:true};
PHOTO['comp-prism-campaign'] = {src:'/photos/comp-prism-campaign.webp',alt:'Faceted gold Prism links curving across dark green leather',w:1536,h:1024,concept:true};
PIECE_PHOTOS['shooting-star-ring'] = ['comp-object-shooting-star-ring','comp-home-hand','comp-americana-ground'];
PIECE_PHOTOS['signal-solitaire'] = ['comp-signal-packshot','comp-signal-hand','comp-new-american-opener'];
PIECE_PHOTOS['ribbon-ring'].push('campaign-08-ribbon-worn-editorial');
DESIGN_PHOTO.prism = 'comp-prism-campaign';
DESIGN_PHOTO.grid = 'comp-object-grid-tennis-bracelet';
for (const design of ['meridian','ribbon','horizon','petal']) DESIGN_PHOTO[design] = 'campaign-'+design+'-family';
PHOTO['campaign-07-family-collection-editorial'].contain = true;
COLLECTION_PHOTO.family = 'campaign-07-family-collection-editorial';
COLLECTION_PHOTO.bridal = 'aj-solitaire-hand';
COLLECTION_PHOTO.signets = 'comp-object-prism-signet';
COLLECTION_PHOTO['the-stack'] = 'comp-object-grid-stack-band';
COLLECTION_PHOTO.everyday = 'comp-object-meridian-pendant';
COLLECTION_PHOTO.statement = 'campaign-08-ribbon-worn-editorial';
COLLECTION_PHOTO.gifts = 'comp-object-shooting-star-pendant';
COLLECTION_PHOTO.color = 'comp-object-petal-ring';
COLLECTION_PHOTO["american-classic"] = "ed-signets";
COLLECTION_PHOTO.personalized = "ed-names";
COLLECTION_PHOTO.mens = "ed-mens";
COLLECTION_PHOTO["wedding-bands"] = "ed-bands";
COLLECTION_PHOTO.bridal = "ed-bridal";
DESIGN_PHOTO["american-classic"] = "ed-signets";
DESIGN_PHOTO.personalized = "ed-names";
STORE_PHOTO.brentwood = "ed-bridal";
STORE_PHOTO["mt-juliet"] = "aj-salon-cases";

const LEGACY_PHOTO: Record<string, string> = {
  "tristar-charm": "pack-tristar",
  "beaded-disc-pendant": "pack-disc",
  "rugged-cross": "pack-cross",
  "script-name-necklace": "pack-name-gold",
  "paperclip-bracelet": "pack-paperclip",
  "diamond-name-necklace": "pack-name-diamond",
  "initial-station-necklace": "pack-initial",
  "american-classic-signet": "pack-signet",
  "name-wrap-ring": "pack-name-wrap",
  "family-ring": "pack-family-ring",
  "bezel-stack-ring": "pack-bezel-stack",
  "diamond-trio-studs": "pack-trio",
  "baguette-huggies": "pack-huggie-bag",
  "diamond-huggies": "pack-huggie-mini",
  "bezel-studs": "pack-bezel-stud",
  "candy-studs": "pack-candy",
};
for (const [handle, key] of Object.entries(LEGACY_PHOTO)) PIECE_PHOTOS[handle] = [key];

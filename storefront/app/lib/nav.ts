import { CATEGORIES } from "./catalog/browse";
import { COLLECTIONS, DESIGNS, PIECES, STORES, TIERS } from "./catalog/data";
import { ARTICLES } from "./journal";

/**
 * The house navigation: one row of names, one panel per name. Every panel is made of links
 * organized by what a visitor is looking for (a kind of piece, a line, a design, a collection,
 * a service, a place). No promotion, no tiles: columns of names and at most one photograph.
 * The phone menu carries the same depth as accordions. Everything reads the catalog; nothing is invented.
 */

export interface NavLink {
  href: string;
  label: string;
  /** a second line under the name (an address, a stone standard) */
  note?: string;
}
export interface NavColumn {
  title: string;
  links: NavLink[];
}
export interface NavPanel {
  /** the name on the row */
  label: string;
  /** where the name itself goes */
  href: string;
  columns: NavColumn[];
  /** one photograph, with the piece it shows */
  photo?: { key: string; caption: string; href: string; position?: string };
  /** one sentence at the foot of the panel (a standard, an invitation) */
  line?: string;
}

const registry = PIECES.filter((p) => p.oneOfOne);
const design = (slug: string) => DESIGNS.find((d) => d.slug === slug)!;
const collection = (slug: string) => COLLECTIONS.find((c) => c.slug === slug)!;
const piece = (handle: string) => PIECES.find((p) => p.handle === handle)!;

export const NAV: NavPanel[] = [
  {
    label: "Jewelry",
    href: "/jewelry",
    columns: [
      {
        title: "By kind",
        links: [...CATEGORIES.map((c) => ({ href: `/jewelry/${c.slug}`, label: c.name })), { href: "/jewelry", label: "Every piece" }],
      },
      {
        title: "By design",
        links: DESIGNS.map((d) => ({ href: `/designs/${d.slug}`, label: d.name })),
      },
      {
        title: "Collections",
        links: COLLECTIONS.map((c) => ({ href: `/collections/${c.slug}`, label: c.name })),
      },
    ],
    photo: { key: "comp-americana-ground", caption: "Shooting Star ring", href: "/pieces/shooting-star-ring" },
  },
  {
    label: "Bridal",
    href: "/collections/bridal",
    columns: [
      {
        title: "Engagement",
        links: [
          { href: "/pieces/signal-solitaire", label: piece("signal-solitaire").name },
          { href: "/build/ring?setting=signal", label: "Build on Signal" },
          { href: "/build/ring?setting=shooting-star", label: "Build on Shooting Star" },
          { href: "/build/ring?setting=prism", label: "Build on Prism" },
        ],
      },
      {
        title: "Wedding bands",
        links: [
          { href: "/pieces/grid-eternity-band", label: piece("grid-eternity-band").name },
          { href: "/pieces/shooting-star-band", label: piece("shooting-star-band").name },
          { href: "/pieces/prism-band", label: piece("prism-band").name },
          { href: "/collections/the-stack", label: "The Stack" },
        ],
      },
      {
        title: "Before you choose",
        links: [
          { href: "/natural-or-man-made", label: "Natural or lab-grown" },
          { href: `/journal/${ARTICLES.find((a) => a.slug === "ring-size-honestly")?.slug ?? "ring-size-honestly"}`, label: "Ring size, honestly" },
          { href: "/appointments?kind=bridal", label: "An hour with the settings" },
        ],
      },
    ],
    photo: { key: "comp-signal-hand", caption: "Signal Solitaire", href: "/pieces/signal-solitaire", position: "60% 45%" },
    line: "Choose the setting, then the stone. Each ring is labeled plainly with which it is.",
  },
  {
    label: "High Jewelry",
    href: "/royal-american",
    columns: [
      {
        title: "Royal American",
        links: registry.map((p) => ({ href: `/pieces/${p.handle}`, label: `No. ${p.oneOfOne?.number}, ${p.name}` })),
      },
      {
        title: "By appointment",
        links: [
          { href: "/royal-american", label: "Explore Royal American" },
          { href: "/appointments?tier=royal-american", label: "Request a private viewing" },
          { href: "/commission", label: "Commission a piece" },
        ],
      },
    ],
    photo: { key: "comp-cumberland-velvet", caption: "On navy velvet, under one light", href: "/royal-american", position: "60% 50%" },
    line: "One of one. Price on request. Never made again.",
  },
  {
    label: "Americana",
    href: "/americana",
    columns: [
      {
        title: "Designs",
        links: [design("shooting-star"), design("prism")].map((d) => ({ href: `/designs/${d.slug}`, label: d.name, note: d.motif })),
      },
      {
        title: "Pieces",
        links: [
          { href: "/jewelry/rings?line=americana", label: "Rings" },
          { href: "/jewelry/necklaces?line=americana", label: "Necklaces" },
          { href: "/jewelry/bracelets?line=americana", label: "Bracelets" },
          { href: "/jewelry?line=americana", label: "Every Americana piece" },
        ],
      },
      {
        title: "Collections",
        links: [collection("family"), collection("signets"), collection("the-stack")].map((c) => ({ href: `/collections/${c.slug}`, label: c.name })),
      },
    ],
    photo: { key: "comp-americana-ground", caption: "Shooting Star, on green leather", href: "/americana" },
    line: "Natural diamonds, F to G, VS1, GIA. Solid gold, birthstone and natural diamond versions.",
  },
  {
    label: "New American",
    href: "/new-american",
    columns: [
      {
        title: "Designs",
        links: [design("signal"), design("grid")].map((d) => ({ href: `/designs/${d.slug}`, label: d.name, note: d.motif })),
      },
      {
        title: "Pieces",
        links: [
          { href: "/jewelry/rings?line=new-american", label: "Rings" },
          { href: "/jewelry/necklaces?line=new-american", label: "Necklaces" },
          { href: "/jewelry/earrings?line=new-american", label: "Earrings" },
          { href: "/jewelry/bracelets?line=new-american", label: "Bracelets" },
          { href: "/jewelry?line=new-american", label: "Every New American piece" },
        ],
      },
      {
        title: "The standard",
        links: [
          { href: "/new-american#standard", label: "The New American Standard" },
          { href: "/natural-or-man-made", label: "Natural or lab-grown" },
          { href: `/journal/${ARTICLES[0]?.slug ?? "journal"}`, label: "Reading an IGI report" },
        ],
      },
    ],
    photo: { key: "comp-new-american-opener", caption: "Signal, on limestone", href: "/new-american", position: "70% 50%" },
    line: "Lab-grown diamonds (laboratory-grown), D to F, VVS, IGI report on every center stone.",
  },
  {
    label: "Services",
    href: "/services",
    columns: [
      {
        title: "At the bench",
        links: [
          { href: "/services#repair", label: "Repair and restoration" },
          { href: "/services#resizing", label: "Resizing" },
          { href: "/services#engraving", label: "Engraving" },
          { href: "/services#cleaning", label: "Cleaning and inspection" },
          { href: "/services#appraisal", label: "Appraisal" },
        ],
      },
      {
        title: "Made for you",
        links: [
          { href: "/build/ring", label: "Build a ring" },
          { href: "/commission", label: "Commission a piece" },
          { href: "/services#custom", label: "Heirloom resets" },
          { href: "/care", label: "Lifetime care" },
        ],
      },
      {
        title: "Appointments",
        links: [
          { href: "/appointments?kind=care", label: "Book a care visit" },
          { href: "/appointments", label: "Book an hour" },
        ],
      },
    ],
    photo: { key: "comp-bench-hands", caption: "The bench", href: "/services", position: "50% 40%" },
  },
  {
    label: "Stores",
    href: "/stores",
    columns: [
      {
        title: "Two stores, two working shops",
        links: STORES.map((s) => ({ href: `/stores/${s.slug}`, label: s.name, note: `${s.address1}, ${s.city}` })),
      },
      {
        title: "A visit",
        links: [
          { href: "/appointments", label: "Book an hour" },
          { href: "/stores", label: "Hours and directions" },
        ],
      },
    ],
    line: "Walk in for cleaning, inspection and repairs. For bridal, a commission or a Royal American viewing, book an hour.",
  },
  {
    label: "The House",
    href: "/house",
    columns: [
      {
        title: "The House",
        links: [
          { href: "/house", label: "Meet American Jewelry" },
          { href: "/house#making", label: "Design and the bench" },
          { href: "/natural-or-man-made", label: "Natural or lab-grown" },
        ],
      },
      {
        title: "Journal",
        links: ARTICLES.map((a) => ({ href: `/journal/${a.slug}`, label: a.title })),
      },
      {
        title: "The small print",
        links: [
          { href: "/policies", label: "Policies" },
          { href: "/care", label: "Warranty and care" },
        ],
      },
    ],
    photo: { key: "comp-bench-hands", caption: "Set and finished at our bench", href: "/house", position: "50% 40%" },
  },
];

/** The lines, for the current-page mark on the row. */
export const LINE_HREFS = TIERS.map((t) => `/${t.slug}`);

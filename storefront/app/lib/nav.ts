export interface NavLink { href: string; label: string; note?: string }
export interface NavColumn { title: string; links: NavLink[] }
export interface NavPanel {
  label: string;
  href: string;
  columns: NavColumn[];
  photo?: { key: string; caption: string; href: string; position?: string };
}

/** High Jewelry stays while the site is a mock. Watches is service only. */
export const NAV: NavPanel[] = [
  {
    label: "High Jewelry",
    href: "/royal-american",
    columns: [
      {
        title: "Royal American",
        links: [
          { href: "/royal-american", label: "Royal American" },
          { href: "/appointments?tier=royal-american", label: "Request a private viewing" },
        ],
      },
    ],
    photo: { key: "comp-cumberland-velvet", caption: "Royal American", href: "/royal-american", position: "50% 45%" },
  },
  {
    label: "Jewelry",
    href: "/jewelry",
    columns: [
      {
        title: "By category",
        links: [
          { href: "/jewelry/rings", label: "Rings" },
          { href: "/jewelry/necklaces", label: "Necklaces and pendants" },
          { href: "/jewelry/earrings", label: "Earrings" },
          { href: "/jewelry/bracelets", label: "Bracelets" },
          { href: "/collections/mens", label: "Men's" },
          { href: "/appointments?interest=estate", label: "Estate and vintage" },
        ],
      },
      {
        title: "By stone",
        links: [
          { href: "/jewelry?stone=natural", label: "Natural diamonds" },
          { href: "/jewelry?stone=lab-grown", label: "Lab-grown diamonds" },
          { href: "/jewelry?stone=gemstone", label: "Gemstones" },
          { href: "/jewelry?stone=gold", label: "Gold" },
        ],
      },
      {
        title: "Collections",
        links: [
          { href: "/collections/american-classic", label: "American Classic" },
          { href: "/collections/personalized", label: "Personalized" },
          { href: "/jewelry", label: "All jewelry" },
        ],
      },
    ],
    photo: { key: "ed-names", caption: "Personalized jewelry", href: "/collections/personalized" },
  },
  {
    label: "Bridal",
    href: "/collections/bridal",
    columns: [
      {
        title: "Engagement",
        links: [
          { href: "/collections/bridal", label: "Engagement rings" },
          { href: "/collections/bridal?stone=natural", label: "Natural diamond" },
          { href: "/collections/bridal?stone=lab-grown", label: "Lab-grown diamond" },
          { href: "/build/ring", label: "Design your ring" },
        ],
      },
      {
        title: "Bands",
        links: [
          { href: "/collections/wedding-bands", label: "Women's wedding bands" },
          { href: "/collections/wedding-bands", label: "Men's wedding bands" },
          { href: "/collections/wedding-bands", label: "Anniversary and eternity" },
        ],
      },
      {
        title: "Guidance",
        links: [
          { href: "/appointments?kind=bridal", label: "Book a bridal appointment" },
          { href: "/natural-or-man-made", label: "Natural or lab-grown?" },
          { href: "/care#sizing", label: "Find your ring size" },
        ],
      },
    ],
    photo: { key: "ed-bridal", caption: "Engagement rings", href: "/collections/bridal" },
  },
  {
    label: "Custom Design",
    href: "/custom-design",
    columns: [
      {
        title: "Custom design",
        links: [
          { href: "/custom-design", label: "How it works" },
          { href: "/appointments?interest=custom", label: "Begin a custom piece" },
          { href: "/custom-design#heirloom", label: "Remake an heirloom" },
        ],
      },
    ],
    photo: { key: "ed-opal", caption: "Custom design", href: "/custom-design" },
  },
  {
    label: "Watches",
    href: "/services#watch-service",
    columns: [
      {
        title: "Watches",
        links: [{ href: "/services#watch-service", label: "Watch service" }],
      },
    ],
  },
  {
    label: "Services",
    href: "/services",
    columns: [
      {
        title: "Services",
        links: [
          { href: "/services#repairs", label: "Repairs" },
          { href: "/services#sizing", label: "Ring sizing" },
          { href: "/services#engraving", label: "Engraving" },
          { href: "/services#appraisals", label: "Appraisals" },
          { href: "/services#care", label: "Lifetime care" },
          { href: "/services#cleaning", label: "Cleaning and inspection" },
        ],
      },
    ],
    photo: { key: "ed-workshop", caption: "The workshop", href: "/services", position: "50% 42%" },
  },
  {
    label: "Our Story",
    href: "/our-story",
    columns: [
      {
        title: "Our story",
        links: [
          { href: "/our-story", label: "The family" },
          { href: "/our-story#workshop", label: "The workshop" },
          { href: "/stores", label: "Our stores" },
          { href: "/journal", label: "Journal" },
        ],
      },
    ],
  },
];

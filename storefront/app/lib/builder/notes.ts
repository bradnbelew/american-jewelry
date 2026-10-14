import type { SettingKey } from "./model";

/** The photograph that stands for each setting until the house designs are shot. PHOTO keys. */
export const SETTING_PHOTO: Record<SettingKey, string> = { signal: "comp-signal-packshot", "shooting-star": "comp-object-shooting-star-ring", prism: "comp-object-prism-band" };

/** The designer's note on each setting: why it exists, what the house decided, what is yours to decide. */
export const DESIGN_NOTES: Record<
  SettingKey,
  { name: string; line: string; why: string; fixed: string[]; yours: string[]; tier: string }
> = {
  signal: {
    name: "Signal",
    line: "One stone, and nothing in its way.",
    why: "Signal was drawn to disappear. The head is open on four sides so light enters from beneath the stone, and the band is thin enough that the diamond is the whole story. It is the setting most of our bridal clients choose, and the one we would choose ourselves.",
    fixed: ["Open four-sided head", "Flush-set accent at the base of the head", "AJ hallmark struck inside the shank"],
    yours: ["Band profile and width", "Prong style and count", "A hidden halo beneath the stone", "Natural or lab-grown stone, at set sizes", "Metal, size, engraving"],
    tier: "Americana with a natural stone; New American with a man-made stone",
  },
  "shooting-star": {
    name: "Shooting Star",
    line: "A star beside the stone, a tail down the shoulder.",
    why: "The first design our designer drew for the house. The star is cut sharp and sits beside the center stone; the tail falls down the shoulder in graduated settings. One of them can hold a birthstone, which is how a ring becomes a family ring.",
    fixed: ["The five-point star, 4 mm, beside the stone", "Graduated tail on the left shoulder", "AJ star struck inside the shank"],
    yours: ["Tail length: three stones or five", "A birthstone in the first tail setting", "Band profile and width", "Prong style and count", "Natural or lab-grown stone, at set sizes", "Metal, size, engraving"],
    tier: "Americana with a natural stone; New American with a man-made stone",
  },
  prism: {
    name: "Prism",
    line: "The geometry of a cut stone, made the metal itself.",
    why: "Prism takes the facets of a cut stone and gives them to the band. Every surface is a plane and every edge is crisp, so the ring catches light the way the diamond does. The head is a six-sided bezel that meets the band without a seam.",
    fixed: ["Faceted band, knife-edge facets all the way around", "Six-sided bezel head", "AJ hallmark struck inside the shank"],
    yours: ["Band width", "A hidden halo beneath the stone", "Natural or lab-grown stone, at set sizes", "Metal, size, engraving"],
    tier: "Americana with a natural stone; New American with a man-made stone",
  },
};

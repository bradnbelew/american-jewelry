/**
 * The journal: plain, specific writing about stones, making and words. Written to be useful on its own,
 * which is also what search and answer engines reward. Every claim here is either a public fact
 * (grading scales, regulations, sizing arithmetic) or a statement about how this house works.
 */
export interface Article {
  slug: string;
  title: string;
  summary: string;
  published: string; // ISO date
  photo: string; // PHOTO key
  minutes: number;
  body: Block[];
}

export type Block = { h: string } | { p: string } | { list: string[] } | { table: { head: string[]; rows: string[][] } };

export const ARTICLES: Article[] = [
  {
    slug: "how-to-read-an-igi-laboratory-grown-diamond-report",
    title: "How to read an IGI Laboratory Grown Diamond Report",
    summary: "Every man-made diamond we sell at 0.30 ct and above comes with one. Here is what each line means and which three to check first.",
    published: "2026-10-09",
    photo: "bench",
    minutes: 5,
    body: [
      { p: "A grading report is a description of one stone by a laboratory that did not sell it. For man-made diamonds the house uses the International Gemological Institute, whose Laboratory Grown Diamond Report has graded man-made stones since 2005 and still uses the full letter scales for color and clarity. The report travels with the piece, and its number is laser-inscribed on the girdle of the stone." },
      { h: "The three lines to check first" },
      { list: ["The heading. It says Laboratory Grown Diamond Report. If a report for a man-made diamond does not say so in the title, something is wrong.", "The report number, and the inscription. The number printed on the report should match the number inscribed on the girdle, which we show you under the loupe. The report can also be checked on IGI's own site.", "Growth method and treatment. The comments line says how the stone was grown, by chemical vapor deposition or high pressure and high temperature, and whether it was treated after growth. Ours say as grown, with no post-growth treatment."] },
      { h: "The grades" },
      { table: { head: ["Line", "What it measures", "The house line"], rows: [["Color", "How colorless the stone is, D (colorless) to Z.", "D, E or F."], ["Clarity", "Inclusions and blemishes at ten-power magnification, Flawless to Included.", "VVS1 or VVS2: very, very slightly included, hard to find even with a loupe."], ["Cut", "Proportions, polish and symmetry of a round brilliant.", "Excellent or Ideal, Hearts and Arrows on round centers."], ["Carat weight", "The weight of the stone. 1.00 ct is one fifth of a gram.", "Set sizes from 0.50 to 3.00 ct."], ["Measurements", "Diameter and depth in millimeters.", "A round 1.00 ct is about 6.5 mm across."]] } },
      { h: "What a report is not" },
      { p: "It is not an appraisal and it is not a price. Two stones with the same grades can look different in the hand, which is why we would rather you see the stone than the paper. And since October 2025 GIA no longer issues letter grades for man-made diamonds, only a Premium or Standard designation; a D-F, VVS promise is therefore an IGI promise, and we say so." },
    ],
  },
  {
    slug: "what-designed-in-tennessee-means",
    title: "What \"Designed in Tennessee\" means, and what we will not say",
    summary: "The house is built on American making. The sentence on every piece is shorter than that, on purpose. Here is why.",
    published: "2026-10-09",
    photo: "hero-box",
    minutes: 4,
    body: [
      { p: "Every piece we make carries one sentence about origin: Designed in Tennessee. Set and finished in our workshop. Diamonds and gold are imported. People sometimes ask why a house called American Jewelry does not simply say Made in America. The answer is that the words have a legal meaning, and we would rather be exact than loud." }, // house-lint: allow (quotes the FTC rule to explain why we do not use these words)
      { h: "Made in America" }, // house-lint: allow (quotes the FTC rule to explain why we do not use these words)
      { p: "Under the Federal Trade Commission's rule, a product may be called Made in USA without qualification only when all or virtually all of it is made here, including its significant materials. The Commission's own example of a material that defeats the claim is the gold in a ring. Our gold and our diamonds are imported, as nearly all gold and diamonds are, so the finished piece cannot carry the unqualified claim. Made in Tennessee is held to the same test. We design here, and we set and finish here, so that is what we say." }, // house-lint: allow (quotes the FTC rule to explain why we do not use these words)
      { h: "Handmade" }, // house-lint: allow (quotes the FTC rule to explain why we do not use these words)
      { p: "The Commission's jewelry guides reserve handmade for pieces shaped entirely by hand from raw metal. Our designs are drawn by hand, then modeled and cast, then set and finished by hand. That is honest, careful work, and most of what you will see in any fine jewelry house, but it is not handmade in the legal sense. So we say hand-set and hand-finished, which is true of the specific operations, and we do not say handmade of the piece." }, // house-lint: allow (quotes the FTC rule to explain why we do not use these words)
      { h: "Man-made diamond" },
      { p: "A laboratory-grown diamond is a diamond: the same crystal, hardness and fire as a mined one. The guides require that it never be called simply a diamond, and that a qualifier sit immediately before the word every time. We use man-made diamond, hyphenated, in the same type as the word it qualifies, and we add laboratory-grown once on every spec line, with the IGI report, so the two names the public knows are both present. We never call a man-made diamond real, genuine or natural, and we never call a natural diamond real to make the other sound less so." },
      { h: "What this buys you" },
      { p: "A sentence you can check. If any page on this site ever claims more than we can prove about where a thing came from, tell us and we will change it the same day." },
    ],
  },
  {
    slug: "ring-size-honestly",
    title: "Ring size, honestly",
    summary: "Fingers change with the weather, the hour and the width of the band. How we size, what to do at home, and why we would rather resize than guess.",
    published: "2026-10-09",
    photo: "hero-hand",
    minutes: 4,
    body: [
      { p: "A ring size is the inside diameter of the band. In the American scale each whole size adds about 0.8 mm; a size 6 is about 16.5 mm across, a size 7 about 17.3 mm. That is the arithmetic. The rest is about hands." },
      { h: "What moves" },
      { list: ["Heat and salt swell fingers; cold shrinks them. Measure in the afternoon, at room temperature, not after a run or a flight.", "Knuckles. A ring has to pass the knuckle and then sit without spinning. On a hand with a prominent knuckle we size for the knuckle and shape the band so it stays put.", "Width. A wide band covers more finger and wears tighter. For bands over 4 mm we usually go up half a size; the ring builder tells you when a width you chose will do that."] },
      { h: "At home" },
      { p: "The most reliable thing you own is a ring that already fits the right finger. Measure its inside diameter in millimeters with a ruler, straight across, and tell us the number. Paper strips and printable charts are less reliable than they look, because paper stretches and printers scale." },
      { h: "In the store" },
      { p: "We size with a set of steel sizers in half sizes, on the finger, on the day. It takes two minutes and it is free. If you are ordering from the builder and cannot come in, choose your best guess; one resize within 60 days of delivery is included on every ring we make, and full eternity bands, which cannot be resized, are remade." },
    ],
  },
  {
    slug: "how-a-ring-is-made-at-our-bench",
    title: "How a ring is made at our bench",
    summary: "From a drawing to a hallmarked piece in about three weeks: what happens at each step, and what you can see through the glass in Mt. Juliet.",
    published: "2026-10-09",
    photo: "ring-radiant",
    minutes: 5,
    body: [
      { p: "Every piece in the house follows the same road, whether it is a stock design or a commission. Here it is, in order, with roughly how long each part takes for a ring from the builder." },
      { h: "The drawing" },
      { p: "Our designer draws every design by hand. For a house setting this happened once, years before your order; the drawing is the one that appears on your certificate. For a commission, two or three directions are drawn within a week, and you keep them." },
      { h: "The model" },
      { p: "The drawing becomes a precise model: the band profile at your width and size, the seat cut for your stone's exact diameter, the prongs placed for its girdle. From the model we grow a wax. For a commission you can hold it; for a builder ring it goes straight to casting." },
      { h: "Casting" },
      { p: "The wax is invested in plaster, burned out, and the metal is cast into the void: 14k or 18k gold or platinum, karat-marked. The casting is cut from its sprue, cleaned and pre-polished. This is the week in which a ring is most often photographed and least often recognized." },
      { h: "Setting" },
      { p: "Stones are set by hand under magnification. Prongs are shaped over the stone, the seat is checked for a level table, and small stones in a tail or a hidden halo are set one at a time. This is the part you can watch through the glass in Mt. Juliet." },
      { h: "Finishing and the mark" },
      { p: "The ring is polished, the inside is engraved if you asked for it, and the AJ hallmark and the mark of its name are struck inside the shank. The certificate is filled in with the report number and the initials of the people who did each step. Then the ring is cleaned once more and put in the box." },
      { h: "How long" },
      { p: "About two weeks for a man-made center stone and about three for a natural one, which has to be found and reported first; a hidden halo or a birthstone adds a week. We tell you when it is cast and when it is finished." },
    ],
  },
];

export const articleBySlug = (slug: string) => ARTICLES.find((a) => a.slug === slug);

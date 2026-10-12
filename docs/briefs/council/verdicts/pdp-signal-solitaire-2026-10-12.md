# Council verdict: pdp-signal-solitaire
Date: 2026-10-12. Commit: 3aa5f38. Report: reports/pdp-signal-solitaire.md.

**NOT APPROVED** (5 Blockers, 8 Shoulds, 9 Notes)

## Blockers
1. [C6 / house table, radius] 390, 768, 1440, `select#size-signal-solitaire.field`: radius 8px (house is 0). `.field` sets no radius and `select.field` (house.css:326) falls back to the UA value. Fix: add `border-radius: 0` to `.field` (house.css:304).
2. [P7 / house table, 44px] 390, 768, header "MENU" button: 40px tall (1 control under 44). Fix: set the MENU button to `h-12` (48px) or `min-h-[44px]` in Header.tsx.
3. [P1 / house table, fold] 390 and 768: price ($3,200 at y~700+) and Add to bag are below the 844 and 1024 folds (1440 passes: price y387, button y840). The buy column stacks under a 4:5 photograph (447px at 390). Fix: render the existing `phoneBar` (PieceForm.tsx:165, fixed price plus Add to bag) for every layout, and change its `md:hidden` to `lg:hidden` so it covers 768. Re-measure.
4. [T5] 1440 (and 390, 768), metal swatch labels "14k yellow", "14k white", "14k rose", "Platinum": 11px in `.label` muted #63676E (PieceForm.tsx, `text-[0.6875rem]`). Rule: muted text never below 13px. The same 11px muted class sets the "Sold out" label. Fix: `text-[0.8125rem]` on both.
5. [W9] Folded accordion "The stone and its report" (piece.tsx, man-made branch): "grown by chemical vapor deposition and sold as grown". The growth method is not a house fact; no brief or catalog entry names it (research/04: IGI reports state CVD or HPHT per stone; research/12 says the method varies by grower). It prints on every man-made piece. Fix: "Growth method and any post-growth treatment are printed on the IGI report." (03-brand-architecture: "growth method and any post-growth treatment disclosed").

## Shoulds
1. [T2] 390 15px, 768 14px, 1440 15px median prose (band 16 to 18): `.spec td` is 0.875rem (house.css:427) and the accordion text is `text-[0.9375rem]` (piece.tsx). No brief or decision records it. Fix: set both to 1rem.
2. [T7] 10 distinct sizes at all widths (band max 9): 11, 13, 14, 15, 16, 17, 18, 36, 44, 56. Fix: drop 14 and 15 into 16 (see T2) and 17 into 16 or 18; leaves 7.
3. [T12] Off-scale gaps in code: `gap-1.5` 6px (PieceForm price block), `gap-5` / `md:gap-5` 20px (PieceGallery), `pb-5` 20px (accordions), `mb-5` 20px (swatch). Scale is 4, 8, 12, 16, 24, 32, 40, 64. Fix: 6 to 8, 20 to 24 (or 16).
4. [I7] 390, second frame (hand): the 2000x875 panorama is cropped into a 4:5 frame; the ring on the finger is cut by the left and bottom edges. Fix: show the hand frame at 2.2:1 full width under the first frame, or set `object-position` on the ring.
5. [P9] 1440, header: nothing marks "New American" as the current scope on a New American piece (breadcrumb shows it, nav does not; `NavLink` only matches its own route). 390: report counts 5 header links vs max 4 (screenshot shows 3: MENU, wordmark, BAG; check Header.tsx for links present but not visible). Fix: pass the piece's tier to the header so that link takes `border-ink`; hide the 2 extras at 390.
6. [W9] Spec row Hallmark: "Karat mark and the house mark, inside the shank". The mark does not exist (05-visual-identity: logo paused; 03-brand-architecture line 78 hallmarks Proposed; PHOTOS-TODO: "No hallmark exists"). Fix: "Karat mark, inside the shank" until the mark is chosen.
7. [W9] "Care and warranty": "The center stone is insured separately." policies.tsx says the owner "should" insure the stone separately; as written it reads as the house insuring it. Fix: "The center stone is not covered; insure it separately."
8. [D1] 1440, wordmark covered: reads as a well-set independent jeweler's product page; the ref line "Ref. NA 014, New American" has no place name. Fix: set the ref line in registry grammar for the piece (number plus a Tennessee place name, once the family names it); log the place name as TODO until then.

## Notes
- [I6] The three frames (ring-halo, hero-hand, ring-radiant) show an emerald-cut baguette halo, a hand with a stack, and a radiant-cut star-set band; the piece is a round brilliant on an open four-prong head. Labeled: PHOTOS-TODO "Product pages" row and "New American hero" row list them as stand-ins. No line names `signal-solitaire`; add one.
- [H1 band] 36px at 390, 44px at 768 and 1440 (houses 16 to 22): the product brief sets name .h-section 36px / 44px. Deliberate (brief, buy column TYPE).
- [W2 band] Median sentence 14 words (houses 19 to 59): canon voice 2 sets 8 to 14. Deliberate. P90 not in the report.
- [W5 / fold] 1440: 34 elements in the first viewport (band max 27); 390: 8 elements and 8 words, 768: 6 elements and 8 words (band min 11 words). The 1440 count follows the brief's buy-column contents and its "done when" (variants and Add to bag above the fold); the low words at 390 and 768 follow from P1 and clear with Blocker 3.
- [T4] Measure median 34 at 390, 31 at 768, 44 at 1440 (rule 45 to 75): at the edge of the band, no line over 52. Recorded.
- [T6] Caps tracking 0.1em (canon 0.08em). Edge of band. Set `.caps` to 0.08em.
- [C6] `.swatch-dot` is a 22px circle with three inset shadows (house.css:355 to 364). The measured shadow count is 0 and the rule reads the report; canon says no shadows. Flatten to a fill and a 1px `--hair` border.
- [P4] An Add to bag error renders a new `<p role="alert">` above See it in store (PieceForm.tsx), which moves the row. Reserve a `min-h-6` slot. Option changes themselves do not shift (price `min-w-[9ch]`, stone line `min-h-6`, metal hint `h-5`).
- [D6] Not verifiable from the first viewport; the page ends on the sibling tiles then the footer. The brief calls for a closing "Behind the design" sentence; it is not built.

## Seat by seat
| ID | Result | Evidence |
|---|---|---|
| T1 | pass | 3 faces at all widths |
| T2 | fail | Should 1; 15 / 14 / 15px |
| T3 | pass | leading 1.6 (edge, in the serif upper half) |
| T4 | note | median 34 / 31 / 44; max 44 / 52 / 52 |
| T5 | fail | Blocker 4; 11px muted swatch labels; smallest 11 passes |
| T6 | note | caps 9% of blocks, nav and buttons only; no eyebrow; tracking 0.1em |
| T7 | fail | Should 2; 10 sizes |
| T8 | pass | "Signal Solitaire" one line at 1440; 36px at 390 fits one line (about 270 of 358px) |
| T9 | pass | price in Public Sans `.num` tabular; spec table not in the screenshots |
| T10 | pass | section gap 0.08 / 0.09 / 0.19 vh |
| T11 | pass | 12 / 16 / 18 left edges, inside band |
| T12 | fail | Should 3 |
| T13 | pass | name cap top about 5px below the photo top edge (210) at 1440 |
| T14 | pass | no italic or bold emphasis seen |
| C1 | pass | ground #f5f2ec; white only behind photographs and fields |
| C2 | pass | no chromatic text |
| C3 | pass | 0 low-contrast |
| C4 | pass | no gold on the page |
| C5 | pass | no navy on a New American piece |
| C6 | fail | Blocker 1; shadows 0, boxed 0, pills 0; swatch-dot noted |
| C7 | pass | no gradient, no tinted black seen |
| I1 | pass | ring-halo 3/4 view, fills 4:5, no letterbox (a lifestyle surface rather than an empty ground) |
| I2 | pass | hand frame is the second frame |
| I3 | n/a | home rule |
| I4 | pass | 0 text on photographs; "Turn it in 3D" sits on a paper box |
| I5 | pass | three distinct images; siblings use other photos |
| I6 | note | labeled in PHOTOS-TODO ("Product pages", "New American hero") but not by handle |
| I7 | fail | Should 4; ratios all 0.8 (in set), hand frame cropped |
| I8 | pass | house photography; no stock, no AI, no model faces |
| I9 | pass | page without photographs reads as paper and ink |
| W1 | pass | 215 words against 90 visible plus 160 folded |
| W2 | note | median 14; P90 not reported |
| W3 | pass | `npm run lint:house`: 92 files, 0 errors |
| W4 | pass | 0 exclamations, 0 em dashes |
| W5 | note | 8 / 6 / 34 elements; see Notes |
| W6 | pass | "Price before sales tax." once on the page; provenance line is canon-fixed |
| W7 | pass | "Add to bag", "See it in store", "Turn it in 3D", "Complete the set"; no "Shop now" |
| W8 | pass | "Man-made diamond (laboratory-grown)"; provenance line verbatim in the spec table; no handmade or origin claim |
| W9 | fail | Blocker 5; Shoulds 6 and 7 |
| W10 | pass | "Delivery and returns" accordion; footer links Shipping, Returns, Warranty |
| W11 | pass | "Made to order, about 2 weeks" directly under the price |
| W12 | pass | first sentence is about the diamond and its head |
| P1 | fail | Blocker 3 |
| P2 | pass | 1440: the photograph (41% of the viewport, 44px name beside it); 390: the photograph alone (71%) |
| P3 | pass | Version tiles (3) and Metal swatches (4) are visible; Size has 11 values, a select is allowed |
| P4 | note | no shift on option change; error line noted |
| P5 | pass | three frames in a visible grid, no truncation |
| P6 | pass | Keep button in the form and "Kept" in the header |
| P7 | fail | Blocker 2; inputs 16px (`.field` 1rem) |
| P8 | pass | "Made to order, about 2 weeks"; buyable |
| P9 | fail | Should 5 |
| P10 | n/a | no builder CTA on this page |
| P11 | pass | footer links Shipping, Returns, Warranty and both stores |
| P12 | pass | no urgency, upsell, stars or financing in the page |
| P13 | n/a | bag not in the screenshots |
| P14 | pass | "Turn it in 3D" behind the poster; the photograph is the LCP frame |
| D1 | fail | Should 8 |
| D2 | pass | three assets: type on paper, the hand frame, the provenance line |
| D3 | pass | truth kept: the stone, grade and report sit directly under the price |
| D4 | pass | generic part: the stacked tiles, select and full-width black button; the change is registry grammar "No. 014" beside a Tennessee place name in the ref line |
| D5 | pass | no tracked caps eyebrow, middle dot, arrow, numbered marker or icon card |
| D6 | note | not verifiable from the first viewport |
| D7 | pass | one placeholder mark in the header, no slogan |
| D8 | pass | a first-time visitor sees a ring, a price and a button within a second |

## Distinctiveness, in two lines
Hide the name: a reader recognizes Libre Caslon on warm paper and a clean buy column, and the photograph is a baguette-halo ring in sunlight that could sit on any independent jeweler's page; not yet this house.
Forwardable, unhurried: not yet forwardable, because the photographs show three rings that are not the one described; nothing hurries the reader on 1440, but at 390 and 768 the action is out of reach.

## The one change that would most raise this page
Shoot the actual Signal Solitaire (round brilliant on the open four-prong head, a three-quarter frame and a hand frame in daylight). Every number and sentence on the page describes a ring the photographs do not show, and that is the one gap layout and copy cannot close. Until then, Blockers 1 to 5 are the work that can ship now.

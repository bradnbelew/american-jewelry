# Council verdict: line-americana
Date: 2026-10-13. Commit: 67dee4d. Report: reports/line-americana.md.

**APPROVED** (0 Blockers, 4 Shoulds, 11 Notes)

Scope read: first-viewport screenshots at 390, 768 and 1440 (reviewer also viewed a full-page capture at 1440 and 390 from the same dev server, 187 words in `main`: 88 authored, 99 in the ledger), `routes/line.tsx`, `PieceLedger` in `Catalog.tsx`, `Section.tsx` (`PhotoOpener`, `Plate`), `Header`, `house.css`. House lint: 0 errors (16 warnings, none in this page's files). Decisions applied: 2026-10-13 (AI comps allowed on the mockup, so I8 is a Note; stand-ins noted under I6; Source Serif 4; paper #F6F5F2; ledger by decision; eight-name header; opener headline 68/76px).

## Blockers
None. Every house-table row passes at 390, 768 and 1440 (two faces, smallest 11px, longest line 45, no shadows, boxes, pills or radius, no control under 44px, no low contrast, no exclamation points or em dashes, no accent hue in text).

## Shoulds
1. [I5] 390 / 768 / 1440, the opener photograph and row 1 of the Shooting Star ledger: both are `comp-americana-ground` (`PIECE_PHOTOS["shooting-star-ring"][0]`; the page loads `comp-americana-ground-1200` and `-480`). One photograph is on the page twice, 800px apart on a desk. Fix: set `shooting-star-ring` to lead with `gem-stack-rings` (its third frame) in the ledger only, and `prism-band` to lead with `hero-hand`, so `gem-stack-rings` appears once.
2. [I4] 390, opener label "Natural diamonds, F to G, VS1, GIA.": label top sits at y 357 in the screenshot, the lower edge of the graduated stones is at about y 355 (gap of about 4px). The 4:5 frame is 487px tall; the ring's lower edge is at 59% of it and the text block (label, name, lede, 48px bottom padding) is about 190px tall, so the label starts at 288 of 487, the same line. Contrast under the stones is not covered by the overlay's darkest point (the stones are the lightest pixels behind the label). At 768 the gap is about 60px and at 1440 the label is 210px left of the star: clear. Fix: at 390 give the opener `aspect-[3/4]` (520px; label top then at 330, 23px under the ring) or pass an art-directed `tall` source with the ring's lower edge at 55% of the frame or higher.
3. [W6] 390 / 1440, ledger sub-line: "Gold, birthstone or natural diamond" is the same sentence on all ten rows (`whatItIs()` returns one string for every Americana piece), so nine of ten say nothing the opener has not already said; and "Every setting takes a natural or a man-made stone. The name on the box follows the stone." is on this page (`line.tsx` closing screen), in the Bridal panel of the header (`nav.ts:91`, openable on every page) and as a design-page variant (`design.tsx:97`). Fix: in `PieceLedger` for a line page set the sub-line from the piece's own facts (piece type and metals, for example "Ring. Yellow, white or rose gold", from `p.pieceType` and `p.metals`); change the `nav.ts:91` panel line to a different sentence, since this page's closing screen is the one the brief assigns.
4. [T12] Code, gaps off the scale (4, 8, 12, 16, 24, 32, 40, 64, 96, 128): `gap-20` (80px) and `md:gap-28` (112px) between design bands in `line.tsx`; `gap-5` (20px) in the ledger row grid and the beside text column; `py-5` (20px) on `md` ledger rows; `gap-5` (20px) and `pb-12` / `md:pb-20` (48px / 80px) in `PhotoOpener`. Fix: `gap-24 md:gap-32` between bands, `gap-6` and `md:py-6` in the ledger, `gap-6` in `PhotoOpener`, `pb-8 md:pb-16` for the opener's bottom padding (32px, 64px; the 390 clearance in Should 2 then needs the taller frame). If 48 and 80 are meant, add them to the scale in DESIGN.md and record it.

## Notes
- [T7 and H1] H1 is 44px at 390, 68px at 768, 76px at 1440, outside every reference house (max 32 to 40); recorded in `decisions.md` 2026-10-13 ("Every opener headline is 68px at 768 and 76px at 1440"). Distinct sizes 8, 9 and 9 are at the edge of the band (4 to 8.75).
- [T4] Median measure is 36 characters at 390 and 1440 (rule floor 45; 1440 band minimum 40); no line over 45. Cause: the 4-column motif text and one-line labels, which the brief fixes ("4 cols left, ledger 8 right"). Accepted on that written layout.
- [T11] The closing screen is `width="text"` (max-w-5xl), so its sentence starts at about x 246 at 1440 while everything above starts at x 40; 7 alignment axes at 1440, at the edge of the band (8.5 to 29.25). Not outside it.
- [T13] Ledger rows, 1440: the price is `self-start` (top of the row, y about 447 in the 662px view) while the name and sub-line are `items-center` (name about y 462), a baseline gap of about 33px in the original on one row. Fix: set the row to `items-start` and give the name block `pt-1` so name and price share a line.
- [W1] Measured 190 words in `main` at all widths against the 60 to 90 budget. The brief scopes the budget as "60-90 visible words above the grid"; authored copy (label, name, sentence, two motifs, two links, honesty line, beside line and link, bridal sentence, button) is 88; the other 99 are the ten ledger rows (names, sub-lines, prices), which are catalog data. Ruled a Note on that reading. If the ledger counted, the page is over by half and would be a Blocker.
- [W8] The closing sentence says "a man-made stone", not "man-made diamond"; the house term applies directly before "diamond" so this is not a violation, but on a line page whose first line is "natural diamonds" the contrast is cleaner as "a natural or a man-made diamond (laboratory-grown)". Brief draft wording, family sign-off pending.
- [I6] Ledger rows use stand-ins that do not show the piece named: Shooting Star Bracelet and Prism Link Bracelet both show `paperclip-bracelet`; the two signets both show `signet-b`; Prism Link Necklace shows `initial-necklace`; Shooting Star Band shows `script-ring`. Labeled in PHOTOS-TODO ("Product pages", "Design bands"); noted, not failed, per the 2026-10-13 stand-in ruling.
- [I7] Opener ratio at 1440 is 2.05:1 (78vh of 900 against 1440), not 2.2:1; the ring is uncropped at all three widths. At 390 the ring's left edge is about 8px from the frame edge. Ledger thumbnails are 1:1 and the chain leaves the frame at the top in the pendant, dog tag and necklace rows (3, 6, 7). Fix when the shoot lands; for now the thumbnails could use `contain`.
- [I8] Opener (`comp-americana-ground`) and the beside photograph (`comp-home-hand`) are AI comps, listed in PHOTOS-TODO as "replace before launch"; allowed on the private mockup by `decisions.md` 2026-10-13 ("use the ai images for now").
- [C5] `PhotoOpener` sits on `bg-navy`; the report's "#16213a 84%" background share is that fallback behind the photograph. It shows only while the image loads, but it makes the Americana opener open on navy for a moment. Fix: give the opener the photograph's own dark green as its underlay.
- [P9] At 768 the header shows Menu, Search, wordmark, Appointment, Kept, Bag with about 13px between Search and the wordmark and about 18px between the wordmark and Appointment; the eight names and Account move into the menu below the desktop breakpoint. At 1440 all eight names are visible and "Americana" carries the underline.

## Seat by seat
| ID | Result | Evidence |
|---|---|---|
| T1 | pass | 2 faces (Source Serif 4, Public Sans) at all widths |
| T2 | pass | body 18px at 390, 768, 1440 |
| T3 | pass | leading 1.6 |
| T4 | note | median 36 / 45 / 36; max 45 at all widths; see Notes |
| T5 | pass | smallest 11px (nav and buttons); labels 13px |
| T6 | pass | caps 9% of blocks, 11px, 0.1em, on nav, button and the two `.link` controls; labels and headings sentence case; no eyebrow over a heading |
| T7 | note | 8 / 9 / 9 sizes, edge; H1 outside, decided 2026-10-13 |
| T8 | pass | "Americana" on one line at 390, 768, 1440 |
| T9 | pass | prices are `.num` (Public Sans, lining, tabular): "From $1,900" and the column right-aligned |
| T10 | pass | section gap 0.08 vh at 390 (edge), 0.12 at 768, 0.15 at 1440 |
| T11 | note | 3 / 5 / 7 axes, edge; closing screen on its own axis |
| T12 | fail (Should) | 20, 48, 80 and 112px gaps off the scale; see Shoulds 4 |
| T13 | note | price top-aligned, name centered, 33px apart; beside text starts about 8px under the photograph's top (pass) |
| T14 | pass | italic share 0; no bold emphasis |
| C1 | pass | ground #F6F5F2; white and grey only behind packshot thumbnails |
| C2 | pass | no chromatic text |
| C3 | pass | 0 low-contrast; opener text on 0.6 to 0.8 ink overlay |
| C4 | pass | gold not used on this page |
| C5 | note | navy only as the opener's under-photo fallback, not as a ground; see Notes |
| C6 | pass | 0 shadows, 0 boxes, 0 pills, radius 0; hairlines only in the ledger |
| C7 | pass | the one gradient is `.photo-overlay` (ink at 0.8 to 0, not a tinted black) |
| I1 | pass | the ring alone on green leather, three-quarter view, fills the frame |
| I2 | pass | n/a on a product page; the hand screen shows the ring on the finger |
| I3 | n/a | home-page rule; image share 0.58 / 0.78 / 0.78 for reference |
| I4 | fail (Should) | measured text-on-photo 0 (real overlay present); 390 label touches the stones; see Shoulds 2 |
| I5 | fail (Should) | opener photograph repeated as ledger row 1; see Shoulds 1 |
| I6 | note | stand-ins labeled in PHOTOS-TODO |
| I7 | note | opener 2.05:1; chains leave 1:1 thumbs; ring uncropped |
| I8 | note | AI comps, cited decision 2026-10-13 |
| I9 | pass | with photographs removed: paper, ink and hairlines |
| W1 | note | 190 measured, 88 authored above the grid; see Notes |
| W2 | pass | median 12 words; none over 30 |
| W3 | pass | `npm run lint:house`: 0 errors, no warnings in this page's files |
| W4 | pass | 0 exclamation points, 0 em dashes |
| W5 | pass | 7 / 5 / 4 elements in the first viewport |
| W6 | fail (Should) | ten identical sub-lines; bridal sentence on three surfaces |
| W7 | pass | "The Shooting Star design", "Every Americana piece", "Build a ring"; no "Shop now" |
| W8 | pass | "Natural diamonds, F to G, VS1, GIA." matches canon; provenance line verbatim in the footer; no origin or handmade claim; see Notes |
| W9 | pass | prices and stone qualities come from the catalog and canon; nothing invented |
| W10 | n/a | product-page rule (footer links shipping and returns) |
| W11 | n/a | product-page rule |
| W12 | pass | first sentences are about the designs and the settings |
| P1 | n/a | not a product page |
| P2 | pass | the eye lands on the ring at 1440 and 768; at 390 the ring and the name are separate by about 4px but the ring leads |
| P3 | n/a | no options |
| P4 | pass | no controls that change state; ledger rows fixed at 160px |
| P5 | n/a | no gallery |
| P6 | n/a | not a product page |
| P7 | pass | 0 controls under 44px at all widths; `.link` 44px, `.btn` 48px |
| P8 | n/a | no made-to-order state on this page |
| P9 | pass | 8 names visible at 1440 with the current line underlined; note on 768 |
| P10 | pass | "Build a ring" is the brief's text; no "Customize" or "Design your own" |
| P11 | pass | footer: Shipping, Returns, Warranty, both addresses |
| P12 | pass | no urgency, counters, stars, upsell or financing |
| P13 | n/a | no bag on this page |
| P14 | n/a | no 3D view on this page |
| D1 | pass | see below |
| D2 | pass | type on the paper (Source Serif 4 at 76px on neutral paper); the provenance line in the footer; the hand frame (`comp-home-hand`); the design name as headline |
| D3 | pass | the object as protagonist (one ring, one light, one ground) and naming (each design's name set at 40 to 56px beside its pieces) |
| D4 | pass | the closing screen is the generic part; see the last section |
| D5 | pass | no tracked caps eyebrow (label is sentence case), no middle dots, arrows, 01/02/03, icon cards, ornaments, three-card rows |
| D6 | pass | ends on an invitation ("Build a ring"), then the two addresses |
| D7 | pass | one wordmark in the header, one in the footer; no slogan |
| D8 | pass | a line page that opens on one photograph, then the designs and their prices; nothing a first-time visitor must decode |

## Distinctiveness, in two lines
Hide the name: a yellow-gold five-point star on deep green leather, then each design's name set large beside a ledger of its pieces with one photograph per row, is recognizable as this house's Americana; the Source Serif on neutral paper alone could be any fine jeweler, and the ledger rows' grey packshots are the part that reads as a store. Forwardable, unhurried: yes, the opener is a screen worth sending, and nothing on the page rushes the reader (no count, no sale, no popup).

## The one change that would most raise this page
Fix the ledger's sub-line (Should 3): ten rows that say the same thing about different pieces is the one place the page stops being specific. Setting each row's line from the piece's own piece type and metals turns the ledger from a list of names and prices into the record of the line, and it removes the repeated sentence the opener already carries.

The closing screen (a 17px sentence left and a black button right on `max-w-5xl`) is the part produced for any jewelry brief; recompose it as a `LineScreen`, one 48px sentence on the page's own left edge with "Build a ring" under it, to bring it onto the same axis as the rest.

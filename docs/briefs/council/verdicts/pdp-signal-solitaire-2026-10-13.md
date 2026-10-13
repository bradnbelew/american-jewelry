# Council verdict: pdp-signal-solitaire
Date: 2026-10-13. Commit: e8c8367. Report: reports/pdp-signal-solitaire.md.

**APPROVED** (0 Blockers, 8 Shoulds, 12 Notes)

Scope: `/pieces/signal-solitaire` with "See it in the light" as the default (no flag). Numbers in the seat table come from the report (room closed). The room was judged from the code and from a headless SwiftShader open I ran at 390 and 1440 (stone rendering is rough under SwiftShader and was not judged). Control sizes at 390 were read from the DOM. Previous verdicts: `pdp-signal-solitaire-2026-10-12.md` (5 Blockers) and `pdp-signal-solitaire-light-2026-10-13.md` (1 Blocker, 15 Shoulds); each is checked first in Notes. Decisions of 2026-10-13 are applied: AI comps on the private mockup (I8 is a Note; C08's six prongs accepted), stand-ins are I6 Notes, Source Serif 4 and Public Sans, paper `#F6F5F2` with the packshot on it, the eight-name header, `.link` at 44px.

## Blockers
None.

## Shoulds
1. [T7] 390 (9 sizes, edge), 768 and 1440 (10 sizes, band max 9): 11, 13, 14, 15, 16, 17, 18, 24, 36, 44 and 48 by share. The strays are `.opt` at 14px (house.css:284), the stone line and the Add to bag error at 15px (`text-[0.9375rem]`, PieceForm.tsx:61, 152), the ledger price at 15px below 768 (Catalog.tsx:78) and the description at 17px (piece.tsx:164). Fix: 14 and 15 to 16, 17 to 16 (or 18); leaves 7.
2. [T12] Off-scale values in code (scale 4, 8, 12, 16, 24, 32, 40, 64, 96, 128): `gap-1.5` 6px (PieceForm.tsx:59), `mb-5` 20px on both swatch variants with the label at `-bottom-5` (PieceForm.tsx:79, 89, 101), the buy bar and the room's top row at `h-[4.5rem]` 72px (PieceForm.tsx:166; Viewing.tsx room header), `.spec` cell padding 0.7rem 11.2px (house.css:474). Resolved since 10-13: `gap-5` and `pb-5` are gone. Fix: 6 to 8, 20 to 24, 72 to 64, 0.7rem to 0.75rem.
3. [W7] 390 and 1440, size row: the link beside "Size" reads "Help" (PieceForm.tsx, `Field` hint). The brief's CONTENT line names it "Sizing help". Fix: "Sizing help".
4. [P7] 390, in-flow anchors under 44px: breadcrumb "New American" 88 x 21 and "Signal" 39 x 21, "Help" 29 x 15, the accordion links "igi.org" 48 x 22, "policies page" 96 x 22, "book an hour" 98 x 22, the phone numbers 19 and 16px tall, footer links 40px (`min-h-10`, Footer.tsx:84; the last commit message says 44). The report's control count skips anchors, which is why it shows 0 (site-wide, as in 2026-10-13 light verdict). Fix: standalone links (breadcrumb, "Help", footer, phone numbers) take `inline-flex min-h-11 items-center`; inline links inside a sentence may stay.
5. [P6] 390: Kept is not in the header bar (`hidden sm:inline-flex`, Header.tsx); it is the fourth line of the Menu list. The Keep button in the form passes, and 768 and 1440 show KEPT. Unresolved from 2026-10-13. Fix: show Kept in the 390 bar beside Bag, or log the Menu route as the reach.
6. [W6] 1440 and 390, the display sentence after the accordions: "A solitaire in yellow gold, white gold, rose gold or platinum, set with one man-made diamond, finished at our bench." (21 words, 48px; `madeOf()` in piece.tsx). It restates the description ("One man-made diamond on an open four-prong head"), the four Metal swatches and the Made row, and the grade is also stated four times (stone line, spec Center, accordion, the room). Rule: every sentence once. Fix: drop the generated sentence for the brief's closing "Behind the design" line (still unbuilt), or end the page on that line; keep the grade in the stone line and the spec table, and let the accordion carry only the report and growth-method sentence.
7. [W9] "Care and warranty" accordion (piece.tsx): "Defects in materials and workmanship covered for the original owner." The policies page, which it links, says "for the life of the piece" (policies.tsx:35). "Original owner" comes from the Proposed split in company/06 line 26 and research/04, not from the live policy. Two answers to one warranty question. Fix: use the policies words ("covered for the life of the piece") until counsel rewrites both.
8. [D1] 1440, wordmark covered: the first viewport is a well-set platinum solitaire on paper with a clean buy column; the ref line "Ref. NA 014, New American" has no place name. A reader would recognize Source Serif on paper, not this house; it could be another independent jeweler's page. Unresolved from 2026-10-12. Fix: registry grammar once the family names the place (number plus a Tennessee place name); log TODO until then.

## Notes
- [Previous Blockers and Shoulds, resolved] 2026-10-13 Blocker (room links about 23px): Close, Look closer, Step back measured 44px tall at 390 and 1440 (DOM). Shoulds: stone drawn at the selected Version's carat (piece.tsx passes `carat`; room text reads "about 6.5 mm" at 1.00 ct, the lead measured 8.2 mm at 2.00 ct); "Shown larger than life. The stone is about N mm across." appears when looking closer; no button without WebGL or under reduced motion (`gl &&`, PieceGallery.tsx); gold focus ring on `.link`; the grade is the company/06 line; hallmark row "Karat mark, inside the shank"; warranty "The center stone is not covered; insure it separately."; spec table and accordions 16px (T2 passes, median 16 at all widths); hand frame 4:3 from 768 and fully shown at 390; the 2026-10-12 Blockers (radius 0, 44px MENU, price and action in the first viewport, 13px muted swatch labels, growth-method sentence) stay resolved.
- [I8, I6, decisions 2026-10-13] The first two frames are comps C07 (platinum packshot on paper) and C08 (hand, six prongs; Signal has four, accepted). Both are in PHOTOS-TODO "AI comps in use". The third frame is `ring-halo`, a different ring (emerald-cut baguette halo); PHOTOS-TODO has no row naming `signal-solitaire`. The packshot is platinum while the form opens on 14k yellow and the room draws yellow gold. Only three frames exist (band min 4 large images at 390).
- [Bands, recorded] H1 36 / 44 / 44px (houses 16 to 22): the brief sets the name at `.h-section` 36 / 44. Median sentence 9 words (houses 18 to 23): canon voice 2 sets 8 to 14. 1440: 34 elements in the first viewport (band max 27, W5 seven): the brief's DONE WHEN asks for variants and Add to bag above the fold. Header links 16 at 1440 and 5 at 390 (the screenshot shows 3 visible): the eight-name header is decided 2026-10-13.
- [P7] The room's Close is 41 x 44px at 390 and 1440; it is the only exit on a phone. Height meets the rule; WCAG 2.5.5 reads 44 x 44. Fix: `min-w-11` on Close.
- [P14] 1440: the entry button sits at y=1155 to 1203, 255px below the 900 fold, and the ring's lower band is cut by the fold (frame is a 806 x 1008 4:5 holding a 806 x 672 packshot). At 390 the button is at y=432 (visible). The poster and `priority` image load first and the scene mounts only on open, so P14 passes.
- [C1, I1] The packshot is 1 to 3 levels darker than the paper at its edges (`#F6F4F0` against `#F6F5F2`, about 1.01:1); a faint tile edge shows at 768 (x=40 to 728, y=308 to 882) and 1440 (x=806). Far below the old 1.10 near-miss, recorded. Fix at the next comp pass: matte the file to exactly `#F6F5F2`.
- [Third frame] 390 and 1440: `ring-halo` is a 4:5 frame in a two-column grid with one item (PieceGallery.tsx `rest.slice(1)`), so half the row is empty paper beside it. Fix: `md:col-span-2` at 4:3 like the hand, or leave it out until the photographs are shot.
- [T6] Caps tracking measured 0.1em at all widths against canon 0.08em (edge of band); `.caps` itself is 0.08em, so a `.btn` or the wordmark sets the figure.
- [C6] `.swatch-dot` is a 22px circle (`border-radius: 9999px`, house.css:386) with a 1px hair border; shadows are gone. The report counts 0 rounded elements because the dot is not a control. Canon says no radius and no chips.
- [P4] The Add to bag error line (PieceForm.tsx:152) has no reserved slot and moves the row. Unresolved Note.
- [C1, C5] The room is on ink `#121212` with paper on ink 16.8:1, not the canon's 3D ground and not navy; it is written in the brief ("on ink") and decisions 2026-10-12 and 2026-10-13. The grade at 390 and 1440 wraps "laboratory-/grown), ... as/grown." in a 34ch column and ends on the one-word line "grown."; widen to `max-w-[40ch]`. The grade reads "D to F" where company/06 writes "D-F".
- [D6] The page ends on the sibling ledger and the footer's two addresses; the closing "Behind the design" sentence is not built.

## Seat by seat
| ID | Result | Evidence |
|---|---|---|
| T1 | pass | 2 faces (Source Serif 4, Public Sans) at all widths |
| T2 | pass | median 16 / 16 / 16px |
| T3 | pass | leading 1.6 (edge, serif upper half) |
| T4 | note | median 34 / 31 / 44; max 44 / 52 / 52 |
| T5 | pass | smallest 11px (caps controls); muted 13px |
| T6 | note | caps 10 / 10 / 9% of blocks, nav and buttons; no eyebrow; tracking 0.1em |
| T7 | fail (Should) | Should 1; 9 / 10 / 10 sizes |
| T8 | pass | "Signal Solitaire" one line at 390 (36px) and 1440 (44px) |
| T9 | pass | price and ledger prices in `.num`, tabular; specs in Source Serif lining |
| T10 | pass | section gap 0.08 / 0.09 / 0.19 vh |
| T11 | pass | 11 / 12 / 12 left edges |
| T12 | fail (Should) | Should 2 |
| T13 | pass | the frame and the name column start at the same top; the ring starts lower only because the packshot carries paper margin |
| T14 | pass | no italic or bold emphasis (the room's grade is roman) |
| C1 | pass | ground `#f6f5f2`; white only in `.opt`, `.swatch`, `.field` fills (DOM check); the room on ink recorded |
| C2 | pass | no chromatic text |
| C3 | pass | 0 low-contrast; room text paper and paper/80 on ink |
| C4 | pass | gold only in the focus ring |
| C5 | pass | no navy; the room is ink |
| C6 | note | measured 0 shadowed, 0 boxed, 0 pills, radius 0 on controls; swatch-dot circle |
| C7 | pass | `.viewing-foot` is a real overlay under the room's words; no other gradient |
| I1 | pass | the packshot shown whole on the paper (contain) at 1:1 at 390 and 4:5 from 768, by decision; ring cut by the 1440 fold, see Notes |
| I2 | pass | the hand frame is the second frame, ring fully shown at 4:5 (390) and 4:3 (768, 1440) |
| I3 | n/a | home rule |
| I4 | pass | 0 text on photographs; the entry button has its own paper fill |
| I5 | pass | three distinct images; the room is a render |
| I6 | note | stand-ins and the metal mismatch, see Notes |
| I7 | pass | 1:1, 4:5, 4:3 from the house set; hand no longer cropped; third frame noted |
| I8 | note | AI comps on the private mockup per decisions 2026-10-13 |
| I9 | pass | the page without photographs reads as paper and ink |
| W1 | pass | 225 to 229 words against 90 visible plus 160 folded |
| W2 | pass | median 9 (canon 8 to 14); none over 30 (longest the 21-word display sentence) |
| W3 | pass | `npm run lint:house`: 102 files, 0 errors, 16 warnings (none on this page's words) |
| W4 | pass | 0 exclamations, 0 em dashes |
| W5 | note | 10 / 9 / 34 elements; the brief's contents |
| W6 | fail (Should) | Should 6 |
| W7 | fail (Should) | Should 3; "See it in the light", "Look closer", "Step back", "Add to bag", "See it in store" name their scope; no "Shop now" |
| W8 | pass | "Man-made diamond (laboratory-grown)"; "man-made" hyphenated (non-breaking) before "diamond"; provenance line verbatim in the Made row; no handmade or origin claim |
| W9 | fail (Should) | Should 7; every other fact traces to data.ts, 03-brand-architecture or policies.tsx |
| W10 | pass | "Delivery and returns" accordion; footer links Shipping, Returns, Warranty |
| W11 | pass | "Made to order, about 2 weeks" under the price |
| W12 | pass | the first sentence is about the diamond and its head |
| P1 | pass | price y=388, Add to bag y=841 to 889 at 1440; the buy bar at 390 and 768 |
| P2 | pass | 1440: the ring (0.43 of the viewport) beside the 44px name; 390: the photograph alone (0.75) |
| P3 | pass | Version tiles (3) and Metal swatches (4) visible; Size 11 values in a select |
| P4 | note | no shift on option change (price `min-w-[9ch]`, stone line `min-h-6`); the error line has no slot |
| P5 | pass | all frames visible in a stack, no truncation |
| P6 | fail (Should) | Should 5 |
| P7 | fail (Should) | Should 4; buttons and inputs pass (48px, 16px) |
| P8 | pass | "Made to order, about 2 weeks"; buyable |
| P9 | pass | JEWELRY is underlined on a piece page; the breadcrumb names "New American / Signal" |
| P10 | n/a | no builder CTA |
| P11 | pass | footer links Shipping, Returns, Warranty and both stores |
| P12 | pass | no urgency, upsell, stars or financing |
| P13 | n/a | bag not in scope |
| P14 | pass | button behind the photograph; scene mounts on open; no button without WebGL or under reduced motion; first frame is the LCP image |
| D1 | fail (Should) | Should 8 |
| D2 | pass | type on paper, the hand frame, the provenance line, the room ("in the light") |
| D3 | pass | light (the room) and truth kept (stone, grade, report beside the price) |
| D4 | note | see below |
| D5 | pass | no tracked caps eyebrow, middle dot, arrow, numbered marker, icon card or ornament |
| D6 | note | the page ends on siblings and the addresses |
| D7 | pass | one placeholder mark, no slogan |
| D8 | pass | a ring, a price and a button inside a second |

## Distinctiveness, in two lines
Hide the name: the first viewport reads as a calm, well-set product page (Source Serif on warm-grey paper, one packshot, a quiet buy column) that any good independent jeweler could own; the room, one lamp on ink with the stone's millimetres, is the moment that is this house, and it sits behind a button below the 1440 fold. Forwardable, unhurried: yes to the room once opened, and nothing hurries the reader at any width; not yet forwardable as a page, because the photographs are comps and a different ring in the third frame.

D4, the generic part: the stack of tiles, swatches, select and full-width black button is the template every jeweler ships; the change that makes it this house's is the registry ref line carrying a Tennessee place name and the room's millimetre line moved up to the first frame as "A 1.00 ct stone is 6.5 mm across."

## The one change that would most raise this page
Move the first frame's object into the fold at 1440 (crop the packshot's paper margin so the ring and "See it in the light" sit inside the 900px viewport), because the page's single distinctive moment is currently 255px out of sight; then clear Shoulds 6 and 7, which are copy only.

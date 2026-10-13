# Council verdict: pdp-signal-solitaire-light
Date: 2026-10-13. Commit: 039517a. Report: reports/pdp-signal-solitaire-light.md.

**NOT APPROVED** (1 Blockers, 15 Shoulds, 11 Notes)

Scope: `/pieces/signal-solitaire?viewing=light`. The first frame carries "See it in the light" and opens a full-screen dialog on ink (`PieceGallery.tsx`, `Viewing.tsx` `ViewingRoom`). The report measures the page with the room closed; the room was judged from `viewing-live/pdp-room-open__*` and `pdp-room-closer__*` (sizes and colors below were read from those files) and from code. The three frames are stand-ins and the room is a render from the builder's geometry; stand-in status is under I6 and is not failed, as instructed. Previous verdict: `pdp-signal-solitaire-2026-10-12.md` (5 Blockers); each is checked first in Notes.

## Blockers
1. [P7] 390, 768, 1440, the room's "Close", "Look closer" and "Step back" (Viewing.tsx:210 to 216 and 227 to 234): `.link` boxes about 23px tall (11px x 1.6 + 4.8 + 1); in the shots the focus ring on Close is 45 x 28 px and the "Look closer" text with its rule is 86 x 19 px. Floor 44px (WCAG 2.5.5 enhanced; house rule), and the brief's CONTROLS line for this room says "links 44px". On a phone Close is the only way out (no Escape key). "Tilt to see the fire" passes (190 x 48 px). In-flow `.link` anchors elsewhere stay a Should (site-wide, open-questions D); a modal's only exit is not in-flow. Fix: give the three buttons `min-h-[44px] min-w-[44px]` (inline-flex, items-end, padding-block 12px) with the underline kept on the label.

## Shoulds
1. [I6] 1440 and 390, the room's stone: `VIEWING["signal-solitaire"]` draws 1.5 ct (pieces.ts:40; diameter 6.5 x cbrt(1.5) = 7.44 mm by the builder's formula) while the page opens on Version 1.00 ct at $3,200 (6.5 mm). `PieceGallery` receives the metal but not the version, so the stone is 14% wider than the one priced beside it, and Version 1.50 and 2.00 draw the same stone. Fix: pass the selected Version's carat (1.00, 1.50, 2.00) into `ViewingRoom`; the page already holds `product.selectedOrFirstAvailableVariant`.
2. [Outside the rubric: product.md gallery DON'T "enlarged stone images without a true-size note"; company/06 product-page row; research/04 §23.1 Note 3] 1440, "Look closer": the stone is about 315 px wide (x=561 to 875) against about 28 px actual (7.44 mm at 96 dpi), roughly 11x, next to the grade line, with no true-size note. No string "true size" or "actual size" exists in `app/`, so the page's photographs carry none either. Fix: one line under the grade when closer is on, from the builder's own figure (6.5 x cbrt(carat) mm), wording to counsel; add the same line near the gallery.
3. [Outside the rubric: brief STATES "reduced motion = no room (the photograph stays)"; canon Motion "full reduced-motion fallback"] Under `prefers-reduced-motion` or without WebGL, `useWebGL()` is false but the button still renders and opens a black full-screen dialog reading "The light needs WebGL, which this browser has turned off." (Viewing.tsx:200 to 204), which is untrue under reduced motion. Fix: render the plain first frame (no button) when `useWebGL()` is false; export the hook for `PieceGallery`.
4. [Outside the rubric: canon Controls "gold focus ring"] `.link` has no `:focus-visible` rule (house.css has none outside `.btn`, `.opt`, `.pill`, `.swatch`). `showModal()` focuses Close, and the shot shows the browser's white rounded ring around it. Fix: `.link:focus-visible { outline: 2px solid var(--gold); outline-offset: 2px; }`.
5. [W9] 1440 and 390, "Look closer" grade line: "VVS: inclusions very difficult to see at 10x." (pieces.ts:39) is not in the briefs; company/06 line 37 gives "Man-made diamond (laboratory-grown), D-F, VVS, IGI report, as grown." Fix: use the sourced line; it also stops the grade being stated a fourth time in new words (W6 note).
6. [W9] Spec row Hallmark: "Karat mark and the house mark, inside the shank" (data.ts:435). No house mark exists (logo paused). Unresolved from 2026-10-12 (Should 6). Fix: "Karat mark, inside the shank".
7. [W9] "Care and warranty": "The center stone is insured separately." (piece.tsx:248) reads as the house insuring it. Unresolved from 2026-10-12 (Should 7). Fix: "The center stone is not covered; insure it separately."
8. [W2] all widths: median sentence 15 words (rule 8 to 14), P90 41 (none over 30). The report gives counts only; the likely source is the spec table, whose cells have no terminal period and run together (Center, Band, Hallmark, Made are about 36 words). Fix: end each spec value with a period or split on rows in the script, then re-measure.
9. [T2] 390 / 768 / 1440: prose median 15 / 14 / 15px (band 16 to 18; rule 16 to 20). `.spec td` 0.875rem and the accordions `text-[0.9375rem]` (piece.tsx:225, 247, 257, 263) are unchanged. Unresolved (Should 1). Fix: 1rem for both.
10. [T7] all widths: 10 distinct sizes (band max 9): 11, 13, 14, 15, 16, 17, 18, 36, 44, 56. Unresolved (Should 2). Fix: 14 and 15 to 16 (see T2), 17 to 16 or 18.
11. [T12] off-scale gaps in code: `gap-1.5` 6px (PieceForm.tsx:59), `md:gap-5` 20px (PieceGallery.tsx:53, 56), `pb-5` 20px x4 (piece.tsx), `mb-5` 20px (PieceForm.tsx:89, 101), and the room's `h-[4.5rem]` 72px. Unresolved (Should 3). Fix: 6 to 8, 20 to 24 (or 16), 72 to 64.
12. [I7] 390, second frame: the 2000 x 875 hand panorama sits in a 4:5 frame and the ring on the finger is cut by the left and bottom edges. Unresolved (Should 4). Fix: show it at 2.2:1 full width, or `object-position` on the ring.
13. [P6] 390: Kept is not in the header bar (`hidden ... sm:inline-flex` below 640px); it is the fourth line of the Menu list. The Keep button in the form passes. 1440 and 768 show KEPT. Fix: show Kept in the 390 bar beside Bag, or count the Menu route as the reach and log it.
14. [P9] 1440: nothing marks "New American" as the current scope on a New American piece (no underline under NEW AMERICAN in the shot); 390 report counts 5 header links against a band max of 4 (3 visible). Unresolved (Should 5). Fix: pass the piece's line to the header so that link takes `border-ink`; hide the extras at 390.
15. [D1] 1440, wordmark covered: the first viewport is unchanged and reads as a well-set independent jeweler's product page; the ref line "Ref. NA 014, New American" has no place name. Unresolved (Should 8). Fix: registry grammar once the family names the place; log TODO until then.

## Notes
- [Previous Blockers, all resolved] (1) select radius: `.field { border-radius: 0 }` (house.css:309); report "Largest control radius 0" at 390, 768, 1440. (2) MENU 44px: Header.tsx MENU button is `h-11` (44px); report "Controls under 44px tall 0" at every width. (3) Price and action in the first viewport: `.buy-bar` fixed bar, `lg:hidden` (PieceForm.tsx:166); report row "price in, action in" at 390, 768, 1440; 1440 price y=387, button y=840 to 888; shots show the bar at y=771 to 844 (390) and 951 to 1024 (768). (4) Swatch and "Sold out" labels: `text-[0.8125rem]` (PieceForm.tsx:79, 84), 13px. (5) Growth method: piece.tsx:228 now reads "Growth method and any post-growth treatment are printed on the IGI report."; no "chemical vapor" remains on the page.
- [C1, C5] The room is on ink `#121212` (paper on ink 16.8:1), not the canon's stone 3D ground `#E9E7E2`, and not navy. The departure is written in the brief ("Proposed 2026-10-12", "full-screen dialog on ink") and in decisions 2026-10-12 (canon tokens unchanged until the owner chooses); adopting it needs B30 (c).
- [P14] The entry sits at the foot of the first frame: y=1105 to 1153 at 1440, 205px below the 900 fold; y=962 to 1010 at 768, under the 73px buy bar (951 to 1024); y=521 to 569 at 390, visible. P14 itself passes (poster first, `priority`; the scene mounts only when the room opens).
- [P4] "Look closer" to "Step back" changes the link from 86px to 68px wide; at 1440 its left edge moves from x=1298 to 1316. The grade paragraph grows upward from a bottom-anchored row, so no other control moves. The Add to bag error line still has no reserved slot (PieceForm.tsx:151; unresolved Note).
- [T14] The grade is 18px italic Caslon as a three-line caption (brief-specified), not emphasis in running text; the measured italic share is 0 with the room closed.
- [I6] Both stand-ins stay: the photographs (halo ring, hand, radiant band) show rings other than the round brilliant described (PHOTOS-TODO "Product pages"; no line names `signal-solitaire`); the room draws the round brilliant on an open four-prong head, which is the described design but not a photograph. PHOTOS-TODO has no row for the room's render.
- [W6] The grade is stated four times on the page: stone line, spec table, accordion, and the room.
- [C6] `.swatch-dot` still carries three inset box-shadows and a 9999px radius (house.css:356 to 365); measured shadowed 0. Unresolved Note; canon says no shadows. Fix: flat fill and a 1px `--hair` border.
- [W5, bands] 1440: 34 elements in the first viewport (band max 27) follows the brief's buy-column contents; H1 36 / 44 / 44px (houses 16 to 22) is the brief's size; caps tracking 0.1em against canon 0.08em.
- [P7] The shared header Bag and Kept links are `h-10` (40px, Header.tsx:70, 81); the script skips anchors, so the report shows 0.
- [D6] The page ends on siblings and the footer; the brief's closing "Behind the design" sentence is still not built.

## Seat by seat
| ID | Result | Evidence |
|---|---|---|
| T1 | pass | 3 faces |
| T2 | fail (Should) | 15 / 14 / 15px |
| T3 | pass | leading 1.6 (edge, serif upper half) |
| T4 | note | median 34 / 31 / 44; max 44 / 52 / 52 |
| T5 | pass | swatch labels 13px; smallest 11 (caps controls) |
| T6 | note | caps 9%; no eyebrow; the room's links are caps `.link`; tracking 0.1em |
| T7 | fail (Should) | 10 sizes |
| T8 | pass | "Signal Solitaire" one line at 390 and 1440 |
| T9 | pass | price in `.num` tabular |
| T10 | pass | section gap 0.08 / 0.09 / 0.19 vh |
| T11 | pass | 13 / 17 / 18 axes |
| T12 | fail (Should) | off-scale gaps |
| T13 | pass | name cap top about 6px below the photo top edge (210) at 1440 |
| T14 | note | grade caption italic |
| C1 | pass | ground `#f5f2ec`; white behind photographs and fields; room on ink recorded as a proposal |
| C2 | pass | no chromatic text |
| C3 | pass | 0 low-contrast; room text paper on ink 16.8:1 |
| C4 | pass | no gold on the page |
| C5 | pass | no navy; the room is ink |
| C6 | note | `.swatch-dot` shadows; select radius resolved; measured 0 |
| C7 | pass | `.viewing-foot` is a real overlay under the room's words; no other gradient |
| I1 | pass | first frame fills 4:5, no letterbox |
| I2 | pass | hand frame is the second frame (cropped, see I7) |
| I3 | n/a | home rule |
| I4 | pass | 0 text on photographs; the entry button has its own paper fill |
| I5 | pass | three distinct images; the room is a render |
| I6 | fail (Should) | 1.5 ct room vs 1.00 ct selected; stand-ins noted |
| I7 | fail (Should) | hand frame cropped at 390 |
| I8 | pass | house photography and house-geometry render |
| I9 | pass | page without photographs reads as paper and ink |
| W1 | pass | 216 to 220 words against 90 visible plus 160 folded |
| W2 | fail (Should) | median 15; P90 41 |
| W3 | pass | `house-lint`: 95 files, 0 errors |
| W4 | pass | 0 exclamations, 0 em dashes |
| W5 | note | 34 elements at 1440 (brief); 11 at 390, 9 at 768 |
| W6 | note | grade stated four times |
| W7 | pass | "See it in the light", "Look closer", "Step back", "Add to bag"; no "Shop now" |
| W8 | pass | "Man-made diamond (laboratory-grown)"; provenance line verbatim in the spec table |
| W9 | fail (Should) | three findings, Shoulds 5 to 7 |
| W10 | pass | "Delivery and returns" accordion; footer links |
| W11 | pass | "Made to order, about 2 weeks" under the price |
| W12 | pass | first sentence is about the diamond and its head |
| P1 | pass | resolved; price y=387, button y=840 to 888 at 1440; bar at 390 and 768 |
| P2 | pass | 1440: the photograph (0.41 of the viewport); 390: the photograph alone (0.71) |
| P3 | pass | Version tiles (3) and Metal swatches (4) visible; Size 11 values in a select |
| P4 | note | no shift on option change; Look closer label swap 18px; error slot |
| P5 | pass | three frames visible, no truncation |
| P6 | fail (Should) | Kept inside the Menu at 390 |
| P7 | fail (Blocker) | room links about 23px; buttons 48px; inputs 16px |
| P8 | pass | "Made to order, about 2 weeks"; buyable |
| P9 | fail (Should) | no scope marker; 390 count 5 |
| P10 | n/a | no builder CTA |
| P11 | pass | footer links Shipping, Returns, Warranty, both stores |
| P12 | pass | no urgency, upsell, stars or financing |
| P13 | n/a | bag not in scope |
| P14 | pass | button behind the photograph; scene mounts only on open; first frame is the LCP image |
| D1 | fail (Should) | Should 15 |
| D2 | pass | type on paper, the hand frame, the provenance line (spec table) |
| D3 | pass | light (the room) and truth kept (stone, grade, report under the price) |
| D4 | note | see below |
| D5 | pass | no tracked caps eyebrow, middle dot, arrow, numbered marker or icon card |
| D6 | note | see Notes |
| D7 | pass | one placeholder mark in the header, no slogan |
| D8 | pass | ring, price, button within a second; the entry is secondary |

## Distinctiveness, in two lines
Hide the name: the first viewport is a well-set jeweler's product page; the room (one lamp, Caslon title, the grade in italic) is the one moment that reads as this house, and it sits behind a button 205px below the fold at 1440. Forwardable, unhurried: not yet, since the photograph and the room show two different rings and the stone is 14% too large; nothing hurries the reader, and the room opens only on request.

D4, the generic part: the ring turning on a dark floor, which any 3D viewer ships; the change that makes it this house's is the actual Signal Solitaire photographed under one lamp on the counter ink, with the registry-style ref line carrying a Tennessee place name.

## The one change that would most raise this page
Clear Blocker 1 (about ten lines of code), then pass the selected Version's carat into the room so the stone on the screen is the stone priced beside it; with the true-size line and the reduced-motion fix, the room is ready to adopt.

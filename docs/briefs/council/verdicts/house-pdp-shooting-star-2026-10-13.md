# Council verdict: house-pdp-shooting-star
Date: 2026-10-13. Commit: working tree after f0f071d. Report: reports/house-pdp-shooting-star.md.

**APPROVED** (0 Blockers, 3 Shoulds, 5 Notes)

## Blockers
None.

## Shoulds
1. [T4] 390, prose measure: median 46 characters is one character beyond the reference maximum of 45, though safely within the house's 80-character hard limit. Fix: target 45ch for the mobile product description, without shrinking the 16px prose.
2. [W5] 1440, first viewport: 29 elements remain above the reference maximum of 27, improved from 31. Fix: target at most 27 by grouping reference and version metadata; retain explicit choices and the primary action.
3. [P6] 390, header: Kept is hidden below the `sm` breakpoint; the product can be kept, but the saved collection is reached through the menu. Fix: expose one 44px Kept control in the phone header or a persistent product utility row.

## Notes
- [T7, T8, T10, W1] The 31/38/38px product heading exceeds the reference heading band; the 1440 section gap is at its edge (0.30 viewport). The page now totals 252/252/248 words, including controls and siblings. These are accepted under the latest 2026-10-13 decision permitting object-led names, variable section spacing and deeper-catalog budgets; the heading is one line at 390 and 1440.
- [I2, I3, I5, I6, I8, P5] Generated photographs and selectable thumbnails are authorized by the latest canon, decisions and PHOTOS-TODO. The first two views are the object and a worn hand; three views are visibly reachable. The script counts one large image because only the active slide is rendered. Its 390 image share of 0.35 is outside the band, while 0.60/0.40 at 768/1440 are edge values; the visible thumbnails, caption and persistent action deliberately share this screen. The pictured diamond version remains a concept illustration when Solid gold is selected; obtain accurate version photography before customer launch.
- [T3, T4, T6, T7, W2, P7, P9] Recorded band edges: leading 1.6 at every width; maximum line 55 at 1440; nine sizes at 768/1440; caps tracking 0.10em; 59 fold words at 390; zero short controls at 390/1440; header links 6/13 at 768/1440. Five reported links at 390 exceed the reference maximum of four, but the latest five-destination navigation decision governs. Sentence median 10 is outside the longer reference band and inside the house's explicit 8–14-word target.
- [W9, P1, P8] This is the local fallback with catalog prices and a viewing request, not verified live checkout. It labels its price as a review value and disables checkout. Existing 3-week lead time, dimensions, engraving inclusion and policy text still require confirmation before customer launch, as recorded in PHOTOS-TODO. This verdict approves the mockup page, not those commercial claims or payment delivery. House lint: 107 files, 0 errors, 10 warnings, none in these page files.
- [T7, T12, I7, W6] Reviewed again against the refreshed 04:23 UTC report and current code: 8/9/9 type sizes, 16px descriptive prose, 24px configurator spacing, desktop 1:1 stage and one provenance statement. The final mobile ratio correction is verified in code: both the base rule at line 98 and the max-width:599px override at line 225 of house-experience.css now specify 1. No new PDP screenshot was taken; the prior phone screenshot predates that last correction. I7 is closed on this direct code evidence, resolving four earlier Shoulds in total. No implementation files were changed by the reviewer.

## Seat by seat
| ID | Result | Evidence |
|---|---|---|
| T1 | pass | Two faces at 390/768/1440. |
| T2 | pass | Prose median 16px at all widths. |
| T3 | note | Leading 1.6, reference edge and within the house range. |
| T4 | fail | Median 46/55/46; phone median exceeds its band by one, while maxima 46/55/55 pass the hard limit. |
| T5 | pass | Minimum 11px; muted labels use 13px or larger. |
| T6 | note | Caps confined to navigation/actions and the wordmark; tracking 0.10em is an edge. |
| T7 | pass | 8/9/9 sizes after consolidation; heading departure accepted. |
| T8 | pass | Shooting Star Ring holds one line at 390 and 1440. |
| T9 | pass | Price and option prices use `.num`, with lining tabular figures. |
| T10 | note | Section gaps 0.11/0.11/0.30; last is an accepted edge. |
| T11 | pass | 10/15/17 alignment axes, inside reference bands. |
| T12 | pass | Fallback configurator now uses 24px `gap-6`; typical gaps measure 24px at every width. |
| T13 | pass | Desktop gallery and buy-column wrappers share the same grid top; mobile stacks. |
| T14 | pass | No italic or bold emphasis in visible running prose. |
| C1 | pass | Ground #f6f5f2; white limited to controls/photography. |
| C2 | pass | No chromatic text accents reported. |
| C3 | pass | Zero low-contrast text findings at all widths. |
| C4 | n/a | No meaningful gold text. |
| C5 | pass | No navy velvet on the product page. |
| C6 | pass | Zero shadows, content boxes, pills or control radius in every report. |
| C7 | pass | No decorative gradient in this page. |
| I1 | pass | First image is one complete ring at three-quarter angle on paper. |
| I2 | pass | Second selectable view shows the ring on a hand. |
| I3 | n/a | Home rule; PDP image-share departure is recorded above. |
| I4 | pass | Report records no text over photographs. |
| I5 | note | Thumbnail repeats identify the active photograph, as the decided gallery requires. |
| I6 | note | Named ring matches the concept subject; version-specific limitations registered. |
| I7 | pass | Desktop report records 1:1; final code sets both base and phone override to 1. Phone screenshot predates this last correction. |
| I8 | note | Generated mockup imagery explicitly authorized; replacement requirement retained. |
| I9 | pass | Paper and ink remain when photography is removed. |
| W1 | note | 252/252/248 total words; latest deeper-catalog budget decision applies. |
| W2 | pass | Sentence median 10, within the house target. |
| W3 | pass | House lint run: 0 errors; no warnings in reviewed page files. |
| W4 | pass | Zero exclamation points and em dashes. |
| W5 | fail | 29 first-viewport elements at 1440 exceed the 27 reference maximum. |
| W6 | pass | Repeated Made row removed; full provenance appears once in the footer. |
| W7 | pass | Viewing, sizing, photograph and named design actions state their scope. |
| W8 | pass | Natural diamond is qualified; provenance is verbatim; no new origin claim. |
| W9 | note | Existing catalog assumptions remain identified as review data; launch confirmation required. |
| W10 | pass | Delivery and returns disclosure plus explicit Shipping/Returns footer links. |
| W11 | pass | “Made to order, about 3 weeks” appears next to price and action. |
| W12 | pass | First product sentence begins “The star sits on the finger”. |
| P1 | pass | Report: price and action in the first viewport at all three widths. |
| P2 | pass | The complete gold star ring is the largest first-screen subject. |
| P3 | pass | Three versions and five metals are exposed; 14 sizes use a select. |
| P4 | pass | Earlier interaction verification found unchanged option positions on gold-to-diamond and gold-to-birthstone changes. The subsequent refinement changes type/spacing, not choice logic; fixed control borders/heights remain. |
| P5 | note | Three visible thumbnails and keyboard-operated full-screen viewer follow the latest explicit decision. |
| P6 | fail | Keep works in one tap; Kept header entry hidden at 390. |
| P7 | pass | Zero controls below 44px; `.field` inputs use 16px. |
| P8 | note | Made-to-order state is written; fallback properly disables unconnected checkout. |
| P9 | pass | Five horizontal destinations; Jewelry marked current at 1440. |
| P10 | n/a | No builder authoring action on this page. |
| P11 | pass | Footer links shipping, returns, warranty and both addresses. |
| P12 | pass | No urgency, stars, financing or unrelated upsell; siblings stay within Shooting Star. |
| P13 | n/a | Bag not in this review. |
| P14 | pass | Photograph appears first; light/3D view requires an explicit action. |
| D1 | pass | Gold star and five graduated stones distinguish this from an anonymous solitaire page. |
| D2 | pass | Source Serif on paper, worn hand and exact provenance appear. |
| D3 | pass | Object as protagonist: the ring occupies the largest uninterrupted visual field. |
| D4 | pass | Familiar two-column buying structure is made specific by the star, named relatives and hand frame. |
| D5 | pass | No caps eyebrow, arrow, numbered marketing sequence, ornaments or icon cards. |
| D6 | pass | Page concludes with house service and the two physical addresses. |
| D7 | pass | No slogan or repeated promotional logo treatment. |
| D8 | pass | Product, price and inquiry are identifiable; the photograph supplies the distinct detail. |

## Distinctiveness, in two lines
Hide the name: the gold star and descending stone tail, then the worn hand, identify a specific design family rather than a generic solitaire.
Forwardable, unhurried: the object is worth sharing; no counter, offer or motion demands an immediate decision.

## The one change that would most raise this page
Provide the correct photograph for the selected version, beginning with a plain-gold Shooting Star for the $1,900 Solid gold state.

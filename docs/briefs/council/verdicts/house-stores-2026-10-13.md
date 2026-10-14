# Council verdict: house-stores
Date: 2026-10-13. Commit: working tree after f0f071d. Report: reports/house-stores.md.

**APPROVED** (0 Blockers, 3 Shoulds, 3 Notes)

## Blockers
None.

## Shoulds
1. [T12] 390/768/1440, store rows: 22px action gaps, 30px top padding and 35px grid padding fall outside the spacing scale. Fix: use 24px, 32px and 32px respectively.
2. [W6] All widths, the two store rows: “Call for current opening hours and availability of a particular piece.” is repeated verbatim. Fix: place one shared sentence above the store list while retaining both direct phone links.
3. [P9] 1440, primary navigation: no destination is marked current on `/stores`; the store links belong to The House. Fix: include `/stores` and `/stores/*` in The House current-scope test.

## Notes
- [T7, T8, W1] H1 40/40/64px is outside the reference heading band but follows the latest object/place-led heading decision. The heading holds one line at 390 and 1440. The body totals 114 words for both stores; the page brief sets 80 words per store, so this is not a budget failure.
- [I6, I8, D1] No photographs are shown: the report records zero large images, outside the 1440 reference minimum of five. PHOTOS-TODO explicitly chooses direct contact details until real store photographs exist; this avoids fabricating the premises. Add actual exterior/interior photographs before customer launch. The current distinctiveness comes from the exact two Tennessee places and house typography, not a photographic identity.
- [T2, T4, T7, T11, W2, W5, P7, P9] Recorded reference edges are intentional or harmless: 19px prose; median line lengths 30/38/45; maxima 38/45/75; 8/9/9 sizes; 2/5/5 alignment axes; 52/108/81 fold words; 114 total words; sentence median 8; zero short controls at 1440; 11 header links at 1440. The sparse axes and short sentences aid address scanning. House lint: 107 files, 0 errors, 10 warnings, none in this page file.

## Seat by seat
| ID | Result | Evidence |
|---|---|---|
| T1 | pass | Two faces at every measured width. |
| T2 | note | Prose median 19px, in house range and at reference edge. |
| T3 | pass | Leading 1.6 at all widths, inside reference range. |
| T4 | pass | Longest lines 38/45/75 pass the 80-character fixed limit. |
| T5 | pass | Minimum 11px; muted notes use 13px or larger. |
| T6 | pass | Caps used on controls/navigation; place label is sentence case. |
| T7 | note | 8/9/9 sizes at reference edges; heading departure accepted. |
| T8 | pass | Visit the house holds one line at 390 and 1440. |
| T9 | n/a | No price, registry or numeric comparison. |
| T10 | pass | Section gaps 0.12/0.15/0.22 are inside the bands. |
| T11 | note | 2/5/5 axes, reference edges; the address columns align. |
| T12 | fail | 22/30/35px authored spacings are outside the house scale. |
| T13 | n/a | No shared photograph/text row. |
| T14 | pass | No italic or bold emphasis; address uses `font-style: normal`. |
| C1 | pass | #f6f5f2 is the page ground. |
| C2 | pass | No chromatic text accent. |
| C3 | pass | Zero low-contrast findings at all widths. |
| C4 | n/a | No gold text or meaningful gold color. |
| C5 | pass | No navy outside its approved scope. |
| C6 | pass | Zero shadows, boxed cards, pills or radiused controls. |
| C7 | pass | No gradients. |
| I1 | n/a | Store index, no product photograph. |
| I2 | n/a | Store index, no wearable product. |
| I3 | n/a | Not the home page. |
| I4 | n/a | No text on photographs. |
| I5 | n/a | No photographs repeated. |
| I6 | note | Actual-store photography is explicitly deferred in PHOTOS-TODO. |
| I7 | n/a | No image ratio or crop. |
| I8 | pass | No stock or generated premises image. |
| I9 | pass | Paper and ink carry the page. |
| W1 | pass | 114 words across two locations; brief permits 80 per store. |
| W2 | pass | Sentence median 8, inside house target. |
| W3 | pass | House lint run: 0 errors, no warning in the store route. |
| W4 | pass | Zero exclamation points and em dashes. |
| W5 | pass | 11/19/17 first-viewport elements, inside the measured bands. |
| W6 | fail | Identical hours/availability note is repeated in both rows. |
| W7 | pass | Arrange a visit, Directions and Care and services have clear scope. |
| W8 | pass | Exact provenance is in the footer; no new manufacture-origin claim. |
| W9 | pass | Names, addresses and phones match the fact sheet; visible shops match latest owner confirmation. Unknown hours are not invented. |
| W10 | n/a | Not a product page; footer policy links remain. |
| W11 | n/a | No product arrival promise. |
| W12 | pass | Place and designs are the subjects; no introductory self-praise. |
| P1 | n/a | No product price or purchase action. |
| P2 | n/a | No product subject; the two stores are the page's stated purpose. |
| P3 | n/a | No product options. |
| P4 | n/a | No option-driven layout. |
| P5 | n/a | No product gallery. |
| P6 | n/a | No product to keep. |
| P7 | pass | Zero controls under 44px at every width; no input fields. |
| P8 | n/a | No product availability state. |
| P9 | fail | Desktop names are visible, but The House is not marked current on the store route. |
| P10 | n/a | No builder. |
| P11 | pass | Footer carries shipping, returns, warranty and both addresses. |
| P12 | pass | No urgency, upsell, stars or financing banner. |
| P13 | n/a | Bag not part of page. |
| P14 | n/a | No 3D view. |
| D1 | note | Typography and these two exact Tennessee addresses identify the house; real premises photography will strengthen recognition. |
| D2 | pass | Source Serif on paper and exact provenance appear. |
| D3 | pass | Truth kept: direct addresses/phones and an honest hours instruction. |
| D4 | pass | Familiar store finder is made specific by two named places and confirmed customer-visible shops. |
| D5 | pass | No caps eyebrow, arrows, numbered claims, ornaments, icon cards or promotional tiles. |
| D6 | pass | Ends with care, viewing invitation and physical addresses. |
| D7 | pass | No slogan, urgency or repeated promotional mark. |
| D8 | pass | Store name, address, call, visit and directions are plainly identifiable at all widths. |

## Distinctiveness, in two lines
Hide the name: Brentwood and Mt. Juliet, the exact street addresses and restrained house typography identify a particular local house, though not yet its rooms.
Forwardable, unhurried: a visitor can forward one clear address and phone number; nothing pressures a purchase or an appointment.

## The one change that would most raise this page
Add one real, recognizable photograph of each store, preserving the direct contact details and the current refusal to invent hours.

# Council verdict: lines-product
Date: 2026-10-14. Commit: working tree after 5aced7c (uncommitted). Report: reports/lines-product.md.

**APPROVED** (0 Blockers, 0 Shoulds, 7 Notes)

## Blockers
None.

## Shoulds
None.

## Notes
- Scope: Shooting Star Ring at 390/768/1440, measured on :3033 at 05:16 UTC. All three final screenshots were inspected, together with `piece.tsx`, `PieceConfigurator.tsx`, `PieceForm.tsx`, `PieceGallery.tsx`, selection helpers and shared CSS. These captures include the shown-version caption and saved-metal initialization fixes. The only subsequent UI change is source-reviewed: the gold/no-stone option displays “No stones” while preserving its raw variant value and URL, avoiding a contradictory label when Platinum is selected.
- [P1, P3] All fixed checks pass. The desktop price starts at 304px and its 48px viewing action at 842px, ending at 890px within the 900px viewport. On phone/tablet, the persistent action starts at 784/964px, within the 844/1024px viewports. Three stone choices and five metals are visible; a size is explicitly selected from the longer list.
- [T7, W1, W2, W5] The latest layout/concise-copy brief governs. The 32/40/40px object heading and 19/15/41 first-viewport elements support the visible decision form. 189/189/185 body words include technical/policy content; the 13-word sentence median follows the shorter-copy direction. No filler is added to match older reference minimums.
- [I2, I6, I8] `PHOTOS-TODO.md` registers the generated concept assets and requires actual approved photography before a public sale. Shooting Star has a whole-object photograph and a hand view in its first two frames. Its final caption says “Natural diamond version shown. Concept photograph.” This clarifies why the static photograph retains diamonds when the no-stone version is selected; photographs are not promised to redraw every configuration.
- [P4] The two-line stone summary reserves height; the option grids match their actual count; size retains its position while optional engraving opens. Controls have accessible group/field names. The parent gallery now initializes from an allowed saved Metal query and synchronizes when that value or handle changes; the fallback form remounts on the saved query. This closes the source mismatch where a saved Platinum selection opened a yellow 3D view. The live Storefront branch and fallback inquiry branch were both read, but the supplied screenshots exercise the fallback.
- [T4, T10, T11, I7] Lines measure 37/55/55 characters and the stage remains square. Typical gaps are 24/24/24px; section gaps are 0.11/0.08/0.40 viewport heights; axes are 12/14/16. Reference edges are recorded, not extra layout requests. Five phone header/breadcrumb links implement the current line context.
- [W3, P4] Current house lint passes: 109 files, 0 errors and 9 existing warnings in journal/policy content. The implementing agent reports an actual phone builder-to-review test preserving natural origin, 1ct, Platinum, size 7, 2.4mm band, six prongs, Emerald and TEST in Roman engraving. That is attributed evidence for the related builder, not an independent transaction test of this product form. Live checkout, stock and appointment delivery remain outside this mockup verdict.

## Seat by seat
| ID | Result | Evidence |
|---|---|---|
| T1 | pass | Two typefaces at all three widths. |
| T2 | pass | Reading copy measures 16–18px; labels have a separate 13px role. |
| T3 | note | Measured prose leading is 1.6, the upper reference edge. |
| T4 | note | 37/55/55-character lines; no line over 80. Phone's shorter line is deliberate. |
| T5 | pass | Minimum 11px; muted metadata is at least 13px. |
| T6 | pass | Names and field labels are sentence case; capitals identify actions and navigation. |
| T7 | note | 7/9/9 sizes stay in range; 32/40/40px object headings follow the latest brief. |
| T8 | pass | The product name holds one line at all three widths. |
| T9 | pass | Price uses lining/tabular .num figures. |
| T10 | note | Section gaps stay inside the reference range; complete sections retain separate boundaries. |
| T11 | pass | Heading, price and choices share the right column; mobile shares the 20px gutter. |
| T12 | pass | 16px form groups, 8px choice gaps and a reserved two-line stone summary. |
| T13 | pass | Desktop heading begins beside the gallery's upper edge; controls stay in that column. |
| T14 | pass | No italic or bold emphasis in running prose. |
| C1 | pass | Paper #f6f5f2 surrounds the object. |
| C2 | pass | No chromatic text accent. |
| C3 | pass | Zero measured contrast failures. |
| C4 | pass | Gold is a material swatch/focus treatment, not semantic text. |
| C5 | pass | No non-Royal navy page ground. |
| C6 | pass | Zero shadow, content-box, pill or control-radius failures. |
| C7 | pass | No decorative interface gradient. |
| I1 | pass | The whole object is shown alone, at three-quarter view, on paper. |
| I2 | pass | The second of three reachable views shows Shooting Star on a hand. |
| I3 | n/a | Not a home page. |
| I4 | pass | No prose over photography. |
| I5 | pass | No repeated campaign image; thumbnail repeats identify the gallery view. |
| I6 | note | The registered concept image and specific shown-version caption distinguish image from selection. |
| I7 | pass | Square product stage preserves the whole ring at every width. |
| I8 | note | Generated mockup imagery is explicitly authorized and registered. |
| I9 | pass | The interface remains paper and ink around the gold object. |
| W1 | note | The current product-decision brief supersedes earlier fixed word budgets. |
| W2 | note | Short sentence median follows the owner's concise-copy direction. |
| W3 | pass | House lint: 109 files, 0 errors. |
| W4 | pass | Zero measured exclamation points and em dashes. |
| W5 | note | Desktop density consists of the requested visible product choices. |
| W6 | pass | One description and one tax qualifier; optional engraving stays folded. |
| W7 | pass | Actions name viewing, keeping, sizing and the photographic view. |
| W8 | pass | Diamond-origin names remain explicit; shared footer retains exact provenance. |
| W9 | note | Mockup price/material claims remain subject to the existing confirmation register. |
| W10 | pass | Delivery/returns accordion and footer policy links remain available. |
| W11 | pass | Made-to-order timing is beside the price and before the action. |
| W12 | pass | The description begins with the object. |
| P1 | pass | Price and 48px action pass all three first-viewport checks. |
| P2 | pass | The ring is the dominant subject; choices concern that single piece. |
| P3 | pass | Three stone and five metal choices are visible; the longer size list uses a select. |
| P4 | note | Fixed controls/reserved stone text reviewed; saved-query initialization fix confirmed in source. |
| P5 | note | Recorded gallery decision uses reachable thumbnails and an expanded photograph. |
| P6 | pass | Keep is beside the form action; Kept remains in navigation. |
| P7 | pass | All measured controls meet 44px; form fields use the 16px field treatment. |
| P8 | pass | Made-to-order and confirmation language precede an inquiry in the fallback state. |
| P9 | pass | Horizontal desktop navigation and line/design breadcrumbs locate the piece. |
| P10 | n/a | This is a catalog product form, not the ring builder. |
| P11 | pass | Footer includes Shipping, Returns, Warranty and both addresses. |
| P12 | pass | No urgency, financing banner, review stars or upsell device. |
| P13 | n/a | The bag is outside this review. |
| P14 | pass | The optional 3D/light view is behind the product image. |
| D1 | pass | The named signature form is recognizable with the wordmark covered. |
| D2 | pass | Source Serif on paper and exact footer provenance; the product is a named house signature. |
| D3 | pass | Ritual: inspect the object, choose its material, then request a viewing. |
| D4 | pass | Familiar option controls are attached to the house's specific signature form. |
| D5 | pass | No decorative marketing cards, artificial numbering or repeated slogan. |
| D6 | pass | The shared ending gives both store locations. |
| D7 | pass | No repeated logo block or prestige slogan. |
| D8 | pass | Name, price, material choices and the next action are legible together. |

## Distinctiveness, in two lines
Hide the name: Shooting Star's star and graduated diamond trail carry the signature beyond the wordmark.
Forwardable, unhurried: the piece and its options are understandable without urgency or a forced purchase.

## The one change that would most raise this page
For launch, provide approved photographs of each offered version; no further mockup control change is required by this review.


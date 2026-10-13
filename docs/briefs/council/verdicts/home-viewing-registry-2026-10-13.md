# Council verdict: home-viewing-registry
Date: 2026-10-13. Commit: 039517a (plus one uncommitted edit to `.viewing-fade`, noted under Should 1). Report: reports/home-viewing-registry.md.

**APPROVED** (0 Blockers, 8 Shoulds, 11 Notes)

Scope: the home at `/?viewing=registry`. The first viewport is the same hand frame as the approved home (same screenshot, same first-viewport numbers); the variant changes only the Royal American registry band, which gains the live viewing beside its list. Checked in code (`home.tsx` registry branch, `Viewing.tsx`, `ViewingScene.client.tsx`, `house.css`) and in the live shots `viewing-live/home-registry-live__1440.png` and `__390.png` (pixel values below were read from those files). Stand-in status of the render is under I6 and is not failed, as instructed. Whether the viewing belongs on the home at all is ruled in `viewing-placement-2026-10-13.md`.

## Blockers
None. All twelve house-table rows pass at 390, 768 and 1440.

## Shoulds
1. [C6, judged] 1440 and 390, the viewing frame in the registry band: it reads as a rectangle on the velvet, which is the "boxes" the owner objects to. 1440: left edge x=632 to 638 steps `#16213a` to `#0b132a` (1.15:1), right edge x=1382 to 1388 steps back, and the lit floor stops on a straight line at y=702 to 708 (`#2e395c` to `#16213a`, 1.41:1), a frame 748 px wide. 390: x=15 to 18 `#16213a` to `#0a142a`, bottom y=698 to 701 `#2f3b5e` to `#16213a` (1.4:1). Cause: `.viewing-fade` (house.css:597) is `ellipse 72% 68%`, so alpha is still about 0.73 at the middle of the left and right sides and 0.56 at the top; the scene's own vignette darkens its sides to `#0a1329`. The measured proxies pass (0 boxed, 0 shadowed), so this is a Should, not a Blocker. Fix: `radial-gradient(ellipse closest-side at 50% 50%, #000 45%, transparent 100%)` so alpha is 0 at the middle of every side, and set the vignette `darkness` to 0 when the frame is not a hero so the sides read `#16213a`. Working-tree note: after the shots were taken, house.css:597 was edited (uncommitted) to `ellipse 50% 50% at 50% 50%, #000 60%, transparent 100%`, which takes the side alpha to 0; the shots and this finding predate it and the scene's vignette is unchanged, so re-shoot `home-registry-live__1440.png` and `__390.png` to close or keep this Should.
2. [I7] 768 and 1440, frame `md:aspect-[5/4]` (home.tsx:111): ratio 1.25 in the report's ratio list, outside the house set (4:5, 4:3, 1:1, 2.2:1). The 390 frame is 4:5 and is in the set. Fix: `md:aspect-[4/3]`.
3. [W1] all widths: 185 words against 110 to 150 (1.23x; Blocker begins at 225). The variant adds 0 words, so this is the page's existing overage (open-questions C39 records the letter as the cause). Fix: show the letter's first sentence only (8 of its 34 words, saves 26) and drop the signature (8), which brings 185 to 151; or log the departure in decisions.md.
4. [W6] 1440, the letter screen: the signature "The family, Brentwood and Mt. Juliet, Tennessee" repeats the hero label on the same page; the build lede "Three settings we drew. The stone, the metal and the fit are yours." is also `build-ring.tsx:66`. Fix: cut the signature on the home; keep the lede on one of the two pages.
5. [T4] 1440: median measure 38 characters per line (rule 45 to 75; houses' minimum 49). 390 reads 37 (phone; no action). Fix: the build and letter ledes to `md:col-span-5`; the registry lede is already `lg:col-span-5`.
6. [I6] 390 and 1440, design of the season: the photograph is `tristar-charm` under "A five-point star with a trailing tail of graduated stones." (`DESIGN_PHOTO["shooting-star"]`, photos.ts:62). Unchanged since home-2026-10-12. Fix: `gem-stack-rings` until the 2.2:1 macro exists.
7. [P7] 390: the standalone links "Every piece in the registry" and "The whole letter" are about 23 px tall (11px x 1.6 + 4.8 + 1; `.link`, house.css:215). Site-wide and already logged (open-questions D). Fix in house.css: `min-height: 44px`, inline-flex, items-end, padding-block 12px.
8. [T7 / band] 768 and 1440: largest type 72px and 88px (houses' max 68 and 76) and 10 distinct sizes at 1440 (band 4 to 9). The shared opener size has no written departure. Fix: opener h1 `md:text-[4.25rem] lg:text-[4.75rem]` (68 and 76), or record the departure in decisions.md.

## Notes
- [I6] The render is a stand-in: `VIEWING["no-001-the-cumberland"]` draws a 5.02 ct round on a Signal head in platinum from the builder's geometry. The catalog's Cumberland is "a platinum setting cut like a riverbank" (open-questions A13: its spec is itself a stand-in). Nothing on the page calls the render a photograph (the wrapper says "on navy velvet under one light"). PHOTOS-TODO row 16 still reads "Home, the registry: none (type on velvet)"; add a row naming the render, and a caption under the frame in the decision-2026-10-12 manner ("as we draw it") before adoption.
- [C7] `.viewing-fade` is an alpha mask: it paints no color. The canon bans "decorative gradients"; the rubric's wording ("no gradient except the photo overlay") is stricter. Council reading: the mask passes under the canon; log the wording in open-questions. The only painted gradient on the page is the hero's `.photo-overlay`.
- [T9] `.gold-numeral` (house.css:157) carries no `font-variant-numeric`. No. 001 to 003 render lining and aligned in both live shots. Add `lining-nums tabular-nums` before No. 010 exists.
- [T12] 20px (`gap-5` home.tsx:101, `py-5` line 117) is off the 4, 8, 12, 16, 24, 32, 40, 64 scale; the brief sets "rows py 20px", so recorded. Typical block gap 94px at 1440 (max 90) likely follows `--section-y` 12vh = 108px (T10); not traced.
- [T11] 1440: hero text starts x=40, registry text x=56, a 16px drift between adjacent screens.
- [W9] "Tennessee Star" is a state name, not a place (carried). The letter is draft words (carried). The Cumberland's specs are stand-ins (A13).
- [W7] Hero button "The designs" goes to /americana only (carried, shared).
- [W2] median 7 words against 8 to 14; set by short list rows. Longest letter sentence 28 words, under 30.
- [T6, T14] `.link` is set in caps 11px (open-questions C40); the signature is 18px italic as a sign-off, not running text.
- [Outside the rubric: WCAG 4.1.2] `ViewingFrame` is `role="img"` and holds the "Tilt to see the fire" button (Viewing.tsx:105 to 141). Children of `role="img"` are presentational, so assistive technology may not expose the button. Fix: move the button outside the `role="img"` wrapper.
- [Not measured] No 768 live shot (code: the frame stacks at 5:4 under the lede); no bundle or GPU figure for the scene. It mounts only within 120px of the viewport and the poster stays under reduced motion or without WebGL.

## Seat by seat
| ID | Result | Evidence |
|---|---|---|
| T1 | pass | 3 faces at 390, 768, 1440 |
| T2 | pass | body median 18 / 19 / 18 (letter 19) |
| T3 | pass | leading 1.6 |
| T4 | fail (Should) | median 38 at 1440; 37 at 390; max 38 / 62 / 62 |
| T5 | pass | smallest 11 (caps controls, ink); muted labels 13px; labels on velvet are paper |
| T6 | note | caps share 0.14; no caps eyebrow; caps `.link` x3 |
| T7 | fail (Should) | 10 sizes at 1440; largest 88 / 72 outside |
| T8 | pass | h1 two lines at 390 and 768, one at 1440; "The registry" one line |
| T9 | note | no tabular rule; figures lining and aligned |
| T10 | pass | section gap 0.16 / 0.24 / 0.24 vh |
| T11 | note | axes 2 / 8 / 9; 16px drift hero to registry at 1440 |
| T12 | note | 20px off-scale, brief-recorded; 94px block gap at 1440 |
| T13 | n/a | the frame's top edge is under the header in the live shot |
| T14 | note | signature italic, sign-off only |
| C1 | pass | paper ground; velvet band is Royal American's; white behind the macro; stone behind the ring |
| C2 | pass | one accent `#b08d57` |
| C3 | pass | 0 low-contrast; gold numerals 24px on navy 5.18:1; paper on navy 14.32:1 |
| C4 | pass | gold only on navy, at 24px |
| C5 | pass | velvet only on the Royal American registry |
| C6 | fail (Should) | frame edge 1.15 to 1.41:1; boxed 0, shadowed 0, pills 0, radius 0 |
| C7 | note | alpha mask paints nothing; hero overlay is the only painted gradient |
| I1 | n/a | home |
| I2 | n/a | not a product page |
| I3 | pass | image share 0.58 / 0.86 / 0.86 (hand frame) |
| I4 | pass | 0 text on photographs; hero text on `.photo-overlay`; Tilt button has its own fill |
| I5 | pass | no image twice in view |
| I6 | fail (Should) | design photo (carried); note: the viewing render is a stand-in |
| I7 | fail (Should) | 5:4 frame; macro 2.2:1 and ring frame 4:3 are in the set |
| I8 | pass | house photographs and house-geometry renders; no stock, no AI, no faces |
| I9 | pass | without photographs: paper, ink, one navy band |
| W1 | fail (Should) | 185 vs 110 to 150 |
| W2 | note | median 7; longest 28 |
| W3 | pass | `house-lint`: 95 files, 0 errors |
| W4 | pass | 0 exclamations, 0 em dashes |
| W5 | pass | 5 elements at 768 and 1440; 8 at 390 including the header |
| W6 | fail (Should) | signature and build lede repeat |
| W7 | note | "The designs" scope; "Every piece in the registry" and "Build on Signal" name the thing |
| W8 | pass | "Man-made diamonds. The same hands."; provenance line verbatim in the footer |
| W9 | note | draft letter; "Tennessee Star"; Cumberland stand-in spec |
| W10 | n/a | not a product page; footer links Shipping, Returns, Warranty |
| W11 | n/a | not a product page |
| W12 | pass | sections open on the piece, the names, the place |
| P1 | n/a | not a product page |
| P2 | pass | first viewport: the hand and ring; registry band: the lit stone and prongs (brightest point `#f4f4f4`) |
| P3 | n/a | no options |
| P4 | pass | frame has a fixed aspect; the poster crossfades 300ms; Tilt appears over the frame without moving anything |
| P5 | n/a | no gallery |
| P6 | n/a | not a product page |
| P7 | fail (Should) | buttons 48px (Tilt 48px); rows at least 66px; two `.link` about 23px |
| P8 | n/a | no purchase states |
| P9 | pass | 12 visible links at 1440 on one line |
| P10 | pass | "Build on Signal" |
| P11 | pass | footer: Shipping, Returns, Warranty, both addresses |
| P12 | pass | no urgency, stars, financing or upsell |
| P13 | n/a | no bag |
| P14 | pass | poster in the server HTML (lazy); scene mounts within 120px of the viewport; not the hero; poster stays under reduced motion or without WebGL |
| D1 | pass | see below |
| D2 | pass | registry grammar "No. 001 The Cumberland" in gold on navy, navy velvet, type on paper, hand frame, provenance line in the footer |
| D3 | pass | light (the lamp the visitor moves) and naming (the registry) |
| D4 | note | see below |
| D5 | pass | no caps eyebrow, middle dot, arrow link, 01/02 marker or icon card |
| D6 | pass | ends on the two addresses |
| D7 | pass | one mark in the header; no slogan |
| D8 | pass | familiar order; the registry band reads as a list with a picture |

## Distinctiveness, in two lines
Hide the name: "No. 001 The Cumberland" in gold numerals on navy, with a Tennessee-named list beside a lit ring, is the house's grammar; the ring alone on a dark lit floor could sit on any jeweler's 3D brief. Forwardable, unhurried: yes, the registry band would be sent to someone; the light rises once over 1.6 s and then drifts at 0.45 rad/s with no input; nothing counts down or prompts.

D4, the generic part: the ring as CGI on a dark plane with a pool of light. The change that makes it this house's: the photograph of No. 001 on the house box (PHOTOS-TODO row 16 already lists it) as the poster, with the viewing opening on request.

## The one change that would most raise this page
Make the frame's edge vanish (alpha 0 on all four sides and the vignette off), so the ring rests on the velvet with no panel; today the viewing is a 748 x 598 px rectangle at 1.15 to 1.41:1 against the section, which is the near-miss edge the owner reads as a box.

# House critic: rework explorations A, B, C

Produced 2026-10-11 by a general-purpose agent following `.claude/agents/house-critic.md`, over the captures in this folder as they stood before the fixes listed at the end. Reviewed against `00-house-canon.md`, `DESIGN.md`, HANDOFF-rework §3, `site/pages/product.md`, `site/pages/home.md`; code in `app/explore.css`, `app/lib/explore.ts`, `app/routes/piece.tsx`, `app/components/PieceGallery.tsx`, `app/components/PieceForm.tsx`, `app/house.css`, `app/routes/line.tsx`, `app/lib/catalog/photos.ts`. Screenshots read as images; palette values sampled by pixel; contrast computed WCAG 2.x.

**Capture caveats (apply to every part, not findings against candidates).** (1) Every `_folds/*__390.fold.png` was 390x844 px cut from the top-left of a 780x1688 (2x) render: it showed the top-left 195x422 CSS px of the phone viewport, not the fold. The C-layout `*-fold__390.png` at 780x1688 are the true folds. The A and B phone verdicts below are limited to what that quarter showed. (2) In the full-page captures the "Complete the set" tiles were blank white in c1, c2, c3 at 1440 and in all four at 390: the images (lazy, below the fold) had not loaded when the page was captured; not a layout defect. (3) The fixed phone bar in c2/c3 appears mid-page in the full-page 390 captures (the stitcher caught it at the viewport position); expected.

---

## Part A. Primary typeface

Shared facts. Public Sans is the companion in all five, so "holds at 11px caps" is tested only on Public Sans (nav, buttons): it holds identically in every candidate. No serif is set below 14px anywhere in the shown screens; the smallest serif exposure is the spec table value (14px) and the stone line (15px), so those are where the small end is judged. The wordmark placeholder inherits `--font-display`, so it changes per face (noted where it matters). Hero headline at 1440, measured as the light-pixel run across the baseline row (container 1360px, margins 40):

| | width | lines 1440 | lines 390 (quarter crop) | right edge / container |
|---|---|---|---|---|
| a0 Libre Caslon Display | 1065px | 1 | 2 ("An American house / of fine jewelry.") | 78% |
| a1 Sorts Mill Goudy | 1264px | 1 | 3 ("An American / house of / fine jewelry.") | 93% |
| a2 Linden Hill | 1105px | 1 | 2 | 81% |
| a3 Newsreader opsz 72 | 1273px | 1 | 3 | 94% |
| a4 Besley | 2 lines, 831px / 581px | 2 | 3 | 61% |

### Findings

1. **Blocker, 1440 (and all widths), a1 and a2, registry numerals** (`a1-registry__1440.png`, `a2-registry__1440.png`; `.gold-numeral` in `line.tsx:155,183`). Sorts Mill Goudy and Linden Hill default to old-style figures: "001" renders with x-height zeros and a small-cap-like 1, so the registry grammar reads as "ooI", "oo2", "oo3". At 24px gold on navy the a2 numerals are also hairline-thin. The canon's registry grammar is "No. 001" and `gold-numeral` is a numeral, not lowercase. Fix: `font-variant-numeric: lining-nums tabular-nums` on `.gold-numeral`, `.registry td` and `.spec td` under `html[data-type='a1'], html[data-type='a2']` (Sorts Mill Goudy ships `lnum`; verify Linden Hill does before keeping a2), or set all figures in `.num` as DESIGN.md's table rule already says ("`num` for figures").

2. **Blocker, 1440, a1 and a2, spec table and stone line** (`a1-spec__1440.png`, `a2-spec__1440.png`; `.spec td.font-text`, `PieceForm` stone line). Same old-style default: "VVS1 to VVS2" reads as "VVSI to VVS2", "1.8 mm" as "I.8 mm", "12.40 ct" with descending 2 and 4. Spec figures are the house grammar ("numbers are the adjectives") and must be lining. Fix as in 1. Without it neither Goudy revival can ship.

3. **Should, 1440, a2, spec table and stone line.** Linden Hill at 14px: x-height roughly 0.40em against Caslon Text's roughly 0.46em and serifs under 1px at this size; the value column reads a visual size smaller than the label column (`a2-spec` vs `a0-spec`). DESIGN.md sets `lede`/`letter` at 18/19px and the spec at 14px; a2 raised `.lede/.letter` to 20px in `explore.css` but left the 14px and 15px roles alone. Fix: `.spec td`, stone line and accordion body at 16px under `data-type='a2'`, or drop a2.

4. **Should, 390, a1, a3, a4, home hero.** The headline wraps to three lines at phone width (a0 and a2 hold two). At `.h-display` phone size that is one extra line of roughly 43px; the label has already moved up (a3: y 549 vs a0: y 635 in the quarter crop). The home brief's DONE WHEN is headline and button above the fold at 390x844; the button is not in the quarter crop, so this is unverified, not failed. Fix: capture a true 780x1688 fold, and if the button falls below 844, set `.h-display` to 40px under 768 for a1/a3/a4 (a 7% reduction returns the two-line break).

5. **Should, 1440, a1 and a3, home hero.** At one line the headline runs to 93-94% of the container (1264px and 1273px of 1360). Any longer headline, or the same one at 1280px wide, wraps mid-phrase ("An American house of fine / jewelry."). DESIGN.md measure for display is 34ch; the a1/a3 em is 19% wider than Caslon Display at the same px. Fix: `.h-display` 64px at 1024-1439 for a1/a3 (gives 10% headroom), or accept the balanced two-line break and verify it reads.

6. **Should, 1440, a4, home hero one subject** (`a4-home__1440.fold.png`). The two-line Clarendon block occupies x 48-879, y 580-745, plus label at 539 and button to 818: the text block is 279px tall (31% of the hero) at display weight; the eye lands on the slab, then the hands. The home hero's ONE SUBJECT is the photograph. The canon also warns against American as a costume; a Clarendon at 72px over a photograph is the vernacular of heritage goods (workwear, bourbon), not a house of fine jewelry. Fix: a4 `.h-display` 56px at 1440 (holds one line at roughly 1190px) and weight 350 on the variable axis, then re-read; if it still leads, a4 is a names-and-registry face, not a hero face.

7. **Should, all widths, a3 and a4, `.h-item` at 18px** (`explore.css` forces `font-variation-settings: 'opsz' 72` on `.h-item`; `ProductTile.tsx:27` sets `.h-item` at 18px, `SavedList.tsx:32` 18px, `article.tsx:102` 22px). Newsreader at opsz 72 has hairline contrast meant for 72px; at 18px the tile names lose their thins. Fix: remove `.h-item` from the opsz 72 rule and let `font-optical-sizing: auto` pick 18-24.

8. **Could, 1440, a4, wordmark placeholder.** The header wordmark grows from 360px (Caslon) to 425px in Besley with a visibly heavier stroke; it is the loudest thing in the header. The logo is paused, so this is a placeholder effect, but it will color the owner's read. Fix: keep the placeholder on Libre Caslon Display under `data-type='a4'` so a4 is judged on names and prose.

9. **Could, brief requirement "American authorship".** a1/a2: Goudy, ATF 1915 and 1927, American. a0: Caslon, English, with the Declaration-printing story. a3: Production Type, Paris, 2020. a4: Besley is Robert Besley's Clarendon, Fann Street Foundry, London 1845; the American link is job-printing use, not authorship. Note this in the rationale so the House-page story is not written on a false premise.

### Numerals, figures, small sizes per face
- a0: lining figures in display and text; "001" full-height, "VVS1" and "1.8 mm" correct; holds at 14-15px.
- a1: old-style by default (findings 1, 2); prose at 15px is warm and holds; needs `lnum` to be usable at all.
- a2: old-style by default; too light below 16px (finding 3); "001" thinnest of the five.
- a3: lining; crisp at 14px with opsz 16; "001" slightly condensed, correct.
- a4: lining Clarendon "001" the strongest registry numeral of the five; spec in Newsreader as a3.

### "Hide the name" reads (one line each)
- a0 Libre Caslon Display: "a serif luxury site"; the category is recognizable, the house is not. In a year: no.
- a1 Sorts Mill Goudy: recognizable as Goudy, which no jeweler in the set uses; reads old-American and bookish, with a collegiate risk. In a year: plausibly yes, once figures are lining.
- a2 Linden Hill: a private-press book face; distinctive but it recedes, and at small sizes it disappears. In a year: maybe, from the headlines only.
- a3 Newsreader: the current editorial default (newsletters, journals); handsome and anonymous. In a year: no.
- a4 Besley + Newsreader: instantly recognizable, but as a heritage-goods brand rather than a house of fine jewelry; the registry is where it is right. In a year: yes, for the wrong category.

### Verdicts
- a0: keep as the control; nothing breaks; meets the brief's technical tests but fails "less typical".
- a1: breaks on figures (1, 2) and the 390 wrap (4); the warmest and most American lineage; meets the brief only with `lnum` applied everywhere a figure appears.
- a2: breaks on figures (1, 2) and small-size weight (3); does not meet "holds up" at the small end.
- a3: nothing breaks; meets every technical criterion; fails distinctiveness and the authorship wish.
- a4: breaks the hero's one-subject rule (6); the registry and product name are its case; meets the brief as a names face only if the hero is re-sized.

Counts, Part A: Blockers 2 (both a1/a2 figures). Shoulds 5. Coulds 2.
Single change: set lining, tabular figures on every figure-bearing role (`.gold-numeral`, `.spec td`, `.registry td`, stone line) and re-capture the registry and spec for a1 and a2; until then two of the four alternates cannot be read fairly.

---

## Part B. Palette

Sampled from the folds (header at 20,20; velvet at 20,300; bag panel at 1200,400): b0 `#f5f2ec` / `#16213a`; b1 `#ecebe6` / `#16213a`; b2 `#f3f3f0` / `#16213a`; b3 `#efede6` / `#1d2437`. The candidates are applied. Computed contrast (text on its ground):

| | muted/paper | muted/bone | ink-2/paper | accent/paper | accent/bone | gold/velvet | label .7/velvet | th .6/velvet |
|---|---|---|---|---|---|---|---|---|
| b0 | 5.09 | 4.61 | 9.42 | **2.77 fail** | **2.51 fail** | 5.18 | 7.64 | 5.98 |
| b1 | 5.29 | 4.78 | 9.40 | 4.99 | 4.51 | 5.18 | 7.20 | 5.66 |
| b2 | 5.87 | 5.36 | 10.60 | 7.28 | 6.65 | 5.18 | 7.69 | 6.03 |
| b3 | 5.53 | 5.00 | 9.56 | 10.19 | 9.21 | 5.00 | 7.19 | 5.68 |

Ground character (HLS): b0 hue 40, sat 31 (cream); b1 hue 50, sat 14 (limestone, grey-warm); b2 hue 60, sat 11 (chalk, near neutral); b3 hue 47, sat 22 (bone, a desaturated cream). Paper against pure white: b0 1.12, b1 1.19, b2 1.11, b3 1.17.

### Findings

1. **Blocker, all widths, the exploration as shown, accent never visible on paper** (`b*-home`, `b*-royal`, `b*-bag` folds; `grep` of `--gold` users: `.gold-numeral` only inside `.velvet` in `line.tsx`, `.hair-gold` defined in `house.css:385` but used by no component, and the focus ring). On velvet all four candidates force `--gold: #b08d57` (`explore.css` last rule), so the bronze, iron and aubergine accents appear nowhere in the three surfaces the brief asked to show. In the twelve 1440 folds the only pixel-level differences between b0 and b3 are 2-9 RGB units in the ground. The brief's questions "is the accent ownable" and "fix the gold failure" cannot be answered from these screens. Fix: capture one surface per palette where the accent meets the ground at 24px or larger (the registry rows as they would read on paper, a `.hair-gold` rule under a product name, the focus ring on a tile), at 1440 and 390, before the owner decides.

2. **Should, all widths, b0, known failure stands.** Gold `#B08D57` on paper is 2.77:1 and on bone 2.51:1; both fail even the 3:1 large-text floor, so the canon's "gold at 24px+" rule does not rescue it. b1-b3 pass (4.99, 7.28, 10.19). If b0 is kept, apply the brief's second remedy: gold decorative-only (hairlines) and every gold numeral duplicated in ink or moved to `ink`.

3. **Should, all widths, b1, accent not ownable.** Bronze `#7d5e37` is gold at 35% lightness (hue 33 vs gold's 36): it reads as a darker gold, which is every jeweler's accent and the Yurman black-and-gold territory the brief excludes. It passes AA by 0.01 above the 4.98 rounding edge on paper and sits at 4.51 on bone, inside normal-text AA only. Fix: if b1's ground is chosen, pair it with b3's or b2's accent rather than bronze, or darken bronze to `#6a4d2c` (6.3:1) and accept it as "dark gold", not an owned color.

4. **Should, all widths, b2, two blues.** Iron `#45515f` (hue 212) sits next to the velvet navy `#16213a` (hue 221): the Royal American surface and the accent become the same family, and the accent reads as "slate UI grey" (the default of software dashboards), not a material. The chalk ground at hue 60 is also the only candidate cooler than the house photographs (warm casts around hue 35-45 on the packshot grounds), so the photos will read yellower on it. Fix: check b2 against a packshot page at 1440 before shortlisting; if the photographs warm up, b2 is out.

5. **Could, all widths, b3, ground still in the cream family.** Bone `#efede6` is hue 47, sat 22: cooler and greyer than b0 but in the header fold it is not distinguishable from b0 by eye (`#efede6` vs `#f5f2ec`). Of the three alternates only b1 (sat 14) clearly leaves the cream cluster. Not a failure (the canon's own word is "bone"), but the brief asked for "outside the cream cluster"; b3's claim to that rests on saturation 22 vs 31.

6. **Could, b3, the royal read.** Aubergine `#4b2e3e` plus true gold plus a velvet shifted violet (`#1d2437`) stacks three jewel tones under a line called Royal American; the pairing risks the purple-equals-royalty cliche the canon's "never a costume" line is written against. At 24px on bone the aubergine reads almost as ink (L 24, S 24), which is the safer outcome. Fix: none required; name the risk in the rationale and let the owner see it on the registry.

7. **Could, all candidates, muted on bone.** b0 muted on bone is 4.61:1, b1 4.78: both pass AA normal text but with under 0.3 headroom; `muted` is the lightest text allowed and bone is the editorial ground. b2 and b3 give 5.36 and 5.00. No fix needed; a point in favor of b2/b3 if labels sit on bone often.

### Per-candidate answers
- Every text color passes: b1, b2, b3 yes (lowest 4.51, b1 bronze on bone); b0 fails on gold text only.
- Ground in the cream cluster: b0 yes; b3 borderline; b1 and b2 no.
- Accent ownable: b1 no (dark gold); b2 no (slate, and a second blue); b3 yes in principle, unseen in practice (finding 1).
- Photography still carries the color: yes in all four at the shown sizes; the hero and the signet packshot are identical across candidates; b2's cool ground is the only one that could change how the photographs read (finding 4).

### Verdicts
- b0: keep the paper and the velvet; the gold text rule is broken as written and must become decorative-only or move to ink.
- b1: the only ground that clearly leaves cream; the accent breaks the "ownable" criterion. Keep the ground, lose the bronze.
- b2: passes contrast by the widest margins; fails ownability and risks the photographs; does not meet the brief.
- b3: passes contrast and ownability on paper; its ground is the least changed; cannot be judged until the accent is shown on paper (finding 1).

Counts, Part B: Blockers 1 (the exploration, not a candidate). Shoulds 3. Coulds 3.
Single change: render the accent on paper at 24px+ for each palette (registry rows and one hairline) and capture it; without that surface the owner is choosing between four near-identical creams.

---

## Part C. Product photo layout

Measured on `c*-piece-fold__1440.png` (1440x900), `c*-piece-fold__390.png` (780x1688 at 2x = 390x844), `c*-piece-fold__768.png`, and the full pages. Photo order for the handle from `photos.ts:45`: `["ring-halo", "ring-radiant", "hero-hand"]`.

| criterion | c0 | c1 | c2 | c3 |
|---|---|---|---|---|
| one subject, first second, 1440 | yes (photo 767 wide) | yes, strongest (object centered on its ground) | yes, but see 3 | yes |
| one subject, 390 | yes | yes | yes (bar is secondary) | yes |
| price + action in fold, 1440x900 | yes: price y 402, Add to bag y 840-888 | yes: 402 / 840-888 | **no**: price y 429, Add to bag top at y 893, 7px of 48 visible | yes: 402 / 840-888 |
| price + action in fold, 390x844 | **no**: price at about 1060 CSS px, button at about 1548 | **no**: price at about 1342 | yes: bar y 772-844, button 48px | yes: same bar |
| reflow risk on option change | low (5 cols: stone line 1 line, 9ch price reserve) | low | medium (4 cols: stone line wraps to 2 lines at 410px, `min-h` reserves 1) | low |
| hand frame second | no (third) | no | no | no |
| 3D as a view, not a hero | yes (poster first, 48px "Turn it in 3D") | yes | yes | yes |
| nothing bordered | yes | yes | bar has a 1px top rule | bar has a 1px top rule |
| thumbnail strip | none; two-up frames beneath | none; stacked | none; stacked | none; stacked |

### Findings

1. **Blocker, 1440x900, c2, buy column** (`c2-piece-fold__1440.png`). Add to bag sits at y 893; the fold cuts it. Cause: the 4-column details (410px) wraps the one-sentence description to 3 lines (+27px) and the stone line to 2 lines (+24px), pushing everything down 51px against c0. The product brief's DONE WHEN is "price, variants and Add to bag above the fold at 1440x900". Fix: give c2 a 7/5 split (gallery 767px, details 530px) so the sentence returns to 2 lines and the button to y 840; or keep 8/4 and drop the lead-time line into the stone line.

2. **Blocker, 390x844, c0 and c1, buy column** (`c0-piece-fold__390.png`, `c1-piece-fold__390.png`). Nothing but the photograph and the breadcrumb is in the first viewport; the price arrives at roughly 1060 CSS px (c0) and 1342 (c1), the button at roughly 1548 and 1830. The brief's criterion for C names 390x844 explicitly. Fix: the c2 bar (72px, price `num` 18px, 48px button) is the only shown remedy, and c3 is c1 with it; a candidate without the bar cannot meet the brief at phone width.

3. **Should, 1440, c1, c2, c3, the frames beneath the first** (`c1-piece__1440.png`, `c2-piece__1440.png`). Every stacked view is 4:5 at full column width: 767x959 in c1/c3, 885x1106 in c2, both taller than the 900px viewport, and larger than the first frame in c1/c3 (767x575). The second frame is the radiant solitaire, a different ring, and it is the biggest image on the page; the hand frame (third) is also 959/1106 tall. One subject per screen breaks on scroll, and the brief's "3D as a view" logic applies to every view: no view should outrank the object frame. Fix: stacked views in c1/c3 at 4:3 (767x575, equal to the stage); in c2 at 1:1 (885x885) or cap `max-height: 80vh`.

4. **Should, 1440, c1, c2, c3 (latent in c0), sticky details taller than the viewport** (`piece.tsx`: the whole 5/4-col column is `lg:sticky lg:top-32`). Measured column height from the name to the last accordion: 1227px (c1/c3), about 1330px (c2), 1220px (c0); available height below the sticky header is 900 - 128 = 772px. Once pinned, the spec table and the four accordions (column offsets 780-1227) are off-screen until the gallery has scrolled out: for about 1330px of scroll in c1/c3, about 2000px in c2, about 230px in c0 (gallery 1450px tall), which is why c0 never showed it. The spec table's job is "answer every factual question before it is asked"; pinned out of reach it answers none. Fix: move `lg:sticky lg:top-32` to a wrapper around name, ref, sentence and `PieceForm` only (about 690px at 1440), and leave `Details` in flow under it.

5. **Should, all widths, all candidates, hand frame second.** `photos.ts:45` orders halo, radiant, hand; research/14 §5 order (3/4, hand, profile, top, macro, hallmark) and the brief's criterion put the hand second. In c0 the hand is the right tile of the two-up (370x462 at 1440); in c1/c2/c3 it is the third full-width frame, 2300px+ down the page. Fix: reorder to `["ring-halo", "hero-hand", ...]` for every handle whose set contains a hand frame; this is a data change and applies to all four.

6. **Should, all widths, all candidates, the photo set is not one piece.** Signal Solitaire is "one man-made diamond on an open four-prong head"; the first frame is a baguette-halo ring, the second a radiant-cut stone on a wide scattered-diamond band, the third a hand wearing an emerald-cut on a pave band. Three rings, none the piece described. The gallery brief's JOB is "show the piece from every angle, true to life"; the canon forbids invented facts, and a photograph that contradicts the spec table is one. Known placeholder state, but the layout decision is being made on it: the "one subject" read of c1 is flattered by a dramatic halo that the real Signal will not have. Fix: shoot or borrow one piece in three views (3/4 on white, hand, profile) for this handle before the owner judges C; note it in open-questions.

7. **Should, 1440, c2 (also c0, c1, c3 at narrower columns), reflow on option change** (`PieceForm.tsx`: stone line `min-h-[1.5rem]`). In c2's 410px column the man-made stone line already takes 2 lines; a version whose stone line is shorter (gem or gold-only versions on Americana pieces) collapses it to 1 and shifts the controls 24px. The brief: "nothing shifts when a variant changes". Fix: `min-h-[3rem]` when the column is under 480px, or the 7/5 split from finding 1 which keeps every stone line in the catalog on one line at 15px (longest measured: "Man-made diamond (laboratory-grown), D to F, VVS, IGI report." at 455px).

8. **Could, 390, c2 and c3, the bar's rule.** The fixed bar carries `border-t border-hair`; DESIGN.md allows `hair` only in tables and lists. It is doing the job of separating the bar from the photograph scrolling under it, which the paper fill does on its own at 72px. Fix: remove the border; if separation is wanted, make the bar `bone` rather than ruled. Also note `md:hidden`: at 768 neither c2 nor c3 has price or action in the 1024px fold (not a brief criterion; recorded).

9. **Could, 390, c2 and c3, two Add to bag buttons on screen at once.** When the user reaches the form (about 1500 CSS px down), the in-flow button and the bar's button are both visible, 150px apart, with the same label. Fix: hide the bar while the form's button is in the viewport (an `IntersectionObserver` on the `.btn`, opacity only, 200ms).

10. **Could, 1440, all candidates, element count above the fold.** Buy column at 1440: name, ref, sentence, price, stone line, lead/tax line, Version (3 tiles), Metal (4 swatches + labels), Size, Engraving, Add to bag: 11 distinct elements plus the breadcrumb and the photograph, 13 above the fold against the critic's seven. The product brief lists all of them, so this is the brief's count, not the candidates'; it argues for c1/c3's single frame, which adds nothing to it, over c0's two-up.

11. **Could, all widths, all candidates, swatch labels at 11px.** `PieceForm.tsx` sets the metal names under the swatches at `text-[0.6875rem]` in `label` (muted): 11px sentence-case muted text is the smallest type on the page, under the 13px `label` role. Fix: 13px, or drop the per-swatch names since the selected metal is already printed at the right of the Metal row.

12. **Could, 1440, c1 and c3, image crop.** The stage crops the 4:5 source to 4:3 with `object-position 50% 50%`; on this placeholder it loses 20% of the height and the ring survives, but a tall packshot (a pendant, a drop earring) would be cut. The product brief's gallery line reserves 4:3 for the 3D iframe only. Fix: art-direct per piece type (`position` prop already exists on `Pic`), or set the stage to 1:1 for pendants and earrings.

### Verdicts
- c0: keeps price and action in the 1440 fold; fails 390 outright; the two-up frames are small and read as a thumbnail grid in disguise; the strongest first frame of the four is lost to a second subject 20px below it.
- c1: the best first second at 1440 (object centered on a pale ground, words beside it, title aligned to the frame top within 5px); fails 390 outright; the stacked 4:5 frames beneath outgrow the stage and break one subject on scroll (3), and the pinned column hides the spec table (4). Does not meet the brief as shown.
- c2: meets 390 with the bar; fails 1440 by 41px (1); the 8/4 split costs the buy column its measure and introduces reflow risk (7); the 1106px frames turn the vertical gallery into a scroll through parts of photographs. Does not meet the brief as shown.
- c3: the only candidate that meets both viewport criteria as built; inherits c1's stacked-frame height (3), the pinned column (4) and the shared photo-order and photo-set faults (5, 6). Meets the brief's two measurable criteria and, with 3 and 4 fixed, meets all of them.

Counts, Part C: Blockers 2 (c2 at 1440; c0 and c1 at 390). Shoulds 5. Coulds 5.
Single change: on c3, set every stacked view to the stage's 4:3 (767x575 at 1440) and move `lg:sticky` to the name-and-form block only; that fixes the two defects that remain on the one candidate that passes both folds.

---

## What to keep (so it is not lost)
- A: the figure discipline of a0/a3/a4 (lining, tabular) and the a4 registry numeral; the a1 warmth in prose at 15-19px.
- B: the velvet keeping true gold at 5.0-5.2:1 in every candidate; b1's limestone as the one ground visibly outside cream.
- C: the c1/c3 stage (title top aligned to the frame top within 5px, the 48px paper "Turn it in 3D" sitting on the frame, poster first); the c2/c3 bar at 72px with the 48px button and `num` price; `min-w-[9ch]` on the price.

---

## Applied after this report (same day, exploration layer only)

- A1, A2: `font-variant-numeric: lining-nums` under `html[data-type='a1']` and `a2` (both fonts ship `lnum`; Linden Hill confirmed from its GSUB table). Registry and spec re-captured in `A-type/details/`.
- A3: `.spec td` and `.font-text` at 16px under a2.
- A7: `.h-item` removed from the Newsreader opsz 72 rule.
- A8: the placeholder wordmark stays on Libre Caslon Display under a4.
- A4: true 390 folds for all five faces captured in `A-type/folds/`; the `_folds` crops re-cut at 780x1688.
- B1: the switchboard `/__explore` now shows "No. 003" at 40px in the palette's text accent, its hairline, and a price in ink, on paper; captured per palette in `B-palette/accent/`.
- C3: on the stage (c1, c3) every stacked view is 4:3 at md and up, equal to the first frame.
- C4: on the stage only the name, ref, sentence and form pin; the spec table and accordions stay in flow. c0 and c2 unchanged.
- C5: `photos.ts` orders Signal Solitaire halo, hand, radiant.
- C8: the phone bar's hairline removed.
- Not applied (logged for the owner's decision or the rework pass): A5, A6 (a1/a3/a4 hero sizes), B2–B7, C1 (c2's split), C2 (inherent to c0/c1), C6 (photo set; PHOTOS-TODO), C7, C9–C12.

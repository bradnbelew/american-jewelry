> **Withdrawn 2026-10-12.** The owner asked to undo the explorations. The flags, the `/__explore` switchboard, `explore.css`, the candidate fonts and the product-layout variants were removed from the code; the canon's type, palette and product layout stand. This folder is kept as the record of what was tried and why (see also `critic-findings.md`).

# The three rework explorations (A type, B palette, C product layout)

Built 2026-10-11 under `docs/briefs/HANDOFF-rework-instructions.md` §3. Nothing here is a token yet. The canon, `DESIGN.md` and `house.css` are untouched; every candidate lives behind a flag in `storefront/app/explore.css`, `storefront/app/lib/explore.ts` and the layout branches in `storefront/app/routes/piece.tsx`. The owner decides; §4 of the instructions then moves the chosen values into the guides.

## How to see them

Live (production stays private on Oxygen): `https://american-jewelry-4d25801908d613ed6748.o2.myshopify.dev/__explore` is the switchboard. Each link sets a cookie (`aj-explore`, 30 days) so the choice follows you across pages. Flags can be combined in one URL:

| What | URL on the live site |
|---|---|
| Reset to the current site | `/?t=a0&p=b0&v=c0` |
| A type on the home | `/?t=a1` … `/?t=a4` |
| A type on a product | `/pieces/signal-solitaire?t=a1` … `?t=a4` |
| A type on the registry | `/royal-american?t=a1` … `?t=a4` |
| B palette on the home | `/?p=b1` … `/?p=b3` |
| B palette on Royal American | `/royal-american?p=b1` … `?p=b3` |
| B palette in the bag | add Signal Solitaire to the bag with `?p=` set; the drawer takes the palette |
| C layout on a product | `/pieces/signal-solitaire?v=c1` … `?v=c3` |

Captures (PNG, gitignored, in this folder): `A-type/` home and product at 390 and 1440 per face, `A-type/details/` the registry table and the spec table per face, `A-type/folds/` the true 390x844 fold of the home per face (2x), `B-palette/` home and Royal American at 390 and 1440 plus the bag drawer at 1440 per palette, `B-palette/accent/` the switchboard's "accent on paper" specimen per palette at 390 and 1440, `C-layout/` the product page at 390, 768 and 1440 as first viewport (`-fold`) and full page per layout, `_folds/` the first viewport of every full capture. `design-md/` holds a draft `DESIGN.md` per palette and the lint result.

The evidence these judgments rest on is in `research/17` §1, §2, §7, §8, §9; `research/18` §A, §B; `research/15` §5, §6; `research/14` §5; `research/16` §9.1; `research/13` §3; and the calibration list in `.claude/skills/frontend-design/SKILL.md`.

---

## A. Primary typeface

The brief's tests: licensed for web and print at a known price; real italics; tabular lining figures in the companion; holds at 11px caps and at 72px; outside the AI-tell cluster and the overused display serifs; ideally an American authorship or American-printing lineage (research/15 §6). Public Sans stays the companion in every candidate, so the 11px caps test (nav, buttons) is the same in all five captures and passes in all five; what changes is the names, the headlines, the letter and the product sentence.

### The five, measured

| | Face (flag) | Authorship and lineage | License | Italic | Figures (from the font's GSUB table) | 72px hero | 56px product name | Registry "No. 003" |
|---|---|---|---|---|---|---|---|---|
| a0 | Libre Caslon Display + Text (current) | English (Caslon, 1720s); printed the Declaration (Dunlap broadside, 1776) | OFL, $0 | Text yes, Display none | Display: no `tnum`; Text: `tnum` | holds; one line at 1440 | holds | lining, gold |
| a1 | Sorts Mill Goudy | American: Frederic Goudy's Goudy Oldstyle (ATF, 1915), revived by Barry Schwartz | OFL, $0 | yes | old-style by default, `lnum` available | holds; one line, slightly wider set | holds, warmer | lining (`lining-nums` set in explore.css; old-style by default) |
| a2 | Linden Hill | American: Goudy's Deepdene (1927), revived by Barry Schwartz | OFL, $0 | yes | old-style by default, `lnum` available | holds; narrower, lighter | holds, reads bookish | lining (`lining-nums` set in explore.css; old-style by default) |
| a3 | Newsreader (variable, opsz 6–72) | Production Type, Paris (2020) for Google Fonts; not American | OFL, $0 | yes | lining, `tnum` and `pnum` | holds; crisp at opsz 72 | holds | lining, gold |
| a4 | Besley (names) + Newsreader (prose) | Clarendon: Robert Besley, London 1845; American by use (wood type, job printing), not by authorship | OFL, $0 | yes | lining, `tnum` | holds; wraps to two lines at 1440 | holds, heavy | lining, gold, the widest |

Where to look: `_folds/aX-home__1440.fold.png` (hero), `_folds/aX-piece__1440.fold.png` (56px name, price, controls), `A-type/details/aX-registry__1440.png` ("No. 001" to "003" on velvet), `A-type/details/aX-spec__1440.png` (spec table).

### Rationale per candidate

**a0, Libre Caslon (keep).** Research/15 §6 is the case: the type of the Declaration and the type of the U.S. government, both free, a House-page paragraph no other jeweler can tell truthfully. Research/17 §2 lists "Libre Caslon on paper #F5F2EC" as the second of the house's distinctive assets and warns never to redesign an asset while it gains fame. Against it: the frontend-design calibration names "warm cream near #F4F1EA with a high-contrast serif display" as the single commonest AI tell, and research/18 §A (Tuch 2012) says beauty comes from low complexity plus high prototypicality, which a Caslon on cream has in full but shares with every generated page this year. Libre Caslon Display also has no italic, so emphasis in names is impossible. Hide the name: a reader would place it as "a serious institutional serif on cream", which in 2026 is a cluster, not a house. Recognition would come from Caslon plus paper plus the registry grammar together, not from the face alone.

**a1, Sorts Mill Goudy (the recommendation if A changes).** The only candidate with an American author: Goudy drew it for American Type Founders in 1915, the same decade Benton drew the Franklin Gothic that Public Sans descends from, so the House-page type story stays true and becomes stronger ("two American faces, one American foundry era"). It is almost unused on the web, has a real italic, and the capture shows it holding the hero in one line at 1440 and the product name at 56px with more warmth than Caslon and no loss of exactness. Research/17 §7 says never add a fourth web face; a1 keeps three (one serif for names and prose, Public Sans for UI). Cost: figures are old-style by default, so the exploration sets `font-variant-numeric: lining-nums` on the whole document for a1 and a2 (the font ships `lnum`; the critic's first two blockers, now applied and re-captured), and the 15 §6 Declaration paragraph is rewritten around Goudy and ATF. At 390 the headline takes three lines instead of two; the button still sits above the fold (`A-type/folds/a1-home-fold__390.png`). Hide the name: "the house with the Goudy" is a sentence a reader can say in a year; it sits outside the tell cluster while staying a book face, which is what Tuch's prototypicality asks for.

**a2, Linden Hill (Deepdene).** Same author, same license, quieter and narrower. At 56px it reads like a well-set book; at 72px on the hand photograph it is thin against the skin tones and the hero's weight drops (compare `a1-home__1440` and `a2-home__1440`). Figures old-style by default as a1. Hide the name: distinctive to a typographer, "a thin serif" to a customer; lower fame potential than a1 for the same cost.

**a3, Newsreader.** The best engineered of the five (true optical sizes, tabular figures, excellent italics) and the capture is the cleanest spec table. But it is a newspaper face designed for screens, French-made, and it is already the serif the generic "editorial minimal" skill set reaches for; it would be a second step into the cluster the owner asked to leave, with no American story. Hide the name: a reader would say "a nice news serif", not a house.

**a4, Besley with Newsreader prose.** The most distinctive silhouette and a true American printing lineage by use. At 72px the hero wraps to two lines at 1440 and the weight pushes the photograph back; at 56px the product name is the heaviest element on the page, ahead of the ring. The canon says American as a way of making, never a costume, and a Clarendon at display size reads as poster and wood type, a costume. It also makes a fourth web face (Besley plus Newsreader plus Public Sans plus nothing for the letter), which 17 §7 forbids. Hide the name: recognizable in a year, but recognized as a style, not as this house.

### Public Sans, scrutinized

Keep it. It has `tnum` (tabular lining figures for prices and tables, the brief's requirement), holds the 11px caps at 0.08em in every capture, and carries the second half of the type story (USWDS, forked from Libre Franklin, from Benton's 1912 Franklin Gothic; research/15 §6). The paid alternatives the brief names (Söhne, Untitled Sans, Neue Haas Unica, GT America) are each a designer's sans a reader would notice; the UI sans in this house should be invisible so the serif and the photographs carry the identity. Inter is banned by the canon. No sans candidate was rendered; the comparison is on paper only, and a `?s=` flag can be added in an hour if the owner wants to see one.

### The paid pool, for the record

Prices were not retrievable this session (the foundries list them behind style and license pickers, or not at all); each is marked "on the foundry page" rather than guessed. None is needed to pass the brief, since four OFL faces pass every test above.

| Face | Foundry | Why it would fit | Cost |
|---|---|---|---|
| Williams Caslon Text | Font Bureau (Type Network) | The Caslon upgrade path from 15 §6; keeps the Declaration story with better italics and figures | on the foundry page |
| Caslon Doric | Commercial Type | A sans drawn from Caslon's foundry; could replace Public Sans with one family story | on the foundry page |
| Chronicle, Mercury, Sentinel, Surveyor | Hoefler&Co (Monotype) | American foundry; Chronicle and Mercury are newspaper-tested, Sentinel a gentle Clarendon, Surveyor a map face | on the foundry page |
| Miller, Benton Modern | Font Bureau | Scotch and American newspaper lineage (Benton again) | on the foundry page |
| Austin, Canela, Lyon | Commercial Type | Fashion-house serifs; Canela is widely used by luxury brands, so less ownable | on the foundry page |
| Signifier, Tiempos; Söhne | Klim | Signifier is a Fell-type revival with real digital rigor; Söhne as companion. Klim licenses one-time per style and per medium; figures on the site | on the foundry page [verify] |
| Sharp Type, Grilli Type (GT Alpina, GT America) | | GT Alpina is a strong candidate against a3; GT America against Public Sans | on the foundry page |

If the owner wants a licensed face, the next session should price Williams Caslon Text and GT Alpina for web plus print before anything else.

---

## B. Palette

The brief's tests: bone or limestone grounds outside the cream cluster; a true near-black ink; one ownable accent no competitor holds (not Tiffany blue, Cartier red, VCA green, Yurman black-and-gold, Brilliant Earth teal); every text color AA; fix gold #B08D57 on paper (2.77:1, research/16 §9.1); show on the home, a Royal American page and the bag drawer; lint a draft `DESIGN.md` per palette.

### Tokens

| | Name (flag) | paper | bone | ink | ink-2 | muted | hair | stone | text accent (`--gold` on paper) | hairline accent | velvet |
|---|---|---|---|---|---|---|---|---|---|---|---|
| b0 | Paper, ink, gold (current) | #F5F2EC | #ECE7DD | #121212 | #3F3F3F | #63676E | #DDD8CF | #E9E7E2 | #B08D57 | #B08D57 | #16213A |
| b1 | Limestone, ink, bronze | #ECEBE6 | #E2E0D9 | #131313 | #3B3B39 | #5D6064 | #D4D1C9 | #E4E3DF | #7D5E37 | #B08D57 | #16213A |
| b2 | Chalk, ink, iron | #F3F3F0 | #E9E9E5 | #101010 | #363839 | #5A5E63 | #D9D9D4 | #E6E7E4 | #45515F | #8A94A0 | #16213A |
| b3 | Bone, ink, aubergine | #EFEDE6 | #E5E2D9 | #15140F | #3D3B35 | #605E58 | #D8D4CA | #E7E5DF | #4B2E3E | #8C6F7F | #1D2437 |

On velvet (Royal American, the bag) all four keep the true gold #B08D57 for numerals; the darkened accents are for paper only.

### Contrast (WCAG ratio, computed from the hex values)

| | ink on paper | ink-2 on paper | muted on paper | muted on bone | accent on paper | paper on velvet | gold on velvet |
|---|---|---|---|---|---|---|---|
| b0 | 16.77 | 9.42 | 5.09 | 4.61 | **2.77 (fails AA, fails 3:1 large)** | 14.32 | 5.18 |
| b1 | 15.57 | 9.40 | 5.29 | 4.78 | 4.99 (AA normal text) | 13.40 | 5.18 |
| b2 | 17.12 | 10.60 | 5.87 | 5.36 | 7.28 (AAA) | 14.39 | 5.18 |
| b3 | 15.74 | 9.56 | 5.53 | 5.00 | 10.19 (AAA) | 13.18 | 5.00 |

Every text color in b1, b2 and b3 passes AA for normal text. The b0 failure is the one the DESIGN.md lint found; the darkening 16 §9.1 suggested (#8F7140) reaches only 4.08:1, so b1's bronze #7D5E37 is the smallest change that passes normal text.

`designmd lint` on the drafts (`design-md/DESIGN.b1.md`, `.b2`, `.b3`): 0 errors, 0 warnings each. The current `DESIGN.md`: 0 errors, 1 warning (gold on paper).

### Rationale per candidate

**b0, current.** Paper #F5F2EC is one step from the #F4F1EA the calibration list names, and gold text fails contrast. Keeping it means accepting the cluster and fixing gold by rule (decorative gold always duplicated in ink), which the registry table already does.

**b1, Limestone, ink, bronze (the recommendation).** Middle Tennessee is limestone country, and limestone is grayer and cooler than cream; the ground leaves the warm-paper cluster without adding a hue. The accent is the same metal darkened to bronze until it passes AA, so the palette still has one color beyond ink and paper (research/18 §A: Reinecke 2013, colorfulness lowers first-impression aesthetics; Kim & Moon 1998, few colors build trust) and photography still carries the color (compare `b1-home__1440` with `b0-home__1440`: the hand photograph reads the same, the page around it reads quieter). Research/15 §5 (Albers) is why the velvet keeps true gold: the same hex reads as a different color on navy. Ownable: no house in the brief's national set holds limestone and bronze; Yurman's black-and-gold is a different register. The critic reads bronze as "a darker gold, every jeweler's accent" rather than an owned color, and that is fair: b1 answers the contrast failure and the cream cluster, not the ownable-accent wish. Cost: least "new" of the three; the distinctiveness has to come from A and from the photographs. See the accent on paper at `/__explore?p=b1` (`B-palette/accent/`).

**b2, Chalk, ink, iron.** A neutral near-white with no warmth, and an iron blue-gray for numerals and rules at 7.28:1. It is the farthest from the cream cluster and the most modern, and the capture of the bag shows the trouble: iron and the navy velvet are the same family, so Royal American and the bag lose their one reserved color against the rest of the site, and the gold jewelry sits on a cold ground that fights it. It reads as the "cold luxury" preset the generic skills recommend, which is its own cluster.

**b3, Bone, ink, aubergine.** Bone is warm but less yellow than cream, and aubergine at 10.19:1 is the accent no jeweler in the set holds. The velvet shifts to #1D2437 so navy and aubergine stay apart. It answers the brief's "one ownable accent" most completely and the registry numerals on bone are handsome. Risk: purple beside gold photography is the oldest "royal" pairing there is, and the canon forbids costume; it only works if aubergine stays at numerals, the focus ring and the hairline under a photograph, never a surface. It also makes two accents site-wide (gold on velvet, aubergine on paper), where b1 has one metal.

Not checked: the local competitive set's own web colors (research/13 §3.3 lists the names); the owner knows those storefronts and should look once before choosing b3.

---

## C. Product photo layout

The brief's tests: one subject in the first second; price and the action visible without scrolling at 390x844 and 1440x900; no reflow on option change; the hand frame second; 3D as a view, not a hero; nothing bordered; no thumbnail strip if a vertical gallery does the job on desktop. Patterns studied: Rolex (title block left, product centered on a pale ground), Hermès and SSENSE (vertical gallery, sticky details), Cartier and Van Cleef & Arpels (sticky buy box), Baymard's gallery findings (a vertical gallery beats thumbnails on desktop; the first image must be the product alone), and research/14 §5 for the view order (three-quarter, hand, profile, top, macro, hallmark).

### The four, measured on Signal Solitaire

| | Layout (flag) | 1440x900: price and Add to bag above the fold | 390x844: price and Add to bag above the fold | 768x1024 | One subject at 1440 | Desktop gallery |
|---|---|---|---|---|---|---|
| c0 | current: gallery 7 cols left, sticky details 5 cols right, pairs beneath the first frame | yes (button bottom edge 888px) | no (photograph only) | no | the ring, details beside | first frame 4:5, then two-up pairs |
| c1 | the stage: words 5 cols left, one 4:3 frame 7 cols right (Rolex), views stacked beneath | yes (888px) | no | no | the ring on its ground, name at the top left | one view per frame, no pairs |
| c2 | the scroll: one 4:5 frame per view in 8 cols, sticky details 4 cols (Hermès, SSENSE), fixed phone bar | **no** (button starts at 895px, cut by the fold) | **yes** (fixed bar: price, version and metal, Add to bag) | no | the ring, large | one view per frame |
| c3 | c1 on desktop, the c2 bar at phone widths | yes (888px) | yes (bar) | no | as c1 | as c1 |

Where to look: `C-layout/cX-piece-fold__1440.png`, `__390.png`, `__768.png`; full pages in `cX-piece__*.png`.

Shared by all four (the form is the same component): option tiles and fields keep fixed heights, the Version row holds three tiles, so changing version or metal moves nothing; the first frame is the photograph with "Turn it in 3D" as a control on it, so 3D stays a view; no frame has a border, the only 1px borders are the controls the canon prescribes; no thumbnail strip anywhere.

### Rationale and the judgment

Fessenden's finding (research/18 §A) that about 57 percent of viewing time is above the fold is the reason the brief asks for price and action in the first viewport at both widths. At 390 only a fixed bar achieves it without pushing the photograph down, which is what c2 adds and c0 and c1 lack; at 1440 the sticky column achieves it and the Hermès-style wide gallery (c2) does not, because the 8-column frame forces the details into 4 columns and the form grows past the fold. c1 answers the "one subject" test best on desktop: the ring sits alone on its pale ground at 4:3 with the name to its left, which is Rolex's grammar and the one the canon's "object as subject" asks for; it also removes the two-up pairs, so every view gets the whole width (Baymard: no thumbnails, one view at a time, in order).

**c3 is the recommendation**: the stage on desktop and the bar on the phone, and it passes every test in the table. After the critic, c3 also sets every stacked view to the stage's 4:3 and pins only the name and the form, so the spec table stays reachable (`C-layout/c3-piece__1440.png`); the photo order now puts the hand frame second for Signal Solitaire. Two things remain outside layout: the hand photograph is the house's one hand frame and shows a different ring (no hand frame of this piece exists; logged in `docs/briefs/PHOTOS-TODO.md`), and no variant puts the action above the fold at 768x1024, which the brief did not ask for and which a tablet in portrait rarely needs.

If the owner prefers the current c0, the bar from c2 is still worth adopting at phone widths on its own.

---

## House-critic findings

The full report is `critic-findings.md` in this folder: 5 blockers (two on the Goudy figures, one on the palette captures never showing the accent on paper, c2 at 1440, c0 and c1 at 390), 13 shoulds, 10 coulds, with per-candidate verdicts and "hide the name" reads. The blockers that were about the explorations rather than the candidates were fixed the same day and re-captured (lining figures for a1 and a2, the accent specimen on `/__explore`, true 390 folds, c3's stacked views at 4:3 and a shorter sticky block, the hand frame second, the bar's hairline removed); the list of what was and was not applied closes that file. The critic's own verdicts: a1 meets the brief once figures are lining; a3 meets every technical test and fails distinctiveness; a4 is a names face, not a hero face; b1's ground is the only one clearly outside cream but its accent is a dark gold; b3 is the ownable accent; c3 is the only layout that passes both folds.

## What was not changed

The canon (`docs/briefs/00-house-canon.md`), `company/05-visual-identity.md`, `DESIGN.md` and `storefront/app/house.css` are as they were at commit 27f3c80. The explorations add `app/explore.css` (imported after `house.css`), `app/lib/explore.ts`, `app/routes/explore.tsx` (noindex), the cookie and `data-type`/`data-palette` attributes in `app/root.tsx`, the `layout` prop on `PieceGallery` and the `phoneBar` prop on `PieceForm`. Removing the explorations after the decision is a matter of deleting those and the `?t= ?p= ?v=` reads.

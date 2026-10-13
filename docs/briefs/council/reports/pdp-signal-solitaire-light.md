# Measured: pdp-signal-solitaire-light

http://localhost:3030/pieces/signal-solitaire?viewing=light  
Measured 2026-10-13T04:55 against 14 reference pages (pdp band). Bands are the reference range: min, middle half (p25 to p75), max. "Edge" means inside the range but outside the middle half; "outside" means beyond every reference.

## House rules (fixed numbers; a failure here is a Blocker)

| Rule | 390 | 768 | 1440 |
|---|---|---|---|
| At most three faces (canon: two serifs and one sans) | pass (3) | pass (3) | pass (3) |
| Nothing below 11px | pass (11) | pass (11) | pass (11) |
| No prose line over 80 characters (DESIGN.md measure 62ch) | pass (44) | pass (52) | pass (52) |
| No shadows | pass (0) | pass (0) | pass (0) |
| No bordered-card grammar | pass (0) | pass (0) | pass (0) |
| No pills | pass (0) | pass (0) | pass (0) |
| No radius on controls | pass (0) | pass (0) | pass (0) |
| Controls at least 44px (WCAG 2.5.5 enhanced; house .btn 48) | pass (0) | pass (0) | pass (0) |
| Every text color passes AA on its ground | pass (0) | pass (0) | pass (0) |
| No exclamation points (canon voice 9) | pass (0) | pass (0) | pass (0) |
| No em dashes (canon voice 9) | pass (0) | pass (0) | pass (0) |
| One accent at most in text | pass (none) | pass (none) | pass (none) |
| Price and action in the first viewport (rework brief §3 C) | pass (price in, action in) | pass (price in, action in) | pass (price in, action in) |

## Against the houses (the bands; outside is a Should, edge is a note)

| Measure | Width | Ours | Houses min | Middle half | Max | Read |
|---|---|---|---|---|---|---|
| H1 size (px) | 390 | 36 | 16 | 17 to 18 | 18 | **outside** |
| H1 size (px) | 768 | 44 | 16 | 17 to 18 | 18 | **outside** |
| H1 size (px) | 1440 | 44 | 18 | 19 to 21 | 22 | **outside** |
| Largest type in the first viewport (px) | 390 | 20 | 16 | 18 to 20 | 22 | inside |
| Largest type in the first viewport (px) | 768 | 26 | 16 | 18 to 18 | 22.4 | **outside** |
| Largest type in the first viewport (px) | 1440 | 44 | 18 | 20 to 22 | 24.5 | **outside** |
| Body size, median of prose (px) | 390 | 15 | 16 | 16 to 16.5 | 18 | **outside** |
| Body size, median of prose (px) | 768 | 14 | 16 | 16 to 16.55 | 18.2 | **outside** |
| Body size, median of prose (px) | 1440 | 15 | 16 | 16 to 16.8 | 19.2 | **outside** |
| Body leading (x size) | 390 | 1.6 | 1.3 | 1.45 to 1.52 | 1.6 | edge |
| Body leading (x size) | 768 | 1.6 | 1.3 | 1.45 to 1.52 | 1.6 | edge |
| Body leading (x size) | 1440 | 1.6 | 1.3 | 1.45 to 1.52 | 1.6 | edge |
| Measure, median characters per line | 390 | 34 | 34 | 36.25 to 41.25 | 45 | edge |
| Measure, median characters per line | 768 | 31 | 26 | 32 to 66.25 | 82 | edge |
| Measure, median characters per line | 1440 | 44 | 40 | 44.5 to 51 | 57 | edge |
| Measure, longest line (chars) | 390 | 44 | 40 | 42.25 to 46 | 49 | inside |
| Measure, longest line (chars) | 768 | 52 | 35 | 44.75 to 67 | 85 | inside |
| Measure, longest line (chars) | 1440 | 52 | 40 | 48.25 to 54.25 | 61 | inside |
| Typefaces in use | 390 | 3 | 1 | 2 to 2 | 3 | edge |
| Typefaces in use | 768 | 3 | 1 | 2 to 2 | 3 | edge |
| Typefaces in use | 1440 | 3 | 1 | 2 to 2 | 3 | edge |
| Distinct type sizes | 390 | 10 | 3 | 4 to 8 | 9 | **outside** |
| Distinct type sizes | 768 | 10 | 3 | 4 to 8 | 9 | **outside** |
| Distinct type sizes | 1440 | 10 | 3 | 4 to 8 | 9 | **outside** |
| Smallest type (px) | 390 | 11 | 8.9 | 8.97 to 11.25 | 12 | inside |
| Smallest type (px) | 768 | 11 | 8.9 | 9.72 to 11.25 | 12 | inside |
| Smallest type (px) | 1440 | 11 | 10 | 10 to 12 | 12 | inside |
| Share of text blocks in caps | 390 | 0.1 | 0 | 0.02 to 0.52 | 0.61 | inside |
| Share of text blocks in caps | 768 | 0.1 | 0 | 0.02 to 0.52 | 0.61 | inside |
| Share of text blocks in caps | 1440 | 0.09 | 0 | 0.02 to 0.52 | 0.62 | inside |
| Caps tracking (em) | 390 | 0.1 | 0 | 0 to 0.03 | 0.1 | edge |
| Caps tracking (em) | 768 | 0.1 | 0 | 0 to 0.03 | 0.1 | edge |
| Caps tracking (em) | 1440 | 0.1 | 0 | 0 to 0.03 | 0.1 | edge |
| Words in the first viewport | 390 | 13 | 11 | 29 to 44 | 79 | edge |
| Words in the first viewport | 768 | 13 | 11 | 12 to 41 | 121 | inside |
| Words in the first viewport | 1440 | 76 | 38 | 41 to 121 | 282 | inside |
| Elements in the first viewport | 390 | 11 | 5 | 10 to 22 | 26 | inside |
| Elements in the first viewport | 768 | 9 | 4 | 6 to 23 | 31 | inside |
| Elements in the first viewport | 1440 | 34 | 15 | 15 to 23 | 27 | **outside** |
| Image share of the first viewport | 390 | 0.71 | 0.46 | 0.93 to 1 | 1 | edge |
| Image share of the first viewport | 768 | 0.75 | 0.4 | 0.75 to 1 | 1 | inside |
| Image share of the first viewport | 1440 | 0.41 | 0.34 | 0.41 to 0.52 | 1 | inside |
| Typical gap between blocks (px) | 390 | 24 | 14 | 24 to 29 | 31 | inside |
| Typical gap between blocks (px) | 768 | 26 | 14 | 22 to 31 | 32 | inside |
| Typical gap between blocks (px) | 1440 | 40 | 14 | 24 to 79 | 140 | inside |
| Section gap (share of viewport height) | 390 | 0.08 | 0.02 | 0.09 to 0.33 | 0.8 | edge |
| Section gap (share of viewport height) | 768 | 0.09 | 0.01 | 0.08 to 0.26 | 0.68 | inside |
| Section gap (share of viewport height) | 1440 | 0.19 | 0.07 | 0.16 to 0.29 | 0.77 | inside |
| Distinct left edges (alignment axes) | 390 | 13 | 3 | 9 to 15 | 23 | inside |
| Distinct left edges (alignment axes) | 768 | 17 | 4 | 8 to 22 | 22 | inside |
| Distinct left edges (alignment axes) | 1440 | 18 | 5 | 10 to 22 | 24 | inside |
| Large images on the page | 390 | 5 | 4 | 5 to 19 | 39 | inside |
| Large images on the page | 768 | 5 | 4 | 5 to 20 | 39 | inside |
| Large images on the page | 1440 | 5 | 5 | 5 to 20 | 39 | inside |
| Boxed containers (4-side borders) | 390 | 0 | 0 | 0 to 1 | 1 | inside |
| Boxed containers (4-side borders) | 768 | 0 | 0 | 0 to 1 | 1 | inside |
| Boxed containers (4-side borders) | 1440 | 0 | 0 | 0 to 1 | 1 | inside |
| Rounded elements | 390 | 0 | 0 | 0 to 4 | 6 | inside |
| Rounded elements | 768 | 0 | 0 | 0 to 4 | 6 | inside |
| Rounded elements | 1440 | 0 | 0 | 0 to 4 | 6 | inside |
| Elements with shadows | 390 | 0 | 0 | 0 to 1 | 3 | inside |
| Elements with shadows | 768 | 0 | 0 | 0 to 1 | 2 | inside |
| Elements with shadows | 1440 | 0 | 0 | 0 to 1 | 2 | inside |
| Distinct text colors | 390 | 4 | 1 | 3 to 6 | 9 | inside |
| Distinct text colors | 768 | 4 | 1 | 3 to 6 | 9 | inside |
| Distinct text colors | 1440 | 4 | 1 | 3 to 6 | 9 | inside |
| Largest control radius (px) | 390 | 0 | 0 | 0 to 50 | 100 | inside |
| Largest control radius (px) | 768 | 0 | 0 | 0 to 50 | 100 | inside |
| Largest control radius (px) | 1440 | 0 | 0 | 0 to 10 | 100 | inside |
| Controls under 44px tall | 390 | 0 | 0 | 1 to 4 | 13 | edge |
| Controls under 44px tall | 768 | 0 | 0 | 0 to 1 | 9 | inside |
| Controls under 44px tall | 1440 | 0 | 0 | 1 to 2 | 9 | edge |
| Visible header links | 390 | 5 | 1 | 1 to 4 | 4 | **outside** |
| Visible header links | 768 | 7 | 1 | 1 to 5 | 14 | edge |
| Visible header links | 1440 | 14 | 4 | 6 to 10 | 14 | edge |
| Words on the page (body) | 390 | 220 | 72 | 83 to 676 | 723 | inside |
| Words on the page (body) | 768 | 220 | 72 | 83 to 676 | 726 | inside |
| Words on the page (body) | 1440 | 216 | 78 | 83 to 653 | 726 | inside |
| Sentence length, median words | 390 | 15 | 19 | 23 to 35 | 53 | **outside** |
| Sentence length, median words | 768 | 15 | 19 | 23 to 35 | 53 | **outside** |
| Sentence length, median words | 1440 | 15 | 18 | 23 to 32 | 59 | **outside** |
| Page length (viewports) | 390 | 5.1 | 1 | 1.97 to 8.85 | 18.6 | inside |
| Page length (viewports) | 768 | 4.4 | 1 | 2.05 to 8.05 | 16.3 | inside |
| Page length (viewports) | 1440 | 3.7 | 1 | 1.9 to 9.28 | 17.6 | inside |

## Facts for the reviewer (1440)

- Typefaces by share of characters: Libre Caslon Text 53%, Public Sans Variable 32%, Libre Caslon Display 15%.
- Type sizes by share: 14px 23%, 13px 22%, 15px 18%, 56px 10%, 17px 9%, 16px 8%, 11px 6%, 18px 3%, 36px 1%, 44px 1%.
- Ground #f5f2ec (hue 40, saturation 0.31, lightness 0.94); largest backgrounds #ffffff 88%, #f5f2ec 11%, #121212 1%.
- Control heights: 48, 50, 52px; caps on 31% of controls.
- Image ratios, first twelve: 0.8, 0.8, 0.8, 0.8, 0.8.
- Price "$3,200" at 32px, top 387px.
- Action "ADD TO BAG" 48px tall, top 840px.
- Text blocks on photographs: 0.

Screenshots: docs/briefs/council/shots/pdp-signal-solitaire-light__390.png, __768.png, __1440.png (first viewport).

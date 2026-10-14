# Measured: lines-royal-piece

http://127.0.0.1:3033/pieces/no-001-the-cumberland  
Measured 2026-10-14T05:10 against 14 reference pages (pdp band). Bands are the reference range: min, middle half (p25 to p75), max. "Edge" means inside the range but outside the middle half; "outside" means beyond every reference.

## House rules (fixed numbers; a failure here is a Blocker)

| Rule | 390 | 768 | 1440 |
|---|---|---|---|
| At most three faces (canon: two serifs and one sans) | pass (2) | pass (2) | pass (2) |
| Nothing below 11px | pass (11) | pass (11) | pass (11) |
| No prose line over 80 characters (DESIGN.md measure 62ch) | pass (37) | pass (74) | pass (49) |
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
| H1 size (px) | 390 | 32 | 16 | 17 to 18 | 18 | **outside** |
| H1 size (px) | 768 | 40 | 16 | 17 to 18 | 18 | **outside** |
| H1 size (px) | 1440 | 40 | 18 | 19 to 21 | 22 | **outside** |
| Largest type in the first viewport (px) | 390 | 32 | 16 | 18 to 20 | 22 | **outside** |
| Largest type in the first viewport (px) | 768 | 40 | 16 | 18 to 18 | 22.4 | **outside** |
| Largest type in the first viewport (px) | 1440 | 40 | 18 | 20 to 22 | 24.5 | **outside** |
| Body size, median of prose (px) | 390 | 16 | 16 | 16 to 16.5 | 18 | inside |
| Body size, median of prose (px) | 768 | 16 | 16 | 16 to 16.55 | 18.2 | inside |
| Body size, median of prose (px) | 1440 | 16 | 16 | 16 to 16.8 | 19.2 | inside |
| Body leading (x size) | 390 | 1.6 | 1.3 | 1.45 to 1.52 | 1.6 | edge |
| Body leading (x size) | 768 | 1.6 | 1.3 | 1.45 to 1.52 | 1.6 | edge |
| Body leading (x size) | 1440 | 1.6 | 1.3 | 1.45 to 1.52 | 1.6 | edge |
| Measure, median characters per line | 390 | 37 | 34 | 36.25 to 41.25 | 45 | inside |
| Measure, median characters per line | 768 | 74 | 26 | 32 to 66.25 | 82 | edge |
| Measure, median characters per line | 1440 | 49 | 40 | 44.5 to 51 | 57 | inside |
| Measure, longest line (chars) | 390 | 37 | 40 | 42.25 to 46 | 49 | **outside** |
| Measure, longest line (chars) | 768 | 74 | 35 | 44.75 to 67 | 85 | edge |
| Measure, longest line (chars) | 1440 | 49 | 40 | 48.25 to 54.25 | 61 | inside |
| Typefaces in use | 390 | 2 | 1 | 2 to 2 | 3 | inside |
| Typefaces in use | 768 | 2 | 1 | 2 to 2 | 3 | inside |
| Typefaces in use | 1440 | 2 | 1 | 2 to 2 | 3 | inside |
| Distinct type sizes | 390 | 6 | 3 | 4 to 8 | 9 | inside |
| Distinct type sizes | 768 | 7 | 3 | 4 to 8 | 9 | inside |
| Distinct type sizes | 1440 | 7 | 3 | 4 to 8 | 9 | inside |
| Smallest type (px) | 390 | 11 | 8.9 | 8.97 to 11.25 | 12 | inside |
| Smallest type (px) | 768 | 11 | 8.9 | 9.72 to 11.25 | 12 | inside |
| Smallest type (px) | 1440 | 11 | 10 | 10 to 12 | 12 | inside |
| Share of text blocks in caps | 390 | 0.18 | 0 | 0.02 to 0.52 | 0.61 | inside |
| Share of text blocks in caps | 768 | 0.18 | 0 | 0.02 to 0.52 | 0.61 | inside |
| Share of text blocks in caps | 1440 | 0.18 | 0 | 0.02 to 0.52 | 0.62 | inside |
| Caps tracking (em) | 390 | 0.1 | 0 | 0 to 0.03 | 0.1 | edge |
| Caps tracking (em) | 768 | 0.1 | 0 | 0 to 0.03 | 0.1 | edge |
| Caps tracking (em) | 1440 | 0.1 | 0 | 0 to 0.03 | 0.1 | edge |
| Words in the first viewport | 390 | 63 | 11 | 29 to 44 | 79 | edge |
| Words in the first viewport | 768 | 63 | 11 | 12 to 41 | 121 | edge |
| Words in the first viewport | 1440 | 113 | 38 | 41 to 121 | 282 | inside |
| Elements in the first viewport | 390 | 13 | 5 | 10 to 22 | 26 | inside |
| Elements in the first viewport | 768 | 13 | 4 | 6 to 23 | 31 | inside |
| Elements in the first viewport | 1440 | 25 | 15 | 15 to 23 | 27 | edge |
| Image share of the first viewport | 390 | 0.21 | 0.46 | 0.93 to 1 | 1 | **outside** |
| Image share of the first viewport | 768 | 0.29 | 0.4 | 0.75 to 1 | 1 | **outside** |
| Image share of the first viewport | 1440 | 0.24 | 0.34 | 0.41 to 0.52 | 1 | **outside** |
| Typical gap between blocks (px) | 390 | 24 | 14 | 24 to 29 | 31 | inside |
| Typical gap between blocks (px) | 768 | 24 | 14 | 22 to 31 | 32 | inside |
| Typical gap between blocks (px) | 1440 | 16 | 14 | 24 to 79 | 140 | edge |
| Section gap (share of viewport height) | 390 | 0.11 | 0.02 | 0.09 to 0.33 | 0.8 | inside |
| Section gap (share of viewport height) | 768 | 0.11 | 0.01 | 0.08 to 0.26 | 0.68 | inside |
| Section gap (share of viewport height) | 1440 | 0.17 | 0.07 | 0.16 to 0.29 | 0.77 | inside |
| Distinct left edges (alignment axes) | 390 | 2 | 3 | 9 to 15 | 23 | **outside** |
| Distinct left edges (alignment axes) | 768 | 2 | 4 | 8 to 22 | 22 | **outside** |
| Distinct left edges (alignment axes) | 1440 | 3 | 5 | 10 to 22 | 24 | **outside** |
| Large images on the page | 390 | 1 | 4 | 5 to 19 | 39 | **outside** |
| Large images on the page | 768 | 1 | 4 | 5 to 20 | 39 | **outside** |
| Large images on the page | 1440 | 1 | 5 | 5 to 20 | 39 | **outside** |
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
| Visible header links | 390 | 4 | 1 | 1 to 4 | 4 | inside |
| Visible header links | 768 | 5 | 1 | 1 to 5 | 14 | inside |
| Visible header links | 1440 | 12 | 4 | 6 to 10 | 14 | edge |
| Words on the page (body) | 390 | 66 | 72 | 83 to 676 | 723 | **outside** |
| Words on the page (body) | 768 | 66 | 72 | 83 to 676 | 726 | **outside** |
| Words on the page (body) | 1440 | 66 | 78 | 83 to 653 | 726 | **outside** |
| Sentence length, median words | 390 | 8 | 19 | 23 to 35 | 53 | **outside** |
| Sentence length, median words | 768 | 8 | 19 | 23 to 35 | 53 | **outside** |
| Sentence length, median words | 1440 | 8 | 18 | 23 to 32 | 59 | **outside** |
| Page length (viewports) | 390 | 2.1 | 1 | 1.97 to 8.85 | 18.6 | inside |
| Page length (viewports) | 768 | 1.6 | 1 | 2.05 to 8.05 | 16.3 | edge |
| Page length (viewports) | 1440 | 1.4 | 1 | 1.9 to 9.28 | 17.6 | edge |

## Facts for the reviewer (1440)

- Typefaces by share of characters: Source Serif 4 Variable 60%, Public Sans Variable 40%.
- Type sizes by share: 16px 35%, 13px 27%, 18px 18%, 11px 10%, 28px 4%, 15px 4%, 40px 3%.
- Ground #f6f5f2 (hue 45, saturation 0.18, lightness 0.96); largest backgrounds #101c30 61%, #f6f5f2 37%, #121212 2%.
- Control heights: 44, 48, 50px; caps on 89% of controls.
- Image ratios, first twelve: 1.78.
- Price "Price on request" at 28px, top 324px.
- Action "REQUEST A PRIVATE VIEWING" 48px tall, top 393px.
- Text blocks on photographs: 0.

Screenshots: docs/briefs/council/shots/lines-royal-piece__390.png, __768.png, __1440.png (first viewport).

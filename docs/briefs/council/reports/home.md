# Measured: home

http://localhost:3030/  
Measured 2026-10-13T06:35 against 14 reference pages (home band). Bands are the reference range: min, middle half (p25 to p75), max. "Edge" means inside the range but outside the middle half; "outside" means beyond every reference.

## House rules (fixed numbers; a failure here is a Blocker)

| Rule | 390 | 768 | 1440 |
|---|---|---|---|
| At most three faces (canon: two serifs and one sans) | pass (2) | pass (2) | pass (2) |
| Nothing below 11px | pass (11) | pass (11) | pass (11) |
| No prose line over 80 characters (DESIGN.md measure 62ch) | pass (38) | pass (62) | pass (62) |
| No shadows | pass (0) | pass (0) | pass (0) |
| No bordered-card grammar | pass (0) | pass (0) | pass (0) |
| No pills | pass (0) | pass (0) | pass (0) |
| No radius on controls | pass (0) | pass (0) | pass (0) |
| Controls at least 44px (WCAG 2.5.5 enhanced; house .btn 48) | pass (0) | pass (0) | pass (0) |
| Every text color passes AA on its ground | pass (0) | pass (0) | pass (0) |
| No exclamation points (canon voice 9) | pass (0) | pass (0) | pass (0) |
| No em dashes (canon voice 9) | pass (0) | pass (0) | pass (0) |
| One accent at most in text | pass (#b08d57) | pass (#b08d57) | pass (#b08d57) |

## Against the houses (the bands; outside is a Should, edge is a note)

| Measure | Width | Ours | Houses min | Middle half | Max | Read |
|---|---|---|---|---|---|---|
| Largest type in the first viewport (px) | 390 | 44 | 12 | 25.25 to 34.5 | 44 | edge |
| Largest type in the first viewport (px) | 768 | 68 | 12 | 25.25 to 42.25 | 68 | edge |
| Largest type in the first viewport (px) | 1440 | 76 | 12 | 22.75 to 49.75 | 76 | edge |
| Body size, median of prose (px) | 390 | 19 | 12 | 14 to 18 | 20 | edge |
| Body size, median of prose (px) | 768 | 19 | 12 | 14 to 19 | 32 | inside |
| Body size, median of prose (px) | 1440 | 19 | 12 | 15 to 19 | 38 | inside |
| Body leading (x size) | 390 | 1.6 | 1.2 | 1.2 to 1.6 | 1.8 | inside |
| Body leading (x size) | 768 | 1.6 | 1.2 | 1.2 to 1.6 | 1.8 | inside |
| Body leading (x size) | 1440 | 1.6 | 1.2 | 1.2 to 1.6 | 1.9 | inside |
| Measure, median characters per line | 390 | 38 | 27 | 36 to 38.5 | 44 | inside |
| Measure, median characters per line | 768 | 62 | 39 | 42 to 61.5 | 72 | edge |
| Measure, median characters per line | 1440 | 62 | 49 | 53.5 to 66 | 86 | inside |
| Measure, longest line (chars) | 390 | 38 | 27 | 39.5 to 49 | 60 | edge |
| Measure, longest line (chars) | 768 | 62 | 41 | 50.5 to 79 | 90 | inside |
| Measure, longest line (chars) | 1440 | 62 | 53 | 58.5 to 71 | 110 | inside |
| Typefaces in use | 390 | 2 | 1 | 1 to 2 | 3 | inside |
| Typefaces in use | 768 | 2 | 1 | 1 to 2 | 3 | inside |
| Typefaces in use | 1440 | 2 | 1 | 1 to 2 | 3 | inside |
| Distinct type sizes | 390 | 9 | 1 | 5 to 7 | 12 | edge |
| Distinct type sizes | 768 | 8 | 1 | 4 to 7 | 11 | edge |
| Distinct type sizes | 1440 | 9 | 2 | 4 to 9 | 11 | inside |
| Smallest type (px) | 390 | 11 | 9 | 10 to 12 | 13.2 | inside |
| Smallest type (px) | 768 | 11 | 10 | 10 to 12 | 13.2 | inside |
| Smallest type (px) | 1440 | 11 | 9 | 11 to 12 | 14 | inside |
| Share of text blocks in caps | 390 | 0.13 | 0 | 0.15 to 0.67 | 0.96 | edge |
| Share of text blocks in caps | 768 | 0.13 | 0 | 0.15 to 0.67 | 0.97 | edge |
| Share of text blocks in caps | 1440 | 0.13 | 0.06 | 0.38 to 0.67 | 0.97 | edge |
| Caps tracking (em) | 390 | 0.1 | 0 | 0 to 0.1 | 0.3 | inside |
| Caps tracking (em) | 768 | 0.1 | 0 | 0 to 0.1 | 0.3 | inside |
| Caps tracking (em) | 1440 | 0.1 | 0 | 0 to 0.1 | 0.3 | inside |
| Words in the first viewport | 390 | 22 | 0 | 8 to 20 | 79 | edge |
| Words in the first viewport | 768 | 13 | 0 | 8 to 32 | 198 | inside |
| Words in the first viewport | 1440 | 13 | 0 | 8 to 26 | 45 | inside |
| Elements in the first viewport | 390 | 8 | 0 | 5 to 15 | 29 | inside |
| Elements in the first viewport | 768 | 5 | 0 | 5 to 21 | 78 | inside |
| Elements in the first viewport | 1440 | 5 | 0 | 7 to 17 | 24 | edge |
| Image share of the first viewport | 390 | 0.58 | 0 | 0.58 to 1 | 1 | inside |
| Image share of the first viewport | 768 | 0.86 | 0 | 0.3 to 1 | 1 | inside |
| Image share of the first viewport | 1440 | 0.86 | 0 | 0.67 to 0.95 | 1 | inside |
| Typical gap between blocks (px) | 390 | 31 | 16 | 20 to 37.75 | 60 | inside |
| Typical gap between blocks (px) | 768 | 65 | 12 | 28.5 to 44 | 60 | **outside** |
| Typical gap between blocks (px) | 1440 | 108 | 16 | 38.25 to 64 | 90 | **outside** |
| Section gap (share of viewport height) | 390 | 0.16 | 0.08 | 0.09 to 0.16 | 0.17 | inside |
| Section gap (share of viewport height) | 768 | 0.24 | 0.07 | 0.09 to 0.17 | 0.45 | edge |
| Section gap (share of viewport height) | 1440 | 0.24 | 0.09 | 0.11 to 0.24 | 0.44 | inside |
| Distinct left edges (alignment axes) | 390 | 4 | 1 | 7 to 27 | 80 | edge |
| Distinct left edges (alignment axes) | 768 | 8 | 1 | 8 to 35 | 74 | inside |
| Distinct left edges (alignment axes) | 1440 | 11 | 1 | 8 to 37 | 84 | inside |
| Large images on the page | 390 | 4 | 0 | 11 to 37 | 90 | edge |
| Large images on the page | 768 | 4 | 0 | 10 to 36 | 80 | edge |
| Large images on the page | 1440 | 4 | 5 | 13 to 34 | 93 | **outside** |
| Boxed containers (4-side borders) | 390 | 0 | 0 | 0 to 0 | 9 | inside |
| Boxed containers (4-side borders) | 768 | 0 | 0 | 0 to 0 | 9 | inside |
| Boxed containers (4-side borders) | 1440 | 0 | 0 | 0 to 0 | 15 | inside |
| Rounded elements | 390 | 0 | 0 | 0 to 4 | 64 | inside |
| Rounded elements | 768 | 0 | 0 | 0 to 4 | 69 | inside |
| Rounded elements | 1440 | 0 | 0 | 0 to 4 | 72 | inside |
| Elements with shadows | 390 | 0 | 0 | 0 to 0 | 4 | inside |
| Elements with shadows | 768 | 0 | 0 | 0 to 0 | 4 | inside |
| Elements with shadows | 1440 | 0 | 0 | 0 to 0 | 4 | inside |
| Distinct text colors | 390 | 5 | 1 | 2 to 5 | 7 | inside |
| Distinct text colors | 768 | 5 | 1 | 2 to 5 | 7 | inside |
| Distinct text colors | 1440 | 5 | 1 | 2 to 5 | 7 | inside |
| Largest control radius (px) | 390 | 0 | 0 | 0 to 50 | 9999 | inside |
| Largest control radius (px) | 768 | 0 | 0 | 0 to 50 | 9999 | inside |
| Largest control radius (px) | 1440 | 0 | 0 | 0 to 50 | 9999 | inside |
| Controls under 44px tall | 390 | 0 | 0 | 0 to 2 | 4 | inside |
| Controls under 44px tall | 768 | 0 | 0 | 0 to 3 | 12 | inside |
| Controls under 44px tall | 1440 | 0 | 0 | 1 to 3 | 12 | edge |
| Visible header links | 390 | 3 | 0 | 1 to 3 | 4 | inside |
| Visible header links | 768 | 4 | 0 | 1 to 3 | 5 | edge |
| Visible header links | 1440 | 14 | 0 | 2 to 9 | 13 | **outside** |
| Words on the page (body) | 390 | 185 | 3 | 190 to 241 | 1559 | edge |
| Words on the page (body) | 768 | 185 | 3 | 190 to 328 | 1530 | edge |
| Words on the page (body) | 1440 | 185 | 4 | 190 to 334 | 1589 | edge |
| Sentence length, median words | 390 | 4 | 3 | 12 to 39 | 227 | edge |
| Sentence length, median words | 768 | 4 | 3 | 12 to 39 | 338 | edge |
| Sentence length, median words | 1440 | 4 | 4 | 11 to 39 | 338 | edge |
| Page length (viewports) | 390 | 7.2 | 1 | 1 to 6.2 | 15.3 | edge |
| Page length (viewports) | 768 | 5.7 | 1 | 1 to 6.2 | 12.4 | inside |
| Page length (viewports) | 1440 | 6.2 | 1 | 1 to 6.1 | 16.1 | edge |

## Facts for the reviewer (1440)

- Typefaces by share of characters: Source Serif 4 Variable 74%, Public Sans Variable 26%.
- Type sizes by share: 18px 27%, 19px 18%, 13px 14%, 11px 10%, 15px 9%, 48px 7%, 24px 6%, 64px 5%, 76px 3%.
- Ground #f6f5f2 (hue 45, saturation 0.18, lightness 0.96); largest backgrounds #16213a 46%, #121212 46%, #f6f5f2 8%.
- Control heights: 44, 48, 50px; caps on 92% of controls.
- Image ratios, first twelve: 1.86, 2.2, 1.33, 1.33.
- Text blocks on photographs: 0.

Screenshots: docs/briefs/council/shots/home__390.png, __768.png, __1440.png (first viewport).

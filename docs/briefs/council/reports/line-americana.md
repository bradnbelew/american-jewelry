# Measured: line-americana

http://localhost:3030/americana  
Measured 2026-10-13T06:23 against 14 reference pages (all band). Bands are the reference range: min, middle half (p25 to p75), max. "Edge" means inside the range but outside the middle half; "outside" means beyond every reference.

## House rules (fixed numbers; a failure here is a Blocker)

| Rule | 390 | 768 | 1440 |
|---|---|---|---|
| At most three faces (canon: two serifs and one sans) | pass (2) | pass (2) | pass (2) |
| Nothing below 11px | pass (11) | pass (11) | pass (11) |
| No prose line over 80 characters (DESIGN.md measure 62ch) | pass (45) | pass (45) | pass (45) |
| No shadows | pass (0) | pass (0) | pass (0) |
| No bordered-card grammar | pass (0) | pass (0) | pass (0) |
| No pills | pass (0) | pass (0) | pass (0) |
| No radius on controls | pass (0) | pass (0) | pass (0) |
| Controls at least 44px (WCAG 2.5.5 enhanced; house .btn 48) | pass (0) | pass (0) | pass (0) |
| Every text color passes AA on its ground | pass (0) | pass (0) | pass (0) |
| No exclamation points (canon voice 9) | pass (0) | pass (0) | pass (0) |
| No em dashes (canon voice 9) | pass (0) | pass (0) | pass (0) |
| One accent at most in text | pass (none) | pass (none) | pass (none) |

## Against the houses (the bands; outside is a Should, edge is a note)

| Measure | Width | Ours | Houses min | Middle half | Max | Read |
|---|---|---|---|---|---|---|
| H1 size (px) | 390 | 44 | 16 | 16 to 18 | 32 | **outside** |
| H1 size (px) | 768 | 68 | 16 | 18 to 32 | 32 | **outside** |
| H1 size (px) | 1440 | 76 | 18 | 20 to 38 | 40 | **outside** |
| Largest type in the first viewport (px) | 390 | 44 | 12 | 18 to 32 | 44 | edge |
| Largest type in the first viewport (px) | 768 | 68 | 12 | 18 to 34 | 68 | edge |
| Largest type in the first viewport (px) | 1440 | 76 | 12 | 20 to 40 | 76 | edge |
| Body size, median of prose (px) | 390 | 18 | 12 | 15 to 18 | 20 | inside |
| Body size, median of prose (px) | 768 | 18 | 12 | 15 to 18.1 | 32 | inside |
| Body size, median of prose (px) | 1440 | 18 | 12 | 16 to 18.6 | 38 | inside |
| Body leading (x size) | 390 | 1.6 | 1.2 | 1.25 to 1.6 | 1.8 | inside |
| Body leading (x size) | 768 | 1.6 | 1.2 | 1.25 to 1.6 | 1.8 | inside |
| Body leading (x size) | 1440 | 1.6 | 1.2 | 1.25 to 1.6 | 1.9 | inside |
| Measure, median characters per line | 390 | 36 | 27 | 36 to 39.5 | 45 | inside |
| Measure, median characters per line | 768 | 45 | 26 | 39.5 to 63.5 | 82 | inside |
| Measure, median characters per line | 1440 | 36 | 40 | 49 to 58.5 | 86 | **outside** |
| Measure, longest line (chars) | 390 | 45 | 27 | 40.5 to 47 | 60 | inside |
| Measure, longest line (chars) | 768 | 45 | 35 | 46 to 78.5 | 90 | edge |
| Measure, longest line (chars) | 1440 | 45 | 40 | 52.5 to 66.5 | 110 | edge |
| Typefaces in use | 390 | 2 | 1 | 1 to 2 | 3 | inside |
| Typefaces in use | 768 | 2 | 1 | 1 to 2 | 3 | inside |
| Typefaces in use | 1440 | 2 | 1 | 1 to 2 | 3 | inside |
| Distinct type sizes | 390 | 8 | 1 | 4.25 to 7.75 | 12 | edge |
| Distinct type sizes | 768 | 9 | 1 | 4 to 7.75 | 11 | edge |
| Distinct type sizes | 1440 | 9 | 2 | 4 to 8.75 | 11 | edge |
| Smallest type (px) | 390 | 11 | 8.9 | 10 to 12 | 13.2 | inside |
| Smallest type (px) | 768 | 11 | 8.9 | 10 to 12 | 13.2 | inside |
| Smallest type (px) | 1440 | 11 | 9 | 10 to 12 | 14 | inside |
| Share of text blocks in caps | 390 | 0.09 | 0 | 0.07 to 0.59 | 0.96 | inside |
| Share of text blocks in caps | 768 | 0.09 | 0 | 0.07 to 0.59 | 0.97 | inside |
| Share of text blocks in caps | 1440 | 0.09 | 0 | 0.21 to 0.59 | 0.97 | edge |
| Caps tracking (em) | 390 | 0.1 | 0 | 0 to 0.1 | 0.3 | inside |
| Caps tracking (em) | 768 | 0.1 | 0 | 0 to 0.1 | 0.3 | inside |
| Caps tracking (em) | 1440 | 0.1 | 0 | 0 to 0.1 | 0.3 | inside |
| Words in the first viewport | 390 | 36 | 0 | 11.75 to 35.75 | 79 | edge |
| Words in the first viewport | 768 | 22 | 0 | 11.25 to 38.75 | 198 | inside |
| Words in the first viewport | 1440 | 20 | 0 | 13.25 to 44 | 282 | inside |
| Elements in the first viewport | 390 | 7 | 0 | 6 to 20.5 | 29 | inside |
| Elements in the first viewport | 768 | 5 | 0 | 5.25 to 22.5 | 78 | edge |
| Elements in the first viewport | 1440 | 4 | 0 | 7.75 to 20.75 | 27 | edge |
| Image share of the first viewport | 390 | 0.58 | 0 | 0.63 to 1 | 1 | edge |
| Image share of the first viewport | 768 | 0.78 | 0 | 0.43 to 1 | 1 | inside |
| Image share of the first viewport | 1440 | 0.78 | 0 | 0.43 to 0.95 | 1 | inside |
| Typical gap between blocks (px) | 390 | 32 | 14 | 20 to 31 | 60 | edge |
| Typical gap between blocks (px) | 768 | 41 | 12 | 24 to 37 | 60 | edge |
| Typical gap between blocks (px) | 1440 | 41 | 14 | 30 to 64 | 140 | inside |
| Section gap (share of viewport height) | 390 | 0.08 | 0.02 | 0.09 to 0.16 | 0.8 | edge |
| Section gap (share of viewport height) | 768 | 0.12 | 0.01 | 0.08 to 0.17 | 0.68 | inside |
| Section gap (share of viewport height) | 1440 | 0.15 | 0.07 | 0.11 to 0.25 | 0.77 | inside |
| Distinct left edges (alignment axes) | 390 | 3 | 1 | 7.5 to 22.5 | 80 | edge |
| Distinct left edges (alignment axes) | 768 | 5 | 1 | 8 to 29.25 | 74 | edge |
| Distinct left edges (alignment axes) | 1440 | 7 | 1 | 8.5 to 29.25 | 84 | edge |
| Large images on the page | 390 | 2 | 0 | 6 to 33 | 90 | edge |
| Large images on the page | 768 | 12 | 0 | 6 to 33 | 80 | inside |
| Large images on the page | 1440 | 12 | 5 | 6.75 to 31.5 | 93 | inside |
| Boxed containers (4-side borders) | 390 | 0 | 0 | 0 to 0 | 9 | inside |
| Boxed containers (4-side borders) | 768 | 0 | 0 | 0 to 0 | 9 | inside |
| Boxed containers (4-side borders) | 1440 | 0 | 0 | 0 to 0 | 15 | inside |
| Rounded elements | 390 | 0 | 0 | 0 to 4 | 64 | inside |
| Rounded elements | 768 | 0 | 0 | 0 to 4 | 69 | inside |
| Rounded elements | 1440 | 0 | 0 | 0 to 4 | 72 | inside |
| Elements with shadows | 390 | 0 | 0 | 0 to 1 | 4 | inside |
| Elements with shadows | 768 | 0 | 0 | 0 to 1 | 4 | inside |
| Elements with shadows | 1440 | 0 | 0 | 0 to 1 | 4 | inside |
| Distinct text colors | 390 | 4 | 1 | 2 to 5 | 9 | inside |
| Distinct text colors | 768 | 4 | 1 | 2 to 5 | 9 | inside |
| Distinct text colors | 1440 | 4 | 1 | 2 to 5 | 9 | inside |
| Largest control radius (px) | 390 | 0 | 0 | 0 to 50 | 9999 | inside |
| Largest control radius (px) | 768 | 0 | 0 | 0 to 50 | 9999 | inside |
| Largest control radius (px) | 1440 | 0 | 0 | 0 to 40 | 9999 | inside |
| Controls under 44px tall | 390 | 0 | 0 | 0 to 2.75 | 13 | inside |
| Controls under 44px tall | 768 | 0 | 0 | 0 to 2.75 | 12 | inside |
| Controls under 44px tall | 1440 | 0 | 0 | 1 to 2.75 | 12 | edge |
| Visible header links | 390 | 3 | 0 | 1 to 3.75 | 4 | inside |
| Visible header links | 768 | 6 | 0 | 1 to 4 | 14 | edge |
| Visible header links | 1440 | 14 | 0 | 4 to 9.75 | 14 | edge |
| Words on the page (body) | 390 | 190 | 3 | 127.75 to 273.5 | 1559 | inside |
| Words on the page (body) | 768 | 190 | 3 | 127.75 to 335.5 | 1530 | inside |
| Words on the page (body) | 1440 | 190 | 4 | 127.75 to 337 | 1589 | inside |
| Sentence length, median words | 390 | 12 | 3 | 18.25 to 38 | 227 | edge |
| Sentence length, median words | 768 | 12 | 3 | 18.25 to 38 | 338 | edge |
| Sentence length, median words | 1440 | 12 | 4 | 18 to 37.25 | 338 | edge |
| Page length (viewports) | 390 | 5.5 | 1 | 1 to 6.2 | 18.6 | inside |
| Page length (viewports) | 768 | 4.6 | 1 | 1 to 6.2 | 16.3 | inside |
| Page length (viewports) | 1440 | 4.8 | 1 | 1 to 6.5 | 17.6 | inside |

## Facts for the reviewer (1440)

- Typefaces by share of characters: Public Sans Variable 53%, Source Serif 4 Variable 47%.
- Type sizes by share: 13px 36%, 18px 18%, 24px 16%, 16px 10%, 17px 8%, 11px 6%, 36px 4%, 56px 2%, 15px 1%, 76px 1%.
- Ground #f6f5f2 (hue 45, saturation 0.18, lightness 0.96); largest backgrounds #16213a 84%, #f6f5f2 16%, #121212 1%.
- Control heights: 44, 48, 50px; caps on 91% of controls.
- Image ratios, first twelve: 2.05, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.33.
- Price "From $1,900" at 16px, top 957px.
- Text blocks on photographs: 0.

Screenshots: docs/briefs/council/shots/line-americana__390.png, __768.png, __1440.png (first viewport).

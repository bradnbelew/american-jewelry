# Measured: experience-services

http://127.0.0.1:3032/services  
Measured 2026-10-14T04:58 against 14 reference pages (all band). Bands are the reference range: min, middle half (p25 to p75), max. "Edge" means inside the range but outside the middle half; "outside" means beyond every reference.

## House rules (fixed numbers; a failure here is a Blocker)

| Rule | 390 | 768 | 1440 |
|---|---|---|---|
| At most three faces (canon: two serifs and one sans) | pass (2) | pass (2) | pass (2) |
| Nothing below 11px | pass (11) | pass (11) | pass (11) |
| No prose line over 80 characters (DESIGN.md measure 62ch) | pass (54) | pass (54) | pass (55) |
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
| H1 size (px) | 768 | 64 | 16 | 18 to 32 | 32 | **outside** |
| H1 size (px) | 1440 | 64 | 18 | 20 to 38 | 40 | **outside** |
| Largest type in the first viewport (px) | 390 | 44 | 12 | 18 to 32 | 44 | edge |
| Largest type in the first viewport (px) | 768 | 64 | 12 | 18 to 34 | 68 | edge |
| Largest type in the first viewport (px) | 1440 | 64 | 12 | 20 to 40 | 76 | edge |
| Body size, median of prose (px) | 390 | 15 | 12 | 15 to 18 | 20 | inside |
| Body size, median of prose (px) | 768 | 15 | 12 | 15 to 18.1 | 32 | inside |
| Body size, median of prose (px) | 1440 | 15 | 12 | 16 to 18.6 | 38 | edge |
| Body leading (x size) | 390 | 1.6 | 1.2 | 1.25 to 1.6 | 1.8 | inside |
| Body leading (x size) | 768 | 1.6 | 1.2 | 1.25 to 1.6 | 1.8 | inside |
| Body leading (x size) | 1440 | 1.6 | 1.2 | 1.25 to 1.6 | 1.9 | inside |
| Measure, median characters per line | 390 | 46 | 27 | 36 to 39.5 | 45 | **outside** |
| Measure, median characters per line | 768 | 47 | 26 | 39.5 to 63.5 | 82 | inside |
| Measure, median characters per line | 1440 | 51 | 40 | 49 to 58.5 | 86 | inside |
| Measure, longest line (chars) | 390 | 54 | 27 | 40.5 to 47 | 60 | edge |
| Measure, longest line (chars) | 768 | 54 | 35 | 46 to 78.5 | 90 | inside |
| Measure, longest line (chars) | 1440 | 55 | 40 | 52.5 to 66.5 | 110 | inside |
| Typefaces in use | 390 | 2 | 1 | 1 to 2 | 3 | inside |
| Typefaces in use | 768 | 2 | 1 | 1 to 2 | 3 | inside |
| Typefaces in use | 1440 | 2 | 1 | 1 to 2 | 3 | inside |
| Distinct type sizes | 390 | 6 | 1 | 4.25 to 7.75 | 12 | inside |
| Distinct type sizes | 768 | 6 | 1 | 4 to 7.75 | 11 | inside |
| Distinct type sizes | 1440 | 6 | 2 | 4 to 8.75 | 11 | inside |
| Smallest type (px) | 390 | 11 | 8.9 | 10 to 12 | 13.2 | inside |
| Smallest type (px) | 768 | 11 | 8.9 | 10 to 12 | 13.2 | inside |
| Smallest type (px) | 1440 | 11 | 9 | 10 to 12 | 14 | inside |
| Share of text blocks in caps | 390 | 0.04 | 0 | 0.07 to 0.59 | 0.96 | edge |
| Share of text blocks in caps | 768 | 0.04 | 0 | 0.07 to 0.59 | 0.97 | edge |
| Share of text blocks in caps | 1440 | 0.04 | 0 | 0.21 to 0.59 | 0.97 | edge |
| Caps tracking (em) | 390 | 0.1 | 0 | 0 to 0.1 | 0.3 | inside |
| Caps tracking (em) | 768 | 0.1 | 0 | 0 to 0.1 | 0.3 | inside |
| Caps tracking (em) | 1440 | 0.1 | 0 | 0 to 0.1 | 0.3 | inside |
| Words in the first viewport | 390 | 17 | 0 | 11.75 to 35.75 | 79 | inside |
| Words in the first viewport | 768 | 103 | 0 | 11.25 to 38.75 | 198 | edge |
| Words in the first viewport | 1440 | 42 | 0 | 13.25 to 44 | 282 | inside |
| Elements in the first viewport | 390 | 6 | 0 | 6 to 20.5 | 29 | inside |
| Elements in the first viewport | 768 | 17 | 0 | 5.25 to 22.5 | 78 | inside |
| Elements in the first viewport | 1440 | 8 | 0 | 7.75 to 20.75 | 27 | inside |
| Image share of the first viewport | 390 | 0.47 | 0 | 0.63 to 1 | 1 | edge |
| Image share of the first viewport | 768 | 0.14 | 0 | 0.43 to 1 | 1 | edge |
| Image share of the first viewport | 1440 | 0.33 | 0 | 0.43 to 0.95 | 1 | edge |
| Typical gap between blocks (px) | 390 | 24 | 14 | 20 to 31 | 60 | inside |
| Typical gap between blocks (px) | 768 | 56 | 12 | 24 to 37 | 60 | edge |
| Typical gap between blocks (px) | 1440 | 56 | 14 | 30 to 64 | 140 | inside |
| Section gap (share of viewport height) | 390 | 0.07 | 0.02 | 0.09 to 0.16 | 0.8 | edge |
| Section gap (share of viewport height) | 768 | 0.08 | 0.01 | 0.08 to 0.17 | 0.68 | inside |
| Section gap (share of viewport height) | 1440 | 0.09 | 0.07 | 0.11 to 0.25 | 0.77 | edge |
| Distinct left edges (alignment axes) | 390 | 3 | 1 | 7.5 to 22.5 | 80 | edge |
| Distinct left edges (alignment axes) | 768 | 6 | 1 | 8 to 29.25 | 74 | edge |
| Distinct left edges (alignment axes) | 1440 | 6 | 1 | 8.5 to 29.25 | 84 | edge |
| Large images on the page | 390 | 1 | 0 | 6 to 33 | 90 | edge |
| Large images on the page | 768 | 1 | 0 | 6 to 33 | 80 | edge |
| Large images on the page | 1440 | 1 | 5 | 6.75 to 31.5 | 93 | **outside** |
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
| Visible header links | 768 | 4 | 0 | 1 to 4 | 14 | inside |
| Visible header links | 1440 | 11 | 0 | 4 to 9.75 | 14 | edge |
| Words on the page (body) | 390 | 262 | 3 | 127.75 to 273.5 | 1559 | inside |
| Words on the page (body) | 768 | 262 | 3 | 127.75 to 335.5 | 1530 | inside |
| Words on the page (body) | 1440 | 262 | 4 | 127.75 to 337 | 1589 | inside |
| Sentence length, median words | 390 | 7 | 3 | 18.25 to 38 | 227 | edge |
| Sentence length, median words | 768 | 7 | 3 | 18.25 to 38 | 338 | edge |
| Sentence length, median words | 1440 | 7 | 4 | 18 to 37.25 | 338 | edge |
| Page length (viewports) | 390 | 4.7 | 1 | 1 to 6.2 | 18.6 | inside |
| Page length (viewports) | 768 | 2.7 | 1 | 1 to 6.2 | 16.3 | inside |
| Page length (viewports) | 1440 | 3.3 | 1 | 1 to 6.5 | 17.6 | inside |

## Facts for the reviewer (1440)

- Typefaces by share of characters: Source Serif 4 Variable 64%, Public Sans Variable 36%.
- Type sizes by share: 15px 53%, 13px 28%, 32px 7%, 16px 5%, 18px 4%, 11px 2%, 28px 1%, 64px 1%.
- Ground #f6f5f2 (hue 45, saturation 0.18, lightness 0.96); largest backgrounds #f6f5f2 96%, #121212 4%.
- Control heights: 44, 48, 50px; caps on 88% of controls.
- Image ratios, first twelve: 1.33.
- Price "from $39" at 16px, top 1621px.
- Text blocks on photographs: 0.

Screenshots: docs/briefs/council/shots/experience-services__390.png, __768.png, __1440.png (first viewport).

# Measured: royal-gallery

http://127.0.0.1:3033/royal-american  
Measured 2026-10-14T13:50 against 15 reference pages (all band). Bands are the reference range: min, middle half (p25 to p75), max. "Edge" means inside the range but outside the middle half; "outside" means beyond every reference.

## House rules (fixed numbers; a failure here is a Blocker)

| Rule | 390 | 768 | 1440 |
|---|---|---|---|
| At most three faces (canon: two serifs and one sans) | pass (2) | pass (2) | pass (2) |
| Nothing below 11px | pass (12) | pass (13) | pass (13) |
| No prose line over 80 characters (DESIGN.md measure 62ch) | pass (null) | pass (null) | pass (null) |
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
| H1 size (px) | 390 | 40 | 16 | 16 to 18 | 32 | **outside** |
| H1 size (px) | 768 | 48 | 16 | 18 to 32 | 32 | **outside** |
| H1 size (px) | 1440 | 56 | 18 | 20 to 38 | 40 | **outside** |
| Largest type in the first viewport (px) | 390 | 40 | 12 | 18 to 31.5 | 44 | edge |
| Largest type in the first viewport (px) | 768 | 48 | 12 | 18 to 34.75 | 68 | edge |
| Largest type in the first viewport (px) | 1440 | 56 | 12 | 20 to 43.75 | 76 | edge |
| Typefaces in use | 390 | 2 | 1 | 1 to 2.5 | 3 | inside |
| Typefaces in use | 768 | 2 | 1 | 1 to 2.5 | 3 | inside |
| Typefaces in use | 1440 | 2 | 1 | 1 to 2.5 | 3 | inside |
| Distinct type sizes | 390 | 8 | 1 | 4.5 to 7.5 | 12 | edge |
| Distinct type sizes | 768 | 7 | 1 | 4 to 7.5 | 11 | inside |
| Distinct type sizes | 1440 | 7 | 2 | 4 to 8.5 | 11 | inside |
| Smallest type (px) | 390 | 12 | 8.9 | 10 to 12 | 13.2 | inside |
| Smallest type (px) | 768 | 13 | 8.9 | 10 to 12 | 13.2 | edge |
| Smallest type (px) | 1440 | 13 | 9 | 10.25 to 12 | 14 | edge |
| Share of text blocks in caps | 390 | 0 | 0 | 0.07 to 0.56 | 0.96 | edge |
| Share of text blocks in caps | 768 | 0 | 0 | 0.07 to 0.56 | 0.97 | edge |
| Share of text blocks in caps | 1440 | 0 | 0 | 0.12 to 0.57 | 0.97 | edge |
| Words in the first viewport | 390 | 15 | 0 | 12.5 to 41 | 79 | inside |
| Words in the first viewport | 768 | 15 | 0 | 11.5 to 49.5 | 198 | inside |
| Words in the first viewport | 1440 | 10 | 0 | 13.5 to 51.5 | 282 | edge |
| Elements in the first viewport | 390 | 8 | 0 | 5.5 to 20 | 29 | inside |
| Elements in the first viewport | 768 | 8 | 0 | 5.5 to 22 | 78 | inside |
| Elements in the first viewport | 1440 | 6 | 0 | 7 to 19.5 | 27 | edge |
| Image share of the first viewport | 390 | 0.37 | 0 | 0.52 to 1 | 1 | edge |
| Image share of the first viewport | 768 | 0.32 | 0 | 0.35 to 1 | 1 | edge |
| Image share of the first viewport | 1440 | 0.49 | 0 | 0.42 to 0.95 | 1 | inside |
| Typical gap between blocks (px) | 390 | 32 | 14 | 21 to 35.5 | 60 | inside |
| Typical gap between blocks (px) | 768 | 24 | 12 | 25.25 to 39.25 | 70 | edge |
| Typical gap between blocks (px) | 1440 | 40 | 14 | 30.5 to 64 | 140 | inside |
| Section gap (share of viewport height) | 390 | 0.49 | 0.02 | 0.09 to 0.16 | 0.8 | edge |
| Section gap (share of viewport height) | 768 | 0.09 | 0.01 | 0.08 to 0.17 | 0.68 | inside |
| Section gap (share of viewport height) | 1440 | 0.16 | 0.07 | 0.12 to 0.24 | 0.77 | inside |
| Distinct left edges (alignment axes) | 390 | 6 | 1 | 8 to 22 | 80 | edge |
| Distinct left edges (alignment axes) | 768 | 7 | 1 | 8 to 27.5 | 74 | edge |
| Distinct left edges (alignment axes) | 1440 | 8 | 1 | 9 to 27.5 | 84 | edge |
| Large images on the page | 390 | 1 | 0 | 7 to 38 | 90 | edge |
| Large images on the page | 768 | 1 | 0 | 7 to 37.5 | 80 | edge |
| Large images on the page | 1440 | 1 | 5 | 7.5 to 36.5 | 93 | **outside** |
| Boxed containers (4-side borders) | 390 | 0 | 0 | 0 to 0 | 9 | inside |
| Boxed containers (4-side borders) | 768 | 0 | 0 | 0 to 0 | 9 | inside |
| Boxed containers (4-side borders) | 1440 | 0 | 0 | 0 to 0 | 15 | inside |
| Rounded elements | 390 | 0 | 0 | 0 to 4 | 64 | inside |
| Rounded elements | 768 | 0 | 0 | 0 to 4 | 69 | inside |
| Rounded elements | 1440 | 0 | 0 | 0 to 4 | 72 | inside |
| Elements with shadows | 390 | 0 | 0 | 0 to 1 | 4 | inside |
| Elements with shadows | 768 | 0 | 0 | 0 to 1 | 4 | inside |
| Elements with shadows | 1440 | 0 | 0 | 0 to 1 | 4 | inside |
| Distinct text colors | 390 | 3 | 1 | 2 to 5 | 9 | inside |
| Distinct text colors | 768 | 3 | 1 | 2 to 5 | 9 | inside |
| Distinct text colors | 1440 | 3 | 1 | 2 to 5 | 9 | inside |
| Largest control radius (px) | 390 | 0 | 0 | 0 to 50 | 9999 | inside |
| Largest control radius (px) | 768 | 0 | 0 | 0 to 50 | 9999 | inside |
| Largest control radius (px) | 1440 | 0 | 0 | 0 to 30 | 9999 | inside |
| Controls under 44px tall | 390 | 0 | 0 | 0 to 2.5 | 13 | inside |
| Controls under 44px tall | 768 | 0 | 0 | 0 to 3 | 12 | inside |
| Controls under 44px tall | 1440 | 0 | 0 | 1 to 3.5 | 12 | edge |
| Visible header links | 390 | 6 | 0 | 1 to 3.5 | 4 | **outside** |
| Visible header links | 768 | 7 | 0 | 1 to 4 | 14 | edge |
| Visible header links | 1440 | 14 | 0 | 4 to 9.5 | 14 | edge |
| Words on the page (body) | 390 | 53 | 3 | 148.5 to 376.5 | 1559 | edge |
| Words on the page (body) | 768 | 53 | 3 | 148.5 to 403.5 | 1530 | edge |
| Words on the page (body) | 1440 | 53 | 4 | 148.5 to 403.5 | 1589 | edge |
| Sentence length, median words | 390 | 13 | 3 | 17.5 to 37 | 227 | edge |
| Sentence length, median words | 768 | 13 | 3 | 17.5 to 37 | 338 | edge |
| Sentence length, median words | 1440 | 13 | 4 | 17.5 to 35.5 | 338 | edge |
| Page length (viewports) | 390 | 3.4 | 1 | 1 to 6.05 | 18.6 | inside |
| Page length (viewports) | 768 | 2.2 | 1 | 1 to 6.2 | 16.3 | inside |
| Page length (viewports) | 1440 | 3.2 | 1 | 1 to 6.4 | 17.6 | inside |

## Facts for the reviewer (1440)

- Typefaces by share of characters: Public Sans Variable 79%, Source Serif 4 Variable 21%.
- Type sizes by share: 13px 28%, 14px 28%, 16px 15%, 28px 12%, 15px 8%, 40px 5%, 56px 4%.
- Ground #f6f5f2 (hue 45, saturation 0.18, lightness 0.96); largest backgrounds #16213a 88%, #f6f5f2 12%.
- Control heights: 44, 50px; caps on 86% of controls.
- Image ratios, first twelve: 2.
- Text blocks on photographs: 0.

Screenshots: docs/briefs/council/shots/royal-gallery__390.png, __768.png, __1440.png (first viewport).

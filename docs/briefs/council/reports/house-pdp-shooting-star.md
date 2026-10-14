# Measured: house-pdp-shooting-star

http://127.0.0.1:3032/pieces/shooting-star-ring
Measured 2026-10-14T04:23 against 14 reference pages (pdp band). Bands are the reference range: min, middle half (p25 to p75), max. "Edge" means inside the range but outside the middle half; "outside" means beyond every reference.

## House rules (fixed numbers; a failure here is a Blocker)

| Rule | 390 | 768 | 1440 |
|---|---|---|---|
| At most three faces (canon: two serifs and one sans) | pass (2) | pass (2) | pass (2) |
| Nothing below 11px | pass (11) | pass (11) | pass (11) |
| No prose line over 80 characters (DESIGN.md measure 62ch) | pass (46) | pass (55) | pass (55) |
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
| H1 size (px) | 390 | 31 | 16 | 17 to 18 | 18 | **outside** |
| H1 size (px) | 768 | 38 | 16 | 17 to 18 | 18 | **outside** |
| H1 size (px) | 1440 | 38 | 18 | 19 to 21 | 22 | **outside** |
| Largest type in the first viewport (px) | 390 | 31 | 16 | 18 to 20 | 22 | **outside** |
| Largest type in the first viewport (px) | 768 | 24 | 16 | 18 to 18 | 22.4 | **outside** |
| Largest type in the first viewport (px) | 1440 | 38 | 18 | 20 to 22 | 24.5 | **outside** |
| Body size, median of prose (px) | 390 | 16 | 16 | 16 to 16.5 | 18 | inside |
| Body size, median of prose (px) | 768 | 16 | 16 | 16 to 16.55 | 18.2 | inside |
| Body size, median of prose (px) | 1440 | 16 | 16 | 16 to 16.8 | 19.2 | inside |
| Body leading (x size) | 390 | 1.6 | 1.3 | 1.45 to 1.52 | 1.6 | edge |
| Body leading (x size) | 768 | 1.6 | 1.3 | 1.45 to 1.52 | 1.6 | edge |
| Body leading (x size) | 1440 | 1.6 | 1.3 | 1.45 to 1.52 | 1.6 | edge |
| Measure, median characters per line | 390 | 46 | 34 | 36.25 to 41.25 | 45 | **outside** |
| Measure, median characters per line | 768 | 55 | 26 | 32 to 66.25 | 82 | inside |
| Measure, median characters per line | 1440 | 46 | 40 | 44.5 to 51 | 57 | inside |
| Measure, longest line (chars) | 390 | 46 | 40 | 42.25 to 46 | 49 | inside |
| Measure, longest line (chars) | 768 | 55 | 35 | 44.75 to 67 | 85 | inside |
| Measure, longest line (chars) | 1440 | 55 | 40 | 48.25 to 54.25 | 61 | edge |
| Typefaces in use | 390 | 2 | 1 | 2 to 2 | 3 | inside |
| Typefaces in use | 768 | 2 | 1 | 2 to 2 | 3 | inside |
| Typefaces in use | 1440 | 2 | 1 | 2 to 2 | 3 | inside |
| Distinct type sizes | 390 | 8 | 3 | 4 to 8 | 9 | inside |
| Distinct type sizes | 768 | 9 | 3 | 4 to 8 | 9 | edge |
| Distinct type sizes | 1440 | 9 | 3 | 4 to 8 | 9 | edge |
| Smallest type (px) | 390 | 11 | 8.9 | 8.97 to 11.25 | 12 | inside |
| Smallest type (px) | 768 | 11 | 8.9 | 9.72 to 11.25 | 12 | inside |
| Smallest type (px) | 1440 | 11 | 10 | 10 to 12 | 12 | inside |
| Share of text blocks in caps | 390 | 0.12 | 0 | 0.02 to 0.52 | 0.61 | inside |
| Share of text blocks in caps | 768 | 0.12 | 0 | 0.02 to 0.52 | 0.61 | inside |
| Share of text blocks in caps | 1440 | 0.11 | 0 | 0.02 to 0.52 | 0.62 | inside |
| Caps tracking (em) | 390 | 0.1 | 0 | 0 to 0.03 | 0.1 | edge |
| Caps tracking (em) | 768 | 0.1 | 0 | 0 to 0.03 | 0.1 | edge |
| Caps tracking (em) | 1440 | 0.1 | 0 | 0 to 0.03 | 0.1 | edge |
| Words in the first viewport | 390 | 59 | 11 | 29 to 44 | 79 | edge |
| Words in the first viewport | 768 | 31 | 11 | 12 to 41 | 121 | inside |
| Words in the first viewport | 1440 | 66 | 38 | 41 to 121 | 282 | inside |
| Elements in the first viewport | 390 | 18 | 5 | 10 to 22 | 26 | inside |
| Elements in the first viewport | 768 | 15 | 4 | 6 to 23 | 31 | inside |
| Elements in the first viewport | 1440 | 29 | 15 | 15 to 23 | 27 | **outside** |
| Image share of the first viewport | 390 | 0.35 | 0.46 | 0.93 to 1 | 1 | **outside** |
| Image share of the first viewport | 768 | 0.6 | 0.4 | 0.75 to 1 | 1 | edge |
| Image share of the first viewport | 1440 | 0.4 | 0.34 | 0.41 to 0.52 | 1 | edge |
| Typical gap between blocks (px) | 390 | 24 | 14 | 24 to 29 | 31 | inside |
| Typical gap between blocks (px) | 768 | 24 | 14 | 22 to 31 | 32 | inside |
| Typical gap between blocks (px) | 1440 | 24 | 14 | 24 to 79 | 140 | inside |
| Section gap (share of viewport height) | 390 | 0.11 | 0.02 | 0.09 to 0.33 | 0.8 | inside |
| Section gap (share of viewport height) | 768 | 0.11 | 0.01 | 0.08 to 0.26 | 0.68 | inside |
| Section gap (share of viewport height) | 1440 | 0.3 | 0.07 | 0.16 to 0.29 | 0.77 | edge |
| Distinct left edges (alignment axes) | 390 | 10 | 3 | 9 to 15 | 23 | inside |
| Distinct left edges (alignment axes) | 768 | 15 | 4 | 8 to 22 | 22 | inside |
| Distinct left edges (alignment axes) | 1440 | 17 | 5 | 10 to 22 | 24 | inside |
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
| Visible header links | 390 | 5 | 1 | 1 to 4 | 4 | **outside** |
| Visible header links | 768 | 6 | 1 | 1 to 5 | 14 | edge |
| Visible header links | 1440 | 13 | 4 | 6 to 10 | 14 | edge |
| Words on the page (body) | 390 | 252 | 72 | 83 to 676 | 723 | inside |
| Words on the page (body) | 768 | 252 | 72 | 83 to 676 | 726 | inside |
| Words on the page (body) | 1440 | 248 | 78 | 83 to 653 | 726 | inside |
| Sentence length, median words | 390 | 10 | 19 | 23 to 35 | 53 | **outside** |
| Sentence length, median words | 768 | 10 | 19 | 23 to 35 | 53 | **outside** |
| Sentence length, median words | 1440 | 10 | 18 | 23 to 32 | 59 | **outside** |
| Page length (viewports) | 390 | 5.7 | 1 | 1.97 to 8.85 | 18.6 | inside |
| Page length (viewports) | 768 | 4.8 | 1 | 2.05 to 8.05 | 16.3 | inside |
| Page length (viewports) | 1440 | 4.1 | 1 | 1.9 to 9.28 | 17.6 | inside |

## Facts for the reviewer (1440)

- Typefaces by share of characters: Public Sans Variable 54%, Source Serif 4 Variable 46%.
- Type sizes by share: 13px 37%, 16px 30%, 11px 9%, 48px 9%, 20px 6%, 15px 4%, 14px 3%, 36px 1%, 38px 1%, 28px 0%.
- Ground #f6f5f2 (hue 45, saturation 0.18, lightness 0.96); largest backgrounds #f6f5f2 74%, #ffffff 19%, #121212 7%.
- Control heights: 44, 48, 50, 52, 64px; caps on 48% of controls.
- Image ratios, first twelve: 1.
- Price "$1,900" at 28px, top 407px.
- Action "REQUEST A VIEWING" 48px tall, top 533px.
- Text blocks on photographs: 0.

Screenshots: docs/briefs/council/shots/house-pdp-shooting-star__390.png, __768.png, __1440.png (first viewport).

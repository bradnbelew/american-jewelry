# Seat P: product and flow

The seat asks: can a customer understand the piece, choose it and act, without hunting, waiting or being hurried?

| ID | Rule | Check | Severity | Source |
|---|---|---|---|---|
| P1 | On a product page, the price and the primary action are in the first viewport at 390x844 and 1440x900. | measured: commerce row in the house table | Blocker | rework brief §3 C; NN/g 2018 (57% of viewing time above the fold) |
| P2 | One subject in the first second at both widths: the piece. Name the element the eye lands on. | judged | Blocker if two compete | critic rubric 1; research/18 §A (Lindgaard 2006: 50 ms judgment) |
| P3 | Options are visible choices (tiles, swatches), not drop-downs, when there are six values or fewer. | judged | Should | Baymard 2026 (57% of sites hide size options in drop-downs) |
| P4 | Nothing shifts when an option changes: fixed control heights, reserved space for price, stone line and messages. | judged from code (`min-h`, fixed heights) and by switching options | Blocker | canon Never do ("anything that shifts when clicked"); critic finding C7 |
| P5 | Every view is reachable without hidden truncation; on desktop a vertical gallery replaces thumbnails. | judged | Should | Baymard (40% of sites truncate thumbnails without a cue; truncation caused abandonments) |
| P6 | Keeping a piece is one tap from the product page and visible in the header. | judged | Should | Baymard 2026 (89% of sites make save hard; 21% of shoppers rely on it); research/17 §8.2 |
| P7 | Every control is at least 44px tall on touch; inputs are 16px so phones do not zoom. | measured: `controls.under44`; judged inputs | Blocker | WCAG 2.2 2.5.5; Baymard 2021 luxury #15 (7 mm targets) |
| P8 | Made-to-order and sold-out states are written and buyable where the house can make it ("Made to order, about 4 weeks"). | judged | Should | Baymard 2021 luxury #11 (about 30% abandon on "Out of stock") |
| P9 | The desktop header shows the house's names, horizontally, with the current scope marked; no hidden menu on desktop. | measured: `nav.visibleLinks`; judged scope marker | Should | Brun et al. 2013 (horizontal navigation); research/18 §A (Pernice & Budiu 2016); Baymard 2021 luxury #14 |
| P10 | The builder is "Build on {design}", never "Design your own" or "Customize"; the designer stays the author. | judged + lint | Blocker | Fuchs, Prandelli, Schreier & Dahl (2013), *Journal of Marketing* 77(5); research/18 §B |
| P11 | The footer links shipping, returns, warranty and both addresses. | judged | Should | Baymard 2021 luxury #2 |
| P12 | No urgency, counters, upsell rows, review stars or financing banners anywhere in the flow. | judged | Blocker | canon Never do; research/18 §B (Kapferer, Han et al.) |
| P13 | The bag says what arrives and when, the tax line once, and hands off to checkout without a fall in type or color. | judged | Should | research/17 §8.4–8.5 |
| P14 | The 3D view is a view behind a poster, never the hero, and it loads after the photograph. | judged | Should | research/14 §4; rework brief §3 C |

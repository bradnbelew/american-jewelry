# Seat W: words

The seat asks: does every sentence say one exact thing once, in the house's grammar, with nothing invented?

| ID | Rule | Check | Severity | Source |
|---|---|---|---|---|
| W1 | The page sits inside its word budget: home 110–150, line 60–90, design 120–180, product 90 visible plus 160 folded, builder 60, store 80, House 250–350. | measured: `text.words` (body, unfolded content counts at its rendered state) | Should; over by half is a Blocker | canon voice 10 |
| W2 | Sentences run 8 to 14 words at the median; none over 30 (it becomes a table, an accordion or a journal entry). | measured: `text.sentenceP50`, `.sentenceP90` | Should | canon voice 2 and 4 |
| W3 | The house lint is at 0 errors on the page's files. | tool: `npm run lint:house` | Blocker | research/16 §5 |
| W4 | No exclamation points, no em dashes. | measured: `text.exclamations`, `text.emDashes` | Blocker | canon voice 9 |
| W5 | The first viewport carries at most seven distinct elements outside the header. | measured: `fold.elements` | Should | critic rubric 2; Brun et al. 2013 (substantial reduction of elements); NN/g 2018 (57% of attention is here, spend it on one subject) |
| W6 | Every sentence appears once on the site; one honesty line per page ("Price before sales tax."). | judged; grep the sentence across `app/` | Should | canon voice 5; critic finding (bridal sentence six times) |
| W7 | Links and buttons name the thing and its scope ("Every Shooting Star ring", "Build on Signal"); never "Shop now", "Explore", "Learn more". | judged; lint | Blocker for "Shop now" | canon voice 6; Baymard 2021 luxury #13 (link text must carry the full scope) |
| W8 | Man-made diamond grammar, the provenance line verbatim, no origin or handmade claims. | lint + judged | Blocker | canon Hard rules; research/04 |
| W9 | No invented facts: names, dates, counts, hours, staff, bench details, stone figures. Anything specific without a source in the briefs is a finding. | judged against `company/01-who-we-are.md` and the catalog | Blocker | canon |
| W10 | Returns and delivery are reachable from every product page and from the footer, in plain words. | judged | Should | Baymard 2021 luxury #2 and #3; Baymard 2026 (44% of sites do not link returns from the product page; 60% of shoppers look for it there) |
| W11 | A product page says when the piece arrives, near the action, as a time ("about 2 weeks"), not a process. | judged | Should | Baymard 2021 luxury #12 (delivery estimate near Add to Cart) |
| W12 | The object is the subject: the first sentence of a section is about the piece, the stone or the place, not about "we" or "you". | judged | Should | canon voice 1 and 3 |

# The council's rubrics

Five seats, one reviewer. Each rule has an ID, a **check** (`measured: <key>` means the number comes from `scripts/council/measure.mjs` and the reviewer copies the result; `judged` means the reviewer decides from the screenshots, the brief and the code), a default **severity**, and the **source** it rests on. The canon wins over every rule here; a rule that conflicts with the canon is a finding against the rule, logged in `docs/briefs/open-questions.md`.

| Seat | File | Covers |
|---|---|---|
| T | `type-and-space.md` | faces, sizes, leading, measure, caps, figures, rhythm, alignment |
| C | `color-and-image.md` | ground, accent, contrast, surfaces, photography, scale, honesty of images |
| W | `words.md` | budgets, sentence length, lexicon, CTAs, facts, policy reachability |
| P | `product-and-flow.md` | the product page, controls, states, navigation, the builder |
| D | `distinctiveness.md` | hide the name, distinctive assets, romance mechanics, AI tells |

## Severity

- **Blocker**: a canon rule, a house fixed number (the first table in every measured report), WCAG AA, or an invented fact. A page with one Blocker is not approved.
- **Should**: outside every reference house (the band's min to max) without a written reason, or a judged rule failed. Approved pages may carry Shoulds; each one is listed in the verdict with its fix.
- **Note**: at the edge of the band (inside min to max, outside the middle half). Recorded, not argued.

A measured number outside the band is not automatically wrong: the house may choose fewer words or more space than every reference on purpose. The reviewer accepts a departure only when the page brief or `decisions.md` says so in writing.

## Sources used across the seats

Primary sources read for these rubrics (2026-10-12):
- Baymard Institute, "15 UX Pitfalls in Luxury Retail E-Commerce" (2021; Chanel, Gucci, Louis Vuitton, Van Cleef & Arpels, TAG Heuer, Jimmy Choo, Bang & Olufsen): https://baymard.com/blog/2021-luxury-ecommerce-benchmark
- Baymard Institute, "The Current State of E-Commerce Product Page UX" (2026): https://baymard.com/blog/current-state-ecommerce-product-page-ux
- Baymard Institute, "In Scale" product images (42% of users judge size from images): https://baymard.com/blog/in-scale-product-images
- Baymard Institute, thumbnails and truncated galleries: https://baymard.com/blog/always-use-thumbnails-additional-images
- Brun, Kluge, Königsfeld, Fassnacht & Mitschke (2013), "Luxury web atmospherics: an examination of homepage design", *IJRDM* 41(11/12): 81 luxury homepages plus a lab experiment.
- Nielsen Norman Group, Fessenden (2018), "Scrolling and Attention": 57% of viewing time above the fold, 74% in the first two screenfuls.
- Butterick, *Practical Typography*, "Typography in ten minutes": web body 15–25px, leading 120–145%, 45–90 characters per line.
- WCAG 2.2: 1.4.3 contrast (4.5:1, 3:1 at 24px or 18.66px bold), 2.5.5 target size enhanced (44px), 2.5.8 minimum (24px).

From the research shelf (already in the repo, cited by section): research/15 §5–6, research/17 §1–2 and §8–9, research/18 §A–B, research/14 §5, research/10 (AI tells), research/16 §4.

Data: `docs/briefs/council/data/bands.json`, built from the reference houses in `references.json` by `node scripts/council/measure.mjs refs`.

# 19. The council's evidence: primary sources read, and what the houses measure

Purpose: the evidence behind the council rubrics (`docs/briefs/council/rubrics/`). Part 1 is reading: primary sources fetched and read on 2026-10-12, with the numbers they report and the rule each one backs. Part 2 is data: what the reference houses' pages measure, from `docs/briefs/council/data/bands.json`. Unlike research/15 and 18, nothing in Part 1 is quoted from memory; every line was read at its URL this session. Items still marked **[verify]** in research/18 are not repeated here.

Last updated: 2026-10-12.

---

## Part 1. Reading

### 1.1 Baymard Institute, "15 UX Pitfalls in Luxury Retail E-Commerce" (June 2021)

https://baymard.com/blog/2021-luxury-ecommerce-benchmark. Seven luxury sites benchmarked: Bang & Olufsen, Chanel, Gucci, Jimmy Choo, Louis Vuitton, TAG Heuer, Van Cleef & Arpels.

- Overall: almost all rate "Decent"; none "Good" or "Perfect" across desktop and mobile. (The broad e-commerce field: 83% "Mediocre".)
- Strongest areas: homepage and category ("Good" to "Perfect") and product pages ("Good" to "Perfect" in one section). Weakest: on-site search ("Poor").
- Issues that apply to this house:
  - Footer links to returns and shipping missing (Van Cleef & Arpels). In a 2021 study of 4,329 US shoppers, 11% abandoned an order in the prior quarter over the return policy. **Rule W10, P11.**
  - No estimated delivery date near "Add to Cart" on any luxury site benchmarked; "1–2 business days" forces arithmetic. **Rule W11.**
  - Out-of-stock pieces not buyable (Louis Vuitton, Chanel); about 30% of users would look elsewhere. Gucci sells with "2–3 weeks". **Rule P8** (our made-to-order line).
  - "Shop Now" link text hides scope; TAG Heuer's "Shop the Monaco Collection" is the model. **Rule W7.**
  - Current scope not highlighted in navigation, no luxury site on mobile. **Rule P9.**
  - Hit areas below 7 mm (Gucci "Find in store", color selector). **Rule P7.**

### 1.2 Baymard Institute, "The Current State of E-Commerce Product Page UX" (2026)

https://baymard.com/blog/current-state-ecommerce-product-page-ux

- 52% of desktop and 62% of mobile product pages are "mediocre or worse"; none "perfect".
- 57% of sites put size choices in drop-downs, hiding options and stock. **Rule P3.**
- 37% of sites provide no in-scale image; 42% of users try to judge size from the images; 23% lack human-model images for wearables. **Rule I2.**
- 89% make save hard to reach; 21% of 1,193 respondents rely on it. **Rule P6.**
- 67% give no total-cost estimate near the buy section. (Ours: "Price before sales tax." once, the honesty line.)
- 44% do not link the return policy from the product content; 60% of 1,032 respondents look for it there; 15% of 1,026 abandoned an order over it. **Rule W10.**

### 1.3 Baymard Institute, "In Scale" images and thumbnails

https://baymard.com/blog/in-scale-product-images; https://baymard.com/blog/always-use-thumbnails-additional-images; https://baymard.com/research-articles/truncating-product-gallery-thumbnails

- 42% of users try to grasp size from product images; misreading size led users to discard relevant products and sometimes to abandon the site. A scale image puts the product beside a person or a known object. **Rule I2.** For jewelry the person is the hand, neck, ear or wrist (research/14 §5).
- Dots or text alone to signal more images: users missed the image that answered their question. Every desktop benchmark site used thumbnails; 24% of mobile sites did. About 40% of sites truncate thumbnails without a cue, which caused abandonments. **Rule P5:** a vertical gallery on desktop shows every view in order with nothing hidden.

### 1.4 Brun, Kluge, Königsfeld, Fassnacht & Mitschke (2013), "Luxury web atmospherics: an examination of homepage design"

*International Journal of Retail & Distribution Management* 41(11/12), 901–916. Abstract read; full text paywalled.

- Method: 81 luxury homepages reviewed with expert interviews, then a randomized lab experiment of luxury-style against conventional homepages.
- Four differences of luxury homepages: darker backgrounds; a larger or full-screen stage for the main content; a horizontal navigation bar; a substantial reduction in the number of page elements.
- Luxury design significantly raised perceived conspicuousness and uniqueness.
- **Rules I3** (stage), **P9** (horizontal navigation), **W5** (fewer elements). The darker-background finding is noted, not adopted: the canon keeps paper and reserves navy for Royal American and the bag.

### 1.5 Nielsen Norman Group, Fessenden (2018), "Scrolling and Attention"

https://www.nngroup.com/articles/scrolling-and-attention/

- 120 participants, over 130,000 fixations, 1920×1080 screens.
- About 57% of viewing time above the fold (80% in the 2010 study); about 17% in the second screenful; 74% in the first two; over 65% of first-screen time in its top half.
- **Rules P1, W5, P2:** what the page is for belongs in the first viewport, and the first viewport should not spend that attention on seven competing things.

### 1.6 Butterick, *Practical Typography*, "Typography in ten minutes"

https://practicaltypography.com/typography-in-ten-minutes.html

- Web body text 15–25px; line spacing 120–145% of the size; 45–90 characters per line on average. Body text first.
- **Rules T2, T3, T4.** The house's 62ch measure and 18–19px letter sit inside these ranges.

### 1.7 WCAG 2.2

- 1.4.3: 4.5:1 for text, 3:1 at 24px or 18.66px bold. **Rule C3.**
- 2.5.5 (enhanced): 44 by 44 CSS px targets; 2.5.8 (minimum): 24px. The house holds the enhanced level (`.btn` 48px). **Rule P7.**

### 1.8 What the reading changed

- **Hand frame second is now a Blocker on product pages**, not a preference (Baymard's 42%, and the house has no in-scale image for most pieces yet).
- **Delivery time near the action** and **returns reachable from the product page** were missing from the rubric before; both are now W-rules.
- **Size options as tiles** stays (we already do it); the drop-down for ring size (fourteen values) is allowed because P3 applies at six values or fewer.
- **Luxury product pages are the category's strength** (Baymard 2021): the bar for ours is the best of them, not the field.

---

## Part 2. What the houses measure

Measured by `node storefront/scripts/council/measure.mjs refs` over `docs/briefs/council/references.json`. Headless Edge was refused (403) by Rolex, Cartier, Tiffany and Aesop; the Rolex and Cartier product pages were measured by hand in the browser pane as an ordinary visit (consent banners hidden in the page copy, never clicked). The bands file is the record; the summary below is filled in from it after each rebuild.

See `docs/briefs/council/data/bands-summary.md` for the current table of house ranges per width.

Notes from the hand measurements, which the bands cannot carry:
- **Rolex, Datejust 31 product page:** Helvetica Now Text for nearly all text; body 18–19px at 1.6 leading; prose sentences run a median 27 words (90th percentile 47); price "$56,600 USD" above the fold at every width; no buy action at all (Rolex sells through retailers); white ground; four pill-shaped elements; the first image is a tall 0.84 crop at 1440 and 0.61 at 390.
- **Cartier, LOVE ring product page:** two faces (Fancy Cut for prose, Brilliant Cut for names), product name only 22px at 1440 and 18px at 390; body 16px at 1.5; prose sentences a median 23 words; half of all text blocks in caps; price and a 38px "ADD TO BAG" 19px apart, above the fold at every width, at 390 in a bar at the foot of the screen; square images throughout; white ground; 9 to 13 controls under 44px.
- **What this says about the canon.** The houses write longer sentences (23–27 words) than the canon's 8–14 and set more caps than the canon allows. Those canon rules are the house's own voice, chosen against the category, and the council enforces them as such. The houses agree with the canon on: two faces, a single white or near-white ground, price above the fold, square or tall product crops, no shadows to speak of. Cartier's phone bar is the c3 pattern from the rework explorations.

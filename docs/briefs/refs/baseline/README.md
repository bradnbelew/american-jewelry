# Baseline, 2026-10-11 (P0)

Full-page captures of every route at 390 (device scale 2) and 1440, taken from the local dev server after the lint fixes, before any P1 work. Images are gitignored; `summary.json` holds status, page height, word count and overflow per capture. Script: headless Edge through puppeteer-core (scratchpad), `waitUntil: networkidle2`, scroll-walk to settle view animations, then `fullPage`.

Toolchain at baseline: `tsc` clean; `npm run lint:house` 0 errors, 18 warnings (all policy "free" sentences, the GIA scale quote, financing on policies); `hydrogen gql check` fails with "[Network] fetch failed" (schema fetch; follow up in P2). No route overflows at 390. Every route returns 200 except the two 404s, which return 404.

## Verdict per route

| Route | Verdict | Why (one line) |
|---|---|---|
| `/` | rework | Structure matches the brief through the stores screen; missing the House letter as the last screen, the hand frames, the bench film slot; the hero photo is the same box shot as Royal American; the footer carries an email "Join" field the canon did not ask for. |
| `/royal-american` | rework | Velvet, chapters and registry are right; registry numerals are gold at 14px (canon: 24px+ only); hero duplicates home; registry entries are stand-ins (open-questions A13). |
| `/americana` | rework | Opener is right; designs appear as "Shooting Star (6) Prism (4)" counters instead of photographic bands; the same four stand-in photos repeat across ten cards. |
| `/new-american` | rework | Same shape as Americana; the New American Standard table and the bridal sentence exist; intro trimmed of "flawless" today. |
| `/designs/:slug` | rework | Opener, three alternating features, pieces grid and the build-on sentence are in place; "the stone is set" is missing (P1 adds it on Signal); photos repeat. |
| `/collections/:slug` | keep | Simple grid with a story line; nothing contradicts the brief. |
| `/pieces/:handle` | rebuild (P2) | Layout and copy grammar are right (ref line, price, honesty line, tiles, swatches, accordions, Complete the set), but it reads the local catalog; Add to bag is disabled; needs the Storefront API, line attributes, the iJewel view, Shop Pay and the bag. |
| `/build/ring` | rework | Working one-ring builder with ledger price and the design code; ring render is flat and grey (needs the key light and a lower camera); "One quality for each stone" prints grades in lowercase ("f–g", "vs1"); "free" in a benefit line. |
| `/design/:code` | keep | Decodes the code, shows the ring named and priced once; certificate link needed. |
| `/design/:code/certificate` | rebuild (P3) | Route does not exist in the storefront (404). |
| `/stores` | rework | Facts, provisional hours and one dated review line are present; review date says "October 2026" (canon: as of 2026-08-26); photos are product stand-ins, not storefronts; store roles are unconfirmed (C1, C37). |
| `/stores/:slug` | rework | Same as the index; needs "what to expect" per brief and the JewelryStore JSON-LD check (P5). |
| `/appointments` | rework | Form exists and sends nowhere; needs the store and purpose tiles as `.opt`, consent boxes, and a confirmation written as a letter (P4). |
| `/house` | rework | The letter is good; "How a piece is made" uses four product photos (none shows a step); the bench photo is a grading chart used three times on one page; "The mark" describes a mark that does not exist (logo paused). |
| `/services` | keep | Six services as rows, the old price list as a table, Rolex disclaimer wording in place; only TODO facts remain (prices, store per service). |
| `/commission` | keep | Five steps as rows, deposit sentence pending counsel. |
| `/care` | keep | Short policy text; "free" appears in policy sentences only. |
| `/journal` | keep | List of four entries; the newest leads. |
| `/journal/:slug` | keep | 62ch Caslon Text, typed blocks; FTC quotes now carry allow markers. |
| `/natural-or-man-made` | rework | 431 words against a 200-word budget; two tables are there, the FAQ doubles the length. |
| `/policies` | keep | Section nav plus text; draft terms labeled pending counsel. |
| `/saved` | keep | Empty state reads plainly; becomes a drawer in P4. |
| `/bag` | rebuild (P2) | Template cart route (15 words, shop-name title); becomes the navy drawer with "What arrives" and the checkout handoff. |
| `/account` | keep | Template; Customer Accounts stays phase 4. |
| `*` (404) | rework | Returns a true 404 but renders outside the header and footer; copy becomes "This page is not in the registry." with two links. |

# American Jewelry: house canon

Purpose: the one page every session loads. If a task touches American Jewelry copy, design, code or strategy, these rules apply.
Last updated: 2026-10-11
Sources: memory notes (family business, remake, Shopify), HANDOFF.md rules, docs/REMAKE-BLUEPRINT.md, house.css, research/04, 08, 10. Full detail in `docs/briefs/`.
Precedence: newest dated family/user decision > REMAKE-BLUEPRINT > briefs > research > old HTML boards. Never resolve a conflict silently: log it in `docs/briefs/open-questions.md`.

## Who we are

- The user's family business: two stores in Tennessee. Brentwood, 157 Franklin Rd. Mt. Juliet, 401 S Mt Juliet Rd Ste 165 (Providence Marketplace).
- Since 2026-10-08: repositioning from a local family jeweler into an American house of fine jewelry ("the Cartier of America").
- The user's brother designs every piece. An in-house bench does repair, laser welding, retipping, stone setting, engraving.
- 2,537 Google reviews (5.0 Brentwood, 4.9 Mt. Juliet, as of 2026-08-26). CAD custom work (consult, CAD by email, approve, 4 to 6 weeks), heirloom resets, appraisal, lifetime warranty, pre-owned Rolex by appointment (NOT an authorized dealer).
- Treat it as a brick-and-mortar luxury local business, not ecommerce-first. The biggest leak is local search and location pages.

## What we represent

A house, not a store: drawn by one designer, set and finished at our own bench, marked inside, looked after for life. Exact before loud. American as a way of making and speaking (a Caslon, daylight, a street address, a numbered registry, plain sentences), never a costume: no flags, eagles, bunting. We are not "the first American house" (Tiffany owns that line).

## Names

- Lines: **Royal American** (one-of-one, price on request, private viewing), **Americana** (natural diamonds; gold, birthstone and natural-diamond versions), **New American** (man-made diamonds, D-F, VVS, IGI, the "New American Standard").
- Hierarchy: line → design motif → piece types → versions, plus Collections that can cross lines.
- Motifs: Shooting Star, Prism (Americana); Signal, Grid (New American). Arch, Honey, Stripes: unknown.
- Collections: Family, Bridal, Signets, The Stack. Royal American pieces: registry number plus a Tennessee place name.
- Designs never cascade down a line. Bridal settings are shared across lines; the stone is a labeled choice.
- NEVER count the lines in public ("three tiers", "three lines", "three doors"). No Tier I/II/III. Names stand alone. "Tier" lives in code only.

## Hard rules

- Say "**man-made diamond**", hyphenated, directly before "diamond", same type, every time, with "(laboratory-grown)" and the IGI report on spec lines. Never "lab-grown" as the house term. Never unqualified "diamond" for a man-made stone; never "real", "genuine" or "natural" for it; never "real" for natural as a contrast.
- NO "Made in America", "Made in USA", "Made in Tennessee" or any variant. NO "handmade", "hand-made", "handcrafted".
- The provenance line, exactly: "Designed in Tennessee. Set and finished in our workshop. Diamonds and gold are imported."
- "Hand-set" and "hand-finished" only for operations confirmed manual.
- No comparative resale, value, price-per-carat or environmental claims for either stone. No "flawless" for VVS. No "GIA-certified".
- Set qualities at set sizes. No stone inventory, no stone browsing. Natural F-G, VS1, GIA. Man-made D-F, VVS1-VVS2, IGI.
- No true scale, no AR, no 3D-printed replica for now.
- The logo is PAUSED. Placeholder mark only (`Mark.tsx`, `icon.svg`). Do not design marks.
- Do not invent facts. Founding year, owners, staff and bench names, hours, financing partner, bench location: UNKNOWN. Write TODO and log it.

## Never do

Discounts, sales, coupons, percent-off, "free" or percent banners, countdowns, urgency, popups, promo bars, financing banners, reviews on product pages, review counts anywhere but one dated line on store pages, carousels, For Her / For Him, value-prop trios, icon rows, bordered-card grammar, chips, badges, line drawings, decorative gradients, hover image swaps, 8-up grids, repeated intro blocks, stock or AI imagery, model faces who are not the family, text on photos without a real overlay, low-contrast text (muted #63676E is the lightest allowed), anything that shifts when clicked, scroll-jacking or pins longer than one viewport, chat bubbles, "Shop now". Never jared.com.

## Voice in ten lines

1. The object is the subject; numbers, names and places are the adjectives.
2. One idea per sentence, 8 to 14 words. Plain, exact, unhurried.
3. "We" only when a person acts. Second person for service.
4. Specs in a table, never in prose. Over 30 words becomes an accordion, table or journal entry.
5. Say each sentence once per site. One honesty line per page ("Price before sales tax.").
6. CTAs name the thing: "Build on Signal", "Every Shooting Star ring". Never "Shop now".
7. Price: fixed; "From $" once when the stone varies; "Price on request" only for Royal American. Round numbers.
8. Banned: Maison, atelier, savoir-faire, bespoke, stunning, exquisite, elevate, curated, timeless.
9. No exclamation points. No em dashes as separators. Labels and headings in sentence case.
10. Budgets: home 110-150 words; line 60-90; design 120-180; product 90 + 160 folded; builder 60; store 80; House 250-350.

## Visual tokens (storefront/app/house.css)

- Type: Libre Caslon Display (names, headlines), Libre Caslon Text (letter, journal, product sentence), Public Sans (UI, numbers, controls). `.label` is sentence case; caps (`.caps`, 11px, 0.08em) only on nav and buttons.
- Palette: paper #F5F2EC, bone #ECE7DD, ink #121212, ink-2 #3F3F3F, muted #63676E, hair #DDD8CF, navy #16213A (Royal American and the bag only), gold #B08D57 (hairlines and numerals at 24px+ only), stone #E9E7E2 (3D ground), white only behind product photography. No other hue.
- Layout: one subject per screen; asymmetric 7/5 or 8/4 splits; `--section-y` 12vh / 8vh; hairlines only in tables and lists; photography carries the color.
- Controls: fixed heights (`.btn` 48px, `.opt` 52px, `.field` 48px), 1px borders in every state, color and border change only; gold focus ring.
- Motion: opacity plus 12px travel, sparingly (not every section); photos settle from 1.02; `--ease-house: cubic-bezier(0.2, 0, 0, 1)`; 300ms crossfade between pages; the ring is the only thing that moves more; full reduced-motion fallback.
- AI-tell lint (research/10): no tracked caps eyebrows, no middle-dot meta strings, no "→" links, no 01/02/03 markers, no fade-up everywhere, no icon cards, no ornaments.

## Stack and phase

- `storefront/`: Shopify Hydrogen 2026.10.0 (pinned), React Router 7, React 19, Vite 8, on Oxygen; master deploys production. `site/` is the older Next.js draft. three.js only in `*.client.tsx`.
- Phase now: mock site built (22 routes); store linked; iJewel embeds on 10 products. Phase 2 commerce is next.
- Next three steps: (1) product pages from the Storefront API with the variant form, size and engraving attributes, Shop Pay, one test order; (2) fix sitemap on Oxygen and port JSON-LD; (3) build "the stone is set" on one design page behind a poster frame.
- Git: stage explicit paths only; never `git add -A` (`storefront/tsconfig.tsbuildinfo` must not be committed).

## Where to look

- `docs/briefs/README.md` (map, labels, how to update); `company/01-who-we-are.md` (facts, unknowns); `company/03-brand-architecture.md`; `company/04-voice-and-lexicon.md`; `company/05-visual-identity.md`; `company/06-claims-and-compliance.md`; `company/07-customers.md`
- `marketing/10-positioning.md`, `11-marketing-plan.md`, `12-launch-plan.md` (all Proposed)
- `site/20-site-plan.md`, `site/21-section-brief-template.md`, `site/pages/*.md`
- `decisions.md`, `open-questions.md`, `roadmap.md`, `HANDOFF.md` (build state, gotchas), `docs/REMAKE-BLUEPRINT.md`

# Launch plan

Purpose: the sequence from today's mock to domain cutover and announcement, and everything the family must supply.
Last updated: 2026-10-11
Sources: REMAKE-BLUEPRINT §7-§8; HANDOFF "What the family still has to supply"; docs/website-blueprint.html "Order of work"; docs/brand-playbook.html part eight (90 days). Every step is **Proposed** unless marked Decided.

## Principle

Launch as a house letting itself be seen, not as a store opening a sale. Soft open to existing clients and repair customers first, then the domain, then press. The house grows in public: a few designs deep, not a full catalog on one day. (brand-playbook parts eight and ten)

## Sequence

| Step | What | Owner | Gate |
|---|---|---|---|
| 1 | Family sign-offs: line names, provenance line, "man-made diamond" with counsel, policies text, hours, first names | family | blocks any public page |
| 2 | Photography of the first designs (four fixed object views per piece, one hand frame, one Tennessee-daylight frame per page), both exteriors, the bench, a 12-second bench loop | family (or a hired photographer) | stand-ins must not launch on the domain |
| 3 | Phase 2 commerce: Storefront PDP, Shop Pay, bag, one real test order, draft orders for builder rings | Claude (needs `ADMIN_API_TOKEN` from owner) | test order visible in admin with attributes |
| 4 | Real prices from the bench's cost sheet in `market.ts` and Shopify | family supplies, Claude loads | no working-assumption prices public |
| 5 | Appointment form wired to a calendar (Cal.com or Sesami) and email (Resend) | family picks, Claude wires | a booking reaches a named person |
| 6 | Fix the old site's 404s and add location pages now; they lose search every week | Claude, needs old-site access | Decided as urgent in research/09 and playbook |
| 7 | Smoke list on Oxygen: `/`, a piece, a collection, `/bag`, checkout, `/stores/*`, 404, sitemap, robots | Claude | all green at 390 / 768 / 1440 |
| 8 | Soft open: existing clients and repair customers see the house first (letter, in-store) | family | |
| 9 | Domain cutover: americanjewelers.com to Hydrogen, checkout subdomain, `PUBLIC_SITE_LIVE`, noindex lifted, 301 map from american.jewelry, both GBPs relinked, sitemaps submitted | owner in Shopify admin + Claude | steps 1-7 done |
| 10 | Announcement: client letter, press notes (local lifestyle titles), release evening for a Royal American piece by invitation | family | after cutover |

## The family must supply

- **Decisions:** final line names (whether "New American" stands); typeface A/B/C; the logo when work resumes; whether "the stone is set" runs on home; counsel sign-off on "man-made diamond", the provenance sentence, warranty, returns and custom terms; financing partner and whether it is mentioned at all; price bands per family; which old lines are motifs (Arch, Honey, Stripes); watch brands kept; whether gold buying is listed.
- **Facts:** confirmed hours per store; founding year; first names at the counter and bench (and consent to name them); the family's own letter for the House page; the brother's sentence if he gives one.
- **Material:** photography and film above; the bench's cost sheet; carat and price ladder per design; CAD or STL for each launch piece.
- **Access:** Google Business Profile (both), Search Console, GA4, Google Ads, Meta, Podium (if used), old-site admin, domain registrar for americanjewelers.com and american.jewelry, Shopify Payments confirmation, `ADMIN_API_TOKEN` and `SESSION_SECRET` set in the Hydrogen environment (never pasted in chat).

## What launch is not

No launch discount, no countdown, no giveaway, no "grand opening sale", no popup email capture. Releases, access and invitations only. (Decided: no discounts or urgency, HANDOFF rule 4)

# Site plan

Purpose: the site's stack, routes, phases, signature feature, current state and what is next.
Last updated: 2026-10-11
Sources: HANDOFF.md (remake section, 2026-10-10); docs/REMAKE-BLUEPRINT.md §1, §4-§8; memory american-jewelry-remake-oxygen; docs/IJEWEL-WORKFLOW.md; storefront/app/routes; git log to e9c9941.

## What it is (Decided, 2026-10-10)

A designer house's website, fully custom React on **Shopify Hydrogen 2026.10.0** (pinned, no caret), React Router 7, React 19, Vite 8, Tailwind 4 for layout utilities only, hosted on **Oxygen**. Shopify owns products, cart, checkout, orders and customer accounts. Lives in `storefront/`. The Next.js draft in `site/` (Vercel, noindexed) stays up until the Oxygen build matches it, then the domain moves. The Shopify theme editor is never used.

Owner's brief: designer, luxury, Americana; not cookie-cutter; as few words as possible; one feature that belongs to the product and stays out of the way.

## Run, check, deploy (Decided)

- Dev: launch config `aj-hydrogen`, port 3030 (`npm --prefix storefront run dev -- --port 3030`). `npm run typecheck` before every push.
- Local `.env` (gitignored) points at the real store; never echo its tokens.
- Oxygen CD: every push deploys; `master` → production `https://american-jewelry-4d25801908d613ed6748.o2.myshopify.dev`; other branches → preview.
- Anything importing three.js, GSAP, Lenis or the iJewel SDK is a `*.client.tsx` module (Oxygen worker limits: no Node APIs, 10 MB bundle, 400 ms startup, `Date.now()` frozen per request).
- Known follow-up: `sitemap.xml` 404s on Oxygen though it works locally. (memory, 2026-10-10)

## Routes (REMAKE-BLUEPRINT §5; built in the mock unless noted)

`/`, `/royal-american`, `/americana`, `/new-american`, `/designs/:slug`, `/collections/:slug`, `/pieces/:handle`, `/build/ring`, `/build/band` (placeholder), `/design/:code` and `/design/:code/certificate`, `/stores` and `/stores/:slug`, `/appointments`, `/house`, `/services`, `/commission`, `/care`, `/journal` and `/journal/:slug`, `/natural-or-man-made`, `/policies`, `/saved`, `/bag`, `/search` (dropped for the mock), `/account/*` (phase 2), `*` true 404.

Page briefs: `site/pages/`. One subject per screen, the copy budgets in `company/04-voice-and-lexicon.md`.

## Data (Decided)

- Products, variants, prices, photos: Storefront API 2026-10. Options Version × Metal; size and engraving as line attributes; metafields `house.*` and `custom.model_source_embed` (iJewel) PUBLIC_READ.
- Editorial (lines, designs, collection stories, stores, journal, House letter): typed local catalog in `app/lib/catalog` and `app/lib/journal.ts` for launch; Shopify metaobjects when the family needs to edit without a deploy.
- Builder: `app/lib/builder` (model, market, pricing, design codes). Market inputs are working assumptions.
- Builder rings and price-on-request: route action → Admin `draftOrderCreate` then invoice, price recomputed server-side from the design code; the client's number is never trusted.
- Images: Shopify CDN params with a hand-written srcset helper; stand-in photos in `public/photos` until the house designs are shot.

## The signature feature: "the stone is set" (Decided concept; not built)

The house's own parametric ring assembles over exactly one viewport of scroll on the design pages and the top of the builder: band arrives, head rises, stone lowers, four claws close, one sweep of light. Scrubbed by scroll (GSAP ScrollTrigger, Lenis only where it runs), reversible, pinned one screen only, poster frame under reduced motion. Two small moments on the same renderer: pointer-reactive key light (the stone throws fire as the hand moves) and the engraving typed live inside the band with the camera turning to read it. Default: not on home; home shows the finished ring as a still. (REMAKE-BLUEPRINT §2, §9)

## 3D (Decided)

- Own R3F viewer (`ModelTile.client.tsx`), self-hosted Draco at `/3d/draco/`, studio HDRI at `/3d/env/`; 13 cast files from the bench as stand-ins (`app/lib/models.ts`).
- iJewel iframe on product pages from `custom.model_source_embed` (11 public Drive models, 10 products). Free plan shows attribution; Professional ($1,500/yr) removes it.
- 3D always loads behind a photograph, never before it. No true scale, no AR, no 3D-printed replica for now.

## Phases (REMAKE-BLUEPRINT §7, with state)

| Phase | Content | State 2026-10-11 |
|---|---|---|
| 0 | Scaffold, house stylesheet, catalog/builder/journal/ring ported, Shopify catalog, skills | Done 10/10 |
| 1 | Shell and reads: routes, header, footer, home, line, design, collection, stores, house, services, commission, care, policies, natural-or-man-made, appointments, journal, SEO plumbing | Mock built 10/10 (22 routes, local catalog) |
| 2 | Commerce: `/pieces/:handle` from Storefront API, variant form, Shop Pay, bag and checkout test, draft-order action, Resend for appointments | Next. Store is linked and local dev reads it; PDP still on local catalog |
| 3 | Signature: ring as client module, `/build/ring` clientLoader, design codes and certificate, "the stone is set", pointer light, live engraving | Ring ported; assembly not built |
| 4 | Ship: Oxygen CD, production Public, smoke list, Customer Accounts, consent banner, domain | CD live; domain not cut over |
| 5 | After launch: house photography replaces stand-ins; metaobjects; iJewel Mini Viewer band builder | Waiting on family |

## Next three steps (Claude unless noted)

1. Phase 2: `/pieces/:handle` from the Storefront API with the variant form, size and engraving attributes, Shop Pay; one real test order. Then the draft-order action for builder rings (needs `ADMIN_API_TOKEN` from the owner).
2. Fix `sitemap.xml` on Oxygen; port JSON-LD from `site/src/lib/seo.tsx` and verify per route.
3. Build "the stone is set" on one design page behind a poster frame; review with the review-animations skill before adding anything else that moves.

## Domain and cutover (Decided plan; dates Unknown)

americanjewelers.com to the Hydrogen storefront as primary (www primary, apex redirects), checkout subdomain to Online Store, preview hosts redirect permanently, 301 map from american.jewelry, both Google Business Profiles relinked to the new store pages. Purchase of americanjewelers.com: **Unknown** whether done. See `marketing/12-launch-plan.md`.

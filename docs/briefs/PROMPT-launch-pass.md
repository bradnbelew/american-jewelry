# Prompt: the launch pass (paste into a fresh Claude Code session started in `D:\american-jewelry`)

Written 2026-10-11. Everything it refers to is in the repo and pushed. Start the session in the repo root so `CLAUDE.md` loads the canon.

---

Use the `/house` skill for every screen in this session.

## What we are doing
Turn `storefront/` (Shopify Hydrogen 2026.10.0 on Oxygen) into the house's finished site and keep it deploying from `master`. It is private for now: production on Oxygen is `https://american-jewelry-4d25801908d613ed6748.o2.myshopify.dev` and stays **Private** (Shopify login required) until the owner flips it; do not change that setting, and keep robots noindex until a `SITE_LIVE` flag is true. Every push to `master` deploys through `.github/workflows/oxygen-deployment-1000182227.yml`; confirm each deploy with `gh run list` / `gh run watch` and by loading the live URL.

## Read first, in this order (nothing else until you need it)
1. `docs/briefs/README.md`, then `docs/briefs/site/20-site-plan.md` and every file in `docs/briefs/site/pages/`.
2. `HANDOFF.md`, the "remake on Hydrogen / Oxygen" section at the top (store, env, deploy, gotchas).
3. `DESIGN.md` (tokens) and `storefront/app/house.css` (the real classes).
4. `research/00-INDEX.md`. Open a research file only when a decision needs it: 08 and 11 for composition, 17 §1–2 and §9 when a screen feels flat or generic, 14 for images and the 3D ring, 16 §9.1 for the lint agenda.
Never paste research into a build prompt or a plan.

## Images (the owner has authorized stand-ins)
Order of preference for every image slot, and log every non-house image in `docs/briefs/PHOTOS-TODO.md` with its source URL and the shot it must become (research/14 §5):
1. The house's own photographs: `storefront/public/photos/` (23) and `D:\american-jewelry-mock\assets\img\` (american.jewelry's own heroes, craft and product photos; copy what you use into `storefront/public/photos/`).
2. Renders of the house's own cast files: `storefront/public/3d/models/*.glb` through the existing `ModelTile` poster path.
3. iJewel embeds on products that carry `custom.model_source_embed` (map in `app/lib/models.ts`); use them on the product page's 3D view and the band builder.
4. Only if a slot is still empty: a license-clear photograph of a comparable piece (Unsplash or Pexels license), credited in PHOTOS-TODO.md. Never another brand's imagery, never AI-generated images, never model faces.

## Phases (plan mode at the start of each; commit and push at the end of each; verify the deploy; send me screenshots and the live URL)
**P0 Baseline.** `npm install`, `npm run typecheck`, `npm run lint:house`. Fix the real lint errors listed in `research/16 §9.1` (split Royal American number and name into two fields; retitle the `<title>` join; add `// house-lint: allow` only to the journal lines that quote the FTC words). Start the dev server, screenshot all routes at 390 and 1440 into `docs/briefs/refs/baseline/` (images are gitignored) and write one line per route: keep / rework / rebuild.
**P1 The brand front.** Home, the three line pages, the design pages, exactly to their briefs: one subject per screen, the hand frames, the design of the season, the bench film slot, the House letter as the home's last screen, the two addresses as every page's ending. Build "the stone is set" on one design page using the existing `ParametricRing` with a GSAP ScrollTrigger timeline, one viewport, scrubbed, poster first, reduced-motion fallback (08 §4, 11 §7, 14 §4; the Blender-authored clip can replace the code timeline later). Add the pointer-reactive key light to every 3D view.
**P2 Product pages on real data.** `/pieces/:handle` from the Storefront API: Version × Metal variant form, size and engraving as line attributes, the price grammar (round, once, "Price before sales tax"), the composed one-sentence description, the folded stone report, the hallmark frame, "Complete the set", the iJewel 3D view, Shop Pay, the navy bag drawer with "What arrives", and the checkout handoff. Walk a bag to the Shopify checkout page; do not place a paid order unless Shopify test mode is on.
**P3 Builder and certificate.** Keep `/build/ring` as the one-ring, ledger-price, live-engraving builder; `/design/:code` and its certificate page; the "request this ring" path uses the Admin draft-order action only if `ADMIN_API_TOKEN` exists, otherwise an appointment-style request form, and the gap goes in `open-questions.md`.
**P4 The house around the product.** House (letter, the type story paragraph, the lineage line that says we are not the first), services, stores (facts only, "what to expect", one dated review line), journal, appointments (a plain form, confirmation written as a letter; if no backend exists, store submissions the simplest reliable way available and log the choice), care, policies, saved ("keep" into a drawer), the 404 ("This page is not in the registry."). Unknown facts stay TODO.
**P5 Finish.** Meta, Open Graph images, JSON-LD, sitemap, robots noindex while private; LCP ≤ 2.5 s and INP ≤ 200 ms on home and a product page at mobile; reduced motion everywhere; `npm run lint:house` at 0 errors; run the `house-critic` agent on every page and fix Blockers; a final screenshot set at 390 / 768 / 1440; update `HANDOFF.md` (remake section) and add dated lines to `docs/briefs/decisions.md`.

## Rules that do not bend
The canon loaded with this session (names, hard rules, never-do, voice). Never count the lines. Never invent a fact. Stage explicit paths only; never `git add -A`; never commit `.env` or `storefront/tsconfig.tsbuildinfo`. three.js, GSAP and Lenis only in `*.client.tsx`; keep the Oxygen server bundle well under 10 MB. At most two subagents, and they never use the browser pane. Tokens and classes from `house.css` only; no new hues, shadows or radii. Screenshots before "done", every time.

## What the owner will do (not blocking)
Keep Oxygen production Private; later set it Public and connect the domain. Provide the Headless/Admin token for builder draft orders if wanted. Schedule the photography in research/14 §6. Answer `docs/briefs/open-questions.md`.

Start with P0 and show me the baseline verdicts before P1.

# American Jewelry — handoff for the next session

_Written 2026-10-09. Read this whole file before touching anything._

## What this is

American Jewelry (Brentwood + Mt. Juliet, Tennessee; 2,537 Google reviews; family-owned) is repositioning from "the local family jeweler" into **the first American house of fine jewelry**: its own designs, designed and finished at its own bench, three tiers, nothing low-end. The family's words: "the Cartier of America." Not competing with Kay's. Americana and the American-made idea are the brand's spine, but see the legal line below on how that may be said.

- **Live preview:** https://american-jewelry.vercel.app (noindexed until `NEXT_PUBLIC_SITE_LIVE=true`)
- **Repo:** private `bradnbelew/american-jewelry`, branch `master`, root dir `site/`. Push to master = production deploy.
- **Vercel:** project `american-jewelry` on the user's personal account (team `team_2HAUKLhWF4QVYDHEt5FbNeHu`). The `vercel` CLI on this machine is logged into a *different* account; use the Vercel MCP connector, never the CLI.
- **Dev server:** `.claude/launch.json` entry `aj-site`, port 3020 (`pnpm --dir D:/american-jewelry/site exec next dev --port 3020`). It dies when the browser pane closes; check `curl http://127.0.0.1:3020/` before relying on it.
- **Stack:** Next.js 16.4 App Router with `cacheComponents: true`, React 19, Tailwind 4, next/font (Cormorant Garamond display + Jost UI), react-three-fiber + drei, `@google/model-viewer`, pnpm.

## Where everything lives

- `site/src/lib/catalog/` — tiers, designs, collections, pieces, stores (typed local data shaped to map 1:1 onto Shopify metaobjects/products/variants later). `photos.ts` maps every photo key to pieces/tiers/collections/stores.
- `site/src/lib/builder/` — the ring builder's brain: `model.ts` (every decision + the house decisions), `market.ts` (metal $/g, density, labor, set stone prices, margins — all working assumptions), `pricing.ts` (price from geometry: band volume × density × $/g + bench + stone), `code.ts` (design codes: whole config packed into `AJ-XXXXXX-C[.engraving]`, decodable with no database), `notes.ts` (the designer's note per setting).
- `site/src/components/three/` — `brilliant.ts` (real 57-facet round brilliant geometry), `band.ts` (swept band profiles: knife/court/flat, taper, faceted), `ParametricRing.tsx` (the scene: prongs, gallery, hidden halo, Shooting Star plate + tail with birthstone, engraving as a canvas texture on the inner band, camera presets per step), `RingViewer.tsx` (dynamic import wrapper).
- `site/src/components/builder/` — `RingBuilder.tsx` (5 steps: Setting → Stone → Metal → Fit → Review), `TrueScale.tsx` (ring at real mm after a bank-card calibration), `ARView.tsx` (GLB export → model-viewer; Android AR works, iOS needs USDZ at launch), `DesignView.tsx` (the shareable design page).
- Routes: `/`, `/[tier]`, `/designs/[slug]`, `/collections/[slug]`, `/pieces/[handle]`, `/build/ring` (`?code=` or `?setting=`), `/build/band` (placeholder), `/design/[code]` (`?hint=1` hides the price), `/design/[code]/certificate`, `/stores`, `/stores/[slug]`, `/appointments` (prefills from `?piece=`/`?build=`/`?code=`), `/house`, `/natural-or-man-made`, `/commission` (`?code=` for bespoke-from-design), `/care`, `/policies`, `not-found`.
- `docs/` — the earlier concept docs (New American tier book, logo boards, website blueprint). `research/` — four research tracks (luxury-house teardowns, builders & e-commerce, Shopify/3D/SEO stack, compliance/trust/local) and `shots/` from the aborted audits.
- Photos in `site/public/photos` are the family's **current** store photography pulled from american.jewelry; they stand in for the new designs and will be replaced.

## Rules the family has set (do not undo)

1. **Tiers:** Royal American (one-of-one, price on request, private viewing) · Americana (natural diamonds; house designs in gold / birthstone / natural-diamond versions) · New American (man-made diamonds to a published standard). Designs never cascade down a tier; only bridal settings are shared, with the stone chosen on the piece.
2. **Stones:** set qualities at set sizes only. **No stone inventory**, no stone browsing (may change later). Natural = F–G, VS1, GIA. Man-made = D–F, VVS, IGI.
3. **Words:** always "**man-made diamond**" (hyphenated), with "(laboratory-grown)" and the IGI report on the spec line; never unqualified "diamond" for man-made, never "real/genuine/natural" for it. **No "Made in America/Tennessee" and no "handmade"**: the legal line (FTC all-or-virtually-all; stones and gold are imported; CAD-cast pieces are not "handmade") is "Designed in Tennessee. Set and finished in our workshop. Diamonds and gold are imported." The *brand* can still be about American making and Americana; the *claims* must stay inside that sentence. See `research/04-compliance-trust-local.md`.
4. **No discounts, countdowns, popups, reviews on product pages, financing banners, or urgency.** Price grammar: fixed price; "From $" when the stone varies; "Price on request" only for one-of-ones.
5. **No tier labels** ("Tier I/II/III") above the three sections. Tier heroes = the name plus a romantic blurb that says what it is and what it means.
6. **No text that is hard to read on its background.** Over photography, use `.on-photo` (text-shadow) and a real overlay. Muted text is `--muted: #63676e` minimum.
7. **No 3D-printed same-day replica** feature (the family declined it).
8. **No "vibe-coded" UI:** no bordered cards, chips, icons, gradients-as-decoration, rounded-everything. Controls have fixed heights and 1px borders in every state (`.btn .opt .pill .field` in `globals.css`); nothing may shift when clicked.
9. Logo work is **paused**; `components/Mark.tsx` and `app/icon.svg` hold the placeholder "Ascender" AJ mark (one file to swap).

## Known issues and gotchas

- Under `cacheComponents`, an unknown slug streams the not-found page with HTTP 200; `dynamicParams=false` is *not allowed* in this mode (it breaks the build). Fix later with a known-slug check in middleware, or by turning cacheComponents off.
- Next 16 gotchas already handled: no `new Date()` during prerender (see `Year.tsx`), `params`/`searchParams` must be awaited inside `<Suspense>` (every dynamic page wraps its content).
- Headless Edge screenshots (`msedge --headless=new --screenshot --window-size=W,H`) are the reliable way to see desktop pages; the browser pane breaks at emulated widths when the pane is narrow. Headless Edge renders a ~500px minimum width, so "mobile" captures at 390 are misleading; the real browser at 390 has no overflow.
- The pricing engine is a working model with made-up market inputs (`market.ts`); the family will replace them with the bench's cost sheet.
- Store hours, founding year and the "House" timeline are placeholders. The appointment form and checkout do not send anywhere until Shopify and a calendar are connected (Phase 1 in `docs/website-blueprint.html`).
- Six parallel Fable audit agents hit the account's spend limit and died; run at most one or two agents at a time on this account.

## Skills installed for the next pass

From https://github.com/Leonxlnx/taste-skill (cloned and installed into `~/.claude/skills`): `design-taste-frontend` (the taste skill, v2), `high-end-visual-design`, `minimalist-ui`, `redesign-existing-projects`, `brandkit`, `full-output-enforcement`. Also available: `/ai-seo`, `/seo-geo`, `/seo-technical`, `/seo`, `/schema`, `/copywriting`, `/cro`, `/competitor-profiling`, `/last30days`, `/hyperframes` (video), `/brandkit`.

## What the next session is for

See the prompt at the bottom of this file. In short: one more full pass, with full freedom, to make the site, listings, functions, layout and copy as special as the ambition — the first house of American-made fine jewelry — using the taste skill and the SEO/AEO/GEO skills, after a research phase on competitors, modern luxury designer styling, marketing, copywriting, layout and features, and after locating any other tools that would help it get there with real uniqueness.

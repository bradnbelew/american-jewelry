# American Jewelry — handoff

_Updated 2026-10-09 after the luxury pass (session 3). Read this whole file before touching anything._

## What this is

American Jewelry (Brentwood + Mt. Juliet, Tennessee; 2,537 Google reviews; family-owned) is repositioning from "the local family jeweler" into **a house of fine jewelry**: its own designs, set and finished at its own bench, three tiers, nothing low-end. The family's words: "the Cartier of America." Americana and American making are the brand's spine; see the legal line below on how that may be said. The site does **not** claim to be "the first" American house (Tiffany uses that line; it would be false).

- **Live preview:** https://american-jewelry.vercel.app (noindexed until `NEXT_PUBLIC_SITE_LIVE=true`)
- **Repo:** private `bradnbelew/american-jewelry`, branch `master`, root dir `site/`. Push to master = production deploy.
- **Vercel:** project `american-jewelry` on the user's personal account (team `team_2HAUKLhWF4QVYDHEt5FbNeHu`). The `vercel` CLI on this machine is logged into a *different* account; use the Vercel MCP connector, never the CLI.
- **Dev server:** `D:\.claude\launch.json` entry `aj-pass3`, port 3021 (`pnpm --dir D:/american-jewelry/site exec next dev --port 3021`). Next 16 refuses a second `next dev` in the same folder; if one is already running (check `curl http://localhost:3020/` and `:3021`), reuse it or kill the stale PID it names.
- **Stack:** Next.js 16.4 App Router with `cacheComponents: true`, React 19, Tailwind 4, next/font (EB Garamond display + Jost UI), react-three-fiber + drei, `@vercel/analytics` + `@vercel/speed-insights`, `schema-dts` (dev), pnpm.

## Where everything lives

- `site/src/lib/catalog/` — tiers, designs, collections, pieces, stores (typed local data shaped to map 1:1 onto Shopify later). `photos.ts` maps every photo key to pieces/tiers/collections/stores. `pieceRef()` gives the house reference shown on product pages (tier code + catalog number).
- `site/src/lib/builder/` — the ring builder's brain: `model.ts` (every decision + the house decisions), `market.ts` (metal $/g, density, labor, set stone prices, margins — all working assumptions), `pricing.ts` (price from geometry), `code.ts` (design codes `AJ-XXXXXX-C[.engraving]`, decodable with no database), `notes.ts` (the designer's note per setting + `SETTING_PHOTO`, the photograph standing in for each setting).
- `site/src/lib/journal.ts` — the four journal articles (typed blocks). `site/src/lib/seo.tsx` — every JSON-LD builder. `site/src/lib/site.ts` — canonical host, live flag, "figures as of" date.
- `site/src/components/three/` — `brilliant.ts` (57-facet round brilliant), `band.ts` (swept profiles), `studio.ts` (procedural equirect studio environment for the refractive stone), `ParametricRing.tsx` (the scene; center stone uses drei `MeshRefractionMaterial`), `RingViewer.tsx`.
- `site/src/components/builder/RingBuilder.tsx` — the one-screen builder (see below). `saved/` — the Saved list (localStorage). `bag/` — the bag (localStorage).
- `site/src/components/Section.tsx` — `Section`, `PageTitle` (centered, used only on appointments/policies/404/natural-or-man-made), `SplitOpener` (title left, photo right; the standard opener), `PhotoOpener` (full-bleed; home and Royal American), `SectionTitle`.
- Routes: `/`, `/[tier]`, `/designs/[slug]`, `/collections/[slug]`, `/pieces/[handle]` (+ `opengraph-image`), `/build/ring` (`?code=` or `?setting=`), `/build/band` (placeholder), `/design/[code]` (`?hint=1` hides the price), `/design/[code]/certificate`, `/stores`, `/stores/[slug]`, `/appointments`, `/house`, `/services`, `/journal`, `/journal/[slug]`, `/saved`, `/natural-or-man-made`, `/commission`, `/care`, `/policies`, `not-found`.
- `docs/` — concept docs (tier book, logo boards, website blueprint). `research/` — 01 house teardowns, 02 builders, 03 stack/SEO, 04 compliance, **05 watch-house visual and copy study (new)**. `research/shots/` is gitignored for `houses/` and `pass3/`.
- `site/assets/EBGaramond-400.woff` — static font used only by the Open Graph image renderer (Satori cannot read the variable TTF).
- Photos in `site/public/photos` are the family's **current** store photography pulled from american.jewelry; they stand in for the new designs and will be replaced.

## What the luxury pass changed (session 3)

1. **Type and system.** EB Garamond replaces Cormorant 300 for display (sturdier at size; the family's own choice for the house documents). One paper tint (`--paper`) instead of warm ivory everywhere. CSS-only scroll reveal (`.reveal`, scroll-driven animation, reduced-motion guarded, no JS). Skip link. No eyebrow above every section; headlines carry sections.
2. **Builder.** Rebuilt as one calm page: the ring arrives complete with the house defaults; the setting, stone and metal are in front; fit and engraving beneath; every finer adjustment under one disclosure ("The jeweler's adjustments"). The camera turns to show what just changed. Carat and size are dropdowns. True scale and AR were **removed** at the family's direction (iJewel will own that later). The center stone is now a refractive material traced against a procedural studio.
3. **No mockup drawings.** The hand-drawn SVG settings were hurting the look and were removed everywhere (builder, home, bridal, design pages, certificate). Photographs stand in via `SETTING_PHOTO`. The placeholder AJ mark is no longer shown on the House page (it remains as `icon.svg` and `Mark.tsx`).
4. **Home.** Photographic opener; one featured design with its story and three pieces; the three tiers as a ledger; the builder with photographs; a pieces grid; a plain statement on stones; the bench; the two stores with the review count dated.
5. **Tier pages.** Royal American is the high-jewelry realm: full-bleed opener, each piece as a chapter, the registry. Americana and New American open split, then each design is a full-width photographic band with its name set over it, then its pieces.
6. **Product pages.** Title with a house reference line; price with "Price before sales tax"; version/metal/size/engraving; Add to bag, See it in store, Save; accordions for details, the stone and its report, care and warranty, delivery; a named human to call; a composed one-sentence description of what the piece is made of; Behind the design; Complete the set.
7. **New pages.** `/services` (six productized services, watches, care), `/journal` (four articles: reading an IGI report, what "Designed in Tennessee" means, ring size, how a ring is made), `/saved`. Stores and store pages carry what to expect and a dated review count with no quoted reviews. Appointments add a video option and the phone numbers for same-day.
8. **SEO/AEO/GEO.** Organization graph as `JewelryStore` + `WebSite`; per-store `JewelryStore` nodes with geo and **no self-serving aggregateRating** (hours enter schema only when `hoursConfirmed` is true); `Product` with the man-made qualifier in the name and `AggregateOffer`; `BreadcrumbList`, `ItemList`, `FAQPage`, `Article`; canonical URLs on every page; per-piece Open Graph images; sitemap with images and the journal; robots allows AI crawlers when live; `llms.txt` corrected.
9. **Compliance.** "hand-made chain" and "handcrafted" removed; resale/value comparison removed from natural-or-man-made (NAD precedent cuts both ways); "man-made" hyphenated everywhere; tier taglines carry no origin claim.
10. **Copy.** Register from research 05: object as subject, numbers as adjectives, one honesty line per page, CTAs that name the thing, "Discover" only for editorial links, no exclamation points, no borrowed French or Swiss vocabulary (no Maison, atelier, savoir-faire, bespoke).

## Rules the family has set (do not undo)

1. **Tiers:** Royal American (one-of-one, price on request, private viewing) · Americana (natural diamonds; house designs in gold / birthstone / natural-diamond versions) · New American (man-made diamonds to a published standard). Designs never cascade down a tier; only bridal settings are shared, with the stone chosen on the piece.
2. **Stones:** set qualities at set sizes only. **No stone inventory**, no stone browsing. Natural = F–G, VS1, GIA. Man-made = D–F, VVS, IGI.
3. **Words:** always "**man-made diamond**" (hyphenated), with "(laboratory-grown)" and the IGI report on the spec line; never unqualified "diamond" for man-made, never "real/genuine/natural" for it. **No "Made in America/Tennessee" and no "handmade"**: the legal line is "Designed in Tennessee. Set and finished in our workshop. Diamonds and gold are imported." See `research/04-compliance-trust-local.md`. No comparative resale/value or environmental claims for either stone.
4. **No discounts, countdowns, popups, reviews on product pages, financing banners, or urgency.** Price grammar: fixed price; "From $" when the stone varies; "Price on request" only for one-of-ones.
5. **No tier labels** ("Tier I/II/III").
6. **No text that is hard to read on its background.** Over photography, use `.on-photo` and a real overlay. Muted text is `--muted: #63676e` minimum.
7. **No 3D-printed replica, no true-scale, no AR** for now (iJewel later).
8. **No "vibe-coded" UI:** no bordered cards, chips, icons, gradients-as-decoration, rounded-everything, no line-drawing mockups. Controls have fixed heights and 1px borders in every state (`.btn .opt .pill .field`); nothing may shift when clicked.
9. Logo work is **paused**; `components/Mark.tsx` and `app/icon.svg` hold the placeholder.
10. **Builder:** low friction. Three visible choices; the rest decided by the house and available under one disclosure.

## Known issues and gotchas

- Under `cacheComponents`, an unknown slug streams the not-found page with HTTP 200; `dynamicParams=false` is not allowed in this mode. Fix later with a known-slug check in `proxy.ts` or by turning cacheComponents off.
- Headless Edge (`msedge --headless=new --screenshot --window-size=W,H --virtual-time-budget=9000`) is the reliable way to see desktop pages, but in dev it sometimes captures before `/_next/image` finishes optimizing a large photo (the bench photo most often); the real browser renders them. Headless renders a ~500px minimum width, so 430-wide "mobile" captures overflow falsely.
- The Bash tool on this machine intermittently fails heredocs ("unexpected EOF while looking for matching quote"), and `cd` inside a command does not always move `$PWD`. Write files with the Write tool, run Python scripts from files, and use absolute output paths. Two batches of screenshots landed in `site/` this way; `site/*.png` is now gitignored.
- The pricing engine is a working model with made-up market inputs (`market.ts`); the family will replace them with the bench's cost sheet.
- Store hours are provisional (`hoursConfirmed: false`, shown as such on the page). Founding year unknown; the House page carries a letter instead of a timeline. The appointment form and checkout send nowhere until Shopify and a calendar are connected.
- The Open Graph image route builds as a dynamic function (fine on Vercel). It reads `site/assets/EBGaramond-400.woff` and the photo from `public/` at request time.
- **Vercel served a stale CSS chunk** after the type change (HTML new, stylesheet old: headings fell back to Jost, the skip link showed). Cause: Turbopack reused a cached CSS module from the restored `.next/cache`. Fix applied 10/09: project env `VERCEL_FORCE_NO_BUILD_CACHE=1` (production + preview) and an empty-commit rebuild. If a CSS change ever fails to appear in production, check the live stylesheet for the old rule before debugging the code.
- Six parallel audit agents once hit the account's spend limit; run at most one or two agents at a time on this account. Agents cannot use the browser pane while this session is using it.

## What the family still has to supply

- Photography of the house designs (the current photos are stand-ins), store exteriors and the bench; four fixed object views per piece plus one Tennessee-daylight frame per page (research 05, rule 5c.5).
- Confirmed store hours (then set `hoursConfirmed: true`), founding year, and the names of the people at the counter and the bench (research 05 asks for first names in the present tense; nothing is invented).
- Final tier names; whether "New American" stands; counsel's sign-off on "man-made diamond", the origin sentence and the draft warranty/returns/custom terms in `/policies`.
- The bench's cost sheet for `market.ts`, and the carat/price ladder per design.
- Shopify store ownership and plan; the americanjewelers.com purchase; access to Google Business Profile, Search Console and Analytics; an appointment calendar (Cal.com or Sesami); Affirm merchant account.
- The logo. The header is one file to swap.

## Prompt for a follow-up session

> Read `HANDOFF.md`, then `research/05-watch-houses-visual-copy-study.md` (synthesis sections 5a–5c) and skim `research/04-compliance-trust-local.md`. The site in `site/` is live at american-jewelry.vercel.app and auto-deploys from `master`. Continue the luxury pass: (1) verify every page in the real browser at desktop and 390px and fix anything that shifts, wraps or reads badly; (2) wire the appointment form to a calendar and the bag to Shopify when the family provides access; (3) replace the stand-in photography when the house designs are shot; (4) keep every family rule in HANDOFF.md. Run `pnpm build` before every push; commit small.

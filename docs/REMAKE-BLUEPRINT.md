# American Jewelry remake: blueprint

_2026-10-10. The one document to read before building. It compresses research/07 (Hydrogen on Oxygen), research/08 (design direction), research/09 (old-site content merge) and the family rules in HANDOFF.md into decisions. Where this file and a research file disagree, this file wins._

## 1. What we are making

A designer house of fine jewelry's website, built as a fully custom React storefront on **Shopify Hydrogen, hosted on Oxygen**, with Shopify owning products, cart, checkout, orders and customer accounts. The site in `site/` (Next.js on Vercel) is the rough draft; it stays live until the Oxygen build matches it, then the domain moves. Nothing is imported into a Shopify theme; the theme editor is never used.

The owner's brief: designer, luxury, Americana; not cookie-cutter; as few words as possible; one stunning feature that stays out of the way.

## 2. The direction (from research/08)

**Thesis.** The draft reads as a template because it is equal cards in equal rows, repeats its intro on every page, and explains everything. The remake shows one subject per screen, lets names and photographs do the work, and keeps one piece of motion that belongs to the product. Americana is a Caslon, daylight, a street address, a numbered registry and plain sentences. Never a flag, never a slab.

**The signature feature: "The stone is set."** The house's own parametric ring (already built: band, head, claws, refractive stone, studio lights, a camera that eases to what changed) assembles itself over exactly one viewport of scroll on the three design pages and the top of the builder: band arrives, head rises, stone lowers, four claws close, one sweep of light. Scrubbed by scroll, reversible, pinned one screen only, poster frame under reduced motion. Two small moments on the same renderer: pointer-reactive key light so the stone throws fire as the hand moves, and the engraving typed live on the inside of the band with the camera turning to read it. Quiet extras: the Royal American registry table, the hallmark frame, the folded stone report.

**Type.** Libre Caslon Display (names, headlines), Libre Caslon Text (the letter, journal, product sentence), Public Sans (caps, numbers, controls). All SIL OFL, self-hosted via fontsource. EB Garamond and Jost are retired.

**Palette.** Paper #F5F2EC, bone #ECE7DD, ink #121212, ink-2 #3F3F3F, muted #63676E, hair #DDD8CF, navy velvet #16213A (Royal American and the bag only), gold #B08D57 (hairlines and numerals at 24px and above only), stone #E9E7E2 (the 3D frame). White only behind product photography. No other hue anywhere.

**Motion.** Reveal = opacity and 12px of travel over 600ms, CSS scroll-driven, staggered 60ms. Photographs settle from scale 1.02. The ring is the only thing that moves more. Page transitions are a 300ms crossfade (React Router view transitions). Controls change color and 1px border only; nothing scales, lifts or shifts.

**Copy budgets** (visible body words): home 110–150 across six screens; line page 60–90 above the grid; design page 120–180; product page 90 above the fold, 160 folded; builder 60; each store 80; House 250–350. Every sentence is said once per site. Anything over 30 words becomes an accordion, a table or a journal entry.

**Binding never-do list** (research/08 §1d, plus HANDOFF): no promo bar, no "Shop now", no category tiles with buttons, no icon rows, no value-prop trios, no review counts except one line on store pages, no percent or "free", no carousel, no For Her/For Him, no eight-up grid, no hover image swap, no repeated intro block, no exclamation points, no "stunning/exquisite/elevate/curated/timeless", no Maison/atelier/bespoke, no handmade, no Made in America, no em dashes, no bordered-card grammar, no chips, no line drawings, no text on photos without a real overlay, no pinning longer than one viewport, no stock or AI imagery, no model faces who are not the family. Never count the tiers.

## 3. Content: what carries over from american.jewelry (research/09)

Keep and elevate: the open-air bench you can watch (the most differentiating true fact), in-house repair with its published price list, the lifetime warranty terms (defects for life, center stone excluded, free cleaning and inspection forever), the custom process (consult, CAD by email, approve, four to six weeks), 30-day returns and free shipping stated plainly, the old line names absorbed into the designs (Classic, Rugged, Faith, the TriStar charm, the paperclip and beaded disc as a Tennessee collection), the "You Ask, We Answer" questions as journal entries, pre-owned Rolex by appointment, the two stores' facts.

Retire from the web: the 484-SKU bridal catalog and all stone browsing, moissanite, silver and demi-precious, estate (until curated), the sale rail, the birthday club, financing banners, "Forever starts here" and "favorite jeweler", Master Jeweler titles, the chat bubble.

Family must confirm: hours (old site and new site disagree), the returns text, financing partner, which old lines are real motifs (Arch, Honey, Stripes), watch brands kept, whether gold buying is listed, first names at the bench and counter.

## 4. Architecture (from research/07)

- **Framework:** `@shopify/hydrogen` **2026.10.0** (pinned, no caret), the toolkit's React Router 7 template, React 19, Vite 8, Tailwind 4 for layout utilities only. Lives in `storefront/`. The classic Hydrogen line (CartForm, getSeoMeta) is legacy as of 2026-10-09 and is not used.
- **Hosting:** Oxygen, included on the Basic plan. Limits that shape code: workerd runtime, no Node APIs, 10 MB server bundle, 400 ms startup, 30 s CPU per request, `Date.now()` frozen per request. Three, GSAP, Lenis and the iJewel SDK live only in `*.client.tsx` modules.
- **Data:**
  - Products, variants, prices, photos: Shopify Storefront API 2026-10 through `createStorefrontClient` (private token, server only). Options are Version × Metal; size and engraving are line attributes. Product metafields `house.*` (tier, design, piece_type, house_ref, lead_time, made_to_order, engravable, sizes, specs, collections) and `custom.model_source_embed` are PUBLIC_READ. `house.versions` needs a definition created before it is readable.
  - Editorial (tiers, designs, collections' stories, stores, journal, House letter): the typed local catalog in `app/lib/catalog` and `app/lib/journal.ts` for launch; move to Shopify **metaobjects** (free, in admin, PUBLIC_READ) once the family needs to edit without a deploy. Sanity only if they outgrow that.
  - Builder: `app/lib/builder` (model, market, pricing, design codes) unchanged.
- **Commerce:** cart via `createCartServerHandlers` at `/api/cart` with the template's cart store and drawer; Shop Pay button rendered locally; Customer Accounts in phase 2 (needs HTTPS dev); analytics and consent via `ShopifyScripts`; predictive search handlers if search ships.
- **Builder rings and price-on-request:** a route `action` calls the Admin API (`draftOrderCreate` then invoice) with a secret `ADMIN_API_TOKEN`. The price is recomputed server-side from the design code; the client's number is never trusted.
- **Images:** Shopify CDN URL params (`?width=&height=&crop=`) with a hand-written srcset helper; stand-in photos in `public/photos` until the house designs are shot, then everything moves to Shopify Files.
- **SEO we own:** `meta` exports with canonical, Open Graph and JSON-LD ported from `site/src/lib/seo.tsx`; `sitemap.xml` and `robots.txt` resource routes; Open Graph images pre-rendered at build into `public/og/`.
- **3D:** react-three-fiber 9 + drei 10 + three 0.186, client-only, behind a poster facade; the builder route is a `clientLoader` route with a `HydrateFallback`. iJewel: iframe from the metafield for product pages, Mini Viewer IIFE loaded client-side for the band builder later.
- **Deploy:** GitHub CD from the Hydrogen channel; `npm run deploy` for manual; production environment set to Public. Domain cutover: americanjewelers.com to the Hydrogen storefront, checkout subdomain to Online Store.

## 5. Routes

`/` · `/royal-american` `/americana` `/new-american` (line pages) · `/designs/:slug` · `/collections/:slug` · `/pieces/:handle` (Shopify product) · `/build/ring` · `/build/band` · `/design/:code` and `/design/:code/certificate` · `/stores` and `/stores/:slug` · `/appointments` · `/house` · `/services` · `/commission` · `/journal` and `/journal/:slug` · `/natural-or-man-made` · `/care` · `/policies` · `/saved` · `/bag` · `/search` · `/account/*` (phase 2) · `*` (true 404).

Route templates tell Hydrogen that products live at `/pieces/:handle` and the cart at `/bag`.

## 6. Pages, in one line each (full blueprints in research/08)

- **Home:** wordmark line; photograph hero with eyebrow BRENTWOOD AND MT. JULIET, TENNESSEE and one line; the design of the season as a full-bleed macro with its name set large; the three lines as type with a hover photograph; the finished ring as a still with "Build on Signal"; the 12-second bench loop; the two stores as two columns; footer. Six screens, 110–150 words.
- **Line page:** stone standard as eyebrow, name, one sentence, the hand frame, design names with counts, an asymmetric 2 + 1 grid with four lines per card, one bridal sentence. Royal American: navy ground, the registry table instead of a grid.
- **Design page:** eyebrow, name, tagline; the stone is set; three feature screens alternating sides; the pieces; one sentence and "Build on" the design.
- **Product page:** gallery left with Photo | 3D toggle; sticky buy column right with Ref. line, one sentence, price and its tax note, Version tiles, Metal swatches, Size, Engraving, Add to bag, See it in store, Save; spec table; four accordions; Complete the set; Behind the design.
- **Builder:** the stone is set as the page top; the three settings as names; the configurator with the canvas on stone grey left and decisions right, engraving read live, two disclosures (the jeweler's adjustments; where the price comes from).
- **Stores:** exterior, name, street, phone, hours table, "what happens here" in 25 words, interior with the named person, one booking link, the review count in one line.
- **House:** the letter at 19px, four making photographs with captions, the mark, the brother's sentence if he gives one, "Come and see the bench."
- **Journal:** a list of date, title, one line; entries hold the long copy.
- **Services, commission, care, policies, natural-or-man-made, appointments:** ported, cut to budget, the old site's facts folded in (price list, warranty terms, process).

## 7. Build order

Phase 0, done 10/10: toolkit scaffold in `storefront/`, house stylesheet and fonts verified, catalog/builder/journal/ring ported and typechecking, Shopify catalog of 21 products in the store, Shopify AI toolkit and the 19 Hydrogen skills installed in the repo.

Phase 1, shell and reads (no store link needed; mock.shop):
1. Route templates and `app/routes.ts` for the map in §5; a true 404.
2. Header (wordmark line, eight items, Appointment · Saved · Bag), Footer (sitemap in small Caslon, two addresses, legal line, journal field), the cart drawer restyled to the velvet.
3. Home, the three line pages, design pages and collections from the local catalog, to the research/08 blueprints and word budgets.
4. Stores, House, Services, Commission, Care, Policies, Natural-or-man-made, Appointments, Journal.
5. SEO plumbing: meta, canonical, JSON-LD, sitemap, robots.

Phase 2, commerce (needs the owner's Hydrogen storefront link):
6. `/pieces/:handle` from the Storefront API: Version × Metal via the variant form, size and engraving as attributes, price, Shop Pay, iJewel facade, JSON-LD.
7. Bag and checkout through `/api/cart`; one real test order with attributes visible in admin.
8. Draft-order action for builder rings with server-side pricing; Resend for the appointment form.

Phase 3, the signature:
9. The ring on Hydrogen as a client module; `/build/ring` as a clientLoader route; design code pages and the certificate.
10. The stone is set (GSAP ScrollTrigger scrub + Lenis), pointer light, live engraving. Poster frames rendered for reduced motion and as the home still.

Phase 4, ship: Oxygen CD, production Public, smoke list (/ , a piece, a collection, /search, /bag, /account), then Customer Accounts, consent banner, the domain.

Phase 5, after launch: photography of the house designs replaces the stand-ins; metaobjects for the journal and stores; iJewel Mini Viewer for the band builder.

## 8. What the owner does (in Shopify admin, about fifteen minutes)

1. Sales channels: install **Hydrogen**, create storefront "American Jewelry" with GitHub continuous deployment pointed at this repo, root `storefront/`. Make the 21 products available to it. (This is a different channel from the Headless publication that already exists.)
2. Settings › Apps and sales channels › Develop apps: a custom app with `write_draft_orders`; paste its Admin token into the Hydrogen storefront's environment variables as `ADMIN_API_TOKEN` (never into chat). Add `SESSION_SECRET` (32+ random characters) the same way.
3. When accounts ship: enable the Customer Account API in the storefront settings.
4. Confirm Shopify Payments is active so Shop Pay shows.
5. At cutover: Settings › Domains, americanjewelers.com to the Hydrogen storefront as primary, checkout to Online Store; set the production environment to Public.

## 9. Open decisions for the family

- Typeface A (Libre Caslon) versus B (Fraunces, warmer) versus C (Adobe Caslon, paid). Default: A.
- Which old lines are design motifs (Arch, Honey, Stripes) and which are tags.
- Whether the signature feature runs on the home page too, or only on design pages and the builder. Default: not on home; the home shows the finished ring as a still.
- Lenis smooth scroll on or off. Default: off on product and text pages, on only where the ring assembly runs.
- Photography schedule: four object views per piece, the hand frame, the bench loop, the two exteriors.

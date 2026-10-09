# 02 — Jewelry e-commerce builders, PDP features, and 3D strategy

Research for American Jewelry (Brentwood + Mt. Juliet, TN). Site stack: Next.js on Vercel, Shopify behind it, iJewel3D viewer, custom-coded ring and band builders. Three tiers: **Royal American** (one-of-one), **Americana** (natural diamonds), **New American** (man made diamonds; the house says "man made", never "lab-grown").

Researched 2026-10-08. Every claim below carries its source URL. Where a site blocked fetching (With Clarity, Ritani, VRAI help pages partly), details come from the vendor's own blog/help pages or reputable third-party write-ups and are marked as such.

---

## 0. Executive read

1. The whole engagement-ring category converged on one flow: **Setting → Stone → Complete** (Brilliant Earth's literal step labels), with a sticky running price, a diamond table with 360 video, and a review step for size/engraving/ETA. Nobody does it beautifully; everybody does it functionally. The step-above is not more features, it is **one persistent 3D ring on screen through every step**, a **price ledger** instead of a price number, a **curated shortlist** instead of a 10,000-row table, and a **human handoff** (book / see it in store) attached to the design state.
2. James Allen is gone as a storefront (Signet folded it into Blue Nile in March 2026); its 360° diamond imaging is now table stakes everywhere, delivered by diamond-feed vendors (Nivoda, VDB) rather than built in-house.
3. iJewel3D is the right rendering engine and it **supports headless use**: the mini-viewer exposes `showConfigurator:false`, `showCard:false`, plugin APIs (`getPluginByType('RingConfigurator')`), URL material params, and its Wedding Band Builder has a documented headless mode (`hideWbbUi: true`) with a full method/event API and live geometry-derived pricing. So "custom UI, iJewel rendering" is a supported pattern, not a hack.
4. A fully custom react-three-fiber viewer is realistic for **bands** (procedural geometry) and **solitaires**; it gets expensive for pavé/halo settings and for diamond realism. Recommended: iJewel SDK headless under our own UI in Phase 1, with a thin `ViewerAdapter` so the UI never touches iJewel directly; keep r3f as a Phase 2 option for the band builder.
5. Compliance flag: FTC 16 CFR §23.25 lists "laboratory-grown," "laboratory-created," "[manufacturer name]-created," or "some other word or phrase of like meaning" as the required qualifiers. "Man-made" is not on the enumerated list. It is defensible as "of like meaning" but the spec line / certificate line on New American PDPs should carry an enumerated term at least once (e.g. "Man made (laboratory-grown) diamond, IGI #…").

---

## 1. Competitor builder flows (what is actually on the page)

### 1.1 Brilliant Earth — the reference flow

Source: https://www.brilliantearth.com/engagement-rings/settings/ , https://www.brilliantearth.com/loose-diamonds/search/ , https://www.brilliantearth.com/engagement-rings/ , https://www.diamonds.pro/guides/how-to-customize-engagement-ring/

- **Entry points:** "Start with a Setting", "Start with a Natural Diamond", "Start with a Lab Grown Diamond", "Start with a Gemstone".
- **Step indicator:** three numbered stages, literally labeled **"Choose Setting" → "Choose Diamond" → "Complete Ring"**, each with an icon. Third step = add to bag or save to wish list.
- **Step 1, settings grid:**
  - Filters: Setting Style (Vintage, Nature Inspired, Sculptural, Bezel, Cathedral, Hidden Halo, Solitaire, Classic, Three Stone, Luxe, Modern, Unique, Accents, Halo, Stacks Flush, East West, Gemstone); Metal (14K/18K Yellow, 14K/18K White, Platinum, 14K/18K Rose); Diamond Shape (oval, round, marquise, emerald, cushion, old mine, pear, radiant, princess, asscher, heart); Width (under 2mm / 2–3mm / over 3mm); Prong type (4 / 6 / double); setting price range.
  - Sort: Best Sellers, Newest, Price Low→High, High→Low.
  - Cards: name, image, **"From" price** when customizable, badges "Award Winning", "Most Loved"; metal swatches.
  - Transition copy after picking: "Complete your stack by adding a diamond to your selected engagement ring." + **"Browse Diamonds"** button.
  - A 3D setting tool lets the shopper "rotate … from every angle to see the profile, band width, and prong placement" (diamonds.pro).
- **Step 2, diamond table:**
  - Filters: Diamond Type (Natural / Lab Grown); Shape (visual grid); Carat min/max; Price min/max; Cut (Super Ideal, Ideal, Very Good, Good, Fair); Color D→; Clarity FL→; L:W ratio min/max; Fluorescence; Polish; Symmetry; Table %; Depth %; **Origin** (Canada, Botswana Sort, Angola, Recycled); **Lab** (IGI, GIA, HRD); Hearts & Arrows; **"Delivery On Or Before"** date filter.
  - Sort: Most Popular, price, carat, cut/color/clarity, shape, L:W.
  - **"Visual" / "List"** view toggle.
  - Cards: thumbnail with quick-ship indicator, carat/shape/cut/color/clarity, price, status labels **"Going Fast"**, **"Best Value"**.
  - **"Real View"** camera icon = 360° rotational inspection. Heart icon → compare table ("Click here to compare all of your favorite diamonds").
  - Detail: measurements, fluorescence, polish/symmetry, origin, certificate viewer, **"Blockchain Enabled"** badge for traceable stones.
  - CTAs: **"Add To Ring"** (in builder) vs **"Add To Bag"** (loose).
  - Education: inline tooltips ("A carat is the unit used to measure a diamond's weight") and links to Cut/Color/Clarity guides.
- **Timelines/policies surfaced in flow:** ready-to-ship rings 2–3 days; custom rings "typically take 4–6 weeks to ship"; estimated ship date shown on PDP and in cart. Free 30-day returns, lifetime warranty, "free 1-year resizes", "free 30-day exchanges". (https://www.brilliantearth.com/guides/free-ring-sizer/)
- **Sizing help:** free mailed ring sizer ("miniature belt" style, reusable) via a short form; printable chart; tips: measure mid/late day; **size up at least half a size for bands over 4mm**. (same URL)
- **Engraving:** script and block fonts; **15 characters women's / 20 men's**, more for a fee; symbols heart/infinity/degree; **not offered on engagement rings**, open/alternative/eternity bands. (via search summary; https://www.brilliantearth.com/guides/ring-engraving-ideas/)
- **Try-on:** on-PDP virtual try-on via **photo upload or live camera**, with skin-tone-aware rendering (third-party brand spotlight: https://www.photta.app/el/business/brands/brilliant-earth-virtual-try-on).
- **Service layer:** "Virtual Appointment" link in nav; chat; Affirm financing (site-wide).

### 1.2 Blue Nile (now also James Allen)

Source: https://www.bluenile.com/engagement-rings?jaRedirect=true , https://www.bluenile.com/diamonds/round-cut , https://instoremag.com/signet-to-sunset-james-allen-website-convert-brand-to-blue-nile-collection/ , https://yourdiamondteacher.com/reviews/james-allen-closing-down-blue-nile-merger/

- jamesallen.com 301-redirects to bluenile.com. Signet announced March 19, 2026 that James Allen stops as a standalone site and becomes a collection ("… By James Allen" in product titles). Warranties and the diamond upgrade program carry over.
- Entry points: **"Start With A Setting"** / **"Start With A Diamond"**, plus a **"Creative Studio"** ("Setting Price Starting From $1,250"). Numbered 1-2-3 steps.
- Cards show metal as clickable color swatches (platinum, yellow, white, rose).
- Diamond search: shape, price, carat, color K→D, clarity SI2→FL, cut Good/Very Good/Excellent, **"On Sale"** and **"Fast Shipping"** toggles, "Reset Filters", "Sort By: Best Match"; every stone GIA; **"Super Zoom"** on imagery. Blue Nile holds patents on "rotational video-like display of images of a gemstone in a viewer having a pan feature" (via search; https://patents.justia.com/patent/D701138 and GlobalData patent listing), i.e. their 360 is an image-sequence player.
- Nav: "Find Your Ring Size"; **"Engravable"** filter on settings; "Virtual Appointment"; chat; 1-800-242-2728; "Blue Nile Credit Card"; "Free Fast Shipping", "Free returns", "Free Limited Lifetime Warranty"; "Free gift with $1,500+ purchase".
- James Allen's legacy: "Diamond Display Technology" magnified stones 15× in 360° (https://pricescope.com/blog/james-allen-debuts-cutting-edge-diamond-display-technology-fancy-color-diamonds). Third-party view: "the visual gap between James Allen and Blue Nile had become virtually non-existent."

### 1.3 VRAI — the lab-diamond positioning benchmark

Source: https://www.vrai.com/engagement-rings , https://www.vrai.com/custom-engagement-rings , https://help.vrai.com/en/knowledge/can-i-engrave-my-ring , https://www.thezoereport.com/p/vrais-new-partnerings-line-features-customizable-engagement-rings-because-you-deserve-options-18236348

- **Vocabulary:** "VRAI created diamonds", never "synthetic" or "lab-grown" in their own copy; the explainer line is "VRAI-created diamonds are real diamonds… the same physical, chemical, and optical properties as mined diamonds. The only difference is their point of origin." This is the closest precedent for AJ's "man made" house term.
- PLP cards: ring name, shape, metal, **"From $1,150"**, button literally labeled **"Configure"**.
- Configurator axes: setting (8 core designs, e.g. The Signature, The Hover, halo, knife-edge, The Trio) × 7 diamond shapes × carat × metal × band style (plain vs pavé) = "over 500 variations".
- **Engraving:** up to **16 characters** incl. spaces, font **Script MT Bold**, inside band opposite the VRAI trademark, any language (non-English via support), no special characters/emoji, extra fee; custom engraving is "Final Sale".
- **Custom flow:** "Dream → Design → Make". Estimate after initial consult; final price only after design approval; 3D visualization before finalizing; made to order "ready in just 14 business days"; "cannot rush-order"; 8 North American + 2 European showrooms, virtual or in person.

### 1.4 With Clarity — Home Preview (try-at-home replicas)

Source (site 403s; vendor blog and press): https://www.withclarity.com/blogs/engagement-ring/test-driving-engagement-rings-at-home-with-claritys-home-preview-program , https://www.digitalcommerce360.com/?p=927446 , https://www.gemsociety.org/article/with-clarity-review/

- Shopper picks **two rings** in the builder; With Clarity ships **3D-printed replicas** (white metallic alloy + diamond simulant) **free both ways**; keep **3 days**, mail back, then finalize or try two more; **$50 per replica** if not returned.
- Framed as solving "FOBRO — fear of buying rings online".

### 1.5 Ritani — see it in store + transparent pricing

Source (site 403s; search summaries of https://ritani.com/pages/free-in-store-preview , https://beyond4cs.com/reviews/ritani/):

- **Free In-Store Preview:** "put down a credit card", Ritani handcrafts the ring, ships it to a partner jeweler / WeWork / Regus near the shopper; email when ready; no obligation; **orders $1,500+** only; take it home same day if you love it.
- **Transparent Diamond Pricing:** breaks price into "our cost to purchase the diamond, fulfillment costs, and our markup."

### 1.6 Taylor & Hart — bespoke flow benchmark

Source: https://www.taylorandhart.com/ , https://www.taylorandhart.com/us/bespoke-engagement-rings

- Four steps, verbatim: **"Create Your Design" → "Choose Your Stone" → "Review Your Design" → "Our Makers Bring It to Life"**.
- A shared **online design page** holds quotes, sketches and ideas per client.
- Stone options presented "within the quoted price range" after design direction is agreed.
- "Within a couple of days of confirming your centre gemstone, our team creates a 3D CAD render". **Three design amendments** included. Optional **resin mockup** (+5 working days).
- "In as little as three weeks our workshop will craft your ring"; express in "five working days"; progress updates during making.
- **Payment taken at checkout after final design approval** (no separate deposit stated). Custom designs "begin at just shy of £2,000".
- Guarantees: 90-day returns, lifetime warranty, "Lifetime Annual Care", free insured delivery, GIA/IGI on all diamonds. Consultations: NYC showroom (1411 Broadway, 16th Fl, Tue–Sat 10–7), virtual, phone, WhatsApp, email.

### 1.7 Independent bespoke jewelers — deposit and timeline norms

- **Valerie Madison** (https://valeriemadison.com/pages/the-custom-order-process): "$300 non-refundable deposit to begin searching for your perfect gem"; "Up to two adjustments are allowed before additional CAD fees of $250"; "8-12 weeks to complete"; "start at $3,500", typically $5k–$20k; "orders less than $5,000 will require payment in full. Orders $5,000+ may be split into two payments"; CAD renders by email; Calendly booking.
- **Laura Preshong** (https://laurapreshong.com/pages/custom-design): Discover → Curate → Design → Craft → Celebrate; **50% non-refundable design deposit**; first renders "3–5 business days", "four to five views" per CAD set; "one initial CAD set and up to two revision rounds, for a maximum of three render sets", $250 per extra round; ~6 weeks production after final payment and approval; "cosmetic design changes cannot be made once production starts"; bands from $2,000, engagement rings from $3,200, most settings $3,600–$5,600 + center stone.
- Category norm from the wider search (https://thediamondprice.com/learn/engagement-rings/custom-design/ , https://www.purelydiamonds.co.uk/help/bespoke-design-customisation/want-to-design-your-own-bespoke-ring): deposits 30–50%, first renders in 7–10 business days, three render sets included, 8–12 weeks total, production 4–6 weeks after approval.

---

## 2. Cross-cutting feature findings

### 2.1 Price updates
- Every builder shows **setting "From" price → setting price + chosen stone price = total**, recomputed on each selection; metal change re-prices the setting; engraving adds a flat fee (VRAI). Ritani alone decomposes the stone price. iJewel's Wedding Band Builder computes from geometry: `volumeMm3, weightGrams, metalPrice, makingCharge, diamonds, settingCost, finishSurcharge, subtotalUsd, markupMultiplier, totalUsd` (https://docs.ijewel3d.com/wedding-band-builder/api-reference.html).

### 2.2 Stone presentation
- Table + visual grid toggle, exhaustive filters (BE list above), 360 video per stone ("Real View" / "Super Zoom"), compare drawer, certificate viewer, origin/traceability badges, delivery-date filter, scarcity/value labels ("Going Fast", "Best Value").
- 360 videos come with the stone from feed vendors: **Nivoda** REST API with OAuth + webhooks for stock changes and a **per-stone media bundle (video, image, certificate PDF, certificate JSON)**, ~2M natural + lab stones, works with Shopify and custom builds (https://buyerhelp.nivoda.com/hc/en-gb/sections/34948286124561-API , https://nivoda.com/retail-tools , https://gautamkhorana.com/blog/rapnet-vs-nivoda-vs-idex-diamond-feeds-2026/). VDB and RapNet are the alternatives; most Shopify ring-builder apps are wrappers around one of these feeds.

### 2.3 Size selection and sizing help
- Size dropdown + "Find your ring size" guide + free mailed sizer + printable chart + resize policy (BE: free 1-year resizes). Width rule used by BE and the trade: **+½ size for bands over 4mm**; one jeweler blog states "half a size up for every 2mm increase in band width beyond 4mm" (https://www.justmensrings.com/blogs/justmensrings/does-ring-width-affect-fit-how-to-choose-the-right-size-for-wider-bands).
- Mejuri, Pandora, Chrono24 are Baymard's top-1% jewelry sites (2025 benchmark of 7 sites, 470+ parameters) — their size guides are the UX reference (https://baymard.com/blog/jewelry-and-watches-2025-benchmark).

### 2.4 Engraving UX
- Norms: 15–20 characters, 2–4 fonts, inside band, fee or free, "final sale" once engraved. Live preview is the differentiator: iJewel WBB renders "interior text engraving with multiple fonts, symbol support, and real-time 3D preview, included in spec sheet exports" (https://docs.ijewel3d.com/wedding-band-builder/features.html). Nivoda's platform offers a 25-char engraving preview but not through Shopify (https://buyerhelp.nivoda.com/hc/en-gb/articles/42856128615185-Is-engraving-available-for-Nivoda-rings).

### 2.5 Metal choice UX
- Swatch chips (Blue Nile) or labeled chips with karat (BE: "14K Yellow Gold" …); the image/3D re-renders; price re-computes. iJewel supports material switching via plugin (`materialPlugin.applyVariation(group, uuid)`) and via embed URL (`?Metal=Gold`, `#?Band=Rose-Gold&Gem=Ruby`) (https://docs.ijewel3d.com/integrations/embedding.html).

### 2.6 "See it on hand"
- Three approaches in market: (a) **live AR hand tracking** in browser (iJewel Try On, Banuba TINT, GlamAR, MirrAR, Makemetryon); (b) **photo upload** (Brilliant Earth does both; Tangiblee records a 4-second hand video); (c) **physical**: With Clarity replicas, Ritani in-store preview.
- Vendor table: https://www.glamar.io/blog/ar-ring-try-on-software-sdk . Pricing found: **Tangiblee $5,999/yr, 500 SKUs, 14-day trial** (https://apps.shopify.com/tangiblee-virtual-try-on); **Banuba TINT** no-code $49/$99/$349 per month by try-on volume, Shopify-embedded $319/$999/$1,599 per month (https://www.banuba.com/blog/banuba-tint-virtual-try-on-pricing-guide); **iJewel Try On** is web-only live hand/face tracking for rings/necklaces/earrings, iframe/Shopify/SDK, needs FBX/OBJ/GLTF/GLB models; branded on Free–Startup plans, white-label add-on $2,000/yr on Professional (https://ijewel3d.com/products/ijewel-tryon/ , https://ijewel3d.com/pricing/).
- Honest read: live AR ring try-on still reads as a novelty; finger segmentation and scale are approximate. The physical versions (replica, in-store) are what With Clarity and Ritani credit for conversion. AJ has two real stores, which is the stronger card.

### 2.7 Appointment booking
- All majors: "Virtual Appointment" in nav + a booking page; Taylor & Hart adds WhatsApp. On Shopify the common apps are **Sesami** (4.7 rating, Google Calendar, Klaviyo flows) and **Appointo** (Google Calendar + Zoom) (https://apps.shopify.com/sesami , https://www.appointo.me/blog/best-shopify-appointment-booking-apps). Independent jewelers use Calendly (Valerie Madison). For a Next.js front end a hosted scheduler embed (Cal.com/Calendly) with the design state passed as hidden fields is simpler than a Shopify app.

### 2.8 Financing (Affirm)
- Affirm's promotional messaging works on any site via `affirm.js` + `public_api_key`; element `<p class="affirm-as-low-as" data-page-type="product" data-amount="…cents…">` with `data-affirm-color`, `data-learnmore-show`; call **`affirm.ui.refresh()` whenever the price changes** (critical in a builder); prequalification modal on by default (https://docs.affirm.com/platforms/docs/about-promotional-messaging , https://docs.affirm.com/platforms/docs/customize-affirm-promotional-messaging). Affirm's own guidance: "Reframing prices as a budget-friendly monthly payment can increase average order values."

### 2.9 Reviews, chat, shipping/returns/warranty display
- Majors show a trust strip on PDP: free shipping, free returns (30 days BE; 90 days T&H), lifetime warranty, free resizing window. Reviews sit near add-to-cart; third-party reviews beat first-party (GemFind guide, https://gemfind.com/blogs/digital-marketing/slugjewelry-website-conversion-optimization-guide). Live chat icon in footer/corner on Blue Nile and BE.
- AJ already has 2,537 Google reviews (per client notes); surfacing Google reviews on PDP is a stronger trust signal than seeding a new review platform.

### 2.10 Education content
- BE's lab-diamond page pattern: product grid first, then "Lab Grown Diamonds" explainer ("The only difference between lab grown and natural diamonds is their origin…"), three value pillars (cost, supply-chain transparency, sustainability), IGI certification, then an FAQ that funnels to "Design Your Own Ring" (https://www.brilliantearth.com/lab-diamonds/). 4Cs delivered as inline tooltips in the diamond table plus standalone guides.

### 2.11 Gifting, wishlist, "drop a hint"
- Wishlist/"Hint List" + share with partner is a long-standing pattern (James Allen blog, The Knot "Drops the Hint" tool: https://www.nationaljeweler.com/galleries/the-week-in-photos/independents/ecommerce/4810-the-knot-drops-the-hint). Blue Nile runs "Free gift with $1,500+ purchase".

### 2.12 Custom/bespoke commission flows — the consolidated pattern
Brief (inspiration images, budget band, occasion/date) → consult (virtual/in-store) → estimate → **deposit** ($300 flat to source stone, or 30–50% of estimate) → stone options within budget → CAD renders (3–10 business days, 4–5 views) → up to 3 render sets, then $175–$250 per extra round → approval (design frozen) → craft 3–6 weeks with progress updates → final payment → delivery. Totals quoted: 14 business days (VRAI, pre-set designs) to 8–12 weeks (true bespoke).

---

## 3. 3D / AR vendors and tooling

### 3.1 iJewel3D (the chosen engine) — what it actually offers

Sources: https://ijewel3d.com/ , https://ijewel3d.com/pricing/ , https://docs.ijewel3d.com/ , https://docs.ijewel3d.com/viewer/introduction.html , https://docs.ijewel3d.com/viewer/viewer-class.html , https://docs.ijewel3d.com/ring-configurator/using-ring-configurator.html , https://docs.ijewel3d.com/integrations/embedding.html , https://docs.ijewel3d.com/integrations/shopify-embedding.html , https://docs.ijewel3d.com/wedding-band-builder/features.html , https://docs.ijewel3d.com/wedding-band-builder/api-reference.html , https://docs.ijewel3d.com/wedding-band-builder/frameworks/vanilla.html , https://webgi.dev/pricing

- **Products:** iJewel 3D (viewer), iJewel Try On, BatchX (batch renders), Playground (scene/material editor), SDK, iJewel Design, Drive (storage), Ring Configurator, Wedding Band Builder. Clients listed: Cartier, Swarovski, Van Cleef & Arpels, Bucherer.
- **Formats:** 3DM, FBX, STL, OBJ, GLTF, GLB. Plugins for MatrixGold, CounterSketch, Rhino.
- **Engine:** WebGL on three.js via **threepipe** (open source, Apache 2.0) with WebGI plugins; "possible to render 100s of diamonds at once, even on mobile".
- **Embedding:**
  - **iframe** generated from the Embed tool; URL can preset materials: `https://ijewel3d.com/drive/files/{MODEL_ID}/embedded?Metal=Gold` or `#?Band=Rose-Gold&Gem=Ruby` (key = layer name, value = variation name).
  - **Mini Viewer SDK (JS):** CDN scripts `https://releases.ijewel3d.com/libs/webgi-v0/bundle-0.22.0.js` + `https://releases.ijewel3d.com/libs/mini-viewer/0.6.18/bundle.nowebgi.iife.js` (docs: "We regularly update the version numbers"); npm tarball `@ijewel3d/mini-viewer` via `https://releases.ijewel3d.com/libs/web/ijewel3d-mini-viewer-0.3.20.tgz`. Constructor: `new ijewelViewer.Viewer(container, project, viewerOptions)`; project has `modelUrl`, `basePath`, `posterUrl`, `logo`, `cameraConfig`; loads GLB directly or from Drive; events `ijewel-viewer-ready`, `ijewel-scene-ready`.
  - **Custom UI is supported** via ViewerOptions: `showLogo`, `showCard`, `showUiButtons`, `showZoomButtons`, `showConfigurator`, `hideCameraViews`, `hideRotateCamera`, `hideGltfAnimations`, `hideFitScene`, `hideFullScreen`, `hideShareButton`, `hideTryOn`, `enableZoom`, `enableScrollWheel`, `disableInteractionPrompt`, plus `headerComponent` ("inject a custom React component into the viewer's header area") — i.e. the mini-viewer is React-based.
- **Ring Configurator plugin:** components (heads, shanks, bands) with variations snapping to named anchor meshes ("multiple anchors on a single shank", needs mini-viewer ≥ 0.6.10); materials via MaterialConfiguratorPlugin. Programmatic: `const rc = viewer.getPluginByType('RingConfigurator'); rc.components[i].variations; .selectedIndex; await component.applyVariation(v); await materialPlugin.applyVariation(group, material.uuid)`. Events `componentProcessed`, `refreshUi` (register before load). Deployment: iframe, share link, Drive-hosted custom page, or **fully self-hosted JSON project**. SKU/pricing mapping is referenced but not specified — pricing is ours to build.
- **Wedding Band Builder (very relevant to the band builder):** 7 profiles (D-Shape, Flat, Comfort, Knife Edge, Beveled, Concave, Round; custom Rhino profiles need "Silver plan or above"); width in 0.5mm, thickness in 0.25mm steps; US/EU/UK sizes; 14k/18k/22k in three colors + carbon; 7 finishes; up to 5 color zones; inlays/overlays/sleeves; 14 diamond setting types; edges/grooves; engraving with live 3D preview; **live pricing from real geometry**; spec-sheet/CNC export; His & Her linked rings; **headless mode** (`hideWbbUi: true`, "No built-in UI renders; all interaction via API calls") with guides for Vanilla, React, Vue 3, Next.js, Angular, Svelte; API: `setProfile`, `setWidthMm`, `setHeightMm`, `setRingSize(radiusMm)`, `setMaterial(slot, metal, finish)`, `setPartition`, `setDiamonds`, `setEdge`, `setEngraving(text, font, fontSize)`, `getPrice`, `getSpecSheetData`, `exportConfig`, `saveConfiguration`, `getDesignCode`, `getShareUrl`, `applyDesignLink`, `undo/redo`, `batch({...})`; events `price:updated`, `dimensions:changed`, `material:changed`, `engraving:changed`, `validation:warning`, `build:complete`, etc.; cross-origin postMessage bridge documented. Theming via CSS custom properties, 11 presets.
- **Shopify integration:** manual, not an app. Product metafield `custom.model_source_embed` (type URL) + Liquid `{%- assign ijewel_viewer_url = product.metafields.custom.model_source_embed.value -%}` → iframe with `allow="autoplay; fullscreen; xr-spatial-tracking; web-share"`. Docs say the iframe route "does not support direct variant-to-model mapping"; use the Mini Viewer SDK when "Shopify variants or custom page controls must interact directly with the viewer." For a headless Next.js front end the metafield is readable via Storefront API and the SDK route is the natural one.
- **Platform pricing (public):** Free $0/yr (100 models, iframe, iJewel-branded Try On and configurators, Viewer SDK, model encryption); Premium $200/yr (+Design Premium, Batch Renderer, 30 GB/mo bandwidth); Startup $600/yr (250 models, 100 MB uploads, custom logo); **Professional $1,500/yr** (1,000 models, one white-label domain, no attribution on embeds, white-label Ring Configurator, 200 MB uploads); add-ons: custom domain $500/yr, +200 models $200/yr, **Try-On white-label $2,000/yr**. Enterprise on request.
- **SDK/plugin licensing (webgi.dev):** threepipe core + "Realistic Lighting Pack" (SSAO, SSR, bloom, TAA, contact shadows, DoF, SSGI…) free for commercial use; **Diamond Pack from $300/month billed annually, per domain** (diamond rendering up to 6 bounces / 2,000 vertices, Screen Space Bevel, asset library, GI pack); **Advanced Pack from $1,000/month** (adds Ring TryOn hand tracking + segmentation, gemstones with inclusions, chain physics, caustics, sparkle). "Configurators and SaaS" custom-priced.
- **Open question to put to iJewel sales:** does the Professional platform plan cover self-hosted Mini Viewer SDK use on americanjewelry's domain, or does a self-hosted/headless build trigger the per-domain Diamond Pack license ($3,600/yr)? The docs imply the Viewer SDK is in every plan, but the webgi page prices the diamond plugin separately. Get it in writing before architecture is locked.
- **ShapeDiver + iJewel:** parametric Grasshopper models rendered in iJewel materials, but "only available within ShapeDiver Apps", materials via `.pmat` → JSON "MaterialDatabase" (https://help.shapediver.com/doc/shapediver-ijewel3d-integration , https://github.com/shapediver/AppBuilderIJewel3D MIT). ShapeDiver plans Free / €99 / €299 (viewer API) / €699 (full API) per month (https://www.capterra.com/p/165993/ShapeDiver/pricing/). Interesting for a true parametric head/prong system later; not Phase 1.

### 3.2 Shopify native 3D/AR

Sources: https://help.shopify.com/en/manual/products/product-media/product-media-types , https://shopify.dev/docs/storefronts/themes/product-merchandising/media/support-media , https://shopify.dev/docs/api/storefront/latest/objects/Model3d , https://shopify.dev/docs/api/hydrogen-react/latest/components/media/modelviewer

- Upload **GLB or USDZ, up to 500 MB**; Shopify auto-converts so **both .USDZ and .GLB exist**; files over 15 MB are auto-optimized. Images ≤ 20 MB / 25 MP; video ≤ 1 GB, 10 min, 4K.
- Storefront API `Model3d` → `sources { url format mimeType filesize }`, `previewImage`, `alt`, `presentation`.
- Rendering: Google `<model-viewer>` (Apache 2.0); Liquid `model_viewer_tag`; Shopify-XR launches **AR Quick Look (iOS Safari, needs USDZ)** and **Scene Viewer (Android)**. `@shopify/hydrogen-react` ships `<ModelViewer data={model3d}>` with `onArStatus`/`onArTracking` callbacks, but it pins `@google/model-viewer` 1.21.1 (old); in Next.js use `@google/model-viewer` directly with `ar ar-modes="webxr scene-viewer quick-look" ios-src={usdz}`.
- Verdict: free, zero-maintenance, excellent for **AR "place it on the table"**; diamonds look like glass (no internal refraction), and there is no configurator. Use it as the AR fallback on PDPs, not as the builder.

### 3.3 Shopify ring-builder apps (what "buy" looks like)

Source: https://www.rubykinglet.ai/insights/best-jewelry-configurators-2026 , https://www.rubykinglet.ai/insights/ring-builder-for-shopify , https://apps.shopify.com/brilliance-builder , https://ringfacet.com/ , https://apps.shopify.com/keyideas-jewelith-ring-bracelet-necklace-design-studio

| Product | Price | Diamond feed | Notes |
|---|---|---|---|
| Ring Facet | ~$70/mo | no | budget 3D builder |
| Custom Ring Builder | $99/mo | yes | zero reviews |
| Keyideas RingBuilder / Jewelith Studio | $145/mo; $50–125/mo | yes / no | component-based 3D, 1-month launch claim |
| Brilliance Builder | $199–375/mo | yes | purpose-built for ER retailers |
| GemFind RingBuilder | $295–345/mo | yes | enterprise, feed-centric |
| VDB Ring Creator | $2–3k setup + $150–550/mo | yes (VDB) | most-reviewed (14) |
| Zakeke / Kickflip | $60–300/mo **+1.5–1.95% per order** | no | generic configurators |
| Threekit | enterprise quote | no | agency setup |
| Gemist | from $500/mo | no | managed AI-bespoke |

All of them impose their own UI inside a Shopify theme. None fits "custom-coded builders on a Next.js front end with every design our own." They are useful only as a price anchor: a bought builder costs $1.7k–$6.6k/yr plus the feed, and still needs a designer to make it look like the house.

### 3.4 Building our own viewer with react-three-fiber

Sources: https://github.com/pmndrs/drei (9.9k stars, active), https://drei.docs.pmnd.rs/shaders/mesh-refraction-material , https://github.com/yomotsu/camera-controls (2.4k stars, 971 commits, MIT; `fitToBox`, `fitToSphere`, `setLookAt`, `setBoundary`, `smoothTime`, `draggingSmoothTime`, events `controlstart/update/sleep/rest`; exposed in drei as `<CameraControls>`), https://r3f.docs.pmnd.rs/getting-started/examples (live demos: https://pmndrs.github.io/examples/diamond-ring/ "refraction, instanced", https://pmndrs.github.io/examples/diamond-refraction/ , https://pmndrs.github.io/examples/caustics/), https://discourse.threejs.org/t/jewelry-websites-with-three-js/54600 , https://discourse.threejs.org/t/how-to-make-diamond-looks-real/42095 , https://threejs.org/docs/pages/MeshPhysicalMaterial.html

- **Diamonds:** drei `MeshRefractionMaterial` (props `envMap` required, `bounces` default 2, `ior` 2.4, `fresnel`, `aberrationStrength` for dispersion, `color`, `fastChroma`), BVH-accelerated ray marching (three-mesh-bvh); pair with `<CubeCamera>` for scene reflections. The pmndrs "Diamond Ring" demo instances the pavé stones with this material. three.js `MeshPhysicalMaterial.dispersion` exists for transmissive glass but is the wrong tool for faceted stones; WebGPU transmission support is still uneven.
- **Non-negotiable asset rule** from the three.js forum: the stone meshes must be **real cut geometry** (closed, faceted); "your model had no natural diamonds. They were fake and this would not allow internal refractions to work." Also expect to crush CAD exports (one example 12 MB → 631 KB via gltfjsx/Draco).
- **Metals:** `MeshStandard/PhysicalMaterial` + a studio HDRI (`<Environment>` / `<Lightformer>`), `<AccumulativeShadows>` or `<ContactShadows>`, `<Stage>`/`<Bounds>`/`<Center>` for framing. Post-processing (SSR, SSAO, bevel) is where WebGI/threepipe is ahead; threepipe's lighting plugins are free and can be used alongside or instead of r3f.
- **Bands are the easy, high-value case:** a band is a profile curve swept around a circle, so width/thickness/size/profile can be **generated procedurally** (`THREE.LatheGeometry`/`ExtrudeGeometry` along a circular path) with no per-variant CAD; engraving is a decal on the inner surface. Settings are the hard case: prong geometry must fit each stone size/shape, so each setting needs a per-size GLB family or a parametric system (ShapeDiver-class).
- Realistic effort: a polished solitaire + band viewer with good lighting, camera presets, and a decent diamond is 4–8 weeks for one experienced r3f dev; pavé/halo at iJewel quality and mobile performance tuning is the open-ended part. Maintenance is ours forever.

---

## 4. Synthesis

### 4.1 Best-in-class builder flow, then 8 ways ours is a step above

**Baseline (what everyone ships):** Setting (filter grid, "From" price, metal chips) → Stone (table/visual, filters, 360 video, compare, certificate) → Complete (size, engraving, ETA, Affirm, add to bag / save / book appointment). Two entry points (setting-first, stone-first). Sticky summary with running total.

**Ours — concrete UI ideas:**

1. **One ring, never leaves the screen.** A persistent 3D stage (iJewel mini-viewer headless) occupies the left/top; steps are a thin rail on the right/bottom. Choosing a stone drops it into the setting live via the RingConfigurator anchor, not an image swap. Camera presets per step: "Profile" when choosing band width, "Top" when choosing stone, "Inside" when engraving. The majors still swap JPEGs between steps.
2. **Price as a ledger, not a number.** Setting + center stone + accents + engraving + tax/shipping lines, updated per selection, with Affirm "as low as" refreshed on every change (`affirm.ui.refresh()`). Add a **tier switch** on the same setting: "Americana (natural) $X / New American (man made) $Y" side by side at identical spec. No competitor can show that toggle because none has the three-tier model.
3. **Curated shortlist over the 10,000-row table.** First screen of the stone step: "Our gemologist's six for this setting at your budget" (three natural, three man made), each with 360 video, one-line why ("Ideal cut, eye-clean VS2, faces up like a 1.2 ct"). "Browse all" opens the full table with BE-grade filters and a compare drawer that plays 360 videos side by side.
4. **True-scale on hand.** Before AR: a static "scale truth" strip — the chosen stone at real millimeter size over a reference (a US quarter, a finger silhouette at the chosen ring size), and a carat slider that resizes it at true scale. AR try-on (iJewel Try On or Banuba) is Phase 2 behind a feature flag.
5. **Sizing that knows the band width.** Size step pre-fills the +½ rule when width > 4mm, offers "Size later — free resize within 60 days" as a first-class choice, and a one-click "mail me a free sizer" that holds the design. In the band builder the size is a dimension of the geometry (iJewel `setRingSize(radiusMm)`), so the preview is literally the right size.
6. **Engraving you can read on the ring.** Live 3D inside-band preview (iJewel WBB `setEngraving`; decal in our own viewer), house typefaces only, character counter, a "flip to inside" camera preset, and a plain note that engraved pieces are final sale.
7. **Design code + "send it on."** Every state serializes to a short code and URL (pattern: iJewel `getDesignCode()/getShareUrl()`, our own for the ring builder). "Save to account", "Send to someone" with an option to hide price (the Drop-a-Hint pattern), and the exact rendered ring in the follow-up email/retargeting instead of a stock photo.
8. **Human handoff attached to the design.** From any step: "Ask a jeweler about this" → opens booking (Cal.com/Sesami) with the design code and a render in hidden fields; "See it in Brentwood / Mt. Juliet" → in-store preview with a card hold, borrowing Ritani's mechanic but with our own stores; for Royal American, "Start a commission from this" pre-fills the brief. This is the family-store advantage the online majors cannot copy.

### 4.2 PDP must-haves, ranked

1. Imagery: 3D viewer (iJewel) + on-hand photo + short video, **true-scale** indicator; AR Quick Look via Shopify GLB/USDZ.
2. Price + Affirm "as low as" + tier context (which tier, what that means in one line).
3. Selectors with live re-render: metal, size (with guide + free sizer + resize policy), engraving (live preview), stone upgrade link into the builder.
4. Stone facts: carat/shape/cut/color/clarity, lab + report number with viewer, origin/traceability, and for New American the enumerated FTC qualifier on the spec line.
5. Delivery truth: "Ready to ship" vs "Made to order — ships by <date>" computed per configuration; shipping/returns/warranty/resize strip under the CTA.
6. Reviews near add-to-cart (surface the 2,537 Google reviews; product-level reviews later).
7. "Ask a jeweler" (chat/text) + "Book an appointment" + "See it in store".
8. Education inline: 4Cs tooltips, "natural vs man made" explainer, care instructions.
9. Save / wishlist / send-to-someone (price optional).
10. Gifting: gift note, gift receipt without price, box/wrap.
11. Matching band / complete-the-set, with the band builder pre-set to the ring's width.
12. House credits: designer, where made, hallmark, warranty terms in plain English.

### 4.3 Build custom vs buy

**Build (it is the product):** builder UI and state machine; pricing engine (setting × metal × size × stone × engraving, server-validated); stone shortlist/curation logic; design code/share/save; PDP; commission flow (brief → consult → deposit → design page with renders → approvals → progress → delivery); viewer chrome and camera choreography via a `ViewerAdapter` interface.

**Buy / integrate:**
- Rendering: iJewel3D (Professional plan + confirm SDK/Diamond Pack licensing).
- Stone inventory + 360 videos + certificates beyond the vault: Nivoda (or VDB) feed for Americana/New American.
- AR Quick Look: Shopify GLB/USDZ + `<model-viewer>` (free).
- Try-on: Phase 2 — iJewel Try On (white-label $2k/yr) or Banuba TINT; do not build.
- Financing: Affirm promotional messaging (already live for the store) + Affirm at Shopify checkout.
- Booking: Cal.com or Sesami embed with design-state hidden fields.
- Reviews: Google review import widget first; product reviews app later.
- Chat/SMS: existing provider; do not build.
- Deposits for commissions: Shopify deferred purchase options (selling plan `category: PRE_ORDER`, checkout charge, remaining balance `EXACT_TIME` or `TIME_AFTER_CHECKOUT`, vaulted payment via `orderCreateMandatePayment`; requires Shopify Payments/PayPal/Adyen/Stripe) or a pre-order app that wraps them (https://shopify.dev/docs/apps/build/purchase-options/deferred). Simpler fallback: a fixed-price "Design deposit" product + draft order for the balance.
- Cart data model: custom-built rings go into the cart as a base variant + `attributes` (key/value line-item properties: design code, stone ID/report, engraving text, size) via Storefront `cartLinesAdd` (up to 250 lines; `sellingPlanId` supported) (https://shopify.dev/docs/api/storefront/latest/mutations/cartLinesAdd). Shopify now allows **2,048 variants/product** (all merchants since Oct 15, 2025; GraphQL product APIs only) so metal × size can be real variants while stone/engraving ride on attributes (https://shopify.dev/changelog/the-product-variant-limit-is-now-2048-for-all-merchants).

### 4.4 Recommended 3D strategy

**Recommendation: iJewel Mini Viewer SDK, headless, under our own React UI; Shopify native GLB/USDZ for AR; keep r3f as a Phase 2 option for the band builder.**

| Option | Diamond realism | Custom UI | Cost | Lock-in / maintenance | Verdict |
|---|---|---|---|---|---|
| A. iJewel SDK headless (`showConfigurator:false`, `showCard:false`, `hideTryOn`, RingConfigurator + WBB APIs) | best available in-browser (6-bounce diamonds, bevel, GI) | yes — documented headless modes, events, React injection | $1,500/yr platform; possibly +$3,600/yr Diamond Pack per domain; WBB custom profiles need "Silver" | vendor; CDN version churn ("we regularly update the version numbers"); React coupling | **Phase 1** |
| B. iJewel iframe embeds | same | no — their chrome, URL material params only | cheapest | low effort, but violates "every design their own" | PDP-only fallback, not builders |
| C. Own r3f viewer (drei `MeshRefractionMaterial`, `CameraControls`/camera-controls, Environment, instanced pavé; procedural bands) | good for solitaires/bands; pavé/halo and mobile perf are the risk | total | dev time (4–8 wks base, open-ended polish) | none; all ours | **Phase 2 for band builder**, or Plan B if iJewel licensing surprises |
| D. Shopify `<model-viewer>` GLB/USDZ | glass-like stones, no configurator | limited | free | none | AR Quick Look only |

Architecture note: wrap the engine in a `ViewerAdapter` (`load(model)`, `setComponent(slot, variation)`, `setMaterial(slot, id)`, `setCamera(preset)`, `setEngraving(text)`, `snapshot()`, `on(event)`) so builders are written against our contract, iJewel is the first implementation, and an r3f implementation can replace it per builder without touching the UI.

### 4.5 Risks

1. **FTC wording.** §23.25 enumerates "laboratory-grown," "laboratory-created," "[manufacturer name]-created," or "some other word or phrase of like meaning"; "man-made" is not in the text (https://www.law.cornell.edu/cfr/text/16/23.25). Keep "man made" as the house term in marketing copy, but put an enumerated qualifier on the spec/certificate line and in the product title metadata; have counsel confirm.
2. **iJewel licensing ambiguity.** Platform plan vs per-domain SDK Diamond Pack; white-label try-on separate; WBB custom profiles gated to a "Silver" plan not on the public price page. Get a written quote for: self-hosted mini-viewer on our domain, RingConfigurator, WBB headless, Try On white-label.
3. **Version churn / React coupling.** iJewel ships unversioned-looking CDN bundles that change; pin versions and self-host the bundles; isolate behind the adapter.
4. **Pricing integrity.** Any client-side ledger must be recomputed server-side; Shopify cannot accept an arbitrary line price from the Storefront API, so the cart must resolve to real variants (metal × size) plus a stone line (feed stone as its own product/variant created on demand) plus engraving as an attribute — design the SKU/variant model before the UI.
5. **Feed inventory risk.** Nivoda/VDB stones can sell elsewhere between "add to ring" and checkout; hold windows and webhooks for stock changes are required, plus honest "reserved for 30 minutes" UI.
6. **Asset pipeline discipline.** Stones must be true cut geometry; settings need per-size/shape GLB families (or a parametric system); CAD exports must be decimated. This is the long pole regardless of engine.
7. **Mobile performance.** WebGL with refractive diamonds on mid-range phones; need poster fallbacks, lazy init, and reduced bounces on mobile.
8. **AR try-on expectations.** Live hand try-on is approximate; position it as "see the look", not "see the fit". Physical in-store preview is the real conversion lever.
9. **Price anchoring.** VRAI "From $1,150", Blue Nile "Setting Price Starting From $1,250", BE 4–6 week custom. AJ's premium requires visible proof (house design credits, American making, warranty/care) on every PDP, or the comparison shopper reads the price as unexplained.
10. **Deposits and final-sale rules.** Engraved/custom items are non-returnable at every competitor; the UI must say so before payment. Deposits need Shopify Payments-class gateways and a selling-plan or app; test the vaulted-balance flow end to end.

---

## 5. Source index

Competitors
- https://www.brilliantearth.com/engagement-rings/ · https://www.brilliantearth.com/engagement-rings/settings/ · https://www.brilliantearth.com/loose-diamonds/search/ · https://www.brilliantearth.com/lab-diamonds/ · https://www.brilliantearth.com/guides/free-ring-sizer/ · https://www.brilliantearth.com/guides/ring-engraving-ideas/
- https://www.diamonds.pro/guides/how-to-customize-engagement-ring/ · https://www.diamonds.pro/reviews/brilliant-earth/
- https://www.photta.app/el/business/brands/brilliant-earth-virtual-try-on
- https://www.bluenile.com/engagement-rings?jaRedirect=true · https://www.bluenile.com/diamonds/round-cut
- https://instoremag.com/signet-to-sunset-james-allen-website-convert-brand-to-blue-nile-collection/ · https://www.jckonline.com/editorial-article/signet-shuts-james-allen-rocksbox/ · https://yourdiamondteacher.com/reviews/james-allen-closing-down-blue-nile-merger/ · https://pricescope.com/blog/james-allen-debuts-cutting-edge-diamond-display-technology-fancy-color-diamonds
- https://www.vrai.com/engagement-rings · https://www.vrai.com/custom-engagement-rings · https://help.vrai.com/en/knowledge/can-i-engrave-my-ring · https://www.thezoereport.com/p/vrais-new-partnerings-line-features-customizable-engagement-rings-because-you-deserve-options-18236348
- https://www.withclarity.com/blogs/engagement-ring/test-driving-engagement-rings-at-home-with-claritys-home-preview-program · https://www.digitalcommerce360.com/?p=927446 · https://www.gemsociety.org/article/with-clarity-review/
- https://ritani.com/pages/free-in-store-preview · https://beyond4cs.com/reviews/ritani/
- https://www.taylorandhart.com/ · https://www.taylorandhart.com/us/bespoke-engagement-rings
- https://valeriemadison.com/pages/the-custom-order-process · https://laurapreshong.com/pages/custom-design · https://thediamondprice.com/learn/engagement-rings/custom-design/
- https://baymard.com/blog/jewelry-and-watches-2025-benchmark · https://baymard.com/research/jewelry-and-watches · https://gemfind.com/blogs/digital-marketing/slugjewelry-website-conversion-optimization-guide
- https://www.justmensrings.com/blogs/justmensrings/does-ring-width-affect-fit-how-to-choose-the-right-size-for-wider-bands · https://www.nationaljeweler.com/galleries/the-week-in-photos/independents/ecommerce/4810-the-knot-drops-the-hint

iJewel3D / WebGI / ShapeDiver
- https://ijewel3d.com/ · https://ijewel3d.com/pricing/ · https://ijewel3d.com/products/ijewel-tryon/ · https://ijewel3d.com/products/wedding-band-builder
- https://docs.ijewel3d.com/ · https://docs.ijewel3d.com/viewer/introduction.html · https://docs.ijewel3d.com/viewer/viewer-class.html · https://docs.ijewel3d.com/ring-configurator/using-ring-configurator.html · https://docs.ijewel3d.com/integrations/embedding.html · https://docs.ijewel3d.com/integrations/shopify-embedding.html · https://docs.ijewel3d.com/wedding-band-builder/features.html · https://docs.ijewel3d.com/wedding-band-builder/api-reference.html · https://docs.ijewel3d.com/wedding-band-builder/frameworks/vanilla.html · https://docs.ijewel3d.com/wedding-band-builder/measurement-system.html
- https://webgi.dev/pricing · https://webgi.dev/v0/ · https://github.com/spartan-1337/threepipe
- https://github.com/shapediver/AppBuilderIJewel3D · https://help.shapediver.com/doc/shapediver-ijewel3d-integration · https://www.capterra.com/p/165993/ShapeDiver/pricing/

Shopify
- https://help.shopify.com/en/manual/products/product-media/product-media-types · https://shopify.dev/docs/storefronts/themes/product-merchandising/media/support-media · https://shopify.dev/docs/api/storefront/latest/objects/Model3d · https://shopify.dev/docs/api/hydrogen-react/latest/components/media/modelviewer · https://modelviewer.dev/docs/index.html
- https://shopify.dev/docs/api/storefront/latest/mutations/cartLinesAdd · https://shopify.dev/changelog/the-product-variant-limit-is-now-2048-for-all-merchants · https://shopify.dev/docs/apps/build/purchase-options/deferred
- Ring-builder apps: https://www.rubykinglet.ai/insights/best-jewelry-configurators-2026 · https://www.rubykinglet.ai/insights/ring-builder-for-shopify · https://apps.shopify.com/brilliance-builder · https://ringfacet.com/ · https://apps.shopify.com/keyideas-jewelith-ring-bracelet-necklace-design-studio · https://pencildesign.co/blog/ring-builder-apps
- Booking: https://apps.shopify.com/sesami · https://www.appointo.me/blog/best-shopify-appointment-booking-apps

Try-on
- https://www.glamar.io/blog/ar-ring-try-on-software-sdk · https://apps.shopify.com/tangiblee-virtual-try-on · https://www.banuba.com/blog/banuba-tint-virtual-try-on-pricing-guide · https://www.banuba.com/ar-ring · https://www.photta.app/resources/ring-try-on-guide

Diamond feeds
- https://buyerhelp.nivoda.com/hc/en-gb/sections/34948286124561-API · https://nivoda.com/retail-tools · https://gautamkhorana.com/blog/rapnet-vs-nivoda-vs-idex-diamond-feeds-2026/ · https://buyerhelp.nivoda.com/hc/en-gb/articles/42856128615185-Is-engraving-available-for-Nivoda-rings

Financing
- https://docs.affirm.com/platforms/docs/about-promotional-messaging · https://docs.affirm.com/platforms/docs/customize-affirm-promotional-messaging · https://apps.shopify.com/affirm

three.js / r3f
- https://github.com/pmndrs/react-three-fiber · https://github.com/pmndrs/drei · https://drei.docs.pmnd.rs/shaders/mesh-refraction-material · https://github.com/yomotsu/camera-controls · https://r3f.docs.pmnd.rs/getting-started/examples · https://pmndrs.github.io/examples/diamond-ring/ · https://pmndrs.github.io/examples/diamond-refraction/ · https://discourse.threejs.org/t/jewelry-websites-with-three-js/54600 · https://discourse.threejs.org/t/how-to-make-diamond-looks-real/42095 · https://threejs.org/docs/pages/MeshPhysicalMaterial.html

Regulatory
- https://www.law.cornell.edu/cfr/text/16/23.25 · https://www.jckonline.com/magazine-article/2019-lab-grown-diamond-report-2/ · https://news.centurionjewelry.com/articles/detail/revised-ftc-guidelines-remove-natural-from-definition-of-diamond

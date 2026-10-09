# 03 — Stack research: Headless Shopify + 3D + Vercel + SEO/AEO for American Jewelry

Date: 2026-10-08. Scope: technical stack for the new luxury site (Next.js on Vercel, Shopify commerce, iJewel3D, custom ring/band builders). Catalog hierarchy: Tier (Royal American / Americana / New American) → Design motif (Shooting Star, Prism, …) → piece type (ring, band, signet, pendant, bracelet, dog tag) → version (diamond / solid gold / gemstone) → curated Collections across designs (e.g. "Family" = birthstones). Mostly made-to-order (2–4 weeks), some ready-to-ship, one-of-one pieces price-on-request. Site runs on a Vercel URL first, then americanjewelers.com alongside the legacy Lightspeed site at american.jewelry.

Everything below is sourced from current (2025–2026) docs; URLs are inline and collected at the end. Items I could not verify from a primary source are marked **[verify]**.

---

## 0. Executive summary (the decisions)

1. **Front end = Next.js 16 App Router on Vercel, talking straight to the Shopify Storefront API (version `2026-10`) through a small typed client of our own.** Use vercel/commerce's `lib/shopify` + cart server actions as the reference pattern (fragments, `'use cache'` + `cacheTag`, webhook revalidation), not as a wholesale fork. Do not build production on the new Hydrogen developer preview yet (API explicitly "will change"), but shape our client so `@shopify/hydrogen` core can replace it when it goes GA. Hydrogen-on-Oxygen (React Router) is the wrong fit for a Vercel-hosted Next site.
2. **Catalog modelling:** Tier and Design motif are **metaobjects**; piece type = `productType` (+ Shopify standard product category); **version = its own product** ("Shooting Star Ring — Diamond"), siblings linked by a `aj.design` metafield; Metal and Size are the product **options** (3-option / 2,048-variant limits are fine); curated Collections = Shopify collections. Made-to-order / ready-to-ship / price-on-request is a product metafield enum, not a different product type.
3. **Price on request:** Shopify has no native POR. Keep POR pieces in Shopify at price 0, `availableForSale=false`, published only to the Headless channel, with `aj.pricing_mode=inquire`; the site renders an Inquire flow; closing happens via **Admin API draft orders** (custom line item + `draftOrderInvoiceSend`). Never let POR items reach Google/Shop/Catalog channels.
4. **Builder → cart:** priced dimensions become variants (Metal × Size; for bands Metal × Width), everything else (engraving, font, stone choice, profile, finish, builder config id + snapshot URL) travels as **cart line `attributes`** (key/value, `_`-prefixed keys hidden at checkout). Hand off with `cartCreate`/`cartLinesAdd` and redirect to `cart.checkoutUrl` on a custom checkout subdomain (available on all plans). Fully bespoke configs fall back to draft orders.
5. **3D:** ship **GLB** everywhere (model-viewer for PDPs with `poster` + lazy/interaction reveal; AR via `ar-modes="webxr scene-viewer quick-look"`, USDZ auto-generated for iOS). iJewel3D is the **asset pipeline + wedding-band configurator engine** (MatrixGold/Rhino plugins, layer-named auto materials, Draco export, headless Wedding Band Builder API with `getSnapshot()`/`getPrice()`), not the general viewer. Own react-three-fiber (drei `MeshRefractionMaterial`) only for the custom ring builder if iJewel's configurator cannot express our designs. Target ≤ 4 MB per GLB, ≤ 2K textures, PBR metal-rough, Draco only when it saves more than the ~100 KB decoder.
6. **Vercel:** Pro plan (Hobby is non-commercial), `www.americanjewelers.com` as primary with apex redirect, Global Config (ex-Edge Config) for launch toggles, ISR + Shopify webhooks → `revalidateTag`, `minimumCacheTTL` 31 days + `qualities:[75]` for product photos, CWV targets LCP ≤ 2.5 s / INP ≤ 200 ms / CLS ≤ 0.1 at p75.
7. **SEO/AEO:** JSON-LD in the initial HTML on every page (`JewelryStore` org + two store `JewelryStore` nodes with `openingHoursSpecification`/`geo`; `ProductGroup`/`hasVariant` on PDPs; `BreadcrumbList`; `CollectionPage`), own Merchant Center feed route (headless cannot rely on the Google & YouTube channel URLs), `identifier_exists=false` + handling-time attributes for made-to-order, POR pieces excluded from feeds and shipped without `offers`. llms.txt is cheap but near-worthless (Google ignores it; 97% never fetched) — do it last. Shopify's Agentic Storefronts/Catalog is on by default for eligible US stores and is the real AI-shopping channel.
8. **Build now with no Shopify access:** a `CatalogSource` interface with a `LocalJsonSource` (typed JSON catalog shaped like the Storefront API objects) and a later `ShopifySource`; everything except real checkout, draft orders, Merchant Center and webhooks can be built and deployed on the Vercel URL today.

---

## 1. Headless Shopify in 2026

### 1.1 The three options

| | Next.js Commerce (vercel/commerce) | Hydrogen (React Router) on Oxygen | Plain Storefront API in our Next.js App Router |
|---|---|---|---|
| What it is | MIT template: Next App Router, RSC, Server Actions, `'use cache'`, Shopify-only maintained path ([repo](https://github.com/vercel/commerce), [template](https://vercel.com/templates/next.js/nextjs-commerce)) | Shopify's framework on React Router 7.9 + calendar versions (`@shopify/hydrogen@2026.x`), free Oxygen hosting, native Storefront MCP proxy at `/api/mcp` ([askphill 2026 assessment](https://www.askphill.com/shopify-hydrogen-remix/), [weaverse](https://weaverse.io/blogs/every-shopify-hydrogen-storefront-is-now-an-ai-agent-endpoint)) | Our own typed GraphQL client, our own cart actions |
| Hosting fit | Vercel, exactly our case | Oxygen (free, included) — deployable elsewhere but loses the point | Vercel |
| Risk | Template is a demo (Next 15.6 canary in `package.json`, demo styling); you fork `lib/shopify` + cart, not the UI ([package.json](https://raw.githubusercontent.com/vercel/commerce/main/package.json), [lib/shopify/index.ts](https://raw.githubusercontent.com/vercel/commerce/main/lib/shopify/index.ts)) | Wrong framework for a Vercel/Next team; "roughly one in ten brands that arrive asking about Hydrogen actually leave with a Hydrogen build" | Must write cart, money formatting, analytics/consent ourselves (small) |
| Verdict | **Reference implementation** | No | **Yes — this is the build** |

**The 2026 wildcard: the new Hydrogen.** On 2026-06-17 Shopify shipped a developer preview of Hydrogen rebuilt with Vercel: a framework-agnostic, runtime-agnostic toolkit (`@shopify/hydrogen` core + `@shopify/hydrogen/react` bindings) that installs into an existing Next.js project with `npx @shopify/hydrogen@preview setup`, providing a typed Storefront client (`gql()` typed against the schema), cart/product/collection primitives, money formatting, Shop Pay, first-party analytics with consent, server-driven cart handlers, plus "agent skills". Not yet: customer accounts, predictive search, Oxygen deploy via CLI, Vue/Svelte bindings. Shopify's own words: "The API will change." ([Hydrogen developer preview](https://hydrogen.shopify.dev/update/hydrogen-developer-preview), [Vercel blog 2026-07-30](https://vercel.com/blog/shopify-and-vercel-are-rebuilding-hydrogen-for-faster-storefronts)). Current Hydrogen "remains fully supported".

**Decision:** plain Storefront API now, in a `lib/shopify/` module whose surface (`getProduct`, `getCollectionProducts`, `createCart`, `addToCart`, …) mirrors vercel/commerce and therefore the new Hydrogen primitives; re-evaluate adopting `@shopify/hydrogen` core when it leaves preview.

### 1.2 Storefront API: version and capabilities (as of 2026-10-08)

- **Versioning:** quarterly; `2026-10` is latest stable (released 2026-10-01, retires 2027-10-16); `2027-01` is release candidate; `2026-01/04/07` still supported ([versioning](https://shopify.dev/docs/api/usage/versioning), [release notes index](https://shopify.dev/changelog/release-notes.md)). Pin `2026-10`; bump quarterly.
- **Cart is the only path to checkout.** `cartCreate` → `cartLinesAdd/Update/Remove` → `cart.checkoutUrl` → redirect. Cart IDs carry a secret `?key=` — treat as a password (server-only). `buyerIdentity` sets email/country/delivery preferences and `customerAccessToken` for logged-in checkout. Cart- and line-level `attributes` are key/value pairs; `CartLineInput` = `{ merchandiseId, quantity, attributes[{key,value}], sellingPlanId, parent }` (max 250 input values) ([cart guide](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/cart/manage), [CartLineInput](https://shopify.dev/docs/api/storefront/2026-10/input-objects/CartLineInput)). The legacy Checkout API is gone (2026-10 notes: "removed checkout fields").
- **2026 changelog that touches us:** `2026-01` — `cartDiscountCodesUpdate` requires `discountCodes`; gift-card validation errors. `2026-04` — `MERCHANDISE_LINE_TRANSFORMERS_RUN_ERROR` from cart transforms. `2026-07` — `CartLine.viewKey` (and `viewKey(s)` accepted by line mutations), discount fields moved to `cart.discountApplications` / `lines[].discountAllocations(lineLevelOnly:false)`, new warning `PRODUCT_UNAVAILABLE_IN_BUYER_LOCATION`; Admin: metaobject `values` JSON read/write, `visibleToStorefrontApi` removed from field defs, `ProductVariant` implements `Publishable`. `2026-10` — `@inContext(channelId:)` ([2026-01](https://shopify.dev/changelog/release-notes/2026-01), [2026-04](https://shopify.dev/changelog/release-notes/2026-04), [2026-07](https://shopify.dev/changelog/release-notes/2026-07), [2026-10](https://shopify.dev/changelog/release-notes/2026-10)).
- **Product object for a PDP:** `options{name optionValues{swatch}}`, `variants`, `selectedOrFirstAvailableVariant`, `variantBySelectedOptions`, `adjacentVariants`, `encodedVariantExistence`/`encodedVariantAvailability` (for instant option-grid availability), `priceRange`, `compareAtPriceRange`, `availableForSale`, `media` (images, **Model3d**, videos), `metafield(namespace,key)` / `metafields(identifiers)`, `tags`, `productType`, `vendor`, `seo`, `collections`, `sellingPlanGroups`, `requiresSellingPlan` ([Product](https://shopify.dev/docs/api/storefront/2026-10/objects/Product)). `Model3d.sources[]{url format mimeType filesize}` + `previewImage` ([Model3dSource](https://shopify.dev/docs/api/storefront/2026-10/objects/Model3dSource)).
- **Options/variants:** up to **2,048 variants per product for all merchants** since 2025-10-15, but **still 3 options per product** (`ShopResourceLimits.maxProductOptions`); apps/themes must use the GraphQL product APIs ([changelog](https://changelog.shopify.com/posts/we-ve-increased-the-product-variant-limit-to-2048), [dev changelog](https://shopify.dev/changelog/the-product-variant-limit-is-now-2048-for-all-merchants), [webtoffee](https://www.webtoffee.com/blog/shopify-2048-variant-limit/), [ShopResourceLimits](https://shopify.dev/docs/api/admin-graphql/latest/objects/ShopResourceLimits)). **Combined listings** (parent product grouping child products, +3 parent options, ≤60 children, ≤2,000 variants) are **Shopify Plus only** — we replicate the UX in Next.js instead ([combined listings](https://shopify.dev/docs/apps/build/product-merchandising/combined-listings)).
- **Metafields/metaobjects on the Storefront API:** definitions must set `access.storefront: PUBLIC_READ` (`metafieldDefinitionCreate`/`Update`; the old `metafieldStorefrontVisibilityCreate` was removed in 2025-01). Metaobject definitions have storefront access `none` | `public_read`. Storefront API is read-only for metafields ([expose metafields](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/products-collections/metafields), [metaobjects](https://shopify.dev/docs/apps/build/custom-data/metaobjects), [MetafieldReference union](https://shopify.dev/docs/api/storefront/2026-10/unions/MetafieldReference)). Metaobject capabilities: `publishable` (draft/active), `translatable`, `renderable` (SEO title/description exposed to Storefront API + sitemap), `onlineStore` (Liquid pages only; irrelevant headless) ([capabilities](https://shopify.dev/docs/apps/build/custom-data/metaobjects/use-metaobject-capabilities)).
- **Selling plans / B2B:** present in the API (`sellingPlanId`, `requiresSellingPlan`) but not needed; B2B n/a.
- **Access:** install the **Headless** channel → "Create storefront" → public token (browser, unauthenticated) and private token (server; use this in Next.js server code). Max 100 storefronts/tokens per shop. Buyer traffic is not rate-limited; bot/crawler limits and checkout throttles apply ([getting started](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/getting-started), [limits](https://shopify.dev/docs/api/usage/limits)).
- **Checkout domain:** custom checkout subdomain (e.g. `checkout.americanjewelers.com`, CNAME → `shops.myshopify.com`) available on **all plans**; the domain used for Storefront API calls is the domain that appears in `checkoutUrl` ([community](https://community.shopify.com/t/checkout-on-the-same-domain-as-the-headless-store/287424), [blackbeltcommerce](https://www.blackbeltcommerce.com/shopify-custom-checkout-domain/)). **[verify]** the exact Headless/Hydrogen channel setting that controls "continue shopping"/post-purchase return links to the Next.js domain.

### 1.3 Modelling our hierarchy in Shopify

Principle: **Shopify holds the sellable truth (products, variants, prices, inventory, media, checkout); editorial structure lives in metaobjects; the Next.js site composes both.** Nothing here needs Plus.

| Our concept | Shopify object | Notes |
|---|---|---|
| Tier (Royal American / Americana / New American) | **Metaobject `tier`** + an automated **Collection** per tier (condition: product metafield `aj.tier`) | Tier page = metaobject content + collection products. Metafield definitions can be enabled as automated-collection conditions in admin **[verify setting name]**; fallback is a tag `tier:royal-american`. |
| Design motif (Shooting Star, Prism) | **Metaobject `design`** (fields: name, handle, `tier` ref, story rich_text, hero media, motif SVG file, launch date, sort) + optional collection `design-shooting-star` for SEO | `renderable` capability gives it SEO title/description and sitemap inclusion. |
| Piece type (ring, band, signet, pendant, bracelet, dog tag) | `productType` **and** Shopify standard product `category` (Apparel & Accessories > Jewelry > …) | Category feeds Google taxonomy automatically. |
| Version (diamond / solid gold / gemstone) | **Separate product per Design × Piece × Version**, e.g. `shooting-star-ring-diamond`, linked by metafields `aj.design` (metaobject ref) and `aj.version` (enum) | Separate products = separate URLs/photography/story (SEO wants "Shooting Star diamond ring" and "Shooting Star gold ring" as distinct pages), stays far below option/variant limits, and the PDP "version switcher" is a Next.js component reading siblings — a combined-listing UX without Plus. |
| Metal (14k yellow / white / rose, 18k, platinum), Size, Stone colour | Product **options** (max 3) → variants carry price | Rings: Metal × Size (e.g. 4 × 21 half sizes = 84 variants). Gemstone version: Metal × Size × Stone (4 × 21 × 8 = 672 < 2,048). Price differences by metal/size are honest variant prices. |
| Curated Collections (Family = birthstones, Gifts, Bridal) | Shopify **Collections** (manual or automated by tag/metafield) with collection metafields `aj.kind` (`curated`|`tier`|`design`), editorial copy, hero media | Storefront collection `products(filters:)` supports tag, productType, variantOption, price and `productMetafield` filters (filters are configured via the Search & Discovery app). |
| Ready-to-ship vs made-to-order vs POR | Product metafield `aj.fulfillment_mode` enum + `aj.lead_time_min_days`/`max_days`; inventory policy CONTINUE (or untracked) for MTO | Also mirrored as tags (`made-to-order`, `ready-to-ship`, `inquire`) for cheap filtering. |
| One-of-one | `aj.one_of_one` boolean + `aj.pricing_mode = inquire` | See §1.4. |
| Birthstone / month | `aj.birthstone_month` list; tag `birthstone:may` | Drives the "Family" collection. |
| 3D model | Shopify `Model3d` media on the product (GLB upload) **or** `aj.model_glb` file ref + `custom.model_source_embed` (iJewel embed URL) | See §2. |
| Customization rules | `aj.engravable` (bool), `aj.engraving_max_chars`, `aj.engraving_fonts` (list), `aj.size_range` | Read by the PDP/builder to render inputs → line attributes. |

**Example metafield definitions (Admin GraphQL, run once by an idempotent script):**

```graphql
mutation {
  metafieldDefinitionCreate(definition: {
    namespace: "aj", key: "design", name: "Design motif",
    type: "metaobject_reference", ownerType: PRODUCT,
    validations: [{ name: "metaobject_definition_id", value: "gid://shopify/MetaobjectDefinition/…" }],
    access: { storefront: PUBLIC_READ }
  }) { createdDefinition { id } userErrors { field message } }
}
```

Full definition list (all `ownerType: PRODUCT`, all `access.storefront: PUBLIC_READ` unless noted):

| namespace.key | type | validation / notes |
|---|---|---|
| `aj.tier` | `metaobject_reference` → `tier` | use as collection condition |
| `aj.design` | `metaobject_reference` → `design` | |
| `aj.version` | `single_line_text_field` | choices: `diamond`, `solid_gold`, `gemstone` |
| `aj.fulfillment_mode` | `single_line_text_field` | choices: `ready_to_ship`, `made_to_order`, `inquire` |
| `aj.lead_time_min_days` / `aj.lead_time_max_days` | `number_integer` | 14 / 28 default |
| `aj.pricing_mode` | `single_line_text_field` | `fixed` \| `inquire` |
| `aj.one_of_one` | `boolean` | |
| `aj.engravable` | `boolean` | |
| `aj.engraving_max_chars` | `number_integer` | |
| `aj.engraving_fonts` | `list.single_line_text_field` | |
| `aj.birthstone_month` | `list.single_line_text_field` | |
| `aj.model_glb` | `file_reference` | if not using Model3d media |
| `aj.model_usdz` | `file_reference` | optional (model-viewer can auto-generate) |
| `custom.model_source_embed` | `url` | iJewel's documented key for iframe embeds |
| `aj.materials_spec` | `rich_text_field` | metal purity, stone specs, carat ranges |
| `aj.care_notes` | `rich_text_field` | |
| `aj.faq` | `list.metaobject_reference` → `faq_item` | PDP Q&A blocks (AEO) |
| `aj.story` | `rich_text_field` | design/piece narrative |

Metaobject definitions: `tier` (name, handle, tagline, description rich_text, hero file, palette json, sort), `design` (name, tier ref, story, hero file, motif_svg file, launch_date, sort; capabilities `publishable` + `renderable`), `faq_item` (question, answer rich_text), `store_location` (name, address fields, phone, geo lat/lng, hours list, GBP url, photo) — store_location lets the site, JSON-LD and footer share one source of truth even before Shopify exists (it also lives in the local JSON).

### 1.4 Made-to-order and price-on-request

- **Made-to-order:** a normal sellable variant; set inventory policy to continue selling (or untracked); PDP shows "Made for you in 2–4 weeks" from `aj.lead_time_*`; checkout note/attribute `_lead_time: 14-28d`. For feeds/schema express it as **handling time** (Merchant Center `min_handling_time`/`max_handling_time`; schema `OfferShippingDetails.deliveryTime.handlingTime`) with `availability: InStock` — Google's `preorder`/`backorder` values require an `availability_date` and are for restocking, not bespoke manufacture ([Merchant availability](https://support.google.com/merchants/answer/6324448)).
- **Price on request:** Shopify has no native POR; a price is required (0 is allowed) and hidden prices leak through other channels ([community](https://community.shopify.com/t/how-to-display-products-without-a-price-in-the-online-store/380706), [shopplaza guide](https://shopplaza.io/blog/how-to-hide-prices-on-shopify.html)). Pattern:
  1. Product exists in Shopify (so it has media, SKU, story, metafields) with price `0`, inventory `0` + do-not-continue-selling → `availableForSale=false`; `aj.pricing_mode=inquire`.
  2. Publish **only** to the Headless channel (not Online Store, Shop, Google & YouTube, Agentic). The Storefront API only returns products published to the channel the token belongs to.
  3. Next.js renders no price and no Add-to-cart; renders an **Inquire** form (name/email/phone/notes, optional preferred store). Submission → server action → stores lead (Supabase/Resend email to staff) and optionally creates a Shopify **draft order** shell via Admin API with a custom line item (`title`, `originalUnitPrice` left for staff) + `customAttributes` (design, version, metal, stone, requested size).
  4. Staff quote → set price on the draft → `draftOrderInvoiceSend` → customer pays on Shopify checkout. Scope `write_draft_orders` ([draftOrderCreate](https://shopify.dev/docs/api/admin-graphql/latest/mutations/draftOrderCreate)).
  5. Schema: no `offers` (see §4.3); feeds: excluded.
- Ready-to-ship: tracked inventory, `availableForSale`, "Ships in 1–2 business days".

### 1.5 Customization → line item properties

Storefront cart line `attributes` are Shopify's line item properties. Conventions: human-readable keys (`Engraving`, `Font`, `Ring size`, `Stone`) show in cart, checkout, order emails and admin; keys prefixed with `_` are hidden from the customer at checkout (theme/checkout convention) — use them for `_config_id`, `_snapshot_url`, `_builder_version`. Validate server-side (max chars, allowed fonts from `aj.engraving_fonts`) in the server action before `cartLinesAdd`. Engraving that carries a price → either a separate "Engraving" product line added alongside (simple, visible, taxable) or a variant option (burns one of the three options — avoid).

---

## 2. Builder → cart handoff design

### 2.1 Two tiers of configurability

| Configurator | Price-bearing dimensions | Modelling | Handoff |
|---|---|---|---|
| **Ring builder** (choose design × version, metal, size, stone, engraving) | Metal, Size, Stone | Already variants of the per-version product | `variantBySelectedOptions` → `cartLinesAdd` with `attributes` for engraving/font and `_config_id` |
| **Band builder** (profile, width, metal, finish, inlay, engraving) | Metal, Width (and maybe Profile) | One product per band family ("Classic Band"), options Metal × Width × Profile (e.g. 5 × 8 × 4 = 160 variants); finish/inlay/engraving as attributes if non-priced | Same, plus `_snapshot_url` (rendered PNG from the 3D engine) and `_config_json` (compact) |
| **Bespoke** (anything outside the matrix, one-of-one, POR) | Quoted | No cart | Inquire → draft order → invoice (see §1.4) |

Rule: **never create a product per configuration** via Admin API at checkout time (catalog pollution, SEO junk, no inventory semantics, and a race on every click). If a priced dimension genuinely cannot fit the 3-option matrix (e.g. inlay material changes price), options are: (a) a priced add-on line ("Inlay: Meteorite") added with the band line and linked via `_parent_config_id` (and, in 2026, `CartLineInput.parent` for cart-transform bundles), or (b) a Shopify Function **Cart Transform** that reprices the line — requires a custom app and Functions; defer.

### 2.2 Sequence

```
Builder (client, R3F or iJewel WBB headless)
  │  on change → price = variant.price + add-ons (computed from Storefront data)
  │  "Add to bag" → POST server action { productHandle, selectedOptions, attributes, configJson }
  ▼
Next.js server action (private Storefront token)
  1. re-resolve variant via variantBySelectedOptions (never trust client price)
  2. validate attributes against aj.* rules
  3. persist config (Vercel Blob/Supabase) → config_id; upload snapshot PNG → _snapshot_url
  4. cartCreate | cartLinesAdd(lines:[{merchandiseId, quantity:1, attributes:[…]}])
  5. set cart id in httpOnly cookie (contains ?key secret)
  ▼
Cart drawer (optimistic UI) → "Checkout" → redirect to cart.checkoutUrl on checkout.americanjewelers.com
  ▼
Shopify checkout (Shop Pay etc.) → order webhook → staff sees attributes + snapshot link in admin/email
```

The vercel/commerce template already implements steps 4–5 with `'use cache: private'` for cart reads and server actions for mutations; copy that shape.

### 2.3 iJewel Wedding Band Builder as the band engine (optional)

Headless mode: `hideWbbUi: true`, then after `ijewel-viewer-ready` use `viewer.getPluginByType('WeddingBandBuilder').controller` with `setProfile()`, `setMaterialRef(slot,{base,variant,finish})`, `setWidthMultiplier()`, `setDiamonds()`, `setOutsideFeatures()`, `batch({...})`, read state with `getSnapshot()`, `getPrice()`, `toJSON()/fromJSON()`, event `price:updated` ([headless integration](https://docs.ijewel3d.com/wedding-band-builder/integration-headless.html), [direct](https://docs.ijewel3d.com/wedding-band-builder/integration-direct.html)). Scripts: `releases.ijewel3d.com/libs/webgi-v0/bundle-0.22.0.js` + `mini-viewer/0.6.18/bundle.nowebgi.iife.js`. Our UI owns the controls; iJewel renders; `toJSON()` becomes `_config_json`; our price table (not iJewel's) is authoritative unless we encode prices in their manifest. White-label requires the Professional plan ($1,500/yr; custom domain add-on $500/yr) ([pricing](https://ijewel3d.com/pricing)).

---

## 3. 3D

### 3.1 Viewer choice

| | Shopify native 3D (Model3d media + model-viewer) | iJewel3D embed / Mini Viewer SDK | Own react-three-fiber viewer |
|---|---|---|---|
| Rendering | Google `<model-viewer>` (three.js), PBR, image-based lighting; AR via WebXR → Scene Viewer → Quick Look | WebGi-based, jewelry-tuned gem/metal shaders, configurators, Try-On | Full control; drei `MeshRefractionMaterial` is the accepted diamond material (ray-bounce refraction, IOR, aberration), `MeshTransmissionMaterial` for glass ([drei](https://drei.docs.pmnd.rs/shaders/mesh-refraction-material), [three.js forum](https://discourse.threejs.org/t/jewelry-websites-with-three-js/54600)) |
| Hosting | Shopify CDN (`Model3d.sources`), ~4 MB guideline | iJewel Drive (plan storage/bandwidth) | Vercel Blob / Shopify Files |
| Integration in Next.js | `<model-viewer>` web component, `poster`, `loading="lazy"`, `reveal="interaction"`; `variant-name` for KHR_materials_variants metal switching | iframe (`loading="lazy"`, metafield `custom.model_source_embed`) or SDK (`new ijewelViewer.Viewer(container, project, options)`, events `ijewel-viewer-ready`, `ijewel-scene-ready`) ([embedding](https://docs.ijewel3d.com/integrations/shopify-embedding.html), [Viewer API](https://docs.ijewel3d.com/viewer/viewer-class.html)) | R3F canvas, SSR-safe dynamic import, Suspense |
| Weight on page | ~300 KB lib + model | iframe + WebGi bundle (heavy, but isolated) | three + R3F + drei ≈ 600 KB+ gz |
| Fit | **PDP default** | **Band configurator + asset pipeline + Try-On** | **Custom ring builder** (if needed) |

AR facts (model-viewer): `ar`, `ar-modes="webxr scene-viewer quick-look"` (default priority WebXR → Scene Viewer → Quick Look), `ios-src` optional — "the USDZ will instead be auto-generated when the user clicks the AR button on iOS", `ar-scale="fixed"` (true-to-size jewelry), `ar-placement="floor"|"wall"`, `xr-environment` ([AR examples](https://modelviewer.dev/examples/augmentedreality/index.html), [WebXR/Scene Viewer](https://developers.google.com/ar/develop/webxr/model-viewer)). Loading: `poster`, `loading="auto|lazy|eager"`, `reveal="auto|manual|interaction"`; decoders (`dracoDecoderLocation`, `ktx2TranscoderLocation`, `meshoptDecoderLocation`) load on demand from Google's CDN or self-host; "the DRACO decoder is pretty large (more than 100KB), so it is best only to use DRACO compressed models when the file size savings are larger than the size of the decoder" ([loading examples](https://modelviewer.dev/examples/loading/index.html)). Shopify's native product 3D uses the same component when GLB is uploaded to product media.

### 3.2 Asset pipeline (MatrixGold / Rhino → web GLB)

1. **Design** in MatrixGold (Rhino-based). Keep **layer naming** that iJewel auto-maps: metal layers `Metal …` (e.g. `Metal Yellow Gold`), gems per cut `Diamond Round`, `Diamond Princess`, `Sapphire Oval` ([iJewel import FAQ](https://docs.ijewel3d.com/playground/faq-import.html)). Real-world scale in mm; origin at the base/centre.
2. **Export path A (iJewel):** MatrixGold Render window → "Send to iJewel" button / Rhino plugin command → iJewel Playground: materials assigned, lighting, cameras, GLB export "with compression" (Draco), hosted on Drive with embed URL ([MatrixGold integration](https://ijewel3d.com/integrations/matrixgold), [Rhino plugin](https://ijewel3d.com/integrations/rhino-plugin), [press release](https://benchpeg.com/news/press-release-ijewel3d-unveils-matrixgold-plugin/)).
3. **Export path B (Rhino 8 → Blender → GLB):** Rhino 8 exports meshes with materials converted to PBR, textures embedded, optional Draco (levels 1–10, quantization bits), Y-up rotation ([Rhino 8 glTF](https://docs.mcneel.com/rhino/8/help/en-us/fileio/gltf_import_export.htm)). Known failure mode straight out of Rhino: gems render white and metal looks flat because glTF core has no refraction and Rhino's gem material does not map ([McNeel forum](https://discourse.mcneel.com/t/how-to-export-glb-gltf-properly-in-rhino/212839)). Fix in **Blender**: Principled BSDF → metal (base colour ≈ sRGB 255,196,86 for yellow gold, metallic 1, roughness 0.08–0.2), diamond (transmission 1, IOR 2.42, roughness 0, `KHR_materials_transmission` + `KHR_materials_ior` + `KHR_materials_volume`), and **`KHR_materials_variants`** so one GLB carries yellow/white/rose/platinum ([Khronos: Blender PBR extensions](https://www.khronos.org/blog/blender-gltf-i-o-support-for-gltf-pbr-material-extensions)). Expect viewer differences: model-viewer/three.js approximate transmission; true "fire" needs iJewel's or drei's refraction shaders.
4. **KeyShot** (if the designer renders there): GLB export since v10 bakes materials to PBR textures (base colour, metal-rough, normal, AO) — fine for stills-derived textures but textures are overkill for polished metal; prefer factor-only materials ([KeyShot export formats](https://manuals.keyshot.com/kss2025/en-us/manual/export-formats.html)).
5. **Optimise** with gltf-transform: `gltf-transform inspect`, then `gltf-transform optimize in.glb out.glb --compress draco --texture-compress webp` (or `meshopt`; `weld`, `simplify`, `quantize`, `dedup`, `prune`, `resize --width 1024 --height 1024`, `etc1s`/`uastc` for KTX2) ([gltf-transform CLI](https://gltf-transform.dev/cli)).
6. **Budget** (Shopify Partner 3D checklist): "total file size should be about 4 MB", PBR workflow, four maps (diffuse, normal, packed ORM in R/G/B, optional emissive), textures ≤ 2048² for mobile, real-world scale, origin at base; polycount "as low as possible" while keeping detail ([checklist](https://help.shopify.com/partners/resources/creating-3d-models/3d-model-standards-checklist)). Jewelry specifics: prong tips and pavé need geometry, not normal maps; 60–150 k triangles per ring is typical after decimation; Draco usually halves that payload. Secondary sources claim Shopify accepts up to 500 MB and auto-optimises >15 MB uploads **[verify]**.
7. **USDZ:** let model-viewer auto-generate for Quick Look; only hand-author USDZ (Apple Reality Converter) for hero pieces where gem appearance in Quick Look matters.
8. **Posters:** render a 1200² WebP per model (iJewel BatchX or Blender) → `poster` attribute and the PDP gallery's "3D" tile; this is the LCP-safe facade.

---

## 4. Vercel platform

### 4.1 Domains and running beside the legacy site

- Add `americanjewelers.com` + `www.americanjewelers.com` to the project; Vercel recommends **www as primary** (CNAME, more CDN control) with apex → www redirect; "If a user visits your domain with or without the www … we will attempt to redirect automatically. You might still want to add this redirect explicitly" ([add a domain](https://vercel.com/docs/domains/working-with-domains/add-a-domain), [deploying & redirecting](https://vercel.com/docs/domains/working-with-domains/deploying-and-redirecting)). Hobby allows 50 domains/project but is non-commercial → **Pro**.
- Zero-downtime attach: add domain first, pre-generate certs via TXT, lower TTL, flip A/CNAME last ([zero-downtime migration](https://vercel.com/kb/guide/zero-downtime-migration)).
- **Preview deployments** get `X-Robots-Tag: noindex` automatically; **custom domains on non-production branches do not**; the production `*.vercel.app` URL is indexable → add a host-scoped permanent redirect from `*.vercel.app` to the canonical domain once it exists, and until then set `noindex` on it via host-scoped headers ([preview indexing](https://vercel.com/kb/guide/are-vercel-preview-deployment-indexed-by-search-engines), [duplicate content with vercel.app](https://vercel.com/kb/guide/avoiding-duplicate-content-with-vercel-app-urls)):

```json
{ "redirects": [{ "source": "/:path*", "has": [{ "type": "host", "value": "american-jewelry.*\\.vercel\\.app" }], "destination": "https://www.americanjewelers.com/:path*", "permanent": true }] }
```

- Legacy `american.jewelry` keeps running on Lightspeed. The two sites are different products (new site ≠ copy), so no cross-domain duplicate issue at launch; see §5.4 for canonical rules when the same pieces exist on both.

### 4.2 Image optimisation for jewelry photography

- Vercel bills three meters: transformations (one per MISS/STALE), cache writes, cache reads (8 KB units). Hobby: 5K transformations/mo; Pro on-demand $0.05–0.0812/1K transformations. Source limits: ≤ 8192 px each side, formats jpeg/png/webp/avif, transformed output ≤ 10 MB ([limits & pricing](https://vercel.com/docs/image-optimization/limits-and-pricing), [how it works](https://vercel.com/docs/image-optimization)).
- Settings for a stable product catalogue ([reduce costs KB](https://vercel.com/kb/guide/reduce-image-optimization-costs-on-vercel)): `images.minimumCacheTTL: 2678400` (31 days; Next 16 default is 4 h — "a product photo that hasn't changed since the shoot can still get re-transformed six times a day"), `qualities: [75]` (maybe `[75, 90]` for hero zoom only), `formats: ['image/webp']` (AVIF doubles transformations; enable later if measured worth it), trim `deviceSizes` to ≤ 1920 unless 4K heroes, always give `sizes`, `remotePatterns` locked to `cdn.shopify.com` + `/s/files/1/<store-id>/**`, `unoptimized` per tiny asset.
- Cache keys include `url`+`w`+`q`+Accept; redeploys don't purge; purge by source image when a photo is reshot.
- Next.js `<Image priority fetchPriority="high">` on the PDP hero (LCP); gallery thumbnails lazy.

### 4.3 ISR and caching for the catalogue

- Next 16: `'use cache'` is stable behind `cacheComponents: true`; `cacheLife('days'|'hours'|…)`, `cacheTag('products')`, invalidate with `revalidateTag`/`updateTag`; default profile is stale 5 min / revalidate 15 min ([use cache](https://nextjs.org/docs/app/api-reference/directives/use-cache)). vercel/commerce tags product/collection reads with `cacheLife('days')` and cart with `'use cache: private'` + `cacheLife('seconds')`.
- Vercel ISR: durable cache per deployment, request collapsing, 300 ms global purge, stale-on-failure with 30 s retry; on-demand revalidation applies to the domain/deployment where triggered ([ISR](https://vercel.com/docs/incremental-static-regeneration)).
- Wire Shopify webhooks `products/create|update|delete`, `collections/*` (and `metaobjects/*`) → `app/api/revalidate/route.ts` guarded by `SHOPIFY_REVALIDATION_SECRET` → `revalidateTag('products')` (vercel/commerce pattern).
- Pre-render top ~200 product/design pages at build; generate the rest on demand.

### 4.4 Global Config (formerly Edge Config)

Sub-millisecond reads replicated with the function; built for flags, critical redirects, maintenance mode, IP blocking; no redeploy to change ([Global Config](https://vercel.com/docs/global-config)). Use it for: `commerce.source = local | shopify` (the swap-over switch), `checkout.enabled`, `launch.gate` (password/holding page), emergency redirects from legacy URL patterns, A/B flags via Flags SDK.

### 4.5 Core Web Vitals targets

LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1, measured at the 75th percentile on mobile and desktop ([web.dev vitals](https://web.dev/articles/vitals)). Why it matters for luxury: Farfetch measured conversion −1.3% per +100 ms LCP, exit rate −3.1% per −0.01 CLS, and a 600 ms LCP cut on PDPs worth 1–5% conversion ([Farfetch case study](https://web.dev/farfetch/)). Vercel's own checklist: `preload`/`fetchpriority=high` on the LCP image, AVIF/responsive sizes, `scheduler.yield()`/deferred third-party JS for INP, explicit media dimensions + `next/font` metric matching for CLS, Speed Insights for field data ([Vercel CWV KB](https://vercel.com/kb/guide/how-to-improve-core-web-vitals)).

---

## 5. SEO / AEO / GEO

### 5.1 Schema.org map (JSON-LD, server-rendered in initial HTML)

| Page | Types | Notes |
|---|---|---|
| Every page | `Organization` as **`JewelryStore`** (`@id: https://www.americanjewelers.com/#org`, `name`, `url`, `logo` ≥112², `sameAs` (Instagram, GBP, Facebook), `foundingDate`, `telephone`, `hasMerchantReturnPolicy`, shipping policy) + `WebSite` + `BreadcrumbList` | `JewelryStore` is `Thing > Organization/Place > LocalBusiness > Store > JewelryStore`, 10K–100K domains use it ([schema.org](https://schema.org/JewelryStore)); Google's Organization doc says pick the most specific subtype and allows org-level return/shipping policy ([Organization](https://developers.google.com/search/docs/appearance/structured-data/organization)). |
| Stores page / each store | Two `JewelryStore` LocalBusiness nodes (Brentwood, Mt. Juliet): `name`, `address` (required), `geo` (5+ decimals), `telephone`, `url`, `openingHoursSpecification[]`, `priceRange`, `image`, `hasMap`, `parentOrganization → #org` | Required: `name`, `address`; `geo`/hours/phone recommended ([LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business)). Keep NAP identical to Google Business Profile. |
| PDP (priced) | `ProductGroup` (`name`, `productGroupID`, `variesBy: [material, size]`, `brand`, `description`, `image`, `hasVariant: [Product…]`) each variant `Product` with `sku`, `name` ("Shooting Star Ring — Diamond, 14k Yellow Gold, size 7"), `material`, `size`, `image`, `offers: Offer{price, priceCurrency:"USD", availability, url (?variant=…), itemCondition, shippingDetails{deliveryTime{handlingTime}}, hasMerchantReturnPolicy}` | Merchant listings require `name`, `image`, `offers.price > 0`, `priceCurrency`; product snippets require `name` + one of `review`/`aggregateRating`/`offers`; each variant needs a unique `sku`/`gtin` and must be preselectable via URL query params; single-URL PDPs use one canonical ProductGroup URL ([product](https://developers.google.com/search/docs/appearance/structured-data/product), [merchant listing](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing), [product snippet](https://developers.google.com/search/docs/appearance/structured-data/product-snippet), [variants](https://developers.google.com/search/docs/appearance/structured-data/product-variants)). |
| PDP (price on request) | `Product` with `name`, `image`, `brand`, `material`, `description`, `isVariantOf`/`ProductGroup` but **no `offers`** | Not eligible for merchant listing or product snippet unless first-party `review`/`aggregateRating` exist; do not fake `price: 0` (merchant listing requires > 0 and it would publish "$0"). |
| Collection / Tier / Design | `CollectionPage` + `ItemList` of `Product` URLs; `BreadcrumbList` | `ItemList` is the recognised carousel signal; `Collection` type has no Google feature. |
| FAQ blocks | `FAQPage` only as semantic markup | FAQ rich results are restricted to "well-known, authoritative government and health websites" since 2023 ([FAQ](https://developers.google.com/search/docs/appearance/structured-data/faqpage)) — keep the markup, expect no rich result. |
| Articles / journal | `Article` with `author`, `datePublished` | E-E-A-T surface for AI answers. |

Image preview: add `<meta name="robots" content="max-image-preview:large">` so Google may show large product thumbnails; `max-snippet` also "limits how much of the content may be used as a direct input for AI Overviews and AI Mode" — leave unrestricted ([robots meta](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag)).

### 5.2 Google Merchant Center / free listings

- New accounts are auto-enrolled in free listings; surfaces: Shopping tab, Search, Images, YouTube, Maps/Lens; required attributes: `id`, `title`, `link`, `image_link`, `price`, `description`, `availability`; **free local listings** (store availability on Maps) exist for brick-and-mortar once a local inventory feed is added ([free listings](https://support.google.com/merchants/answer/9199328)).
- Headless implication: Shopify's Google & YouTube channel emits Online-Store URLs; build **our own feed route** (`/feeds/google-merchant.xml`, RSS 2.0 from the catalogue, ISR daily) with Next.js URLs; `identifier_exists: false` for custom pieces without GTIN/MPN (use honestly — misuse draws warnings) ([identifier_exists](https://support.google.com/merchants/answer/6324478)); `min_handling_time`/`max_handling_time` = 14/28 for made-to-order; `availability: in_stock`; exclude POR and one-of-one.
- Verify the new domain in Search Console + Merchant Center before the feed goes live; add Business Profile ↔ Merchant Center link for local listings.

### 5.3 AEO / GEO (answer engines and AI shopping)

- Google (2026-05-15 guide): no special files; "Structured data isn't required for generative AI search"; eligibility = indexed, crawlable, non-commodity, people-first content with images/video; leverage Merchant Center and Business Profile; llms.txt classed with the keywords meta tag ([AI features guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), [techwyse summary](https://www.techwyse.com/news/ai-search/google-ai-search-optimization-guide-llms-txt-lighthouse-audit)). Lighthouse 13.3 nevertheless audits llms.txt for browser agents.
- Vercel's agentic-commerce guidance: AI agents (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot) read the **initial HTML** — server-render, ship JSON-LD Product data, keep sitemaps synced, allow the bots in robots.txt and in Vercel's Firewall AI-bots ruleset, extend `htmlLimitedBots` if using PPR; "97% of llms.txt files were never fetched" ([Vercel KB](https://vercel.com/kb/guide/agentic-commerce-readiness)).
- **Shopify Agentic Storefronts / Catalog / UCP:** UCP (Shopify + Google, launched 2026-01-11) and Shopify Catalog distribute eligible merchants' products to ChatGPT, Google AI Mode + Gemini, Microsoft Copilot and Meta surfaces, "active by default for eligible stores", managed under Sales channels > Agentic; ChatGPT links to "your online store", other surfaces can use Shopify-powered checkout; requires agreeing to supplemental terms ([help center](https://help.shopify.com/en/manual/online-sales-channels/agentic-storefronts), [supplemental terms](https://www.shopify.com/legal/terms-agentic-storefronts)). Secondary sources list eligibility as US-based, Starter+ plan, complete policies, guest checkout allowed, not password-protected **[verify in admin once the store exists]** ([aitrillion](https://www.aitrillion.com/blog/agentic-commerce-shopify-guide), [dev.to guide](https://dev.to/stack_c285afb2fa0bef/shopify-agentic-storefronts-2026-sell-on-chatgpt-google-ai-mode-setup-guide-h29)). Storefront MCP is auto-proxied by Hydrogen; for our Next.js front end the catalog side still works because distribution is Shopify-side — the open question is **which URL** Catalog hands to ChatGPT for a headless store (Online Store URL vs. headless domain) **[verify; plan: keep the Online Store channel installed with every page redirecting to the Next.js domain, or confirm the Headless channel storefront URL setting]**. POR/one-of-one products must be unpublished from this channel.
- Content that gets cited: per-design story pages with specifics (metal purities, stone cuts, who makes it, lead times, sizing policy, care, warranty), an About page with founders/history/awards, consistent NAP, named jeweller bios, first-party photography with descriptive alt text, and a `Q&A` block per PDP sourced from real customer questions. These are also the "non-commodity" signals Google names.

### 5.4 Canonical rules between the two domains

1. While on the Vercel URL: `noindex` (host-scoped header), no sitemap submission, no GBP link.
2. At domain attach: self-referential canonicals on every page, sitemap index at `/sitemap.xml` (Next `app/sitemap.ts` + `generateSitemaps` per 50k; include product images via `images[]`) ([Next sitemap](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)), submit in Search Console, swap GBP website link.
3. Overlap period with american.jewelry: redirects are the strongest canonical signal, `rel=canonical` strong, sitemaps weak; never send conflicting signals ([consolidate duplicate URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)). For any piece sold on both: cross-domain `rel=canonical` from the Lightspeed PDP to the new PDP (if Lightspeed allows per-page head edits; otherwise leave both indexable — different copy/photos count as different pages), and link legacy → new ("See the new collection").
4. Retirement: 301 map of every indexed american.jewelry URL → new domain, Search Console Change of Address, keep the old domain's DNS for years.
5. hreflang: n/a (single language/market).

### 5.5 Image SEO

Standard `<img>` (next/image renders one) with `src` fallback, descriptive filenames (`shooting-star-ring-diamond-14k-yellow-gold-top.jpg`) and alt text, image sitemap entries, `og:image`/`primaryImageOfPage`, WebP/AVIF, CDN host (cdn.shopify.com) is fine — verify the CDN host in Search Console if images are hosted there ([Google Images](https://developers.google.com/search/docs/appearance/google-images)).

### 5.6 Sitemap structure

`/sitemap.xml` (index) → `/sitemap/static.xml` (home, tiers, stores, about, journal), `/designs/sitemap.xml`, `/collections/sitemap.xml`, `/products/sitemap/[n].xml` (with `images[]`, `lastModified` from Shopify `updatedAt`), `/journal/sitemap.xml`. Exclude: cart, account, search, variant query URLs, Vercel URL.

---

## 6. Performance patterns luxury sites use — and what to avoid

**Use**
- Video hero only when the piece needs motion: 6–10 s loop, 1080p ≤ 2.5 MB (`ffmpeg -crf 28`, `-an`), `<video autoplay muted loop playsinline preload="metadata" poster>`, WebM/AV1 source before MP4/H.264, explicit `aspect-ratio`; the **poster is the LCP candidate** → preload it with `fetchpriority="high"`; on mobile serve a still (`<picture>`/media query) or defer the video via IntersectionObserver ([web.dev video performance](https://web.dev/learn/performance/video-performance), [Next.js video guide](https://nextjs.org/docs/app/guides/videos)).
- 3D as a **facade**: poster image in the gallery, load model-viewer (or iJewel iframe `loading="lazy"`) only when the "3D" tile is clicked or scrolled into view; never on PLPs; R3F canvases behind `next/dynamic({ ssr:false })` + Suspense ([third-party facades](https://web.dev/articles/third-party-facades)).
- Fonts: at most two families (display serif + text sans), variable weights, `next/font` (self-hosted, zero third-party requests, `display:'swap'` default, `adjustFontFallback` metric-matched fallback → no CLS), preload only `latin` ([next/font](https://nextjs.org/docs/app/api-reference/components/font)).
- Photography: AVIF/WebP via next/image, `priority` on the one LCP image, `sizes` everywhere, blur placeholders from Shopify's `previewImage`, fixed aspect boxes.
- Streaming RSC pages: static shell (`'use cache'`) + Suspense for price/availability/cart badge; PPR-friendly.
- Server-rendered everything a crawler or agent needs (JSON-LD, PDP copy, prices).

**Avoid**
- Full-screen preloaders / "loading…" curtains (delays LCP, inflates bounce), scroll-jacking and custom cursors (INP, accessibility), autoplay with sound, 4K hero video on mobile.
- Client-rendered PDPs or prices fetched only in the browser (agents and Google see nothing).
- Third-party chat/consent widgets injected synchronously; wrap with facades or `strategy="lazyOnload"`.
- Unbounded image transformation cardinality (many `quality` values + AVIF + 8 widths = 32 cache entries per image), unoptimised 10 MB hero JPGs, GLBs above ~5 MB or with 4K textures.
- Media without dimensions (CLS), fonts from Google's CDN (extra connection, CLS), and heavy animation libraries on every route.

---

## 7. Recommended architecture

```
                         ┌──────────────────────────────────────────────┐
  Designer (MatrixGold/  │  Asset pipeline                               │
  Rhino) ─.3dm──────────▶│  iJewel Playground / Blender → gltf-transform │──GLB/poster──┐
                         └──────────────────────────────────────────────┘              │
                                                                                        ▼
 ┌──────────────┐   Admin GraphQL (scripts: definitions, import, GLB upload)   ┌────────────────────┐
 │ Local JSON   │──────────────────────────────────────────────────────────────▶│ Shopify            │
 │ catalog      │  (phase 1: import)                                           │ products/variants  │
 │ (phase 0)    │                                                              │ metaobjects (tier, │
 └──────┬───────┘                                                              │ design, faq, store)│
        │ CatalogSource interface (LocalJsonSource | ShopifySource)            │ Model3d media      │
        ▼                                                                      │ draft orders       │
 ┌─────────────────────────────────────────────────────────────┐  Storefront  │ webhooks           │
 │ Next.js 16 App Router on Vercel (Pro)                        │◀─API 2026-10─┤ Headless channel   │
 │  app/(site): home, /tiers/[t], /designs/[d], /products/[h],  │  (private    │ custom checkout    │
 │   /collections/[c], /builder/ring, /builder/band, /stores,   │   token,     │ subdomain          │
 │   /inquire, /journal                                         │   server)    └─────────┬──────────┘
 │  lib/shopify (typed gql client, fragments, cart actions)     │                        │
 │  lib/catalog (source switch via Global Config)               │   checkoutUrl redirect │
 │  JSON-LD, sitemap.ts, robots.ts, /feeds/google-merchant.xml  │────────────────────────┘
 │  'use cache' + cacheTag; /api/revalidate ← Shopify webhooks  │
 │  3D: <model-viewer> (PDP), iJewel WBB headless (bands),      │   leads/configs/snapshots
 │      R3F (ring builder if needed)                            │──▶ Vercel Blob + Supabase/Resend
 └─────────────────────────────────────────────────────────────┘
        ▲ www.americanjewelers.com (later)  ▲ *.vercel.app (noindex → redirect)
        │ Vercel Image Optimization (cdn.shopify.com remotePatterns), ISR, Global Config, Speed Insights
 Legacy american.jewelry (Lightspeed) stays up; cross-links; eventual 301 map
```

---

## 8. Phased build plan

### Phase 0 — build now, **no Shopify access** (local JSON catalogue)

Deliverable: the whole site on a Vercel preview/production URL (noindex), with real-looking commerce UI and a stubbed checkout.

- Repo: Next.js 16 (App Router, `cacheComponents: true`), TypeScript, Tailwind v4, `next/font`, Vercel Pro project, Speed Insights.
- `content/catalog/` JSON (tiers, designs, products with variants/options/media/metafields, collections, stores, faq) **typed to mirror Storefront API shapes** (`Product`, `ProductVariant`, `SelectedOption`, `Image`, `Model3d`, `Metafield`, `Collection`, `Metaobject`). Zod schemas + a `pnpm catalog:validate` script. Handles chosen now = Shopify handles later.
- `lib/catalog/CatalogSource.ts` interface (`getProduct`, `getProductsByDesign`, `getCollection`, `getDesign`, `getTier`, `search`) with `LocalJsonSource`; `lib/shopify/` typed client + fragments + cart server actions written now against a mocked GraphQL layer (contract tests from the Storefront schema).
- Pages: home, tier, design, PDP (gallery + 3D tile + version switcher + options + MTO/RTS/inquire states + engraving), collection (filters), ring builder (R3F or iJewel WBB headless with placeholder GLBs), band builder, stores (two `JewelryStore` JSON-LD nodes, hours, maps), about/journal, inquire form (Resend/Supabase), cart drawer with local cart + "Checkout" leading to a holding step.
- SEO scaffolding: metadata, JSON-LD generators (ProductGroup/Product/LocalBusiness/Breadcrumb/CollectionPage), `sitemap.ts`, `robots.ts` (allow AI bots), `/feeds/google-merchant.xml` generator (disabled flag), `max-image-preview:large`, noindex on vercel.app host.
- 3D: pipeline doc + 2–3 sample GLBs through gltf-transform; `<model-viewer>` wrapper with poster/lazy/AR; iJewel free-tier account for Playground + WBB evaluation.
- Global Config: `commerce.source`, `checkout.enabled`, `launch.gate`.

### Phase 1 — Shopify store provisioned (plugs in)

- Headless channel + tokens; custom checkout subdomain; Shop Pay; policies pages (needed for Catalog).
- `scripts/shopify/define.ts` (idempotent metafield/metaobject definitions from §1.3), `scripts/shopify/import.ts` (JSON → `productSet`/`metaobjectUpsert`, media + GLB upload, collections, publish to Headless), `scripts/shopify/export.ts` (round-trip back to JSON for diffs).
- Flip `commerce.source=shopify`; real cart → checkoutUrl; webhooks → `/api/revalidate`; draft-order inquire flow (Admin API custom app, `write_draft_orders`); order webhook → staff email with attributes/snapshot.
- Merchant Center: domain verification, own feed, free listings, local inventory later.
- Agentic channel: review eligibility, exclude POR/one-of-one, confirm destination URLs.

### Phase 2 — domain

- Attach `www.americanjewelers.com` (+ apex redirect) with pre-generated certs; remove noindex; host redirect from vercel.app; Search Console + sitemaps; GBP website link; cross-links from american.jewelry; analytics/consent.

### Phase 3 — depth

- Band builder on iJewel WBB headless with our price table; ring builder refinements (KHR_materials_variants metal switching, AR `ar-scale="fixed"`); Try-On evaluation; first-party reviews (enables product snippets for POR pieces); Customer Account API login (when new Hydrogen ships it or via Shopify's Customer Account API directly); adopt `@shopify/hydrogen` core when GA; legacy 301 map and Change of Address.

---

## 9. Open items to verify when the store exists

1. Headless/Hydrogen channel storefront URL setting for post-checkout "continue shopping" and Catalog/ChatGPT product links.
2. Automated-collection conditions on metafields (setting name) vs. tag fallback.
3. Shopify 3D upload size cap and server-side USDZ generation (secondary sources only).
4. Agentic Storefronts eligibility specifics (US/Starter+/guest checkout) in the admin UI.
5. Whether engraving should be a priced add-on line or free; whether Cart Transform repricing is ever needed for inlays.
6. iJewel plan: Professional ($1,500/yr) is the first white-label tier; confirm the WBB can express our band profiles.

---

## Sources

Headless/Shopify
- https://github.com/vercel/commerce · https://vercel.com/templates/next.js/nextjs-commerce · https://raw.githubusercontent.com/vercel/commerce/main/lib/shopify/index.ts · https://raw.githubusercontent.com/vercel/commerce/main/package.json
- https://hydrogen.shopify.dev/update/hydrogen-developer-preview · https://vercel.com/blog/shopify-and-vercel-are-rebuilding-hydrogen-for-faster-storefronts
- https://www.askphill.com/shopify-hydrogen-remix/ · https://weaverse.io/blogs/every-shopify-hydrogen-storefront-is-now-an-ai-agent-endpoint · https://weaverse.io/blogs/shopify-spring-26-agentic-storefront-era
- https://shopify.dev/docs/api/usage/versioning · https://shopify.dev/changelog/release-notes.md · https://shopify.dev/changelog/release-notes/2026-01 · https://shopify.dev/changelog/release-notes/2026-04 · https://shopify.dev/changelog/release-notes/2026-07 · https://shopify.dev/changelog/release-notes/2026-10
- https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/cart/manage · https://shopify.dev/docs/api/storefront/2026-10/input-objects/CartLineInput · https://shopify.dev/docs/api/storefront/2026-10/objects/Product · https://shopify.dev/docs/api/storefront/2026-10/objects/Model3dSource · https://shopify.dev/docs/api/storefront/2026-10/unions/MetafieldReference
- https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/getting-started · https://shopify.dev/docs/api/usage/limits
- https://changelog.shopify.com/posts/we-ve-increased-the-product-variant-limit-to-2048 · https://shopify.dev/changelog/the-product-variant-limit-is-now-2048-for-all-merchants · https://www.webtoffee.com/blog/shopify-2048-variant-limit/ · https://shopify.dev/docs/api/admin-graphql/latest/objects/ShopResourceLimits · https://shopify.dev/docs/apps/build/product-merchandising/combined-listings
- https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/products-collections/metafields · https://shopify.dev/docs/apps/build/custom-data/metaobjects · https://shopify.dev/docs/apps/build/custom-data/metaobjects/use-metaobject-capabilities
- https://shopify.dev/docs/api/admin-graphql/latest/mutations/draftOrderCreate
- https://community.shopify.com/t/how-to-display-products-without-a-price-in-the-online-store/380706 · https://shopplaza.io/blog/how-to-hide-prices-on-shopify.html
- https://community.shopify.com/t/checkout-on-the-same-domain-as-the-headless-store/287424 · https://www.blackbeltcommerce.com/shopify-custom-checkout-domain/
- https://help.shopify.com/en/manual/online-sales-channels/agentic-storefronts · https://www.shopify.com/legal/terms-agentic-storefronts · https://www.aitrillion.com/blog/agentic-commerce-shopify-guide · https://dev.to/stack_c285afb2fa0bef/shopify-agentic-storefronts-2026-sell-on-chatgpt-google-ai-mode-setup-guide-h29

3D
- https://help.shopify.com/partners/resources/creating-3d-models/3d-model-standards-checklist
- https://modelviewer.dev/examples/augmentedreality/index.html · https://modelviewer.dev/examples/loading/index.html · https://developers.google.com/ar/develop/webxr/model-viewer
- https://docs.ijewel3d.com/ · https://docs.ijewel3d.com/integrations/shopify-embedding.html · https://docs.ijewel3d.com/viewer/viewer-class.html · https://docs.ijewel3d.com/wedding-band-builder/integration-direct.html · https://docs.ijewel3d.com/wedding-band-builder/integration-headless.html · https://docs.ijewel3d.com/playground/faq-import.html · https://ijewel3d.com/pricing · https://ijewel3d.com/integrations/matrixgold · https://ijewel3d.com/integrations/rhino-plugin · https://benchpeg.com/news/press-release-ijewel3d-unveils-matrixgold-plugin/
- https://docs.mcneel.com/rhino/8/help/en-us/fileio/gltf_import_export.htm · https://discourse.mcneel.com/t/how-to-export-glb-gltf-properly-in-rhino/212839 · https://www.khronos.org/blog/blender-gltf-i-o-support-for-gltf-pbr-material-extensions · https://manuals.keyshot.com/kss2025/en-us/manual/export-formats.html · https://gltf-transform.dev/cli
- https://drei.docs.pmnd.rs/shaders/mesh-refraction-material · https://discourse.threejs.org/t/jewelry-websites-with-three-js/54600

Vercel / Next.js
- https://vercel.com/docs/domains/working-with-domains/add-a-domain · https://vercel.com/docs/domains/working-with-domains/deploying-and-redirecting · https://vercel.com/kb/guide/zero-downtime-migration · https://vercel.com/kb/guide/are-vercel-preview-deployment-indexed-by-search-engines · https://vercel.com/kb/guide/avoiding-duplicate-content-with-vercel-app-urls
- https://vercel.com/docs/image-optimization · https://vercel.com/docs/image-optimization/limits-and-pricing · https://vercel.com/kb/guide/reduce-image-optimization-costs-on-vercel
- https://vercel.com/docs/incremental-static-regeneration · https://nextjs.org/docs/app/api-reference/directives/use-cache · https://vercel.com/docs/global-config
- https://web.dev/articles/vitals · https://web.dev/farfetch/ · https://vercel.com/kb/guide/how-to-improve-core-web-vitals
- https://nextjs.org/docs/app/api-reference/components/font · https://nextjs.org/docs/app/guides/videos · https://web.dev/learn/performance/video-performance · https://web.dev/articles/third-party-facades · https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap

SEO / AEO
- https://schema.org/JewelryStore · https://developers.google.com/search/docs/appearance/structured-data/organization · https://developers.google.com/search/docs/appearance/structured-data/local-business
- https://developers.google.com/search/docs/appearance/structured-data/product · https://developers.google.com/search/docs/appearance/structured-data/merchant-listing · https://developers.google.com/search/docs/appearance/structured-data/product-snippet · https://developers.google.com/search/docs/appearance/structured-data/product-variants · https://developers.google.com/search/docs/appearance/structured-data/faqpage
- https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls · https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag · https://developers.google.com/search/docs/appearance/google-images
- https://support.google.com/merchants/answer/9199328 · https://support.google.com/merchants/answer/6324448 · https://support.google.com/merchants/answer/6324478
- https://developers.google.com/search/docs/fundamentals/ai-optimization-guide · https://www.techwyse.com/news/ai-search/google-ai-search-optimization-guide-llms-txt-lighthouse-audit · https://vercel.com/kb/guide/agentic-commerce-readiness

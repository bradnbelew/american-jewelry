# 07 — Build knowledge: American Jewelry on Shopify Hydrogen + Oxygen

Date: 2026-10-10. Scope: everything the implementer needs to remake the `site/` Next.js 16 storefront as a Hydrogen app hosted on Oxygen, for store `e8d51b-f4.myshopify.com` (Basic plan). Verified against primary sources (shopify.dev, the Shopify/hydrogen repo, npm, library docs) with URLs inline; the store facts in §5.9 were read live through the Shopify connector. Anything not confirmed by a primary source is marked **[verify]**. Supersedes the "Hydrogen is the wrong fit" verdict in research 03 §1.1: the hosting decision changed, and so did Hydrogen itself.

---

## 0. Decisions (one screen)

1. **Build on the new Hydrogen toolkit, `@shopify/hydrogen@2026.10.0`, with its React Router 7 starter (`templates/react-router`), hosted on Oxygen.** It went from developer preview to `latest` on **2026-10-09** (yesterday): npm `dist-tags.latest = 2026.10.0`, GitHub release `@shopify/hydrogen@2026.10.0` published 2026-10-09T15:58Z, and the release PR describes it as "the 2026.10.0 general-availability release" ([npm dist-tags, read 2026-10-10](https://www.npmjs.com/package/@shopify/hydrogen), [releases](https://github.com/Shopify/hydrogen/releases), [PR #4110](https://github.com/Shopify/hydrogen/pull/4110), [PR #4163](https://github.com/Shopify/hydrogen/pull/4163)). Classic Hydrogen (`createHydrogenContext`, `CartForm`, `getSeoMeta`) is frozen at **2026.4.x** on the `2026-04` branch and pinned to Storefront API **2026-04**, which Shopify retires **2027-04-16** ([README](https://github.com/Shopify/hydrogen/blob/main/README.md), [API versioning](https://shopify.dev/docs/api/usage/versioning)). A classic build today is a six-month lease followed by the very migration we would be avoiding.
2. **Pin exactly:** `"@shopify/hydrogen": "2026.10.0"` (no caret; classic `^2026.4` also resolves to 2026.10 and breaks). Upgrade quarterly after reading `CHANGELOG.md`; run `npx @shopify/hydrogen skills sync` after every bump.
3. **Scaffold** with `npx @shopify/hydrogen@latest setup` in an empty directory and choose option 1 "scaffold" (it downloads the compiled React Router template). Do **not** use `npm create @shopify/hydrogen@latest` — that is `@shopify/create-hydrogen@5.0.40`, the classic 2026.4.8 skeleton ([setup.ts](https://github.com/Shopify/hydrogen/blob/main/packages/hydrogen/src/cli/setup.ts), [create-hydrogen dist-tags](https://www.npmjs.com/package/@shopify/create-hydrogen)).
4. **What the toolkit does not ship, we own** (the setup skill says so explicitly): sitemap + robots routes, `meta`/canonical/OG/JSON-LD, image `srcset` helper, the `/account` UI, Open Graph image rendering. All of it already exists in `site/src/lib/seo.tsx` and friends and ports cleanly.
5. **Commerce surfaces:** Storefront API 2026-10 through `createStorefrontClient` (private token, server only); cart through `createCartServerHandlers` at `/api/cart` with line attributes via `register("attributeValue", {key, value})` for size and engraving; Shop Pay via the locally rendered `ShopPayButton`; Customer Accounts via `createCustomerAccountServerHandlers` (HTTPS-only, defer to phase 2); analytics + consent via `ShopifyScripts`; predictive search via `createPredictiveSearchServerHandlers`. Draft orders (builder rings, price-on-request) call the **Admin API from a route `action`** with a secret `ADMIN_API_TOKEN` env var — allowed, nothing in Oxygen forbids outbound fetch; the token never gets a `PUBLIC_` prefix.
6. **Oxygen facts that shape the code:** `workerd` runtime, no Node APIs, worker bundle ≤ 10 MB, startup ≤ 400 ms, 30 s CPU and 128 MB per request, outbound requests must finish in 2 min, `caches.open()` not `caches.default`, included free on Basic, one public environment on Basic ([fundamentals](https://shopify.dev/docs/storefronts/headless/hydrogen/fundamentals), [environments](https://shopify.dev/docs/storefronts/headless/hydrogen/environments)). No `sharp`, no `satori`+wasm **[verify]**, no `node-canvas`. OG images are pre-rendered at build time into `public/og/` or taken from the Shopify CDN with `?width=1200&height=630&crop=center`.
7. **3D/motion:** react-three-fiber 9.8.1 + drei 10.7.9 + three 0.186.1 live in `*.client.tsx` modules and client-only routes (`clientLoader` + `HydrateFallback`); `@google/model-viewer` 4.4.0 imported in `useEffect`; GSAP 3.15 is free for commercial use including ScrollTrigger/SplitText under the Standard "no charge" license; Lenis 1.3.26 (MIT); Motion 14.1 (`motion/react`). View Transitions come from React Router's `viewTransition` prop. Keep all of it out of the server bundle.
8. **CMS:** Shopify metaobjects (free, in admin, already PUBLIC_READ-capable) for journal, stores, house pages. Sanity only if the family outgrows the admin's metaobject editor.
9. **Store-side blockers for the owner:** install the **Hydrogen** sales channel and create the storefront (this is a different channel from the "American Jewelry Headless" publication that already exists), publish the 21 products to it, enable the Customer Account API in the storefront settings when accounts ship, create an Admin custom app with `write_draft_orders` for the secret token, and, at cutover, point `americanjewelers.com` at the Hydrogen storefront and `checkout.americanjewelers.com` at Online Store. Also: the `house.versions` metafield has **no definition** in the store, so it will not be readable from the Storefront API until one is created with `access.storefront: PUBLIC_READ` (§5.9).

---

## 1. Hydrogen today (2026-10-10)

### 1.1 Two Hydrogens, one package name

| | Classic Hydrogen | New Hydrogen (toolkit) |
|---|---|---|
| Versions | `2026.4.0` – `2026.4.7` (last patch 2026-10-02); template `skeleton@2026.4.8` | `2026.10.0` (GA 2026-10-09); previews `2026.10.0-preview.1…5` since June |
| Where | branch `2026-04` of Shopify/hydrogen: `templates/skeleton`, `cookbook/recipes/*`, `packages/hydrogen`, `hydrogen-react`, `cli-hydrogen` | branch `main`: `packages/hydrogen` (core + `/react` + `/vue` + `/vite` + `/customer-account` + `/ts-plugin` entrypoints), `templates/react-router`, `examples/{nextjs,astro,nuxt,sveltekit,solid-start,hydrogen}`, bundled agent `skills/` |
| Framework | React Router **7.16** framework mode (`~7.16.0` peer), Vite 5–8, `@shopify/cli` 3.93 + `cli-hydrogen` 13 | Framework-agnostic core; the RR starter pins `react-router@7.15.1`, Vite 8, `@shopify/cli` 4.8.1, Tailwind v4, Node `^22.12 || ^24` |
| Storefront / Customer Account API | 2026-04 | 2026-10 |
| Built-in | `createHydrogenContext`, `CartForm` + `/cart` action, `Analytics.Provider`, `getSeoMeta`, `Image`, `Money`, `VariantSelector`, `[sitemap.xml]`/`[robots.txt]` routes, Customer Account client + account routes with orders/addresses UI, `storefrontRedirect` | `createStorefrontClient` + typed `gql()`, `handleShopifyRoutes`/`handleShopifyRedirects`, `createCartServerHandlers` + cart store, product form store, predictive search handlers, customer account handlers (no UI), `ShopifyScripts` analytics/consent, local `ShopPayButton`, `formatMoney`, `localHttps()`, route templates, UCP/MCP proxies, `configureLogging` |
| Not built in | — | sitemap/robots, SEO meta helper, `<Image>`/`<Money>` components, account UI, gift cards and `BuyerIdentityUpdate` in cart forms (parity doc) |
| Docs | shopify.dev `/docs/storefronts/headless/hydrogen/*` and `/docs/api/hydrogen/2026-04` (what the docs site serves today) | shopify.dev 2026-10 pages "ship in a few days" ([PR #4167](https://github.com/Shopify/hydrogen/pull/4167), unmerged); until then the **skills in `node_modules/@shopify/hydrogen/skills/*/SKILL.md`** are the API reference, plus `packages/hydrogen/CHANGELOG.md` |

Sources: [repo root on main](https://github.com/Shopify/hydrogen), [`templates/react-router/package.json`](https://github.com/Shopify/hydrogen/blob/main/templates/react-router/package.json), [`2026-04` skeleton package.json](https://github.com/Shopify/hydrogen/blob/2026-04/templates/skeleton/package.json), [CHANGELOG](https://github.com/Shopify/hydrogen/blob/main/packages/hydrogen/CHANGELOG.md), [cart parity](https://github.com/Shopify/hydrogen/blob/main/examples/hydrogen/HYDROGEN_CART_PARITY.md), `npm view @shopify/hydrogen@2026.4.7 peerDependencies` (run 2026-10-10: `react-router ~7.16.0`).

### 1.2 Why the toolkit, not classic, for a store that starts today

- **The API clock.** Classic 2026.4 is bound to Storefront API 2026-04 ("accessible until April 16, 2027"); there has been no classic 2026.7 and the 2026.10 number went to the toolkit, so classic will not get a newer API line. After retirement Shopify "falls forward" to the oldest supported version, so a classic site keeps running but on a drifting schema with no release to carry it ([versioning](https://shopify.dev/docs/api/usage/versioning)). The repo README already files 2026-04 under "Legacy Hydrogen" with a "Migrate to the latest version" link ([PR #4167](https://github.com/Shopify/hydrogen/pull/4167)), and a `migrate-to-hydrogen-2026-10` skill exists ([PR #4023](https://github.com/Shopify/hydrogen/pull/4023)). Shopify has **not** published an end-of-support date for classic **[verify when the 2026-10 docs land]**.
- **Oxygen is first-class in the toolkit now.** The June preview said "deploying to Oxygen through the Shopify CLI isn't wired up yet" ([developer preview post](https://hydrogen.shopify.dev/update/hydrogen-developer-preview)). As of 2026.10.0 the starter ships `"deploy": "shopify hydrogen deploy --assets-dir dist/client --worker-dir dist/server"`, a "Deploy to Oxygen" button at `https://admin.shopify.com/hydrogen/new?template=react-router`, and Shopify's own CI deploys the template to Oxygen on every push to `main` ([create-oxygen-template skill](https://github.com/Shopify/hydrogen/blob/main/skills/create-oxygen-template/SKILL.md), [PR #4110](https://github.com/Shopify/hydrogen/pull/4110)).
- **The June gaps closed.** Customer accounts (`@shopify/hydrogen/customer-account`, handler-owned `/account/login|authorize|refresh|logout`, cart buyer-identity sync) and predictive search (`createPredictiveSearchServerHandlers`, `/api/predictive-search`) are in 2026.10.0 ([CHANGELOG](https://github.com/Shopify/hydrogen/blob/main/packages/hydrogen/CHANGELOG.md), [customer-account skill](https://github.com/Shopify/hydrogen/blob/main/packages/hydrogen/skills/hydrogen-customer-account/SKILL.md), [predictive-search skill](https://github.com/Shopify/hydrogen/blob/main/packages/hydrogen/skills/hydrogen-predictive-search/SKILL.md)).
- **It is agent-first,** which is how this site gets built: `npx @shopify/hydrogen setup` installs 19 skills (`hydrogen-setup`, `-storefront-client`, `-cart-ui`, `-cart-drawer`, `-variant-form`, `-customer-account`, `-predictive-search`, `-analytics`, `-shop-pay`, `-money`, `-image`, `-routing`, `-request-handlers`, `-oxygen`, `-local-https`, `-markets`, `-collection-browser`, `-cart-metafields`, `-smoke-test`) into the project ([skills dir](https://github.com/Shopify/hydrogen/tree/main/packages/hydrogen/skills)).

**The honest risk:** the GA is one day old; shopify.dev docs are not yet published; Weaverse Pilot and hydrogen-sanity still target classic (`^2026.4.7` / `2026.4.4`). Mitigation: pin `2026.10.0`, keep the classic `2026-04` branch open as a pattern reference, and if a genuine blocker appears in week one, the fallback is `npm create @shopify/hydrogen@latest` (classic 2026.4.8) with `"@shopify/hydrogen": "~2026.4.0"` — accepting the April 2027 migration.

### 1.3 Release cadence and upgrade path

- CalVer tied to Storefront API quarters: `YYYY.M.patch`; "patch and minor changesets go to 2026.10.1, and a major goes to 2027.1.0" ([PR #4110](https://github.com/Shopify/hydrogen/pull/4110)). Expect `2027.1.0` in January with Storefront API 2027-01.
- Upgrade: bump the pinned version, read `CHANGELOG.md`, run `npx @shopify/hydrogen skills sync`; `npx @shopify/hydrogen skills check` in CI "exits non-zero when skills are out of date" ([README](https://github.com/Shopify/hydrogen/blob/main/README.md)). The classic `shopify hydrogen upgrade` codemod command does not apply to the toolkit ("Classic Hydrogen CLI commands are disabled for this package", CHANGELOG).

---

## 2. Scaffold and local development

### 2.1 Scaffold

```sh
mkdir storefront && cd storefront
npx @shopify/hydrogen@latest setup      # prompt: 1 = scaffold (default), 2 = add skills to an existing app
npm install
cp .env.example .env                    # mock.shop runs with no credentials
npm run dev                             # http://localhost:3000 (Vite + MiniOxygen = workerd locally)
```

`setup` downloads the compiled template tarball (`codeload.github.com/Shopify/hydrogen/tar.gz/dist-preview`, path `templates/react-router/`; the source carries a TODO to switch to the `dist` branch) and prints "Hydrogen storefront created. Run `npm run dev`" ([setup.ts](https://github.com/Shopify/hydrogen/blob/main/packages/hydrogen/src/cli/setup.ts)). There are no TypeScript/Tailwind/i18n/routes prompts in this flow — the template is already **TypeScript, Tailwind v4 (`@tailwindcss/vite`), single-market (`i18n: {language:'EN', country:'US'}` in `app/lib/shop.ts`), with routes `home, products/:handle, collections, collections/:handle, search, cart, account, *`** ([`app/routes.ts`](https://github.com/Shopify/hydrogen/blob/main/templates/react-router/app/routes.ts), [README](https://github.com/Shopify/hydrogen/blob/main/templates/react-router/README.md)). Those prompts belong to the classic `npm create @shopify/hydrogen@latest` (`--quickstart`, language, styling, markets, routes) ([getting started](https://shopify.dev/docs/storefronts/headless/hydrogen/getting-started)).

Template anatomy worth knowing before touching it: `server.ts` (module Worker: normalises `x-forwarded-proto`, rejects GET bodies, collapses `//`, builds a `RouterContextProvider` with env/cache/`waitUntil`, calls `createRequestHandler`), `app/entry.server.tsx` (`renderToReadableStream`, `isbot` → `await body.allReady` for crawlers, **no CSP helper**), `app/lib/storefront.ts` (`createStorefrontClient` per request), `app/lib/cart-handlers.ts` (`createCartServerHandlers()`), `app/lib/predictive-search-handlers.ts`, `app/lib/customer-account.ts`, `app/lib/session.ts` (signed cookie via `@remix-run/cookie`/`@remix-run/session`), `app/lib/route-templates.ts`, `app/tokens.css`, `react-router.config.ts` (`ssr: true`, `buildDirectory: "dist"`, `future.v8_middleware: true`, `v8_splitRouteModules: true`), `vite.config.ts` (`localHttps()` from `@shopify/hydrogen/vite` enabled only for `dev:https`, `tailwindcss()`, `oxygen()` from `@shopify/mini-oxygen/vite`, `reactRouter()`).

Scripts: `dev` (`hydrogen skills check --mode=warn && vite dev`), `dev:https`, `build` (`react-router build`), `preview` (`react-router build && vite preview`, runs the Worker under MiniOxygen), `typecheck` (`react-router typegen && tsc && hydrogen gql check --fail-on-warn`), `deploy`.

### 2.2 Link to the real store (owner + CLI)

Owner, in admin: install the **Hydrogen sales channel** ([getting started, requirements](https://shopify.dev/docs/storefronts/headless/hydrogen/getting-started)), then **Sales channels › Hydrogen › Create storefront**; keeping "Set up GitHub continuous deployment now" selected connects a repo, creates a preview deployment and opens a PR that adds `.github/workflows/oxygen-deployment-<storefront-id>.yml` ([GitHub deployments](https://shopify.dev/docs/storefronts/headless/hydrogen/deployments/github)). Creating the storefront generates its own Storefront API tokens and `PUBLIC_STOREFRONT_ID`; products must be made available to it (the existing "American Jewelry Headless" publication belongs to the separate Headless app) **[verify in admin that the Hydrogen storefront appears as its own publication; it did in classic]**.

Developer:

```sh
npx shopify hydrogen link        # browser login → pick store → pick/create storefront
npx shopify hydrogen env pull    # writes PUBLIC_STORE_DOMAIN, PUBLIC_STOREFRONT_ID,
                                 # PRIVATE_STOREFRONT_API_TOKEN, (SHOP_ID, PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID)
npx shopify hydrogen env list
```

`env pull` reports any secret it could not retrieve; fill those by hand ([template AGENTS.md](https://github.com/Shopify/hydrogen/blob/main/templates/react-router/AGENTS.md)). `@shopify/cli` 4.x with `@shopify/cli-hydrogen` ≥ 13.0.4 is required for `localHttps()` to push callback URLs ([local-https skill](https://github.com/Shopify/hydrogen/blob/main/packages/hydrogen/skills/hydrogen-local-https/SKILL.md)).

### 2.3 mock.shop before the link

The template auto-detects mode: no `PRIVATE_STOREFRONT_API_TOKEN` ⇒ tokenless `createStorefrontClient({type: "public"})` against `mock.shop` (apparel) or any `*.mock.shop` host listed at `https://mock.shop/llms.txt`; `MOCK_SHOP=1` forces it. Carts work; checkout is mocked; Customer Account API is unavailable ([`.env.example`](https://github.com/Shopify/hydrogen/blob/main/templates/react-router/.env.example), [`app/lib/shop.ts`](https://github.com/Shopify/hydrogen/blob/main/templates/react-router/app/lib/shop.ts)). Our catalog in `site/src/lib/catalog/` can stand in for mock.shop on day one by keeping the `CatalogSource` seam from research 03.

### 2.4 Environment variables

| Var | Who sets it | Where used |
|---|---|---|
| `PUBLIC_STORE_DOMAIN` | Oxygen injects (read-only); `env pull` locally | `getStoreDomain(env)` → `storeDomain` |
| `PRIVATE_STOREFRONT_API_TOKEN` | Oxygen injects | `type: "private"` client, server only; its presence switches off mock mode |
| `PUBLIC_STOREFRONT_ID` | Oxygen injects | `storefrontId` on the client → enables Shopify Analytics (`channel: "hydrogen"`) |
| `PUBLIC_STOREFRONT_API_TOKEN` | Oxygen injects (classic needs it; the toolkit template does not read it) | browser-side queries in classic; the toolkit proxies through `/api/<ver>/graphql.json` instead |
| `SHOP_ID`, `PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID` | Oxygen injects once Customer Account API is enabled | `createCustomerSession({shopId, customerAccountApiClientId})` |
| `SESSION_SECRET` | **you**, ≥ 32 random chars, mark secret | signs the session cookie; the customer-account skill names `CUSTOMER_ACCOUNT_SESSION_SECRET` for encrypted account cookies **[verify which name the template's `customer-account.ts` reads]** |
| `PUBLIC_CUSTOMER_ACCOUNT_API_URL`, `PUBLIC_CHECKOUT_DOMAIN` | classic-only | consent banner / CA auth in classic ([environments](https://shopify.dev/docs/storefronts/headless/hydrogen/environments), [consent](https://shopify.dev/docs/storefronts/headless/hydrogen/analytics/consent)) |
| `ADMIN_API_TOKEN`, `RESEND_API_KEY`, … | you, **secret** checkbox | `context.env` in actions only |

Rules: 110 variables per environment; variables are baked into each immutable deployment, so **redeploy after changing one** (admin "Redeploy" reuses code with current values); rotating the private Storefront token does not redeploy ([environments](https://shopify.dev/docs/storefronts/headless/hydrogen/environments)). The Worker reads env only through its `env` argument — never `process.env` ([oxygen skill](https://github.com/Shopify/hydrogen/blob/main/packages/hydrogen/skills/hydrogen-oxygen/SKILL.md)).

---

## 3. Oxygen runtime, platform and deployment

### 3.1 Limits (primary source: [Hydrogen and Oxygen fundamentals](https://shopify.dev/docs/storefronts/headless/hydrogen/fundamentals))

- Runtime: "worker-based JavaScript runtime built on Cloudflare's open-source `workerd`"; Fetch, Cache, Streams, Web Crypto; "some Node.js APIs aren't available".
- Worker: **≤ 10 MB bundle**, **≤ 400 ms startup**, entry `index.js` (+ optional `index.js.map`), **30 s CPU per request**, **128 MB memory** ("exceeding this may drop requests"), **outbound requests must finish within 2 minutes**, 110 env vars.
- Static assets (served from `public/` / `dist/client`): images 20 MB, video 1 GB, 3D models 500 MB, other files 20 MB.
- No published request or bandwidth quota; Acceptable Use Policy applies; "proxies in front of Oxygen deployments aren't supported" (no Cloudflare orange-cloud in front of it).
- Runtime quirks ([oxygen-runtime](https://shopify.dev/docs/storefronts/headless/hydrogen/deployments/oxygen-runtime)): `fetch` only inside the request handler (never at module top level); `Request` is read-only (construct a new one); `caches.default` unsupported → `caches.open('hydrogen')`; cache `put` returns 413 when too large and ignores `stale-while-revalidate`; responses with `Set-Cookie` are not cached unless `Cache-Control: private=Set-Cookie`; `eval`/`new Function` unavailable; **`Date.now()` is frozen at the last I/O**; `setTimeout` only inside the handler; `TextEncoder` UTF-8 only; Web Crypto replaces `node:crypto`; `WritableStream` constructor unavailable; large bodies must be streamed.
- Compatibility dates: deploys carry a compatibility flag updated quarterly with Storefront API releases (since Hydrogen 2024.10.1).

### 3.2 npm packages that break, and the replacements

| Breaks on Oxygen | Why | Use instead |
|---|---|---|
| `sharp`, `node-canvas`, `@resvg/resvg-js` | native binaries / `fs` | Shopify CDN transforms (§3.3); pre-render at build |
| `@vercel/og`, `next/og` | bundles wasm the Workers way does not accept ([workers-og README](https://github.com/kvnang/workers-og)) | `workers-og@0.0.27` (satori 0.15.2 + `@resvg/resvg-wasm` 2.4.0 + yoga-wasm-web) is written for Workers **[verify it survives Oxygen's single-file esbuild bundling and the 10 MB cap once fonts are inlined]**; safer: build-time PNGs |
| `next/image`, `next/font`, `next/headers`, `next/cache` | Next-only | §3.3 images, §3.4 fonts, `request.headers`, loader caching |
| `lru-cache`, module-scope singletons, `process.env`, `Buffer`, `node:*` | not a Node process; module scope is shared across requests | Workers cache + `waitUntil`; create storefront/cart/session clients **per request** ([oxygen skill](https://github.com/Shopify/hydrogen/blob/main/packages/hydrogen/skills/hydrogen-oxygen/SKILL.md)) |
| CommonJS-only deps in the server bundle | ESM worker | keep them client-only or replace |

### 3.3 Images and Open Graph

- The toolkit has **no `<Image>`**; its guidance is a tiny helper + plain `<img>`: `shopifyImageUrl(url, {width, height, crop})` rewrites only `cdn.shopify.com`/`mock.shop` hosts with `URL.searchParams`, and `srcSetFor()` returns a `1x, 2x` set ([image skill](https://github.com/Shopify/hydrogen/blob/main/packages/hydrogen/skills/hydrogen-image/SKILL.md)). Write ours with a width ladder instead: `?width=` (max 5760), `?height=`, `?crop=top|center|bottom|left|right|region` (+ `crop_left/top/width/height`), never upscaled, one dimension required ([image_url filter](https://shopify.dev/docs/api/liquid/filters/image_url)); the Storefront API `ImageTransformInput` also takes `preferredContentType` and `scale` on `image.url(transform:)`. Pattern (≤ 15 lines):

```tsx
const W = [320, 480, 640, 960, 1280, 1600, 2000];
export function Photo({src, alt, sizes, crop, ratio, priority}: Props) {
  const u = (w: number, h?: number) => { const x = new URL(src);
    x.searchParams.set('width', String(w)); if (h) x.searchParams.set('height', String(h));
    if (crop) x.searchParams.set('crop', crop); return x.toString(); };
  const srcSet = W.map(w => `${u(w, ratio ? Math.round(w / ratio) : undefined)} ${w}w`).join(', ');
  return <img src={u(960)} srcSet={srcSet} sizes={sizes} alt={alt} width={960}
    height={ratio ? Math.round(960 / ratio) : undefined} loading={priority ? 'eager' : 'lazy'}
    fetchPriority={priority ? 'high' : undefined} decoding="async" />;
}
```

  Photos shot for the house stay on the Shopify CDN (product media or Files), which is also where `cdn.shopify.com` preconnect already points. Classic's `<Image>` (`data`, `aspectRatio`, `sizes`, `srcSetOptions`, `crop`, `loader`) is the same idea packaged ([classic Image docs, 2026-04](https://shopify.dev/docs/api/hydrogen/2026-04/components/image)) and can be copied if preferred.
- **OG images:** the current `/pieces/[handle]/opengraph-image` route uses Satori + a WOFF at request time; on Oxygen do it at build: a Node script (`scripts/og.ts`, satori + `@resvg/resvg-js`, runs in CI, not in the Worker) writes `public/og/<handle>.png`, and the route's `meta` points `og:image` at `https://<host>/og/<handle>.png` (1200×630). For pieces whose hero photo is enough, `og:image` = CDN URL with `?width=1200&height=630&crop=center`. Keep the dynamic-at-request option (`workers-og`) as a phase-2 experiment.

### 3.4 Fonts

Self-host `EBGaramond` and the text face as `woff2` in `public/fonts/`, declare `@font-face { font-display: swap; }` in `app/app.css`, and preload the two display files from the root `links()`:

```ts
export const links: Route.LinksFunction = () => [
  {rel: 'preload', href: '/fonts/EBGaramond-Variable.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous'},
  {rel: 'stylesheet', href: appStylesHref},
];
```

Metric-matched fallbacks that `next/font` generated must be written by hand (`@font-face { font-family: 'EB Garamond Fallback'; src: local('Times New Roman'); size-adjust: …; ascent-override: …; }`) — the values are what `next/font` computed; copy them from the current build output **[verify numbers]**.

### 3.5 Caching

- Toolkit: `createStorefrontClient({…, config: {cache, waitUntil, …}})` takes the `caches.open('hydrogen')` instance; strategies are passed per call (the CHANGELOG's own code uses `Cache.long()`); details are in `node_modules/@shopify/hydrogen/skills/hydrogen-storefront-client/references/caching.md` **[verify exact strategy names and the per-query option key there — the shipped SKILL.md only points to the reference file]**.
- Classic semantics (the same CDN underneath): `CacheShort()` = `public, max-age=1, stale-while-revalidate=9`; `CacheLong()` = `public, max-age=3600, stale-while-revalidate=82800`; `CacheNone()` = `no-store`; `CacheCustom({mode, maxAge, staleWhileRevalidate, sMaxAge, staleIfError})`; default sub-request strategy `public, max-age=1, stale-while-revalidate=86399`; Customer Account data is never cached; Oxygen does not support `no-cache` ([caching](https://shopify.dev/docs/storefronts/headless/hydrogen/caching)). Third-party fetches: `createWithCache({cache, waitUntil, request})` → `withCache.fetch(url, init, {cacheKey, cacheStrategy, shouldCacheResponse, displayName})` / `withCache.run({cacheKey, cacheStrategy, shouldCacheResult}, fn)`; ≥ 400 responses are never cached ([createWithCache](https://shopify.dev/docs/api/hydrogen/latest/utilities/caching/createwithcache), [third-party recipe](https://github.com/Shopify/hydrogen/blob/2026-04/cookbook/recipes/third-party-api/README.md)).
- **Full-page caching** is just the `Cache-Control` header your loader/`headers` export returns: catalog pages `public, max-age=60, stale-while-revalidate=86400`; anything personal `private` or `no-store` (cart, account, search with a cookie). Sitemap and robots: `public, max-age=86400`.
- Streaming: React Router 7 loaders return promises directly (no `defer()` — it is gone; `<Await>` + `<Suspense>` render them). The classic skeleton's `loadCriticalData` + `loadDeferredData` split is the pattern to keep: await the product, stream recommendations and the cart ([migration skill: routing-and-loaders](https://github.com/Shopify/hydrogen/pull/4023)).

### 3.6 Redirects, sitemap, robots

- `handleShopifyRoutes({request, requestContext, sessionManager, storefrontClient, routeTemplates, handlers})` runs **before** the router and owns `/api/<version>/graphql.json` (the same-origin Storefront proxy that analytics and consent require), `/__shopify/*`, `/.well-known/ucp`, `/checkout`, `/cart/{variantId}:{qty}`, `/buy/…`, `/cart.js`, `/cart/add.js`, `/api/mcp`, `/graphiql` (dev), `?variant=` → option-param 302s, plus whatever handler groups you pass (`/api/cart`, `/api/predictive-search`, `/account/*`). `handleShopifyRedirects({request, storefrontClient, routeTemplates})` runs **only on a router 404**: `/admin`, standard-path → custom-path redirects, **Shopify admin URL redirects** (Online Store › Navigation › URL redirects — use these for the american.jewelry 301 map), and same-origin `return_to`/`redirect` params ([request-handlers skill](https://github.com/Shopify/hydrogen/blob/main/packages/hydrogen/skills/hydrogen-request-handlers/SKILL.md)). Classic's equivalent is `storefrontRedirect({request, response, storefront, matchQueryParams, noAdminRedirect})` in `server.ts` ([storefrontRedirect](https://shopify.dev/docs/api/hydrogen/latest/utilities/storefrontredirect)).
- Sitemap/robots: the toolkit removed `getSitemap`/`getSitemapIndex` ("own the sitemap routes", migration skill). Write RR7 resource routes `app/routes/sitemap[.xml].tsx` (index → `/sitemap/pieces.xml`, `/sitemap/designs.xml`, `/sitemap/journal.xml`, with `<image:image>` entries from product media) and `app/routes/robots[.]txt.tsx` returning `Response` objects with `Cache-Control: public, max-age=86400`. Port `site/src/app/sitemap.ts` and `robots.ts`. Note Oxygen serves `robots.txt` as written **only on the public production environment with a custom domain**; every other deployment gets a disallow-all override ([SEO docs](https://shopify.dev/docs/storefronts/headless/hydrogen/seo)) — this also means no accidental indexing of previews.

### 3.7 Deploy, environments, domains, secrets

- **GitHub integration** (recommended): the generated workflow runs on `push`, `npm ci`, then `npx shopify hydrogen deploy` with `SHOPIFY_HYDROGEN_DEPLOYMENT_TOKEN` from `secrets.OXYGEN_DEPLOYMENT_TOKEN_<id>`; **every push creates a preview deployment**, the default branch deploys production; PR comments with preview links are enabled under Storefront settings › Oxygen deployments ([GitHub deployments](https://shopify.dev/docs/storefronts/headless/hydrogen/deployments/github)). Edit the generated workflow to call `npm run deploy` (the template's flags `--assets-dir dist/client --worker-dir dist/server`) **[verify whether plain `npx shopify hydrogen deploy` autodetects the `dist/` layout; the oxygen skill says default Vite layouts "usually need no extra flags", the template passes them anyway]**. If the storefront lives in a subdirectory of the repo, add `--path storefront` / `SHOPIFY_HYDROGEN_FLAG_PATH`.
- **CLI:** `npx shopify hydrogen deploy [--env <handle> | --env-branch <git-branch> | --preview] [--force] [--no-lockfile-check] [--auth-bypass-token --auth-bypass-token-duration 12] [--build-command …] [--entry ./server] [--metadata-description …] [--no-verify] [--token …] [--assets-dir …] [--worker-dir …] [--path …]` ([hydrogen deploy](https://shopify.dev/docs/api/shopify-cli/hydrogen/hydrogen-deploy)). Tokens for other CI: Storefront settings › Oxygen deployments › Create new token (valid one year) ([custom CI/CD](https://shopify.dev/docs/storefronts/headless/hydrogen/deployments/custom-ci-cd)).
- **Environments:** `production` (default branch) and `preview` (every other branch) are mandatory; `custom` environments map to named branches (e.g. `staging`). Each has its own variables and a stable URL that follows the latest deployment; deployments are immutable; production/custom support rollback ("Make this the current deployment") and redeploy; preview does not. Private by default (store login); **Basic allows one public environment** — that is production ([environments](https://shopify.dev/docs/storefronts/headless/hydrogen/environments), [deployments](https://shopify.dev/docs/storefronts/headless/hydrogen/deployments)). Retention: ≥ 6 months, last 10 per environment always kept; logs 1 month (add a log drain for longer).
- **Shareable links** (Basic and above) bypass login for previews with a token; search engines are blocked on them.
- **Custom domain** (official steps, [redirect traffic](https://shopify.dev/docs/storefronts/headless/hydrogen/migrate/redirect-traffic)): (1) DNS for apex and `www` to Shopify per the help-center records (A `23.227.38.65`, CNAME `shops.myshopify.com` are Shopify's standard values **[verify in admin's Domains screen]**); (2) Settings › Domains: `checkout.americanjewelers.com` → target **Online Store**, type Primary (checkout lives there); (3) Sales channels › Hydrogen › storefront › production › Edit environment › URL privacy **Public**; (4) Settings › Domains: `americanjewelers.com` and `www` → target the **production Hydrogen storefront**, Primary; (5) remove Online Store password. Non-Plus stores get one primary domain. The cookie banner "doesn't work on `*.myshopify.dev`", so consent can only be tested on the custom domain or locally.
- **Secrets:** Storefront settings › Environments and variables › Add variable › "Make this value secret" (hidden after save) and tick the target environments; `npx shopify hydrogen env push` can upload a local `.env` **[verify push semantics for secrets]**.

---

## 4. Plan availability

"Oxygen is included at no extra charge on paid plans: Starter, Basic, Grow, Advanced, Plus, and Pause and build"; excluded from Agentic plans; dev/trial stores get no public environment ([fundamentals](https://shopify.dev/docs/storefronts/headless/hydrogen/fundamentals)). Basic-specific limits found: 1 public environment, shareable links allowed, one primary domain. The store is on **Basic** (live `shop.plan.publicDisplayName = "Basic"`). Checkout on a custom subdomain is available on all plans (research 03 §1.2). No Plus-only feature is required by this build (combined listings remain Plus-only; we model versions as separate products, as decided in 03).

---

## 5. Commerce pieces built in (and how we use them)

### 5.1 Storefront client and typed GraphQL

```ts
// app/lib/storefront.ts (template)
const client = createStorefrontClient({
  type: 'private',
  requestContext: createShopifyRequestContext({request, i18n, buyerIp: getBuyerIp(request.headers)}),
  config: {storeDomain, privateStorefrontToken, storefrontId: env.PUBLIC_STOREFRONT_ID, cache, waitUntil},
});
const {data, errors, headers} = await client.graphql(PRODUCT_QUERY, {variables: {handle, selectedOptions}});
```

`type` is `"public"` (tokenless/mock), `"private"` (trusted `buyerIp`) or `"private_no_buyer_context"` (prerender/background). `gql(string, fragments?)` returns a branded document; types come from `StorefrontApi.ResultOf<typeof Q>`; `$country`/`$language` are injected from `requestContext.i18n` when the document declares `@inContext`; transport errors throw `StorefrontApiError`/`StorefrontTimeoutError`, GraphQL errors come back in `errors` ([storefront-client skill](https://github.com/Shopify/hydrogen/blob/main/packages/hydrogen/skills/hydrogen-storefront-client/SKILL.md)). Add `"plugins": [{"name": "@shopify/hydrogen/ts-plugin"}]` to `tsconfig.json` (template does) and keep `hydrogen gql check --fail-on-warn` in `typecheck`.

### 5.2 Product page: options, variants, URL state

Server: `getSelectedProductOptions({searchParams})` (the `variant` param is reserved and redirected by `handleShopifyRoutes` when `routeTemplates` is passed) → query `selectedOrFirstAvailableVariant(selectedOptions:$selectedOptions, ignoreUnknownOptions:true, caseInsensitiveMatch:true)`, `adjacentVariants`, `options { name optionValues { name swatch firstSelectableVariant {…} } }`, `encodedVariantExistence`, `encodedVariantAvailability`. Client: `createProductFormStore` / `useProductForm(store)` derives availability with no network calls; `register("optionValue", {optionName, value})` for swatches (real GET links `?Metal=14k+Yellow&Version=Diamond` so they work without JS), `register("merchandiseId")`, `register("quantity")`, `register("attributeValue", {key: "Ring size"})`, `register("attributeValue", {key: "Engraving"})`, `register("addToCart")`, `canAddToCart(...)`; `buildProductSelectionSearchParams({selectedOptions, optionNames, base})` builds links and `style: "variant"` emits a shareable `?variant=<id>` ([variant-form skill](https://github.com/Shopify/hydrogen/blob/main/packages/hydrogen/skills/hydrogen-variant-form/SKILL.md), [CHANGELOG 2026.10.0](https://github.com/Shopify/hydrogen/blob/main/packages/hydrogen/CHANGELOG.md)). Our options are **Version × Metal**; size and engraving are line attributes exactly as the HANDOFF specifies.

Classic equivalents, for reading the 2026-04 docs: `getSelectedProductOptions(request)`, `useOptimisticVariant`, `getAdjacentAndFirstAvailableVariants`, `useSelectedOptionInUrlParam`, `redirectIfHandleIsLocalized` ([skeleton `products.$handle.tsx`](https://github.com/Shopify/hydrogen/blob/2026-04/templates/skeleton/app/routes/products.%24handle.tsx)).

### 5.3 Cart: persistence, optimistic UI, line attributes

- Server: `createCartServerHandlers()` registered in `handleShopifyRoutes` serves `/api/cart`; the cart id lives in a cookie it manages; pass `customerSession` to attach buyer identity when accounts ship ([cart-ui skill](https://github.com/Shopify/hydrogen/blob/main/packages/hydrogen/skills/hydrogen-cart-ui/SKILL.md), [`cart-handlers.ts`](https://github.com/Shopify/hydrogen/blob/main/templates/react-router/app/lib/cart-handlers.ts)).
- Client: `CartProvider initialData={loaderData.cartData}` (seeded from `cartHandlers.get()` in the root loader), `useCart`/`useSuspenseCart`, mutations through Shopify Standard Actions (`window.Shopify.actions.updateCart`), optimistic updates reconciled on `shopify:cart:*` events; `useCartActions().refresh()` after any out-of-band change (e.g. a draft-order flow). Line forms: `register("lineId")`, `register("quantity", {interactive: true})`, `register("set")` on a `<button>`; cart-level `attributes-update`, `note-update`, `discount-apply/remove`.
- **Line attributes**: `{key, value}[]` set at add time via `register("attributeValue")`; "the same variant with different attributes creates separate lines"; render them under the variant, skipping `_`-prefixed keys. Shopify shows non-underscore keys in checkout, order emails and admin — so `Ring size: 7`, `Engraving: "ad astra"`, `_design_code: AJ-…` ([cart-ui skill](https://github.com/Shopify/hydrogen/blob/main/packages/hydrogen/skills/hydrogen-cart-ui/SKILL.md)).
- Known parity gaps vs classic `CartForm`: gift cards, `BuyerIdentityUpdate`, and action `warnings/errors` payloads ([parity doc](https://github.com/Shopify/hydrogen/blob/main/examples/hydrogen/HYDROGEN_CART_PARITY.md)). None matter for launch; buyer email is captured at checkout.
- Classic reference: `CartForm action={CartForm.ACTIONS.LinesAdd} inputs={{lines:[{merchandiseId, quantity:1, attributes:[{key:'Engraving', value}]}]}}` → route `action` → `cart.addLines()` → `cart.setCartId()` headers ([CartForm](https://shopify.dev/docs/api/hydrogen/latest/components/cartform), [skeleton `cart.tsx`](https://github.com/Shopify/hydrogen/blob/2026-04/templates/skeleton/app/routes/cart.tsx)).

### 5.4 Checkout and Shop Pay

The cart's `checkoutUrl` points at the checkout domain; `/checkout` and `/cart/<id>:<qty>` on our origin are forwarded by `handleShopifyRoutes`. `ShopPayButton` from `@shopify/hydrogen/react` renders locally as `<hydrogen-shop-pay-button>` with a declarative shadow root (no external script, works before hydration); props `variants [{id, quantity}]` (omit for cart checkout), `disabled`, `width`, `borderRadius`, `checkoutUrl` (omit when `handleShopifyRoutes` serves `/checkout`), `channel`, `nonce`, `accessibilityLabel` ([shop-pay skill](https://github.com/Shopify/hydrogen/blob/main/packages/hydrogen/skills/hydrogen-shop-pay/SKILL.md)). Shop Pay itself requires Shopify Payments to be active in the store **[verify in admin]**. The family's "no financing banners" rule still applies — Shop Pay installments messaging stays off.

### 5.5 Customer Account API (phase 2)

Toolkit: `createCustomerSession({shopId, customerAccountApiClientId})` at module scope; `createCustomerAccountServerHandlers` registered in `handleShopifyRoutes` owns `GET /account/login`, `GET /account/authorize`, `GET /account/refresh`, `POST /account/logout`; the app builds `/account` itself (Hydrogen "ships no account UI yet") — or renders Shopify's `<shopify-account>` web component by passing `account: true` to `ShopifyScripts` (new in 2026.10.0). Queries use `gql`/`createCustomerAccountClient` from `@shopify/hydrogen/customer-account` with the access token per call; logout must be a native form POST. **Local dev needs a public-looking HTTPS origin**: `npm run dev:https` → `localHttps()` provisions mkcert (`npx hydrogen certs install`), serves on `local.tryhydrogen.dev` (resolves to 127.0.0.1) and pushes the callback (`…/account/authorize`), JavaScript origin (no port) and logout URLs into the storefront's Customer Account API settings through Shopify CLI; CI and dev stores fall back to manual entry ([customer-account skill](https://github.com/Shopify/hydrogen/blob/main/packages/hydrogen/skills/hydrogen-customer-account/SKILL.md), [local-https skill](https://github.com/Shopify/hydrogen/blob/main/packages/hydrogen/skills/hydrogen-local-https/SKILL.md), [classic CA guide](https://shopify.dev/docs/storefronts/headless/building-with-the-customer-account-api/hydrogen)). Owner step: Hydrogen storefront › Customer Account API › Application setup (switch client type to Public if origin/logout fields are missing). New customer accounts (passwordless 6-digit code, Sign in with Shop) are the default on all plans; only "connect your own identity provider" is Plus ([help center](https://help.shopify.com/en/manual/customers/customer-accounts)). Orders and addresses are Customer Account API queries (`customer { orders(first:) { … } addresses { … } }`) **[verify exact 2026-10 field names against `customer-account.schema.json` shipped in the package]**.

### 5.6 Analytics and consent

`<ShopifyScripts i18n shop={{storefrontId, …}} analytics={{channel:'hydrogen'|'headless', customData}} consent={analyticsConsent} routes navigate />` rendered once in `<head>` of `root.tsx`; trackers `PageViewedTracker`, `CartAnalyticsTracker`, and a `ProductViewedTracker` that calls `window.Shopify.analytics.publish(AnalyticsEvent.PRODUCT_VIEWED, {products:[{id, title, price /* MoneyV2 object */, vendor, variantId, variantTitle, quantity, sku}]})`. Consent: Shopify Customer Privacy gates all destinations; `consent.mode: "custom-banner"` requires an async `setup()` that syncs a third-party CMP; GA4/Meta are `analytics.addDestination({name, setup({subscribe}) {…}})` consumers with `getTrackingValues()` for `uniqueToken`/`visitToken`. Analytics depends on the same-origin Storefront proxy ([analytics skill](https://github.com/Shopify/hydrogen/blob/main/packages/hydrogen/skills/hydrogen-analytics/SKILL.md), [CHANGELOG](https://github.com/Shopify/hydrogen/blob/main/packages/hydrogen/CHANGELOG.md), [template root.tsx](https://github.com/Shopify/hydrogen/blob/main/templates/react-router/app/root.tsx)). Classic names: `Analytics.Provider shop={getShopAnalytics({storefront, publicStorefrontId})} cart consent={{checkoutDomain, storefrontAccessToken, withPrivacyBanner}}` + `Analytics.ProductView` ([classic skeleton root](https://github.com/Shopify/hydrogen/blob/2026-04/templates/skeleton/app/root.tsx)). Configure the banner regions in admin Settings › Customer privacy › Cookie banner (US-only store: it will rarely show).

### 5.7 Predictive search and full search

`createPredictiveSearchServerHandlers({fragments, predictiveSearchEndpoint})` → `GET /api/predictive-search?q=&limit=&limitScope=&types=&searchableFields=&unavailableProducts=`; client store handles debounce/abort/stale responses; `getPredictiveSearchItemUrl()` builds links with our route templates and keeps `trackingParameters`; the full `/search?q=` route must work without JS (`role="search"` GET form) ([predictive-search skill](https://github.com/Shopify/hydrogen/blob/main/packages/hydrogen/skills/hydrogen-predictive-search/SKILL.md), [search tracking](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/search-discovery/search-tracking)). A 21-piece catalog barely needs it; keep the drawer for designs/journal later.

### 5.8 SEO: `meta`, canonical, JSON-LD

The template builds `meta` by hand (title/description only, no canonical/OG) and the setup skill lists SEO as "app-owned". Port `site/src/lib/seo.tsx` into `app/lib/seo.ts` with a `seoMeta({title, description, url, image, jsonLd[]})` that returns the RR7 `MetaDescriptors` array (`{title}`, `{name:'description'}`, `{tagName:'link', rel:'canonical', href}`, `{property:'og:*'}`, `{'script:ld+json': {...}}`). Classic's `getSeoMeta(parentSeo, seo)` does exactly this (fields `title, titleTemplate, description, url, media, jsonLd, robots, alternates, handle`; jsonLd types `Product, ItemList, Organization, WebSite, WebPage, BlogPosting, Thing`; merges like `Object.assign` except `jsonLd`, strips query params from canonical) and is MIT — lift its source from `packages/hydrogen/src/seo/getSeoMeta.ts` on the `2026-04` branch rather than depending on classic ([getSeoMeta](https://shopify.dev/docs/api/hydrogen/latest/utilities/getseometa)). Everything in HANDOFF §8 (JewelryStore graph, `Product` with man-made qualifier, `AggregateOffer`, `BreadcrumbList`, `ItemList`, `FAQPage`, `Article`) carries over unchanged. Add `<meta name="robots" content="max-image-preview:large">` in root.

### 5.9 Metafields and metaobjects in Storefront queries (store facts, read live 2026-10-10)

Admin GraphQL `metafieldDefinitions(ownerType: PRODUCT, namespace: "house")` returns **10 definitions, all `access.storefront: PUBLIC_READ`**: `tier`, `design`, `piece_type`, `house_ref` (single_line_text), `lead_time` (single_line_text), `made_to_order`, `engravable` (boolean), `sizes`, `collections` (list.single_line_text), `specs` (json). `custom.model_source_embed` (url) is PUBLIC_READ. Variant definitions `house.stones`, `house.origin` are PUBLIC_READ. Shop plan: Basic. Publications: Online Store, Point of Sale, **American Jewelry Headless** (no Hydrogen publication yet).

**Gap:** HANDOFF lists a `house.versions` (JSON per version) metafield, but there is **no definition for it**. Metafields written without a definition are not exposed to the Storefront API; create the definition (`type: json`, `access: {storefront: PUBLIC_READ}`) via the connector, and the existing values attach to it. Query shape:

```graphql
product(handle: $handle) {
  specs: metafield(namespace: "house", key: "specs") { value type }
  house: metafields(identifiers: [
    {namespace: "house", key: "tier"}, {namespace: "house", key: "design"},
    {namespace: "house", key: "sizes"}, {namespace: "house", key: "engravable"},
    {namespace: "custom", key: "model_source_embed"}
  ]) { key value type reference { ... on MediaImage { image { url altText } } } }
}
```

Metaobjects: `metaobjects(type:"journal_article", first: 50, sortKey:"updated_at", reverse:true) { nodes { handle type updatedAt seo { title { value } description { value } } fields { key type value reference { … } references(first:10) { nodes { … } } } } }` and `metaobject(handle: {type, handle})`; needs the `unauthenticated_read_metaobjects` scope (the Headless/Hydrogen tokens have it) and the definition's storefront access set to `PUBLIC_READ`; `seo` is non-null only with the `renderable` capability ([metaobjects query](https://shopify.dev/docs/api/storefront/2026-10/queries/metaobjects), [Metaobject](https://shopify.dev/docs/api/storefront/2026-10/objects/Metaobject), [classic metaobjects recipe](https://github.com/Shopify/hydrogen/blob/2026-04/cookbook/recipes/metaobjects/README.md) for the `parseSection` pattern and `rich_text_field` → JSON AST rendering).

### 5.10 Custom-priced items: draft orders from an Oxygen action

Nothing in Oxygen restricts outbound `fetch`, and the hydrogen-oxygen skill's only rule is "create clients per request" and keep private bindings out of the browser. Pattern:

```ts
// app/lib/admin.server.ts  — only ever imported from route actions
export async function adminGraphql<T>(env: Env, query: string, variables: object) {
  const r = await fetch(`https://${env.PUBLIC_STORE_DOMAIN}/admin/api/2026-10/graphql.json`, {
    method: 'POST',
    headers: {'content-type': 'application/json', 'X-Shopify-Access-Token': env.ADMIN_API_TOKEN},
    body: JSON.stringify({query, variables}),
  });
  if (!r.ok) throw new Error(`admin ${r.status}`);
  return (await r.json()) as {data: T; errors?: unknown[]};
}
```

`ADMIN_API_TOKEN` = Admin API access token of a **custom app** (Settings › Apps and sales channels › Develop apps) with `write_draft_orders`, stored as a **secret** environment variable, no `PUBLIC_` prefix, read only inside `action`s (`draftOrderCreate` with a custom line item + `customAttributes`, then `draftOrderInvoiceSend`, as in research 03 §1.4). `@shopify/admin-api-client` is fetch-based and also works **[verify in MiniOxygen]**; the plain fetch above has no dependency. Never return the token or the raw draft order in loader data.

---

## 6. 3D and motion on Hydrogen / React Router 7

### 6.1 Client-only code, three ways

1. **`*.client.tsx` modules / `.client/` directories** are excluded from the server bundle; their exports are `undefined` on the server, so use them only in `useEffect` or event handlers ([client modules](https://reactrouter.com/api/framework-conventions/client-modules)). Put `three`, `@react-three/fiber`, `@react-three/drei`, `gsap`, `lenis`, `@google/model-viewer`, and the iJewel SDK behind this boundary — it also keeps them out of the 10 MB worker and the 400 ms startup budget.
2. **Client-only routes**: export `clientLoader` + `HydrateFallback` and no `loader`; the fallback renders during SSR, the component renders only in the browser ([client data](https://reactrouter.com/how-to/client-data)). Right for `/build/ring`.
3. **Mount gate** inside an SSR'd page: `const [ready, setReady] = useState(false); useEffect(() => setReady(true), [])` and `ready && <RingViewer/>`, with the poster image rendered on the server (LCP-safe facade from research 03 §6).

```tsx
// app/components/three/RingViewer.client.tsx
import {Canvas} from '@react-three/fiber';
import {ParametricRing} from './ParametricRing';
export function RingViewer(props: RingProps) { return <Canvas dpr={[1, 2]}>…</Canvas>; }

// app/routes/build.ring.tsx
export async function clientLoader({request}) { return decode(new URL(request.url).searchParams); }
export function HydrateFallback() { return <BuilderSkeleton/>; }
export default function Builder({loaderData}: Route.ComponentProps) { … }
```

Vite: r3f "will also work out of the box" with Vite; v9 pairs with React 19 ([r3f install](https://r3f.docs.pmnd.rs/getting-started/installation)). If `vite preview`/MiniOxygen complains about `three` in SSR optimisation, add it to `ssr.noExternal`/`optimizeDeps.exclude` **[verify once the port runs]**. The existing `brilliant.ts`, `band.ts`, `studio.ts`, `ParametricRing.tsx` (drei `MeshRefractionMaterial`) are framework-free and port as files.

### 6.2 `@google/model-viewer` 4.4.0 (npm, read 2026-10-10)

Import it in an effect so the custom element registers only in the browser: `useEffect(() => { import('@google/model-viewer'); }, [])`, then render `<model-viewer src poster loading="lazy" reveal="interaction" camera-controls ar ar-modes="webxr scene-viewer quick-look" variant-name="…" />` (attributes per [modelviewer.dev docs](https://modelviewer.dev/docs/)). Declare the JSX intrinsic element type once in `env.d.ts`. The family's current rule is no AR/true-scale — keep `ar` off until iJewel takes over.

### 6.3 GSAP, Lenis, Motion, View Transitions, scroll-driven CSS

- **GSAP 3.15.0**: "GSAP is now 100% free for all users, thanks to Webflow's support"; the Standard License covers commercial use and **all plugins** (ScrollTrigger, SplitText, MorphSVG…); only visual no-code animation builders that compete with Webflow's need written consent; no attribution; npm license field reads `Standard 'no charge' license: https://gsap.com/standard-license` ([pricing](https://gsap.com/pricing/), [standard license](https://gsap.com/community/standard-license/)). Register plugins in a `.client.ts` module; use `useGSAP` from `@gsap/react` inside client components.
- **Lenis 1.3.26**, MIT: `new Lenis({autoRaf: true})` in an effect (or drive from `gsap.ticker.add(t => lenis.raf(t*1000))` + `lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker.lagSmoothing(0)`); `data-lenis-prevent` on nested scrollers; `lenis/react` has `<ReactLenis root>` ([lenis README](https://github.com/darkroomengineering/lenis)). Research 03 §6 and the family's "no scroll-jacking" instinct argue for using it lightly or not at all on a luxury PDP.
- **Motion 14.1.0** (`npm i motion`, `import {motion} from 'motion/react'`), tree-shakable, SSR-safe (it renders initial styles on the server) ([quick start](https://motion.dev/docs/react-quick-start)) **[verify RR7 + React 19 compatibility note in motion.dev/docs/react-installation]**.
- **View Transitions** are native to React Router: `<Link to viewTransition>`, `navigate(to, {viewTransition: true})`, `useViewTransitionState(href)` to apply `view-transition-name` only during the transition; default is a cross-fade ([view transitions](https://reactrouter.com/how-to/view-transitions)). This replaces nothing we had and gives the gallery → piece morph for free.
- **Scroll-driven CSS** (`animation-timeline: view()`) — the `.reveal` approach already in the site — is pure CSS and works unchanged.

### 6.4 Bundle budget

The 10 MB cap is the **server** bundle; client chunks are static assets. Still: three + r3f + drei ≈ 600 KB gz, GSAP core ≈ 25 KB gz, Lenis ≈ 3 KB, Motion ≈ 18–34 KB depending on imports. Split by route (`v8_splitRouteModules` is on in the template), load 3D on interaction, and verify with `npx vite build` output sizes. Keep `isbot` streaming behaviour (crawlers get full HTML).

---

## 7. Open-source starters and references to copy from

| Project | URL | Status (read 2026-10-10) | Lift |
|---|---|---|---|
| Hydrogen React Router template | https://github.com/Shopify/hydrogen/tree/main/templates/react-router | 2026.10, deploys to Oxygen in Shopify's CI | **Our base.** `server.ts`, `entry.server.tsx`, `lib/*` handlers, cart drawer, search drawer, `tokens.css` approach |
| Toolkit skills | https://github.com/Shopify/hydrogen/tree/main/packages/hydrogen/skills | 19 skills + `references/` | API reference until shopify.dev 2026-10 pages publish |
| Toolkit example app (`examples/hydrogen`) | https://github.com/Shopify/hydrogen/tree/main/examples/hydrogen | E2E'd, has `HYDROGEN_CART_PARITY.md` | `/discount/:code`, `/cart/:lines`, cart parity notes |
| Classic skeleton | https://github.com/Shopify/hydrogen/tree/2026-04/templates/skeleton | 2026.4.8, RR 7.16 | `[sitemap.xml].tsx`, `sitemap.$type.$page[.xml].tsx`, `[robots.txt].tsx`, account routes (orders/addresses UI), `products.$handle.tsx` query shape, `root.tsx` `shouldRevalidate` |
| Classic cookbook recipes | https://github.com/Shopify/hydrogen/tree/2026-04/cookbook/recipes | `b2b, bundles, combined-listings, custom-cart-method, express, gtm, infinite-scroll, legacy-customer-account-flow, markets, metaobjects, multipass, partytown, subscriptions, third-party-api` | **`metaobjects`** (route/section metaobject model + `parseSection`), **`third-party-api`** (`createWithCache` client in context), `gtm` |
| Classic demo store | https://github.com/Shopify/hydrogen-demo-store (hydrogen.shop) | not archived, pushed 2026-07-01; a 2026-10 migration PR exists (#158) | Full-featured classic UI: PDP gallery, account pages, policies; and its migration PR as a worked example |
| Weaverse Pilot | https://github.com/Weaverse/pilot | MIT, pushed 2026-10-08, `@shopify/hydrogen ^2026.4.7`, RR 7.16, Tailwind 4, needs `WEAVERSE_PROJECT_ID` | Section patterns, Judge.me/Klaviyo wiring, Playwright E2E setup; not a base (Weaverse-bound, classic) |
| hydrogen-sanity + example storefront | https://github.com/sanity-io/hydrogen-sanity (`examples/storefront`) | `@shopify/hydrogen 2026.4.4`, RR 7.18 | `createSanityContext`, `loadQuery` cached with `CacheLong`, visual editing; AKVA was its predecessor demo |
| Vercel Shop (Next.js) | linked from the toolkit README | Next.js starter on the same core | Reference only; shows the toolkit's framework-neutral surface |
| `@shopify/hydrogen-react` | https://www.npmjs.com/package/@shopify/hydrogen-react | latest 2026.4.4, classic companion | Source for `Image`, `Money`, `ShopPayButton` (classic props `variantIds`, `storeDomain`) if you want to vendor a component |

No luxury/fashion Hydrogen storefront is open source with a permissive license that I could verify; the demo store and Pilot are the richest public references.

---

## 8. CMS for family-editable content

**Recommendation: Shopify metaobjects.** They are free, live in the admin the family already uses, support `publishable` (draft/active), `renderable` (SEO fields) and `translatable` capabilities, `rich_text_field`, file references, lists and references between entries, and are already queryable from the Storefront API with `PUBLIC_READ` (research 03 §1.3). Definitions to create: `journal_article` (title, handle, dek, body rich_text, hero file, author, published_at, related products), `store_location` (already modelled in 03), `house_page_section` (heading, body, image, link) and `design` (tier, story, hero, launch_date). Metaobject definitions and entries are created once through the connector; the admin's metaobject editor is good enough for a family editing a few pages a month. Cost: the editor is plainer than a CMS; rich text is a JSON AST you render yourself (the classic recipe shows the shape).

**Sanity** (Connect for Shopify syncs products/variants/collections into Sanity and can push custom fields back as metafields/metaobjects; Free plan: 20 seats, 10k documents, 1M CDN requests, 100 GB bandwidth; Growth $15/seat/month; synced products count toward document limits) is the upgrade if the family wants visual editing, presentation previews, or a real editorial workflow — `hydrogen-sanity` already targets Hydrogen but is on classic today ([Sanity Connect](https://www.sanity.io/docs/sanity-connect-for-shopify), [pricing](https://www.sanity.io/pricing), [hydrogen-sanity](https://github.com/sanity-io/hydrogen-sanity)). Not now.

---

## 9. iJewel on Hydrogen

- **Iframe path (launch):** read `custom.model_source_embed` (PUBLIC_READ, type `url`) in the product query and render iJewel's documented markup: `<iframe src={url} title={`${title} — interactive 3D viewer`} loading="lazy" allow="autoplay; fullscreen; xr-spatial-tracking; web-share" allowFullScreen style={{width:'100%', minHeight: 420, aspectRatio: '4 / 3', border: 0}} />`, only when the value is non-empty; the value is "the generated embed URL, not the full iframe code" ([iJewel Shopify embedding](https://docs.ijewel3d.com/integrations/shopify-embedding.html)). Keep research 03's facade: poster tile first, iframe on click/scroll. Add `frame-src https://ijewel3d.com` if we add a CSP (the template has none; classic's `createContentSecurityPolicy` in `entry.server.tsx` is the model if we want one).
- **Mini Viewer SDK (band builder, later):** `new ijewelViewer.Viewer(container, project, options)` needs a DOM element and dispatches `ijewel-viewer-ready` / `ijewel-scene-ready` / `ijewel-file-data` on `window`; helpers live on `window.ijewelViewer` in the IIFE bundle ([Viewer class](https://docs.ijewel3d.com/viewer/viewer-class.html)). There is no `@ijewel3d/mini-viewer` on npm (404 on 2026-10-10), so load the IIFE bundles from `releases.ijewel3d.com` (WebGi `bundle-0.22.0.js` + `mini-viewer/0.6.18/bundle.nowebgi.iife.js`, research 03 §2.3) with a `loadScript()` in a `.client.ts` module inside `useEffect`, resolve on `ijewel-viewer-ready`, and tear down on unmount. Never import it server-side; never reference `window` at module scope.

---

## 10. Gotchas when porting from Next.js 16 App Router

| Next.js | Hydrogen / React Router 7 | Notes |
|---|---|---|
| Server Components, `async` page components | **Do not exist.** Data comes from `loader` (server) / `clientLoader`; components are plain React | Every `await` in a component moves into a loader; `Route.ComponentProps.loaderData` is typed by `react-router typegen` |
| `generateMetadata` | `export const meta: Route.MetaFunction = ({data, matches}) => […]` | Returns descriptors; parent `matches[0].data` for site-wide defaults; JSON-LD via `{'script:ld+json': obj}` |
| `next/image` | `<img srcset>` + Shopify CDN params (§3.3) | No transformation service on Oxygen; width ladder + `sizes` |
| `next/font` | self-hosted `woff2` + `@font-face` + `links()` preload | Hand-write metric overrides |
| `'use cache'`, `cacheComponents`, `revalidateTag`, ISR | `Cache-Control` on route responses + per-query `cache` strategy; Shopify webhooks are unnecessary (SWR handles it) | No build-time prerender; everything is SSR + edge cache. The `cacheComponents` 404-as-200 bug disappears: `throw new Response(null, {status: 404})` from the loader |
| Server Actions | `export async function action({request, context})` + `<Form>`/`useFetcher`; cart goes through `/api/cart` Standard Actions | Validate `formData` server-side; return `data(result, {headers})` |
| `proxy.ts` / middleware | `server.ts` (before the router) or RR7 `middleware` (`v8_middleware` is on) | `handleShopifyRoutes` already sits before the router |
| `app/sitemap.ts`, `robots.ts`, `opengraph-image.tsx` | resource routes returning `Response`; OGs pre-rendered | §3.3, §3.6 |
| `next/headers` `cookies()` | `request.headers.get('cookie')`; session via `app/lib/session.ts` | Commit the session and forward `Set-Cookie` |
| `process.env` | `context.env` / the Worker `env` argument | Read in `server.ts`/loaders; `PUBLIC_` only for values that may reach the browser |
| `dynamic(() => import(), {ssr:false})` | `.client.tsx` modules, `clientLoader`+`HydrateFallback`, mount gate | §6.1 |
| `redirect()` from `next/navigation` | `throw redirect('/x', 301)` from `react-router` | Legacy 301 map goes into Shopify admin URL redirects, applied by `handleShopifyRedirects` on 404 |
| `notFound()` | `throw new Response('Not found', {status: 404})` + `ErrorBoundary` with `isRouteErrorResponse` | Gives a real 404 status |
| `localStorage` bag + Saved list | real cart (`CartProvider`); Saved stays `localStorage` in a client module | Line attributes carry size/engraving |
| Vercel env `VERCEL_FORCE_NO_BUILD_CACHE` | n/a; Oxygen builds are fresh per deployment | |
| `Date.now()` in render | frozen per request on Oxygen | Compute "figures as of" dates in the loader from a constant, not the clock |

Other traps recorded by Shopify's migration skill: delete route files for handler-owned URLs (`/api/cart`, `/account/login` …) or they shadow the handlers; `return await` the `handleShopifyRoutes` result inside `try/catch`; render every cart surface from the cart store, not loader data; gate line controls on optimistic identity; `@shopify/mini-oxygen ^4.2.0` and `buildDirectory: 'dist'` are floors; `localHttps()` needs an explicit `enabled`; gql result types are partial unions, so narrow ([PR #4023](https://github.com/Shopify/hydrogen/pull/4023)). Classic-only helpers you will see in older docs and must not reach for: `createHydrogenContext`, `CartForm`, `Analytics.*`, `getSeoMeta`, `getSitemap`, `storefrontRedirect`, `<Image>`, `<Money>`, `useOptimisticCart`.

---

## 11. Build order (first ten steps)

1. **Owner (admin, 10 min):** install the Hydrogen channel from the App Store; Sales channels › Hydrogen › Create storefront "American Jewelry" with GitHub CD to a new repo `bradnbelew/american-jewelry-storefront` (a separate repo keeps the Vercel site deploying from `american-jewelry` untouched until cutover); make the 21 products available to the new storefront; create a custom app with `write_draft_orders` and hand over the Admin token through the admin UI (never chat).
2. **Scaffold locally:** `npx @shopify/hydrogen@latest setup` (choose 1) in the new repo; `npm i`; pin `"@shopify/hydrogen": "2026.10.0"`; `npm run dev` on mock.shop; commit.
3. **Link:** `npx shopify hydrogen link` → `npx shopify hydrogen env pull` → set `SESSION_SECRET` (`openssl rand -hex 32`) in `.env` and as a secret in both environments; `npm run dev` now shows the 21 pieces.
4. **Route templates + routes:** `createShopifyRouteTemplates({product: '/pieces/:productHandle', collection: '/collections/:collectionHandle', search: '/search', cart: '/bag'})` in `app/lib/route-templates.ts`; declare `/`, `/:tier`, `/designs/:slug`, `/collections/:slug`, `/pieces/:handle`, `/build/ring`, `/build/band`, `/design/:code(/certificate)`, `/stores(/:slug)`, `/appointments`, `/house`, `/services`, `/journal(/:slug)`, `/saved`, `/bag`, `/natural-or-man-made`, `/commission`, `/care`, `/policies`, `*` in `app/routes.ts`; delete `routes/catchall` placeholder content but keep the catch-all for 404s. `npm run typecheck`.
5. **Design system:** move `site/src/app/globals.css` into `app/app.css`/`tokens.css`, fonts to `public/fonts/` with preloads, `Section`/`SplitOpener`/`PhotoOpener`/`SectionTitle`/`Mark` as plain components; decide Tailwind off (the site is hand-written CSS; remove `@tailwindcss/vite` to keep the rules in HANDOFF §8 intact).
6. **Catalog layer:** port `site/src/lib/catalog/*` and `photos.ts` as the editorial source; write `app/lib/queries/*.ts` (`gql` + fragments) for product, collection, metafields (§5.9); create the missing `house.versions` definition; wire tier/design/collection pages to the Storefront API with `house.*` filters; `Cache-Control: public, max-age=60, stale-while-revalidate=86400` on catalog loaders.
7. **PDP:** `getSelectedProductOptions` → `selectedOrFirstAvailableVariant`; option links for Version × Metal; size dropdown and engraving field as `register("attributeValue")`; price via `formatMoney`; `ShopPayButton`; iJewel iframe facade; `ProductViewedTracker`; JSON-LD via the ported `seoMeta`.
8. **Bag + checkout:** keep the template's cart drawer and `/api/cart`; `/bag` page rendered from the cart store; "Checkout" → `checkoutUrl`; test one real add-to-cart on the linked store and confirm `Ring size`/`Engraving` attributes appear on the Shopify order (abandoned checkout is enough).
9. **SEO plumbing + builder:** `sitemap[.xml].tsx`, `sitemap.pieces[.xml].tsx` (with images), `robots[.]txt.tsx`; `scripts/og.ts` → `public/og/*.png`; `/build/ring` as a `clientLoader` route with `RingViewer.client.tsx`; `/design/:code` server-rendered from `code.ts`; draft-order action for builder rings via §5.10.
10. **Ship:** merge the Oxygen workflow PR (edited to `npm run deploy`), push → production deployment on `<id>.myshopify.dev`; set production env **Public**; add `ADMIN_API_TOKEN`/`RESEND_API_KEY` secrets and redeploy; run `/`, a piece, a collection, `/search`, `/bag`, `/account` on the preview URL (the toolkit's own smoke list); then phase 2: Customer Accounts via `dev:https`, consent banner on the custom domain, domain cutover per §3.7.

---

## 12. Sources

Shopify / Hydrogen (primary)
- npm `@shopify/hydrogen` dist-tags and peer deps (read with `npm view`, 2026-10-10): https://www.npmjs.com/package/@shopify/hydrogen — `latest: 2026.10.0`, `preview: 2026.10.0-preview.5`; `@shopify/create-hydrogen latest 5.0.40`; `@shopify/cli-hydrogen latest 13.0.6`; `@shopify/hydrogen-react latest 2026.4.4`
- GitHub releases: https://github.com/Shopify/hydrogen/releases
- Repo `main` README (toolkit, legacy branch note, `~2026.4.0` advice): https://github.com/Shopify/hydrogen/blob/main/README.md
- Package CHANGELOG 2026.10.0: https://github.com/Shopify/hydrogen/blob/main/packages/hydrogen/CHANGELOG.md
- Release/GA PRs: https://github.com/Shopify/hydrogen/pull/4110 · https://github.com/Shopify/hydrogen/pull/4163 · docs link PR https://github.com/Shopify/hydrogen/pull/4167 · migration skill PR https://github.com/Shopify/hydrogen/pull/4023
- `setup` CLI source (scaffold tarball): https://github.com/Shopify/hydrogen/blob/main/packages/hydrogen/src/cli/setup.ts
- React Router template: package.json, README, AGENTS.md, `.env.example`, `server.ts`, `react-router.config.ts`, `vite.config.ts`, `app/routes.ts`, `app/root.tsx`, `app/entry.server.tsx`, `app/lib/{shop,storefront,cart-handlers}.ts`, `app/routes/product.tsx` under https://github.com/Shopify/hydrogen/tree/main/templates/react-router
- Skills: https://github.com/Shopify/hydrogen/tree/main/packages/hydrogen/skills (`hydrogen-oxygen`, `-image`, `-storefront-client`, `-variant-form`, `-cart-ui`, `-customer-account`, `-request-handlers`, `-routing`, `-analytics`, `-predictive-search`, `-local-https`, `-shop-pay`, `-money`, `-setup`) and https://github.com/Shopify/hydrogen/blob/main/skills/create-oxygen-template/SKILL.md
- Cart parity: https://github.com/Shopify/hydrogen/blob/main/examples/hydrogen/HYDROGEN_CART_PARITY.md
- Classic `2026-04` branch: skeleton package.json/server.ts/context.ts/cart.tsx/products.$handle.tsx/root.tsx and `cookbook/recipes/{metaobjects,third-party-api}` under https://github.com/Shopify/hydrogen/tree/2026-04
- Developer preview announcement (June 2026): https://hydrogen.shopify.dev/update/hydrogen-developer-preview
- Getting started (classic flow): https://shopify.dev/docs/storefronts/headless/hydrogen/getting-started
- Fundamentals (Oxygen plans, limits): https://shopify.dev/docs/storefronts/headless/hydrogen/fundamentals
- Oxygen runtime quirks: https://shopify.dev/docs/storefronts/headless/hydrogen/deployments/oxygen-runtime
- Deployments, GitHub, custom CI, CLI deploy: https://shopify.dev/docs/storefronts/headless/hydrogen/deployments · https://shopify.dev/docs/storefronts/headless/hydrogen/deployments/github · https://shopify.dev/docs/storefronts/headless/hydrogen/deployments/custom-ci-cd · https://shopify.dev/docs/api/shopify-cli/hydrogen/hydrogen-deploy · https://shopify.dev/docs/api/shopify-cli/hydrogen
- Environments and variables: https://shopify.dev/docs/storefronts/headless/hydrogen/environments
- Domains / redirect traffic: https://shopify.dev/docs/storefronts/headless/hydrogen/migrate/redirect-traffic
- Caching: https://shopify.dev/docs/storefronts/headless/hydrogen/caching · https://shopify.dev/docs/api/hydrogen/latest/utilities/caching/createwithcache
- SEO / sitemap / robots: https://shopify.dev/docs/storefronts/headless/hydrogen/seo · https://shopify.dev/docs/api/hydrogen/latest/utilities/getseometa
- Redirects: https://shopify.dev/docs/api/hydrogen/latest/utilities/storefrontredirect
- CartForm (classic): https://shopify.dev/docs/api/hydrogen/latest/components/cartform
- Customer Account API with Hydrogen (classic guide): https://shopify.dev/docs/storefronts/headless/building-with-the-customer-account-api/hydrogen · customer accounts help: https://help.shopify.com/en/manual/customers/customer-accounts
- Analytics consent: https://shopify.dev/docs/storefronts/headless/hydrogen/analytics/consent · https://shopify.dev/docs/storefronts/headless/hydrogen/analytics
- Shop Pay button (classic hydrogen-react): https://shopify.dev/docs/api/hydrogen-react/latest/components/shoppaybutton
- Search tracking: https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/search-discovery/search-tracking
- API versioning and support windows: https://shopify.dev/docs/api/usage/versioning · April 2026 classic release: https://shopify.dev/changelog/posts/hydrogen-april-2026-release
- Storefront API: https://shopify.dev/docs/api/storefront/2026-10/queries/metaobjects · https://shopify.dev/docs/api/storefront/2026-10/objects/Metaobject · image params: https://shopify.dev/docs/api/liquid/filters/image_url
- Store facts: Admin GraphQL `metafieldDefinitions`, `shop.plan`, `publications` read through the Shopify connector on 2026-10-10

Libraries
- React Router: https://reactrouter.com/api/framework-conventions/client-modules · https://reactrouter.com/how-to/client-data · https://reactrouter.com/how-to/view-transitions
- react-three-fiber: https://r3f.docs.pmnd.rs/getting-started/installation (npm: fiber 9.8.1, drei 10.7.9, three 0.186.1)
- model-viewer: https://modelviewer.dev/docs/ (npm 4.4.0)
- GSAP: https://gsap.com/pricing/ · https://gsap.com/community/standard-license/ (npm 3.15.0)
- Lenis: https://github.com/darkroomengineering/lenis (npm 1.3.26)
- Motion: https://motion.dev/docs/react-quick-start (npm 14.1.0)
- workers-og: https://github.com/kvnang/workers-og (npm 0.0.27)
- iJewel: https://docs.ijewel3d.com/integrations/shopify-embedding.html · https://docs.ijewel3d.com/viewer/viewer-class.html
- Weaverse Pilot: https://github.com/Weaverse/pilot · hydrogen-sanity: https://github.com/sanity-io/hydrogen-sanity · Sanity Connect: https://www.sanity.io/docs/sanity-connect-for-shopify · Sanity pricing: https://www.sanity.io/pricing · Hydrogen demo store: https://github.com/Shopify/hydrogen-demo-store

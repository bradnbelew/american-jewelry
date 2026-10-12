# Decisions log

Purpose: every dated decision about the house, the brand and the site, with why and where it was recorded. Newest at the bottom of each day.
Last updated: 2026-10-11
Sources: memory notes (american-jewelry-family-business, -remake-oxygen, -shopify), HANDOFF.md, docs/REMAKE-BLUEPRINT.md, git log (c50cfce to e9c9941).

Format: date | decision | why | source

## 2026-10-08

- 2026-10-08 | Reposition from "average local family jeweler" to a high-end American house of fine jewelry, "the Cartier of America" (references Cartier, Van Cleef & Arpels, Harry Winston, Rolex, Patek, Ralph Lauren) | family ambition | memory: american-jewelry-family-business
- 2026-10-08 | Line structure: Royal American (one-of-one, price on request), Americana (natural diamonds; gold, birthstone and diamond versions), New American (man-made diamonds, D-F/VVS/IGI, "New American Standard") | user's own words | memory: american-jewelry-family-business
- 2026-10-08 | Hierarchy: line, then design motif (Shooting Star, Prism, Signal, Grid), then piece types, then versions, plus cross-line Collections | user's own words (paraphrased; the house never writes "curated" in public) | memory: american-jewelry-family-business
- 2026-10-08 | Designs never cascade down a line; bridal settings are shared with the stone as a labeled choice | protects the natural line's value | memory; docs/new-american-tier.html "Guardrails"
- 2026-10-08 | The user's brother designs every piece | fact | memory
- 2026-10-08 | Build a photo-led house site (Next.js draft on Vercel, noindexed) | first mockup | git c50cfce, f2b0332
- 2026-10-08 | Not "the first American house" | Tiffany owns that line; false | HANDOFF "What this is"; brand-playbook part one

## 2026-10-09

- 2026-10-09 | "man-made diamond", hyphenated, with "(laboratory-grown)" and the IGI report on the spec line; never unqualified "diamond", never "real/genuine/natural" for it | FTC Jewelry Guides 16 CFR 23.12; clarity | HANDOFF rule 3
- 2026-10-09 | No "Made in America/Tennessee", no "handmade"; provenance line "Designed in Tennessee. Set and finished in our workshop. Diamonds and gold are imported." | FTC Made in USA rule; Jewelry Guides on "handmade" | HANDOFF rule 3; research/04
- 2026-10-09 | No comparative resale/value or environmental claims for either stone | NAD precedent cuts both ways; Green Guides | HANDOFF "luxury pass" 9 and rule 3
- 2026-10-09 | Set qualities at set sizes only; no stone inventory or browsing. Natural = F-G, VS1, GIA. Man-made = D-F, VVS, IGI | calm, house-like; no comparison shopping | HANDOFF rule 2
- 2026-10-09 | No discounts, countdowns, popups, reviews on product pages, financing banners, urgency. Price grammar: fixed price; "From $" when the stone varies; "Price on request" only for one-of-ones | luxury price grammar | HANDOFF rule 4
- 2026-10-09 | No Tier I/II/III labels | | HANDOFF rule 5
- 2026-10-09 | No low-contrast text; `.on-photo` plus a real overlay over photographs; muted text no lighter than #63676e | legibility | HANDOFF rule 6
- 2026-10-09 | True scale and AR removed; no 3D-printed replica; iJewel may own this later | family direction | HANDOFF rule 7; memory
- 2026-10-09 | All hand-drawn SVG line-drawing mockups removed; photographs stand in | user: they were "hurting the demonstration" | HANDOFF session 3 item 3; memory
- 2026-10-09 | No "vibe-coded" UI: no bordered cards, chips, icons, decorative gradients, rounded-everything; controls fixed height with 1px borders in every state; nothing shifts when clicked | anti-template | HANDOFF rule 8
- 2026-10-09 | Logo work paused; placeholder mark (Mark.tsx, icon.svg) | | HANDOFF rule 9
- 2026-10-09 | Builder: low friction, compact, iJewel-style panel; one label row per decision over one control; ring named and priced once; finer adjustments under one disclosure | | HANDOFF rule 10; git 7df64e9
- 2026-10-09 | Never count the lines in public ("three tiers", "three doors"); names stand alone; "tier" stays in code only | | HANDOFF rule 11; git b2dcd84
- 2026-10-09 | Lexicon: no Maison, atelier, savoir-faire, bespoke; no exclamation points; register = object as subject, numbers as adjectives, one honesty line per page | research/05 watch-house study | HANDOFF session 3 item 10
- 2026-10-09 | No self-serving aggregateRating in schema; hours enter schema only when confirmed | Google policy; honesty | HANDOFF session 3 item 8
- 2026-10-09 | Shopify store e8d51b-f4 holds the catalog (21 products, `house.*` metafields); code stays the source of truth for the catalog | | HANDOFF "Shopify"; memory: american-jewelry-shopify
- 2026-10-09 | Retire from the web: 484-SKU bridal catalog, stone browsing, moissanite, silver, demi-precious, estate (until chosen with care), sale rail, birthday club, financing banners, "Forever starts here", "favorite jeweler", Master Jeweler titles, chat bubble | not a house | REMAKE-BLUEPRINT §3 (from research/09)

## 2026-10-10

- 2026-10-10 | Keep everything under Shopify; REMAKE (not port) on Hydrogen 2026.10.0, hosted on Oxygen, in `storefront/`; `site/` is the rough draft until cutover | one platform; custom React storefront | memory: american-jewelry-remake-oxygen; REMAKE-BLUEPRINT §1
- 2026-10-10 | Type: Libre Caslon Display + Libre Caslon Text + Public Sans; EB Garamond and Jost retired | research/08 | REMAKE-BLUEPRINT §2 (Typeface A default; family may still choose B or C)
- 2026-10-10 | Palette: paper, bone, ink, ink-2, muted, hair, navy (Royal American and bag only), gold (hairlines and numerals at 24px+ only), stone (3D ground); white only behind product photography | | REMAKE-BLUEPRINT §2; house.css
- 2026-10-10 | Signature feature "the stone is set" on design pages and the top of the builder; not on home by default | one feature that belongs to the product | REMAKE-BLUEPRINT §2, §9
- 2026-10-10 | Copy budgets per page (home 110-150 words, line 60-90, design 120-180, product 90 above the fold + 160 folded, builder 60, store 80, House 250-350) | as few words as possible | REMAKE-BLUEPRINT §2
- 2026-10-10 | AI-tell corrections: labels sentence case (`.label`), never tracked caps; no middle-dot meta strings; no reveal on every section (photos `.settle` only); hairlines only inside tables and lists; caps only on nav and buttons | Anthropic frontend-design skill flags these as AI tells | HANDOFF remake section; git 9d3c508, 3b75a26
- 2026-10-10 | Search dropped for the mock | | HANDOFF remake section
- 2026-10-10 | Anything importing three.js is a `*.client.tsx` module | Oxygen worker deploy failed otherwise | git 5150ea2
- 2026-10-10 | Oxygen CD from GitHub on every push; master = production | | git 481c1a8, 60a4743
- 2026-10-10 | iJewel embeds via `custom.model_source_embed`; Free plan until launch; Professional ($1,500/yr) to remove attribution is a launch decision | | docs/IJEWEL-WORKFLOW.md; git beb5e84

## 2026-10-11

- 2026-10-11 | `docs/briefs/` is the source of truth for house canon; root `CLAUDE.md` imports `00-house-canon.md` | sessions kept forgetting the rules | this briefs build
- 2026-10-11 | Home hero is the house's own hand frame (`hero-hand`); the box shot stays Royal American's | one image per page, the hand is a distinctive asset (research/17 §2) | P1 build
- 2026-10-11 | The home bench slot shows a render of a bench cast file labeled as such until the bench loop is shot | no honest bench photograph exists; a borrowed bench would be a false fact | P1 build, docs/briefs/PHOTOS-TODO.md
- 2026-10-11 | The House letter is one shared text (`app/lib/catalog/letter.ts`) shown as the home's last screen and on /house | the letter is said once; the home ends with the letter and the two addresses | P1 build
- 2026-10-11 | "The stone is set" is built in code on the Signal design page: GSAP ScrollTrigger scrub over one pinned viewport, Lenis only on that page, poster first, poster only under reduced motion or without WebGL | the Blender clip can replace the code timeline later (research/14 §4.3) | P1 build
- 2026-10-11 | Pointer-reactive light = the key directional light follows the pointer plus a 3 degree lean of the ring; no per-frame environment re-render; off on touch and under reduced motion | moves the fire in the refraction stone at no extra render pass | P1 build
- 2026-10-11 | Footer carries no email capture | nothing in the canon or briefs asks for one; capture is a store tell | P1 build
- 2026-10-11 | Photographs are served as WebP width variants (`scripts/photos.mjs`, `public/photos/w`) through `Pic`'s srcset | the single 2000px JPEG was every slot's LCP | P1 build

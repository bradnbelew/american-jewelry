# Claims and compliance

Purpose: the legal essentials behind every word on the site, in ads and on paper; claims allowed and forbidden; disclosures per page. Research, not legal advice: counsel signs off before launch.
Last updated: 2026-10-11
Sources: research/04-compliance-trust-local.md (§1-§5, Synthesis a-d); docs/website-blueprint.html "Words"; HANDOFF rule 3; storefront policies draft; outside research (FTC URLs inline). Section numbers are as cited in research/04; confirm against the current eCFR before relying on any number **[verify]**.

## The rules that bite

- **FTC Jewelry Guides, 16 CFR Part 23 (revised 2018-07-24)** cover labels, ads, site copy, receipts and social posts; deception is judged by net impression. Tennessee Consumer Protection Act (Tenn. Code §47-18-104) adds a private right of action. (research/04 §1.1; https://www.ftc.gov/news-events/news/press-releases/2018/07/ftc-approves-final-revisions-jewelry-guides)
- **"Diamond" alone means natural.** A man-made stone is never an unqualified "diamond" (§23.12). Unqualified "diamond" also needs 17 or more polished facets.
- **Man-made stones** must be "immediately preceded with equal conspicuousness" by "laboratory-grown", "laboratory-created", "[manufacturer]-created" or a phrase of like meaning (§23.25 as cited in research/04; https://www.ftc.gov/business-guidance/resources/loupe-advertising-diamond-gemstones-pearls). "Faux" is inadequate. "Grown" alone, "above-ground" and "foundry" are inadequate (2019 warning letters).
- **"Man-made diamond" is usable** as a phrase of like meaning, with conditions: hyphenated, directly before "diamond", same font, size, weight and color, every time, everywhere (titles, H1, spec table, cart line, receipts, ads, alt text, filenames, URLs, email subjects, hashtags, schema `name`). A line name ("New American") is not a disclosure. Add "laboratory-grown" once per selling page in the spec line. Counsel must confirm. (research/04 §1.4; outside research §10)
- **One consistent qualifier.** The FTC's 2019 letters cited sellers who mixed "cultured" and "lab grown". (https://www.ftc.gov/business-guidance/blog/2019/04/warning-letters-re-mined-diamond-sellers-describe-products-accurately)
- **Proximity.** A FAQ or education page never cures an unqualified product title.
- **"Real, genuine, natural, precious"** never for man-made (§23.27). Do not call natural "real" as a contrast either (NAD 2021).
- **Treatments** that are not permanent, need special care or affect value are disclosed before purchase (§23.24). Man-made: print the report's growth method and "as grown" or the treatment. Natural: disclose laser drilling, fracture filling, HPHT, irradiation.
- **"Flawless" or "perfect"** only if no flaws are visible at 10x (§23.13). VVS is not flawless. **Current catalog copy says "flawless to the loupe" for VVS stones: remove it** (see open questions).
- **Gold:** karat directly before "gold" ("14k gold"); "solid" never on hollow, plated or filled pieces; write "solid 14k gold". Disclose rhodium plating on white gold as maintenance. Plating and vermeil terms only above the Guides' thresholds; we sell none. (§23.3-§23.7 per research/04)
- **Weights:** "ct tw" with equal conspicuousness; center weight stated separately (§23.18).
- **Hand work:** "handmade" or "hand-wrought" only if every step from raw material is by hand (§23.2(a)). CAD-modeled cast pieces never qualify. "Hand-set", "hand-finished", "hand-polished", "hand-engraved" are fine when that specific operation is manual (§23.2(b)). The family bans "handmade" outright, including for Royal American (research/04 §1.10's exception is not adopted).
- **Made in USA (16 CFR Part 323):** unqualified claims need "all or virtually all" US content; the FTC's own example is imported gold in a US-cast ring. State claims ("Made in Tennessee") and "handmade in [place]" count; the FTC sent warning letters on exactly these on 2026-07-06 (research/04 Part 2). Penalties reach $53,088 per violation where a rule applies. The house name plus line names create an implied-origin context, so every product page carries the provenance line.
- **Environmental claims (Green Guides, 16 CFR 260):** no "sustainable", "eco-friendly", "green", "ethical", "carbon-neutral". "Recycled gold" only with refiner certification and a percentage. "Conflict-free" only with Kimberley Process System of Warranties paperwork; for man-made say "not mined" or nothing. No leaf or earth icons near man-made pieces. Get written supplier representations on Russian-origin stones (EO 14068).
- **Grading reports:** "GIA report" when the stone has one; never "GIA-certified". Since 2025-10-01 GIA gives man-made stones only "Premium" or "Standard", so a D-F, VVS promise is an IGI promise; never imply GIA grades for man-made. (research/04 §4.1)
- **Appraisals** never serve as a price anchor (16 CFR 233).
- **Pricing (16 CFR 233):** no "was" prices without a bona fide former price, no fictitious MSRP, no resale, value-retention or investment claims for either stone.
- **Warranty (Magnuson-Moss):** over $10 must be labeled "Full" or "Limited"; "lifetime" must say whose life; the full text available before purchase near the product (16 CFR 702.3) plus a non-internet way to request it. Proposed split: "Limited Lifetime Warranty" (defects, original owner) and "Lifetime Care Program" (cleaning, inspection, prong checks). Old site's warranty kept in substance until counsel rewrites it.
- **Mail Order Rule (16 CFR 435):** a reasonable basis for every ship time; state production time on the product page and at checkout; delay notices with a cancel right.
- **Financing (TILA/Reg Z):** any "$X/mo" needs APR and term within one click; "as low as 0% APR", never "0% APR" alone or "no credit check". Family rule: financing is never advertised; at most "Financing available in store." below the fold.
- **Reviews (16 CFR 465, effective 2024-10-21):** no fake, bought or AI reviews; no incentives conditioned on sentiment; no suppression; no implying displayed reviews are all reviews. No `aggregateRating` from Google reviews in our schema.
- **Accessibility:** build to WCAG 2.2 AA, publish a statement, no overlays.
- **Privacy:** CalOPPA policy; CAN-SPAM; written consent for SMS (TCPA); Tennessee breach notice law. TIPA and CCPA likely do not apply at current size. (research/04 §4.9)
- **Pre-owned Rolex:** "pre-owned Rolex", "authenticated by our watchmaker", "not affiliated with or authorized by Rolex". Never "authorized dealer" or "certified by Rolex"; never call an aftermarket-modified watch a Rolex.

## Claims allowed (Decided unless noted)

- "Designed in Tennessee. Set and finished in our workshop. Diamonds and gold are imported." (exact)
- "Man-made diamond (laboratory-grown), D-F, VVS, IGI report, as grown."
- "Natural diamond, F-G, VS1, GIA report."
- "Solid 14k gold, karat-marked." "14k white gold, rhodium-plated."
- "Hand-set." "Hand-finished." "Made to order, about 3 weeks." (only with a reasonable basis)
- "One of one. Never made again." (Royal American; define it: never reproduced, design retired)
- "2,537 Google reviews between two stores, as of [date]." (store pages only, dated)

## Claims forbidden (Decided)

Made in America/USA/Tennessee and every variant; handmade; first American house; sustainable, eco, ethical, conflict-free (unqualified); real, genuine, natural or precious for man-made; unqualified "diamond" for man-made; flawless or perfect for VVS; investment or resale; comparative price or value between the stones; GIA-certified; authorized Rolex dealer; any discount or reference price.

## Disclosures per page

| Page | Must carry |
|---|---|
| Every page | qualifier discipline in nav, footer, meta, Open Graph, URLs, alt text; footer links: Privacy, Terms, Shipping and insurance, Returns, Warranty and care, Accessibility |
| Line pages | New American's first line states origin and lab; one "laboratory-grown" spec line; no eco language; Royal American defines "one of one" |
| Product page | qualified title and H1; karat (and rhodium); provenance line in the spec table; lab, report number, verify link, inscription; growth and treatment line; center vs ct tw; 4Cs; natural treatments; size and resizability ("full eternity bands cannot be resized; we remake them"); production time; return status; warranty link; true-size note for enlarged photos and renders (§23.1 Note 3) |
| Builder | "Natural diamond" or "Man-made diamond" on every stone choice; running spec panel; approval note ("custom pieces are final once approved"); deposit terms |
| Cart, checkout, confirmation | qualifier and karat on every line item (receipts are marketing); ship time; insurance and signature; unchecked email and SMS consent; policy links before pay |
| Store pages | NAP identical to Google; hours from one source; dated review count, attributed; no aggregateRating |
| Services | "quoted before work begins"; price list marked "from"; Rolex disclaimer if watches appear |
| Journal | every claim checkable; outside facts cited |

## Questions for counsel (research/04 lists 15; the essentials)

1. "Man-made diamond" as the house qualifier, and whether "laboratory-grown" must appear in titles or only spec lines.
2. The provenance sentence and the implied-origin risk of the house and line names.
3. Warranty drafting (Limited vs Full; "lifetime" whose life).
4. Deposit forfeiture terms under Tennessee law.
5. Pre-owned Rolex language after Rolex v. BeckerTime (5th Cir. 2024).
6. Return and final-sale terms for made-to-order and engraved pieces.
7. Enforceability of the Royal American "never made again" promise.

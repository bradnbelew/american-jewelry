# Open questions

Purpose: what the family must confirm, and every conflict found between sources. Until answered, the briefs follow the rule named in "Briefs follow".
Last updated: 2026-10-11
Sources: all briefs sources; conflicts from research/01-11 (digest), the HTML boards, storefront code and memory notes.

When answered: move the item to `decisions.md` with the date and who decided, then fix every file that carried a TODO.

## A. Facts only the family can supply

1. **Store hours.** Old site: Brentwood Tue-Fri 10-6, Sat 10-5; Mt. Juliet Mon-Sat 10-6. Storefront draft: both Mon-Fri 10-6, Sat 10-5, Sun closed (provisional). research/08: Mt. Juliet "Tuesday to Saturday". Needed for store pages, schema and both Google profiles.
2. **Founding year.** Unknown everywhere; research/08 and 11 want "Since [year]".
3. **Owners' names, and first names at the counter and bench**, with consent to publish them.
4. **Where the bench is, and what form it takes.** See conflict C1.
5. **Is casting done in house?** Drives what we may say ("cast" vs "set and finished"). research/01 "designed and cast in Tennessee" is unverified.
6. **Financing partner** (Wells Fargo on the old site; Affirm per research/02) and whether it is mentioned at all beyond "Financing available in store."
7. **Old lines:** are Arch, Honey and Stripes real motifs, tags, or retired? How do Classic, Rugged, Faith, TriStar, paperclip and beaded disc map?
8. **Watch brands kept** (old site: Citizen, Tissot, Kronaby, Shinola, Michele) and whether watch service is listed.
9. **Gold buying:** offered? listed?
10. **Returns and exclusions** for custom, engraved, resized and made-to-order pieces; whether "free shipping" stays.
11. **Warranty final text** (counsel).
12. **Real prices:** the bench's cost sheet and the carat and price ladder per design (catalog prices are working assumptions).
13. **Royal American pieces:** are The Cumberland, Tennessee Star and The Harpeth real or placeholders? Their stones and specs are stand-ins.
14. **americanjewelers.com:** purchased?
15. **Is the old repair price list still current?** ($39 solder to $149 appraisal.)
16. **Vendor inventory:** how much stays in the cases, and how it leaves (brand-playbook proposes quietly, no clearance).
17. **"Do we grow our own diamonds?"** new-american-tier.html asks this from the user's words "we design, grow, and cast". If not, drop the idea.

- **A16 Admin API token for builder draft orders.** Not provided. Until a custom app with `write_draft_orders` exists and its token is set as `ADMIN_API_TOKEN` on Oxygen, "Request this ring" routes to `/appointments` with the design code (2026-10-12).
- **A17 Where appointment requests go.** Plumbing is built (Resend, or a webhook, or the Oxygen log). The owner must set `RESEND_API_KEY` + `APPOINTMENTS_TO` (and verify a sending domain for `APPOINTMENTS_FROM`) or `APPOINTMENTS_WEBHOOK_URL` on Oxygen, and name who receives the requests. Until then requests are only logged and the page tells the visitor to call if no one replies.

## B. Decisions the family must make

18. Final line names; whether "New American" stands (alternates on the board: Foundry, Filament).
19. Typeface: A Libre Caslon (default, built), B Fraunces, C Adobe Caslon (paid).
20. Whether "the stone is set" also runs on home (default: no).
21. Lenis smooth scroll: only where the ring runs (default) or off entirely.
22. Counsel sign-off on "man-made diamond", the provenance sentence and the policies.
23. The logo, when work resumes (paused).
24. iJewel Professional ($1,500/yr) at launch to remove attribution.
25. The upgrade promise (New American credit toward Americana within N years): offer or not (Proposed, needs margins).
26. Numbered first editions (001-100 per design): yes or no (Proposed).
27. "The Star" as a separate icon motif from about $650 (Proposed in brand-playbook; not in catalog).
28. Whether pre-owned Rolex gets a page and where (Proposed: discreet, outside the main nav).
29. Calendar for appointments: Cal.com or Sesami.
- **B21 Payments.** Shopify Payments (and with it Shop Pay) is not enabled on the store as of 2026-10-12 (`shop.paymentSettings.supportedDigitalWallets` is empty). The owner enables it in Shopify admin before launch; until then Checkout opens but cannot take a card.

- **B22 Checkout behind the Online Store password.** `cart.checkoutUrl` points at `e8d51b-f4.myshopify.com/cart/c/...`, and the Online Store channel is password-protected ("Opening soon"), so the handoff lands on the password page (verified 2026-10-12). The owner either removes the Online Store password, or finishes the domain cutover so checkout runs on the custom checkout domain. No test order is possible until then.

## C. Source conflicts

| # | Topic | Source A | Source B | Briefs follow |
|---|---|---|---|---|
| C1 | Bench location and form | research/08, storefront data.ts and home: Mt. Juliet, "behind glass" / "on the floor", casting there | research/04, 05, 11: "set and finished in Brentwood"; old site: "open air studio", store unnamed; brand-playbook weeks 3-6 lists "glass on the bench in Mt. Juliet" as a to-do | Say "our workshop" and "the bench" without a store or "glass" until confirmed |
| C2 | Home hero eyebrow case | REMAKE-BLUEPRINT §6 and research/08: "BRENTWOOD AND MT. JULIET, TENNESSEE" in caps; research/05 "keep the uppercase eyebrow"; research/11 `.eyebrow` uppercase .14em | Decision 2026-10-10 (HANDOFF remake section, git 9d3c508): labels sentence case; research/10 lists caps eyebrows as an AI tell; code already sentence case | Sentence case (newest dated decision) |
| C3 | Middle dots | research/08 ("Ref. AM 004 · Americana", "Shooting Star (6) · Prism (4)"), research/05 card lines; data.ts names "No. 001 · The Cumberland" | Decision 2026-10-10: no middle-dot meta strings (AI tell, research/10) | No middle dots in new copy; the Royal American name strings in data.ts still carry one (the page strips it) |
| C4 | Made in Tennessee / USA | research/05 hero "Made in Tennessee since [year]"; research/04 allows "Made in USA of imported materials" later; research/08 cites Red Wing's "Made in USA w/ Imported Materials"; brand-playbook "Drawn, set and finished in Tennessee" and "American, by design. Designed in America"; new-american-tier "Made in our Tennessee workshop", "designed and cast in Tennessee", "designed and handcrafted in Tennessee" | Family rule: no Made in America/Tennessee; exact provenance line only | The exact provenance line; nothing else |
| C5 | Handmade | research/04 §1.10 would allow "handmade" for documented Royal American one-of-ones; new-american-tier "handcrafted" | Family ban, no exceptions | Ban holds |
| C6 | "By hand" phrasing in live copy | data.ts: "hand-cut 18k gold links", "polished by hand", "engraved by hand", "hand-finished"; journal says "hand-set and hand-finished" | Legal (§23.2(b)) if true of that operation; close to the ban | Allowed only for operations confirmed manual; family to confirm "hand-cut links" |
| C7 | "Flawless" for VVS | data.ts New American intro "flawless to the loupe"; Signal Solitaire "colorless and flawless to the loupe" | FTC §23.13: "flawless" only with no flaws at 10x; VVS has inclusions | Remove from copy (Claude can fix; not done in this run because app code is out of scope) |
| C8 | "A standard no store publishes" | data.ts New American intro; brand-playbook "We are the only store that publishes its line" | Unverified comparative claim | Do not use until verified |
| C9 | Laboratory-grown on the site | Family: "man-made diamond" is the house term | research/02, 04, 08, 09: add "laboratory-grown" once per selling page in the spec line | Both: house term everywhere, "(laboratory-grown)" once on spec lines (matches HANDOFF rule 3) |
| C10 | Counting the lines | research/01 "three tiers explained in one strip"; research/04 store copy "see all three tiers"; new-american-tier "Tier I/II/III", "the third house"; website-blueprint "Three tiers, one catalog", "three tier tiles"; HANDOFF "What this is" says "three tiers" (internal) | Family rule: never count in public | Never in public copy; internal docs may say "lines" |
| C11 | Banned words in research | research/01 `/house/atelier`, "bespoke path"; 01-03 "bespoke"; 01 and 09 "curated"; website-blueprint "atelier" in House plans | Family lexicon ban | Ban holds; route `/house/atelier` never built |
| C12 | Financing on product pages | research/02: Affirm "as low as" on PDP and builder | HANDOFF rule 4; research/07, 08, 09; brand-playbook "never advertised" | No financing on product pages |
| C13 | Reviews on product pages | research/02: Google reviews near add-to-cart; research/03: first-party reviews later | Family rule; research/01, 05, 08 | One dated line on store pages only |
| C14 | Review count hard-coded or live | research/04: live, dated, never hard-coded | research/05, 08, 09 and the code hard-code 2,537; site.ts `FIGURES_AS_OF = "October 2026"` while the figures were checked 2026-08-26 | Show dated; fix the "as of" month to the real check date or pull live via Places API (family decides) |
| C15 | True scale, AR, 3D-printed replicas | research/02, 03: true-scale strip, AR Quick Look, `ar-scale="fixed"` | Family rule: none for now | None; a text true-size note on enlarged images is still required (§23.1 Note 3) |
| C16 | Chips, badges, hover swap | research/05: labelled image chips, hover second image; research/01: tier badge, "3D" badge, "Most loved" | Family rule; research/08 §1d | Tiles and swatches with fixed heights; no badges, no hover swap |
| C17 | For Her / For Him | research/01 Bridal bands "hers / his / matching"; research/09 a "Men" collection | Family ban on For Her / For Him | No gendered navigation; a men's collection is an open question |
| C18 | Stone inventory | research/02: stone feed, six-stone shortlist, browse all | Family rule: set qualities at set sizes | No inventory |
| C19 | Platform | research/01-03: Next.js on Vercel; research/03 calls Hydrogen "wrong fit" | research/07 and user decision 2026-10-10: Hydrogen on Oxygen | Hydrogen on Oxygen |
| C20 | Lead times | research/03: 2-4 weeks; research/08: product page ~3 weeks, builder ~2 weeks; data.ts: 2-5 weeks by piece; old site and commission: 4-6 weeks | (no family decision) | Use each piece's data.ts value; needs a reasonable basis (Mail Order Rule) |
| C21 | Section spacing | research/08: 20vh desktop, 12vh mobile | house.css `--section-y` 12vh / 8vh (git 3b75a26) | house.css |
| C22 | Reveal and motion details | research/08: CSS 600ms `cubic-bezier(0.2,0,0,1)`, settle 1.02 over 900ms, 300ms crossfade | research/11: GSAP `power2.out`, settle 1.04 scrubbed, paper-wipe transition, word-split title; research/06: CSS reveal is the whole budget | research/08 and house.css; no paper wipe, no word split |
| C23 | Bench video controls | research/08: 12-second loop, muted, no controls | research/10: video only with visible controls, no wallpaper loops | Open: a 12-second muted loop with a pause control (WCAG 2.2.2) |
| C24 | Photo ground | research/08: white seamless graded to stone | research/11: paper, never pure white; #E2E2E2 for white metals | Open; house.css allows white only behind product photography |
| C25 | Line drawings | research/11: technical line drawing as a sixth frame; pencil-sketch "gouaché beneath" | HANDOFF: line drawings removed at the user's direction | No line drawings; a photograph of the designer's real sketch is a separate question for the family |
| C26 | 3D file budgets | research/03 ≤4 MB; research/10 <600 KB meshopt; research/11 <1.5 MB Draco | memory: meshopt GLBs fail in model-viewer, Draco everywhere; models/ pipeline ≤190 KB | Draco, as small as the pipeline makes them |
| C27 | Nav count | research/01, 05: 7 items | research/06, 08: 8 items | Open; current header to be checked |
| C28 | Price grammar on cards | research/01: "From $" when the stone varies | research/08: prices speak once; research/11: never "From $X.00" | "From $" once, no cents, not repeated |
| C29 | Warranty name | research/09: keep the old "lifetime warranty" verbatim | research/04: "Limited Lifetime Warranty" plus a separate "Lifetime Care Program" | Counsel decides; draft follows research/04 |
| C30 | Returns for made-to-order | research/08: "Made-to-order pieces exchange." | research/04: final sale after CAD approval; storefront policies: exchangeable, not refundable | Storefront draft, pending counsel |
| C31 | Reference format | research/05 "Ref. AJ-SG-101" | research/08, 11 and data.ts "AM 004" | data.ts |
| C32 | Line taglines | research/05: "Natural diamonds, American hands." / "Grown diamonds. The same hands." ("grown" alone is an inadequate qualifier) | research/08 and data.ts: "Natural diamonds. Our own designs." / "Man-made diamonds. The same hands." | data.ts |
| C33 | Registry name and route | research/08: on the Royal American page, "Registry No. 12" | research/11: `/archive`, "The Register" | On the Royal American page |
| C34 | "American" as an adjective | research/08 code 11: never, except line names | research/08's own home headline "An American house of fine jewelry." (live in code) | Family decides; headline stays until then |
| C35 | Builder setting cascade | Rule: designs never cascade down a line | Builder lets Shooting Star and Prism (Americana motifs) carry a man-made stone; bridal sharing allows it | Family confirms that the builder's three settings count as shared bridal settings |
| C36 | "Salon" for Brentwood | data.ts store role and copy: "The salon" | research/05 drops "salon" with the borrowed vocabulary | Family decides |
| C37 | Store roles | data.ts: Brentwood shows the pieces, Mt. Juliet makes them; stores page "Brentwood shows the pieces. Mt. Juliet makes them and cares for them." | No source confirms which store does what | Treat as Proposed until confirmed |
| C38 | Resize policy | storefront and research/04: one free resize within 60 days | Not a stated family decision | Draft, pending family |
| C39 | Outside figure dating | Brief: Baymard 2021 "6 of 7 luxury sites mediocre" | Outside research: that figure is from Baymard's 2024 benchmark; in 2021 most sites rated "Decent" and search was the weakest area | 2024 for "6 of 7"; 2021 for search (https://baymard.com/blog/2021-luxury-ecommerce-benchmark) |
| C40 | Competitor list | brand-playbook / brief examples | Bremer Jewelry is in Peoria, Illinois, not Tennessee (outside research) | Drop Bremer |

| C39 | Home word budget vs the letter | canon and 04: home 110-150 visible words | research/17 §1 and the 2026-10-11 build prompt: the House letter is the home's last screen; with it the home reads about 270 words | Briefs follow the prompt (letter stays); the family can cut the letter to 80 words or move it back to /house only |

| C40 | Caps on text links | house.css `.link` is 11px tracked caps and dresses "The design", "The registry", "See it in store first" site-wide | canon: caps only on nav and buttons | Open for the designer: restyle `.link` as sentence-case label with the 1px rule, or extend the caps allowance to standalone text links |
| C41 | Selected control ring | DESIGN.md: the border never thickens | product brief: selected = ink border + inset (reads as 2px) | Code follows the brief (`.opt[aria-pressed]` inset shadow); designer picks one |

| C42 | /natural-or-man-made length | brief: 200 visible words, two tables | the page carries a four-question FAQ (431 words) that feeds the FAQ JSON-LD and answer engines | Open: keep the FAQ as a folded accordion under the tables, or move it to a journal entry |

## D. Things Claude should fix in code (not done in this run; app code was out of scope)

- ~~Remove "flawless to the loupe" (C7) and "a standard no store publishes" (C8) from `storefront/app/lib/catalog/data.ts`.~~ Done 2026-10-11 (P0 and P1).
- Replace middle dots in Royal American names in data.ts (C3).
- Correct `FIGURES_AS_OF` in `storefront/app/lib/site.ts` to the real check date (C14).
- Confirm `numeral: "I" | "II" | "III"` in data.ts never renders.

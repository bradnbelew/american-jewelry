# Brand architecture

Purpose: how the house is organized: lines, design motifs, piece types, versions, collections, bridal, price grammar and naming rules.
Last updated: 2026-10-11
Sources: memory american-jewelry-family-business (user's words, 2026-10-08); HANDOFF rules 1, 2, 4, 5, 11; storefront/app/lib/catalog/data.ts; lib/builder/model.ts; docs/brand-playbook.html (part two, three); docs/new-american-tier.html.

## The hierarchy (Decided, user 2026-10-08)

Line → design motif → piece types → versions. Collections are a separate, chosen-by-hand layer that can cross lines.

## Lines (Decided; names only in public)

| Line | What it is | Stones | Price grammar | Code (internal) |
|---|---|---|---|---|
| Royal American | One-of-one high jewelry, entered in a numbered registry, shown by private viewing | Natural diamonds and gemstones | "Price on request" only | `royal-american`, ref prefix RA |
| Americana | The house's signature designs in solid gold, birthstone and natural-diamond versions | Natural diamonds F-G, VS1, GIA report | Fixed price; "From $" when the stone varies | `americana`, AM |
| New American | Man-made diamond pieces to one published standard, the "New American Standard" | Man-made diamonds D-F, VVS1-VVS2, Ideal cut, IGI report, laser inscribed | Fixed price; "From $" when the stone varies | `new-american`, NA |

- Never count the lines in public: no "three tiers", "three lines", "three doors", "Tier I/II/III". (Decided, HANDOFF rule 5 and 11.) The word "tier" lives in code only; `data.ts` still carries `numeral: "I" | "II" | "III"`, which must never render.
- Never call any line "lower", "entry" or "affordable" in public. (Decided, new-american-tier "We never say")
- The New American Standard (Decided in substance; wording Proposed): color D, E or F; clarity VVS1 or VVS2; cut Excellent or Ideal, Hearts and Arrows on round centers; IGI report on every center 0.30 ct and up, laser inscribed; growth method and any post-growth treatment disclosed; solid 14k or 18k gold or platinum, never plated, vermeil or hollow; lifetime cleaning and prong checks. (new-american-tier.html; journal "How to read an IGI report")

## Design motifs (Decided names; more Unknown)

| Motif | Line | Motif in one line (from data.ts) |
|---|---|---|
| Shooting Star | Americana | A five-point star with a trailing tail of graduated stones. The first design drawn for the house. |
| Prism | Americana | Faceted triangular geometry; every surface a plane, every edge crisp. |
| Signal | New American | A single stone on a slender, open-sided four-prong head. |
| Grid | New American | Calibrated stones edge to edge in a true square grid, no gaps, no gallery. |

- Royal American pieces are not motifs. They take a registry number and a Tennessee place name: No. 001 The Cumberland, No. 002 Tennessee Star, No. 003 The Harpeth. (data.ts; naming rule from brand-playbook part two) These three pieces and their stones are stand-ins until the family confirms real one-of-ones. (Unknown)
- "The Star" as a separate icon motif at rest, from about $650 (brand-playbook part three): **Proposed**, not in the catalog.
- Old-site lines Arch, Honey, Stripes: **Unknown** whether they become motifs or tags. Classic, Rugged, Faith, the TriStar charm, the paperclip and beaded disc are to be absorbed into designs (REMAKE-BLUEPRINT §3); how is **Unknown**.
- Designs never cascade down a line. An Americana motif never appears with man-made stones. (Decided)

## Piece types (current catalog, Decided as stand-ins)

ring, band, pendant, bracelet, signet, dog tag, necklace (Americana); solitaire, studs, tennis bracelet, tennis necklace, eternity band, stack band, men's signet, tennis chain (New American). New American families: Solitaire, Tennis, Eternity & stack, Statement studs, Men's (new-american-tier.html; data.ts `family`).

## Versions

- Americana piece = three versions: Solid gold; Birthstone (one natural gemstone of your choosing); Natural diamond (spec line with ct tw, F-G, VS). (data.ts `americanaVersions`)
- New American piece = versions by carat weight (1.00 / 1.50 / 2.00 ct and similar), all D-F, VVS.
- Metals: 14k yellow, 14k white, 14k rose, 18k yellow, platinum. Yellow gold leads every photograph (brand-playbook "Gold first": **Proposed**).
- Shopify: options Version × Metal; size and engraving travel as line-item attributes; metafields `house.*`. (HANDOFF "Shopify")
- Prices in data.ts and `lib/builder/market.ts` are working assumptions until the bench's cost sheet arrives. (Unknown, HANDOFF)

## Collections (Decided as working set)

| Collection | Crosses lines | Job |
|---|---|---|
| Family | no (Americana) | House motifs set with the birthstones of people you love; the reason a client returns |
| Bridal | yes | Engagement and wedding in natural or man-made diamond, same house settings |
| Signets | no | The oldest personal jewelry, in every motif |
| The Stack | yes | Bands made to be worn in multiples, collected over years |

## Bridal rules (Decided)

- Bridal settings are the one place designs are shared across lines. The setting is chosen first; the stone is a labeled choice: natural diamond (Americana) or man-made diamond (New American). Every ring is labeled plainly with which it is.
- Builder settings: Signal, Shooting Star, Prism. Origin natural or man-made. Carats 0.50 to 3.00 at set sizes. No stone inventory.
- Open: Shooting Star and Prism are Americana motifs, yet the builder lets them carry a man-made stone. Bridal sharing allows it; "designs never cascade" may not. See `open-questions.md`.

## Price grammar (Decided)

- Fixed price for a fixed piece. "From $" when the stone varies. "Price on request" only for Royal American.
- Round prices: $2,400, never $2,399 (brand-playbook part five: **Proposed** but consistent with the catalog).
- "Price before sales tax" under every price (HANDOFF session 3).
- No price per carat on New American; never compare its price to natural. (new-american-tier.html, **Proposed**, consistent with the no-comparison rule)

## Naming rules

- Motifs: one plain word or a short plain name (Signal, Prism, Grid, Shooting Star). (Decided by usage)
- Royal American: registry number plus a Tennessee place name ("No. 001 The Cumberland"). Use a space or a colon, not a middle dot, in new copy (middle-dot meta strings are an AI tell; data.ts still uses "No. 001 · The Cumberland").
- Collections: named for what they are for (Family, Bridal, Signets, The Stack).
- House references: line code plus catalog number ("RA 001", "AM 004"). (data.ts `pieceRef`)
- Design codes from the builder: `AJ-XXXXXX-C[.engraving]`. (lib/builder/code.ts)
- Hallmarks: AJ plus a line mark (crown, star, line) inside the shank. **Proposed** until the logo work resumes.
- Trademark screens on every line and motif name before signage. **Proposed** (brand-playbook part seven).

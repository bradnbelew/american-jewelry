# American Jewelry briefs

Purpose: the house's permanent memory. What kind of company this is, what it stands for, how it speaks and looks, who it serves, how it will market, and how the site is built. Decisions, not essays.
Last updated: 2026-10-11
Sources: HANDOFF.md, docs/REMAKE-BLUEPRINT.md, docs/*.html, research/01 to 11, the three American Jewelry memory notes, storefront/app (house.css, lib/catalog, lib/journal, lib/builder), git log.

## Reading order

1. `00-house-canon.md` loads in every session through the root `CLAUDE.md`. If you read nothing else, it keeps you inside the rules.
2. For copy: `company/04-voice-and-lexicon.md`, then `company/06-claims-and-compliance.md`.
3. For design or code: `company/05-visual-identity.md`, `site/20-site-plan.md`, then the page brief in `site/pages/`.
4. For strategy: `company/02-ideals.md`, `marketing/10-positioning.md`, `marketing/11-marketing-plan.md`.
5. Before claiming any fact about the business: `company/01-who-we-are.md` and `open-questions.md`.

## Map

```
00-house-canon.md            the one page every session loads
company/01-who-we-are.md     verified facts, stores, services, unknowns
company/02-ideals.md         what the house represents and will never be
company/03-brand-architecture.md  lines, motifs, pieces, versions, collections, bridal, naming
company/04-voice-and-lexicon.md   tone, grammar, budgets, word lists, rewrites
company/05-visual-identity.md     type, tokens, photography, motion, layout, AI-tell lint, logo
company/06-claims-and-compliance.md  FTC essentials, allowed and forbidden claims, disclosures per page
company/07-customers.md      who buys, why, at which stage; the local market
marketing/10-positioning.md  the position, the competitive frame, proof
marketing/11-marketing-plan.md  channels and their jobs (all Proposed)
marketing/12-launch-plan.md  sequence to cutover; what the family supplies
site/20-site-plan.md         stack, routes, phases, current state
site/21-section-brief-template.md  the template for any screen
site/pages/*.md              one brief per page
refs/README.md               how to store reference screenshots
decisions.md                 dated decision log
open-questions.md            what the family must confirm, and every source conflict
roadmap.md                   Now / Next / Later
```

Structure note: I kept the requested layout. One refinement: `site/pages/` holds one file per page type (the three line pages share `line.md` with a Royal American section, because they share one route component, `routes/line.tsx`), and the small utility pages (care, policies, natural-or-man-made, saved, bag) share `utility.md`.

## Labels used in every file

- **Decided** (source): a family or user decision, with where it was recorded.
- **Proposed**: a recommendation that needs family approval before it goes public.
- **Unknown**: we do not know. Never fill it in. It lives in `open-questions.md`.
- **[verify]**: an outside claim we could not confirm.

## Precedence when sources disagree

1. The newest dated explicit user or family decision (memory notes, HANDOFF.md rules).
2. `docs/REMAKE-BLUEPRINT.md`.
3. These briefs, where they record a decision.
4. Research files (research/01 to 11), then the older HTML boards (website-blueprint, brand-playbook, new-american-tier).

Never resolve a conflict silently. Add it to `open-questions.md` under "Source conflicts" with both sources, and say which one the briefs follow until the family answers.

## How to update

- Change the fact where it lives, bump "Last updated", and add a line to `decisions.md` (date | decision | why | source).
- When the family answers an open question, move it from `open-questions.md` into `decisions.md` and correct every file that carried the TODO.
- Keep `00-house-canon.md` at 150 lines or fewer. It loads into every session; anything longer belongs in a linked file.
- Write in the house voice even here: no em dashes as separators, no exclamation points, none of the banned words except inside the ban lists.

## Using a section brief with Claude Code

1. Copy `site/21-section-brief-template.md` (or open the page's brief in `site/pages/`).
2. Fill one block per section. Unknown values stay TODO. Put sketches and references in `refs/<page>/` (see `refs/README.md`).
3. Start the session with: "Build `<route>` section `<name>` to `docs/briefs/site/pages/<page>.md`. Use house.css tokens only. Check DONE WHEN with screenshots at 390, 768 and 1440."
4. The canon is already loaded. If the brief contradicts the canon, the canon wins and the brief gets fixed.

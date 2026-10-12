---
name: council
description: Run the house council on one American Jewelry page: measure it against the reference houses with scripts/council/measure.mjs (no tokens), then have the house-council agent rule seat by seat against the rubrics and write an APPROVED / NOT APPROVED verdict. Use when a page or section is finished and before the owner sees it, or when the owner says "council", "run the council", "does this page pass".
---

# Council: approve a page

The council is cheap by design. A script measures what can be measured; one reviewer on Sonnet rules only on what needs eyes. Run it once per finished page, not on every edit.

## 1. Decide whether a run is needed

```bash
ls docs/briefs/council/verdicts/ | grep <slug>
git log -1 --format=%h -- <the route file and its components>
```

If the newest verdict for the slug names a commit at or after the last change to the page's files, reuse that verdict and say so. Do not run again.

## 2. Measure (no model involved)

The dev server must be running (`npm run dev` in `storefront/`, port 3030), or use the Oxygen preview URL.

```bash
cd storefront
node scripts/council/measure.mjs check http://localhost:3030/<path> --kind <home|pdp|line|page> --slug <slug>
```

This writes `docs/briefs/council/reports/<slug>.md` and first-viewport screenshots at 390, 768 and 1440 to `docs/briefs/council/shots/`. Read the report's house table yourself first: if it has a FAIL that is obviously yours to fix (a shadow, an em dash, a contrast failure), fix it and measure again before spending a review.

Slugs: `home`, `line-<handle>`, `design-<slug>`, `pdp-<handle>`, `royal-american`, `house`, `stores`, `store-<slug>`, `builder`, `appointments`.

## 3. Review (one agent, Sonnet)

Launch the `house-council` agent (if the subagent type is not registered in this session, launch a general-purpose agent with `model: sonnet` and tell it to follow `.claude/agents/house-council.md` exactly). Prompt:

```
slug: <slug>
report: docs/briefs/council/reports/<slug>.md
screenshots: docs/briefs/council/shots/<slug>__390.png, __768.png, __1440.png
brief: docs/briefs/site/pages/<page>.md
code: <route file>, <main components>
Rule on every seat and write the verdict file.
```

## 4. Act on the verdict

- **NOT APPROVED**: fix the Blockers, measure again (step 2), and run the review again only if a judged Blocker was fixed. Measured Blockers are confirmed by the report alone.
- **APPROVED**: tell the owner, list the Shoulds with their fixes, and link the verdict.
- Never edit a verdict by hand. A departure from a band that the owner accepts goes into `docs/briefs/decisions.md` with the rule ID, so the next run reads it.

## Keeping the bands fresh

The references live in `docs/briefs/council/references.json`. Add a house there when the owner points to one, then rebuild:

```bash
node scripts/council/measure.mjs refs --only <slug>
node scripts/council/measure.mjs bands
```

Sites that refuse headless browsers (Rolex, Cartier) are measured by hand in the browser pane with the same extract function, or left out. Never work around a block.

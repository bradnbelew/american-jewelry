# Reference screenshots

Purpose: how to store visual references for section briefs so a session can see what to borrow and what to refuse.
Last updated: 2026-10-11
Sources: the briefs task; research/06 and research/11 (how captures were used before); root .gitignore (research/shots pattern).

## Naming

`refs/<page>/<site>-<element>__take.png` for something to borrow.
`refs/<page>/<site>-<element>__leave.png` for something to avoid.
`refs/<page>/sketch-desktop.jpg` and `sketch-phone.jpg` for our own sketches.

Examples:
- `refs/product/cartier-buy-column__take.png`
- `refs/home/jared-promo-bar__leave.png`
- `refs/stores/vca-boutique-hours__take.png`

`<page>` matches the file names in `site/pages/` (home, line, design, product, builder, stores, house, services, journal, appointments, utility).

## Rules

- Images stay out of git. `refs/.gitignore` ignores png, jpg, jpeg, webp, gif and avif. Competitor material is for study only, the same as `research/shots/`.
- Each section brief names its refs in TAKE and LEAVE with one line on what exactly to borrow (a spacing, a crop, a grammar), never "make it look like this".
- Capture at 1440x900 and 390x844 when possible, so references line up with DONE WHEN.
- Never ship or publish a reference image, and never trace a competitor's photography or layout one to one.
- Sketches by the family or the designer may be committed if the family wants them kept; rename them `*.sketch.jpg` and add an exception line to `refs/.gitignore` first.

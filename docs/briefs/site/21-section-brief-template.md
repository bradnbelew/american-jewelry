# Section brief template

Purpose: the skeleton for briefing one screen or section of the site. Copy it verbatim, one block per section.
Last updated: 2026-10-11
Sources: the scheduled briefs task (template text); house.css; research/08.

Rules for filling it:
- Use house.css tokens and classes only (`--paper`, `--ink`, `.h-display`, `.label`, `.btn`, `.opt` and so on; see `company/05-visual-identity.md`).
- CONTENT is real final copy within the page's word budget, or TODO. Never placeholder prose.
- Anything not known is TODO. Never invent hours, names, prices or dates.
- One subject per screen. If you need two subjects, write two sections.

```
SECTION: <page, part> (<route>)
JOB: <what this screen must achieve, one line>
ONE SUBJECT: <the single thing the eye lands on>    NEXT ACTION: <primary> (secondary: <one>)
SKETCH: docs/briefs/refs/<page>/sketch-desktop.jpg, sketch-phone.jpg (TODO if none)
LAYOUT: >=1024 <columns, bleed, alignment> | <768 <stacking, crops>
CONTENT: <real final copy, within the page's word budget; TODO if not written>
TYPE: <role: token, size/line-height, tracking, max measure>   (house.css tokens only)
SPACING: <gaps in px between elements>
CONTROLS: <heights, borders, selected state; nothing shifts>
MOTION: <what moves, duration, easing token; reduced-motion fallback>
STATES: <hover, focus-visible, loading, empty, error, unavailable>
TAKE: <ref file + what to borrow>    LEAVE: <what not to borrow>
DON'T: <section-specific never-dos>
DONE WHEN: <screenshots at 390 / 768 / 1440 match; no horizontal overflow; key content above the fold at 1440x900 and 390x844>
```

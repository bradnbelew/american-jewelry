---
name: house
description: Build or revise any screen, component or copy of the American Jewelry storefront the way the house works. Use for every American Jewelry UI, layout, motion or copy task, including "make this section", "redo the product page", "write the hero", "fix the builder". Loads the canon, DESIGN.md and the page brief; plans before code; builds with house.css tokens only; self-verifies with screenshots at 390/768/1440, the house lint and the house-critic agent before saying done.
---

# House: how a section gets built

You are the design engineer of a house of fine jewelry, not a web developer with a template. The owner has rejected cookie-cutter work and will reject it again. The job is to make one screen that could belong to Cartier or Rolex in discipline and to no one else in detail.

## 1. Load before you touch code

Read, in this order (skip any already in context):
1. `docs/briefs/00-house-canon.md` (loaded by CLAUDE.md; obey every line, especially Names, Hard rules, Never do, Voice).
2. `DESIGN.md` at the repo root (tokens and rationale; the normative values).
3. The page brief in `docs/briefs/site/pages/<page>.md`, or `docs/briefs/site/21-section-brief-template.md` if none exists. If the section has no brief, write one first using the template and show it to the owner before building.
4. Any sketch or reference images the owner attached, and `docs/briefs/refs/<page>/` (files named `*__take.*` are what to borrow; `*__leave.*` what not to).
5. `storefront/app/house.css` for the real class names (`.h-display`, `.h-section`, `.lede`, `.letter`, `.label`, `.caps`, `.num`, `.btn`, `.btn-outline`, `.opt`, `.field`, `.measure`, `.measure-display`).

Never paste research files into the plan. Research becomes decisions in the brief; the brief is the input. If a screen feels flat or generic after the plan, consult `research/17-design-arsenal-romance-distinctiveness.md` §1 (mechanics of romance) and §2 (distinctive assets) and name which one is missing.

## 2. Plan, then check the plan against the brief

Write a short plan: the one subject of the screen, the next action, the layout as an ASCII wireframe at desktop and phone, the type roles per element, the spacing in px, the states, the motion (usually none). Then ask: would I have produced this for any jewelry brief? If yes, change the part that is generic and say why. Only then code.

When the owner asks for options, build two or three real variants as separate routes or a query flag, each complete, so they can be compared in the browser side by side. Do not describe variants in prose.

## 3. Build rules

- Tokens and classes from `house.css` only. No new hex values, no new font sizes outside the roles, no new typeface, no shadows, no radius.
- Copy: the object is the subject; numbers are the adjectives; sentence case; the word budget in the canon; the honesty line once. Run every string through the lexicon in your head before typing it. Unknown facts are `TODO`, never invented.
- Three.js, GSAP and Lenis stay in `*.client.tsx`; a poster image is in the server HTML before any canvas.
- Images: use the keys in `app/lib/catalog/photos.ts`; art-direct crops per breakpoint; never letterbox; never place text on a photo without an overlay.
- Controls keep fixed heights and 1px borders in every state. Nothing moves, lifts or reflows when clicked.
- Accessibility floor: visible focus, 16px inputs, hit areas 44px, reduced motion honored, headings in order.

## 4. Verify before you say done

1. `npm run typecheck` in `storefront/`.
2. `npm run lint:house` in `storefront/` (the house lexicon and AI-tell lint). Fix every error; justify every warning in the reply.
3. Screenshots of the section at 390, 768 and 1440 wide (see HANDOFF.md for the headless Edge flags and the pane's resize event gotcha). Compare each against the sketch and the brief's DONE WHEN line; list the differences and fix them before showing the owner.
4. Check for horizontal overflow at 390 via `document.documentElement.scrollWidth > innerWidth` in the pane, not by eye.
5. Run the `house-critic` agent on the screenshots plus the brief (Agent tool, `subagent_type: "house-critic"`). Fix what it finds or say why not.
6. Reply with: what was built, the three screenshots, the lint result, the critic's open items, and the exact files touched. Stage explicit paths only; never `git add -A`.

## 5. Feedback grammar you should expect, and should ask for

Numbers, not adjectives: "title wraps to 3 lines at 390; make it 2" or "gap between price and options is 24, make it 40". If the owner gives an adjective, ask for the number or offer two.

## 6. Tells to catch in your own work

Equal cards in equal rows; an intro block repeated per page; a value-prop trio; a tracked-caps eyebrow over every heading; "→" on links; middle-dot meta strings; 01/02/03 markers on non-sequences; fade-up on every section; hover-lift; a gradient; a chip; a badge; a drop shadow; a review star; "Shop now"; "Explore"; an exclamation point; an em dash; "elevate", "curated", "timeless", "bespoke"; "lab-grown"; "handmade"; "Made in America"; counting the lines; a price with cents. If one appears, remove it before anyone sees it.

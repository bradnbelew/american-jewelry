# 16. The Claude Code house method: how to make the model build like the house

**For:** the owner, working with Claude Code on the American Jewelry remake.
**Last updated:** 2026-10-11.
**What this is:** the answer to "how do I vibe-code this at a seriously specific level." Not a prompt list; a system of files and a loop. Everything named here exists in the repo as of today; the sections say what each file does, why it exists, and how to use it.
**Principle:** the model builds what it can verify. It cannot verify "luxurious," "designer" or "clean." It can verify a token, a number, a screenshot against a sketch, a lint result and a rubric. So the method converts taste into those five things, once, and reuses them every session.

---

## 0. What exists now (the files)

| File | Role | Loaded how |
|---|---|---|
| `CLAUDE.md` (root) | Three lines on the repo, then imports the canon | Automatically, every session in the repo (also from `storefront/` and `site/`) |
| `docs/briefs/00-house-canon.md` | Who we are, names, hard rules, never-do, voice, tokens, phase | Imported by CLAUDE.md |
| `docs/briefs/**` | The full briefs: company, marketing, site plan, one brief per page, decisions, open questions, roadmap | On demand; the canon's "Where to look" lists them |
| `DESIGN.md` (root) | Machine-readable tokens (YAML) plus rationale, in Google Labs' open DESIGN.md format; mirrors `house.css` | On demand; the `house` skill reads it; lintable with `npx -p @google/design.md designmd lint DESIGN.md` |
| `.claude/skills/house/SKILL.md` | The procedure for building any screen: load, plan, build, verify | Claude invokes it when the task is American Jewelry UI or copy; you can type `/house` |
| `.claude/agents/house-critic.md` | A read-only critic with a 12-point rubric; returns numbered, measured findings | `Agent` tool with `subagent_type: house-critic`, or ask "run the house critic on these screenshots" |
| `storefront/scripts/house-lint.mjs` (`npm run lint:house`) | Lexicon, claims and AI-tell lint over string literals and JSX text in `storefront/app` | Run by the skill before "done"; run it yourself any time |
| `docs/briefs/site/21-section-brief-template.md` | The brief skeleton (SECTION, JOB, ONE SUBJECT, LAYOUT, TYPE, SPACING, CONTROLS, MOTION, STATES, TAKE/LEAVE, DON'T, DONE WHEN) | You fill one per section |
| `docs/briefs/refs/` | Reference screenshots named `<site>-<element>__take.png` or `__leave.png`, images gitignored | You add them; the skill reads them |
| `research/00-INDEX.md` | One line per research file so the model knows what exists without reading 900 KB | On demand |

Why DESIGN.md as well as the canon: the canon is for rules and words; DESIGN.md is the format coding agents and design tools now read for tokens. Google Labs published it as an open, Apache-2.0 format on 2026-04-21: YAML front matter for tokens (colors, typography, rounded, spacing, components) and `##` sections in a fixed order (Overview, Colors, Typography, Layout, Elevation & Depth, Shapes, Components, Do's and Don'ts); it ships a CLI that lints structure and contrast and diffs two versions for regressions ([spec README](https://cdn.jsdelivr.net/gh/google-labs-code/design.md@main/README.md), [Google blog](https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-design-md/)). The format is alpha; if the CLI changes, the file still reads as plain Markdown.

---

## 1. The loop (one section per session)

1. **Sketch.** Six to ten thumbnails on paper, two minutes each, boxes only, at both phone and desktop proportions. Pick one. Redraw it larger on a 12-column grid and write the numbers on it (columns, bleed, line counts, gaps). Photograph it into `docs/briefs/refs/<page>/sketch-desktop.jpg` and `sketch-phone.jpg`.
2. **Brief.** Copy the template into `docs/briefs/site/pages/<page>.md` (most pages already have one, prefilled from the blueprint) and fill the blanks with numbers and real copy. Unknown facts stay `TODO`. Attach TAKE/LEAVE references by file name.
3. **Plan mode.** Start the session in plan mode for anything bigger than one component. Say: "Use the house skill. Section: <name>. Brief: <path>. Sketch attached. Give me the plan and the ASCII wireframe before code." Approve or correct the plan in numbers.
4. **Variants.** For a hero, a product page top or a grid, ask for two or three complete variants on separate routes or a `?v=` flag. Compare them in the browser pane side by side. Keep one; delete the others in the same session.
5. **Self-verification.** The skill makes Claude typecheck, run `lint:house`, screenshot at 390/768/1440, check overflow by script, and run the critic. Read the critic's list; it is the agenda for the next pass.
6. **Feedback in numbers.** Mark up the screenshot (Win+Shift+S, draw, number the circles), one instruction per number. "3: price to options gap is 24, make it 40." "5: that is a value-prop trio; remove."
7. **Close.** Commit the section (explicit paths), add any new rule to the canon or `decisions.md`, and note what was tried in `docs/briefs/site/pages/<page>.md` under a "Tried" line so the next session does not repeat it.

Why one section per session: the model's attention is finite and the canon already occupies part of it. A session that tries to do the home page and the product page produces two average screens.

---

## 2. Describing the look: the ladder

From weakest to strongest; always aim for the bottom two.
1. An adjective ("elegant"). Useless; every default already thinks it is elegant.
2. A pair that names the failure mode ("quiet, not empty; warm, not rustic").
3. A reference with take and leave ("Rolex product page: take the title block at left and the product centered on a pale ground; leave the pill buttons"), saved as `refs/pdp/rolex-title-block__take.png`.
4. Numbers ("name in `.h-display` at 56px, max 14ch, 8px to the Ref. line").
5. A sketch plus numbers plus the real photograph and the real copy.

Vocabulary worth owning so the numbers mean something: measure (line width in characters), leading and tracking, bleed, art direction (a different crop per breakpoint), optical alignment, rhythm, easing, stagger, scrub, pin. The repo's `animation-vocabulary` skill covers the motion words.

---

## 3. Prompts that work here

- Open with the skill and the brief, not with a description: "Use /house. Build the first screen of the product page per docs/briefs/site/pages/product.md. Sketches attached. Plan first."
- Ask for the plan's self-check: "Before code, tell me which part of your plan you would have produced for any jewelry site, and change it."
- Ask for evidence, not assurance: "Show me the three screenshots and the lint output, then the critic's findings."
- Constrain the surface: "Touch only `app/routes/piece.tsx` and `app/components/pdp/*`. No new tokens."
- When it drifts: name the tell, point to the rule: "That is a tracked-caps eyebrow; canon says `.label`, sentence case."
- When you want to learn: "Explain the three decisions in this layout in one line each, with the number that drives each."

Prompts that fail: "make it more luxurious," "make it pop," pasting a research file, asking for the whole page at once, judging on placeholder photos, accepting "it should work" without the screenshots.

---

## 4. The critic's rubric (what `house-critic` checks)

One subject; prototypicality and complexity (count the elements above the fold); type roles and measures and line counts; spacing against the scale; palette discipline (muted as the floor, gold at 24px+, navy only for Royal American and the bag); controls and states; copy budget and lexicon; imagery doing the work; motion; the tell list; responsiveness and overflow; the brief's DONE WHEN. Findings are numbered, located, measured, with a fix as a number or a token. Run it on every screen before the owner sees it; run it again after the fixes. It never edits.

---

## 5. The lint (what `npm run lint:house` catches)

Characters: em dash, middle dot, arrow. Grammar: exclamation points, prices with cents (warn). Stones: "lab-grown", "real/genuine diamond", "GIA-certified", "flawless" (warn). Claims: "made in America/USA/Tennessee", "American-made", "handmade/handcrafted", "first American house". Names: counting the lines, Tier I/II/III. Lexicon: stunning, exquisite, elevate, curated, timeless, Maison, atelier, bespoke, savoir-faire. Store grammar: "Shop now", percent-off, sale/regular price, limited time, coupon; financing words (warn); "free" outside policies (warn); self-praise words (warn). Scope: string literals, template strings and JSX text in `storefront/app/**/*.{ts,tsx}`; comments and imports are skipped; a line can be excused with `// house-lint: allow`. It does not scan research or briefs, which quote banned words on purpose. See §9 for what it found on first run.

Optional automation (not configured; ask before adding): a `PostToolUse` hook on Edit/Write for `storefront/app/**` that runs `node scripts/house-lint.mjs --warn <file>` so findings appear as Claude edits. Configure in `.claude/settings.json` per the Claude Code hooks docs.

---

## 6. Tools around the loop

- **Claude Design** (Anthropic Labs, research preview since 2026-04-17; Pro/Max/Team/Enterprise): a canvas where you describe a page, get three variants, refine by chat, comments and sliders, and hand off to Claude Code or export HTML ([DataCamp overview](https://www.datacamp.com/blog/claude-design), [eesel review](https://www.eesel.ai/blog/claude-design-review-2026)). Use it for composition exploration of one screen when paper is not enough; do not use it for production code or token maintenance. Reviewers note heavy token use and separate weekly limits.
- **Figma MCP**: if you learn Figma, the official plugin or `claude mcp add --transport http figma-remote-mcp https://mcp.figma.com/mcp` lets Claude read exact values from frames; needs a Dev or Full seat on a paid plan ([Figma help](https://help.figma.com/hc/en-us/articles/35281350665623)). Optional; paper plus numbers plus screenshots covers most of it.
- **Chrome DevTools**: More tools → CSS Overview for colors, fonts and media queries of a reference site ([DevTools tips](https://developer.chrome.com/blog/devtools-tips-1/)); the Animations panel for durations and easing; PageSpeed Insights for field data.
- **The browser pane** in Claude Code: the skill uses it for screenshots; HANDOFF.md lists the headless Edge flags and the hidden-window resize gotcha for R3F canvases.
- **After launch**: Microsoft Clarity recordings and Shopify analytics; the Baymard product-page checklist quarterly.

---

## 7. Feeding research to the model without drowning it

Research files are 50 to 90 KB each and quote the things we ban. The model should read them only when a decision is being made, not when a screen is being built. The chain is: research → decision (`docs/briefs/decisions.md`, the blueprint) → rule (canon, DESIGN.md) → brief (per page) → code. If a new fact arrives, it enters at the decision level and flows down; it is never pasted into a build prompt. `research/00-INDEX.md` lets the model find the right file in one read when it does need one.

---

## 8. Judging the work

Three questions, in this order, for any screen:
1. Would a stranger know in one second what this is and what to do? (Tuch 2012: familiar structure.)
2. Could this screen belong to no other jeweler? (The photograph, the name, the copy, the one motion moment.)
3. Is anything here that a template would also have? (The tell list; remove it.)

If 1 and 2 are yes and 3 is no, ship it and move on. Perfection on one screen is cheaper than polish on six.

---

## 9. First run of the lint on the current code

Recorded on 2026-10-11 against `storefront/app` (see the console output in the session; summarized here so the next pass has an agenda). Findings are listed in §9.1 below after the run; the ones already visible from reading `app/lib/catalog/data.ts` are: `TIERS[].numeral` carries "I", "II", "III" (fine in code, a canon violation if ever rendered; confirm no component prints it); the New American intro says "flawless to the loupe" (canon: no "flawless" for VVS) and "made the oldest American way" (an implied-origin phrase worth a lawyer's glance under research/04 §2); check every `tagline` and `intro` for words on the lexicon list.

### 9.1 Output (2026-10-11, after removing the Tailwind `!` and JSDoc false positives): 78 files, 15 errors, 20 warnings

Real findings, grouped. None was changed by this session; they are the agenda for the next copy pass.

**Errors**
- **Middle-dot meta strings in product names and titles** (the sharpest AI tell in the canon's list): Royal American names are stored as `"No. 003 · The Harpeth"` (`app/lib/catalog/data.ts:198`) and three routes strip that prefix with a regex (`routes/line.tsx:131,160`, `routes/piece.tsx:97`); the document `<title>` is built as `${title} · ${SITE_NAME}` (`lib/seo.ts:27`, `lib/storefront-shop.ts:108`, `routes/account.tsx:55`). Fix: store number and name as two fields; join titles with a period or a vertical space in the template ("The Harpeth. American Jewelry" or "The Harpeth, American Jewelry").
- **Origin and "handmade" words inside the journal article that explains why we do not use them** (`lib/journal.ts:44–48`). The usage is legitimate (quoting the FTC rule). Add `// house-lint: allow` on those lines, or move the quoted words into a table cell with the allow marker, so the lint stays strict for everything else.
- **"Is a man-made diamond a real diamond?"** (`routes/stones.tsx:18`). It is the customer's question, and the answer is the point of the page; keep it as a question with the allow marker, and make sure the answer never calls natural stones "real" as the contrast.

**Warnings worth acting on**
- "flawless to the loupe" in the New American intro (`data.ts:431`): canon forbids "flawless" for VVS. Rewrite ("no inclusion visible under ten-power magnification").
- "Three lines" in the builder's price ledger (`routes/build-ring.tsx:114`) and "three lines to check first" in the journal: rows, not the house's lines; fine, but a reader primed by the canon will trip. Prefer "three rows" or "three entries".
- "free" appears nine times across care, services, policies, commission and the journal. All are policy statements (cleaning, resize, changes before approval), which the blueprint allows. Keep them in prose, never as a benefit line or a banner, and do not add more.
- "Financing is available in store" (`routes/policies.tsx`): the family has not confirmed the financing partner (open question); keep until they decide, never above the policies page.
- `TIERS[].numeral` ("I", "II", "III") exists in `data.ts`; the lint cannot see rendering. Grep confirms it is a data field; make sure no component prints it.

**DESIGN.md lint** (`npx -p @google/design.md designmd lint DESIGN.md`): 0 errors, 1 warning. The warning is real: `gold` #B08D57 on `paper` #F5F2EC is 2.77:1, below the 3:1 WCAG AA floor even for large text. The canon already restricts gold to hairlines and numerals at 24px and above; add to that: gold numerals are decorative and always accompanied by the same number in ink (the registry table does this), or darken the gold used for text to reach 3:1 (a value near #8F7140 **[verify with a contrast checker]**) while keeping #B08D57 for hairlines. Log it in `docs/briefs/open-questions.md` as a palette decision for the designer.

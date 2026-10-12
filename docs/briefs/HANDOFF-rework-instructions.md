# Rework instructions for the storefront build session (2026-10-11)

From the research session, on the owner's instruction. New research (research/12–18) is in the repo; the owner wants it folded into the guides, then type, palette and the product-photo layout reworked on evidence, then a hand-off to a fresh session. Everything referenced is committed on master except `research/18-evidence-articles-and-house-stories.md` and its row in `research/00-INDEX.md`, which are uncommitted in the working tree: stage both with your next commit (explicit paths; never `git add -A`; never commit `.env` or `storefront/tsconfig.tsbuildinfo`).

## 1. Reach a safe point first
Finish the step you are on, `npm run typecheck`, `npm run lint:house`, commit, push. Do the work below before building further pages, because it may change the tokens every page uses.

## 2. Read, in this order (never paste research into a plan)
- `research/00-INDEX.md`.
- `research/17-design-arsenal-romance-distinctiveness.md` §1 (mechanics of romance), §2 (distinctive assets), §8 (flows), §9 (house-only ideas).
- `research/18-evidence-articles-and-house-stories.md` §A–B. Note Fuchs, Prandelli, Schreier & Dahl (2013, *Journal of Marketing*): luxury buyers penalize products labeled "user-designed"; the builder is always "Build on Signal", never "Design your own".
- `research/14-image-standard-photo-cgi-3d.md` §1–§5 (render vs photo split, delivery spec, the view order for product pages).
- `research/16-claude-code-house-method.md` §9.1 (the lint agenda) and `research/15-luxury-thinking-reading-list.md` §6 (the type story we currently own).
- `.claude/skills/frontend-design/SKILL.md`, the calibration list: a warm cream ground near #F4F1EA with a high-contrast serif display is named the single most common AI-generated tell. Our paper #F5F2EC + Libre Caslon sits one step from it. The owner has asked, in his own words, for something "less typical".

## 3. The rework: three explorations, built for real, decided by the owner
Use `/house` plus the `frontend-design`, `design-taste-frontend`, `high-end-visual-design`, `minimalist-ui`, `web-design-guidelines` and `emil-design-eng` skills, and the `hydrogen-*` skills for the product page. For each exploration build two or three complete candidates on the live home page and one real product page behind a `?v=` flag (or separate routes), each with a one-paragraph rationale that cites the research it rests on, screenshots at 390/768/1440, and the `house-critic` agent's findings. Then stop and present to the owner. Do not change the canon, DESIGN.md or house.css until he decides.

**A. Primary typeface: less typical, still a house.**
Requirements: licensed for web and print at a known price (free is fine if it passes the other tests); real italics; tabular lining figures in the companion face; holds up at 11px caps and 72px display; outside the AI-tell cluster and outside the overused display serifs (Playfair, Cormorant, Fraunces, Instrument Serif, Libre Baskerville, DM Serif); ideally an American authorship or American-printing lineage so the House-page story stays true (research/15 §6).
Pools to research with reasons (not a shortlist to copy): Hoefler&Co (Chronicle, Mercury, Surveyor, HTF Didot, Sentinel); Font Bureau (Williams Caslon, Miller, Benton Modern); Commercial Type (Caslon Doric, Austin, Canela, Lyon); Klim (Signifier, Tiempos; Söhne as a companion); Sharp Type; Grilli Type. Free and less typical: Sorts Mill Goudy and Linden Hill (Goudy revivals, OFL), Besley (an OFL Clarendon, American printing), Newsreader, Literata, Brygada 1918.
Test every candidate on the real home hero, a product name at 56px, a spec table, and the registry grammar "No. 003". Scrutinize Public Sans with the same rigor (Söhne, Untitled Sans, Neue Haas Unica, GT America; Inter is banned). For each pair report a "hide the name" distinctiveness read: would a reader recognize the house from the type alone in a year.

**B. Palette: better and ownable.**
Ground the options in materials and place, not trends: bone or limestone off-whites outside the cream cluster, a true near-black ink, and one ownable accent no competitor holds (not Tiffany blue, Cartier red, VCA green, Yurman black-and-gold, Brilliant Earth teal; research/13 §3 has the local set). Every text color passes WCAG AA; fix the known failure (gold #B08D57 on paper is 2.77:1, from the DESIGN.md lint) by darkening text-gold or making gold decorative-only and duplicated in ink. Photography still carries the color; the palette is a ground. Show each palette on the home, a Royal American page and the bag drawer; run `npx -y -p @google/design.md designmd lint` on a draft DESIGN.md for each.

**C. Product photo layout: much better.**
Research first: Baymard's product-page and image-gallery findings; the PDP patterns of Rolex (title block left, product centered on a pale ground), Hermès and SSENSE (vertical scrolling gallery with sticky details), Cartier and Van Cleef & Arpels (sticky buy box); and research/14 §5 for the view order (3/4, hand, profile, top, macro, hallmark). Build two or three real product-page variants on the Storefront API with the house's own photographs and the iJewel view. Judge them on: one subject in the first second; price and the action visible without scrolling at 390x844 and 1440x900; no reflow on option change; the hand frame second; 3D as a view, not a hero; nothing bordered; no thumbnail strip if a vertical gallery does the job better on desktop.

Everything else in the canon stays binding: man-made diamond grammar, never counting the lines, no promo grammar, no stock or AI imagery, nothing shifts when clicked, `lint:house` at 0 errors.

## 4. After the owner decides, update the guides so nothing drifts
- `docs/briefs/00-house-canon.md` (Visual tokens), `docs/briefs/company/05-visual-identity.md`, `DESIGN.md` (tokens and prose, lint clean), `storefront/app/house.css` (tokens and font imports; self-host via fontsource or licensed files), every `docs/briefs/site/pages/*.md` whose TYPE or LAYOUT lines change, `docs/briefs/decisions.md` (dated: what changed, why, which research), `docs/briefs/open-questions.md` (anything the family must confirm, such as a font license purchase).
- Add the rules the canon still lacks from 17 and 18: the builder framing rule (Fuchs 2013); the four-windows-a-year seasonal model; "keep" into a drawer, not a wishlist; the five distinctive assets chosen; the gold contrast rule.
- Update the remake section of `HANDOFF.md` with the new tokens and where the explorations live.

## 5. Then hand off to a fresh session
Write `docs/briefs/PROMPT-rework-pass.md`: a self-contained prompt, in the shape of `docs/briefs/PROMPT-launch-pass.md`, that a fresh session can paste to rework every existing page to the new type, palette and product layout, page by page with `/house`, screenshots and the critic, and then continue the launch phases from where you stopped. Commit and push, confirm the Oxygen deploy, and tell the owner in one message: what changed, the three decisions he made, the live URL, and "start a fresh session in D:\american-jewelry and paste docs/briefs/PROMPT-rework-pass.md".

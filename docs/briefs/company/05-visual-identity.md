# Visual identity

Purpose: type, palette tokens, photography, motion, layout principles, the AI-tell lint list, and the logo's status. Tokens are the real ones in `storefront/app/house.css`.
Last updated: 2026-10-13
Sources: storefront/app/house.css; REMAKE-BLUEPRINT §2; HANDOFF remake section and rules 6, 8, 9; research/08 §1d-§1e, §3, §6; research/10 (AI-tell list); research/11 §3-§5; docs/brand-playbook.html part two.

## Type (Decided 2026-10-13: Source Serif 4 and Public Sans; Libre Caslon retired, owner: "too scripty")

| Role | Token / class | Spec in house.css |
|---|---|---|
| Names, headlines | `--font-display` Source Serif 4 Variable 400 (optical size follows the font size); `.h-display` | line-height 0.98, tracking -0.015em, balance, lining figures |
| Section heads | `.h-section` | line-height 1.05, tracking -0.01em |
| Item heads | `.h-item` | line-height 1.15 |
| The letter, journal, product sentence | `--font-text` Source Serif 4 Variable (the same file at text sizes); `.letter` 19px/1.55, max 62ch; `.lede` 18px/1.55 ink-2 | lining figures |
| UI, numbers, controls | `--font-sans` Public Sans Variable; body 15px/1.6 | |
| Labels | `.label` 13px Public Sans 400, muted, **sentence case** | |
| Caps (nav and buttons only) | `.caps` 11px 500 tracking 0.08em; `.caps-sm` 10px | |
| Numerals | `.num` lining tabular; `.gold-numeral` the serif in gold at 24px, never smaller | |
| Measures | `.measure` 62ch; `.measure-display` 34ch | |

Rules: no bold in display; no third family; no italics (the italic files are not loaded); headings sentence case. One serif file is preloaded; Public Sans arrives through the stylesheet.

## Palette (Decided; house.css `:root`)

| Token | Hex | Use |
|---|---|---|
| `--paper` | #F6F5F2 | page ground, and the ground behind every photograph and render (2026-10-13; the less yellow paper, R minus B = 4) |
| `--white` | #FFFFFF | control fills only |
| `--ink` | #121212 | all type |
| `--ink-2` | #3F3F3F | secondary type, lede |
| `--muted` | #63676E | tertiary type, labels; the lightest text allowed (4.9:1 on paper) |
| `--hair` | #DDD8CF | 1px rules inside tables and lists; control borders |
| `--navy` | #16213A | Royal American ground and the bag only; `.velvet` |
| `--navy-2` | #1F2D4D | photo frames on navy |
| `--gold` | #B08D57 | hairlines, registry numerals, focus ring; type only at 24px and up (2.8:1 on paper, 5.2:1 on navy), never body text or a fill |

Retired 2026-10-13: `--bone` #ECE7DD and `--stone` #E9E7E2 (near-miss edges against the paper were the "boxes"). A photograph sits on exactly the page ground (`.float` multiplies a white packshot onto the paper), bleeds to the page edge, or sits on navy (`.dissolve` fades a velvet photograph into the band). Each line's color is its photographic ground: navy velvet, deep green leather, pale limestone.

No other hue anywhere. Photography carries the color. `::selection` is navy on paper.

## Controls (Decided; HANDOFF rule 8)

`.btn` 48px high, 1px border, caps 11px; `.btn-outline`, `.btn-light`. `.opt` min 52px, 1px hair border, selected = ink border plus inset 1px ink. `.pill` 40px. `.field` 48px. `.swatch` 48px with a `.swatch-dot`. `.quiet` 36px underline control. Focus-visible: 2px gold outline, 2px offset. Hover changes color and border only. Nothing scales, lifts or shifts; heights never change between states. Accordions (`details.acc`) open without layout jump, "+" and en dash markers.

## Layout principles (Decided unless noted)

- One subject per screen on home, line, design and house pages. Words beside the subject, never on top of a product.
- `.wrap` max 96rem, side padding clamp(1rem, 4vw, 3.5rem). `.screen` padding `--section-y`: 12vh desktop, 8vh under 768px. (research/08 proposed 20vh/12vh; the code tightened it on 2026-10-10, git 3b75a26.)
- Asymmetric splits 7/5 or 8/4, image bleeding to one edge. Pacing alternates image-left, image-right, full-bleed, text-only; never the same twice in a row.
- No bordered-card grammar, no chips, no icon rows, no value-prop trios, no equal tile rows (a line's pieces are a ledger; the index is three across with the middle column set lower), no carousels, no hover image swap.
- No two screens of a page share a composition: opener, plate, beside, line, ledger, velvet, viewing (`site/22-art-direction.md` §5).
- Hairlines only inside tables and lists.
- Text over photography only with `.on-photo` plus a real overlay (`.photo-overlay`) and a contrast check.
- Footer: sitemap in the small serif, two addresses, legal line.
- Navigation (2026-10-13): one row of eight names (Jewelry, Bridal, Royal American, Americana, New American, Services, Stores, The House), each a full-width paper panel of plain links in columns (by kind, by design, collections, the registry, services, the two addresses), one photograph at most, one sentence at most, never a promotion. Utility: Search, Appointment, Kept, Bag, Account. The phone menu is the same panels as accordions with a search field above. `app/lib/nav.ts` is the one source.
- Centered quiet openers only on appointments, policies, natural-or-man-made and 404.

## Photography (Decided direction; shoot not done)

- Four fixed object views per piece (front, three-quarter, profile, inside-shank hallmark), one detail per feature, one hand frame in Tennessee daylight (family or staff hand, no face required). 4:5 for cards, 1:1 for the gallery.
- Bench: the designer's and setters' hands, ten stills and one 12-second loop. Stores: exterior in daylight, interior with the bench, the counter with a person.
- Royal American on the navy velvet box.
- Daylight and place, not flag: porch rail, kitchen table, church step. Never a barn, eagle, bunting, denim-on-denim, Western type.
- Never: stock, AI imagery, renders presented as photographs (3D always labeled), models who are not the family, text over the product.
- Ground: research/08 says white seamless graded to stone; research/11 says paper, never pure white. **Open** (see open questions). house.css allows white only behind product photography.
- Current photos are the family's existing store photography standing in for the new designs.

## Motion (Decided; house.css)

- Reveal (`.reveal`): opacity plus 12px travel, CSS scroll-driven (`animation-timeline: view()`), reduced-motion guarded. Use sparingly: **not on every section** (Decided 2026-10-10).
- Photographs settle from scale 1.02 (`.settle img`). Never on hover.
- Easing token: `--ease-house: cubic-bezier(0.2, 0, 0, 1)`. Control transitions 150-180ms, color and border only.
- Page transitions: 300ms crossfade via React Router view transitions (REMAKE-BLUEPRINT). research/11's paper wipe is not adopted.
- The ring is the only thing that moves more ("the stone is set": one viewport pin, scrubbed, poster under reduced motion).
- Never moves: nav, price, text being read, product cards, footer, open bag contents. No parallax, marquee, autoplay carousel, cursor replacement, scroll-jacking, preloaders.
- `prefers-reduced-motion: reduce` kills all transitions and animations (house.css).

## AI-tell lint list (research/10; check every screen)

Fail the screen if any of these appear:
1. Warm cream ground plus high-contrast serif with nothing else (our palette is one step away; photography, the ring and restraint must carry it).
2. Tracked-out all-caps eyebrows.
3. Middle-dot meta strings ("Ref. AM 004 · Americana").
4. "→" appended to links.
5. Numbered 01 / 02 / 03 markers.
6. Fade-up on every section; hover-lift on every card; parallax on every image.
7. Three cards with icons; pulsing pills; a thick colored card border; purple gradients; Inter.
8. SVG ornaments, flourishes, dividers.
9. Hover-distorted images, cursor followers, animated grain, depth of field or chromatic aberration above 0.01 in the canvas, bloom without a threshold.
10. Rotating hero banners, autoplay wallpaper video, promo tiles inside a menu (depth in a menu is not the tell; the tiles are).
11. Icon libraries (Lucide, Phosphor), Lottie mascots.
12. Letter-spaced split headlines as decoration.

## Logo (Decided: paused)

Placeholder only: `components/Mark.tsx` and `app/icon.svg`. Boards exist (`docs/aj-marks-round-2.html`, `aj-marks-round-3.html`, `aj-monogram-board.html`, `aj-brilliant.html`; round three favored "Ascender", with "Stone" as most ownable) but nothing is chosen. Do not design logos, hallmarks or line marks until the family resumes the work. Schema needs a logo image at launch: use the placeholder and flag it.

## Packaging and codes (Proposed, brand-playbook part two)

The navy hexagonal velvet box the family already uses as the house box; the Star as the house code; knife-edge profiles; the mark inside every shank; yellow gold first in photographs.

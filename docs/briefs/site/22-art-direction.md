# Art direction: color, images, layout

Purpose: where color, photographs and words go on every screen, and why. The owner's words that started it (2026-10-12/13): "everything feels like a Shopify store, boxes, creme colors"; "a hair more regular, not an abstract website"; "wrap your head around color, layout, images, where they should go, next to text or not, patterns, colors beside what other colors".
Last updated: 2026-10-13
Status: **Proposed** throughout, except where a line says Decided. Canon tokens are unchanged until the owner decides (open-questions B30).
Sources: canon; 05-visual-identity; research/14 (image standard, shot list); council rubrics C, I, T, D; the viewing prototype (mockups/viewing); contrast measured 2026-10-13 (below).

## 1. Why it reads as a store (measured, not felt)

| What the eye sees | Measured | Effect |
|---|---|---|
| Product photos on white, bone or stone, set on paper | white 1.12:1, bone 1.10:1, stone 1.11:1 against paper | An edge is visible but too faint to look meant: every photo becomes a tile. Tiles in rows are the store grammar. |
| Every image a framed rectangle of the same ratio, beside a text block | 4:5 tiles, 50/50 splits | The rhythm of a catalog grid, not a house. |
| Stand-in photos from different shoots | different grounds, light and color per image | Nothing ties the pictures to each other or to the page. |
| Warm paper (R minus B = 9) plus Caslon plus caps nav, with photos too small to carry color | ground fills most of each screen | The page color, not the jewelry, is what you remember. |

The fix is not one new color. It is three rules: no near-miss edges, photographs large enough to carry the color, and each line's color living in its photographs.

## 2. Color: what sits beside what

The page has three grounds and two inks. Everything else is photography.

| Pair | Contrast | Rule |
|---|---|---|
| Ink on paper | 16.8:1 | All reading. |
| Muted on paper | 5.1:1 | Labels and the honesty line only. |
| Paper on navy | 14.3:1 | All type on velvet. |
| Gold on navy | 5.2:1 | **Gold lives on navy**: registry numerals, hairlines. Passes at any size there. |
| Gold on paper | 2.8:1 | Decorative only, 24px and up, always repeated in ink. Prefer not to. |
| Muted on navy | 2.8:1 | Never. Labels on velvet are paper at full strength. |
| Navy beside ink (the dark viewing room) | 1.2:1 | **Never touching.** Two darks muddy each other. Paper between them, or the viewing sits inside navy. |
| A photo's ground beside paper | must be 1.00 or at least 3:1 | **No near-misses.** A photo either sits on exactly the page ground (the object floats, no edge), bleeds to the page edge, or sits on navy. |

Metal to ground (photography and renders):
- Yellow and rose gold: on paper, on skin, on the Americana ground. Gold on warm grounds stays gold.
- Platinum, white gold, and diamonds as the subject: on navy, on ink (the viewing), on the New American stone ground. White metal on paper photographs grey.
- One metal per screen. A yellow ring and a platinum ring in one frame split the color.

**The lines' colors are photographic grounds, not page colors** (resolves the green baize and slate of the prototype without a new hue in CSS):

| Line | Photographic ground (what the piece rests on) | Light | Page around it |
|---|---|---|---|
| Royal American | navy velvet, the house box | one warm lamp, dark room | navy (`.velvet`) |
| Americana | deep green leather or baize tray; skin in daylight | window daylight, warm | paper |
| New American | honed pale limestone or slate | cool north light | paper |

Ground token (open, owner's call, B30 e): keep paper #F5F2EC, or move to a less yellow paper #F6F5F2 (R minus B = 4; ink 17.2:1, muted 5.2:1, both pass). Recommended: the neutral paper, **and** retire bone and stone as photo grounds, because the near-miss edges do more of the "cream store" damage than the hue does.

## 3. Images: where they go, next to text or not

Rules (each one is checkable on a screenshot):
1. **An image sits beside words only when the words are about that exact image**: a product beside its name and price, the Cumberland beside the registry. Otherwise the image stands alone at full width with one line of caption beneath, or no caption.
2. **Never words on a photograph**, except the one opener per page, on a real overlay (`.photo-overlay`).
3. **Beside means 7 or 8 columns of image bleeding to the outer edge, and 4 columns of words aligned to the image's top edge or its bottom edge.** Never vertically centered; centered text beside a picture is the template.
4. **No two beside-screens in a row.** After one, the next screen is a plate (full width), a line (words alone) or a ledger.
5. **One image per screen.** A pair only as a diptych of the same piece at the same height (the packshot and the hand), once per page at most.
6. **Scale before quantity.** One plate across the page says more than four tiles. Line pages show their pieces as a list of names with one picture per row, or a staggered plate (a large and a small, never equal rows of four).
7. **Every wearable piece shows scale in its first two frames** (council I2): the hand, the neck, the ear, the wrist.
8. **The 3D view sits behind a photograph** (council P14) and opens on request: "See it in the light" on pieces with a stone. The live viewing appears once on the home at most (the council's 2026-10-13 ruling decides where).

## 4. Patterns

- **No decorative pattern.** No ornament, texture overlay, grain or line drawing on the page.
- **The house's pattern is the jewelry at macro scale**: the pavé of Grid, the facets of Prism, the star and its graduated tail, the claws of Signal. A 2.2:1 macro plate across the page is the only texture a page carries, at most once per page.
- **The repeated shape is the hand frame**: the same daylight, the same crop (wrist to fingertips, no face), one piece, on every line page. Seen three times, it becomes the house's picture.
- **The repeated grammar is the registry**: "No. 001" and a Tennessee place, gold on navy. It appears wherever Royal American appears and nowhere else.

## 5. The screens (the whole vocabulary)

| Screen | Ground | What it is | Limit per page |
|---|---|---|---|
| Opener | photo full-bleed | the piece or the hand, words lower left on the overlay | 1, first |
| Plate | photo full-bleed (2.2:1 or 16:9) | a macro or a place; caption beneath on paper | 2 |
| Beside | paper | image 7 to 8 cols bleeding out, words 4 cols aligned to an image edge | 2, never adjacent |
| Line | paper | one sentence, large, alone | 1 |
| Ledger | paper or navy | names and numbers in rows: the registry, a line's pieces, specs, prices | as needed |
| Velvet | navy, full-bleed band | Royal American, the registry, the bag, the viewing | 1 band per page outside Royal American |
| Viewing | navy or ink | the live piece in the light | 1 |

Page recipes (desktop; phone stacks the same order, image first in a beside):

```
HOME            Opener (hand) / Ledger (the names as type) / Plate (design of the season, macro) /
                Velvet (the registry, the viewing if the council approves it) / Beside (build a ring) /
                Line (the letter's last sentence) / Ledger (two addresses)
ROYAL AMERICAN  Velvet throughout: Viewing (one piece) / Ledger (registry, No. and place) / Line (by appointment)
AMERICANA       Opener (hand, daylight) / Plate (Shooting Star macro) / Ledger (pieces: name, one photo per row,
                on the green ground) / Beside (Prism) / Line / addresses
NEW AMERICAN    Opener (Signal on limestone, north light) / Ledger (the standard: D to F, VVS, Ideal, IGI) /
                Ledger (pieces as a table: stone, size, metal, from-price) / Plate (Grid macro) / Line / addresses
PRODUCT         Beside (gallery 7 cols: packshot on the page ground, hand, macro, top; buy column 5 cols) /
                Line (what it is made of) / Ledger (siblings by name) ; "See it in the light" from the first frame
DESIGN          Opener (macro) / Line (the motif sentence) / the stone is set (viewing) / Ledger (every piece)
STORES          Opener (the store front, real photo only) / Beside (counter) / Ledger (address, phone, hours)
```

## 6. Comps before the shoot

Real photographs are the rule (canon; research/14: no AI images on the site). To design the pages before the shoot, the owner generates **comps**: mock images used only on the dev server to judge layout and color, never committed to the storefront, never deployed. They live in `docs/briefs/refs/comps/` (images gitignored) and double as the photographer's brief. The list and the prompts: `docs/briefs/refs/comps/PROMPTS.md`.

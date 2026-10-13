---
version: "alpha"
name: American Jewelry
description: Design tokens and rationale for the American Jewelry storefront (Hydrogen). Tokens mirror storefront/app/house.css; the prose explains how to apply them. Rules of the house live in docs/briefs/00-house-canon.md, which wins on any conflict.
colors:
  primary: "#121212"
  on-primary: "#F6F5F2"
  surface: "#F6F5F2"
  paper: "#F6F5F2"
  white: "#FFFFFF"
  ink: "#121212"
  ink-2: "#3F3F3F"
  muted: "#63676E"
  hair: "#DDD8CF"
  navy: "#16213A"
  navy-2: "#1F2D4D"
  gold: "#B08D57"
typography:
  display:
    fontFamily: "Source Serif 4 Variable"
    fontSize: 76px
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: -0.015em
  section:
    fontFamily: "Source Serif 4 Variable"
    fontSize: 40px
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: -0.01em
  item:
    fontFamily: "Source Serif 4 Variable"
    fontSize: 24px
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: 0em
  letter:
    fontFamily: "Source Serif 4 Variable"
    fontSize: 19px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0em
  lede:
    fontFamily: "Source Serif 4 Variable"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0em
  body:
    fontFamily: "Public Sans Variable"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0em
    fontFeature: "'kern' 1, 'liga' 1"
  label:
    fontFamily: "Public Sans Variable"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0em
  caps:
    fontFamily: "Public Sans Variable"
    fontSize: 11px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0.08em
  num:
    fontFamily: "Public Sans Variable"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0em
    fontFeature: "'tnum' 1"
  gold-numeral:
    fontFamily: "Source Serif 4 Variable"
    fontSize: 24px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 0em
rounded:
  none: 0px
spacing:
  1: 4px
  2: 8px
  3: 12px
  4: 16px
  5: 24px
  6: 32px
  7: 40px
  8: 64px
  9: 96px
  10: 128px
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.caps}"
    rounded: "{rounded.none}"
    height: 48px
    padding: 0px 28px
  button-primary-hover:
    backgroundColor: "{colors.ink-2}"
    textColor: "{colors.paper}"
  button-outline:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.caps}"
    rounded: "{rounded.none}"
    height: 48px
    padding: 0px 28px
  option:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    height: 52px
    padding: 0px 16px
  field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    height: 48px
    padding: 0px 12px
  bag-panel:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.paper}"
  bag-panel-hover:
    backgroundColor: "{colors.navy-2}"
    textColor: "{colors.paper}"
  label-text:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.muted}"
    typography: "{typography.label}"
  gold-numeral-text:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.gold}"
    typography: "{typography.gold-numeral}"
  table-rule:
    backgroundColor: "{colors.hair}"
    height: 1px
  product-ground:
    backgroundColor: "{colors.paper}"
  model-ground:
    backgroundColor: "{colors.paper}"
---

# American Jewelry

## Overview

A house of fine jewelry in Tennessee, drawn by one designer and finished at its own bench. The site should feel like paper, daylight and one object at a time: calm, exact, unhurried. Americana is a plain serif, a street address, a numbered registry and plain sentences; it is never a flag or a slab. One subject per screen. Photography carries the color. One quiet piece of motion belongs to the product (the ring assembling itself); everything else holds still. The reference bar is Cartier, Van Cleef & Arpels, Rolex and Patek for discipline, and David Webb and Oscar Heyman for the American workshop lineage. The anti-reference is any mass jewelry retailer: equal cards in equal rows, promo bars, countdowns, review stars on product pages.

Tokens below are the normative values and mirror `storefront/app/house.css`. The house canon (`docs/briefs/00-house-canon.md`) governs words, claims and never-do rules and wins on any conflict with this file.

## Colors

The ground is `paper` everywhere, including behind product photographs and the 3D ring: a packshot on white floats on the paper (`.float`, multiply) and a render is drawn on the paper, so no photograph has a tile edge (2026-10-13; `bone` and `stone` are retired). Each line's color lives in its photographic ground (navy velvet, deep green leather, pale limestone), never in CSS. Type is `ink`; secondary text is `ink-2`; `muted` is the lightest text allowed anywhere (never lighter, for contrast). `hair` is the only rule color and appears only in tables and lists, never as decoration between sections. `navy` is reserved for Royal American pages and the bag drawer; `navy-2` is its hover. `gold` is used for hairline accents and numerals set at 24px or larger, never for body text, never for buttons, never as a fill. There is no other hue: no accent color, no gradient, no tinted near-black. White appears only in control fills.

## Typography

Two families, three roles. `Source Serif 4 Variable` (one file, optical sizes 8 to 60) sets names and headlines (`display`, `section`, `item`): weight 400 only, tight leading, slightly negative tracking, `text-wrap: balance`, measure at most 34ch; the browser picks the display optical size from the font size. The same family at its text sizes sets reading prose (`letter`, `lede`), measure at most 62ch, `text-wrap: pretty`. `Public Sans Variable` sets everything functional: body, labels, numbers and controls. Figures are lining everywhere; numbers in tables and prices are tabular (`num`). `caps` (11px, 500, 0.08em tracking, uppercase) is allowed only on navigation and buttons; labels above content are sentence case (`label`), never tracked caps. No italics anywhere, no bold inside a headline, no single accented word. Headings are sentence case. Prices are set in `num`, round, once per page, with "Price before sales tax" as the only qualifier. Libre Caslon (Display and Text) was retired on 2026-10-13: the owner read it as "too scripty", and its old-style figures and calligraphic italic were the cause. Source Serif was drawn at Adobe after Fournier: a plain, exact reading face that stays calm at 76px; Public Sans is the United States government's own face, descended from Franklin Gothic.

## Layout

A 12-column grid with 24px gutters at 1024px and above; a single column below 768px with 16px side margins and no horizontal overflow. Splits are asymmetric: 7/5 or 8/4, photograph on the wide side, text aligned to the photograph's top edge. Vertical rhythm comes from `--section-y` (12vh desktop, 8vh phone) between screens and from the spacing scale inside them: 8/12/16 within a text block, 24/32/40 between blocks, 64/96/128 between groups. Each screen has one subject and at most one action. Photographs bleed to the viewport edge on one side at most; never letterboxed, always art-directed per breakpoint (4:5 on phone, 3:2 on desktop). No two screens of a page share a composition: the vocabulary is the opener, the plate, the beside, the line, the ledger, the velvet band and the viewing (`docs/briefs/site/22-art-direction.md`). A line's pieces are a ledger (one photograph per row, names and prices aligned); the index (`/jewelry`) is three across with the middle column set lower, never an equal row of tiles; no bordered cards: the image, three lines of text, nothing else. The header is one row of eight names, each opening a full-width panel of plain links with at most one photograph. Text never sits on a photograph without a real overlay. Nothing shifts when clicked.

## Elevation & Depth

Flat. No drop shadows, no cards, no layered panels. Depth comes from photography (contact shadows in the packshots) and from the single navy field of the bag drawer and Royal American. Focus is a 2px `gold` outline with 2px offset. The one exception to flatness is the 3D ring, which carries its own contact shadow on the paper.

## Shapes

Square corners everywhere (`rounded.none`). Buttons, fields, option tiles and images are rectangles with 1px borders in `ink` or `hair`; the border color may change state, the border never disappears or thickens. No pills, no chips, no badges, no circles except the swatch for a metal color (a 20px circle with a 1px `hair` ring).

## Components

`button-primary`: 48px tall, `ink` fill, `paper` text in `caps`, 1px `ink` border; hover goes to `ink-2`; disabled is 45% opacity; nothing moves. `button-outline`: same geometry, transparent fill, `ink` text and border. `option` (version, metal, size tiles): 52px tall, 1px `hair` border, selected becomes a 1px `ink` border with no fill change; the row keeps one fixed height so selection never reflows. `field`: 48px, 1px `hair` border, 16px input text so phones do not zoom, `gold` focus ring. `bag-panel`: `navy` ground, `paper` text, hairlines in `navy-2`. `product-ground`: the paper itself behind every packshot (`.float` for a packshot on white). `model-ground`: the paper behind the R3F ring, never full-bleed. Tables: the serif for the first column name, `num` for figures, `hair` rules between rows only. Accordions (details) replace any copy longer than 30 words.

## Do's and Don'ts

Do: one subject per screen; let names and photographs carry meaning; set prices round and once; keep controls at fixed heights; use `label` in sentence case; reveal with opacity and 12px travel at 600ms on `--ease-house`, at most once per screen, never on every section; crossfade pages in 300ms; respect reduced motion fully; keep gold at 24px and above; keep muted as the lightest text.

Don't: promo bars, countdowns, discounts, "Shop now", review stars on product pages, carousels, For Her / For Him, value-prop trios, icon rows, bordered cards, chips, badges, line drawings, gradients, hover image swaps, 8-up grids, repeated intro blocks, tracked-caps eyebrows, middle-dot meta strings, "→" on links, 01/02/03 markers, drop shadows, pills, stock or AI imagery, model faces who are not the family, text on photos without an overlay, scroll-jacking or pins longer than one viewport, any hue outside the palette, any typeface outside the two families, equal tile rows, promo tiles in a menu.

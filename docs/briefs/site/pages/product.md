# Page brief: product page (/pieces/:handle)

Purpose: section briefs for the product page: a calm page wrapped in service. 90 visible words above the fold, 160 folded.
Last updated: 2026-10-11
Sources: REMAKE-BLUEPRINT §4 (data), §6; research/08 page blueprint (PDP); research/04 disclosures per page; HANDOFF session 3 item 6; storefront/app/routes/piece.tsx; house.css; data.ts.

```
SECTION: Product page, gallery
JOB: Show the piece from every angle, true to life
ONE SUBJECT: the first photograph    NEXT ACTION: "Turn it in 3D" (secondary: none)
SKETCH: TODO
LAYOUT: >=1024 gallery 7 cols left: four object views, hand frame, hallmark frame; 1:1 | <768 swipeable stack is a carousel: use a vertical stack instead
CONTENT: alt text as the bench would say it (metal, finish, stone, setting, ground). "Turn it in 3D" opens iJewel iframe from custom.model_source_embed, own R3F viewer as fallback; ?view=3d deep link
TYPE: toggle .quiet
SPACING: TODO
CONTROLS: Photo | 3D toggle, .quiet 36px, aria-pressed
MOTION: none on images; 3D loads behind the poster
STATES: loading 3D = poster stays; no model = no toggle; Royal American = no 3D
TAKE: TODO    LEAVE: hover zoom lenses, carousel dots, AR, true scale
DON'T: renders presented as photos (label 3D); enlarged stone images without a true-size note (§23.1 Note 3)
DONE WHEN: first image is LCP; iframe never shifts layout (reserve 4:3, min-height 420)
```

```
SECTION: Product page, buy column
JOB: Decide with nothing in the way
ONE SUBJECT: name and price    NEXT ACTION: "Add to bag" (secondary: "See it in store")
SKETCH: TODO
LAYOUT: >=1024 sticky 5 cols right | <768 below the gallery
CONTENT: breadcrumb .label; name (qualified: man-made pieces say "man-made diamond" in the title or the line directly under it); ref line "Ref. AM 004" plus line name (no middle dot); one sentence ≤18 words (data.ts description); price or "From $"; "Price before sales tax."; lead time from data.ts ("Made to order, about 3 weeks"); Version tiles, Metal swatches, Size select + "Sizing help", Engraving field ("20 characters, included" TODO confirm), Add to bag, See it in store, Save
TYPE: name .h-section 36px / 44px; ref .label; sentence Caslon Text; price .num same visual weight as the name
SPACING: TODO
CONTROLS: .opt tiles 52px, .swatch 48px, select.field 48px, .btn 48px; selected = ink border + inset; nothing shifts when a variant changes (reserve price width)
MOTION: color and border only
STATES: unavailable variant = disabled tile with label; error on add = inline sentence; Royal American = "Price on request" + "Request a private viewing", no bag
TAKE: TODO    LEAVE: financing "as low as", stars, review count, urgency, "x people viewing"
DON'T: compare-at price; percent; "free" banner; chips
DONE WHEN: price, variants and Add to bag above the fold at 1440x900; no CLS on variant change
```

```
SECTION: Product page, spec table and accordions
JOB: Answer every factual question before it is asked
ONE SUBJECT: the spec table    NEXT ACTION: "A question about this piece"
SKETCH: TODO
LAYOUT: below the buy column; .spec table then four details.acc
CONTENT: spec rows from data.ts specs + Metal (solid 14k gold, karat-marked; rhodium on white gold) + Stone (natural F-G VS GIA, or "Man-made diamond (laboratory-grown), D-F, VVS, IGI report No. ____, as grown") + Made: "Designed in Tennessee. Set and finished in our workshop. Diamonds and gold are imported." Accordions: The stones (or The stone and its report) ≤45 / Care and warranty ≤35 + warranty link / Delivery and returns ≤40 / A question about this piece ≤25 with a named human TODO
TYPE: .spec th .label; summaries Caslon Text 16px
SPACING: TODO
CONTROLS: details.acc min 52px, no layout jump
MOTION: none (research/11 M9 accordion animation optional, Proposed)
STATES: n/a
TAKE: TODO    LEAVE: SEO FAQ filler
DON'T: specs in prose; "flawless"; "GIA-certified"
DONE WHEN: every disclosure in 06-claims-and-compliance "Product page" row present
```

```
SECTION: Product page, complete the set and behind the design
JOB: One sibling row and one line of story
ONE SUBJECT: up to four siblings in the design    NEXT ACTION: a sibling
SKETCH: TODO
LAYOUT: 2 + 2 cards; then one centered sentence as .h-display
CONTENT: "Complete the set" (built); "Behind the design" one line from the design story TODO
TYPE: .h-section; card roles as line page
SPACING: TODO
CONTROLS: cards are links
MOTION: none
STATES: no siblings = section hidden
TAKE: VCA's sibling row (research/06)    LEAVE: "You may also like"
DON'T: cross-line recommendations that cascade a design down a line
DONE WHEN: hidden cleanly when empty
```

```
SECTION: Product page, "See it in the light" (Decided 2026-10-13: the default on pieces with a stone, not on Royal American; the stone drawn at the selected version's carat; a "shown larger than life" line with the millimetres when looking closer; no button under reduced motion or without WebGL)
JOB: Let a stone be seen the way it is seen at the counter: dark room, one light, the light in the visitor's hand
ONE SUBJECT: the stone    NEXT ACTION: back to the page ("Close")
LAYOUT: the first photograph stays the first frame; "See it in the light" (.btn-light) bottom left of it replaces "Turn it in 3D" on pieces with a stone | the room opens over the page as a full-screen dialog on ink: the piece centered, title top left, "Close" top right, "Look closer" and (touch only) "Tilt to see the fire" bottom right, the grade bottom left when looking closer
CONTENT: "{title}, in the light"; "Close"; "Look closer" / "Step back"; the grade line from the stone standard (no new claims)
TYPE: title Caslon Text 17px paper; links .link-light; grade Caslon Text 18px italic paper
CONTROLS: native dialog (Escape closes, focus returns); links 44px (`.link` site-wide since 2026-10-13)
MOTION: the light comes up once; the camera moves in on "Look closer"; reduced motion = no room (the photograph stays)
STATES: "Bringing out the piece" until the first frame; no WebGL = a sentence that says so; the chosen metal carries into the room
TAKE: mockups/viewing    LEAVE: the dark room as the page itself
DON'T: put the price or the action inside the room; open it automatically
DONE WHEN: gallery and buy column unchanged in the first viewport; council APPROVED
```


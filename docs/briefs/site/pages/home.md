# Page brief: home (/)

Purpose: section briefs for the home page. Eight screens, one subject each, no two alike (opener, ledger, plate, velvet, index, beside, line, ledger), 110-150 visible words plus the letter's last paragraph (decided 2026-10-11, C39).
Last updated: 2026-10-13
Sources: REMAKE-BLUEPRINT §6; research/08 page blueprint (home) and §5b; storefront/app/routes/home.tsx (current build); house.css. Conflicts: hero eyebrow case (open-questions C2, briefs follow sentence case); "American" as an adjective in the headline (C34).

```
SECTION: Home, header (all routes)
JOB: Say the name and open eight plain doors, each a panel of names (Decided 2026-10-13; `app/lib/nav.ts`)
ONE SUBJECT: the wordmark    NEXT ACTION: a line or design link (secondary: Appointment)
SKETCH: TODO
LAYOUT: >=1024 Search left, centered wordmark, utility right: Appointment, Kept, Bag, Account; beneath, one row of eight names, each opening a full-width paper panel (columns of links, one photograph at most, one sentence at most) | <1024 Menu, wordmark, Bag; the menu is the same panels as accordions with a search field above
CONTENT: Jewelry (by kind, by design, collections), Bridal (engagement, wedding bands, before you choose), Royal American (the registry, by appointment), Americana and New American (designs, pieces, collections or the standard), Services (at the bench, made for you, appointments), Stores (the two addresses, a visit), The House (the letter, journal, the small print). Utility: Search, Appointment, Kept, Bag, Account
TYPE: wordmark placeholder (logo paused); nav .caps 11px 0.08em (caps allowed on nav)
SPACING: TODO
CONTROLS: text links only; no icons except bag count (research/10: four 1px SVGs max)
MOTION: none; the wordmark persists through the 300ms page crossfade
STATES: focus-visible gold ring; current page underlined with --ink 1px
TAKE: Cartier and Van Cleef panels (columns of names, one picture)    LEAVE: promo bar, promo tiles in a panel, hamburger-only desktop nav
DON'T: announcement strip, shipping banner, a search field in the bar itself (Search opens a sheet)
DONE WHEN: one line at 1440 with no wrap; no horizontal overflow at 390
```

```
SECTION: Home, hero
JOB: Say what the house is in one frame
ONE SUBJECT: one photograph (the hand in window light; the comp until the shoot)    NEXT ACTION: "The designs" (secondary: none)
SKETCH: TODO
LAYOUT: >=1024 PhotoOpener full-bleed, words lower left on overlay | <768 4:5 crop, words below the fold line on overlay
CONTENT: label "Brentwood and Mt. Juliet, Tennessee"; headline "An American house of fine jewelry."; button "The designs" (built; about 20 words)
TYPE: label .label (sentence case, light on photo); headline .h-display; button .btn-light
SPACING: TODO
CONTROLS: .btn 48px
MOTION: photo .settle only
STATES: overlay .photo-overlay plus .on-photo on all text; contrast checked
TAKE: TODO    LEAVE: tracked caps eyebrow (blueprint's "BRENTWOOD AND MT. JULIET, TENNESSEE"), autoplay video hero, sale hero
DON'T: two buttons; a sentence explaining the page; review count
DONE WHEN: headline and button above the fold at 1440x900 and 390x844; contrast 4.5:1 on the overlay
```

```
SECTION: Home, design of the season
JOB: Teach one house design by name
ONE SUBJECT: full-bleed macro of the Shooting Star    NEXT ACTION: "The design" (secondary: none)
SKETCH: TODO
LAYOUT: >=1024 2.2:1 image, then name 6 cols left, motif sentence 5 cols right | <768 4:5 image, name, sentence
CONTENT: "Shooting Star" + "A five-point star with a trailing tail of graduated stones." + "The Shooting Star design" (built)
TYPE: name .h-display 48px / 80px; sentence .lede
SPACING: TODO
CONTROLS: link .link
MOTION: .settle on the image; hover dims the name to --muted
STATES: focus-visible on the whole block
TAKE: TODO    LEAVE: product grid on home
DON'T: price; badges; a second design on the same screen
DONE WHEN: name readable without scrolling past the image at 1440x900
```

```
SECTION: Home, the lines
JOB: Name the lines without counting them
ONE SUBJECT: the names set as type    NEXT ACTION: a line page
SKETCH: TODO
LAYOUT: >=1024 stacked list rows, name 6 cols, tagline 5 cols, no photograph (the hover photographs left 2026-10-13: they repeated the plate and the registry band, council I5) | <768 name over tagline
CONTENT: Royal American "One of one. Never made again." / Americana "Natural diamonds. Our own designs." / New American "Man-made diamonds. The same hands." (built; screen-reader heading names them, no count)
TYPE: names .h-display 40px / 64px; taglines .lede 18px ink-2
SPACING: rows py 32px / 40px; hairlines between rows (a list)
CONTROLS: rows are links
MOTION: none
STATES: focus-visible row outline
TAKE: TODO    LEAVE: cards, numerals, "three", badges
DON'T: "Tier I/II/III"; prices; ranking words
DONE WHEN: all names visible at 1440x900 on one screen
```

```
SECTION: Home, build a ring
JOB: Invite the builder with the finished ring as a still
ONE SUBJECT: the Signal ring as the builder draws it, a render on the paper, captioned as a render    NEXT ACTION: "Build on Signal"
SKETCH: TODO
LAYOUT: >=1024 render 7 cols bleeding left, shown whole on the paper, words 5 cols right | <768 render then words
CONTENT: "Build a ring." + "Three settings we drew. The rest is yours." + "Build on Signal" (built; counts settings, not lines; the longer sentence lives on the builder)
TYPE: .h-section 36px / 48px; .lede; .btn
SPACING: TODO
CONTROLS: .btn 48px
MOTION: .settle; no live 3D on home (default, open-questions B20)
STATES: TODO
TAKE: TODO    LEAVE: configurator on home
DON'T: price on home
DONE WHEN: button above the fold of this screen at 390x844
```

```
SECTION: Home, the bench
JOB: Show the most differentiating true fact
ONE SUBJECT: the bench (photo now; 12-second loop later)    NEXT ACTION: "The House"
SKETCH: TODO
LAYOUT: >=1024 words 4 cols left, image 7 cols right | <768 words then image
CONTENT: current build "The bench is on the floor." + "In Mt. Juliet you can watch your stone being set." TODO: confirm store and form (open-questions C1) before launch
TYPE: .h-section; .lede; .link
SPACING: TODO
CONTROLS: if video: a visible pause control (open-questions C23)
MOTION: loop muted, poster first, static under reduced motion
STATES: video loading shows poster
TAKE: TODO    LEAVE: autoplay wallpaper video with no control
DON'T: "handmade"; "master jewelers"
DONE WHEN: fact confirmed by the family; no CLS when the video loads
```

```
SECTION: Home, stores
JOB: Turn interest into a visit
ONE SUBJECT: the two addresses    NEXT ACTION: a store page
SKETCH: TODO
LAYOUT: >=1024 two columns | <768 stacked
CONTENT: name, street, city, phone per store (built); hours line TODO until confirmed
TYPE: names .h-section 32px / 44px; street Caslon Text ink-2; phone .num .label
SPACING: gap 40px / 64px
CONTROLS: links; phone tel: links
MOTION: none
STATES: hover dims name
TAKE: TODO    LEAVE: map embeds on home; review stars
DON'T: review count on home (research/08 §1d.4)
DONE WHEN: both addresses visible together at 1440x900
```

```
SECTION: Home, the registry in the light (Proposed 2026-10-12; council variant /?viewing=registry)
JOB: Show one Royal American piece the way the salon shows it: alone, on navy velvet, under one light
ONE SUBJECT: The Cumberland in the light    NEXT ACTION: "Every piece in the registry"
SKETCH: owner direction 2026-10-12 ("a hair more regular, not an abstract website"); prototype in mockups/viewing
LAYOUT: >=1024 label, title and sentence 5 cols left over the registry list, the viewing 7 cols right at 5:4 | <768 title, the viewing at 4:5, the list, the link
CONTENT: "Royal American" / "The registry" / "Each piece is made once, given a number and named for a place in Tennessee." / No. 001 to 003 / "Every piece in the registry" (all existing words; nothing added)
TYPE: .label; .h-section 36px / 48px; .lede; .gold-numeral 24px; names .h-section 24px
SPACING: section .screen on .velvet; list rows py 20px
CONTROLS: "Tilt to see the fire" (.btn-light) on touch screens only, after the light is up
MOTION: the light comes up once (1.6 s) when the frame first opens; the pointer or the phone's tilt moves the light and turns the ring a few degrees; nothing else moves; reduced motion shows the poster
STATES: poster in the server HTML; the room draws only while on screen; no WebGL = the poster
TAKE: mockups/viewing (the light, the velvet, the fire)    LEAVE: full-page dark rooms, one-piece-at-a-time browsing on the home
DON'T: a price; a second piece; text over the render
DONE WHEN: the poster is the first paint of the section; no layout shift when the room takes over; council APPROVED
```

```
SECTION: Home, hero as the viewing (Proposed 2026-10-12; council variant /?viewing=hero, for comparison)
JOB: Open the home on the viewing instead of the hand
ONE SUBJECT: The Cumberland in the light    NEXT ACTION: "The designs"
LAYOUT: as the hero above, the photograph replaced by the viewing (ring right of the words on desktop, raised above them on phone)
CONTENT: unchanged hero words
MOTION: as the registry in the light; the poster is the LCP
DON'T: anything the hero brief forbids
DONE WHEN: council ruling recorded against council P14 (3D never the hero) and I3 (the photograph owns the home's first viewport)
```

```
SECTION: Home, the index (Decided 2026-10-13)
JOB: Open the catalog by kind in one row
ONE SUBJECT: the four kinds as names with their counts    NEXT ACTION: a kind page (/jewelry/rings etc.)
LAYOUT: >=1024 label "The index" 3 cols, the names in one row 9 cols, "Every piece" after them | <768 the names wrap
CONTENT: Rings, Necklaces, Earrings, Bracelets, each with its count in .num; "Every piece" to /jewelry
TYPE: names .h-display 36px / 48px; counts .num .label
CONTROLS: links, 44px
MOTION: none
DON'T: tiles; a fifth kind the catalog cannot fill
DONE WHEN: all four names on one line at 1440x900
```

```
SECTION: Home, the registry (Decided 2026-10-13, replaces the two viewing variants below, which are withdrawn)
JOB: Show the registry on the velvet it owns, with the piece on its tray
ONE SUBJECT: the registry list beside one photograph on navy    NEXT ACTION: "Every piece in the registry"
LAYOUT: >=1024 label, title, sentence 5 cols left over the list; the photograph 7 cols right at 4:3 with its edges dissolved into the navy (.dissolve) | <768 title, the photograph at 4:5, the list, the link
CONTENT: "Royal American" / "The registry" / "Each piece is made once, given a number and named for a place in Tennessee." / No. 001 to 003 / "Every piece in the registry"
TYPE: .label; .h-section 36px / 48px; .lede; .gold-numeral 24px; names .h-section 24px
DON'T: live 3D on the home (council ruling (a), 2026-10-13); a price; text over the photograph
DONE WHEN: no visible rectangle around the photograph (edge against navy under 1.1:1)
```

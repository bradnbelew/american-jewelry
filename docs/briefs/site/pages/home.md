# Page brief: home (/)

Purpose: section briefs for the home page. Six screens, one subject each, 110-150 visible words.
Last updated: 2026-10-11
Sources: REMAKE-BLUEPRINT §6; research/08 page blueprint (home) and §5b; storefront/app/routes/home.tsx (current build); house.css. Conflicts: hero eyebrow case (open-questions C2, briefs follow sentence case); "American" as an adjective in the headline (C34).

```
SECTION: Home, header (all routes)
JOB: Say the name and give eight plain ways in, nothing else
ONE SUBJECT: the wordmark    NEXT ACTION: a line or design link (secondary: Appointment)
SKETCH: TODO
LAYOUT: >=1024 centered wordmark, text nav on one line, utility right: Appointment, Saved, Bag | <768 menu, wordmark, bag
CONTENT: nav items TODO (research/06 and 08 say eight; research/01 and 05 say seven; open-questions C27). Utility: Appointment, Saved, Bag
TYPE: wordmark placeholder (logo paused); nav .caps 11px 0.08em (caps allowed on nav)
SPACING: TODO
CONTROLS: text links only; no icons except bag count (research/10: four 1px SVGs max)
MOTION: none; the wordmark persists through the 300ms page crossfade
STATES: focus-visible gold ring; current page underlined with --ink 1px
TAKE: TODO    LEAVE: promo bar, mega-menu with promo tiles, hamburger-only desktop nav
DON'T: announcement strip, shipping banner, search bar for now
DONE WHEN: one line at 1440 with no wrap; no horizontal overflow at 390
```

```
SECTION: Home, hero
JOB: Say what the house is in one frame
ONE SUBJECT: one photograph (a piece on the navy box)    NEXT ACTION: "The designs" (secondary: none)
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
CONTENT: "Shooting Star" + "A five-point star with a trailing tail of graduated stones." + "The design" (built)
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
LAYOUT: >=1024 stacked list rows, name 6 cols, tagline 4 cols, hover photo 2 cols (opacity only) | <768 name over tagline, no photo
CONTENT: Royal American "One of one. Never made again." / Americana "Natural diamonds. Our own designs." / New American "Man-made diamonds. The same hands." (built; screen-reader heading names them, no count)
TYPE: names .h-display 40px / 64px; taglines Caslon Text 17px ink-2
SPACING: rows py 32px / 40px; hairlines between rows (a list)
CONTROLS: rows are links
MOTION: hover photo fades in 500ms opacity only; nothing moves
STATES: focus-visible row outline
TAKE: TODO    LEAVE: cards, numerals, "three", badges
DON'T: "Tier I/II/III"; prices; ranking words
DONE WHEN: all names visible at 1440x900 on one screen
```

```
SECTION: Home, build a ring
JOB: Invite the builder with the finished ring as a still
ONE SUBJECT: the Signal ring photograph (later the assembly poster frame)    NEXT ACTION: "Build on Signal"
SKETCH: TODO
LAYOUT: >=1024 image 7 cols on --stone, words 4 cols right | <768 image then words
CONTENT: "Build a ring." + "Three settings we drew. The stone, the metal and the fit are yours." + "Build on Signal" (built; counts settings, not lines)
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

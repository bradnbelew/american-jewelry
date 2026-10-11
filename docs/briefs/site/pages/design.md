# Page brief: design page (/designs/:slug)

Purpose: section briefs for a design motif page (Shooting Star, Prism, Signal, Grid). Home of the signature feature. 120-180 visible words.
Last updated: 2026-10-11
Sources: REMAKE-BLUEPRINT §2, §6; research/08 page blueprint (design page) and signature; research/11 §3 M12 and §7 ring plan; storefront/app/routes/design.tsx; data.ts DESIGNS.

```
SECTION: Design page, opener
JOB: Name the design and give it a line
ONE SUBJECT: the design name, set very large    NEXT ACTION: scroll into the assembly
SKETCH: TODO
LAYOUT: >=1024 label (line name link), name, motif sentence left; full-bleed 2.2:1 image below | <768 4:5 image
CONTENT: label = line name (e.g. "Americana"); name; tagline ≤8 words TODO (current build shows the motif sentence, e.g. "A five-point star with a trailing tail of graduated stones.")
TYPE: name .h-display 56px / 96px / 128px, .measure-display; tagline .lede
SPACING: TODO
CONTROLS: line link .label
MOTION: .settle on image; no word-split title (open-questions C22)
STATES: n/a
TAKE: TODO    LEAVE: caps eyebrow
DON'T: price here
DONE WHEN: name and tagline above the fold at 1440x900 and 390x844
```

```
SECTION: Design page, the stone is set (Signal, Shooting Star, Prism)
JOB: The signature: the house ring assembles over one viewport of scroll
ONE SUBJECT: the ring    NEXT ACTION: keep scrolling (no words)
SKETCH: TODO
LAYOUT: canvas in a paper frame, 4:5 on phone, never full-bleed; pinned exactly one viewport, below the opener
CONTENT: none (wordless)
TYPE: n/a
SPACING: TODO
CONTROLS: none; no drag hint, no "scroll to explore"
MOTION: GSAP ScrollTrigger scrub 1, pin one viewport: band arrives, head rises, stone lowers, four claws close, one light sweep; reversible; Lenis only on this page. Pointer-reactive key light (off on touch). Reduced motion or WebGL failure: poster frame, no pin
STATES: loading = poster img in the DOM, canvas crossfades in over 300ms when loaded; no loader counter
TAKE: TODO    LEAVE: idle spin, exploded view, hotspots, AR
DON'T: pin longer than one viewport; change scroll speed on text; three.js outside *.client.tsx
DONE WHEN: poster is LCP; CLS 0; scroll back reverses cleanly; reduced motion shows poster only
```

```
SECTION: Design page, three features
JOB: Explain the design by its parts
ONE SUBJECT: one part per screen (e.g. the star, the tail, the hallmark)    NEXT ACTION: none
SKETCH: TODO
LAYOUT: >=1024 image 7 cols, caption 5 cols, alternating sides | <768 image then caption
CONTENT: label + one sentence ≤18 words each. TODO final copy (data.ts story and signature lines are the raw material)
TYPE: .label; Caslon Text 17px
SPACING: TODO
CONTROLS: none
MOTION: .settle
STATES: n/a
TAKE: TODO    LEAVE: numbered 01/02/03 markers
DON'T: captions that repeat the photo
DONE WHEN: sides alternate; never the same layout twice in a row
```

```
SECTION: Design page, every piece
JOB: Show the pieces in this design
ONE SUBJECT: the pieces grid    NEXT ACTION: a piece
SKETCH: TODO
LAYOUT: asymmetric grid, four-line cards
CONTENT: heading "Every Shooting Star piece" (built pattern "Every {name} piece"); cards as on line pages
TYPE: .h-section; card roles as line page
SPACING: TODO
CONTROLS: cards are links
MOTION: none on cards
STATES: n/a
TAKE: TODO    LEAVE: filters, sort
DON'T: badges, hover swap
DONE WHEN: no overflow at 390
```

```
SECTION: Design page, build on
JOB: Hand off to the builder with this setting
ONE SUBJECT: one sentence    NEXT ACTION: "Build on Shooting Star"
SKETCH: TODO
LAYOUT: text-only screen
CONTENT: TODO final; research/08 draft: "Every Shooting Star setting takes a natural or a man-made stone; the name on the box follows the stone." (Signal, Shooting Star and Prism only; Grid has no builder setting). See open-questions C35
TYPE: .lede; .btn
SPACING: TODO
CONTROLS: .btn 48px
MOTION: none
STATES: n/a
TAKE: TODO    LEAVE: second CTA
DON'T: price comparison between stones
DONE WHEN: one sentence, one button
```

# Page brief: line pages (/royal-american, /americana, /new-american)

Purpose: section briefs for the line pages. One route component (`routes/line.tsx`); Royal American has its own velvet treatment. 60-90 visible words above the grid.
Last updated: 2026-10-11
Sources: REMAKE-BLUEPRINT §6; research/08 page blueprint (line page) and Americana codes; storefront/app/routes/line.tsx; data.ts; research/04 disclosures per page.

```
SECTION: Line page, opener (/americana, /new-american)
JOB: State the stone standard and the line's idea in one screen
ONE SUBJECT: the line name over one photograph    NEXT ACTION: scroll to designs (secondary: none)
SKETCH: TODO
LAYOUT: >=1024 SplitOpener, title left, photo right bleeding to edge | <768 photo then title
CONTENT: label = stone standard: Americana "Natural diamonds, F-G, VS1, GIA." / New American "Man-made diamonds (laboratory-grown), D-F, VVS, IGI." Name. One sentence ≤16 words: TODO final (data.ts intros are too long and New American's says "flawless to the loupe", which must go: open-questions C7)
TYPE: label .label; name .h-display; sentence .lede
SPACING: TODO
CONTROLS: none
MOTION: .settle on photo
STATES: n/a
TAKE: TODO    LEAVE: tracked caps eyebrow; tier badge
DON'T: count the lines; compare the stones' prices or value; eco language near New American
DONE WHEN: label, name, sentence above the fold at 1440x900 and 390x844
```

```
SECTION: Line page, designs and pieces
JOB: Route to a design by name, then show its pieces
ONE SUBJECT: one design band at a time    NEXT ACTION: a design page or a piece
SKETCH: TODO
LAYOUT: >=1024 each design as a full-width photographic band with its name, then an asymmetric 2 + 1 grid of pieces | <768 single column
CONTENT: design names with one-line motif; cards 4 lines ≤12 words: name / spec line in words (no middle dots) / price or "From $" / nothing else
TYPE: design names .h-section 28px / 36px; card name .h-item; spec .label; price .num
SPACING: TODO
CONTROLS: cards are links; no buttons on cards
MOTION: .settle on images only; no hover swap; card hover dims price only (Proposed)
STATES: empty design (no pieces yet): TODO copy
TAKE: TODO    LEAVE: 8-up grid; filters; "Most loved"
DON'T: stars, badges, "new" pills, chips
DONE WHEN: no row of more than three; no overflow at 390
```

```
SECTION: Line page, New American Standard (/new-american)
JOB: Publish the standard as a table
ONE SUBJECT: the standard table    NEXT ACTION: "Build a ring"
SKETCH: TODO
LAYOUT: >=1024 heading 4 cols, table 8 cols | <768 stacked
CONTENT: color D-F; clarity VVS1-VVS2; cut Excellent or Ideal, Hearts and Arrows on round centers; IGI report on centers 0.30 ct and up, laser inscribed; growth method and treatment disclosed; solid 14k or 18k gold or platinum. TODO: family approval of wording
TYPE: .h-section; .spec table
SPACING: TODO
CONTROLS: .btn
MOTION: none
STATES: n/a
TAKE: TODO    LEAVE: "the only store that publishes" (unverified, C8)
DON'T: price per carat; comparison to natural
DONE WHEN: table readable at 390 without horizontal scroll
```

```
SECTION: Line page, bridal sentence (/americana, /new-american)
JOB: Point to the shared bridal settings
ONE SUBJECT: one sentence    NEXT ACTION: "Build a ring"
SKETCH: TODO
LAYOUT: centered text-only screen
CONTENT: TODO final; research/08 draft: "Every setting takes a natural or a man-made stone; the name on the box follows the stone."
TYPE: .lede
SPACING: TODO
CONTROLS: .btn
MOTION: none
STATES: n/a
TAKE: TODO    LEAVE: repeated intro
DON'T: count the settings and the lines in one sentence
DONE WHEN: one sentence, one button
```

```
SECTION: Royal American, opener and chapters (/royal-american)
JOB: Present each one-of-one as a chapter on velvet
ONE SUBJECT: one piece per chapter    NEXT ACTION: "Request a private viewing" (once)
SKETCH: TODO
LAYOUT: >=1024 navy ground (.velvet), PhotoOpener full-bleed, then chapters 7/5 alternating sides | <768 single column
CONTENT: label "One of one. Price on request."; name; each chapter: name without registry prefix, one sentence, "Price on request". Pieces are stand-ins (open-questions A13)
TYPE: names .h-display 40px / 56px on paper color; labels .velvet .label
SPACING: TODO
CONTROLS: .btn-light
MOTION: .settle only
STATES: sold pieces: "Acquired [year]" (Proposed)
TAKE: TODO    LEAVE: add to bag; prices; "handmade" exception from research/04
DON'T: any number of pieces in the line; urgency ("only one left")
DONE WHEN: text on navy passes contrast; gold only at 24px+
```

```
SECTION: Royal American, the registry
JOB: Show the house's numbered record
ONE SUBJECT: the registry table    NEXT ACTION: "Request a private viewing"
SKETCH: TODO
LAYOUT: table full width within .wrap on navy
CONTENT: No. / piece / stone report / year / state (TODO real entries)
TYPE: .registry with gold numerals at 24px+; labels paper 60%
SPACING: TODO
CONTROLS: rows link to pieces
MOTION: none (research/11 count-up M10 not adopted)
STATES: empty registry: TODO copy
TAKE: TODO    LEAVE: loyalty-program language
DON'T: invent registry entries for launch
DONE WHEN: real entries confirmed by the family
```

# Page brief: ring builder (/build/ring)

Purpose: section briefs for the ring builder: low friction, compact, iJewel-style panel. 60 visible words.
Last updated: 2026-10-11
Sources: HANDOFF rules 2, 7, 10 and session 3 item 2; REMAKE-BLUEPRINT §4, §6; research/08 page blueprint (builder); storefront/app/routes/build-ring.tsx; lib/builder/model.ts, pricing.ts, code.ts.

```
SECTION: Builder, top
JOB: Open on the ring, complete, with the house defaults
ONE SUBJECT: the ring (assembly at page top once built)    NEXT ACTION: choose a setting
SKETCH: TODO
LAYOUT: >=1024 canvas 7 cols on --stone (5:4), decisions 5 cols | <768 canvas square then panel
CONTENT: "Build a ring" + "Three settings we drew. The stone, the metal and the fit are yours." (built; trim to fit the 60-word budget)
TYPE: .h-display 48px / 72px; .lede .measure
SPACING: TODO
CONTROLS: n/a
MOTION: "the stone is set" over one viewport, then the configurator; camera eases to what changed; reduced motion = poster and no auto-rotate
STATES: clientLoader route; HydrateFallback is a stone-colored block with aria-busy
TAKE: iJewel's compact panel    LEAVE: OrbitControls free spin from below; true scale; AR
DON'T: three.js outside *.client.tsx
DONE WHEN: panel and canvas both above the fold at 1440x900
```

```
SECTION: Builder, decisions panel
JOB: One label row per decision over one control
ONE SUBJECT: the ring's name and price    NEXT ACTION: "Add to bag" (secondary: "See it in store first")
SKETCH: TODO
LAYOUT: setting (photographs), stone (two tiles: Natural diamond, Man-made diamond), carat (select), metal (swatches), size (select), engraving (field, read live on the band)
CONTENT: ring named once via ringName() ("Signal, 1.50 ct man-made diamond, 14k yellow gold"); price once; "Made to order, about 2 weeks. Price before sales tax." (leadTimeWeeks: natural 3, man-made 2, +1 halo, +1 birthstone); design code line AJ-XXXXXX-C
TYPE: labels .label; name .h-item; price .num
SPACING: TODO
CONTROLS: .opt 52px, .swatch 48px, .field 48px, .btn 48px; fixed heights; nothing shifts when the price changes
MOTION: camera turns to show the change; engraving typed live with the camera turning to read it (Phase 3)
STATES: engraving over 20 chars blocked with a sentence; WebGL failure = photograph of the setting
TAKE: TODO    LEAVE: step-by-step wizard; stone list; itemized live ledger in the open
DON'T: stone inventory; price per carat; side-by-side natural vs man-made price comparison (research/02 proposes it; family rule forbids comparison)
DONE WHEN: every stone choice says "Natural diamond" or "Man-made diamond"; server recomputes price from the design code
```

```
SECTION: Builder, disclosures
JOB: Keep finer adjustments and price logic out of the way
ONE SUBJECT: two disclosures    NEXT ACTION: none
SKETCH: TODO
LAYOUT: two details.acc under the panel
CONTENT: "The jeweler's adjustments" (profile, width, claws, taper, hidden halo, tail, birthstone, engraving hand) and "Where the price comes from" (metal, bench, stone). Stone standards: natural F-G, VS1, Excellent, GIA; man-made D-F, VVS1-VVS2, Ideal, IGI. Market inputs are working assumptions until the bench's cost sheet (open-questions A12)
TYPE: summaries Caslon Text
SPACING: TODO
CONTROLS: details.acc
MOTION: none
STATES: n/a
TAKE: TODO    LEAVE: gold price ticker outside the breakdown
DON'T: show made-up market numbers as facts at launch
DONE WHEN: approval note present ("custom pieces are final once approved"), pending counsel
```

```
SECTION: Builder, the settings
JOB: Introduce the three settings by name with the designer's note
ONE SUBJECT: one setting per row    NEXT ACTION: "Build on [setting]"
SKETCH: TODO
LAYOUT: photo 3 cols on white, note 9 cols
CONTENT: Signal, Shooting Star, Prism with notes from lib/builder/notes.ts
TYPE: .h-section 28px
SPACING: TODO
CONTROLS: .btn-outline
MOTION: none
STATES: n/a
TAKE: TODO    LEAVE: line drawings (removed at the family's direction)
DON'T: imply Shooting Star or Prism with a man-made stone cascades the Americana design (open-questions C35)
DONE WHEN: family confirms the cascade question
```

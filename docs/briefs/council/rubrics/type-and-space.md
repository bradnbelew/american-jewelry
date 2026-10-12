# Seat T: type and space

The seat asks one question: does the type read as a house that sets every size on purpose, at every width?

| ID | Rule | Check | Severity | Source |
|---|---|---|---|---|
| T1 | At most three faces: one for names, one for prose (may be the same), one sans for UI and numbers. | measured: `type.familyCount` ≤ 3 | Blocker | canon Visual tokens; research/17 §7 (never a fourth web face) |
| T2 | Prose is 16 to 20px; the letter and the product sentence may reach 19px. | measured: `type.bodySize` | Should | Butterick (web 15–25px); DESIGN.md roles |
| T3 | Prose leading 1.3 to 1.6; serif prose takes the upper half. | measured: `type.bodyLeading` | Should | Butterick (120–145%); frontend-design skill |
| T4 | Prose measure: median 45 to 75 characters per line; no line over 80. | measured: `type.measureCpl.p50`, `.max` | max: Blocker; median: Should | Butterick (45–90); DESIGN.md measure 62ch; research/18 §A (Chaparro 2004) |
| T5 | Nothing below 11px; muted text never below 13px. | measured: `type.smallest`; judged for muted | Blocker | canon (muted is the lightest text); WCAG readability |
| T6 | Caps only on nav and buttons, 11px at about 0.08em; labels and headings in sentence case. | measured: `type.capsShareOfBlocks`, `type.capsSizes`; judged where | Should; caps eyebrow over a heading is a Blocker | canon voice 9, AI-tell lint |
| T7 | Sizes come from the role scale; distinct sizes inside the band. | measured: `type.sizesUsed` | Should | DESIGN.md roles; research/15 §5 (Vignelli: few sizes) |
| T8 | A headline holds its lines: at most two at 390, one or two at 1440, no single orphan word, no wrap mid-phrase. | measured: `type.h1.lines`; judged from screenshots | Should | research/16 §2 (numbers, not adjectives); critic rubric 3 |
| T9 | Figures are lining and tabular wherever numbers are compared: prices, specs, the registry, sizes. | judged from screenshots and `.num` in code | Blocker in the registry and prices | canon (numbers are the adjectives); critic finding A1–A2 (2026-10-11) |
| T10 | Section spacing follows `--section-y` (12vh desktop, 8vh phone); the section gap sits inside the band. | measured: `spacing.sectionGapVh` | Should | DESIGN.md; research/18 §B (Pracejus 2006: white space signals prestige) |
| T11 | Few alignment axes: text starts on the grid's columns, not wherever a component put it. | measured: `spacing.alignmentAxes` | Should when outside the band | research/15 §5 (Müller-Brockmann, the 7/5 split) |
| T12 | Gaps come from the scale (4, 8, 12, 16, 24, 32, 40, 64, 96, 128). | measured: `spacing.distinctGaps`; judged by reading code | Should | DESIGN.md spacing; critic rubric 4 |
| T13 | Text aligns to the photograph's top edge when they share a row. | judged | Could | critic rubric 4; research/06 field notes |
| T14 | Italic and bold are never used for emphasis in running text. | measured: `type.italicShare`; judged | Should | critic rubric 3 |

How to judge T8 and T13: open the 390 and 1440 screenshots, count the headline's lines, and measure the offset between the first text baseline block and the photograph's top edge. Report the number.

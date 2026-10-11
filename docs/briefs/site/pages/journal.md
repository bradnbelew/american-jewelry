# Page brief: journal (/journal, /journal/:slug)

Purpose: section briefs for the journal index and entries: plain, specific, checkable writing that answer engines quote. Entries are unbudgeted; the index is a list.
Last updated: 2026-10-11
Sources: REMAKE-BLUEPRINT §6; research/08 (journal); research/09 ("You Ask, We Answer" topics); storefront/app/lib/journal.ts (four articles, 2026-10-09); storefront/app/routes/journal.tsx and article.tsx.

```
SECTION: Journal, index
JOB: A list someone can scan in five seconds
ONE SUBJECT: the newest entry    NEXT ACTION: an entry
SKETCH: TODO
LAYOUT: >=1024 newest entry as image 7 cols + title; then rows: date 3 cols, title, one line | <768 stacked
CONTENT: four built entries: "How to read an IGI Laboratory Grown Diamond Report"; "What "Designed in Tennessee" means, and what we will not say"; "Ring size, honestly"; "How a ring is made at our bench". Next topics from the old site's questions: fake Rolex, gold buying, warranty, custom process, wedding band choices, the 4 Cs, repairs, white gold vs platinum, cleaning cadence
TYPE: .h-display title; rows .h-section; date .label; summary Caslon Text
SPACING: TODO
CONTROLS: rows are links
MOTION: .settle on the lead image only
STATES: n/a
TAKE: TODO    LEAVE: tag clouds, categories, author cards with stock faces
DON'T: dates in the future; "minutes to read" badges
DONE WHEN: list fits one screen at 1440x900 for the first five entries
```

```
SECTION: Journal, entry
JOB: Answer one question completely and honestly
ONE SUBJECT: the text    NEXT ACTION: the related page (builder, services, natural-or-man-made)
SKETCH: TODO
LAYOUT: single column, 62ch, Caslon Text
CONTENT: typed blocks (h, p, list, table) in journal.ts. Every outside fact checkable; every house statement true. Note: "How a ring is made" says the bench is "through the glass in Mt. Juliet" and casting details: confirm (C1, A5). "Ring size, honestly" states the 60-day resize policy (C38)
TYPE: .letter at 17-19px; tables .spec
SPACING: TODO
CONTROLS: none
MOTION: none
STATES: n/a
TAKE: TODO    LEAVE: pop-up newsletter capture
DON'T: banned words; claims without a source; em dashes as separators
DONE WHEN: Article JSON-LD valid; each entry links to one product or service page
```

# Page brief: stores (/stores, /stores/:slug)

Purpose: section briefs for the stores index and each store page. These are the location pages that fix the biggest leak (local search). ≤80 visible words per store.
Last updated: 2026-10-11
Sources: REMAKE-BLUEPRINT §6; research/04 Part 5 (GBP, schema, store page spec); research/08 page blueprint (stores); storefront/app/routes/stores.tsx and store.tsx; data.ts STORES; outside research §6.

```
SECTION: Stores index, opener and two stores
JOB: Sell the visit to either store
ONE SUBJECT: the two stores    NEXT ACTION: "Book [store]" (secondary: store page)
SKETCH: TODO
LAYOUT: >=1024 title, then each store as photo 7 cols + words 5 cols, alternating | <768 stacked
CONTENT: current build "Two stores. One bench." + "Brentwood shows the pieces. Mt. Juliet makes them and cares for them." TODO: store roles unconfirmed (open-questions C1, C37); hours line TODO; "Hours are provisional; call before a long drive." until confirmed
TYPE: .h-display 48px / 72px; store names .h-section; .label for notes
SPACING: TODO
CONTROLS: .btn, .btn-outline
MOTION: .settle on photos
STATES: hoursConfirmed false = provisional note
TAKE: TODO    LEAVE: map wall; star widgets
DON'T: invent roles or hours
DONE WHEN: family confirms roles and hours
```

```
SECTION: Store page, opener (/stores/brentwood, /stores/mt-juliet)
JOB: Be the page Google sends local searchers to
ONE SUBJECT: the storefront photograph and the address    NEXT ACTION: "Book [store]" (secondary: directions)
SKETCH: TODO
LAYOUT: >=1024 SplitOpener, label = street and city, name, role line | <768 photo then words
CONTENT: label "157 Franklin Road, Brentwood, Tennessee" / "401 S Mt Juliet Road, Suite 165, Mt. Juliet, Tennessee"; name; role TODO; buttons "Book Brentwood" and "Directions"
TYPE: label .label; name .h-display; .btn
SPACING: TODO
CONTROLS: .btn 48px; tel: link
MOTION: .settle
STATES: n/a
TAKE: hotel-page calm (research/01 convention 9)    LEAVE: chat widget, sticky call bar
DON'T: keywords in the business name; a different NAP from Google
DONE WHEN: title tag "American Jewelry, Brentwood, TN, 157 Franklin Rd" (no em dash); NAP matches GBP character for character
```

```
SECTION: Store page, facts
JOB: Hours, phone, what happens here, the people, one dated review line
ONE SUBJECT: the hours table    NEXT ACTION: "Book [store]"
SKETCH: TODO
LAYOUT: >=1024 table 7 cols, "what happens here" 5 cols | <768 stacked
CONTENT: hours table TODO (confirmed only); phone; "What happens here" ≤25 words TODO; interior photo with a named person TODO; parking and Suite 165 wayfinding TODO; services at this location (data.ts lists draft services); one line: "2,537 Google reviews between two stores, as of [date]." or this store's own count, dated, attributed to Google
TYPE: .spec table; Caslon Text; .label
SPACING: TODO
CONTROLS: none
MOTION: none
STATES: unconfirmed hours = provisional note and no hours in schema
TAKE: TODO    LEAVE: quoted reviews, stars, aggregateRating
DON'T: hard-code a count without its date; invent names
DONE WHEN: JewelryStore JSON-LD with geo (5+ decimals), hasMap, parentOrganization, openingHoursSpecification only when confirmed; validated in Rich Results Test
```

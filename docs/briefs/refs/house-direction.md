# One American Jewelry storefront

13 October 2026. Implementation direction, following the owner's rejection of all three preview alternatives. The original photographic storefront is the baseline. This supersedes the Working Jeweler recommendation and the selectable-preview plan.

## Composition

The jewelry carries the identity. Open with a close, tactile photograph and the name of the design. Preserve a quiet two-level wordmark/navigation header. Follow with an interactive photographic signature cabinet: a visitor selects Shooting Star, Prism, Signal, Grid or one of the four proposed families, sees the defining form and its real catalog relatives. Royal American changes the room to navy velvet and an object-led registry. Bridal brings the object back into daylight. House and stores complete the experience without taking over the brand.

Tokens: paper #F6F5F2, ink #121212, supporting text #3F3F3F, muted #63676E, midnight #101C30, photographic forest green. Source Serif 4 for names and reading, Public Sans for controls and specifications. No new logo. No headline accents, novelty type, invented history, decorative diagrams or workshop-first positioning.

Layout: full photographic opening; centered signature navigation above an asymmetric object cabinet; wide velvet registry; close bridal composition; compact visit invitation. Align controls consistently; keep buying facts legible and close to the object. Mobile gets deliberate crops, compact tabs, whole-object product frames and reachable filters.

## Plan review

A generic luxury landing page could use a slogan, lifestyle photograph and rows of categories. Remove the slogan and avoid that structure. The ownable content here is the shape and translation of each AJ design across catalog pieces and clearly labeled proposals. Every family needs internally coherent photography before its presentation can be convincing. Contact plates are generated concept assets, displayed through individual viewports, never represented as original designer drawings or actual inventory photographs. Old mismatched product views are removed.

## References inspected

- Cartier home, desktop/mobile: LOVE repeated at architectural scale, very small campaign copy in relation to the object. Learn recognizable form and photographic control, not red, branding or heritage claims.
- Van Cleef & Arpels home: a collection occupies a complete visual world; subject-specific images carry more than large copy. AJ's material worlds come from its own jewelry.
- Tiffany home: collections connect campaign scale to recognizable individual objects. Keep AJ's navigation direct while avoiding the standard promotional grid.
- Supporting owner reference brief: Boucheron Impermanence and Hemmerle Harmony, idea-to-wearability and depth within a signature. No competitor assets enter this repository.

## Delivery checks

One default experience, including old preview links/cookies. Meaningful shopping regression checks; desktop/mobile screenshots; keyboard and mobile navigation; gallery and size selection; matching filter price/version; production TypeScript/GraphQL/build; house lint; master push; successful Oxygen workflow and stable-host verification. Payment and appointment delivery require a configured end-to-end check and cannot be inferred from a successful build.

## Catalog expansion and navigation

Eight styles: four existing signatures and four owner-authorized proposals (Meridian, Ribbon, Horizon, Petal), each proposed family with a ring, pendant and earrings. Eight collections draw from these forms; Family explicitly crosses styles. Five primary navigation destinations avoid exposing the internal taxonomy all at once. Proposed pieces show Design concept instead of a price, use CreativeWork structured data, and offer a consultation. No Shopify product is created or implied.

## Layout correction after owner review

The owner's next review identified layout, spacing, title placement and continuity as the largest issues. This supersedes the scattered heading treatments and viewport-based spacing above. Preserve the identity and images; rebuild their relationships.

Palette stays paper #F6F5F2, ink #121212, supporting #3F3F3F, muted #63676E, midnight #101C30 and focus gold #B08D57. Source Serif 4 carries names (desktop 64/44/32, phone 44/32/24) and reading copy (18); Public Sans carries controls (13/14) and metadata (13). Use a shared 1440px container with 48px desktop, 32px tablet and 20px phone gutters. Vertical roles: 8/16px within a caption, 24/32px heading-to-content, 64/96px between complete sections. A single section owns each boundary; do not stack both neighbors' full padding.

Layout comparison:
```
Before: centered title / detached description / repeated title + object / repeated object grid
After:  [ title + one description | family photograph ]
        [ result count           | sort + filter    ]
        [ product                 product     product ]

Home:   campaign / signatures / collection edit / Royal American / bridal / visit
        shared left edge; each heading belongs to the content immediately below or beside it
Royal:  [ High Jewelry + Royal American | object photograph ]
        [ piece name + description     | registry choices  ]
```

The three collection frames use a 16:9 lead and square secondary frames with matching physical heights, so captions share one baseline without cropping the Family photograph. The signature controls are small navigation, not competing display titles. Remove the separate home introduction and the duplicated design cabinet/grid. The product name precedes the gallery on phone and remains beside it on desktop. Keep secondary material text at reading scale.

Plan review: a generic card grid or larger titles would repeat the failure. Keep the distinctive Shooting Star campaign, unequal collection widths, and the Royal velvet world; spend the correction on grouping, common edges and clear hierarchy. Inspect full-page transitions as well as first viewports at 390, 768 and 1440.

## Complete shopping experience revision

The owner explicitly asked for less copy and fewer unnecessary buttons and titles on every page, and for decisions about shopping, filtering and browsing as a complete journey. Consistency and clear adjacency take precedence over the older rule that every screen must use a different composition.

Reference pages inspected in the browser: Cartier home and LOVE Unlimited bracelet product page; Tiffany home and HardWear collection including its filter drawer; Van Cleef & Arpels home. Cartier uses large object photography with a small, directly attached caption. Tiffany connects a short collection introduction to a three-column grid and a right-hand filter drawer with a count and explicit apply action. VCA joins related object and editorial images instead of inserting long introductory sections. These are structural references; no competitor branding, copy or images are reused.

Browsing: category links select the kind of jewelry. Design and collection pages keep their context and use the same results component. Cards show the name and price, retaining a lab-grown or selected-stone qualifier where necessary. Product rows align across the grid. There is no quick-add because size and configuration matter.

Filtering: the drawer works on desktop and phone. Options are grouped by Style, Metal, Stone, Price, Edition and Line. Selections within a group are alternatives; groups narrow each other. Counts preview the matching selection. Show pieces applies the draft; Close and Escape discard it. Selected filters remain removable above the products. Clear all preserves the chosen sort. The URL stores the applied state; selected stone/metal choices travel to the product. Price and stone must match the same version.

Buying: product name, photograph, price and required choices lead. All metal choices have visible names. Ring size is explicit and never silently assumed. Engraving is optional and folded. The purchase action is primary, with saving and an in-store visit secondary. The bag shows configuration and subtotal before optional packaging information. Empty bag and saved states offer one clear browse action. Public checkout and appointment delivery remain subject to their existing configuration, not implied by this UI review.

Support: store locations, telephone and directions are immediately legible; care, service, commissioning, account, saved, compare and appointment pages have concise headings and shared content edges. Legal and technical stone information is retained where it communicates an actual term or decision.

# Council verdict: home-viewing-hero
Date: 2026-10-13. Commit: 039517a. Report: reports/home-viewing-hero.md.

**NOT APPROVED** (1 Blockers, 13 Shoulds, 9 Notes)

Scope: the home at `/?viewing=hero`, where the viewing replaces the hand frame as the first screen (`home.tsx` hero branch). The report was measured at first paint under reduced motion, so its screenshots show the poster; the live shots `viewing-live/home-hero-live__1440.png` and `__390.png` show the same composition with the scene running (pixel values below were read from those and the poster shots). Per the brief's DONE WHEN, P14 and I3 are ruled below. Stand-in status is under I6 and is not failed, as instructed. Placement is ruled in `viewing-placement-2026-10-13.md`.

## Blockers
1. [C5, judged] 390, 768, 1440, the opener (`bg-navy` section, home.tsx:40): navy `#16213a` is the ground of the house's first screen, but its words ("An American house of fine jewelry.") and its one button ("The designs", to /americana) speak for the whole house and for a different line; the only Royal American signal is the alt text, nothing visible names it. Canon: navy only on Royal American and the bag. Decision 2026-10-12 put velvet on the home for the Royal American registry because the registry is Royal American's; the opener is not. The home then carries two velvet bands (the opener and the registry) where it carried one. Fix: no navy outside the registry band; the opener stays the family's hand frame.

## Shoulds
1. [P14] all widths: the 3D is the hero. Rule: never the hero, behind a poster, after the photograph. The poster is eager and `fetchPriority="high"` (it paints first), but the scene mounts at hydration (the hero is in view at once, so `active` is true) and runs `frameloop="always"`. Fix: do not put the viewing in the first viewport (placement ruling).
2. [I3, I9] 390, 768, 1440: the first viewport holds no photograph; its 0.92 / 0.86 / 0.86 image share is a render, and the family's hand frame (the house's one daylight picture) is gone from the first screen. Without the render the screen is a navy block. Fix: restore the hand frame as the opener.
3. [I7] 768: the ring is cropped by the frame (poster state). At x=766 the ring is present at y=400 to 470 (chrome arc) and y=628 to 690 (lower band), so its right edge runs past x=768. "No product cropped." Cause: the landscape poster (1600 x 1280) is centre-cropped into the 768 x 880 hero, because the tall poster's `media` covers only `max-width: 767px`. By code the live scene at 768 has aspect 0.87, so `x = 0` (`aspect > 1 ? offset * visibleW : 0`) and the ring would recentre when the scene takes over; not verified live. Fix: art-direct a poster for 768 to 1023 at the frame's 0.87 aspect with 24px clear of x=768, and make the scene's offset rule match it.
4. [Outside the rubric: brief LAYOUT "ring right of the words on desktop"] 1440: the headline is 1100 px wide (x=40 to 1143) and the ring base sits over it: about 180 px of "jewelry." (x=900 to 1080) crosses the ring's foot (y=668 to about 697). At 768 "house" ends x=548 and the ring's dark band starts 12 to 36 px away (x=560 at y=690, x=584 at y=706). Fix: `measure-display` is 34ch (the headline fills x=40 to 1143 on one line); set `lg:max-w-[18ch]` (about 583 px) so it breaks to two lines ending near x=623, and keep the ring right of x=700.
5. [Outside the rubric: home brief hero DONE WHEN "button above the fold at 390x844"] 390: the button spans y=817 to 865 and the fold is 844, so 21 of its 48 px (44%) are below the fold. Cause: `h-[100svh]` starts under the 68px header, so the hero ends at y=912 and the CTA sits 48px above that. Fix: `h-[calc(100svh-4.25rem)]` below `md`.
6. [P7] 390: by code, `TiltControl` is `absolute bottom-4 left-4` inside a hero that ends 68px below the fold, so it sits at y=848 to 896 under the `z-10` text block; the live 390 shot shows no Tilt button. Confirm on a phone. Standalone `.link` anchors at 23px are the site-wide item already logged (home registry verdict). Fix: place Tilt in the frame's top-right on touch.
7. [D1, D4] 1440: with the name covered, a dark ring on a lit floor under an 88px Caslon headline could open any luxury jeweler's site; the generic part is the whole first screen. Fix: the family's hand frame with a Signal or Shooting Star ring (PHOTOS-TODO, "Home hero").
8. [W1] all widths: 185 words against 110 to 150 (the variant adds 0). Fix: as in the registry verdict (letter's first sentence only, drop the signature: 151).
9. [W6] signature repeats the hero label on the same page; the build lede repeats `build-ring.tsx:66`. Fix: cut the signature on the home.
10. [T4] 1440: median measure 38 characters per line (rule 45 to 75). Fix: `md:col-span-5` on the build and letter ledes.
11. [T7 / band] 768 and 1440: largest type 72px and 88px (houses' max 68 and 76); 11 distinct sizes at 1440 (band 4 to 9). Fix: opener h1 `md:text-[4.25rem] lg:text-[4.75rem]` in both openers, or record the departure.
12. [T12 / band] 768: typical block gap 73px against a band maximum of 60 (the same 73 as the baseline home; the registry variant, which replaces the registry band, measures 45). Likely cause: the type-only registry rows, `md:py-8` (64px between rows, home.tsx:144). Fix: `md:py-6` (48px) and re-measure.
13. [I6] 390 and 1440, design of the season: `tristar-charm` under the star sentence (carried, photos.ts:62). Fix: `gem-stack-rings`.

## Notes
- [P14, evidence] Measured without reduced motion, this page never reached network idle within 240 s in headless Edge on the dev server (software rendering); the registry variant and the product page loaded normally. Evidence, not a measured house-rule failure; no hardware number exists.
- [I6] The render is a stand-in (the Cumberland's name on a 5.02 ct Signal-head ring from the builder's geometry; open-questions A13). No visible text calls it a photograph; no caption says it is a drawing, and PHOTOS-TODO has no row for `viewing-hero.webp` or `viewing-hero-tall.webp`. On the first screen the stand-in is the house's first impression.
- [C7] `.photo-overlay` (0.8 to 0.6 ink over the lower 40%) darkens the ring's own lower arc; the lower band reads `#0b0c0d` (y=628 to 700 at x=740 to 766 in the 768 shot). The overlay is the allowed gradient; the effect is that the platinum band reads black.
- [W9] "Tennessee Star" is a state name; the letter is draft words (both carried).
- [W7] "The designs" goes to /americana while the picture is a Royal American piece (price on request, never sold online); the button's scope does not match the image.
- [W2] median 6 words against 8 to 14; set by short list rows.
- [T9] the registry band lower on this page is the original type-only band; `.gold-numeral` has no tabular rule (carried).
- [T6, T14] caps `.link` x3 (open-questions C40); signature 18px italic as a sign-off.
- [T11] 1440: hero text x=40; the registry text below starts x=56.

## Seat by seat
| ID | Result | Evidence |
|---|---|---|
| T1 | pass | 3 faces |
| T2 | pass | body median 18 / 19 / 18 |
| T3 | pass | leading 1.6 |
| T4 | fail (Should) | median 38 at 1440; 37 at 390 |
| T5 | pass | smallest 11 (caps controls); muted labels 13px |
| T6 | note | caps share 0.14; no caps eyebrow |
| T7 | fail (Should) | 11 sizes at 1440; largest 88 / 72 outside |
| T8 | pass | h1 two lines at 390 and 768, one at 1440; no orphan |
| T9 | note | no tabular rule (carried) |
| T10 | pass | section gap 0.16 / 0.25 / 0.24 vh |
| T11 | note | axes 2 / 8 / 10; 16px drift to the registry band |
| T12 | fail (Should) | 768 gap 73px, band max 60 |
| T13 | n/a | text sits over the render, not beside it |
| T14 | note | signature italic, sign-off only |
| C1 | pass | measured ground paper; navy is a palette token, judged under C5 |
| C2 | pass | one accent |
| C3 | pass | 0 low-contrast; paper on `#1b1e28` (the overlay over navy) 14.88:1 |
| C4 | pass | gold only on navy, 24px |
| C5 | fail (Blocker) | navy opener, not Royal American's |
| C6 | pass | boxed 0, shadowed 0, pills 0, radius 0; the hero fills its section, no frame edge |
| C7 | note | overlay is the allowed gradient; darkens the ring |
| I1 | n/a | home |
| I2 | n/a | not a product page |
| I3 | fail (Should) | render, not a photograph, owns the stage |
| I4 | pass | 0 text on photographs; text on `.photo-overlay` plus `.on-photo` |
| I5 | pass | no image twice |
| I6 | fail (Should) | design photo (carried); note: stand-in render at first paint |
| I7 | fail (Should) | ring cropped at 768 |
| I8 | pass | house geometry, no stock, no AI, no faces |
| I9 | fail (Should) | first screen reads navy, not paper and ink |
| W1 | fail (Should) | 185 vs 110 to 150 |
| W2 | note | median 6 |
| W3 | pass | `house-lint`: 95 files, 0 errors |
| W4 | pass | 0 exclamations, 0 em dashes |
| W5 | pass | 5 elements at the fold (13 words) |
| W6 | fail (Should) | signature and build lede repeat |
| W7 | note | "The designs" scope vs a Royal American image |
| W8 | pass | "Man-made diamonds. The same hands."; provenance line verbatim in the footer |
| W9 | note | draft letter; "Tennessee Star" |
| W10 | n/a | not a product page |
| W11 | n/a | not a product page |
| W12 | pass | sections open on the piece, the names, the place |
| P1 | n/a | not a product page |
| P2 | pass | 1440: the lit stone (brightest point `#f4f4f4`), headline second; 390: the ring alone above y=525 of 844; the collision is Should 4 |
| P3 | n/a | no options |
| P4 | pass | fixed hero height; poster crossfade 300ms |
| P5 | n/a | no gallery |
| P6 | n/a | not a product page |
| P7 | fail (Should) | buttons 48px; Tilt placement; `.link` 23px |
| P8 | n/a | no purchase states |
| P9 | pass | 12 visible links at 1440 |
| P10 | pass | "Build on Signal" |
| P11 | pass | footer links |
| P12 | pass | no urgency |
| P13 | n/a | no bag |
| P14 | fail (Should) | the 3D is the hero; scene mounts at hydration |
| D1 | fail (Should) | see below |
| D2 | pass | page level: registry grammar, navy velvet registry, type on paper, provenance line in the footer; the hand frame is missing from the first screen |
| D3 | pass | light, and the object as protagonist |
| D4 | fail (Should) | the whole first screen |
| D5 | pass | no caps eyebrow, middle dot, arrow link, 01/02 marker or icon card |
| D6 | pass | ends on the two addresses |
| D7 | pass | one mark in the header |
| D8 | note | a visitor sees a ring and the house line within a second; the button's destination is a different line from the picture |

## Distinctiveness, in two lines
Hide the name: a dark ring under a large Caslon headline is a luxury-3D opener any jeweler could run; the family's hand, the registry grammar and the letter are what only this house has, and none of them is in the first screen. Forwardable, unhurried: not forwardable as an opener, since the picture is a builder stand-in; nothing hurries the reader, but the scene runs continuously from first paint.

## The one change that would most raise this page
Take the viewing and the navy out of the first screen and restore the hand frame; the one Blocker (C5) and Shoulds 1, 2, 3, 4, 5, 6 and 7 all trace to putting the render at the fold.

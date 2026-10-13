# Photographs: what stands in, and what each slot must become

Purpose: every image slot on the site that is not yet the house's own photograph of the thing it shows, with its current stand-in and the shot that replaces it (research/14 §5 shot list, §6 photographer brief).
Last updated: 2026-10-13
Rule: house photographs first (storefront/public/photos), then renders of the house's own cast files (storefront/public/3d), then iJewel embeds, then a license-clear comparable only if a slot is still empty. No other brand's imagery, no model faces. **Exception, 2026-10-13, mockup only:** the owner allowed the generated comps (`comp-*` keys in `photos.ts`) on the private mockup; every one is listed below as "AI comp, replace before launch" and none may ship when `PUBLIC_SITE_LIVE` turns on (HANDOFF launch blocker).

## AI comps in use (mockup only; replace before launch)

| Key | File | Where it shows | The photograph that replaces it (refs/comps/PROMPTS.md) |
|---|---|---|---|
| `comp-home-hand`, `comp-home-hand-tall` | C01 | home opener (desk and phone), Americana beside | C01 home-hand: the family's hand on linen, Shooting Star ring |
| `comp-americana-ground` | C05 | Americana opener, home design of the season, Shooting Star first frame, Jewelry and Americana panels | C05 americana-ground: the ring on green leather |
| `comp-new-american-opener` | C06 | New American opener, Signal design plate, New American panel | C06 new-american-opener: Signal on limestone |
| `comp-cumberland-velvet` | C03 | Royal American opener, home registry band, The Cumberland first frame, Royal American panel | C03 cumberland-velvet (the real No. 001 on its tray) |
| `comp-signal-packshot` | C07 | Signal Solitaire first frame (contain, on the paper) | C07 signal-packshot-paper |
| `comp-signal-hand` | C08 | Signal Solitaire second frame, New American plate, Bridal opener and panel | C08 signal-hand (the comp shows six prongs; Signal has four) |
| `comp-the-box` | C13 | the bag's "What arrives" | C13 the-box |
| `comp-bench-hands` | C14 | House opener, Services opener, Services and House panels | C14 bench-hands (or the real bench, which is photographed, never mocked) |

Also to re-shoot: `ring-signal.webp` (the builder's render, now on the paper) stays a render until a Signal ring is photographed.

## Stand-ins in use (all the house's own photography from american.jewelry unless noted)

| Slot | Stand-in today | Source | Must become |
|---|---|---|---|
| Home hero | `comp-home-hand` / `comp-home-hand-tall` (AI comp, 2026-10-13) | generated | `hand`: the family's hand, daylight, one Signal or Shooting Star ring |
| Home, design of the season | `comp-americana-ground` (AI comp, 2026-10-13) cropped to 2.2:1 | generated | `macro` of the Shooting Star at 2.2:1 |
| Home, the lines | no photograph since 2026-10-13 (the hover frames repeated the plate and the registry band, council I5) | n/a | none needed |
| Home, Build a ring | **render** `/3d/posters/ring-signal.webp` on the paper, shown whole, captioned "Signal, as the builder draws it." | ParametricRing | a photograph of a finished Signal ring at 4:3 on the paper |
| Home, the bench | **removed from the home 2026-10-12** until it can be shown honestly | n/a | the 12-second bench loop (laser, polishing wheel, natural sound, poster frame) and one bench still; the screen returns when it exists and the family confirms the fact (C1) |
| Home, the registry | `comp-cumberland-velvet` (AI comp, 2026-10-13), dissolved into the navy | generated | No. 001 on its navy tray, one lamp |
| Royal American hero | `comp-cumberland-velvet` (AI comp) | generated | `34` of a Royal American piece on navy |
| Americana hero | `comp-americana-ground` (AI comp) | generated | `34` of a Shooting Star ring on green leather |
| New American hero | `comp-new-american-opener` (AI comp) | generated | `34` of a Signal solitaire on limestone |
| Line pages, the hand frame | Americana `comp-home-hand` (beside), New American `comp-signal-hand` (plate); AI comps | generated | one `hand` frame per line, different pieces |
| Design bands (Shooting Star, Prism, Signal, Grid) | `tristar-charm`, `signet-b`, `ring-halo`, `huggie-diamond` | american.jewelry | `macro` per design |
| Design page, the stone is set (Signal) | **render**: `/3d/posters/ring-signal.webp` from the house renderer, "set" camera | ParametricRing, 2026-10-11 | the Blender-authored clip and its poster (research/14 §4.3) |
| Design page, three parts | first product photo of three pieces | american.jewelry | `macro` of the star, the tail, the hallmark |
| House, how a piece is made (four frames) | product photos | american.jewelry | drawing, CAD screen, casting tree, setting at the bench |
| House and Services opener | `comp-bench-hands` (AI comp) | generated | the real bench, wide, daylight; hands only |
| Stores | `box-peach`, `bench` | american.jewelry | exterior, counter, bench, two staff frames (named only with consent) |
| Product pages | 1 to 3 product photos per piece | american.jewelry | `34`, `profile`, `top`, `macro`, `hallmark`, `hand` per piece |

## Open

- No bench photograph or loop exists; the home bench slot shows a cast-file render labeled as such until it is shot (decision 2026-10-11).
- No storefront exteriors. No hallmark exists to photograph (logo paused).
- No license-clear third-party photographs are in use.
- No hand frame exists for Signal Solitaire (or any New American piece); its second product frame is a stone macro, so research/14 §5 "hand second" cannot be met by layout alone (exploration C, 2026-10-11).

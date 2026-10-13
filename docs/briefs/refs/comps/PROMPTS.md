# Comps: mock images to design with (not for the site)

What these are: layout comps the owner generates so pages can be designed and judged with the right kind of picture before the photographer's shoot (research/14 §6). They are **never deployed and never committed** (this folder ignores image files). Each one is also the brief for the real photograph that replaces it.
Rules for every comp: no faces (crop at the chin or wrist), no text, no logos, no hallmarks, no other brand's piece, nothing that claims to be a real Royal American piece. If a generator adds any of these, regenerate.

**Save as** `docs/briefs/refs/comps/<ID>-<name>.<jpg|png|webp>`, at least 2400 px on the long side. Then say "comps are in" and they will be wired into the dev server behind `?comps=1`.

## The style line (paste in front of every prompt)

> Editorial fine-jewelry photograph, real camera, 100 mm macro lens, natural light, true-to-life metal color, graduated soft reflections on polished metal, deep black edges on the metal from dark cards, crisp focus stacked from the stone to the band, no text, no logo, no watermark, no face, no props beyond what is described, no gradient backdrop, no mirror floor.

## The comps

| ID | Name | Ratio | Goes where | Tests |
|---|---|---|---|---|
| C01 | home-hand | 16:9 and 4:5 | Home opener | the opener with words on the overlay, left third empty |
| C02 | shooting-star-macro | 2.2:1 | Home and Americana plate | macro as the page's only texture |
| C03 | cumberland-velvet | 5:4 | Home registry (velvet), Royal American | a still to compare with the live viewing |
| C04 | americana-hand | 3:2 | Americana opener | the hand frame as a repeated shape |
| C05 | americana-ground | 4:5 | Americana pieces list, product first frame | the green photographic ground on paper |
| C06 | new-american-opener | 3:2 | New American opener | cool north light on stone |
| C07 | signal-packshot-paper | 1:1 | Product page first frame | the object floating on the page ground, no tile edge |
| C08 | signal-hand | 4:5 | Product page second frame | scale in the first two frames |
| C09 | signal-macro | 4:5 | Product page, design page | the claws and the stone |
| C10 | grid-macro | 2.2:1 | New American plate, Grid design | pavé as pattern |
| C11 | prism-macro | 2.2:1 | Prism design, Americana beside | facets as pattern |
| C12 | tennessee-star-velvet | 4:5 | Royal American | a necklace on the velvet |
| C13 | the-box | 4:3 | Bag, "What arrives" | navy on paper with no edge problem |
| C14 | bench-hands | 3:2 | House, services, home bench slot | the bench without a face |
| C15 | the-drawing | 4:3 | House, design pages | the designer's drawing as a photograph |

## Prompts (style line first, then these)

**C01 home-hand.** A woman's left hand resting relaxed on a natural linen tablecloth, soft window daylight from the right, late morning. On the ring finger a slim 18k yellow gold band; on its shoulder a small sharp five-pointed gold star, and from the star a short tail of five tiny round diamonds getting smaller as they curve around the band. Short clean nails, no polish. The hand fills the right two thirds of the frame; the left third is quiet linen in soft shadow, empty, for words. Warm, calm, no other jewelry. 16:9 (also make a 4:5 version with the hand in the upper two thirds and empty linen below).

**C02 shooting-star-macro.** Extreme close-up of the same gold ring's star and its tail of graduated diamonds, the star in sharp focus at left of center, the tail curving away and softening into blur toward the right edge. The ring lies on a warm off-white paper surface (color close to #F6F5F2). Fills the frame edge to edge, no visible ring outline at the frame edges. Panoramic 2.2:1.

**C03 cumberland-velvet.** A platinum solitaire ring with a large round brilliant diamond (about 11 mm) held by six round prongs on a court-profile band, standing upright in the slot of a deep navy velvet ring tray (#16213A). One warm lamp from above left; the velvet falls to near black at the edges; strong fire in the diamond. Ring centered slightly right; quiet velvet to the left. 5:4.

**C04 americana-hand.** A hand resting on a weathered pale limestone step in warm afternoon daylight, wearing one faceted yellow-gold signet ring whose top is a field of crisp triangular planes catching the light. Wrist to fingertips only. Space above the hand for words. 3:2.

**C05 americana-ground.** The star-and-tail yellow gold ring (as in C01) lying on a deep green leather jeweler's tray, three-quarter view from 20 degrees above, window light, the green filling the whole frame edge to edge. 4:5.

**C06 new-american-opener.** A platinum solitaire: round brilliant diamond on an open, slender four-prong head so light enters from below, a thin knife-edge band, a tiny diamond set flush at the base of the head. It rests on honed pale grey limestone in cool, even north light. The ring sits in the right half; the left half is quiet stone, empty. 3:2.

**C07 signal-packshot-paper.** The same platinum solitaire, three-quarter view from 20 degrees above, alone on a seamless warm off-white paper sweep of exactly one color (#F6F5F2), no vignette, no shadow pool, a soft contact shadow only. The ring fills 75 percent of the frame, centered. 1:1.

**C08 signal-hand.** The same platinum solitaire worn on a hand, fingers slightly spread, against an off-white linen background in soft neutral daylight. Wrist to fingertips, no face, no other jewelry. 4:5.

**C09 signal-macro.** Macro of the four claws holding the round diamond, seen from slightly above, the claws razor sharp, the diamond's facets showing spectral fire, dark background falling to black. 4:5.

**C10 grid-macro.** Extreme close-up across a diamond tennis bracelet whose round stones are set edge to edge in a strict square grid, no gaps, white gold, running diagonally across the frame and out both edges. Dark slate background. Panoramic 2.2:1.

**C11 prism-macro.** Extreme close-up of yellow gold shaped into crisp triangular facets with knife edges, high polish, each plane reflecting a different value from bright to black, filling the frame edge to edge like an abstract pattern. Panoramic 2.2:1.

**C12 tennessee-star-velvet.** A platinum necklace whose pendant is a five-point star outlined in small diamonds with a deep blue sapphire at its center, laid on navy velvet (#16213A), the chain falling in one soft S curve. One warm lamp; the velvet goes near black at the edges. 4:5.

**C13 the-box.** A navy velvet hexagonal ring box, lid open, a yellow-gold ring inside, on a warm off-white paper surface (#F6F5F2) that fills the frame edge to edge, soft window light, seen from 30 degrees above. No ribbon, no tissue, no text. 4:3.

**C14 bench-hands.** A jeweler's hands at a wooden workbench: one hand holds a ring in a wooden ring clamp, the other tweezers placing a small diamond; a loupe and a few tools nearby; a warm work lamp; wood dust and wear on the bench. Hands and forearms only, no face. 3:2.

**C15 the-drawing.** A hand drawing a ring design in graphite pencil on heavy off-white paper: the ring seen from the front and the side, with light construction lines; the pencil in the hand at the right edge. Overhead daylight. 4:3.

## Do not generate

- The stores, the bench room, staff or family: these are real places and people and are photographed, never mocked.
- The house mark or any hallmark (the logo is paused).
- Anything presented as The Cumberland, Tennessee Star or The Harpeth themselves on the site; C03 and C12 are comps of the kind of image only.

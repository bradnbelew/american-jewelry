# Seat C: color and image

The seat asks: is the color a ground for the photographs, and is every photograph honest, useful and the only subject on its screen?

## Color

| ID | Rule | Check | Severity | Source |
|---|---|---|---|---|
| C1 | The ground is the palette's paper token; white only behind product photography. | measured: `color.ground`, `color.backgrounds` against `house.css` | Blocker if another ground | canon Visual tokens |
| C2 | One accent at most in text; no other hue. | measured: `color.chromaticText` ≤ 1 | Blocker | canon ("no other hue"); research/18 §A (Reinecke 2013: colorfulness lowers first-impression aesthetics) |
| C3 | Every text color passes AA on its ground (4.5:1; 3:1 at 24px or 18.66px bold). | measured: `color.lowContrast` | Blocker | WCAG 2.2 1.4.3; research/16 §9.1 (gold 2.77:1) |
| C4 | Gold is a hairline or a numeral at 24px and above, and on paper it never carries meaning alone (the same number appears in ink, or the gold is the palette's darkened text gold). | judged | Blocker | canon; DESIGN.md lint warning |
| C5 | Navy velvet only on Royal American and the bag. | judged | Blocker | canon |
| C6 | No shadows, no boxes around content, no pills, no radius. | measured: `surfaces.shadowed`, `.boxed`, `.pills`, `controls.radiusMax` | Blocker | canon Never do (bordered-card grammar, chips, badges) |
| C7 | No gradient except the photo overlay; no tinted black. | judged | Blocker | canon |

## Image

| ID | Rule | Check | Severity | Source |
|---|---|---|---|---|
| I1 | The first image is the object alone on its ground, three-quarter view, filling its frame without letterbox. | judged | Should | research/14 §5 (view order); Baymard (thumbnails, first image product alone) |
| I2 | Any wearable piece shows scale within its first two frames: the hand, the neck, the ear, the wrist. | judged | Blocker on a product page | Baymard: 42% of users judge size from the images; 37% of sites lack an in-scale image; 23% lack a human model for wearables. research/14 §5 |
| I3 | The home's first viewport gives the stage to the photograph. | measured: `fold.imageShare` against the band | Should | Brun et al. 2013 (luxury homepages: larger stage content, fewer elements) |
| I4 | No text on a photograph without a real overlay, and that text passes C3 against the darkest overlay point. | measured: `color.textOnPhoto`; judged contrast from the screenshot | Blocker | canon Never do; critic finding B3 (2026-10-11) |
| I5 | No image twice on one page; one photograph per subject. | judged | Should | canon; research/17 §1 (pacing) |
| I6 | Every photograph shows the piece the words describe. A placeholder is labeled as one in `PHOTOS-TODO.md`. | judged | Blocker if unlabeled | canon (do not invent facts); critic finding C6 |
| I7 | Ratios come from the house set (4:5, 4:3, 1:1, 2.2:1 for wide macros) and are art-directed per breakpoint; no product cropped. | measured: `images.ratios`; judged crops | Should | DESIGN.md; research/14 §1.3 |
| I8 | No stock, no AI imagery, no faces who are not the family. | judged | Blocker | canon |
| I9 | Photography carries the color: the page with photographs removed reads as paper and ink. | judged | Should | canon Layout; research/17 §1 (light) |

# Models

Drop the STL files here. One folder per piece, named with the product handle from the site, and **one STL per material** inside it:

```
models/stl/shooting-star-ring/metal.stl
models/stl/shooting-star-ring/diamond-round.stl
models/stl/shooting-star-ring/diamond-baguette.stl      (only if the piece has more than one cut)
models/stl/signal-solitaire/metal.stl
models/stl/signal-solitaire/diamond-round.stl
```

Rules the converter relies on:

- File names say the material: `metal.stl` (any gold or platinum; the color is chosen in the viewer), `diamond-round.stl`, `diamond-princess.stl`, `diamond-oval.stl`, `sapphire-oval.stl`, `ruby-round.stl` and so on. First word = material, second = cut.
- Units are millimeters, as exported from MatrixGold. If a file comes in at 1000× or 0.001×, say so and the converter can rescale.
- If a piece arrives as one merged STL, put it in as `all.stl`. It converts, but iJewel will treat the whole thing as metal until the stones are separated. Better to re-export.
- The `.3dm` originals, if they exist, are better than STL: iJewel imports them directly with the layer names `Metal Yellow Gold`, `Diamond Round`, etc. Put them in `models/3dm/` and skip conversion.

Handles that exist today: `no-001-the-cumberland`, `no-002-tennessee-star`, `no-003-the-harpeth`, `shooting-star-ring`, `shooting-star-band`, `shooting-star-pendant`, `shooting-star-bracelet`, `shooting-star-signet`, `shooting-star-dog-tag`, `prism-necklace`, `prism-bracelet`, `prism-signet`, `prism-band`, `signal-solitaire`, `signal-studs`, `grid-tennis-bracelet`, `grid-tennis-necklace`, `grid-eternity-band`, `grid-stack-band`, `signal-mens-signet`, `grid-tennis-chain`. A piece that is not on the site yet can use any slug; it becomes the handle when the product is created.

Convert everything:

```bash
python D:/american-jewelry/models/convert.py
```

Output: `models/glb/<handle>.glb`, meshes named for iJewel, compressed with gltf-transform. Upload each GLB to iJewel Playground, save to Drive, make it public, tag it with the handle, create an embed, and paste the embed URL into `models/embeds.json`. See `docs/IJEWEL-WORKFLOW.md`.

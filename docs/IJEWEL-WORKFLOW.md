# iJewel workflow

_How a piece goes from the brother's CAD to a 3D view on the product page. Written 2026-10-10. iJewel has no API; the hand-offs below are the whole integration._

## Plan and licensing

- **Build and evaluate on the Free plan.** 100 models, 50 MB per upload, iframe embedding on our own site, iJewel attribution inside the viewer. No license is required for a private mock or even a public launch with their branding.
- **At launch, decide on Professional** ($1,500/yr): white-label embedding with no attribution, 1,000 models, 200 MB files, white-label ring configurator. Custom domain for the viewer is a $500/yr add-on. A house should not carry another company's name inside its product view, so budget it as a launch cost.
- The Mini Viewer SDK (for the band builder later) needs iJewel support to allow our domain for CORS. The iframe path has no such restriction.

## Pipeline

1. **Files.** STL or 3DM into `models/` per `models/README.md`. One STL per material, folder named with the product handle.
2. **Convert.** `python models/convert.py` writes `models/glb/<handle>.glb`, meshes named `Metal Yellow Gold`, `Diamond Round`, etc., compressed with gltf-transform. (3DM files skip this step; iJewel reads their layers.)
3. **Upload to iJewel Playground** (ijewel3d.com, signed in). Playground assigns metal and gem materials from the mesh names. Check the metal is gold not grey and the stones refract; pick the yellow-gold variant as default. Save to Drive.
4. **Drive.** Open the model, set it **Public**, add a **tag equal to the product handle**, then **Create embed** and copy the **embed URL** (not the iframe code). Note the Drive folder ID once; the tag-based URL `https://ijewel3d.com/drive/files/embedded?tag=<handle>&scope=<FOLDER_ID>` works for every tagged model.
5. **Record it.** Paste the embed URL into `models/embeds.json` under the handle.
6. **Shopify.** Write the URL to the product's `custom.model_source_embed` metafield (definition exists, type URL, Storefront-readable). Claude does this through the Shopify connector; it is one `metafieldsSet` per product.
7. **Site.** The product page reads the metafield and renders `IJewelEmbed`: the photograph by default, the viewer on "Turn it in 3D".

## Giving Claude the wheel

iJewel is driven through its website, so Claude works it through a browser you have signed into:

- Open Chrome with the Claude extension, sign in at ijewel3d.com, then say "iJewel is open". Claude uploads the GLBs from `models/glb/`, checks materials, saves to Drive, sets public and tags, creates the embeds, fills `models/embeds.json`, and writes the metafields.
- The built-in browser pane also works for everything except file upload, which Chrome handles better.

## The two 3D systems, and who owns what

- **iJewel**: photographed catalog pieces (real CAD geometry), the band builder later, Try-On if the family ever wants it.
- **Our own react-three-fiber ring**: the ring builder's parametric designs and the signature "the stone is set" assembly on design pages. Real GLBs from this pipeline can replace the parametric approximation for the three builder settings once they exist.

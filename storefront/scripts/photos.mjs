// Generates the width variants that <Pic> serves in its srcset.
// usage: node scripts/photos.mjs   (from storefront/)
// Reads public/photos/*.jpg, writes public/photos/w/<key>-<width>.webp for each width
// in WIDTHS that does not exceed the source. Re-run after adding a photograph.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

export const WIDTHS = [480, 800, 1200, 1600, 2000];
const src = path.resolve("public/photos");
const out = path.join(src, "w");
fs.mkdirSync(out, { recursive: true });

const files = fs.readdirSync(src).filter((f) => /\.(jpe?g|png)$/i.test(f));
let made = 0;
for (const f of files) {
  const key = f.replace(/\.(jpe?g|png)$/i, "");
  const meta = await sharp(path.join(src, f)).metadata();
  for (const w of WIDTHS) {
    if (w > (meta.width ?? 0)) continue;
    const target = path.join(out, `${key}-${w}.webp`);
    if (fs.existsSync(target)) continue;
    await sharp(path.join(src, f)).resize({ width: w, withoutEnlargement: true }).webp({ quality: 80 }).toFile(target);
    made++;
  }
}
console.log(`photos: ${files.length} sources, ${made} new variants in public/photos/w`);

// Open Graph cards, generated at build time (Oxygen cannot run resvg).
// usage: node scripts/og.mjs [--force]   (from storefront/)
// Writes public/og/<kind>/<slug>.jpg at 1200x630: paper ground, the name in Source Serif, the photograph
// at the right for pieces, designs, lines and stores; the wordmark alone for the house pages.
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import sharp from "sharp";

const require = createRequire(import.meta.url);
const force = process.argv.includes("--force");
const { PIECES, DESIGNS, TIERS, STORES, startingPrice, formatPrice } = await import("../app/lib/catalog/data.ts");
const { PHOTO, PIECE_PHOTOS, DESIGN_PHOTO, TIER_PHOTO } = await import("../app/lib/catalog/photos.ts");
const { ARTICLES } = await import("../app/lib/journal.ts");

const fontDir = (pkg) => path.dirname(require.resolve(`${pkg}/package.json`));
const serif = fs.readFileSync(path.join(fontDir("@fontsource/source-serif-4"), "files/source-serif-4-latin-400-normal.woff"));

const PAPER = "#F6F5F2", INK = "#121212", INK2 = "#3F3F3F", MUTED = "#63676E";
const out = path.resolve("public/og");

async function photoDataUri(key) {
  const p = PHOTO[key];
  if (!p) return null;
  // resvg decodes JPEG and PNG, not WebP: resize the original to the card's right half with sharp
  const buf = await sharp(path.resolve("public" + p.src)).resize(600, 630, { fit: "cover", position: "attention" }).jpeg({ quality: 82 }).toBuffer();
  return `data:image/jpeg;base64,${buf.toString("base64")}`;
}

// satori takes React-like element objects; no JSX needed
const h = (type, props, ...children) => ({ type, props: { ...props, children: children.length === 1 ? children[0] : children } });

function card({ label, title, line, photo }) {
  const left = h(
    "div",
    { style: { display: "flex", flexDirection: "column", justifyContent: "space-between", width: photo ? 600 : 1200, height: 630, padding: "56px 64px", background: PAPER, color: INK } },
    h("div", { style: { display: "flex", fontFamily: "Serif", fontSize: 22, letterSpacing: "0.26em", textTransform: "uppercase" } }, "American Jewelry"),
    h(
      "div",
      { style: { display: "flex", flexDirection: "column", gap: 18 } },
      label ? h("div", { style: { display: "flex", fontFamily: "Serif", fontSize: 22, color: MUTED } }, label) : null,
      h("div", { style: { display: "flex", fontFamily: "Serif", fontSize: title.length > 26 ? 56 : 68, lineHeight: 1.02, letterSpacing: "-0.01em" } }, title),
      line ? h("div", { style: { display: "flex", fontFamily: "Serif", fontSize: 24, color: INK2, lineHeight: 1.4 } }, line) : null,
    ),
    h("div", { style: { display: "flex", fontFamily: "Serif", fontSize: 18, color: MUTED } }, "Brentwood and Mt. Juliet, Tennessee"),
  );
  const right = photo ? h("img", { src: photo, width: 600, height: 630, style: { objectFit: "cover", width: 600, height: 630 } }) : null;
  return h("div", { style: { display: "flex", width: 1200, height: 630, background: PAPER } }, left, right);
}

async function render(file, props) {
  if (!force && fs.existsSync(file)) return false;
  const svg = await satori(card(props), {
    width: 1200,
    height: 630,
    fonts: [
      { name: "Serif", data: serif, weight: 400, style: "normal" },
    ],
  });
  const png = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng();
  fs.mkdirSync(path.dirname(file), { recursive: true });
  await sharp(png).jpeg({ quality: 82, mozjpeg: true }).toFile(file);
  return true;
}

const jobs = [];
jobs.push(["pages/home", { title: "An American house of fine jewelry.", photo: await photoDataUri("hero-hand") }]);
jobs.push(["pages/house", { label: "The House", title: "Drawn by one designer. Set and finished at our bench.", photo: await photoDataUri("bench") }]);
jobs.push(["pages/stores", { label: "Two stores", title: "Brentwood and Mt. Juliet, Tennessee", photo: await photoDataUri("box-peach") }]);
jobs.push(["pages/build-ring", { label: "Build a ring", title: "Three settings we drew. The stone, the metal and the fit are yours.", photo: await photoDataUri("ring-halo") }]);
jobs.push(["pages/services", { label: "Services", title: "A bench that looks after everyone's jewelry.", photo: await photoDataUri("bench") }]);
jobs.push(["pages/journal", { label: "Journal", title: "Plain answers from the bench.", photo: null }]);
jobs.push(["pages/appointments", { label: "Appointments", title: "Come and see it in your hand.", photo: await photoDataUri("hero-hand") }]);
for (const t of TIERS) jobs.push([`lines/${t.slug}`, { label: t.tagline, title: t.name, photo: await photoDataUri(TIER_PHOTO[t.slug]) }]);
for (const d of DESIGNS) jobs.push([`designs/${d.slug}`, { label: "A house design", title: d.name, line: d.motif, photo: await photoDataUri(DESIGN_PHOTO[d.slug]) }]);
for (const s of STORES) jobs.push([`stores/${s.slug}`, { label: `${s.address1}, ${s.city}`, title: `American Jewelry, ${s.name}`, photo: await photoDataUri(s.photo) }]);
for (const p of PIECES) {
  const manMade = p.versions.some((v) => v.origin === "man-made");
  const price = startingPrice(p);
  jobs.push([`pieces/${p.handle}`, { label: p.oneOfOne ? "One of one" : manMade ? "Man-made diamond" : "Natural diamond and solid gold", title: p.name, line: price === null ? "Price on request" : `From ${formatPrice(price)}`, photo: await photoDataUri((PIECE_PHOTOS[p.handle] ?? ["hero-box"])[0]) }]);
}
for (const a of ARTICLES) jobs.push([`journal/${a.slug}`, { label: "Journal", title: a.title, photo: await photoDataUri(a.photo) }]);

let made = 0;
for (const [slug, props] of jobs) {
  if (await render(path.join(out, `${slug}.jpg`), props)) made++;
}
console.log(`og: ${jobs.length} cards, ${made} written to public/og`);

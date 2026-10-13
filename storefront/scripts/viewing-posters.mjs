// Photographs the viewing scene into poster images: node scripts/viewing-posters.mjs
// Needs the dev server (launch config aj-hydrogen, port 3030). WebGL runs on SwiftShader, so it waits.
import path from "node:path";
import puppeteer from "puppeteer-core";
import sharp from "sharp";

const BASE = process.env.BASE ?? "http://localhost:3030";
const OUT = path.resolve(import.meta.dirname, "../public/3d/posters");
const ONLY = process.argv[2];
const SHOTS = [
  // name, handle, width, height, offset, lift
  ["viewing-cumberland", "no-001-the-cumberland", 1600, 1280, 0, 0],
  ["viewing-cumberland-tall", "no-001-the-cumberland", 960, 1200, 0, 0],
  ["viewing-hero", "no-001-the-cumberland", 1920, 1080, 0.17, 0],
  ["viewing-hero-tall", "no-001-the-cumberland", 900, 1600, 0, 0.55],
];
const EDGE = process.env.CHROME_PATH || "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: true, args: ["--no-sandbox", "--hide-scrollbars", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"], protocolTimeout: 240000 });
for (const [name, handle, w, h, offset, lift] of SHOTS.filter((s) => !ONLY || s[0] === ONLY)) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  await page.goto(`${BASE}/__poster/viewing/${handle}?w=${w}&h=${h}&offset=${offset}&lift=${lift}`, { waitUntil: "networkidle2", timeout: 120000 });
  await page.waitForSelector('#poster[data-ready="1"]', { timeout: 120000 });
  // the poster route renders inside the site layout: take the header and footer out of the picture
  await page.addStyleTag({ content: "header, footer, .skip, .buy-bar { display: none !important; } main { padding: 0 !important; margin: 0 !important; }" });
  await new Promise((r) => setTimeout(r, 7000)); // the light comes up
  const el = await page.$("#poster");
  const png = await el.screenshot({ type: "png" });
  await sharp(png).webp({ quality: 86 }).toFile(path.join(OUT, `${name}.webp`));
  console.log("saved", name);
  await page.close();
}
await browser.close();

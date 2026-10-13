// Photographs the ring builder's drawing into public/3d/posters/ring-<setting>.webp on the paper ground.
// node scripts/ring-poster.mjs [setting]   (dev server on port 3030; WebGL on SwiftShader, so it waits)
import path from "node:path";
import puppeteer from "puppeteer-core";
import sharp from "sharp";

const BASE = process.env.BASE ?? "http://localhost:3030";
const OUT = path.resolve(import.meta.dirname, "../public/3d/posters");
const setting = process.argv[2] ?? "signal";
const EDGE = process.env.CHROME_PATH || "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: true, args: ["--no-sandbox", "--hide-scrollbars", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"], protocolTimeout: 240000 });
const page = await browser.newPage();
await page.setViewport({ width: 1400, height: 1200, deviceScaleFactor: 1 });
await page.goto(`${BASE}/__poster/ring/${setting}`, { waitUntil: "load", timeout: 120000 });
await page.waitForSelector('#poster[data-ready="1"]', { timeout: 180000 });
await page.addStyleTag({ content: "header, footer, .skip, .buy-bar { display: none !important; } main { padding: 0 !important; margin: 0 !important; }" });
await new Promise((r) => setTimeout(r, 6000));
const el = await page.$("#poster");
const png = await el.screenshot({ type: "png" });
await sharp(png).webp({ quality: 86 }).toFile(path.join(OUT, `ring-${setting}.webp`));
console.log("saved", `ring-${setting}.webp`);
await browser.close();

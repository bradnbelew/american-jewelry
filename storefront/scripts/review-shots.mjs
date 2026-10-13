// Full-page captures for review (not the council): node scripts/review-shots.mjs <outdir> <width> url1 url2 ...
// Prints whether the page overflows horizontally at that width. Images land outside the repo.
import path from "node:path";
import fs from "node:fs";
import puppeteer from "puppeteer-core";

const [outDir, widthArg, ...urls] = process.argv.slice(2);
const width = Number(widthArg);
const height = width < 500 ? 844 : width < 1000 ? 1024 : 900;
fs.mkdirSync(outDir, { recursive: true });
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: true, args: ["--no-sandbox", "--hide-scrollbars", "--disable-gpu"] });
for (const url of urls) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "load", timeout: 120000 });
  await new Promise((r) => setTimeout(r, 800));
  // force lazy images to load
  await page.evaluate(async () => {
    const h = document.documentElement.scrollHeight;
    for (let y = 0; y < h; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 1200));
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  const slug = new URL(url).pathname.replace(/\//g, "_").replace(/^_$/, "home").replace(/^_/, "") + (new URL(url).search ? "_q" : "");
  const file = path.join(outDir, `${slug}__${width}.png`);
  await page.screenshot({ path: file, fullPage: true });
  console.log(file, "overflow:", overflow);
  await page.close();
}
await browser.close();

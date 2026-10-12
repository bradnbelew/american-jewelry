// Screenshots for /house step 4: full page and first viewport at 390, 768 and 1440.
//   node scripts/council/shoot.mjs <url> <folder-under-docs/briefs/refs> [name]
// Lazy images are loaded by walking the page first; phone shots are 2x and cropped to the true fold.
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const [url, folder, name = "page"] = process.argv.slice(2);
if (!url || !folder) {
  console.log("usage: shoot.mjs <url> <folder> [name]");
  process.exit(1);
}
const out = path.resolve(import.meta.dirname, "../../../docs/briefs/refs", folder);
fs.mkdirSync(out, { recursive: true });
const EDGE = process.env.CHROME_PATH || "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: true, args: ["--no-sandbox", "--hide-scrollbars", "--disable-gpu"], protocolTimeout: 240000 });
for (const [w, h] of [[390, 844], [768, 1024], [1440, 900]]) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: w < 768 ? 2 : 1 });
  await page.goto(url, { waitUntil: "networkidle2", timeout: 90000 });
  await page.evaluate(() => document.fonts?.ready);
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight * 0.7) {
      scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    scrollTo(0, 0);
  });
  await page.evaluate(() => Promise.race([Promise.all([...document.images].map((i) => (i.complete ? null : new Promise((r) => { i.onload = i.onerror = r; })))), new Promise((r) => setTimeout(r, 8000))]));
  await new Promise((r) => setTimeout(r, 1200));
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  await page.screenshot({ path: path.join(out, `${name}-fold__${w}.png`) });
  await page.screenshot({ path: path.join(out, `${name}__${w}.png`), fullPage: true, captureBeyondViewport: true });
  console.log(`${w}: saved${overflow > 0 ? `  OVERFLOW ${overflow}px` : ""}`);
  await page.close();
}
await browser.close();

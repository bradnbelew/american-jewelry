// The council's measuring tape. Opens a page in headless Edge at 390, 768 and 1440 and extracts the
// numbers a design review argues about: type per role, measure, gaps, image ratios, what sits above the
// fold, contrast of every text color, boxes and radii, price and action position, alignment axes.
//
//   node scripts/council/measure.mjs measure <url> --kind home|pdp|line|page --slug <name> [--ref]
//   node scripts/council/measure.mjs refs                 (measures every entry in council/references.json)
//   node scripts/council/measure.mjs bands                (reference data -> council/data/bands.json)
//   node scripts/council/measure.mjs check <url> --kind pdp --slug <name>   (ours vs the bands -> a report)
//
// No model is involved. Nothing is clicked: consent banners are hidden in our copy of the page, never accepted.
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const ROOT = path.resolve(import.meta.dirname, "../../../docs/briefs/council");
const DATA = path.join(ROOT, "data");
const SHOTS = path.join(ROOT, "shots");
const REPORTS = path.join(ROOT, "reports");
const EDGE = process.env.CHROME_PATH || "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const WIDTHS = [
  [390, 844],
  [768, 1024],
  [1440, 900],
];

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : fallback;
}

// ---------------------------------------------------------------- in-page extraction
// Runs inside the page. Returns plain numbers only.
function extract() {
  const vw = innerWidth;
  const vh = innerHeight;
  const docH = document.documentElement.scrollHeight;

  const parse = (c) => {
    const m = c.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
    return { r: p[0], g: p[1], b: p[2], a: p[3] === undefined ? 1 : p[3] };
  };
  const lum = ({ r, g, b }) => {
    const f = (v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const ratio = (a, b) => {
    const x = lum(a);
    const y = lum(b);
    return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
  };
  const hex = ({ r, g, b }) => "#" + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
  const hsl = ({ r, g, b }) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const mx = Math.max(r, g, b);
    const mn = Math.min(r, g, b);
    const l = (mx + mn) / 2;
    const d = mx - mn;
    const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
    let h = 0;
    if (d) h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
    return { h: Math.round(((h * 60) + 360) % 360), s: +s.toFixed(2), l: +l.toFixed(2) };
  };
  const visible = (el) => {
    const cs = getComputedStyle(el);
    if (cs.visibility === "hidden" || cs.display === "none" || +cs.opacity === 0) return false;
    const r = el.getBoundingClientRect();
    return r.width > 1 && r.height > 1;
  };
  const absTop = (r) => r.top + scrollY;
  // Site chrome only: a header that starts at the top of the page. Product and article headers are content.
  const isChrome = (h) => { if (!h) return false; const r = h.getBoundingClientRect(); return r.top + scrollY < 60 && r.height < 260; };
  // Effective background: the first ancestor with a solid color; null when a picture sits behind.
  const bgOf = (el) => {
    for (let n = el; n && n.nodeType === 1; n = n.parentElement) {
      const cs = getComputedStyle(n);
      if (cs.backgroundImage && cs.backgroundImage !== "none" && !cs.backgroundImage.startsWith("linear-gradient(rgba(0, 0, 0, 0)")) return null;
      if (["IMG", "VIDEO", "CANVAS", "PICTURE"].includes(n.tagName)) return null;
      const c = parse(cs.backgroundColor);
      if (c && c.a > 0.85) return c;
    }
    return { r: 255, g: 255, b: 255, a: 1 };
  };
  const pct = (arr, p) => {
    if (!arr.length) return null;
    const s = [...arr].sort((a, b) => a - b);
    return +s[Math.min(s.length - 1, Math.floor((p / 100) * s.length))].toFixed(1);
  };

  // ---- text blocks: one per element that owns visible text
  const blocks = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const seen = new Set();
  while (walker.nextNode()) {
    const t = walker.currentNode;
    if (!t.textContent.trim()) continue;
    const el = t.parentElement;
    if (!el || seen.has(el) || ["SCRIPT", "STYLE", "NOSCRIPT", "SVG", "TITLE"].includes(el.tagName)) continue;
    seen.add(el);
    if (!visible(el)) continue;
    const own = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join(" ").replace(/\s+/g, " ").trim();
    if (!own) continue;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    const fs = parseFloat(cs.fontSize);
    if (fs < 6) continue; // screen-reader-only text set at size 0
    const lhRaw = parseFloat(cs.lineHeight);
    const lh = Number.isFinite(lhRaw) ? lhRaw : fs * 1.2;
    const lines = Math.max(1, Math.round(r.height / lh));
    const color = parse(cs.color);
    const bg = bgOf(el);
    const caps = cs.textTransform === "uppercase" || (own.length > 3 && own === own.toUpperCase() && /[A-Z]/.test(own));
    blocks.push({
      tag: el.tagName.toLowerCase(),
      text: own.slice(0, 80),
      full: own,
      chars: own.length,
      words: own.split(/\s+/).length,
      family: cs.fontFamily.split(",")[0].replace(/["']/g, "").trim(),
      size: +fs.toFixed(1),
      weight: +cs.fontWeight,
      italic: cs.fontStyle === "italic",
      lh: +(lh / fs).toFixed(2),
      track: cs.letterSpacing === "normal" ? 0 : +(parseFloat(cs.letterSpacing) / fs).toFixed(3),
      caps,
      lines,
      cpl: lines > 1 ? Math.round(own.length / lines) : null,
      top: Math.round(absTop(r)),
      bottom: Math.round(absTop(r) + r.height),
      left: Math.round(r.left),
      width: Math.round(r.width),
      inHeader: isChrome(el.closest("header, [role=banner]")),
      inFooter: !!el.closest("footer, [role=contentinfo]"),
      color: color ? hex(color) : null,
      contrast: color && bg ? +ratio(color, bg).toFixed(2) : null,
      onPhoto: !bg,
    });
  }
  const body = blocks.filter((b) => !b.inHeader && !b.inFooter);

  // ---- images (pictures, video, canvas, large background images)
  const images = [];
  for (const el of document.querySelectorAll("img, video, canvas, iframe, [style*='background-image']")) {
    if (!visible(el)) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 120 || r.height < 120) continue;
    images.push({ tag: el.tagName.toLowerCase(), w: Math.round(r.width), h: Math.round(r.height), ratio: +(r.width / r.height).toFixed(2), top: Math.round(absTop(r)), left: Math.round(r.left), fullBleed: r.width >= vw - 2 });
  }

  // ---- controls
  const controls = [];
  for (const el of document.querySelectorAll("button, [role=button], input[type=submit], a, select, input[type=text], input[type=email], textarea")) {
    if (!visible(el) || el.closest("footer")) continue;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    const boxed = parseFloat(cs.borderTopWidth) > 0 || (parse(cs.backgroundColor)?.a ?? 0) > 0.5;
    if (el.tagName === "A" && !boxed) continue;
    if (r.height < 20 || r.height > 120 || r.width < 30) continue;
    controls.push({ tag: el.tagName.toLowerCase(), text: (el.innerText || el.value || el.getAttribute("aria-label") || "").trim().slice(0, 40), h: Math.round(r.height), w: Math.round(r.width), radius: parseFloat(cs.borderTopLeftRadius) || 0, caps: cs.textTransform === "uppercase", top: Math.round(absTop(r)) });
  }

  // ---- surfaces: boxes, radii, shadows
  let boxed = 0, rounded = 0, shadowed = 0, pills = 0;
  for (const el of document.body.querySelectorAll("*")) {
    const cs = getComputedStyle(el);
    if (cs.display === "none") continue;
    const r = el.getBoundingClientRect();
    if (r.width < 40 || r.height < 40) continue;
    const bw = ["Top", "Right", "Bottom", "Left"].filter((s) => parseFloat(cs[`border${s}Width`]) > 0 && (parse(cs[`border${s}Color`])?.a ?? 0) > 0.1).length;
    const isControl = ["BUTTON", "INPUT", "SELECT", "TEXTAREA", "A", "LABEL"].includes(el.tagName);
    if (bw === 4 && !isControl && r.height > 80) boxed++;
    const rad = parseFloat(cs.borderTopLeftRadius) || 0;
    if (rad > 2) rounded++;
    if (rad >= r.height / 2 - 1 && rad > 8) pills++;
    // A zero-blur inset hairline is a border drawn without reflow (the selected tile), not a shadow.
    if (cs.boxShadow && cs.boxShadow !== "none" && !/^(rgba?\([^)]*\)\s+)?0px 0px 0px [0-2]px inset$|^0px 0px 0px [0-2]px (rgba?\([^)]*\)\s*)?inset$/.test(cs.boxShadow.trim())) shadowed++;
  }

  // ---- color: area-weighted backgrounds, distinct text colors
  const bgArea = {};
  for (const el of document.body.querySelectorAll("*")) {
    const cs = getComputedStyle(el);
    const c = parse(cs.backgroundColor);
    if (!c || c.a < 0.85) continue;
    const r = el.getBoundingClientRect();
    const a = Math.max(0, r.width) * Math.max(0, r.height);
    if (a < 2000) continue;
    const k = hex(c);
    bgArea[k] = (bgArea[k] || 0) + a;
  }
  const bodyBg = parse(getComputedStyle(document.body).backgroundColor);
  const htmlBg = parse(getComputedStyle(document.documentElement).backgroundColor);
  const ground = (bodyBg && bodyBg.a > 0.5 ? bodyBg : htmlBg && htmlBg.a > 0.5 ? htmlBg : { r: 255, g: 255, b: 255 });
  const totalBg = Object.values(bgArea).reduce((a, b) => a + b, 0) || 1;
  const bgs = Object.entries(bgArea).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([k, v]) => {
    const n = parseInt(k.slice(1), 16);
    return { hex: k, share: +(v / totalBg).toFixed(2), ...hsl({ r: n >> 16, g: (n >> 8) & 255, b: n & 255 }) };
  });
  const textColors = {};
  for (const b of body) if (b.color) textColors[b.color] = (textColors[b.color] || 0) + b.chars;
  const chromatic = Object.keys(textColors).filter((k) => {
    const n = parseInt(k.slice(1), 16);
    const x = hsl({ r: n >> 16, g: (n >> 8) & 255, b: n & 255 });
    return x.s > 0.25 && x.l > 0.12 && x.l < 0.88;
  });

  // ---- type system
  const charsBy = (key) => {
    const m = {};
    for (const b of body) m[b[key]] = (m[b[key]] || 0) + b.chars;
    const tot = Object.values(m).reduce((a, c) => a + c, 0) || 1;
    return Object.entries(m).sort((a, c) => c[1] - a[1]).map(([k, v]) => ({ v: isNaN(+k) ? k : +k, share: +(v / tot).toFixed(3) }));
  };
  const sizes = charsBy("size");
  const families = charsBy("family");
  const prose = body.filter((b) => b.words >= 12 && b.lines >= 2);
  const bodySize = prose.length ? pct(prose.map((b) => b.size), 50) : null;
  const h1 = blocks.find((b) => b.tag === "h1");
  const fold = blocks.filter((b) => b.top < vh && b.bottom > 0);
  const foldBody = fold.filter((b) => !b.inHeader);
  const capsBody = body.filter((b) => b.caps);

  // ---- spacing: vertical gaps between successive blocks (text + images), header/footer excluded
  const runs = [...body.map((b) => ({ top: b.top, bottom: b.bottom })), ...images.map((i) => ({ top: i.top, bottom: i.top + i.h }))].sort((a, b) => a.top - b.top);
  const gaps = [];
  let edge = runs.length ? runs[0].bottom : 0;
  for (const r of runs.slice(1)) {
    if (r.top > edge + 1) gaps.push(r.top - edge);
    edge = Math.max(edge, r.bottom);
  }
  const lefts = new Set(body.filter((b) => b.width > 80).map((b) => Math.round(b.left / 8) * 8));

  // ---- commerce markers
  const priceRe = /^(from\s+)?(US)?[$€£]\s?\d[\d,.]*|price on request|price upon request|price on demand/i;
  const prices = blocks.filter((b) => priceRe.test(b.text) && !b.inHeader && !b.inFooter).sort((a, b) => a.top - b.top);
  const price = prices[0] || null;
  const ctaRe = /add to (bag|cart|basket)|add to shopping|buy now|purchase|place order|request (this|a)|book an appointment|contact an advisor|enquir|inquir|request a viewing|find a retailer|contact (a|the|your) (retailer|boutique|advisor)/i;
  const ctas = controls.filter((c) => ctaRe.test(c.text)).sort((a, b) => a.top - b.top);
  const cta = ctas[0] || null;
  const navLinks = [...document.querySelectorAll("header a, header button, [role=banner] a, nav a")].filter((a) => {
    if (!visible(a)) return false;
    const r = a.getBoundingClientRect();
    return r.top < 200 && (a.innerText || "").trim().length > 0;
  }).length;

  // ---- words: totals and sentence length over prose (header and footer excluded)
  const proseText = body.map((b) => b.full).join(" ");
  const sentences = proseText.split(/(?<=[.?!])\s+/).map((x) => x.trim()).filter((x) => x.split(/\s+/).length >= 3);
  const sLens = sentences.map((x) => x.split(/\s+/).length);

  return {
    text: {
      words: body.reduce((a, b) => a + b.words, 0),
      sentences: sentences.length,
      sentenceP50: pct(sLens, 50),
      sentenceP90: pct(sLens, 90),
      exclamations: (proseText.match(/!/g) || []).length,
      emDashes: (proseText.match(/—/g) || []).length,
    },
    vw,
    vh,
    pageViewports: +(docH / vh).toFixed(1),
    type: {
      families: families.slice(0, 5),
      familyCount: families.filter((f) => f.share > 0.02).length,
      sizesUsed: sizes.filter((s) => s.share > 0.01).length,
      sizes: sizes.slice(0, 10),
      displayMax: fold.length ? Math.max(...fold.map((b) => b.size)) : null,
      h1: h1 ? { size: h1.size, chars: h1.chars, lines: h1.lines, family: h1.family, weight: h1.weight, track: h1.track } : null,
      bodySize,
      bodyLeading: prose.length ? pct(prose.map((b) => b.lh), 50) : null,
      measureCpl: { p50: pct(prose.map((b) => b.cpl), 50), p90: pct(prose.map((b) => b.cpl), 90), max: prose.length ? Math.max(...prose.map((b) => b.cpl)) : null },
      smallest: body.length ? Math.min(...body.map((b) => b.size)) : null,
      capsBlocks: capsBody.length,
      capsShareOfBlocks: body.length ? +(capsBody.length / body.length).toFixed(2) : 0,
      capsSizes: [...new Set(capsBody.map((b) => b.size))].sort((a, b) => a - b).slice(0, 6),
      capsTrackP50: pct(capsBody.map((b) => b.track), 50),
      italicShare: +(body.filter((b) => b.italic).reduce((a, b) => a + b.chars, 0) / (body.reduce((a, b) => a + b.chars, 0) || 1)).toFixed(3),
    },
    fold: {
      words: foldBody.reduce((a, b) => a + b.words, 0),
      textBlocks: foldBody.length,
      images: images.filter((i) => i.top < vh).length,
      controls: controls.filter((c) => c.top < vh).length,
      elements: foldBody.length + images.filter((i) => i.top < vh).length + controls.filter((c) => c.top < vh && c.top > 120).length,
      imageShare: +Math.min(1, images.filter((i) => i.top < vh).reduce((a, i) => a + i.w * Math.max(0, Math.min(i.h, vh - i.top)), 0) / (vw * vh)).toFixed(2),
    },
    spacing: {
      gapP50: pct(gaps, 50),
      gapP90: pct(gaps, 90),
      gapMax: gaps.length ? Math.max(...gaps) : null,
      sectionGapVh: gaps.length ? +(pct(gaps, 90) / vh).toFixed(2) : null,
      distinctGaps: new Set(gaps.map((g) => Math.round(g / 4) * 4)).size,
      alignmentAxes: lefts.size,
    },
    images: {
      count: images.length,
      fullBleed: images.filter((i) => i.fullBleed).length,
      ratios: images.slice(0, 12).map((i) => i.ratio),
      firstAbove: images[0] ? { ratio: images[0].ratio, w: images[0].w, h: images[0].h, top: images[0].top } : null,
    },
    surfaces: { boxed, rounded, pills, shadowed },
    color: {
      ground: hex(ground),
      groundHsl: hsl(ground),
      backgrounds: bgs,
      textColors: Object.keys(textColors).length,
      chromaticText: chromatic,
      lowContrast: body.filter((b) => b.contrast !== null && b.contrast < (b.size >= 24 || (b.size >= 18.66 && b.weight >= 700) ? 3 : 4.5)).map((b) => ({ text: b.text.slice(0, 40), size: b.size, color: b.color, ratio: b.contrast })).slice(0, 8),
      textOnPhoto: body.filter((b) => b.onPhoto).length,
    },
    controls: {
      count: controls.length,
      heights: [...new Set(controls.map((c) => c.h))].sort((a, b) => a - b).slice(0, 8),
      radiusMax: controls.length ? Math.max(...controls.map((c) => c.radius)) : 0,
      capsShare: controls.length ? +(controls.filter((c) => c.caps).length / controls.length).toFixed(2) : 0,
      under44: controls.filter((c) => c.h < 44 && c.tag !== "a").length,
    },
    commerce: {
      price: price ? { text: price.text, size: price.size, top: price.top, aboveFold: price.bottom <= vh } : null,
      cta: cta ? { text: cta.text, h: cta.h, top: cta.top, aboveFold: cta.top + cta.h <= vh, radius: cta.radius } : null,
      priceToCta: price && cta ? cta.top - price.bottom : null,
    },
    nav: { visibleLinks: navLinks },
  };
}

// ---------------------------------------------------------------- browser
async function measureUrl(url, { kind, slug, ref }) {
  const browser = await puppeteer.launch({ executablePath: EDGE, headless: true, args: ["--no-sandbox", "--hide-scrollbars", "--disable-gpu"] });
  const out = { url, kind, slug, ref: !!ref, measuredAt: new Date().toISOString(), widths: {} };
  fs.mkdirSync(SHOTS, { recursive: true });
  try {
    for (const [w, h] of WIDTHS) {
      const ctx = await browser.createBrowserContext();
      const page = await ctx.newPage();
      await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
      // MEASURE_REDUCED=1 measures the first paint of a page whose 3D starts in the first viewport:
      // the viewing honours reduced motion and stays on its poster.
      if (process.env.MEASURE_REDUCED) await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
      let status = null;
      try {
        const res = await page.goto(url, { waitUntil: "networkidle2", timeout: Number(process.env.MEASURE_TIMEOUT ?? 60000) });
        status = res?.status() ?? null;
      } catch (e) {
        out.widths[w] = { error: String(e.message).slice(0, 120) };
        await ctx.close();
        continue;
      }
      await new Promise((r) => setTimeout(r, 2000));
      // Hide consent and newsletter overlays in our copy (never click them).
      await page.evaluate(() => {
        const hide = (el) => el.style.setProperty("display", "none", "important");
        for (const el of document.querySelectorAll("body *")) {
          const cs = getComputedStyle(el);
          const fixed = cs.position === "fixed" || cs.position === "sticky";
          if (fixed && /cookie|consent|privacy|newsletter|sign up for|subscribe|accept|change location|select your country|ship to/i.test(el.innerText || "") && !el.closest("header")) hide(el);
          if (/onetrust|cookie|consent|didomi|truste|klaviyo|newsletter-popup|geo-?ip|locale-?modal/i.test(el.id + " " + (typeof el.className === "string" ? el.className : ""))) hide(el);
          if (el.matches("dialog[open], [aria-modal=true], [role=dialog]") && !el.closest("header")) hide(el);
          // A fixed layer over a fifth of the screen that is not the header strip: a modal, drawer or scrim.
          if (cs.position === "fixed") {
            const r = el.getBoundingClientRect();
            if (r.width * r.height > innerWidth * innerHeight * 0.2 && !(r.top <= 0 && r.height < 160)) hide(el);
          }
        }
        document.documentElement.style.overflow = "auto";
        document.body.style.overflow = "auto";
      });
      // Walk the page once so lazy images load, then return to the top.
      await page.evaluate(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight && y < 20000; y += innerHeight * 0.8) {
          scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 150));
        }
        scrollTo(0, 0);
      });
      await new Promise((r) => setTimeout(r, 1200));
      const title = await page.title();
      const blocked = status >= 400 || /access denied|forbidden|just a moment|attention required|are you a robot|captcha|blocked/i.test(title);
      if (blocked) {
        out.widths[w] = { error: `blocked (${status}) ${title.slice(0, 60)}` };
      } else {
        out.widths[w] = await page.evaluate(extract);
        out.widths[w].status = status;
        await page.screenshot({ path: path.join(SHOTS, `${slug}__${w}.png`) });
      }
      await ctx.close();
    }
  } finally {
    await browser.close();
  }
  fs.mkdirSync(DATA, { recursive: true });
  const file = path.join(DATA, `${ref ? "ref" : "ours"}-${slug}.json`);
  const allBlocked = Object.values(out.widths).every((d) => d.error);
  // Keep a hand measurement from the browser pane rather than overwrite it with a refusal.
  const kept = allBlocked && fs.existsSync(file) && JSON.parse(fs.readFileSync(file, "utf8")).via;
  if (!kept) fs.writeFileSync(file, JSON.stringify(out, null, 1));
  const ok = Object.entries(out.widths).map(([w, d]) => `${w}:${d.error ? "x " + d.error : "ok"}`).join("  ");
  console.log(`${slug.padEnd(28)} ${ok}`);
  return out;
}

// ---------------------------------------------------------------- bands
// The metrics the bands are built on: key path -> label. Kept short on purpose.
const METRICS = {
  "type.h1.size": "H1 size (px)",
  "type.displayMax": "Largest type in the first viewport (px)",
  "type.bodySize": "Body size, median of prose (px)",
  "type.bodyLeading": "Body leading (x size)",
  "type.measureCpl.p50": "Measure, median characters per line",
  "type.measureCpl.max": "Measure, longest line (chars)",
  "type.familyCount": "Typefaces in use",
  "type.sizesUsed": "Distinct type sizes",
  "type.smallest": "Smallest type (px)",
  "type.capsShareOfBlocks": "Share of text blocks in caps",
  "type.capsTrackP50": "Caps tracking (em)",
  "fold.words": "Words in the first viewport",
  "fold.elements": "Elements in the first viewport",
  "fold.imageShare": "Image share of the first viewport",
  "spacing.gapP50": "Typical gap between blocks (px)",
  "spacing.sectionGapVh": "Section gap (share of viewport height)",
  "spacing.alignmentAxes": "Distinct left edges (alignment axes)",
  "images.count": "Large images on the page",
  "surfaces.boxed": "Boxed containers (4-side borders)",
  "surfaces.rounded": "Rounded elements",
  "surfaces.shadowed": "Elements with shadows",
  "color.textColors": "Distinct text colors",
  "controls.radiusMax": "Largest control radius (px)",
  "controls.under44": "Controls under 44px tall",
  "nav.visibleLinks": "Visible header links",
  "text.words": "Words on the page (body)",
  "text.sentenceP50": "Sentence length, median words",
  "pageViewports": "Page length (viewports)",
};
const get = (o, p) => p.split(".").reduce((a, k) => (a == null ? a : a[k]), o);
const q = (arr, p) => {
  const s = [...arr].sort((a, b) => a - b);
  const i = (s.length - 1) * p;
  const lo = Math.floor(i);
  const hi = Math.ceil(i);
  return +(s[lo] + (s[hi] - s[lo]) * (i - lo)).toFixed(2);
};

function bands() {
  const files = fs.readdirSync(DATA).filter((f) => f.startsWith("ref-") && f.endsWith(".json"));
  const refs = files.map((f) => JSON.parse(fs.readFileSync(path.join(DATA, f), "utf8")));
  const out = { builtAt: new Date().toISOString(), sources: refs.map((r) => ({ slug: r.slug, url: r.url, kind: r.kind, ok: Object.values(r.widths).filter((d) => !d.error).length })), bands: {} };
  for (const kind of ["all", "home", "pdp"]) {
    out.bands[kind] = {};
    for (const [w] of WIDTHS) {
      out.bands[kind][w] = {};
      for (const key of Object.keys(METRICS)) {
        const vals = refs.filter((r) => kind === "all" || r.kind === kind).map((r) => get(r.widths[w], key)).filter((v) => typeof v === "number" && Number.isFinite(v));
        if (vals.length < 3) continue;
        out.bands[kind][w][key] = { n: vals.length, min: Math.min(...vals), p25: q(vals, 0.25), median: q(vals, 0.5), p75: q(vals, 0.75), max: Math.max(...vals) };
      }
    }
  }
  // Commerce booleans for product pages
  out.pdpAboveFold = {};
  for (const [w] of WIDTHS) {
    const pdps = refs.filter((r) => r.kind === "pdp" && r.widths[w] && !r.widths[w].error);
    out.pdpAboveFold[w] = { n: pdps.length, price: pdps.filter((r) => r.widths[w].commerce.price?.aboveFold).length, cta: pdps.filter((r) => r.widths[w].commerce.cta?.aboveFold).length };
  }
  fs.writeFileSync(path.join(DATA, "bands.json"), JSON.stringify(out, null, 1));
  // A readable table: middle half and median per width, for every page and for product pages.
  const md = [`# What the houses measure`, ``, `Built ${out.builtAt.slice(0, 10)} from ${out.sources.filter((x) => x.ok).length} reference pages that loaded (${out.sources.filter((x) => !x.ok).map((x) => x.slug).join(", ") || "none"} refused). Each cell: median, then the middle half (p25 to p75); n is the number of pages with a value.`, ``];
  for (const kind of ["all", "pdp"]) {
    md.push(`## ${kind === "all" ? "Every reference page" : "Product pages only"}`, ``, `| Measure | 390 | 768 | 1440 |`, `|---|---|---|---|`);
    for (const [key, label] of Object.entries(METRICS)) {
      const cells = WIDTHS.map(([w]) => { const b = out.bands[kind][w][key]; return b ? `${b.median} (${b.p25} to ${b.p75}), n ${b.n}` : "n/a"; });
      if (cells.every((c) => c === "n/a")) continue;
      md.push(`| ${label} | ${cells.join(" | ")} |`);
    }
    md.push(``);
  }
  md.push(`Product pages with price / action in the first viewport: ${WIDTHS.map(([w]) => `${w}: ${out.pdpAboveFold[w].price}/${out.pdpAboveFold[w].n} price, ${out.pdpAboveFold[w].cta}/${out.pdpAboveFold[w].n} action`).join("; ")}.`);
  fs.writeFileSync(path.join(DATA, "bands-summary.md"), md.join(String.fromCharCode(10)) + String.fromCharCode(10));
  console.log(`bands from ${refs.length} reference pages -> data/bands.json, data/bands-summary.md`);
  return out;
}

// ---------------------------------------------------------------- check
// The house's fixed numbers (canon + DESIGN.md + research/16): these win over the bands.
const HOUSE = [
  { key: "type.familyCount", test: (v) => v <= 3, rule: "At most three faces (canon: two serifs and one sans)" },
  { key: "type.smallest", test: (v) => v >= 11, rule: "Nothing below 11px" },
  { key: "type.measureCpl.max", test: (v) => v <= 80, rule: "No prose line over 80 characters (DESIGN.md measure 62ch)" },
  { key: "surfaces.shadowed", test: (v) => v === 0, rule: "No shadows" },
  { key: "surfaces.boxed", test: (v) => v <= 2, rule: "No bordered-card grammar" },
  { key: "surfaces.pills", test: (v) => v === 0, rule: "No pills" },
  { key: "controls.radiusMax", test: (v) => v <= 2, rule: "No radius on controls" },
  { key: "controls.under44", test: (v) => v === 0, rule: "Controls at least 44px (WCAG 2.5.5 enhanced; house .btn 48)" },
  { key: "color.lowContrast", test: (v) => !v || v.length === 0, rule: "Every text color passes AA on its ground", fmt: (v) => (v || []).map((x) => `${x.text} ${x.ratio}:1`).join("; ") || "0" },
  { key: "text.exclamations", test: (v) => v === 0, rule: "No exclamation points (canon voice 9)" },
  { key: "text.emDashes", test: (v) => v === 0, rule: "No em dashes (canon voice 9)" },
  { key: "color.chromaticText", test: (v) => !v || v.length <= 1, rule: "One accent at most in text", fmt: (v) => (v || []).join(", ") || "none" },
];

function verdictFor(v, band) {
  if (!band || typeof v !== "number") return "";
  if (v < band.min || v > band.max) return "outside";
  if (v < band.p25 || v > band.p75) return "edge";
  return "inside";
}

async function check(url, { kind, slug }) {
  const ours = await measureUrl(url, { kind, slug, ref: false });
  const b = fs.existsSync(path.join(DATA, "bands.json")) ? JSON.parse(fs.readFileSync(path.join(DATA, "bands.json"), "utf8")) : bands();
  const set = b.bands[kind] && Object.keys(b.bands[kind][1440] || {}).length ? b.bands[kind] : b.bands.all;
  const lines = [];
  lines.push(`# Measured: ${slug}`, "", `${url}  `, `Measured ${ours.measuredAt.slice(0, 16)} against ${b.sources.filter((s) => s.ok).length} reference pages (${kind in b.bands ? kind : "all"} band). Bands are the reference range: min, middle half (p25 to p75), max. "Edge" means inside the range but outside the middle half; "outside" means beyond every reference.`, "");
  // Fixed house rules first
  lines.push("## House rules (fixed numbers; a failure here is a Blocker)", "", "| Rule | 390 | 768 | 1440 |", "|---|---|---|---|");
  for (const h of HOUSE) {
    const cells = WIDTHS.map(([w]) => {
      const d = ours.widths[w];
      if (!d || d.error) return "n/a";
      const v = get(d, h.key);
      const shown = h.fmt ? h.fmt(v) : v;
      return `${h.test(v) ? "pass" : "**FAIL**"} (${shown})`;
    });
    lines.push(`| ${h.rule} | ${cells.join(" | ")} |`);
  }
  if (kind === "pdp") {
    const cells = WIDTHS.map(([w]) => {
      const c = ours.widths[w]?.commerce;
      if (!c) return "n/a";
      const ok = c.price?.aboveFold && c.cta?.aboveFold;
      return `${ok ? "pass" : "**FAIL**"} (price ${c.price ? (c.price.aboveFold ? "in" : "below") : "none"}, action ${c.cta ? (c.cta.aboveFold ? "in" : "below") : "none"})`;
    });
    lines.push(`| Price and action in the first viewport (rework brief §3 C) | ${cells.join(" | ")} |`);
  }
  lines.push("", "## Against the houses (the bands; outside is a Should, edge is a note)", "", "| Measure | Width | Ours | Houses min | Middle half | Max | Read |", "|---|---|---|---|---|---|---|");
  for (const [key, label] of Object.entries(METRICS)) {
    for (const [w] of WIDTHS) {
      const v = get(ours.widths[w], key);
      const band = set[w]?.[key];
      if (typeof v !== "number" || !band) continue;
      const read = verdictFor(v, band);
      lines.push(`| ${label} | ${w} | ${v} | ${band.min} | ${band.p25} to ${band.p75} | ${band.max} | ${read === "outside" ? "**outside**" : read} |`);
    }
  }
  const d = ours.widths[1440] && !ours.widths[1440].error ? ours.widths[1440] : null;
  if (d) {
    lines.push("", "## Facts for the reviewer (1440)", "");
    lines.push(`- Typefaces by share of characters: ${d.type.families.map((f) => `${f.v} ${Math.round(f.share * 100)}%`).join(", ")}.`);
    lines.push(`- Type sizes by share: ${d.type.sizes.map((s) => `${s.v}px ${Math.round(s.share * 100)}%`).join(", ")}.`);
    lines.push(`- Ground ${d.color.ground} (hue ${d.color.groundHsl.h}, saturation ${d.color.groundHsl.s}, lightness ${d.color.groundHsl.l}); largest backgrounds ${d.color.backgrounds.map((x) => `${x.hex} ${Math.round(x.share * 100)}%`).join(", ")}.`);
    lines.push(`- Control heights: ${d.controls.heights.join(", ")}px; caps on ${Math.round(d.controls.capsShare * 100)}% of controls.`);
    lines.push(`- Image ratios, first twelve: ${d.images.ratios.join(", ")}.`);
    if (d.commerce.price) lines.push(`- Price "${d.commerce.price.text}" at ${d.commerce.price.size}px, top ${d.commerce.price.top}px.`);
    if (d.commerce.cta) lines.push(`- Action "${d.commerce.cta.text}" ${d.commerce.cta.h}px tall, top ${d.commerce.cta.top}px.`);
    lines.push(`- Text blocks on photographs: ${d.color.textOnPhoto}.`);
  }
  lines.push("", `Screenshots: docs/briefs/council/shots/${slug}__390.png, __768.png, __1440.png (first viewport).`);
  fs.mkdirSync(REPORTS, { recursive: true });
  const file = path.join(REPORTS, `${slug}.md`);
  fs.writeFileSync(file, lines.join("\n") + "\n");
  console.log(`report -> ${path.relative(process.cwd(), file)}`);
}

// ---------------------------------------------------------------- main
const [cmd, url] = process.argv.slice(2);
if (cmd === "measure") await measureUrl(url, { kind: arg("kind", "page"), slug: arg("slug", new URL(url).hostname), ref: process.argv.includes("--ref") });
else if (cmd === "refs") {
  const list = JSON.parse(fs.readFileSync(path.join(ROOT, "references.json"), "utf8"));
  const only = arg("only");
  for (const r of list) if (!only || r.slug.includes(only)) await measureUrl(r.url, { kind: r.kind, slug: r.slug, ref: true });
  bands();
} else if (cmd === "bands") bands();
else if (cmd === "check") await check(url, { kind: arg("kind", "page"), slug: arg("slug", "page") });
else console.log("usage: measure <url> --kind --slug [--ref] | refs [--only x] | bands | check <url> --kind --slug");

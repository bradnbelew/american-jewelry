#!/usr/bin/env node
/**
 * house-lint: the lexicon, claims and AI-tell lint for American Jewelry copy in code.
 *
 * Scans string literals, template strings and JSX text in storefront/app (ts, tsx) for words and
 * characters the house never ships. Rules come from docs/briefs/00-house-canon.md and
 * research/04 (claims), research/10 (AI tells). Research and briefs are not scanned: they quote
 * the banned words on purpose.
 *
 *   node scripts/house-lint.mjs            exit 1 on any error
 *   node scripts/house-lint.mjs --warn     report, exit 0
 *   node scripts/house-lint.mjs --json     machine output
 *   node scripts/house-lint.mjs app/routes/piece.tsx ...   lint specific files
 *
 * Silence one line on purpose with a trailing or preceding comment:  // house-lint: allow
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const appRoot = resolve(here, "..", "app");
const argv = process.argv.slice(2);
const warnOnly = argv.includes("--warn");
const asJson = argv.includes("--json");
const targets = argv.filter((a) => !a.startsWith("--"));

/** @type {{id:string, level:"error"|"warn", re:RegExp, msg:string, whole?:boolean}[]} */
const RULES = [
  // Characters (checked on the whole line, after comment stripping): these never belong in code or copy.
  { id: "em-dash", level: "error", whole: true, re: /—/, msg: "em dash: use a period, comma or colon" },
  { id: "middle-dot", level: "error", whole: true, re: /·/, msg: "middle-dot meta string (AI tell): separate with spacing or a period" },
  { id: "arrow", level: "error", whole: true, re: /→/, msg: "arrow on a link or button (AI tell): the words are enough" },

  // Punctuation and grammar in copy.
  // "!" followed by a letter, "[" or "-" is Tailwind's important modifier (`!w-auto`), not punctuation.
  { id: "exclamation", level: "error", re: /(?<![!=])!(?=\s|$|["'.,;:)\]}])/, msg: "exclamation point: the house does not raise its voice" },
  { id: "price-cents", level: "warn", re: /\$\s?\d{1,3}(,\d{3})*\.\d{2}\b/, msg: "price with cents: prices are round and whole" },

  // Stone words (canon: Hard rules).
  { id: "lab-grown", level: "error", re: /\blab[-\s]?grown\b/i, msg: 'say "man-made diamond" (and "(laboratory-grown)" on spec lines), never "lab-grown"' },
  { id: "real-genuine", level: "error", re: /\b(real|genuine)\s+(diamond|stone)s?\b/i, msg: 'never "real" or "genuine" as a contrast with man-made' },
  { id: "gia-certified", level: "error", re: /\bgia[-\s]?certified\b/i, msg: 'GIA grades and reports; it does not certify. Say "GIA report"' },
  { id: "flawless", level: "warn", re: /\bflawless\b/i, msg: 'only for an FL/IF grade on a report; never for VVS' },

  // Origin and making claims (research/04 Part 1 and 2).
  { id: "made-in", level: "error", re: /\bmade in (america|the usa|usa|u\.s\.a?\.?|the united states|tennessee)\b|\bamerican[-\s]made\b|\btennessee[-\s]made\b/i, msg: "unqualified origin claim: see research/04 §2 for the permitted sentence" },
  { id: "handmade", level: "error", re: /\bhand[-\s]?(made|crafted|wrought|fabricated)\b/i, msg: 'CAD-modeled cast pieces are not "handmade" (FTC Guides §23.2). Use "hand-set", "hand-finished" where true' },
  { id: "first-house", level: "error", re: /\bfirst american (house|jeweler)\b/i, msg: "Tiffany's line; we are not the first" },

  // Counting the lines (canon: Names).
  { id: "count-tiers", level: "error", re: /\b(three|3|two|2)\s+(tiers?|doors|collections|houses)\b/i, msg: "never count the lines in public; use the names" },
  { id: "count-lines", level: "warn", re: /\b(three|3)\s+lines\b/i, msg: '"three lines" counts the lines if it means Royal American / Americana / New American; fine if it means rows' },
  { id: "tier-numeral", level: "error", re: /\btier\s+(i{1,3}|[123])\b/i, msg: "no Tier I/II/III labels; names only" },

  // Lexicon bans (canon: Voice 8).
  { id: "lexicon", level: "error", re: /\b(stunning|exquisite|elevates?|elevated|elevating|curated|timeless|maison|atelier|bespoke|savoir[-\s]faire)\b/i, msg: "banned word (canon Voice 8)" },

  // Store grammar (canon: Never do; research/11 §8).
  { id: "shop-now", level: "error", re: /\b(shop now|buy now|explore now|discover more)\b/i, msg: 'CTAs name the thing ("Build on Signal"), never "Shop now"' },
  { id: "promo", level: "error", re: /\b(\d+\s?%\s?off|percent off|sale price|regular price|compare at|limited time|hurry|don'?t miss|last chance|flash sale|clearance|coupon|promo code)\b/i, msg: "promotion grammar: the house does not discount" },
  { id: "financing", level: "warn", re: /\b(financing|0% apr|affirm|afterpay|klarna|pay in 4|installments?)\b/i, msg: "financing is not shown on the site except where the family approved it" },
  { id: "free", level: "warn", re: /\bfree\b/i, msg: '"free" only in the policy text (shipping, cleaning); never as a banner or a benefit line' },

  // Self-praise and filler (warn: sometimes legitimate in a journal entry).
  { id: "self-praise", level: "warn", re: /\b(luxury|luxurious|premium|exclusive|world[-\s]class|unparalleled|finest|perfect(ly)?|breathtaking|masterpiece|iconic|artisanal)\b/i, msg: "self-praise: let the object and the number say it" },
];

const IGNORE_DIRS = new Set(["node_modules", "dist", ".react-router", "graphql"]);

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    if (IGNORE_DIRS.has(name)) continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) yield* walk(p);
    else if (/\.(tsx?|jsx?|mdx?)$/.test(name) && !/\.d\.ts$/.test(name) && !/generated/i.test(name)) yield p;
  }
}

function stripComments(line) {
  // Keep it simple: drop // comments that are not inside a URL, and single-line /* */ blocks.
  let out = line.replace(/\/\*.*?\*\//g, "");
  const idx = out.search(/(^|[^:])\/\/(?!.*["'`].*\/\/)/);
  if (idx >= 0) out = out.slice(0, idx + 1);
  return out;
}

function copySegments(line) {
  const segs = [];
  const str = /"((?:[^"\\\n]|\\.)*)"|'((?:[^'\\\n]|\\.)*)'|`((?:[^`\\\n]|\\.)*)`/g;
  let m;
  while ((m = str.exec(line))) segs.push(m[1] ?? m[2] ?? m[3] ?? "");
  // JSX text between tags, excluding expressions.
  const jsx = />([^<>{}\n]{2,})</g;
  while ((m = jsx.exec(line))) segs.push(m[1]);
  return segs.filter((s) => /[A-Za-z]/.test(s) && !/^(https?:|\/|#|\.|@|[a-z-]+:)/.test(s.trim()));
}

const files = targets.length ? targets.map((t) => resolve(process.cwd(), t)) : [...walk(appRoot)];
const findings = [];

for (const file of files) {
  const text = readFileSync(file, "utf8");
  const lines = text.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const prev = lines[i - 1] ?? "";
    if (/house-lint:\s*allow/.test(raw) || /house-lint:\s*allow/.test(prev)) continue;
    if (/^\s*(import|export\s.*\sfrom)\b/.test(raw)) continue;
    if (/^\s*(\/\*|\*\/?|\/\/)/.test(raw)) continue; // comment lines, including JSDoc continuations
    const line = stripComments(raw);
    if (!line.trim()) continue;
    const segs = copySegments(line);
    for (const rule of RULES) {
      const haystacks = rule.whole ? [line] : segs;
      for (const h of haystacks) {
        const m = rule.re.exec(h);
        if (m) {
          findings.push({ file: relative(process.cwd(), file), line: i + 1, id: rule.id, level: rule.level, msg: rule.msg, excerpt: h.trim().slice(0, 110), match: m[0] });
          break;
        }
      }
    }
  }
}

const errors = findings.filter((f) => f.level === "error");
const warns = findings.filter((f) => f.level === "warn");

if (asJson) {
  console.log(JSON.stringify({ errors: errors.length, warnings: warns.length, findings }, null, 2));
} else {
  for (const f of findings) {
    console.log(`${f.file}:${f.line}  [${f.level.toUpperCase()} ${f.id}] ${f.msg}\n    ${JSON.stringify(f.excerpt)}  (${JSON.stringify(f.match)})`);
  }
  console.log(`\nhouse-lint: ${files.length} files, ${errors.length} error(s), ${warns.length} warning(s)`);
}

process.exit(errors.length && !warnOnly ? 1 : 0);

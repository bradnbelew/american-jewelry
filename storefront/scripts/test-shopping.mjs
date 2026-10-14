import assert from "node:assert/strict";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { resolve, dirname } from "node:path";
import ts from "typescript";

// Compile the pure catalog modules with the installed compiler; no extra test runtime.
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const cache = resolve(root, "node_modules/.cache/aj-shopping-tests");
mkdirSync(cache, { recursive: true });
for (const [name, path] of Object.entries({
  types: "catalog/types",
  data: "catalog/data",
  browse: "catalog/browse",
  "design-preview": "design-preview",
  "piece-selection": "piece-selection",
})) {
  const source = readFileSync(resolve(root, `app/lib/${path}.ts`), "utf8");
  const js = ts
    .transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } })
    .outputText.replace(/from "\.\/(\w+)"/g, 'from "./$1.mjs"');
  writeFileSync(resolve(cache, `${name}.mjs`), js);
}
const load = (name) => import(pathToFileURL(resolve(cache, `${name}.mjs`)).href);
const { PIECES, pieceByHandle } = await load("data");
const { readQuery, applyQuery, searchCatalog, searchSuggestion, stonesOf, matchingVersion } = await load("browse");
const { readDesign, designCookie } = await load("design-preview");
const { sizeIsReady, explicitSize } = await load("piece-selection");
let count = 0;
const check = (name, fn) => {
  fn();
  count++;
  console.log(`PASS ${name}`);
};
const query = (s) => readQuery(new URLSearchParams(s));
check("All lab-grown synonyms return the same eight actual pieces", () => {
  const ids = (term) =>
    searchCatalog(term, 40)
      .filter((h) => h.piece)
      .map((h) => h.piece.handle)
      .sort();
  const expected = PIECES.filter((p) => p.tier === "new-american")
    .map((p) => p.handle)
    .sort();
  for (const term of ["lab grown", "lab-grown diamonds", "laboratory grown diamond", "man-made diamonds", "labgrown"]) assert.deepEqual(ids(term), expected);
});
check("High Jewelry finds Royal American by its retained route", () => assert(searchCatalog("high jewelry", 40).some((h) => h.href === "/royal-american")));
check("Adjacent transposition offers an explicit Signal suggestion", () => assert.equal(searchSuggestion("singal"), "signal"));
check("A valid query never receives a typo suggestion", () => assert.equal(searchSuggestion("signal"), null));
check("Unrelated search does not invent a correction", () => assert.equal(searchSuggestion("platypus"), null));
check("Natural diamond filtering includes Royal one-of-ones", () => assert.equal(applyQuery(PIECES, query("stone=natural&production=one-of-one")).length, 3));
check("Sapphire and diamond supports BOTH stone facets", () => assert.deepEqual(stonesOf(pieceByHandle("no-002-tennessee-star")), ["birthstone", "natural"]));
check("Old one-of-one filter URLs migrate to the production facet", () => assert.equal(applyQuery(PIECES, query("stone=one-of-one")).length, 3));
check("Gold price cannot satisfy a natural diamond price filter", () => {
  const p = pieceByHandle("shooting-star-ring");
  const q = query("stone=natural&price=1000-2500");
  assert(p.versions.find((v) => v.key === "gold").priceCents < 250000);
  assert(p.versions.find((v) => v.key === "diamond").priceCents >= 250000);
  assert.equal(applyQuery([p], q).length, 0);
});
check("Displayed matching price uses the selected version", () => {
  const p = pieceByHandle("shooting-star-ring");
  assert.equal(matchingVersion(p, query("stone=natural")).key, "diamond");
});
check("Price order uses the filtered version consistently", () => {
  const q = query("stone=natural&sort=price-asc");
  const prices = applyQuery(PIECES, q).map((p) => matchingVersion(p, q).priceCents ?? Infinity);
  assert.deepEqual(
    prices,
    [...prices].sort((a, b) => a - b),
  );
});
check("Invalid filters and inherited property names are rejected", () => assert.deepEqual(query("stone=toString&sort=surprise").stone, []));
check("Preview mode survives the cookie", () =>
  assert.equal(readDesign(new Request("https://example.com/jewelry", { headers: { Cookie: "aj_design=working" } }), false), "working"),
);
check("Explicit picker selection wins over the cookie", () =>
  assert.equal(readDesign(new Request("https://example.com/?preview=company", { headers: { Cookie: "aj_design=working" } }), false), "company"),
);
check("Public live mode ignores the query and cookie", () => {
  const request = new Request("https://example.com/?preview=light", { headers: { Cookie: "aj_design=working" } });
  assert.equal(readDesign(request, true), "classic");
  assert.equal(designCookie(request, "light", true), undefined);
});
check("Unknown preview mode safely resets to original", () => assert.equal(readDesign(new Request("https://example.com/?preview=unknown"), false), "classic"));
check("Sized orders require an allowed explicit size", () => {
  assert.equal(sizeIsReady(["6", "7"], "7"), true);
  assert.equal(sizeIsReady(["6", "7"], ""), false);
  assert.equal(sizeIsReady(["6", "7"], "12"), false);
});
check("Only a deliberate valid size URL can preselect a size", () => {
  assert.equal(explicitSize(["6", "7"], null), "");
  assert.equal(explicitSize(["6", "7"], "99"), "");
  assert.equal(explicitSize(["6", "7"], "6"), "6");
});
check("Un-sized products need no size selection", () => assert.equal(sizeIsReady(undefined, ""), true));
console.log(`\n${count} shopping regression checks passed.`);

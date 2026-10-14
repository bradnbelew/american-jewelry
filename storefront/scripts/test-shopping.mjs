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
  lines: "catalog/lines",
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
const { PIECES, DESIGNS, COLLECTIONS, pieceByHandle, piecesForCollection } = await load("data");
const { readQuery, applyQuery, searchCatalog, searchSuggestion, stonesOf, matchingVersion } = await load("browse");
const { readDesign, designCookie } = await load("design-preview");
const { sizeIsReady, explicitSize } = await load("piece-selection");
const { selectedLine, shopPieces, lineHref } = await load("lines");
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
check("Retired preview cookie cannot change the storefront", () =>
  assert.equal(readDesign(new Request("https://example.com/jewelry", { headers: { Cookie: "aj_design=working" } }), false), "classic"),
);
check("Retired preview URLs cannot change the storefront", () =>
  assert.equal(readDesign(new Request("https://example.com/?preview=company", { headers: { Cookie: "aj_design=working" } }), false), "classic"),
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
check("Expanded catalog has eight styles, eight populated edits and 33 pieces", () => {
 assert.equal(DESIGNS.length, 8); assert.equal(COLLECTIONS.length, 8); assert.equal(PIECES.length, 33);
 for (const collection of COLLECTIONS) assert(piecesForCollection(collection.slug).length > 1);
});
check("Family is a cross-style curation including original and proposed designs", () => {
 const styles = new Set(piecesForCollection("family").map(p => p.design));
 for (const name of ["shooting-star", "prism", "meridian", "petal"]) assert(styles.has(name));
});
check("Proposed designs have no prices, production promises or existing-product classification", () => {
 const concepts = applyQuery(PIECES, query("production=concept"));
 assert.equal(concepts.length, 12);
 for (const p of concepts) { assert(p.concept); assert.equal(p.madeToOrder, false); assert(p.versions.every(v => v.priceCents === null)); }
 assert(applyQuery(PIECES, query("production=collection")).every(p => !p.concept && !p.oneOfOne));
 assert(applyQuery(concepts, query("price=on-request")).length === 0);
});
check("New styles are searchable and filterable without changing the existing catalog", () => {
 assert.equal(applyQuery(PIECES, query("design=meridian")).length, 3);
 assert(searchCatalog("horizon huggies").some(h => h.piece?.handle === "horizon-earrings"));
});
check("Every regular shopping line excludes Royal objects", () => {
 for(const line of ["americana","new-american"]) assert(shopPieces(line).every(p => p.tier===line && !p.oneOfOne));
 for(const c of COLLECTIONS) assert(piecesForCollection(c.slug).every(p=>p.tier!=="royal-american" && !p.oneOfOne));
});
check("Bridal has real catalog rings for each regular line", () => {
 assert.deepEqual(shopPieces("americana",piecesForCollection("bridal")).map(p=>p.handle),["shooting-star-band","prism-band"]);
 assert(shopPieces("new-american",piecesForCollection("bridal")).length>=2);
});
check("Ordinary search never returns individual Royal objects", () => {
 for(const term of ["diamond","ring","gold","natural","high jewelry","cumberland","tennessee star","harpeth"]) assert(searchCatalog(term,99).every(h=>!h.piece?.oneOfOne));
 for(const term of ["cumberland","tennessee star","harpeth"]) assert(searchCatalog(term,99).some(h=>h.href==="/royal-american"));
});
check("Line switching keeps category and sort while clearing incompatible facets", () => {
 assert.equal(lineHref("/jewelry/rings","new-american",new URLSearchParams("line=americana&stone=birthstone&design=prism&sort=price-asc")),"/jewelry/rings?line=new-american&sort=price-asc");
 assert.equal(lineHref("/collections/bridal","royal-american"),"/royal-american");
 assert.equal(selectedLine(new URLSearchParams("stone=man-made")),"new-american");
 assert.equal(selectedLine(new URLSearchParams("design=signal")),"new-american");
 assert.equal(selectedLine(new URLSearchParams("line=americana&line=new-american")),"americana");
});
console.log(`\n${count} shopping regression checks passed.`);

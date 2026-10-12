// Runs gql.tada's check with the Hydrogen schemas, using RELATIVE schema paths.
// `hydrogen gql check` writes absolute Windows paths (D:\...) into its temp tsconfig and
// gql.tada reads "D:" as a URL scheme and tries to fetch it ("[Network] fetch failed").
import { spawnSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const hydrogenRoot = path.dirname(require.resolve("@shopify/hydrogen/package.json"));
const rel = (p) => "./" + path.relative(process.cwd(), p).split(path.sep).join("/");
const tmp = path.resolve(`.hydrogen-gql-${randomUUID()}.json`);
writeFileSync(
  tmp,
  JSON.stringify({
    extends: "./tsconfig.json",
    compilerOptions: {
      plugins: [
        {
          name: "gql.tada/ts-plugin",
          schemas: [
            { name: "storefront", schema: rel(path.join(hydrogenRoot, "dist/storefront.schema.json")), tadaOutputLocation: "storefront-graphql-env.d.ts" },
            { name: "customer-account", schema: rel(path.join(hydrogenRoot, "dist/customer-account.schema.json")), tadaOutputLocation: "customer-account-graphql-env.d.ts" },
          ],
          trackFieldUsage: false,
        },
      ],
    },
  }),
);
const tadaPkg = require.resolve("gql.tada/package.json", { paths: [hydrogenRoot] });
const cli = path.join(path.dirname(tadaPkg), "bin/cli.js");
const args = [cli, "check", "--tsconfig", tmp, "--level", "info", ...process.argv.slice(2)];
const r = spawnSync(process.execPath, args, { stdio: "inherit" });
rmSync(tmp, { force: true });
process.exit(r.status ?? 1);

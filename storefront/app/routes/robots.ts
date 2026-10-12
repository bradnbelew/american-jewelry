import { envContext } from "~/lib/env";
import { SITE, isLive } from "~/lib/site";

import type { Route } from "./+types/robots";

/** Previews are not indexed. On the custom domain every crawler, including the AI agents, may read the site except per-person pages. */
export function loader({ context }: Route.LoaderArgs) {
  const live = isLive(context.get(envContext));
  const body = live
    ? ["User-agent: *", "Allow: /", "Disallow: /design/", "Disallow: /saved", "Disallow: /bag", "Disallow: /account", "", `Sitemap: ${SITE}/sitemap-pages.xml`, ""].join("\n")
    : ["User-agent: *", "Disallow: /", ""].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}

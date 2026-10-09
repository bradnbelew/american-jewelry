import type { MetadataRoute } from "next";
import { LIVE, SITE } from "@/lib/site";

/** Preview deployments are not indexed. When the domain is live, every crawler, including the AI agents, may read the whole site except per-person pages. */
export default function robots(): MetadataRoute.Robots {
  if (!LIVE) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/design/", "/saved"] },
      { userAgent: ["GPTBot", "OAI-SearchBot", "ClaudeBot", "Claude-SearchBot", "PerplexityBot", "Google-Extended", "Bingbot"], allow: "/", disallow: ["/design/", "/saved"] },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // Preview deployments should not be indexed; flip when americanjewelers.com goes live.
  const live = process.env.NEXT_PUBLIC_SITE_LIVE === "true";
  return live
    ? { rules: { userAgent: "*", allow: "/" }, sitemap: "https://americanjewelers.com/sitemap.xml" }
    : { rules: { userAgent: "*", disallow: "/" } };
}

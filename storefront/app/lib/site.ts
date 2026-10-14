/** Site-wide constants. The canonical host is the domain the family is acquiring; previews stay noindexed. */
export const SITE = "https://americanjewelers.com";
export const SITE_NAME = "American Jewelry";

/** The month the public figures on the site (review counts) were last checked. */
export const FIGURES_AS_OF = "August 26, 2026";

/** Sitemap lastmod. Bump on content changes; Oxygen freezes Date.now() per request, so a constant is the honest value. */
export const CONTENT_DATE = "2026-10-13";

/** Read once in the root loader from the worker env; `true` only on the custom domain. */
export const isLive = (env: Env) => env.PUBLIC_SITE_LIVE === "true";

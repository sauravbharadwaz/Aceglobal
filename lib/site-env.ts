/**
 * Which deployment this is: "production", "preview" or "development".
 *
 * Read from SITE_ENV first, falling back to Vercel's VERCEL_ENV so the current
 * deployment keeps behaving exactly as it does today.
 *
 * The fallback matters because VERCEL_ENV only exists on Vercel. Anywhere else
 * it is undefined, `isProduction` becomes false, and the site serves
 * `Disallow: /` in robots.txt with `noindex` on every page — while looking
 * completely normal. A marketing site would quietly drop out of search results
 * with nothing to notice until traffic fell.
 *
 * Set SITE_ENV explicitly on any non-Vercel deployment: "production" for the
 * live site, "preview" for staging, which keeps staging correctly out of
 * search results.
 */
export const SITE_ENV = process.env.SITE_ENV ?? process.env.VERCEL_ENV ?? "development";

export const isProduction = SITE_ENV === "production";

/**
 * Canonical public origin, no trailing slash. Used for canonical URLs, Open
 * Graph URLs, JSON-LD and the sitemap. Always the production domain: a preview
 * deployment that advertised its own origin would hand crawlers duplicate
 * copies of every page.
 */
export const SITE_URL = (process.env.SITE_URL || "https://aceglobal.ai").replace(/\/+$/, "");

export const SITE_NAME = "Ace Global";

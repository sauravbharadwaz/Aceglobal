import type { MetadataRoute } from "next";

import { getPosts } from "@/sanity/queries";

/**
 * robots.txt has advertised https://aceglobal.ai/sitemap.xml since it was
 * written, and that URL has been returning 404 — crawlers were being pointed at
 * nothing.
 */

// Matches the blog's own revalidate, so a newly published post appears here on
// roughly the same schedule it appears on the site.
export const revalidate = 60;

// Absolute URLs are required in a sitemap. The production domain is used even on
// a preview deployment, which is harmless: robots.txt disallows everything
// outside production, so nothing crawls a preview sitemap in the first place.
const SITE_URL = "https://aceglobal.ai";

/**
 * Fixed pages, highest value first.
 *
 * /studio is deliberately absent — it is the Sanity Studio, an editing surface
 * with no reason to appear in search results.
 */
const STATIC_ROUTES: Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}> = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
  { path: "/bookkeeping", priority: 0.8, changeFrequency: "monthly" },
  { path: "/corporate-taxes", priority: 0.8, changeFrequency: "monthly" },
  { path: "/company-formation", priority: 0.8, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/resources", priority: 0.6, changeFrequency: "monthly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // getPosts already swallows its own errors and returns [] when Sanity is
  // unreachable or unconfigured, so a CMS outage costs the post URLs rather
  // than the whole sitemap — or the build, since this runs at build time.
  const posts = await getPosts();

  const postEntries: MetadataRoute.Sitemap = posts
    .filter((post) => Boolean(post.slug))
    .map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      // A real date where the post has one. Falling back to now would tell
      // crawlers every post changed on every regeneration.
      lastModified: post.publishedAt ? new Date(post.publishedAt) : now,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  return [...staticEntries, ...postEntries];
}

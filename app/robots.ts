import type { MetadataRoute } from "next";

// Only the production deployment is indexable. Preview/staging/development
// return a blanket disallow so search engines never index non-prod URLs.
// `VERCEL_ENV` is "production" | "preview" | "development" on Vercel.
const isProduction = process.env.VERCEL_ENV === "production";

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://aceglobal.ai/sitemap.xml",
  };
}

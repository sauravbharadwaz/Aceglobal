import type { MetadataRoute } from "next";
import { isProduction } from "@/lib/site-env";

// Only the production deployment is indexable. Preview/staging/development
// return a blanket disallow so search engines never index non-prod URLs.

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

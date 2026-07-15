import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "./env";

// Server-only read token. Not NEXT_PUBLIC — Next.js strips non-public env vars
// from client bundles, so it never reaches the browser. Needed because this
// dataset denies anonymous reads of content documents (a public marketing blog
// still reads with a Viewer token). If the dataset is made fully public, this
// can be left unset.
const token = process.env.SANITY_API_READ_TOKEN;

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Only published content ever reaches the site.
  perspective: "published",
  // With a token, hit the API directly for accurate authenticated reads;
  // without one, use the public edge CDN. Next.js `revalidate` caches either.
  useCdn: !token,
  token,
});

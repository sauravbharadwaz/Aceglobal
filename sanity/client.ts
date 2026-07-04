import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // `useCdn: true` serves published content from Sanity's edge cache — fast and
  // cheap. Next.js `revalidate` on each fetch keeps it fresh.
  useCdn: true,
});

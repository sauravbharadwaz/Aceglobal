// Sanity project configuration, driven by env vars so the code can be
// committed without secrets. Project IDs and datasets are NOT secret — they're
// public — but we keep them in env so different environments can point at
// different datasets.

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// A valid-format placeholder keeps Studio config + `next build` from throwing
// before a real project id has been set. All data fetching is gated on
// `isSanityConfigured`, so nothing hits the network until a real id exists.
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder";

export const isSanityConfigured = projectId !== "placeholder";

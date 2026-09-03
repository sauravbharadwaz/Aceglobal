import { defineCliConfig } from "sanity/cli";

// Lets `npx sanity schema deploy` (and other CLI commands) know which project
// to target. Mirrors sanity/env.ts so the two can't drift apart.
export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "qpeoflzk",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  },
});

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Blog covers, author photos and inline article images live on Sanity's
    // CDN. Scoped to this project's path so the optimizer can't be pointed at
    // arbitrary third-party images.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/qpeoflzk/**",
      },
    ],
  },
};

export default nextConfig;

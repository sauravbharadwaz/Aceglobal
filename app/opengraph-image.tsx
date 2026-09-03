import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { SITE_NAME } from "@/lib/site-env";

/**
 * Default social share image for every route that doesn't set its own.
 * Blog posts override it with their cover image; marketing pages fall back
 * to this. Rendered once at build time and served as a static PNG.
 */

export const alt = `${SITE_NAME} — your small business books & taxes on autopilot`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoSvg = await readFile(join(process.cwd(), "public", "logo.svg"));
  const logo = `data:image/svg+xml;base64,${logoSvg.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #f2f3ff 0%, #ffffff 55%, #e3e7ff 100%)",
          color: "#00174c",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} width={72} height={72} alt="" />
          <div style={{ fontSize: 44, fontWeight: 600, letterSpacing: -1 }}>
            {SITE_NAME}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 600,
              lineHeight: 1.08,
              letterSpacing: -2,
              maxWidth: 1000,
            }}
          >
            Your small business books & taxes, completely off your plate.
          </div>
          <div style={{ fontSize: 30, color: "#0053ce", fontWeight: 500 }}>
            Bookkeeping · Corporate taxes · Payroll · Compliance
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 26,
            color: "#727687",
          }}
        >
          <span>Expert CPAs + software, in one platform</span>
          <span>aceglobal.ai</span>
        </div>
      </div>
    ),
    { ...size }
  );
}

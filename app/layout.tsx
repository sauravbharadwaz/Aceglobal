import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { isProduction, SITE_NAME, SITE_URL } from "@/lib/site-env";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

// Only the production deployment is indexable; staging and preview carry a
// noindex tag so they never compete with the real site in search results.
//
// metadataBase lets every page use relative URLs for canonical, Open Graph and
// Twitter images; Next resolves them against the production origin. The
// openGraph/twitter blocks here are defaults that pages inherit and override
// field by field.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Ace Global | Your small business books & taxes on autopilot",
  description:
    "Ace Global is the all-in-one accounting platform that combines expert CPAs with powerful software to handle bookkeeping and corporate taxes for small businesses.",
  robots: isProduction ? undefined : { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jakarta.variable} scroll-smooth`}>
      <body className="bg-[#faf8ff] text-[#00174c] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}

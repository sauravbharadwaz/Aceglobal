import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

// Only index the production deployment; staging/preview get a noindex tag.
const isProduction = process.env.VERCEL_ENV === "production";

export const metadata: Metadata = {
  title: "Ace Global | Your startup's books & taxes on autopilot",
  description:
    "Ace Global is the all-in-one accounting platform that combines expert CPAs with powerful software to handle bookkeeping and corporate taxes for startups.",
  robots: isProduction ? undefined : { index: false, follow: false },
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

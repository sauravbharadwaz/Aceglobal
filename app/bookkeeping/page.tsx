import type { Metadata } from "next";

import PlatformPageDark from "@/components/theme/PlatformPageDark";

export const metadata: Metadata = {
  title: "Bookkeeping | Ace Global",
  description:
    "Get your books closed and your financials monthly, quarterly, or annually — handled by a dedicated CPA-led team.",
};

export default function BookkeepingPage() {
  return (
    <PlatformPageDark
      eyebrow="Bookkeeping"
      title="Get your books closed and your financials —"
      accent="monthly, quarterly, or annually."
      subtitle="A dedicated CPA-led team keeps your books continuously updated across banks, Stripe, and business systems — so you always know your burn, runway, and cash flow."
      heroImg="/bookkeeping-hero.webp"
      heroImgAlt="Ace Global bookkeeping dashboard"
      features={[
        {
          tag: "Always current",
          title: "Books that close on your schedule.",
          desc: "Monthly, quarterly, or annual closes — whatever fits your business. Transactions categorized, accounts reconciled, statements delivered without you chasing anyone.",
          bullets: [
            "Monthly, quarterly, or annual close",
            "Bank & credit card reconciliation",
            "Accurate P&L, balance sheet, and cash flow",
          ],
        },
        {
          tag: "Dedicated team",
          title: "A real bookkeeper who knows your business.",
          desc: "A dedicated bookkeeper backed by CPAs — reachable on WhatsApp or iMessage. Your AI agent answers day-to-day questions about your numbers in real time.",
          bullets: [
            "Dedicated bookkeeper for your account",
            "CPA review on every close",
            "Ask your AI agent anytime",
          ],
        },
        {
          tag: "Investor ready",
          title: "Financials you can hand to anyone.",
          desc: "Clean statements that hold up with lenders, investors, and the IRS. Historical cleanup is included in onboarding, so you start from a tidy baseline.",
          bullets: [
            "Historical cleanup included",
            "Lender & investor-ready reports",
            "Year-end packages for tax filing",
          ],
        },
      ]}
      comparison={{
        title: "Ace Global vs. the alternatives",
        sub: "A modern accounting team vs. the old way of doing books.",
        cols: ["Ace Global", "Local CPA firm", "DIY spreadsheets"],
        rows: [
          ["All-inclusive pricing", true, false, false],
          ["Real-time finance dashboard", true, false, false],
          ["AI agent on WhatsApp/iMessage", true, false, false],
          ["Monthly, quarterly, or annual close", true, true, false],
          ["Dedicated bookkeeper + CPA", true, true, false],
          ["Quick onboarding", true, false, false],
          ["No long-term contracts", true, false, true],
          ["Investor-ready statements", true, true, false],
        ],
      }}
      testimonialQuote="“Clean books, every month, without me chasing anyone.”"
      testimonials={[
        {
          quote:
            "Onboarding was effortless. Within a week, our books were cleaned up, reconciled, and ready for tax season.",
          name: "Sophie Lin",
          role: "Owner, Brightwave Salon",
          initials: "SL",
        },
        {
          quote:
            "We finally have clean financials every month. Ace Global helped us understand cash flow and what to set aside for taxes.",
          name: "Priya Kapoor",
          role: "Owner, Kapoor Dental Group",
          initials: "PK",
        },
        {
          quote:
            "They helped us get payroll, sales tax, and monthly bookkeeping under control. I can focus on customers instead of paperwork.",
          name: "Rachel Chen",
          role: "Owner, Bay Area Café",
          initials: "RC",
        },
      ]}
    />
  );
}

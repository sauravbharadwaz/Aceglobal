import type { Metadata } from "next";

import PlatformPageDark from "@/components/theme/PlatformPageDark";

export const metadata: Metadata = {
  title: "Corporate Taxes | Ace Global",
  description:
    "Delaware Franchise Tax, federal and state corporate income taxes — prepared and filed on time by your CPA team.",
};

export default function CorporateTaxesPage() {
  return (
    <PlatformPageDark
      eyebrow="Corporate Taxes"
      title="Delaware Franchise Tax, federal & state taxes —"
      accent="filed on time, every time."
      subtitle="Your CPA team and AI agent prepare every filing, track every deadline, and keep your company compliant — without you chasing forms or notices."
      heroImg="/taxes-hero.webp"
      heroImgAlt="Ace Global tax compliance dashboard"
      features={[
        {
          tag: "Delaware Franchise Tax",
          title: "Franchise tax handled before it's ever late.",
          desc: "We calculate the method that saves you the most, file your Delaware Franchise Tax, and keep the annual report on schedule — no surprise penalty letters.",
          bullets: [
            "Best-method calculation",
            "Annual report filed on time",
            "Deadline reminders before due dates",
          ],
        },
        {
          tag: "Federal & State",
          title: "Federal and state income taxes, end to end.",
          desc: "Your CPA team prepares and files federal returns and state corporate income taxes for every state you operate in — including multi-state apportionment.",
          bullets: [
            "Federal corporate income tax",
            "Multi-state returns & apportionment",
            "Estimated payments tracked quarterly",
          ],
        },
        {
          tag: "Always on time",
          title: "Every deadline tracked. Every filing confirmed.",
          desc: "Your AI agent monitors every federal and state due date, collects what's needed ahead of time, and notifies you the moment each return is filed.",
          bullets: [
            "All deadlines tracked automatically",
            "Documents collected ahead of time",
            "Filing confirmations sent to you",
          ],
        },
      ]}
      comparison={{
        title: "Ace Global vs. the alternatives",
        sub: "A modern tax team vs. the old way of filing.",
        cols: ["Ace Global", "Local CPA firm", "DIY filing"],
        rows: [
          ["All-inclusive pricing", true, false, false],
          ["Federal, state & franchise filings", true, true, false],
          ["Multi-state apportionment", true, true, false],
          ["International forms (5472/5471/FBAR)", true, false, false],
          ["Deadline tracking & reminders", true, false, false],
          ["AI agent on WhatsApp/iMessage", true, false, false],
          ["Filing confirmations", true, true, false],
          ["No long-term contracts", true, false, true],
        ],
      }}
      testimonialQuote="“Every filing on time, no surprises at year-end.”"
      testimonials={[
        {
          quote:
            "We handle federal, state, and franchise filings without me having to chase anything. It just gets done.",
          name: "James Wilson",
          role: "Owner, Wilson Auto Repair",
          initials: "JW",
        },
        {
          quote:
            "The only team that actually understands small business compliance. They keep us ahead on taxes and deadlines.",
          name: "Aria Song",
          role: "CEO, Horizon Lab",
          initials: "AS",
        },
        {
          quote:
            "Before Ace Global, tax season was always stressful. Now we know exactly what to expect before filing.",
          name: "David Kim",
          role: "Founder, Kim Home Services",
          initials: "DK",
        },
      ]}
    />
  );
}

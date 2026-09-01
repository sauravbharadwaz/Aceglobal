import type { Metadata } from "next";

import PlatformPageDark from "@/components/theme/PlatformPageDark";

export const metadata: Metadata = {
  title: "Company Formation | Ace Global",
  description:
    "Form your LLC or C-Corp the right way — incorporation, EIN, registered agent, and compliance handled end to end by your CPA team.",
};

export default function CompanyFormationPage() {
  return (
    <PlatformPageDark
      eyebrow="Company Formation"
      title="Form your company —"
      accent="incorporated, compliant, and ready to operate."
      subtitle="From choosing the right entity to your EIN, registered agent, and first compliance filing — your CPA team and AI agent handle it end to end."
      features={[
        {
          tag: "Pick the right entity",
          title: "The right structure for how you'll actually grow.",
          desc: "LLC, S-Corp election, or Delaware C-Corp? We walk you through liability, taxes, and fundraising so you incorporate once — and don't pay to restructure later.",
          bullets: [
            "LLC, S-Corp & C-Corp guidance",
            "Delaware or your home state",
            "Set up for investors from day one",
          ],
        },
        {
          tag: "Filed for you",
          title: "Incorporation papers prepared and filed.",
          desc: "We draft and file your formation documents, secure your EIN, and prepare your operating agreement or bylaws — so you're legally ready to bank and sign contracts.",
          bullets: [
            "Articles of incorporation / organization",
            "Federal EIN obtained for you",
            "Operating agreement or bylaws",
          ],
        },
        {
          tag: "Stay compliant",
          title: "Registered agent and compliance, on autopilot.",
          desc: "Registered agent service, annual reports, and franchise tax tracked from the start — with your AI agent flagging every deadline before it hits.",
          bullets: [
            "Registered agent in every state",
            "Annual reports & franchise tax tracked",
            "BOI / beneficial ownership filing",
          ],
        },
      ]}
      comparison={{
        title: "Ace Global vs. the alternatives",
        sub: "A modern formation team vs. filing services and law firms.",
        cols: ["Ace Global", "Filing service", "Law firm"],
        rows: [
          ["Entity selection guidance", true, false, true],
          ["Incorporation filed for you", true, true, true],
          ["EIN & S-Corp election", true, false, true],
          ["Registered agent included", true, true, false],
          ["Ongoing compliance tracking", true, false, false],
          ["Bookkeeping & taxes from day one", true, false, false],
          ["AI agent on WhatsApp/iMessage", true, false, false],
          ["Flat, all-inclusive pricing", true, false, false],
        ],
      }}
      testimonialQuote="“Incorporated in days, compliant ever since.”"
      testimonials={[
        {
          quote:
            "They picked the right entity, filed everything, and got our EIN fast. We were signing contracts within the week.",
          name: "Maya Robinson",
          role: "Founder, Northwind Goods",
          initials: "MR",
        },
        {
          quote:
            "As a foreign founder, forming a Delaware C-Corp felt impossible. Ace Global made it simple and kept us compliant.",
          name: "Diego Alvarez",
          role: "CEO, Lumen Labs",
          initials: "DA",
        },
        {
          quote:
            "Formation, bookkeeping, and taxes from the same team meant nothing fell through the cracks at the start.",
          name: "Hannah Patel",
          role: "Owner, Patel Studio",
          initials: "HP",
        },
      ]}
    />
  );
}

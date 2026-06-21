import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import PricingTables from "@/components/PricingTables";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Pricing | Ace Global",
  description:
    "Simple, all-inclusive pricing for bookkeeping, payroll, and corporate taxes. Pick the plan that fits your business — no long-term contracts.",
};

const included = [
  {
    title: "A dedicated team",
    desc: "A real bookkeeper backed by CPAs, reachable on WhatsApp or iMessage.",
  },
  {
    title: "AI agent on your numbers",
    desc: "Ask about cash flow, runway, or any transaction and get answers in real time.",
  },
  {
    title: "Historical cleanup",
    desc: "We tidy and reconcile your past books during onboarding — at no extra cost.",
  },
  {
    title: "No long-term contracts",
    desc: "Month-to-month flexibility. Upgrade, downgrade, or cancel anytime.",
  },
];

const compareRows: { feature: string; values: (boolean | string)[] }[] = [
  { feature: "Monthly bookkeeping & reconciliation", values: [true, true, true] },
  { feature: "Dedicated bookkeeper", values: [true, true, true] },
  { feature: "Financial statements (P&L, BS, cash flow)", values: [true, true, true] },
  { feature: "AI agent on WhatsApp / iMessage", values: [true, true, true] },
  { feature: "Historical cleanup", values: ["Add-on", true, true] },
  { feature: "Payroll & compliance", values: [false, true, true] },
  { feature: "Quarterly tax estimates", values: [false, true, true] },
  { feature: "CPA review on every close", values: [false, true, true] },
  { feature: "Corporate tax filing", values: [false, "Add-on", true] },
  { feature: "Dedicated CPA + finance lead", values: [false, false, true] },
  { feature: "Multi-entity & consolidations", values: [false, false, true] },
  { feature: "Sales tax & franchise tax", values: [false, false, true] },
];

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return <span className="text-xs font-medium text-[#727687]">{value}</span>;
  }
  return value ? (
    <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    </span>
  ) : (
    <span className="w-6 h-6 rounded-full bg-[#c2c6d8]/30 flex items-center justify-center text-[#727687]">
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </span>
  );
}

export default function PricingPage() {
  return (
    <>
      <ScrollReveal />
      <Navbar />
      <main>
        {/* Hero + pricing tables over a glass-friendly gradient backdrop */}
        <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden bg-gradient-to-b from-[#e3e7ff] via-[#f2f3ff] to-white">
          {/* Colorful blurred blobs — give the frosted glass something to refract */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <div className="absolute -top-24 -left-24 w-[28rem] h-[28rem] bg-[#0053ce]/30 rounded-full blur-3xl" />
            <div className="absolute top-40 -right-24 w-[30rem] h-[30rem] bg-[#94a6fe]/40 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-1/3 w-[26rem] h-[26rem] bg-[#196bfa]/20 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-6">
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-flex items-center gap-2 bg-white/40 backdrop-blur-md border border-white/50 px-4 py-2 rounded-full mb-6 shadow-sm">
                <span className="text-sm font-medium tracking-wide text-[#243889]">Pricing</span>
              </div>
              <h1 className="text-[32px] sm:text-[40px] md:text-[60px] font-medium leading-[1.12] md:leading-[1.1] tracking-[-0.02em] text-[#00174c] max-w-4xl mx-auto mb-5 md:mb-6">
                All-inclusive pricing.{" "}
                <span className="text-[#0053ce]">No surprises.</span>
              </h1>
              <p className="text-base md:text-lg leading-relaxed text-[#424655] max-w-2xl mx-auto">
                One flat rate covers your books, your team, and your AI agent. Add payroll and taxes
                as you grow — and cancel anytime.
              </p>
            </div>

            <PricingTables />
          </div>
        </section>

        {/* What's included in every plan */}
        <section className="relative py-16 md:py-[120px] overflow-hidden bg-gradient-to-br from-[#172d65] via-[#1f3a82] to-[#0053ce]">
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <div className="absolute -top-20 right-10 w-[26rem] h-[26rem] bg-[#94a6fe]/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-16 w-[28rem] h-[28rem] bg-[#196bfa]/40 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-6">
            <h2 className="text-[28px] md:text-[40px] font-medium leading-[1.2] text-white text-center mb-12 max-w-2xl mx-auto">
              Every plan includes the essentials.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {included.map((item) => (
                <div
                  key={item.title}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl"
                >
                  <div className="w-10 h-10 rounded-full bg-white/20 border border-white/25 flex items-center justify-center mb-5">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-[#dbe1ff]/80 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Compare plans table */}
        <section className="py-16 md:py-[120px] bg-white">
          <div className="max-w-[1100px] mx-auto px-5 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-[28px] md:text-[40px] font-medium leading-[1.2] text-[#00174c] mb-3">
                Compare every plan
              </h2>
              <p className="text-[#727687] text-lg">
                See exactly what&apos;s included as you scale.
              </p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-[#c2c6d8]/30 shadow-sm">
              <div className="grid grid-cols-4 bg-[#172d65] text-white text-sm font-medium">
                <div className="p-4 md:p-5">Features</div>
                <div className="p-4 md:p-5 text-center text-[#dbe1ff]/80">Starter</div>
                <div className="p-4 md:p-5 text-center bg-[#0053ce]">Growth</div>
                <div className="p-4 md:p-5 text-center text-[#dbe1ff]/80">Scale</div>
              </div>
              {compareRows.map((row, i) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-4 text-sm ${i % 2 ? "bg-[#f2f3ff]" : "bg-white"}`}
                >
                  <div className="p-4 md:p-5 text-[#00174c] font-medium">{row.feature}</div>
                  {row.values.map((v, j) => (
                    <div key={j} className="p-4 md:p-5 flex items-center justify-center text-center">
                      <Cell value={v} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

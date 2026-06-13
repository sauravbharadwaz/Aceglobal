import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import CountUp from "@/components/CountUp";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Bookkeeping | Ace Global",
  description:
    "Get your books closed and your financials monthly, quarterly, or annually — handled by a dedicated CPA-led team.",
};

const features = [
  {
    tag: "Always current",
    tagStyle: "bg-[#D6F5E3] text-[#1A7A44]",
    title: "Books that close on your schedule.",
    desc: "Monthly, quarterly, or annual closes — whatever fits your business. Transactions are categorized, accounts reconciled, and statements delivered without you chasing anyone.",
    bullets: [
      "Monthly, quarterly, or annual close",
      "Bank & credit card reconciliation",
      "Accurate P&L, balance sheet, and cash flow",
    ],
  },
  {
    tag: "Dedicated team",
    tagStyle: "bg-[#0053ce]/10 text-[#0053ce]",
    title: "A real bookkeeper who knows your business.",
    desc: "You get a dedicated bookkeeper backed by CPAs — reachable on WhatsApp or iMessage. Your AI agent answers day-to-day questions about your numbers in real time.",
    bullets: [
      "Dedicated bookkeeper for your account",
      "CPA review on every close",
      "Ask your AI agent anytime",
    ],
  },
  {
    tag: "Investor ready",
    tagStyle: "bg-[#94a6fe]/20 text-[#243889]",
    title: "Financials you can hand to anyone.",
    desc: "Clean statements that hold up with lenders, investors, and the IRS. Historical cleanup is included in onboarding, so you start from a tidy baseline.",
    bullets: [
      "Historical cleanup included",
      "Lender & investor-ready reports",
      "Year-end packages for tax filing",
    ],
  },
];

function BooksMockup() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#c2c6d8]/20 max-w-md w-full mx-auto">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm font-medium text-[#00174c]">Monthly Close — June</p>
        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
          ✓ Closed
        </span>
      </div>
      {[
        { label: "Revenue", value: "$48,200" },
        { label: "Expenses", value: "$12,850" },
        { label: "Net Income", value: "$35,350" },
        { label: "Cash Balance", value: "$142,000" },
      ].map((row) => (
        <div
          key={row.label}
          className="flex justify-between items-center py-3 border-b border-[#c2c6d8]/20 last:border-0"
        >
          <span className="text-sm text-[#727687]">{row.label}</span>
          <span className="text-sm font-semibold text-[#00174c]">{row.value}</span>
        </div>
      ))}
      <div className="mt-4 pt-4 border-t border-[#c2c6d8]/20 flex items-center gap-2 text-xs text-[#727687]">
        <span className="w-2 h-2 rounded-full bg-green-400" />
        Reconciled by your bookkeeper
      </div>
    </div>
  );
}

export default function BookkeepingPage() {
  return (
    <>
      <ScrollReveal />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 bg-white overflow-hidden">
          <div className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-[#94a6fe]/20 border border-[#94a6fe]/30 px-4 py-2 rounded-full mb-6">
              <span className="text-sm font-medium tracking-wide text-[#243889]">Bookkeeping</span>
            </div>
            <h1 className="text-[32px] sm:text-[40px] md:text-[60px] font-medium leading-[1.12] md:leading-[1.1] tracking-[-0.02em] text-[#00174c] max-w-4xl mx-auto mb-5 md:mb-6">
              Get your books closed and your financials —{" "}
              <span className="text-[#0053ce]">monthly, quarterly, or annually.</span>
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-[#727687] max-w-2xl mx-auto mb-8 md:mb-12">
              A dedicated CPA-led team keeps your books continuously updated across banks, Stripe,
              and business systems — so you always know your burn, runway, and cash flow.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
              <button className="bg-[#0053ce] text-white px-6 md:px-8 py-2.5 md:py-4 rounded-full font-medium text-sm md:text-lg hover:bg-[#0053ce]/90 transition-all shadow-xl shadow-[#0053ce]/25">
                Get started
              </button>
              <button className="bg-[#94a6fe] text-[#243889] px-6 md:px-8 py-2.5 md:py-4 rounded-full font-medium text-sm md:text-lg hover:bg-[#94a6fe]/80 transition-all">
                Book a demo
              </button>
            </div>
          </div>
        </section>

        {/* Bento grid */}
        <section className="py-16 md:py-[120px] bg-[#f2f3ff]">
          <div className="max-w-[1280px] mx-auto px-5 md:px-6">
            <h2 className="text-[28px] md:text-[40px] font-medium leading-[1.2] tracking-[-0.01em] text-[#00174c] text-center mb-12">
              Bookkeeping that runs itself.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:h-[620px]">
              {/* Dedicated team */}
              <div className="md:col-span-7 bg-white p-8 rounded-3xl shadow-sm border border-[#c2c6d8]/20 flex flex-col justify-between overflow-hidden group">
                <div>
                  <h3 className="text-2xl font-medium text-[#00174c] mb-2">
                    Your dedicated bookkeeping team
                  </h3>
                  <p className="text-[#727687]">
                    Real bookkeepers backed by CPAs who learn how your business runs — categorizing
                    transactions, reconciling accounts, and closing your books on schedule.
                  </p>
                </div>
                <div className="mt-8 flex gap-4 transition-transform duration-500 group-hover:translate-x-2">
                  {["/avatar-1.webp", "/avatar-2.webp", "/avatar-3.webp"].map((src) => (
                    <img
                      key={src}
                      src={src}
                      alt="Bookkeeper"
                      className="w-16 h-16 rounded-full object-cover border-4 border-[#ebedff]"
                    />
                  ))}
                  <div className="w-16 h-16 rounded-full bg-[#0053ce]/10 flex items-center justify-center text-[#0053ce] font-semibold text-sm">
                    +12
                  </div>
                </div>
              </div>

              {/* Volume stat */}
              <div className="md:col-span-5 bg-[#0053ce] p-8 rounded-3xl shadow-lg flex flex-col justify-between text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-2xl font-medium mb-2">$1B+ Categorized</h3>
                  <p className="opacity-80">
                    Transactions reconciled across client accounts every year.
                  </p>
                </div>
                <CountUp
                  value={1204889310}
                  prefix="$"
                  duration={2200}
                  className="text-5xl font-semibold mt-8 relative z-10 tabular-nums block"
                />
                <div className="absolute bottom-0 right-0 opacity-20 w-full pointer-events-none">
                  <svg viewBox="0 0 400 200" className="w-full">
                    <path d="M0,150 Q100,100 200,120 T400,50 L400,200 L0,200 Z" fill="white" />
                  </svg>
                </div>
              </div>

              {/* Autopilot wide card */}
              <div className="md:col-span-12 bg-[#172d65] text-white p-8 rounded-3xl shadow-sm flex flex-col md:flex-row items-center gap-8 group">
                <div className="flex-1">
                  <h3 className="text-2xl font-medium mb-2">Reconciliation on autopilot</h3>
                  <p className="text-[#dbe1ff]/60">
                    Every bank account, card, and payout syncs in real time. Your books stay current
                    between closes — no end-of-month scramble.
                  </p>
                </div>
                <div className="w-full md:w-80 bg-white/10 rounded-2xl p-5 group-hover:scale-[1.02] transition-transform">
                  <p className="text-xs font-medium text-[#b2c5ff] mb-3 uppercase tracking-wider">
                    Recent Activity
                  </p>
                  {[
                    { name: "Bank feed synced", note: "412 transactions", ok: true },
                    { name: "Card statements matched", note: "98% auto-categorized", ok: true },
                    { name: "May books closed", note: "Reviewed by CPA", ok: true },
                  ].map((row) => (
                    <div
                      key={row.name}
                      className="flex justify-between items-center py-2 border-b border-white/10 last:border-0"
                    >
                      <div>
                        <p className="text-sm text-white">{row.name}</p>
                        <span className="text-[10px] bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full font-medium">
                          {row.note}
                        </span>
                      </div>
                      <span className="text-green-300 text-sm">✓</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature rows */}
        <section className="py-16 md:py-[120px] bg-[#f2f3ff] overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-5 md:px-6 space-y-24">
            {features.map((f, i) => (
              <div
                key={f.tag}
                className="bg-white rounded-[40px] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 shadow-sm"
              >
                <div className={`flex-1 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                  <span
                    className={`inline-block px-4 py-1 rounded-full text-sm font-medium mb-6 ${f.tagStyle}`}
                  >
                    {f.tag}
                  </span>
                  <h2 className="text-[28px] md:text-[40px] font-medium leading-[1.2] text-[#00174c] mb-6">
                    {f.title}
                  </h2>
                  <p className="text-lg text-[#727687] mb-8 leading-relaxed">{f.desc}</p>
                  <ul className="space-y-3">
                    {f.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-3 text-[#00174c]">
                        <svg
                          className="w-5 h-5 text-[#0053ce] shrink-0"
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
                        <span className="text-sm md:text-base">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`flex-1 w-full ${i % 2 === 1 ? "md:order-1" : ""}`}>
                  <BooksMockup />
                </div>
              </div>
            ))}
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}

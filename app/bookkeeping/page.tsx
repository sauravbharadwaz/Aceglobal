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
        <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden bg-gradient-to-b from-[#e3e7ff] via-[#f2f3ff] to-white">
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <div className="absolute -top-24 -left-24 w-[28rem] h-[28rem] bg-[#0053ce]/25 rounded-full blur-3xl" />
            <div className="absolute top-32 -right-24 w-[30rem] h-[30rem] bg-[#94a6fe]/40 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-white/40 backdrop-blur-md border border-white/50 px-4 py-2 rounded-full mb-6 shadow-sm">
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
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mb-16">
              <button className="bg-[#0053ce] text-white px-6 md:px-8 py-2.5 md:py-4 rounded-full font-medium text-sm md:text-lg hover:bg-[#0053ce]/90 transition-all shadow-xl shadow-[#0053ce]/25">
                Get started
              </button>
              <button className="bg-[#94a6fe] text-[#243889] px-6 md:px-8 py-2.5 md:py-4 rounded-full font-medium text-sm md:text-lg hover:bg-[#94a6fe]/80 transition-all">
                Book a demo
              </button>
            </div>

            {/* Hero dashboard visual */}
            <div className="relative max-w-5xl mx-auto">
              <div className="absolute -inset-4 bg-[#0053ce]/5 blur-3xl rounded-full pointer-events-none" />
              <img
                src="/bookkeeping-hero.webp"
                alt="Ace Global bookkeeping dashboard"
                className="relative w-full rounded-3xl shadow-2xl border border-[#c2c6d8]/30 animate-float"
              />
            </div>
          </div>
        </section>

        {/* Metric cards trio */}
        <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b from-white via-[#f2f3ff] to-[#e3e7ff]">
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <div className="absolute top-10 left-1/4 w-[26rem] h-[26rem] bg-[#196bfa]/15 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-10 w-[24rem] h-[24rem] bg-[#94a6fe]/30 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-6">
            <h2 className="text-[28px] md:text-[40px] font-medium leading-[1.2] text-[#00174c] text-center mb-12 max-w-2xl mx-auto">
              The numbers that matter, ready at every close.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  label: "Runway",
                  value: "18 months",
                  desc: "Always know how much time you have before you need to raise or cut.",
                  sub: "Healthy",
                  subColor: "text-green-600",
                },
                {
                  label: "Profit & Loss",
                  value: "+$35,350",
                  desc: "Clear performance every month — revenue, expenses, and net income.",
                  sub: "Net income · June",
                  subColor: "text-[#727687]",
                },
                {
                  label: "Balance Sheet",
                  value: "$142,000",
                  desc: "Investor-ready statements that hold up with lenders and the IRS.",
                  sub: "Cash balance",
                  subColor: "text-[#727687]",
                },
              ].map((m) => (
                <div
                  key={m.label}
                  className="bg-white/55 backdrop-blur-xl border border-white/60 rounded-3xl p-8 flex flex-col shadow-xl shadow-[#0053ce]/5"
                >
                  <p className="text-sm font-medium text-[#0053ce] mb-3">{m.label}</p>
                  <p className="text-4xl font-semibold text-[#00174c] mb-1">{m.value}</p>
                  <p className={`text-sm font-medium mb-5 ${m.subColor}`}>{m.sub}</p>
                  <p className="text-[#727687] text-sm leading-relaxed">{m.desc}</p>
                </div>
              ))}
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

        {/* Comparison table */}
        <section className="py-16 md:py-[120px] bg-white">
          <div className="max-w-[1100px] mx-auto px-5 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-[28px] md:text-[40px] font-medium leading-[1.2] text-[#00174c] mb-3">
                Ace Global vs. the alternatives
              </h2>
              <p className="text-[#727687] text-lg">
                A modern accounting team vs. the old way of doing books.
              </p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-[#c2c6d8]/30 shadow-sm">
              <div className="grid grid-cols-4 bg-[#172d65] text-white text-sm font-medium">
                <div className="p-4 md:p-5" />
                <div className="p-4 md:p-5 text-center bg-[#0053ce] rounded-tl-2xl">Ace Global</div>
                <div className="p-4 md:p-5 text-center text-[#dbe1ff]/80">Local CPA firm</div>
                <div className="p-4 md:p-5 text-center text-[#dbe1ff]/80">DIY spreadsheets</div>
              </div>
              {[
                ["All-inclusive pricing", true, false, false],
                ["Real-time finance dashboard", true, false, false],
                ["AI agent on WhatsApp/iMessage", true, false, false],
                ["Monthly, quarterly, or annual close", true, true, false],
                ["Dedicated bookkeeper + CPA", true, true, false],
                ["Quick onboarding", true, false, false],
                ["No long-term contracts", true, false, true],
                ["Investor-ready statements", true, true, false],
              ].map((row, i) => (
                <div
                  key={row[0] as string}
                  className={`grid grid-cols-4 text-sm ${i % 2 ? "bg-[#f2f3ff]" : "bg-white"}`}
                >
                  <div className="p-4 md:p-5 text-[#00174c] font-medium">{row[0]}</div>
                  {[row[1], row[2], row[3]].map((v, j) => (
                    <div key={j} className="p-4 md:p-5 flex items-center justify-center">
                      {v ? (
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
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials strip */}
        <section className="py-16 md:py-[120px] bg-[#f2f3ff]">
          <div className="max-w-[1280px] mx-auto px-5 md:px-6">
            <h2 className="text-[28px] md:text-[40px] font-medium leading-[1.2] tracking-[-0.01em] text-[#00174c] text-center mb-12 max-w-2xl mx-auto">
              &ldquo;Clean books, every month, without me chasing anyone.&rdquo;
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  quote:
                    "Onboarding was effortless. Within a week, our books were cleaned up, reconciled, and ready for tax season.",
                  name: "Sophie Lin",
                  role: "Owner, Brightwave Salon",
                  initials: "SL",
                  color: "bg-[#0053ce]",
                },
                {
                  quote:
                    "We finally have clean financials every month. Ace Global helped us understand cash flow and what to set aside for taxes.",
                  name: "Priya Kapoor",
                  role: "Owner, Kapoor Dental Group",
                  initials: "PK",
                  color: "bg-[#172d65]",
                },
                {
                  quote:
                    "They helped us get payroll, sales tax, and monthly bookkeeping under control. I can focus on customers instead of paperwork.",
                  name: "Rachel Chen",
                  role: "Owner, Bay Area Café",
                  initials: "RC",
                  color: "bg-[#4658aa]",
                },
              ].map((t) => (
                <div
                  key={t.name}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-[#c2c6d8]/20 flex flex-col gap-4"
                >
                  <div className="flex text-yellow-400 text-sm">{"★★★★★"}</div>
                  <p className="text-[#424655] text-sm leading-relaxed flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-2 border-t border-[#c2c6d8]/20">
                    <div
                      className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center text-white text-xs font-semibold shrink-0`}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-[#00174c] text-sm font-medium">{t.name}</p>
                      <p className="text-[#727687] text-xs">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}

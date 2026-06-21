import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import ResourceLibrary from "@/components/ResourceLibrary";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Resources | Ace Global",
  description:
    "Guides, templates, and articles on bookkeeping, corporate taxes, payroll, and compliance for small businesses — written by our CPA team.",
};

const topics = [
  {
    title: "Bookkeeping",
    desc: "Closing your books, reading financials, and staying audit-ready.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 17v-6h6v6m-3-10V4m-7 13a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10z"
      />
    ),
  },
  {
    title: "Corporate Taxes",
    desc: "Filing deadlines, entity elections, and lowering your tax bill.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 7h6m-6 4h6m-6 4h4M5 5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5z"
      />
    ),
  },
  {
    title: "Payroll",
    desc: "Paying your team, classification, and payroll-tax basics.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4z"
      />
    ),
  },
  {
    title: "Compliance",
    desc: "Sales tax, annual reports, and staying on the right side of the rules.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    ),
  },
];

export default function ResourcesPage() {
  return (
    <>
      <ScrollReveal />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 md:pt-40 pb-12 md:pb-16 overflow-hidden bg-gradient-to-b from-[#e3e7ff] via-[#f2f3ff] to-white">
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <div className="absolute -top-24 -left-24 w-[28rem] h-[28rem] bg-[#0053ce]/25 rounded-full blur-3xl" />
            <div className="absolute top-32 -right-24 w-[30rem] h-[30rem] bg-[#94a6fe]/40 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-white/40 backdrop-blur-md border border-white/50 px-4 py-2 rounded-full mb-6 shadow-sm">
              <span className="text-sm font-medium tracking-wide text-[#243889]">Resources</span>
            </div>
            <h1 className="text-[32px] sm:text-[40px] md:text-[60px] font-medium leading-[1.12] md:leading-[1.1] tracking-[-0.02em] text-[#00174c] max-w-4xl mx-auto mb-5 md:mb-6">
              Guides to run your{" "}
              <span className="text-[#0053ce]">business finances.</span>
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-[#727687] max-w-2xl mx-auto">
              Practical guides, templates, and answers on bookkeeping, taxes, payroll, and
              compliance — written by the CPA team that does this every day.
            </p>
          </div>
        </section>

        {/* Featured article */}
        <section className="pb-16 md:pb-20 bg-white">
          <div className="max-w-[1280px] mx-auto px-5 md:px-6">
            <a
              href="#"
              className="group block bg-[#172d65] text-white rounded-[40px] p-8 md:p-14 overflow-hidden relative"
            >
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#0053ce]/40 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 max-w-2xl">
                <span className="inline-block text-xs font-medium bg-[#94a6fe] text-[#243889] px-3 py-1 rounded-full mb-6">
                  Featured guide
                </span>
                <h2 className="text-[26px] md:text-[40px] font-medium leading-[1.2] mb-4">
                  The complete guide to getting tax-ready as a small business
                </h2>
                <p className="text-[#dbe1ff]/70 text-base md:text-lg leading-relaxed mb-8">
                  Everything you need before filing — clean books, the right deductions, quarterly
                  estimates, and the documents your accountant actually needs.
                </p>
                <span className="inline-flex items-center gap-2 text-white font-medium group-hover:gap-3 transition-all">
                  Read the guide
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </div>
            </a>
          </div>
        </section>

        {/* Browse by topic */}
        <section className="relative py-16 md:py-[120px] overflow-hidden bg-gradient-to-br from-[#172d65] via-[#1f3a82] to-[#0053ce]">
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <div className="absolute -top-20 right-10 w-[26rem] h-[26rem] bg-[#94a6fe]/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-16 w-[28rem] h-[28rem] bg-[#196bfa]/40 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-6">
            <h2 className="text-[28px] md:text-[40px] font-medium leading-[1.2] text-white text-center mb-12">
              Browse by topic
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {topics.map((t) => (
                <div
                  key={t.title}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/25 flex items-center justify-center mb-5">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {t.icon}
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{t.title}</h3>
                  <p className="text-sm text-[#dbe1ff]/80 leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Resource library (filterable) */}
        <section className="relative py-16 md:py-[120px] overflow-hidden bg-gradient-to-b from-white via-[#f2f3ff] to-[#e3e7ff]">
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <div className="absolute top-20 -left-20 w-[26rem] h-[26rem] bg-[#196bfa]/15 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-1/4 w-[24rem] h-[24rem] bg-[#94a6fe]/30 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-6">
            <h2 className="text-[28px] md:text-[40px] font-medium leading-[1.2] text-[#00174c] text-center mb-4">
              The library
            </h2>
            <p className="text-[#727687] text-lg text-center mb-12 max-w-2xl mx-auto">
              Filter by topic to find the guide, article, or template you need.
            </p>
            <ResourceLibrary />
          </div>
        </section>

        {/* Newsletter */}
        <section className="relative pt-16 md:pt-[120px] pb-16 md:pb-[120px] overflow-hidden bg-gradient-to-b from-[#e3e7ff] to-white px-5 md:px-6">
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[20rem] bg-[#94a6fe]/30 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 max-w-[1280px] mx-auto bg-white/50 backdrop-blur-xl border border-white/60 rounded-[32px] md:rounded-[48px] p-8 md:p-16 text-center shadow-xl shadow-[#0053ce]/5">
            <h2 className="text-[26px] md:text-[40px] font-medium leading-[1.2] text-[#00174c] mb-4 max-w-2xl mx-auto">
              Finance tips for founders, once a month.
            </h2>
            <p className="text-[#727687] text-base md:text-lg mb-8 max-w-xl mx-auto">
              Deadlines, deductions, and practical advice — no spam, unsubscribe anytime.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="you@company.com"
                className="flex-1 px-5 py-3.5 rounded-full bg-white border border-[#c2c6d8]/40 text-[#00174c] placeholder:text-[#727687] outline-none focus:border-[#0053ce] transition-colors"
              />
              <button
                type="submit"
                className="bg-[#0053ce] text-white px-7 py-3.5 rounded-full font-medium text-sm hover:bg-[#0053ce]/90 transition-all shadow-lg shadow-[#0053ce]/20 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}

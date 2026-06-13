import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import CountUp from "@/components/CountUp";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Corporate Taxes | Ace Global",
  description:
    "Delaware Franchise Tax, federal and state corporate income taxes — prepared and filed on time by your CPA team.",
};

const features = [
  {
    tag: "Delaware Franchise Tax",
    tagStyle: "bg-[#0053ce]/10 text-[#0053ce]",
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
    tagStyle: "bg-[#D6F5E3] text-[#1A7A44]",
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
    tagStyle: "bg-[#94a6fe]/20 text-[#243889]",
    title: "Every deadline tracked. Every filing confirmed.",
    desc: "Your AI agent monitors every federal and state due date, collects what's needed ahead of time, and notifies you the moment each return is filed.",
    bullets: [
      "All deadlines tracked automatically",
      "Documents collected ahead of time",
      "Filing confirmations sent to you",
    ],
  },
];

function TaxMockup() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#c2c6d8]/20 max-w-md w-full mx-auto">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm font-medium text-[#00174c]">Tax Filing Status</p>
        <span className="text-xs bg-blue-100 text-[#0053ce] px-2 py-1 rounded-full font-medium">
          All Filed ✓
        </span>
      </div>
      {[
        { label: "Delaware Franchise Tax", date: "Mar 1", status: "Filed", ok: true },
        { label: "Federal Corp. Tax (1120)", date: "Apr 15", status: "Filed", ok: true },
        { label: "CA State Corp. Tax", date: "Apr 15", status: "Filed", ok: true },
        { label: "Q3 Estimated Tax", date: "Sep 15", status: "Upcoming", ok: false },
      ].map((row) => (
        <div
          key={row.label}
          className="flex justify-between items-center py-3 border-b border-[#c2c6d8]/20 last:border-0"
        >
          <div>
            <p className="text-sm font-medium text-[#00174c]">{row.label}</p>
            <p className="text-xs text-[#727687]">Due {row.date}</p>
          </div>
          <span
            className={`text-xs rounded-full px-3 py-1 font-medium ${
              row.ok ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {row.status}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function CorporateTaxesPage() {
  return (
    <>
      <ScrollReveal />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 bg-white overflow-hidden">
          <div className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-[#94a6fe]/20 border border-[#94a6fe]/30 px-4 py-2 rounded-full mb-6">
              <span className="text-sm font-medium tracking-wide text-[#243889]">
                Corporate Taxes
              </span>
            </div>
            <h1 className="text-[32px] sm:text-[40px] md:text-[60px] font-medium leading-[1.12] md:leading-[1.1] tracking-[-0.02em] text-[#00174c] max-w-4xl mx-auto mb-5 md:mb-6">
              Get your Delaware Franchise Tax, federal &amp; state taxes —{" "}
              <span className="text-[#0053ce]">filed on time, every time.</span>
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-[#727687] max-w-2xl mx-auto mb-8 md:mb-12">
              Your CPA team and AI agent prepare every filing, track every deadline, and keep your
              company compliant — without you chasing forms or notices.
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
              Taxes handled, deadlines covered.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:h-[620px]">
              {/* Tax experts */}
              <div className="md:col-span-7 bg-white p-8 rounded-3xl shadow-sm border border-[#c2c6d8]/20 flex flex-col justify-between overflow-hidden group">
                <div>
                  <h3 className="text-2xl font-medium text-[#00174c] mb-2">
                    Dedicated tax experts
                  </h3>
                  <p className="text-[#727687]">
                    CPAs and EAs who handle federal, state, and franchise filings — from single-state
                    LLCs to complex multi-state C-Corps. They prepare, review, and file every return.
                  </p>
                </div>
                <div className="mt-8 flex gap-4 transition-transform duration-500 group-hover:translate-x-2">
                  {["/avatar-2.webp", "/avatar-3.webp", "/avatar-1.webp"].map((src) => (
                    <img
                      key={src}
                      src={src}
                      alt="Tax expert"
                      className="w-16 h-16 rounded-full object-cover border-4 border-[#ebedff]"
                    />
                  ))}
                  <div className="w-16 h-16 rounded-full bg-[#0053ce]/10 flex items-center justify-center text-[#0053ce] font-semibold text-sm">
                    +9
                  </div>
                </div>
              </div>

              {/* Penalties avoided stat */}
              <div className="md:col-span-5 bg-[#0053ce] p-8 rounded-3xl shadow-lg flex flex-col justify-between text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-2xl font-medium mb-2">$2M+ Avoided</h3>
                  <p className="opacity-80">
                    Penalties and interest avoided by filing on time, every time.
                  </p>
                </div>
                <CountUp
                  value={2140500}
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

              {/* Filing autopilot wide card */}
              <div className="md:col-span-12 bg-[#172d65] text-white p-8 rounded-3xl shadow-sm flex flex-col md:flex-row items-center gap-8 group">
                <div className="flex-1">
                  <h3 className="text-2xl font-medium mb-2">Filings on autopilot</h3>
                  <p className="text-[#dbe1ff]/60">
                    Your AI agent tracks every federal and state deadline, collects what's needed
                    ahead of time, and confirms each return the moment it's filed.
                  </p>
                </div>
                <div className="w-full md:w-80 bg-white/10 rounded-2xl p-5 group-hover:scale-[1.02] transition-transform">
                  <p className="text-xs font-medium text-[#b2c5ff] mb-3 uppercase tracking-wider">
                    Upcoming Deadlines
                  </p>
                  {[
                    { name: "Delaware Franchise Tax", note: "Filed · Mar 1" },
                    { name: "Federal Corp. Tax (1120)", note: "Filed · Apr 15" },
                    { name: "Q3 Estimated Tax", note: "Prepared · Sep 15" },
                  ].map((row) => (
                    <div
                      key={row.name}
                      className="flex justify-between items-center py-2 border-b border-white/10 last:border-0"
                    >
                      <div>
                        <p className="text-sm text-white">{row.name}</p>
                        <span className="text-[10px] bg-blue-500/20 text-[#b2c5ff] px-2 py-0.5 rounded-full font-medium">
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
                  <TaxMockup />
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

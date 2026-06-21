import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import CountUp from "@/components/CountUp";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Company Formation | Ace Global",
  description:
    "Form your LLC or C-Corp the right way — incorporation, EIN, registered agent, and compliance handled end to end by your CPA team.",
};

const features = [
  {
    tag: "Pick the right entity",
    tagStyle: "bg-[#0053ce]/10 text-[#0053ce]",
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
    tagStyle: "bg-[#D6F5E3] text-[#1A7A44]",
    title: "Incorporation papers prepared and filed.",
    desc: "We draft and file your formation documents, secure your EIN, and prepare your operating agreement or bylaws — so you're legally ready to open a bank account and sign contracts.",
    bullets: [
      "Articles of incorporation / organization",
      "Federal EIN obtained for you",
      "Operating agreement or bylaws",
    ],
  },
  {
    tag: "Stay compliant",
    tagStyle: "bg-[#94a6fe]/20 text-[#243889]",
    title: "Registered agent and compliance, on autopilot.",
    desc: "Registered agent service, annual reports, and franchise tax tracked from the start — with your AI agent flagging every deadline before it hits.",
    bullets: [
      "Registered agent in every state",
      "Annual reports & franchise tax tracked",
      "BOI / beneficial ownership filing",
    ],
  },
];

function FormationMockup() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#c2c6d8]/20 max-w-md w-full mx-auto">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm font-medium text-[#00174c]">Formation Status</p>
        <span className="text-xs bg-blue-100 text-[#0053ce] px-2 py-1 rounded-full font-medium">
          In progress
        </span>
      </div>
      {[
        { label: "Entity selected — Delaware C-Corp", status: "Done", ok: true },
        { label: "Articles of incorporation filed", status: "Done", ok: true },
        { label: "EIN obtained", status: "Done", ok: true },
        { label: "Registered agent active", status: "Done", ok: true },
        { label: "Bylaws & founder docs", status: "Drafting", ok: false },
      ].map((row) => (
        <div
          key={row.label}
          className="flex justify-between items-center py-3 border-b border-[#c2c6d8]/20 last:border-0"
        >
          <span className="text-sm text-[#424655]">{row.label}</span>
          <span
            className={`text-xs rounded-full px-3 py-1 font-medium ${
              row.ok ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {row.status}
          </span>
        </div>
      ))}
      <div className="mt-4 pt-4 border-t border-[#c2c6d8]/20 flex items-center gap-2 text-xs text-[#727687]">
        <span className="w-2 h-2 rounded-full bg-green-400" />
        Handled by your formation specialist
      </div>
    </div>
  );
}

export default function CompanyFormationPage() {
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
              <span className="text-sm font-medium tracking-wide text-[#243889]">
                Company Formation
              </span>
            </div>
            <h1 className="text-[32px] sm:text-[40px] md:text-[60px] font-medium leading-[1.12] md:leading-[1.1] tracking-[-0.02em] text-[#00174c] max-w-4xl mx-auto mb-5 md:mb-6">
              Form your company —{" "}
              <span className="text-[#0053ce]">incorporated, compliant, and ready to operate.</span>
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-[#727687] max-w-2xl mx-auto mb-8 md:mb-12">
              From choosing the right entity to your EIN, registered agent, and first compliance
              filing — your CPA team and AI agent handle it end to end.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mb-4">
              <button className="bg-[#0053ce] text-white px-6 md:px-8 py-2.5 md:py-4 rounded-full font-medium text-sm md:text-lg hover:bg-[#0053ce]/90 transition-all shadow-xl shadow-[#0053ce]/25">
                Start your company
              </button>
              <button className="bg-[#94a6fe] text-[#243889] px-6 md:px-8 py-2.5 md:py-4 rounded-full font-medium text-sm md:text-lg hover:bg-[#94a6fe]/80 transition-all">
                Book a demo
              </button>
            </div>
            <p className="text-xs text-[#727687]">
              No legal fees · Cancel anytime · Most companies formed in days
            </p>
          </div>
        </section>

        {/* What's included — 3 feature cards (glass) */}
        <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b from-white via-[#f2f3ff] to-[#e3e7ff]">
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <div className="absolute top-10 left-1/4 w-[26rem] h-[26rem] bg-[#196bfa]/15 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-10 w-[24rem] h-[24rem] bg-[#94a6fe]/30 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-[28px] md:text-[40px] font-medium leading-[1.2] text-[#00174c] mb-3">
                Everything you need to start, in one place.
              </h2>
              <p className="text-[#727687] text-lg max-w-xl mx-auto">
                Incorporation, tax setup, and compliance — no scattered registrations or surprise filings.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Incorporation",
                  desc: "Articles of incorporation or organization drafted and filed in Delaware or your home state.",
                },
                {
                  title: "EIN & Tax Setup",
                  desc: "Your federal EIN obtained, S-Corp election handled where it saves you money, and state tax accounts registered.",
                },
                {
                  title: "Registered Agent & Compliance",
                  desc: "Registered agent service plus annual reports, franchise tax, and BOI filings tracked from day one.",
                },
              ].map((c) => (
                <div
                  key={c.title}
                  className="bg-white/55 backdrop-blur-xl border border-white/60 rounded-3xl p-8 flex flex-col shadow-xl shadow-[#0053ce]/5"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#0053ce]/10 flex items-center justify-center text-[#0053ce] mb-5">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2m-2 0h-4M5 21H3m2 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-4a1 1 0 011-1h2a1 1 0 011 1v4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-[#00174c] mb-2">{c.title}</h3>
                  <p className="text-[#727687] text-sm leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Entity comparison cards */}
        <section className="py-16 md:py-24 bg-[#f2f3ff]">
          <div className="max-w-[1280px] mx-auto px-5 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-[28px] md:text-[40px] font-medium leading-[1.2] text-[#00174c] mb-3">
                Not sure which entity to choose?
              </h2>
              <p className="text-[#727687] text-lg max-w-xl mx-auto">
                We help you weigh liability, taxes, and fundraising before you file.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  type: "LLC",
                  best: "Best for small businesses & solo founders",
                  desc: "Simple to run, pass-through taxation, and strong liability protection without much paperwork.",
                },
                {
                  type: "S-Corp",
                  best: "Best for profitable owner-operators",
                  desc: "An election, not an entity — can cut self-employment tax once you're consistently profitable.",
                },
                {
                  type: "C-Corp",
                  best: "Best for startups raising capital",
                  desc: "The standard for venture funding, stock options, and Delaware incorporation.",
                },
              ].map((c) => (
                <div
                  key={c.type}
                  className="bg-white rounded-3xl p-8 flex flex-col border border-[#c2c6d8]/20 shadow-sm"
                >
                  <h3 className="text-2xl font-semibold text-[#00174c] mb-1">{c.type}</h3>
                  <p className="text-sm font-medium text-[#0053ce] mb-4">{c.best}</p>
                  <p className="text-[#727687] text-sm leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bento grid */}
        <section className="py-16 md:py-[120px] bg-[#f2f3ff]">
          <div className="max-w-[1280px] mx-auto px-5 md:px-6">
            <h2 className="text-[28px] md:text-[40px] font-medium leading-[1.2] tracking-[-0.01em] text-[#00174c] text-center mb-12">
              Incorporated right, compliant from day one.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:h-[620px]">
              {/* Formation specialists */}
              <div className="md:col-span-7 bg-white p-8 rounded-3xl shadow-sm border border-[#c2c6d8]/20 flex flex-col justify-between overflow-hidden group">
                <div>
                  <h3 className="text-2xl font-medium text-[#00174c] mb-2">
                    Dedicated formation specialists
                  </h3>
                  <p className="text-[#727687]">
                    Specialists and CPAs who pick the right entity, file your paperwork, and hand you
                    a company that&apos;s ready to bank, hire, and raise — without the legal bill.
                  </p>
                </div>
                <div className="mt-8 flex gap-4 transition-transform duration-500 group-hover:translate-x-2">
                  {["/avatar-1.webp", "/avatar-3.webp", "/avatar-2.webp"].map((src) => (
                    <img
                      key={src}
                      src={src}
                      alt="Formation specialist"
                      className="w-16 h-16 rounded-full object-cover border-4 border-[#ebedff]"
                    />
                  ))}
                  <div className="w-16 h-16 rounded-full bg-[#0053ce]/10 flex items-center justify-center text-[#0053ce] font-semibold text-sm">
                    +8
                  </div>
                </div>
              </div>

              {/* Companies formed stat */}
              <div className="md:col-span-5 bg-[#0053ce] p-8 rounded-3xl shadow-lg flex flex-col justify-between text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-2xl font-medium mb-2">Companies formed</h3>
                  <p className="opacity-80">
                    LLCs and corporations launched for founders across all 50 states.
                  </p>
                </div>
                <CountUp
                  value={3200}
                  suffix="+"
                  duration={2200}
                  className="text-5xl font-semibold mt-8 relative z-10 tabular-nums block"
                />
                <div className="absolute bottom-0 right-0 opacity-20 w-full pointer-events-none">
                  <svg viewBox="0 0 400 200" className="w-full">
                    <path d="M0,150 Q100,100 200,120 T400,50 L400,200 L0,200 Z" fill="white" />
                  </svg>
                </div>
              </div>

              {/* Formation autopilot wide card */}
              <div className="md:col-span-12 bg-[#172d65] text-white p-8 rounded-3xl shadow-sm flex flex-col md:flex-row items-center gap-8 group">
                <div className="flex-1">
                  <h3 className="text-2xl font-medium mb-2">Compliance on autopilot</h3>
                  <p className="text-[#dbe1ff]/60">
                    The day you incorporate, your AI agent starts tracking annual reports, franchise
                    tax, and beneficial-ownership deadlines — and books are ready the moment you bill.
                  </p>
                </div>
                <div className="w-full md:w-80 bg-white/10 rounded-2xl p-5 group-hover:scale-[1.02] transition-transform">
                  <p className="text-xs font-medium text-[#b2c5ff] mb-3 uppercase tracking-wider">
                    Formation Checklist
                  </p>
                  {[
                    { name: "Articles filed", note: "State approved" },
                    { name: "EIN issued", note: "IRS confirmed" },
                    { name: "Registered agent", note: "Active · all states" },
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
                  <FormationMockup />
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
                A modern formation team vs. filing services and law firms.
              </p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-[#c2c6d8]/30 shadow-sm">
              <div className="grid grid-cols-4 bg-[#172d65] text-white text-sm font-medium">
                <div className="p-4 md:p-5" />
                <div className="p-4 md:p-5 text-center bg-[#0053ce]">Ace Global</div>
                <div className="p-4 md:p-5 text-center text-[#dbe1ff]/80">Filing service</div>
                <div className="p-4 md:p-5 text-center text-[#dbe1ff]/80">Law firm</div>
              </div>
              {[
                ["Entity selection guidance", true, false, true],
                ["Incorporation filed for you", true, true, true],
                ["EIN & S-Corp election", true, false, true],
                ["Registered agent included", true, true, false],
                ["Ongoing compliance tracking", true, false, false],
                ["Bookkeeping & taxes from day one", true, false, false],
                ["AI agent on WhatsApp/iMessage", true, false, false],
                ["Flat, all-inclusive pricing", true, false, false],
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
              &ldquo;Incorporated in days, compliant ever since.&rdquo;
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  quote:
                    "They picked the right entity, filed everything, and got our EIN fast. We were signing contracts within the week.",
                  name: "Maya Robinson",
                  role: "Founder, Northwind Goods",
                  initials: "MR",
                  color: "bg-[#0053ce]",
                },
                {
                  quote:
                    "As a foreign founder, forming a Delaware C-Corp felt impossible. Ace Global made it simple and kept us compliant.",
                  name: "Diego Alvarez",
                  role: "CEO, Lumen Labs",
                  initials: "DA",
                  color: "bg-[#172d65]",
                },
                {
                  quote:
                    "Formation, bookkeeping, and taxes from the same team meant nothing fell through the cracks at the start.",
                  name: "Hannah Patel",
                  role: "Owner, Patel Studio",
                  initials: "HP",
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

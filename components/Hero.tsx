import Link from "next/link";
import MinimalBackground from "./MinimalBackground";
import Chart3D from "./Chart3D";

export default function Hero() {
  return (
    <section className="relative pt-40 pb-[120px] bg-white overflow-hidden">
      {/* Minimal animated background — confined to the top so it stays behind
          the headline and never bleeds around the dashboard mockup */}
      <div className="absolute top-0 left-0 right-0 h-[620px] overflow-hidden pointer-events-none">
        <MinimalBackground />
        {/* Soft white fade so content stays readable and the particles dissolve before the dashboard */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#94a6fe]/20 border border-[#94a6fe]/30 px-4 py-2 rounded-full mb-6">
          <div className="flex text-[#0053ce] text-base">
            {"★★★★★"}
          </div>
          <span className="text-sm font-medium tracking-wide text-[#243889]">
            5-star bookkeeping for startups
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-[40px] md:text-[60px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#00174c] max-w-4xl mx-auto mb-6">
          Your startup&apos;s books &amp; taxes —{" "}
          <span className="text-[#0053ce]">completely off your plate.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg leading-relaxed text-[#727687] max-w-2xl mx-auto mb-12">
          Ace Global is the all-in-one accounting platform that combines expert CPAs with powerful
          software to handle everything for you.
        </p>

        {/* CTAs */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-20">
          <button className="bg-[#0053ce] text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-[#0053ce]/90 transition-all shadow-xl shadow-[#0053ce]/25">
            Get started
          </button>
          <button className="bg-[#94a6fe] text-[#243889] px-8 py-4 rounded-full font-medium text-lg hover:bg-[#94a6fe]/80 transition-all">
            Book a demo
          </button>
        </div>

        {/* Hero dashboard mockup */}
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute -inset-4 bg-[#0053ce]/5 blur-3xl rounded-full" />
          <div className="relative w-full rounded-3xl shadow-2xl border border-[#c2c6d8]/30 animate-float overflow-hidden bg-white">
            {/* Dashboard mockup */}
            <div className="bg-[#172d65] px-6 py-4 flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 bg-white/10 rounded-full h-6 mx-4" />
            </div>
            <div className="p-8 bg-[#f2f3ff]">
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: "Monthly Revenue", value: "$48,200", change: "+12%", up: true },
                  { label: "Cash Runway", value: "18 months", change: "Healthy", up: true },
                  { label: "Books Status", value: "Closed", change: "June 2026", up: true },
                ].map((card) => (
                  <div key={card.label} className="bg-white rounded-2xl p-4 shadow-sm border border-[#c2c6d8]/20">
                    <p className="text-xs text-[#727687] mb-1">{card.label}</p>
                    <p className="text-xl font-semibold text-[#00174c]">{card.value}</p>
                    <p className={`text-xs font-medium mt-1 ${card.up ? "text-green-600" : "text-red-500"}`}>
                      {card.change}
                    </p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Revenue chart */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-4 shadow-sm border border-[#c2c6d8]/20">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium text-[#00174c]">Revenue Growth — Last 7 Months</p>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">On Track</span>
                  </div>
                  {/* Embedded animated 3D bar chart */}
                  <div className="h-52 w-full">
                    <Chart3D />
                  </div>
                </div>

                {/* Your dedicated CPA team */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#c2c6d8]/20 flex flex-col">
                  <p className="text-sm font-medium text-[#00174c] mb-3">Your dedicated team</p>

                  {[
                    { img: "/cpa-1.webp", name: "Elena Marsh", role: "Lead CPA" },
                    { img: "/cpa-2.webp", name: "David Lin", role: "Tax Specialist" },
                  ].map((m) => (
                    <div key={m.name} className="flex items-center gap-3 mb-3">
                      <img
                        src={m.img}
                        alt={m.name}
                        className="w-9 h-9 rounded-full object-cover border border-[#c2c6d8]/30"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-[#00174c] truncate">{m.name}</p>
                        <p className="text-[11px] text-[#727687] truncate">{m.role}</p>
                      </div>
                      <span className="ml-auto w-2 h-2 rounded-full bg-green-400 shrink-0" />
                    </div>
                  ))}

                  <div className="border-t border-[#c2c6d8]/20 mt-1 pt-3 space-y-2.5">
                    {[
                      "Reconciled May books",
                      "Filed DE franchise tax",
                      "Sent investor report",
                    ].map((a) => (
                      <div key={a} className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-[9px] shrink-0">
                          ✓
                        </span>
                        <span className="text-[11px] text-[#424655] truncate">{a}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

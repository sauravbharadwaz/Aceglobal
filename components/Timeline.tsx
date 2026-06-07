const press = ["TechCrunch", "Forbes", "WSJ", "Fast Company", "Bloomberg"];

const steps = [
  {
    n: "1",
    title: "Seamless Onboarding",
    desc: "Connect your bank accounts and accounting software in minutes. We'll handle the historical cleanup.",
  },
  {
    n: "2",
    title: "Switch to Autopilot",
    desc: "Your dedicated CPA team handles your monthly books and tax filings. You just watch the dashboard.",
  },
  {
    n: "3",
    title: "Back to Building",
    desc: "Focus on your product and customers. We'll notify you when taxes are filed and books are closed.",
  },
];

export default function Timeline() {
  return (
    <section className="py-[120px] bg-white">
      <div className="max-w-[1280px] mx-auto px-5 md:px-6">
        {/* Press logos — running marquee */}
        <div className="flex items-center gap-8 mb-24">
          <span className="text-sm font-semibold text-[#00174c] opacity-40 flex-shrink-0">
            Featured on:
          </span>
          <div className="group relative flex-1 overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />
            <div
              className="flex w-max items-center gap-16 opacity-40"
              style={{ animation: "marquee 26s linear infinite" }}
            >
              {[...press, ...press].map((p, i) => (
                <span
                  key={`${p}-${i}`}
                  className="text-base font-bold text-[#00174c] tracking-tight grayscale whitespace-nowrap"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Steps */}
          <div className="space-y-16">
            {steps.map((s) => (
              <div key={s.n} className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#0053ce] text-white flex items-center justify-center font-bold text-xl">
                  {s.n}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-[#00174c] mb-2">{s.title}</h3>
                  <p className="text-[#727687] text-lg leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Onboarding mockup */}
          <div className="bg-[#ebedff] rounded-[48px] p-8 md:p-16 relative">
            <div className="bg-white rounded-2xl shadow-2xl border border-white/50 p-6">
              <p className="text-sm font-semibold text-[#00174c] mb-6">Connect your accounts</p>
              {[
                { name: "Mercury Bank", status: "Connected", color: "bg-green-100 text-green-700" },
                { name: "Brex", status: "Connected", color: "bg-green-100 text-green-700" },
                { name: "QuickBooks", status: "Connected", color: "bg-green-100 text-green-700" },
                { name: "Stripe", status: "Syncing…", color: "bg-blue-100 text-blue-700" },
              ].map((item) => (
                <div key={item.name} className="flex justify-between items-center py-3 border-b border-[#c2c6d8]/20 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#f2f3ff] border border-[#c2c6d8]/30 flex items-center justify-center text-xs font-bold text-[#0053ce]">
                      {item.name[0]}
                    </div>
                    <span className="text-sm font-medium text-[#00174c]">{item.name}</span>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold ${item.color}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-3xl shadow-xl border border-[#c2c6d8]/20 hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-lg">✓</div>
                <div>
                  <p className="text-xs text-[#727687]">Onboarding Status</p>
                  <p className="text-sm font-semibold text-[#00174c]">100% Complete</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    number: "01",
    title: "Onboard in 15 minutes",
    description:
      "Connect your bank accounts and accounting tools. Our team handles the rest — no lengthy setup calls or complex configurations.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Accounting goes on autopilot",
    description:
      "Tax deadlines, monthly reconciliation, and bookkeeping run automatically. Your dedicated CPA team monitors everything and flags anything that needs your attention.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Focus on building your startup",
    description:
      "Forget about finances and focus on growth. Get clean financial reports whenever you need them, and expert advice when it matters.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="platform" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">
            How it works
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Up and running in minutes
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Three steps to put your finances on autopilot — forever.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-px bg-gradient-to-r from-indigo-500/50 to-purple-500/50" />

          {steps.map((step, i) => (
            <div key={step.number} className="relative flex flex-col items-center text-center md:items-start md:text-left">
              {/* Number pill */}
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-sm mb-6 relative z-10">
                {i + 1}
              </div>

              <div className="card-glass rounded-2xl p-6 w-full">
                <div className="text-indigo-400 mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

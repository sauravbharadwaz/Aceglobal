const details = [
  {
    tag: "Bookkeeping",
    title: "Clean books, every single month",
    description:
      "Say goodbye to messy spreadsheets and year-end scrambles. Our team closes your books on a schedule that works for you — monthly, quarterly, or annually — with accurate P&L statements, balance sheets, and cash flow reports ready when you need them.",
    bullets: [
      "Monthly, quarterly, or annual close",
      "Bank & credit card reconciliation",
      "Accounts payable & receivable tracking",
      "Clean financial statements for investors",
      "Dedicated bookkeeper for your account",
    ],
    mockup: "bookkeeping",
    reverse: false,
  },
  {
    tag: "Corporate Taxes",
    title: "Never miss a tax deadline again",
    description:
      "From Delaware Franchise Tax to federal and state corporate income taxes, our CPAs handle every filing accurately and on time. No more scrambling at year-end or surprise penalties.",
    bullets: [
      "Delaware Franchise Tax filing",
      "Federal corporate income tax",
      "Multi-state income tax returns",
      "Estimated tax payments tracked",
      "Proactive deadline reminders",
    ],
    mockup: "taxes",
    reverse: true,
  },
];

function MockupCard({ type }: { type: string }) {
  if (type === "bookkeeping") {
    return (
      <div className="card-glass rounded-2xl p-6 w-full max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <span className="text-white font-medium">Monthly Report</span>
          <span className="text-xs text-green-400 bg-green-400/10 border border-green-400/20 rounded-full px-3 py-1">
            ✓ Closed
          </span>
        </div>
        <div className="space-y-3">
          {[
            { label: "Revenue", value: "$48,200", color: "text-green-400" },
            { label: "Expenses", value: "$12,850", color: "text-red-400" },
            { label: "Net Income", value: "$35,350", color: "text-white" },
            { label: "Cash Balance", value: "$142,000", color: "text-indigo-400" },
          ].map((row) => (
            <div key={row.label} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
              <span className="text-slate-400 text-sm">{row.label}</span>
              <span className={`font-medium text-sm ${row.color}`}>{row.value}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-slate-500">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          Reconciled by your bookkeeper · June 2026
        </div>
      </div>
    );
  }
  return (
    <div className="card-glass rounded-2xl p-6 w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <span className="text-white font-medium">Tax Deadlines</span>
        <span className="text-xs text-indigo-400 bg-indigo-400/10 border border-indigo-400/20 rounded-full px-3 py-1">
          All on track
        </span>
      </div>
      <div className="space-y-3">
        {[
          { label: "Delaware Franchise Tax", date: "Mar 1", status: "Filed", ok: true },
          { label: "Federal Corp. Tax (1120)", date: "Apr 15", status: "Filed", ok: true },
          { label: "CA State Tax", date: "Apr 15", status: "Filed", ok: true },
          { label: "Q2 Estimated Tax", date: "Jun 15", status: "Upcoming", ok: false },
        ].map((row) => (
          <div key={row.label} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
            <div>
              <p className="text-slate-300 text-sm">{row.label}</p>
              <p className="text-slate-500 text-xs">Due {row.date}</p>
            </div>
            <span
              className={`text-xs rounded-full px-3 py-1 font-medium ${
                row.ok
                  ? "text-green-400 bg-green-400/10 border border-green-400/20"
                  : "text-yellow-400 bg-yellow-400/10 border border-yellow-400/20"
              }`}
            >
              {row.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ServiceDetail() {
  return (
    <section className="py-8 px-6">
      <div className="max-w-6xl mx-auto space-y-32">
        {details.map((d) => (
          <div
            key={d.tag}
            className={`flex flex-col ${d.reverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-16`}
          >
            {/* Text */}
            <div className="flex-1">
              <p className="text-indigo-400 text-sm font-medium uppercase tracking-widest mb-3">
                {d.tag}
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 leading-tight">
                {d.title}
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">{d.description}</p>
              <ul className="space-y-3 mb-8">
                {d.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-slate-300">
                    <svg className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {b}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="btn-primary inline-flex items-center gap-2 text-white font-medium rounded-full px-6 py-3 text-sm"
              >
                Get started
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Mockup */}
            <div className="flex-1 w-full">
              <MockupCard type={d.mockup} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

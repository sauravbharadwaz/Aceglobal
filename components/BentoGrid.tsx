export default function BentoGrid() {
  return (
    <section className="py-[120px] bg-[#f2f3ff]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-6">
        <h2 className="text-[28px] md:text-[40px] font-semibold leading-[1.2] tracking-[-0.01em] text-[#00174c] text-center mb-12">
          All-in-one accounting platform <br />
          built for <span className="text-[#0053ce]">startups</span>.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:h-[620px]">
          {/* Expert Accountants */}
          <div className="md:col-span-7 bg-white p-8 rounded-3xl shadow-sm border border-[#c2c6d8]/20 flex flex-col justify-between overflow-hidden group">
            <div>
              <h3 className="text-2xl font-semibold text-[#00174c] mb-2">Expert Accountants</h3>
              <p className="text-[#727687]">
                Dedicated CPAs who understand startup nuances — from Delaware C-Corp compliance to complex multi-state filings.
              </p>
            </div>
            <div className="mt-8 flex gap-4 transition-transform duration-500 group-hover:translate-x-2">
              {[
                { initials: "SK", bg: "bg-[#0053ce]" },
                { initials: "JP", bg: "bg-[#4658aa]" },
                { initials: "AR", bg: "bg-[#545d68]" },
              ].map((p) => (
                <div
                  key={p.initials}
                  className={`w-16 h-16 rounded-full ${p.bg} border-4 border-[#ebedff] flex items-center justify-center text-white font-bold text-sm`}
                >
                  {p.initials}
                </div>
              ))}
              <div className="w-16 h-16 rounded-full bg-[#0053ce]/10 flex items-center justify-center text-[#0053ce] font-bold text-sm">
                +12
              </div>
            </div>
          </div>

          {/* $100M+ Saved */}
          <div className="md:col-span-5 bg-[#0053ce] p-8 rounded-3xl shadow-lg flex flex-col justify-between text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-semibold mb-2">$100M+ Saved</h3>
              <p className="opacity-80">
                Total deductions identified for our founders.
              </p>
            </div>
            <div className="text-5xl font-bold mt-8 relative z-10 tabular-nums">$104,289,301</div>
            <div className="absolute bottom-0 right-0 opacity-20 w-full pointer-events-none">
              <svg viewBox="0 0 400 200" className="w-full">
                <path d="M0,150 Q100,100 200,120 T400,50 L400,200 L0,200 Z" fill="white" />
              </svg>
            </div>
          </div>

          {/* Bookkeeping on Autopilot — full width row since no Tax Credits */}
          <div className="md:col-span-12 bg-[#172d65] text-white p-8 rounded-3xl shadow-sm flex flex-col md:flex-row items-center gap-8 group">
            <div className="flex-1">
              <h3 className="text-2xl font-semibold mb-2">Bookkeeping on Autopilot</h3>
              <p className="text-[#dbe1ff]/60">
                Real-time sync with Mercury, Brex, and Stripe. No more end-of-month surprises.
              </p>
              <button className="mt-6 flex items-center gap-2 text-[#b2c5ff] hover:gap-4 transition-all font-semibold text-sm">
                Learn how →
              </button>
            </div>
            {/* Transaction list mockup */}
            <div className="w-full md:w-80 bg-white/10 rounded-2xl p-5 group-hover:scale-[1.02] transition-transform">
              <p className="text-xs font-semibold text-[#b2c5ff] mb-3 uppercase tracking-wider">Recent Transactions</p>
              {[
                { name: "Stripe payout", amount: "+$12,400", badge: "Reconciled" },
                { name: "Brex card — AWS", amount: "-$890", badge: "Reconciled" },
                { name: "Mercury payroll", amount: "-$24,000", badge: "Reconciled" },
                { name: "Stripe payout", amount: "+$8,200", badge: "Reconciled" },
              ].map((tx, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-white/10 last:border-0">
                  <div>
                    <p className="text-sm text-white">{tx.name}</p>
                    <span className="text-[10px] bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full font-semibold">
                      {tx.badge}
                    </span>
                  </div>
                  <span className={`text-sm font-semibold ${tx.amount.startsWith("+") ? "text-green-300" : "text-white/70"}`}>
                    {tx.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

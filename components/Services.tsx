const services = [
  {
    tag: "Bookkeeping",
    tagStyle: "bg-[#D6F5E3] text-[#1A7A44]",
    title: "Real-time accounting you can actually trust.",
    desc: "No more waiting weeks for month-end reports. Get real-time visibility into your burn, runway, and cash flow.",
    reverse: false,
    mockup: "bookkeeping",
  },
  {
    tag: "TaxPass",
    tagStyle: "bg-[#0053ce]/10 text-[#0053ce]",
    title: "Corporate taxes handled. Federal & State.",
    desc: "From Delaware Franchise Tax to complex multi-state filings, we ensure you stay compliant without lifting a finger.",
    reverse: true,
    mockup: "taxes",
  },
];

function BookkeepingMockup() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#c2c6d8]/20">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm font-medium text-[#00174c]">Burn Rate — Last 6 Months</p>
        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">On Track</span>
      </div>
      <div className="flex items-end gap-2 h-28 mb-6">
        {[
          { total: 80, used: 45 },
          { total: 65, used: 35 },
          { total: 90, used: 50 },
          { total: 70, used: 40 },
          { total: 85, used: 48 },
          { total: 75, used: 42 },
        ].map((b, i) => (
          <div key={i} className="flex-1 flex flex-col justify-end gap-1 h-full">
            <div
              className="w-full rounded-t-sm bg-[#0053ce]/20"
              style={{ height: `${b.total}%` }}
            >
              <div className="w-full rounded-t-sm bg-[#0053ce]" style={{ height: `${(b.used / b.total) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Monthly Burn", value: "$24,500" },
          { label: "Runway", value: "18 months" },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#f2f3ff] rounded-xl p-3">
            <p className="text-xs text-[#727687]">{stat.label}</p>
            <p className="text-base font-semibold text-[#00174c]">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TaxMockup() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#c2c6d8]/20">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm font-medium text-[#00174c]">Tax Filing Status</p>
        <span className="text-xs bg-blue-100 text-[#0053ce] px-2 py-1 rounded-full font-medium">All Filed ✓</span>
      </div>
      {[
        { label: "Delaware Franchise Tax", date: "Mar 1", status: "Filed", ok: true },
        { label: "Federal Corp. Tax (1120)", date: "Apr 15", status: "Filed", ok: true },
        { label: "CA State Corp. Tax", date: "Apr 15", status: "Filed", ok: true },
        { label: "NY State Corp. Tax", date: "Apr 15", status: "Filed", ok: true },
        { label: "Q3 Estimated Tax", date: "Sep 15", status: "Upcoming", ok: false },
      ].map((row) => (
        <div key={row.label} className="flex justify-between items-center py-3 border-b border-[#c2c6d8]/20 last:border-0">
          <div>
            <p className="text-sm font-medium text-[#00174c]">{row.label}</p>
            <p className="text-xs text-[#727687]">Due {row.date}</p>
          </div>
          <span
            className={`text-xs rounded-full px-3 py-1 font-medium ${
              row.ok
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {row.status}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function Services() {
  return (
    <section className="py-[120px] bg-[#f2f3ff] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 md:px-6 space-y-24">
        {services.map((s) => (
          <div
            key={s.tag}
            className={`bg-white rounded-[40px] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 shadow-sm ${
              s.reverse ? "" : ""
            }`}
          >
            {/* Text */}
            <div className={`flex-1 ${s.reverse ? "order-2 md:order-2" : "order-2 md:order-1"}`}>
              <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium mb-6 ${s.tagStyle}`}>
                {s.tag}
              </span>
              <h3 className="text-[28px] md:text-[40px] font-medium leading-[1.2] text-[#00174c] mb-6">
                {s.title}
              </h3>
              <p className="text-lg text-[#727687] mb-8 leading-relaxed">{s.desc}</p>
              <a
                href="#"
                className="text-[#0053ce] font-medium flex items-center gap-2 group text-sm"
              >
                Learn More{" "}
                <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
              </a>
            </div>

            {/* Mockup */}
            <div className={`flex-1 w-full ${s.reverse ? "order-1 md:order-1" : "order-1 md:order-2"}`}>
              {s.mockup === "bookkeeping" ? <BookkeepingMockup /> : <TaxMockup />}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

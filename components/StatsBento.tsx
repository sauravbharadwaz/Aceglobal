export default function StatsBento() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-5 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#ebedff] p-5 md:p-8 rounded-[32px]">
          {[
            { label: "Established", value: "Since 2019", accent: true },
            { label: null, value: "Expert Accountants", tags: ["CPA", "Tax Expert"] },
            { label: "Volume Processed", value: "$8B+ Transactions", accent: true },
            { label: "Founder Benefit", value: "$100M+ Tax Savings", accent: true },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 flex flex-col justify-center">
              {item.tags && (
                <div className="flex gap-2 mb-3 flex-wrap">
                  {item.tags.map((t) => (
                    <span
                      key={t}
                      className="bg-[#94a6fe]/20 text-[#243889] px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
              {item.label && (
                <p className="text-xs font-medium text-[#0053ce] mb-1.5">{item.label}</p>
              )}
              <h3 className="text-2xl md:text-3xl font-semibold text-[#00174c]">{item.value}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

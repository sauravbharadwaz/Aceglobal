export default function StatsBento() {
  return (
    <section className="py-[120px] bg-white">
      <div className="max-w-[1280px] mx-auto px-5 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#ebedff] p-6 md:p-12 rounded-[48px]">
          {[
            { label: "Established", value: "Since 2019", accent: true },
            { label: null, value: "Expert Accountants", tags: ["CPA", "Tax Expert"] },
            { label: "Volume Processed", value: "$8B+ Transactions", accent: true },
            { label: "Founder Benefit", value: "$100M+ Tax Savings", accent: true },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-3xl p-10 flex flex-col justify-center">
              {item.tags && (
                <div className="flex gap-2 mb-4 flex-wrap">
                  {item.tags.map((t) => (
                    <span
                      key={t}
                      className="bg-[#94a6fe]/20 text-[#243889] px-3 py-1 rounded-full text-xs font-bold"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
              {item.label && (
                <p className="text-sm font-semibold text-[#0053ce] mb-2">{item.label}</p>
              )}
              <h3 className="text-4xl md:text-5xl font-bold text-[#00174c]">{item.value}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

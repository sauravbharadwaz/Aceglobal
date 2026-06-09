const stats = [
  { value: "$100M+", label: "Saved for clients" },
  { value: "500+", label: "Startups served" },
  { value: "4.8/5 ★★★★★", label: "Average rating" },
  { value: "15 min", label: "To onboard" },
];

export default function Stats() {
  return (
    <section className="py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="card-glass rounded-2xl grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/10">
          {stats.map((s) => (
            <div key={s.label} className="px-8 py-6 text-center">
              <div className="text-2xl md:text-3xl font-semibold text-white mb-1">{s.value}</div>
              <div className="text-sm text-slate-400">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

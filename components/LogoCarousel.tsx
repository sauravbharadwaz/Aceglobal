const logos = [
  "Stripe", "Notion", "Linear", "Vercel", "Figma", "Loom",
  "Rippling", "Brex", "Deel", "Retool", "Mixpanel", "Segment",
];

function LogoItem({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-center px-8 py-3 shrink-0">
      <span className="text-slate-500 font-semibold text-sm tracking-wide uppercase opacity-60 hover:opacity-100 transition-opacity whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

export default function LogoCarousel() {
  const doubled = [...logos, ...logos];

  return (
    <section className="py-16 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto mb-8 text-center">
        <p className="text-slate-500 text-sm font-medium uppercase tracking-widest">
          Trusted by fast-growing startups
        </p>
      </div>
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#0a0a0f] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#0a0a0f] to-transparent pointer-events-none" />

        <div className="flex" style={{ animation: "marquee 30s linear infinite" }}>
          {doubled.map((name, i) => (
            <LogoItem key={i} name={name} />
          ))}
        </div>
      </div>
    </section>
  );
}

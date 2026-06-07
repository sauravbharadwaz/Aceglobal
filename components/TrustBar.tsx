const logos = ["Whatnot", "Karat", "Cursor", "Vanta", "Mercury", "Linear", "Notion", "Stripe"];

export default function TrustBar() {
  const doubled = [...logos, ...logos];
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1280px] mx-auto px-5 md:px-6">
        <p className="text-center text-xs font-semibold text-[#c2c6d8] mb-10 tracking-widest uppercase">
          We&apos;ve helped thousands of startups save $100M+
        </p>
      </div>

      {/* Running marquee of client logos */}
      <div className="group relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

        <div
          className="flex w-max items-center gap-24 opacity-60 grayscale"
          style={{ animation: "marquee 28s linear infinite" }}
        >
          {doubled.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="text-lg font-bold text-[#00174c] tracking-tight whitespace-nowrap"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

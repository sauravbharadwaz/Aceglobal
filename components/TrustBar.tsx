// Monogram-style logo lockups (a simple mark + wordmark) for Ace Global's
// clients. Drop each client's official logo file into /public/logos/ and
// swap the <Mark> for <img src="/logos/{slug}.svg" /> when available.
const logos = [
  { name: "Heather CPA Firm", mark: "circle", badge: null },
  { name: "Varadhi Firms", mark: "diamond", badge: null },
  { name: "Radio Surabhi", mark: "lines", badge: null },
  { name: "Urban Systems", mark: "square", badge: null },
  { name: "iNRI", mark: "triangle", badge: "Backed by Y Combinator" },
  { name: "Indian Eagle", mark: "circle", badge: null },
] as const;

type MarkType = (typeof logos)[number]["mark"];

function Mark({ type }: { type: MarkType }) {
  const common = "w-6 h-6 text-[#00174c]";
  switch (type) {
    case "circle":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
    case "diamond":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2 22 12 12 22 2 12z" />
        </svg>
      );
    case "square":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="4" />
        </svg>
      );
    case "triangle":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 3 22 20 2 20z" />
        </svg>
      );
    case "lines":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <rect x="3" y="5" width="18" height="3" rx="1.5" />
          <rect x="3" y="10.5" width="18" height="3" rx="1.5" />
          <rect x="3" y="16" width="18" height="3" rx="1.5" />
        </svg>
      );
  }
}

export default function TrustBar() {
  const doubled = [...logos, ...logos];
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1280px] mx-auto px-5 md:px-6">
        <p className="text-center text-xs font-medium text-[#c2c6d8] mb-10 tracking-widest uppercase">
          Trusted by growing businesses
        </p>
      </div>

      {/* Running marquee of client logos */}
      <div className="group relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

        <div
          className="flex w-max items-center gap-20 opacity-60 grayscale"
          style={{ animation: "marquee 28s linear infinite" }}
        >
          {doubled.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex items-center gap-2.5 whitespace-nowrap"
            >
              <Mark type={logo.mark} />
              <span className="text-lg font-semibold text-[#00174c] tracking-tight">
                {logo.name}
              </span>
              {logo.badge && (
                <span className="text-[11px] font-medium text-[#727687] border border-[#c2c6d8]/60 rounded-full px-2.5 py-0.5">
                  {logo.badge}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

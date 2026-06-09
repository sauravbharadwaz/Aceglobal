const rowOne = [
  {
    name: "James Wilson",
    role: "Founder, Velocity AI",
    text: "Ace Global's TaxPass is a lifesaver. Handled all my state filings without me even asking.",
    initials: "JW",
    color: "bg-[#0053ce]",
  },
  {
    name: "Leo Richards",
    role: "COO, TerraForm",
    text: "Incredible support. My dedicated accountant responds in minutes. Best investment we've made.",
    initials: "LR",
    color: "bg-[#545d68]",
  },
  {
    name: "Tom Rivera",
    role: "Founder, Gridcraft",
    text: "Switched from a Big 4 firm and saved 60% on accounting costs. The quality is just as good, if not better.",
    initials: "TR",
    color: "bg-[#0053ce]",
  },
  {
    name: "Sophie Lin",
    role: "CEO, Brightwave",
    text: "Onboarding was effortless. Within a week our books were spotless and fully reconciled.",
    initials: "SL",
    color: "bg-[#172d65]",
  },
];

const rowTwo = [
  {
    name: "Aria Song",
    role: "CEO, Horizon Lab",
    text: "The only accounting platform that actually gets startup compliance right. Incredible attention to detail.",
    initials: "AS",
    color: "bg-[#4658aa]",
  },
  {
    name: "Priya Kapoor",
    role: "CEO, Datasift",
    text: "We closed our Series A and the clean financials from Ace Global were a huge part of investor due diligence.",
    initials: "PK",
    color: "bg-[#172d65]",
  },
  {
    name: "Nina Park",
    role: "CFO, Loopify",
    text: "The monthly financial reports are crystal clear. Our board loves them. Onboarding took 20 minutes.",
    initials: "NP",
    color: "bg-[#4658aa]",
  },
  {
    name: "Marcus Hale",
    role: "Founder, Stackline",
    text: "Finally an accounting team that speaks startup. They flag issues before they ever become problems.",
    initials: "MH",
    color: "bg-[#0053ce]",
  },
];

type Review = (typeof rowOne)[number];

function ReviewCard({ r }: { r: Review }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#c2c6d8]/20 w-[360px] flex-shrink-0">
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-10 h-10 rounded-full ${r.color} flex items-center justify-center text-white text-xs font-semibold flex-shrink-0`}
        >
          {r.initials}
        </div>
        <div>
          <p className="text-sm font-medium text-[#00174c]">{r.name}</p>
          <p className="text-xs text-[#727687]">{r.role}</p>
        </div>
      </div>
      <p className="text-sm text-[#424655] leading-relaxed">&ldquo;{r.text}&rdquo;</p>
    </div>
  );
}

function MarqueeRow({ items, reverse }: { items: Review[]; reverse?: boolean }) {
  // Duplicate the items so the loop is seamless when it wraps at -50%.
  const doubled = [...items, ...items];
  return (
    <div className="group relative overflow-hidden">
      <div
        className="flex gap-6 w-max"
        style={{
          animation: `${reverse ? "marquee-reverse" : "marquee"} 32s linear infinite`,
        }}
      >
        {doubled.map((r, i) => (
          <ReviewCard key={`${r.name}-${i}`} r={r} />
        ))}
      </div>
    </div>
  );
}

export default function ReviewsWall() {
  return (
    <section className="py-[120px] bg-[#f2f3ff] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 md:px-6 mb-16">
        {/* Pull quote */}
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="text-[40px] md:text-[60px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#00174c]">
            &ldquo;This took a huge weight off my shoulders.&rdquo;
          </blockquote>
        </div>
      </div>

      {/* Two opposing marquee rows */}
      <div className="flex flex-col gap-6">
        <MarqueeRow items={rowOne} />
        <MarqueeRow items={rowTwo} reverse />
      </div>
    </section>
  );
}

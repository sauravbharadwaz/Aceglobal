"use client";

import { useRef } from "react";

const testimonials = [
  {
    quote: "Ace Global took the entire financial burden off my shoulders. I used to spend 10+ hours a month on books — now I spend zero.",
    name: "Sarah Chen",
    role: "CEO, NovaSpark",
    initials: "SC",
    color: "from-indigo-500 to-purple-600",
  },
  {
    quote: "Our Delaware franchise tax and federal returns were filed perfectly and on time. The team is incredibly responsive and professional.",
    name: "Marcus Lee",
    role: "Founder, Stackr",
    initials: "ML",
    color: "from-blue-500 to-cyan-500",
  },
  {
    quote: "Best decision we made for our startup finances. Clean books, no stress, and our investors love the monthly reports.",
    name: "Priya Sharma",
    role: "Co-founder, Loopify",
    initials: "PS",
    color: "from-purple-500 to-pink-500",
  },
  {
    quote: "I onboarded in literally 12 minutes. The bookkeeping has been flawless since day one. Highly recommended for any founder.",
    name: "James Wu",
    role: "CEO, Driftbase",
    initials: "JW",
    color: "from-green-500 to-teal-500",
  },
  {
    quote: "Having a dedicated CPA who actually knows our business makes all the difference. It's not just software — it's a real team.",
    name: "Aisha Patel",
    role: "Founder, Pulsewave",
    initials: "AP",
    color: "from-orange-500 to-red-500",
  },
  {
    quote: "We closed our Series A and the clean financials from Ace Global were a huge part of investor due diligence. Worth every penny.",
    name: "Tom Rivera",
    role: "Co-founder, Gridcraft",
    initials: "TR",
    color: "from-indigo-400 to-blue-500",
  },
];

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -340 : 340, behavior: "smooth" });
  };

  return (
    <section className="py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">
              Testimonials
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Loved by founders
            </h2>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full card-glass flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              aria-label="Scroll left"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full card-glass flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              aria-label="Scroll right"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="card-glass rounded-2xl p-6 min-w-[300px] max-w-[300px] snap-start flex flex-col gap-4"
            >
              {/* Stars */}
              <div className="flex text-yellow-400 text-sm">{"★★★★★"}</div>

              {/* Quote */}
              <p className="text-slate-300 text-sm leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                <div
                  className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{t.name}</p>
                  <p className="text-slate-500 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";

type Resource = {
  title: string;
  excerpt: string;
  category: "Bookkeeping" | "Taxes" | "Payroll" | "Compliance";
  type: "Guide" | "Article" | "Template";
  readTime: string;
};

const categories = ["All", "Bookkeeping", "Taxes", "Payroll", "Compliance"] as const;

const resources: Resource[] = [
  {
    title: "The small-business bookkeeping checklist",
    excerpt:
      "A month-by-month checklist to keep your books clean, reconciled, and audit-ready all year.",
    category: "Bookkeeping",
    type: "Guide",
    readTime: "8 min",
  },
  {
    title: "How to read your P&L (without an accounting degree)",
    excerpt:
      "Revenue, COGS, and net income explained in plain English — and what each line tells you.",
    category: "Bookkeeping",
    type: "Article",
    readTime: "6 min",
  },
  {
    title: "2026 corporate tax deadlines calendar",
    excerpt:
      "Every federal and state filing date for LLCs, S-Corps, and C-Corps in one place.",
    category: "Taxes",
    type: "Template",
    readTime: "Download",
  },
  {
    title: "S-Corp vs. LLC: which saves you more in taxes?",
    excerpt:
      "A breakdown of self-employment tax, reasonable salary, and when an S-Corp election pays off.",
    category: "Taxes",
    type: "Guide",
    readTime: "10 min",
  },
  {
    title: "Delaware Franchise Tax, explained",
    excerpt:
      "Why you got that big bill, the two calculation methods, and how to legally lower it.",
    category: "Taxes",
    type: "Article",
    readTime: "5 min",
  },
  {
    title: "Running your first payroll: a step-by-step guide",
    excerpt:
      "From EIN to first paycheck — everything you need to pay employees correctly and on time.",
    category: "Payroll",
    type: "Guide",
    readTime: "9 min",
  },
  {
    title: "Contractor vs. employee: classification cheat sheet",
    excerpt:
      "Misclassification is costly. Use this table to get worker status right the first time.",
    category: "Payroll",
    type: "Template",
    readTime: "Download",
  },
  {
    title: "Sales tax nexus: do you owe in other states?",
    excerpt:
      "Economic nexus thresholds and how to stay compliant as you sell across state lines.",
    category: "Compliance",
    type: "Article",
    readTime: "7 min",
  },
  {
    title: "Year-end compliance checklist for small businesses",
    excerpt:
      "1099s, W-2s, annual reports, and registered-agent renewals — don't miss a deadline.",
    category: "Compliance",
    type: "Template",
    readTime: "Download",
  },
];

const typeStyles: Record<Resource["type"], string> = {
  Guide: "bg-[#0053ce]/10 text-[#0053ce]",
  Article: "bg-[#94a6fe]/20 text-[#243889]",
  Template: "bg-[#D6F5E3] text-[#1A7A44]",
};

export default function ResourceLibrary() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");

  const filtered =
    active === "All" ? resources : resources.filter((r) => r.category === active);

  return (
    <div>
      {/* Category filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              active === cat
                ? "bg-[#0053ce] text-white shadow-lg shadow-[#0053ce]/20"
                : "bg-white/50 backdrop-blur-md text-[#00174c] border border-white/60 hover:bg-white/70"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((r) => (
          <a
            key={r.title}
            href="#"
            className="group bg-white/55 backdrop-blur-xl rounded-3xl p-7 shadow-lg shadow-[#0053ce]/5 border border-white/60 flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div className="flex items-center gap-3 mb-5">
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full ${typeStyles[r.type]}`}
              >
                {r.type}
              </span>
              <span className="text-xs text-[#727687]">{r.category}</span>
            </div>
            <h3 className="text-lg font-semibold text-[#00174c] mb-3 leading-snug group-hover:text-[#0053ce] transition-colors">
              {r.title}
            </h3>
            <p className="text-sm text-[#727687] leading-relaxed flex-1">{r.excerpt}</p>
            <div className="mt-6 flex items-center justify-between pt-4 border-t border-[#c2c6d8]/20">
              <span className="text-xs text-[#727687]">{r.readTime}</span>
              <span className="text-[#0053ce] text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Read
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

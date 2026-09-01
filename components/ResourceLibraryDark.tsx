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
  { title: "The small-business bookkeeping checklist", excerpt: "A month-by-month checklist to keep your books clean, reconciled, and audit-ready all year.", category: "Bookkeeping", type: "Guide", readTime: "8 min" },
  { title: "How to read your P&L (without an accounting degree)", excerpt: "Revenue, COGS, and net income explained in plain English — and what each line tells you.", category: "Bookkeeping", type: "Article", readTime: "6 min" },
  { title: "2026 corporate tax deadlines calendar", excerpt: "Every federal and state filing date for LLCs, S-Corps, and C-Corps in one place.", category: "Taxes", type: "Template", readTime: "Download" },
  { title: "S-Corp vs. LLC: which saves you more in taxes?", excerpt: "A breakdown of self-employment tax, reasonable salary, and when an S-Corp election pays off.", category: "Taxes", type: "Guide", readTime: "10 min" },
  { title: "Delaware Franchise Tax, explained", excerpt: "Why you got that big bill, the two calculation methods, and how to legally lower it.", category: "Taxes", type: "Article", readTime: "5 min" },
  { title: "Running your first payroll: a step-by-step guide", excerpt: "From EIN to first paycheck — everything you need to pay employees correctly and on time.", category: "Payroll", type: "Guide", readTime: "9 min" },
  { title: "Contractor vs. employee: classification cheat sheet", excerpt: "Misclassification is costly. Use this table to get worker status right the first time.", category: "Payroll", type: "Template", readTime: "Download" },
  { title: "Sales tax nexus: do you owe in other states?", excerpt: "Economic nexus thresholds and how to stay compliant as you sell across state lines.", category: "Compliance", type: "Article", readTime: "7 min" },
  { title: "Year-end compliance checklist for small businesses", excerpt: "1099s, W-2s, annual reports, and registered-agent renewals — don't miss a deadline.", category: "Compliance", type: "Template", readTime: "Download" },
];

export default function ResourceLibraryDark() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const filtered = active === "All" ? resources : resources.filter((r) => r.category === active);

  return (
    <>
      <div className="rfilter">
        {categories.map((c) => (
          <button key={c} className={active === c ? "on" : ""} onClick={() => setActive(c)} type="button">
            {c}
          </button>
        ))}
      </div>
      <div className="prod-grid" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
        {filtered.map((r) => (
          <a href="#" className="rcard" key={r.title}>
            <span className="klabel">
              {r.type} · {r.category}
            </span>
            <h3>{r.title}</h3>
            <p>{r.excerpt}</p>
            <span className="more">{r.readTime} →</span>
          </a>
        ))}
      </div>
    </>
  );
}

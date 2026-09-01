import type { Metadata } from "next";

import ThemeShell from "@/components/theme/ThemeShell";
import ResourceLibraryDark from "@/components/ResourceLibraryDark";

export const metadata: Metadata = {
  title: "Resources | Ace Global",
  description:
    "Guides, templates, and articles on bookkeeping, corporate taxes, payroll, and compliance for small businesses — written by our CPA team.",
};

const topics = [
  { title: "Bookkeeping", desc: "Closing your books, reading financials, and staying audit-ready.", d: "M9 17v-6h6v6m-3-10V4m-7 13a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10z" },
  { title: "Corporate Taxes", desc: "Filing deadlines, entity elections, and lowering your tax bill.", d: "M9 7h6m-6 4h6m-6 4h4M5 5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5z" },
  { title: "Payroll", desc: "Paying your team, classification, and payroll-tax basics.", d: "M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4z" },
  { title: "Compliance", desc: "Sales tax, annual reports, and staying on the right side of the rules.", d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
];

export default function ResourcesPage() {
  return (
    <ThemeShell>
      {/* Hero */}
      <section>
        <div className="wrap">
          <div className="page-head">
            <div className="tag" data-fade>
              <i>✦</i>Resources
            </div>
            <h1 data-fade>
              Guides to run your <span className="accent">business finances.</span>
            </h1>
            <p className="sub" data-fade>
              Practical guides, templates, and answers on bookkeeping, taxes, payroll, and compliance
              — written by the CPA team that does this every day.
            </p>
          </div>
        </div>
      </section>

      {/* Featured guide */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <a href="#" className="card" data-fade style={{ display: "block", minHeight: 0, padding: 40 }}>
            <span className="klabel">Featured guide</span>
            <h3 style={{ fontSize: 26, letterSpacing: "-.02em", marginTop: 8 }}>
              The complete guide to getting tax-ready as a small business
            </h3>
            <p style={{ maxWidth: 580 }}>
              Everything you need before filing — clean books, the right deductions, quarterly
              estimates, and the documents your accountant actually needs.
            </p>
            <span style={{ marginTop: 18, color: "var(--orange-2)", fontWeight: 600, fontSize: 14, display: "inline-block" }}>
              Read the guide →
            </span>
          </a>
        </div>
      </section>

      {/* Browse by topic */}
      <section>
        <div className="wrap">
          <div className="center">
            <div className="tag" data-fade>
              <i>✦</i>Browse by topic
            </div>
          </div>
          <h2 className="h2 center" data-fade>
            Find what you need, fast
          </h2>
          <div className="stat4" style={{ marginTop: 40 }}>
            {topics.map((t) => (
              <div className="card" data-fade key={t.title}>
                <div className="ico2">
                  <svg viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={t.d} />
                  </svg>
                </div>
                <h3>{t.title}</h3>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Library */}
      <section>
        <div className="wrap">
          <div className="center">
            <div className="tag" data-fade>
              <i>✦</i>The library
            </div>
          </div>
          <h2 className="h2 center" data-fade>
            Guides, articles &amp; templates
          </h2>
          <p className="sub center" data-fade>
            Filter by topic to find exactly what you need.
          </p>
          <div style={{ marginTop: 40 }}>
            <ResourceLibraryDark />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact">
        <div className="wrap">
          <div className="contact-card" data-contact>
            <h2 className="h2">Finance tips for founders, once a month.</h2>
            <p>Deadlines, deductions, and practical advice — no spam, unsubscribe anytime.</p>
            <a href="https://app.aceglobal.ai/" className="pill white">
              Get started
            </a>
          </div>
        </div>
      </section>
    </ThemeShell>
  );
}

import type { Metadata } from "next";

import ThemeShell from "@/components/theme/ThemeShell";
import PricingTablesDark from "@/components/PricingTablesDark";

export const metadata: Metadata = {
  title: "Pricing | Ace Global",
  description:
    "Simple, all-inclusive pricing for bookkeeping, payroll, and corporate taxes. Pick the plan that fits your business — no long-term contracts.",
};

const included = [
  { title: "A dedicated team", desc: "A real bookkeeper backed by CPAs, reachable on WhatsApp or iMessage." },
  { title: "AI agent on your numbers", desc: "Ask about cash flow, runway, or any transaction and get answers in real time." },
  { title: "Historical cleanup", desc: "We tidy and reconcile your past books during onboarding — at no extra cost." },
  { title: "No long-term contracts", desc: "Month-to-month flexibility. Upgrade, downgrade, or cancel anytime." },
];

const compareRows: { feature: string; values: (boolean | string)[] }[] = [
  { feature: "Monthly bookkeeping & reconciliation", values: [true, true, true] },
  { feature: "Dedicated bookkeeper", values: [true, true, true] },
  { feature: "Financial statements (P&L, BS, cash flow)", values: [true, true, true] },
  { feature: "AI agent on WhatsApp / iMessage", values: [true, true, true] },
  { feature: "Historical cleanup", values: ["Add-on", true, true] },
  { feature: "Payroll & compliance", values: [false, true, true] },
  { feature: "Quarterly tax estimates", values: [false, true, true] },
  { feature: "CPA review on every close", values: [false, true, true] },
  { feature: "Corporate tax filing", values: [false, "Add-on", true] },
  { feature: "Dedicated CPA + finance lead", values: [false, false, true] },
  { feature: "Multi-entity & consolidations", values: [false, false, true] },
  { feature: "Sales tax & franchise tax", values: [false, false, true] },
];

const faqs = [
  {
    q: "Is the price really all-inclusive?",
    a: "Yes — your plan covers bookkeeping, your dedicated team, and your AI agent. Payroll and corporate tax filing are added as you move up plans, with no surprise line items.",
  },
  {
    q: "Can I change plans later?",
    a: "Anytime. Upgrade, downgrade, or cancel month-to-month — there are no long-term contracts.",
  },
  {
    q: "What if my books are behind?",
    a: "Historical cleanup is included on Growth and Scale (an add-on on Starter). We reconcile your past books during onboarding so you start on a clean slate.",
  },
  {
    q: "Do you handle multi-state and multi-entity businesses?",
    a: "Yes, on the Scale plan — including consolidations, multi-state apportionment, sales tax, and franchise tax.",
  },
];

function CmpValue({ v }: { v: boolean | string }) {
  if (typeof v === "string") return <>{v}</>;
  return v ? <span className="yes">✓</span> : <span className="no">—</span>;
}

export default function PricingPage() {
  return (
    <ThemeShell>
      {/* Header + plans */}
      <section>
        <div className="wrap">
          <div className="page-head">
            <div className="tag" data-fade>
              <i>✦</i>Pricing
            </div>
            <h1 data-fade>
              All-inclusive pricing. <span className="accent">No surprises.</span>
            </h1>
            <p className="sub" data-fade>
              One flat rate covers your books, your team, and your AI agent. Add payroll and taxes as
              you grow — and cancel anytime.
            </p>
          </div>
          <PricingTablesDark />
        </div>
      </section>

      {/* Every plan includes */}
      <section>
        <div className="wrap">
          <div className="center">
            <div className="tag" data-fade>
              <i>✦</i>Included
            </div>
          </div>
          <h2 className="h2 center" data-fade>
            Every plan includes the essentials.
          </h2>
          <div className="stat4" style={{ marginTop: 40 }}>
            {included.map((x) => (
              <div className="card" data-fade key={x.title}>
                <h3>{x.title}</h3>
                <p>{x.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compare */}
      <section>
        <div className="wrap">
          <div className="center">
            <div className="tag" data-fade>
              <i>✦</i>Compare
            </div>
          </div>
          <h2 className="h2 center" data-fade>
            Compare every plan
          </h2>
          <div className="cmp" data-fade>
            <div className="row head">
              <div className="cell feat">Features</div>
              <div className="cell">Starter</div>
              <div className="cell hot">Growth</div>
              <div className="cell">Scale</div>
            </div>
            {compareRows.map((r) => (
              <div className="row" key={r.feature}>
                <div className="cell feat">{r.feature}</div>
                {r.values.map((v, i) => (
                  <div className="cell" key={i}>
                    <CmpValue v={v} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="wrap">
          <h2 className="h2 center" data-fade>
            Frequently asked questions
          </h2>
          <div className="faq">
            {faqs.map((f, i) => (
              <div className={`q ${i === 0 ? "open" : ""}`} key={f.q}>
                <button type="button">
                  <i>⌄</i>
                  {f.q}
                </button>
                <div className="a">
                  <p>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact">
        <div className="wrap">
          <div className="contact-card" data-contact>
            <h2 className="h2">Your AI-powered finance team for books, taxes, and payroll.</h2>
            <p>
              Talk to your CPA team and AI agent on WhatsApp or iMessage while your books and filings
              run on autopilot.
            </p>
            <a href="https://app.aceglobal.ai/" className="pill white">
              Get started now
            </a>
          </div>
        </div>
      </section>
    </ThemeShell>
  );
}

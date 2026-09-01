"use client";

import { useState } from "react";

const plans = [
  {
    name: "Starter",
    monthly: 299,
    annual: 249,
    hot: false,
    features: [
      "Monthly bookkeeping & reconciliation",
      "Dedicated bookkeeper",
      "P&L, balance sheet & cash flow",
      "Year-end tax-ready financials",
      "WhatsApp & iMessage support",
    ],
  },
  {
    name: "Growth",
    monthly: 599,
    annual: 499,
    hot: true,
    features: [
      "Everything in Starter",
      "Payroll & compliance",
      "Quarterly tax estimates",
      "CPA review on every close",
      "Historical cleanup included",
    ],
  },
  {
    name: "Scale",
    monthly: 999,
    annual: 849,
    hot: false,
    features: [
      "Everything in Growth",
      "Corporate tax filing included",
      "Dedicated CPA + finance lead",
      "Multi-entity & consolidations",
      "Sales tax & franchise tax",
    ],
  },
];

export default function PricingTablesDark() {
  const [annual, setAnnual] = useState(true);

  return (
    <>
      <div className="billing-wrap" data-fade>
        <div className="billing">
          <button className={annual ? "" : "on"} onClick={() => setAnnual(false)} type="button">
            Monthly
          </button>
          <button className={annual ? "on" : ""} onClick={() => setAnnual(true)} type="button">
            Annual<span className="save">-17%</span>
          </button>
        </div>
      </div>
      <div className="price-grid">
        {plans.map((p) => (
          <div className={`price ${p.hot ? "hot" : ""}`} key={p.name} data-fade>
            <small>{p.name}</small>
            <div className="amt">
              ${annual ? p.annual : p.monthly}
              <span>/mo · {annual ? "billed annually" : "billed monthly"}</span>
            </div>
            <ul>
              {p.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <a href="https://app.aceglobal.ai/" className="pill orange">
              Get started
            </a>
          </div>
        ))}
      </div>
    </>
  );
}

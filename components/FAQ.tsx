"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How long does onboarding take?",
    a: "Onboarding typically takes about 30 minutes to connect your accounts. After that, our team spends 1-2 weeks doing a historical review to ensure everything is accurate.",
  },
  {
    q: "Is my data secure?",
    a: "We use bank-level 256-bit encryption and are SOC 2 Type II compliant. We never have direct access to move your funds — we only have read-only access for bookkeeping.",
  },
  {
    q: "Do you handle international taxes?",
    a: "We specialize in US Delaware C-Corps, but we have partnerships and internal expertise to handle international subsidiaries and foreign-owned US entities.",
  },
  {
    q: "What accounting software do you use?",
    a: "We work with QuickBooks Online and Xero. If you already have an account, we'll take it over. If not, we'll set one up for you as part of onboarding.",
  },
  {
    q: "How do you communicate with clients?",
    a: "We set up a dedicated Slack channel for every client. Your accountant is available during business hours and typically responds within a few hours.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="py-8 border-b border-[#c2c6d8]/30 last:border-0">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="text-2xl font-semibold text-[#00174c]">{q}</span>
        <span
          className={`ml-4 flex-shrink-0 text-[#727687] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="mt-4 text-[#727687] text-lg leading-relaxed">{a}</div>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <section className="py-[120px] bg-white">
      <div className="max-w-[1280px] mx-auto px-5 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Sticky CTA card */}
          <div className="lg:col-span-5">
            <div className="bg-[#172d65] text-white p-12 rounded-[40px] sticky top-32">
              <h2 className="text-3xl font-semibold mb-6">Have more questions?</h2>
              <p className="text-[#dbe1ff]/60 mb-10 leading-relaxed">
                We&apos;re here to help you navigate startup finance. Talk to one of our experts today.
              </p>
              <button className="bg-white text-[#172d65] px-8 py-4 rounded-full font-semibold hover:bg-[#f2f3ff] transition-colors w-full">
                Chat with Sales
              </button>
            </div>
          </div>

          {/* FAQ list */}
          <div className="lg:col-span-7">
            {faqs.map((f) => (
              <FAQItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

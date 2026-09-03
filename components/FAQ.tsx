"use client";

import { useState } from "react";

import JsonLd from "@/components/JsonLd";
import { faqs, faqPageJsonLd } from "@/lib/faqs";

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="py-8 border-b border-[#c2c6d8]/30 last:border-0">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-lg md:text-2xl font-medium text-[#00174c]">{q}</span>
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
    <section className="py-16 md:py-[120px] bg-white">
      {/* FAQPage markup lives with the section that renders the questions, so
          any page that shows this FAQ also declares it. */}
      <JsonLd data={faqPageJsonLd(faqs)} />
      <div className="max-w-[1280px] mx-auto px-5 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Sticky CTA card */}
          <div className="lg:col-span-5">
            <div className="bg-[#172d65] text-white p-8 md:p-12 rounded-[32px] md:rounded-[40px] sticky top-32">
              <h2 className="text-3xl font-medium mb-6">Have more questions?</h2>
              <p className="text-[#dbe1ff]/60 mb-10 leading-relaxed">
                We&apos;re here to help you simplify your business finances. Talk to an Ace Global
                expert today about bookkeeping, payroll, taxes, and compliance.
              </p>
              <button className="bg-white text-[#172d65] px-8 py-4 rounded-full font-medium hover:bg-[#f2f3ff] transition-colors w-full">
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

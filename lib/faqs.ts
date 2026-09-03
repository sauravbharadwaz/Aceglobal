/**
 * Site-wide FAQ content, shared by the FAQ section (visible accordion) and
 * its FAQPage structured data. Keeping both on one source means the markup
 * can never say something the page doesn't.
 */
export const faqs = [
  {
    q: "How long does onboarding take?",
    a: "Onboarding usually takes about 30 minutes. We connect your bank accounts, credit cards, payroll, and business systems. After that, our team reviews your historical books and gets everything cleaned up, reconciled, and ready to manage monthly.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. We use secure, read-only connections wherever possible, so we can review transactions for bookkeeping without access to move your money. Your financial data is protected using modern security practices and trusted accounting systems.",
  },
  {
    q: "Do you handle business taxes?",
    a: "Yes. We handle federal, state, and local business tax filings for small businesses, including LLCs, S-Corps, C-Corps, partnerships, and sole proprietors. We also help with sales tax, payroll tax, franchise tax, and year-end filings.",
  },
  {
    q: "What accounting software do you use?",
    a: "We work with QuickBooks Online, Xero, and other commonly used accounting systems. If you already have software, we can take it over. If not, we'll help set it up as part of onboarding.",
  },
  {
    q: "How do you communicate with clients?",
    a: "You can message us on WhatsApp, iMessage, email, or your client inbox. Your dedicated accountant and AI agent help answer questions, collect documents, and keep your books, payroll, and tax filings moving.",
  },
] as const;

/** schema.org FAQPage for a list of question/answer pairs. */
export function faqPageJsonLd(items: ReadonlyArray<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export default function CTA() {
  return (
    <section className="py-16 md:py-[120px] px-5 md:px-0">
      <div className="max-w-[1280px] mx-auto bg-[#0053ce] rounded-[32px] md:rounded-[60px] p-8 md:p-24 text-center relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#94a6fe]/20 rounded-full blur-3xl pointer-events-none" />

        <h2 className="text-[32px] md:text-[60px] font-semibold leading-[1.1] tracking-[-0.02em] text-white mb-5 relative z-10">
          Your AI-powered finance team for books, taxes, and payroll.
        </h2>
        <p className="text-white/80 text-base md:text-xl leading-relaxed max-w-2xl mx-auto mb-8 md:mb-10 relative z-10">
          Talk to your CPA team and AI agent on WhatsApp or iMessage while your books and filings
          run on autopilot.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center relative z-10">
          <a
            href="https://app.aceglobal.ai/"
            className="w-full md:w-auto inline-flex items-center justify-center bg-white text-[#0053ce] px-10 py-4 md:py-5 rounded-full font-medium text-lg md:text-xl hover:bg-[#f2f3ff] transition-all shadow-2xl"
          >
            Get started now
          </a>
        </div>
      </div>
    </section>
  );
}

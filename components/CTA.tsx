export default function CTA() {
  return (
    <section className="py-[120px] px-5 md:px-0">
      <div className="max-w-[1280px] mx-auto bg-[#0053ce] rounded-[60px] p-12 md:p-24 text-center relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#94a6fe]/20 rounded-full blur-3xl pointer-events-none" />

        <h2 className="text-[40px] md:text-[60px] font-semibold leading-[1.1] tracking-[-0.02em] text-white mb-6 relative z-10">
          Your bookkeeping &amp; taxes on autopilot.
        </h2>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center relative z-10">
          <button className="bg-white text-[#0053ce] px-10 py-5 rounded-full font-medium text-xl hover:bg-[#f2f3ff] transition-all shadow-2xl">
            Get started now
          </button>
          <button className="bg-[#196bfa] text-white border border-white/20 px-10 py-5 rounded-full font-medium text-xl hover:bg-white/10 transition-all">
            Book a demo
          </button>
        </div>
      </div>
    </section>
  );
}

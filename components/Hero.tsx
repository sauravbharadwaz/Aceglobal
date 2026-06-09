export default function Hero() {
  return (
    <section className="relative pt-40 pb-[120px] bg-white overflow-hidden">
      <div className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#94a6fe]/20 border border-[#94a6fe]/30 px-4 py-2 rounded-full mb-6">
          <div className="flex text-[#0053ce] text-base">
            {"★★★★★"}
          </div>
          <span className="text-sm font-medium tracking-wide text-[#243889]">
            5-star bookkeeping for startups
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-[40px] md:text-[60px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#00174c] max-w-4xl mx-auto mb-6">
          Your startup&apos;s books &amp; taxes —{" "}
          <span className="text-[#0053ce]">completely off your plate.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg leading-relaxed text-[#727687] max-w-2xl mx-auto mb-12">
          Ace Global is the all-in-one accounting platform that combines expert CPAs with powerful
          software to handle everything for you.
        </p>

        {/* CTAs */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button className="bg-[#0053ce] text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-[#0053ce]/90 transition-all shadow-xl shadow-[#0053ce]/25">
            Get started
          </button>
          <button className="bg-[#94a6fe] text-[#243889] px-8 py-4 rounded-full font-medium text-lg hover:bg-[#94a6fe]/80 transition-all">
            Book a demo
          </button>
        </div>
      </div>
    </section>
  );
}

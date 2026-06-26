import MinimalBackground from "./MinimalBackground";
import RotatingText from "./RotatingText";

export default function Hero() {
  return (
    <section className="relative pt-32 md:pt-40 pb-20 md:pb-[120px] bg-white overflow-hidden">
      {/* Floating 3D particles (Three.js) + drifting gradient blobs (Framer Motion) */}
      <MinimalBackground />
      {/* Softer white fade keeps the headline crisp and readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white pointer-events-none" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/40 backdrop-blur-md border border-white/50 px-4 py-2 rounded-full mb-6 shadow-sm">
          <div className="flex text-[#0053ce] text-base">
            {"★★★★★"}
          </div>
          <span className="text-sm font-medium tracking-wide text-[#243889]">
            5-star bookkeeping for{" "}
            <RotatingText
              texts={["startups", "small businesses", "agencies", "founders", "freelancers"]}
            />
          </span>
        </div>

        {/* Headline */}
        <h1 className="relative text-[32px] sm:text-[40px] md:text-[60px] font-medium leading-[1.12] md:leading-[1.1] tracking-[-0.02em] text-[#00174c] max-w-4xl mx-auto mb-5 md:mb-6">
          {/* Invisible sizer reserves the height of the longest-word case so the
              subheadline and CTA buttons never shift as the word cycles. The
              longest word is kept non-breaking to match RotatingWord's atomic
              inline-block, so wrapping (and thus height) matches the worst case. */}
          <span aria-hidden className="invisible">
            Your <span className="whitespace-nowrap">small business</span> books &amp; taxes —
            completely off your plate.
          </span>
          {/* Live headline overlaid within the reserved space */}
          <span className="absolute inset-0">
            Your{" "}
            <RotatingText texts={["farm", "trucking", "retail", "small business"]} />{" "}
            books &amp; taxes —{" "}
            <span className="text-[#0053ce]">completely off your plate.</span>
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-base md:text-lg leading-relaxed text-[#727687] max-w-2xl mx-auto mb-8 md:mb-12">
          Ace Global is the all-in-one accounting platform that combines expert CPAs with powerful
          software to handle everything for you.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
          <a
            href="https://app.aceglobal.ai/"
            className="inline-block text-center bg-[#0053ce] text-white px-6 md:px-8 py-2.5 md:py-4 rounded-full font-medium text-sm md:text-lg hover:bg-[#0053ce]/90 transition-all shadow-xl shadow-[#0053ce]/25"
          >
            Get started
          </a>
        </div>
      </div>
    </section>
  );
}

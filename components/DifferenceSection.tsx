/* Photo card with name + title overlaid at the bottom */
function PhotoCard({
  src,
  name,
  role,
  bg,
  objectPos = "object-top",
}: {
  src: string;
  name: string;
  role: string;
  bg: string;
  objectPos?: string;
}) {
  return (
    <div className={`relative rounded-3xl overflow-hidden h-[380px] md:h-[440px] ${bg}`}>
      <img
        src={src}
        alt={name}
        className={`absolute inset-0 w-full h-full object-cover ${objectPos}`}
      />
      {/* light fade so the dark text stays readable */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white/90 via-white/35 to-transparent" />
      <div className="absolute bottom-6 left-6 right-6">
        <p className="text-2xl font-semibold text-[#00174c] leading-tight">{name}</p>
        <p className="text-sm text-[#0053ce] font-medium mt-1">{role}</p>
      </div>
    </div>
  );
}

/* "Accounting on autopilot" — mini cash balance chart */
function AutopilotCard() {
  return (
    <div className="rounded-3xl bg-[#ebedff] p-8 h-[380px] md:h-[440px] flex flex-col">
      <h3 className="text-3xl font-semibold text-[#0053ce] leading-tight mb-2">
        Accounting on
        <br />
        autopilot
      </h3>
      <div className="mt-auto bg-white rounded-2xl shadow-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-[#00174c]">Cash Balance</span>
          <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-semibold">
            $1M+
          </span>
        </div>
        <svg viewBox="0 0 300 90" className="w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="cashFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0053ce" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#0053ce" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,75 L25,68 L50,72 L75,55 L100,60 L125,42 L150,48 L175,35 L200,40 L225,26 L250,30 L275,15 L300,20 L300,90 L0,90 Z"
            fill="url(#cashFill)"
          />
          <path
            d="M0,75 L25,68 L50,72 L75,55 L100,60 L125,42 L150,48 L175,35 L200,40 L225,26 L250,30 L275,15 L300,20"
            fill="none"
            stroke="#0053ce"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

/* "Onboard in Minutes" — circular check + progress bar */
function OnboardCard() {
  const r = 44;
  const c = 2 * Math.PI * r;
  return (
    <div className="rounded-3xl bg-[#ebedff] p-8 h-[380px] md:h-[440px] flex flex-col">
      <h3 className="text-3xl font-semibold text-[#00174c] leading-tight mb-2">Onboard in Minutes</h3>
      <div className="mt-auto bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
        <div className="relative w-24 h-24 mb-5">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r={r} fill="none" stroke="#dae2ff" strokeWidth="8" />
            <circle
              cx="50"
              cy="50"
              r={r}
              fill="none"
              stroke="#0053ce"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={c}
              strokeDashoffset={c * 0.1}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-[#0053ce] flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>
        <p className="text-sm font-semibold text-[#00174c] mb-2">90% Complete</p>
        <div className="w-full h-2 bg-[#dae2ff] rounded-full overflow-hidden">
          <div className="h-full bg-[#0053ce] rounded-full" style={{ width: "90%" }} />
        </div>
      </div>
    </div>
  );
}

/* Blue testimonial card */
function TestimonialCard() {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-[#196bfa] to-[#0040a2] p-8 h-[380px] md:h-[440px] flex flex-col justify-between text-white">
      <p className="text-2xl md:text-[28px] font-semibold leading-snug">
        &ldquo;Fantastic team, they got us set up super quickly. Very happy with Ace Global.&rdquo;
      </p>
      <div>
        <p className="font-semibold">Sebastian Janisch</p>
        <p className="text-white/70 text-sm">Co-Founder @ Bayesline</p>
      </div>
    </div>
  );
}

export default function DifferenceSection() {
  return (
    <section className="py-16 md:py-[120px] bg-white">
      <div className="max-w-[1280px] mx-auto px-5 md:px-6">
        {/* Row 1 — team + autopilot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 md:mb-20">
          <PhotoCard
            src="/team-david.png"
            name="David Z."
            role="15+ years of experience"
            bg="bg-[#ebedff]"
          />
          <PhotoCard
            src="/team-anil.png"
            name="Anil R."
            role="12+ years of experience"
            bg="bg-white"
            objectPos="object-top"
          />
          <AutopilotCard />
        </div>

        {/* Heading */}
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-[28px] md:text-[40px] font-semibold leading-[1.15] text-[#00174c]">
            The Ace Global Difference
            <br />
            <span className="text-[#0053ce]">Expert Accountants + Software</span>
          </h2>
          <p className="text-[#727687] text-lg max-w-xl mx-auto mt-5">
            Ace Global is the leading technology platform with experienced accounting and tax
            expertise.
          </p>
        </div>

        {/* Row 2 — onboard + photo + testimonial */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <OnboardCard />
          <PhotoCard
            src="/team-smile.webp"
            name="Real human experts"
            role="On your WhatsApp or iMessage"
            bg="bg-[#ebedff]"
          />
          <TestimonialCard />
        </div>
      </div>
    </section>
  );
}

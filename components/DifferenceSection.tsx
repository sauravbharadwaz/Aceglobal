const integrations = ["Slack", "Mercury", "Stripe", "Brex", "QuickBooks", "Gusto"];

export default function DifferenceSection() {
  return (
    <section className="py-[120px] bg-white">
      <div className="max-w-[1280px] mx-auto px-5 md:px-6">
        <div className="text-center mb-20">
          <h2 className="text-[28px] md:text-[40px] font-medium leading-[1.2] text-[#00174c]">
            The Ace Global Difference —<br />
            Expert Accountants +{" "}
            <span className="text-[#0053ce]">Software</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* World-Class Accountants */}
          <div className="bg-[#ebedff] rounded-3xl p-10 flex flex-col justify-between">
            <div>
              <h4 className="text-2xl font-medium text-[#00174c] mb-4">World-Class Accountants</h4>
              <p className="text-[#727687]">
                Real people, not just algorithms. Your dedicated CPA is always one message away on
                Slack or email.
              </p>
            </div>
            <div className="mt-12 flex -space-x-4">
              {[
                { initials: "SK", bg: "bg-[#0053ce]" },
                { initials: "JP", bg: "bg-[#4658aa]" },
                { initials: "AR", bg: "bg-[#172d65]" },
              ].map((p) => (
                <div
                  key={p.initials}
                  className={`w-14 h-14 rounded-full ${p.bg} border-4 border-[#ebedff] flex items-center justify-center text-white text-xs font-semibold`}
                >
                  {p.initials}
                </div>
              ))}
              <div className="w-14 h-14 rounded-full border-4 border-[#ebedff] bg-[#0053ce] text-white flex items-center justify-center font-semibold text-sm">
                50+
              </div>
            </div>
          </div>

          {/* Powerful Software */}
          <div className="bg-[#0053ce]/5 rounded-3xl p-10 flex flex-col justify-between">
            <div>
              <h4 className="text-2xl font-medium text-[#00174c] mb-4">Powerful Financial Software</h4>
              <p className="text-[#727687]">
                Automate the boring stuff. Our platform integrates with your entire stack to pull
                data and find savings automatically.
              </p>
            </div>
            <div className="mt-12 flex gap-4 flex-wrap">
              {integrations.map((name) => (
                <div
                  key={name}
                  className="p-3 bg-white rounded-xl shadow-sm flex items-center justify-center min-w-[56px]"
                >
                  <span className="text-xs font-semibold text-[#0053ce]">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

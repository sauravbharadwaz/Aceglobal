import Link from "next/link";

/* Small white tile with a generic AI glyph (placeholder marks — drop official
   provider SVGs into /public/logos and swap for <img> if desired) */
function AiTile({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#00174c]">
      {children}
    </div>
  );
}

function SocialCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href="#"
      aria-label={label}
      className="bg-[#ebedff] rounded-3xl flex items-center justify-center h-28 md:h-auto text-[#00174c] hover:text-[#0053ce] transition-colors"
    >
      {children}
    </a>
  );
}

function LinkCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="bg-[#ebedff] rounded-3xl p-7">
      <p className="text-lg font-semibold text-[#00174c] mb-5">{title}</p>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item}>
            <Link
              href="#"
              className="text-[#5a5f73] hover:text-[#0053ce] text-sm transition-colors leading-relaxed"
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-white pt-10 pb-12">
      <div className="max-w-[1280px] mx-auto px-5 md:px-6 space-y-5">
        {/* Newsletter + AI summary card */}
        <div className="bg-[#ebedff] rounded-3xl p-8 md:p-10 flex flex-col lg:flex-row lg:items-center gap-8 justify-between">
          <div className="flex-1">
            <h3 className="text-2xl md:text-3xl font-semibold text-[#00174c] mb-6">
              Join our newsletter
            </h3>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white rounded-xl px-4 py-3.5 text-sm text-[#00174c] placeholder:text-[#727687] focus:outline-none focus:ring-2 focus:ring-[#0053ce]/30"
              />
              <button className="bg-[#172d65] text-white px-7 py-3.5 rounded-xl text-sm font-medium hover:bg-[#0053ce] transition-colors">
                Subscribe
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <p className="text-xl md:text-2xl font-semibold text-[#00174c] leading-snug max-w-[220px]">
              Get an AI summary of Ace Global
            </p>
            <div className="flex gap-3">
              {/* Generic AI glyphs (sparkle / asterisk / starburst) */}
              <AiTile>
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2l2.2 6.5L21 11l-6.8 2.5L12 20l-2.2-6.5L3 11l6.8-2.5z" />
                </svg>
              </AiTile>
              <AiTile>
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M11 2h2v8.3l5.9-5.9 1.4 1.4-5.9 5.9H22v2h-7.6l5.9 5.9-1.4 1.4-5.9-5.9V22h-2v-7.9l-5.9 5.9-1.4-1.4 5.9-5.9H2v-2h7.6L3.7 4.8l1.4-1.4L11 9.3z" />
                </svg>
              </AiTile>
              <AiTile>
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />
                </svg>
              </AiTile>
            </div>
          </div>
        </div>

        {/* Brand row + social cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          <div className="md:col-span-7 bg-[#ebedff] rounded-3xl p-8 flex flex-col sm:flex-row sm:items-center gap-6">
            <Link href="/" className="text-3xl font-semibold text-[#0053ce] shrink-0">
              Ace Global
            </Link>
            <span className="hidden sm:block w-px h-10 bg-[#c2c6d8]/60" />
            <p className="text-[#424655] text-base">
              Startup bookkeeping &amp; tax automation
            </p>
            <div className="sm:ml-auto">
              <span className="inline-flex items-center gap-2 border border-green-500/60 text-[#00174c] rounded-lg px-4 py-2.5 text-sm bg-white">
                Review us <span className="text-green-500">★</span>
                <span className="font-semibold">Trustpilot</span>
              </span>
            </div>
          </div>

          {/* X */}
          <div className="md:col-span-1 hidden md:block" />
          <SocialCard label="X (Twitter)">
            <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </SocialCard>
          {/* LinkedIn */}
          <SocialCard label="LinkedIn">
            <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </SocialCard>
          {/* YouTube */}
          <SocialCard label="YouTube">
            <svg className="w-9 h-9 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.6 15.6V8.4L15.8 12z" />
            </svg>
          </SocialCard>
        </div>

        {/* Link bento columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
          {/* Col 1 */}
          <div className="flex flex-col gap-5">
            <LinkCard
              title="For Startups"
              items={["Bookkeeping", "Corporate Taxes", "TaxPass", "Pricing"]}
            />
            <LinkCard title="For Accountants" items={["Partner Program"]} />
          </div>

          {/* Col 2 */}
          <div className="flex flex-col gap-5">
            <LinkCard
              title="Free Tools"
              items={[
                "Deadline alerts",
                "Delaware Franchise Tax calculator",
                "Runway calculator",
                "Burn rate calculator",
              ]}
            />
          </div>

          {/* Col 3 */}
          <div className="flex flex-col gap-5">
            <LinkCard
              title="Integrations"
              items={["QuickBooks", "Stripe", "Mercury", "Brex"]}
            />
            <LinkCard title="Community" items={["Events", "Blog", "Founder Journal"]} />
          </div>

          {/* Col 4 */}
          <div className="flex flex-col gap-5">
            <LinkCard title="Company" items={["About Us", "Careers", "Contact"]} />
            <LinkCard title="Support" items={["Help Center", "Privacy", "Terms"]} />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[#727687] text-xs">
            © {new Date().getFullYear()} Ace Global. All rights reserved.
          </p>
          <p className="text-[#727687] text-xs">Made for founders, by founders.</p>
        </div>
      </div>
    </footer>
  );
}

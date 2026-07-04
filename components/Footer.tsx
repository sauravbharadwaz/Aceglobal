import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

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
      className="bg-white/[0.06] rounded-3xl flex items-center justify-center h-28 md:h-auto text-white hover:text-[#b2c5ff] hover:bg-white/10 transition-colors"
    >
      {children}
    </a>
  );
}

function LinkCard({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div className="bg-white/[0.06] rounded-3xl p-7">
      <p className="text-lg font-semibold text-white mb-5">{title}</p>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="text-[#dbe1ff]/60 hover:text-white text-sm transition-colors leading-relaxed"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#172d65] pt-12 pb-12">
      <div className="max-w-[1280px] mx-auto px-5 md:px-6 space-y-5">
        {/* Newsletter card */}
        <div className="bg-white/[0.06] rounded-3xl p-8 md:p-10">
          <div className="flex-1">
            <h3 className="text-2xl md:text-3xl font-semibold text-white mb-3">
              Join our newsletter
            </h3>
            <p className="text-[#dbe1ff]/70 text-sm mb-6 max-w-md">
              Get practical tax, bookkeeping, payroll, and compliance tips for small business
              owners.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Brand row + social cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          <div className="md:col-span-7 bg-white/[0.06] rounded-3xl p-8 flex flex-col sm:flex-row sm:items-center gap-6">
            <Link href="/" className="text-3xl font-semibold text-white shrink-0">
              Ace Global
            </Link>
            <span className="hidden sm:block w-px h-10 bg-white/20" />
            <p className="text-[#dbe1ff]/70 text-base">
              Bookkeeping, tax, payroll, and compliance for small businesses
            </p>
            <div className="sm:ml-auto">
              <span className="inline-flex items-center gap-2 border border-green-400/50 text-[#00174c] rounded-lg px-4 py-2.5 text-sm bg-white">
                Review us <span className="text-green-500">★</span>
                <span className="font-semibold">Trustpilot</span>
              </span>
            </div>
          </div>

          <div className="md:col-span-1 hidden md:block" />
          {/* X */}
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

        {/* Link columns — only pages the site actually provides */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-start">
          <LinkCard
            title="Platform"
            items={[
              { label: "Bookkeeping", href: "/bookkeeping" },
              { label: "Business Taxes", href: "/corporate-taxes" },
              { label: "Company Formation", href: "/company-formation" },
            ]}
          />
          <LinkCard
            title="Explore"
            items={[
              { label: "Blog", href: "/blog" },
              { label: "Pricing", href: "/pricing" },
              { label: "Resources", href: "/resources" },
            ]}
          />
        </div>

        {/* Bottom bar */}
        <div className="pt-6 space-y-3">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-[#dbe1ff]/40 text-xs">
              © {new Date().getFullYear()} Ace Global. All rights reserved.
            </p>
            <p className="text-[#dbe1ff]/40 text-xs">
              Books, taxes, payroll, and compliance — handled for small businesses.
            </p>
          </div>
          <p className="text-[#dbe1ff]/30 text-xs text-center">
            Built for small business owners who want clean books, timely taxes, and fewer
            surprises.
          </p>
        </div>
      </div>
    </footer>
  );
}

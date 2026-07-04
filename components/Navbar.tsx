"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "shadow-[0px_4px_20px_rgba(15,38,120,0.08)] shadow-xl" : "shadow-[0px_4px_20px_rgba(15,38,120,0.08)]"
      }`}
    >
      <div className="relative flex justify-between items-center max-w-[1280px] mx-auto px-5 md:px-6 h-20">
        {/* Logo */}
        <Link href="/" className="text-2xl font-semibold text-[#00174c]">
          Ace Global
        </Link>

        {/* Nav links — centered in the header */}
        <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          {/* Platform dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-[#00174c] text-sm hover:text-[#0053ce] transition-colors duration-200 whitespace-nowrap py-2">
              Platform
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 hidden group-hover:block">
              <div className="bg-[#f2f3ff] rounded-2xl shadow-[0px_12px_40px_rgba(15,38,120,0.14)] border border-[#c2c6d8]/30 p-6 w-[420px] space-y-5">
                <Link href="/bookkeeping" className="block group/item">
                  <p className="text-base font-semibold text-[#00174c] group-hover/item:text-[#0053ce] transition-colors">
                    Bookkeeping
                  </p>
                  <p className="text-sm text-[#727687] mt-0.5">
                    Get your books closed and your financials monthly, quarterly, or annually.
                  </p>
                </Link>
                <Link href="/corporate-taxes" className="block group/item">
                  <p className="text-base font-semibold text-[#00174c] group-hover/item:text-[#0053ce] transition-colors">
                    Corporate Taxes
                  </p>
                  <p className="text-sm text-[#727687] mt-0.5">
                    Get your Delaware Franchise Tax, Federal &amp; State Corporate Income Taxes filed.
                  </p>
                </Link>
                <Link href="/company-formation" className="block group/item">
                  <p className="text-base font-semibold text-[#00174c] group-hover/item:text-[#0053ce] transition-colors">
                    Company Formation
                  </p>
                  <p className="text-sm text-[#727687] mt-0.5">
                    Form your LLC or C-Corp with incorporation, EIN, registered agent &amp; compliance.
                  </p>
                </Link>
              </div>
            </div>
          </div>

          {[
            { label: "Resources", href: "/resources" },
            { label: "Pricing", href: "/pricing" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[#00174c] text-sm hover:text-[#0053ce] transition-colors duration-200 whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-6">
          <a href="https://app.aceglobal.ai/?mode=login" className="hidden md:block text-[#0053ce] text-sm font-medium hover:opacity-80 transition-opacity">
            Sign in
          </a>
          <a
            href="https://app.aceglobal.ai/"
            className="inline-block bg-[#0053ce] text-white px-6 py-3 rounded-full text-sm font-medium scale-95 active:scale-90 transition-transform shadow-lg shadow-[#0053ce]/20"
          >
            Get started
          </a>
          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-[#00174c]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#c2c6d8]/30 px-5 py-4 flex flex-col gap-4">
          <Link
            href="/bookkeeping"
            className="text-[#00174c] text-sm font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Bookkeeping
          </Link>
          <Link
            href="/corporate-taxes"
            className="text-[#00174c] text-sm font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Corporate Taxes
          </Link>
          <Link
            href="/company-formation"
            className="text-[#00174c] text-sm font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Company Formation
          </Link>
          {[
            { label: "Resources", href: "/resources" },
            { label: "Pricing", href: "/pricing" },
            { label: "Sign in", href: "https://app.aceglobal.ai/?mode=login" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[#00174c] text-sm font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

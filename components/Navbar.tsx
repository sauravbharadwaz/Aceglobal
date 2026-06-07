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
      <div className="flex justify-between items-center max-w-[1280px] mx-auto px-5 md:px-6 h-20">
        {/* Logo + nav links */}
        <div className="flex items-center gap-12">
          <Link href="/" className="text-2xl font-bold text-[#00174c]">
            Ace Global
          </Link>
          <div className="hidden md:flex gap-6">
            {["Platform", "Resources", "Community", "Pricing", "Book a demo"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-[#00174c] text-sm hover:text-[#0053ce] transition-colors duration-200"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-6">
          <Link href="#" className="hidden md:block text-[#0053ce] text-sm font-semibold hover:opacity-80 transition-opacity">
            Sign in
          </Link>
          <button className="bg-[#0053ce] text-white px-6 py-3 rounded-full text-sm font-semibold scale-95 active:scale-90 transition-transform shadow-lg shadow-[#0053ce]/20">
            Get started
          </button>
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
          {["Platform", "Resources", "Community", "Pricing", "Book a demo", "Sign in"].map((item) => (
            <Link
              key={item}
              href="#"
              className="text-[#00174c] text-sm font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

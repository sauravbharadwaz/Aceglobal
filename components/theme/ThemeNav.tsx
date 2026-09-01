"use client";

import { useState } from "react";

// Shared dark/orange top nav for the redesigned pages. Float-on-scroll is
// handled by ThemeShell/HomeExperience (they toggle `.float` on this element).
// Includes the Platform hover dropdown (desktop) and a hamburger menu (mobile).
export default function ThemeNav({ onToggle }: { onToggle: () => void }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <nav className="nav">
      <div className="wrap">
        <a href="/" className="logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="logo-img" src="/logo-orange.svg" alt="Ace Global logo" />
          <span>Ace Global</span>
        </a>

        <div className="nav-links">
          <div className="nav-dd">
            <a href="/#platform">
              Platform
              <svg viewBox="0 0 10 10">
                <path d="M2 3.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </a>
            <div className="nav-dd-pop">
              <div className="nav-dd-menu">
                <a href="/bookkeeping">
                  <b>Bookkeeping</b>
                  <small>Close your books monthly, quarterly, or annually.</small>
                </a>
                <a href="/corporate-taxes">
                  <b>Business Taxes</b>
                  <small>Delaware Franchise, federal &amp; state — filed on time.</small>
                </a>
                <a href="/company-formation">
                  <b>Company Formation</b>
                  <small>Incorporate, get your EIN, and stay compliant.</small>
                </a>
              </div>
            </div>
          </div>
          <a href="/resources">Resources</a>
          <a href="/blog">Blog</a>
          <a href="/pricing">Pricing</a>
        </div>

        <div className="nav-r">
          <button className="mode" onClick={onToggle} aria-label="Toggle theme" type="button">
            <span>☾</span>
            <span>☀</span>
          </button>
          <a href="https://app.aceglobal.ai/?mode=login" className="nav-signin">
            Sign in
          </a>
          <a href="https://app.aceglobal.ai/" className="pill orange">
            Get started
          </a>
          <button
            className="nav-burger"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {open ? (
        <div className="nav-mobile" onClick={close}>
          <span className="sec">Platform</span>
          <a href="/bookkeeping">Bookkeeping</a>
          <a href="/corporate-taxes">Business Taxes</a>
          <a href="/company-formation">Company Formation</a>
          <span className="sec">Explore</span>
          <a href="/resources">Resources</a>
          <a href="/blog">Blog</a>
          <a href="/pricing">Pricing</a>
          <a href="https://app.aceglobal.ai/?mode=login">Sign in</a>
          <a href="https://app.aceglobal.ai/" className="pill orange">
            Get started
          </a>
        </div>
      ) : null}
    </nav>
  );
}

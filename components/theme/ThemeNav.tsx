"use client";

// Shared dark/orange top nav for the redesigned content pages. Float-on-scroll
// is handled by ThemeShell (it toggles `.float` on this element). Purely
// presentational otherwise; the theme toggle is wired via `onToggle`.
export default function ThemeNav({ onToggle }: { onToggle: () => void }) {
  return (
    <nav className="nav">
      <div className="wrap">
        <a href="/" className="logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="logo-img" src="/logo-orange.svg" alt="Ace Global logo" />
          <span>Ace Global</span>
        </a>
        <div className="nav-links">
          <a href="/#platform">
            Platform
            <svg viewBox="0 0 10 10">
              <path d="M2 3.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </a>
          <a href="/resources">Resources</a>
          <a href="/blog">Blog</a>
          <a href="/pricing">Pricing</a>
        </div>
        <div className="nav-r">
          <button className="mode" onClick={onToggle} aria-label="Toggle theme" type="button">
            <span>☾</span>
            <span>☀</span>
          </button>
          <a href="https://app.aceglobal.ai/?mode=login">Sign in</a>
          <a href="https://app.aceglobal.ai/" className="pill orange">
            Get started
          </a>
        </div>
      </div>
    </nav>
  );
}

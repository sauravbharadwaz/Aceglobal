// Shared dark/orange footer for the redesigned pages.
export default function ThemeFooter() {
  return (
    <footer>
      <div className="wrap">
        <div className="f-grid">
          <div>
            <a className="logo" href="/">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="logo-img" src="/logo-orange.svg" alt="Ace Global logo" />
              <span>Ace Global</span>
            </a>
            <p>Bookkeeping, tax, payroll, and compliance for small businesses.</p>
            <p style={{ marginTop: -10 }}>
              <span className="stars-row">★</span> Review us on Trustpilot
            </p>
            <div className="social">
              <i />
              <i />
              <i />
            </div>
          </div>
          <div>
            <h5>Platform</h5>
            <a href="/bookkeeping">Bookkeeping</a>
            <a href="/corporate-taxes">Business Taxes</a>
            <a href="/company-formation">Company Formation</a>
          </div>
          <div>
            <h5>Explore</h5>
            <a href="/blog">Blog</a>
            <a href="/pricing">Pricing</a>
            <a href="/resources">Resources</a>
          </div>
          <div>
            <h5>Account</h5>
            <a href="https://app.aceglobal.ai/?mode=login">Sign in</a>
            <a href="https://app.aceglobal.ai/">Get started</a>
          </div>
          <div>
            <h5>Newsletter</h5>
            <a href="#" style={{ maxWidth: 220 }}>
              Get practical tax, bookkeeping, payroll, and compliance tips for small business owners.
            </a>
          </div>
        </div>
        <div className="f-sub">
          <span>Join our newsletter</span>
          <form onSubmit={(e) => e.preventDefault()}>
            <input placeholder="Enter your email" />
            <button type="submit">›</button>
          </form>
        </div>
        <div className="f-bottom">
          <span>Books, taxes, payroll, and compliance — handled for small businesses.</span>
          <span>© {new Date().getFullYear()} Ace Global. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

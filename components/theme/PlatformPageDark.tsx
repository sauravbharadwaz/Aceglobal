import ThemeShell from "./ThemeShell";

export type Feature = { tag: string; title: string; desc: string; bullets: string[] };
export type Testimonial = { quote: string; name: string; role: string; initials: string };
export type Comparison = {
  title: string;
  sub: string;
  cols: [string, string, string];
  rows: (string | boolean)[][]; // [feature, us, altA, altB]
};

function Val({ v }: { v: string | boolean }) {
  if (typeof v === "string") return <span className="cell">{v}</span>;
  return (
    <span className="cell">{v ? <span className="yes">✓</span> : <span className="no">—</span>}</span>
  );
}

export default function PlatformPageDark({
  eyebrow,
  title,
  accent,
  subtitle,
  heroImg,
  heroImgAlt,
  features,
  comparison,
  testimonials,
  testimonialQuote,
  ctaTitle,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  subtitle: string;
  heroImg?: string;
  heroImgAlt?: string;
  features: Feature[];
  comparison: Comparison;
  testimonials: Testimonial[];
  testimonialQuote: string;
  ctaTitle?: string;
}) {
  return (
    <ThemeShell>
      {/* Hero */}
      <section>
        <div className="wrap">
          <div className="page-head">
            <div className="tag" data-fade>
              <i>✦</i>
              {eyebrow}
            </div>
            <h1 data-fade>
              {title} <span className="accent">{accent}</span>
            </h1>
            <p className="sub" data-fade>
              {subtitle}
            </p>
            <div className="cta" style={{ marginTop: 28 }} data-fade>
              <a className="pill orange" href="https://app.aceglobal.ai/">
                Get started
              </a>
              <a className="pill ghost" href="/pricing">
                See pricing
              </a>
            </div>
          </div>
          {heroImg ? (
            <div className="feat-hero-img" data-fade>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={heroImg} alt={heroImgAlt || ""} />
            </div>
          ) : null}
        </div>
      </section>

      {/* Features */}
      <section>
        <div className="wrap">
          <div className="bento" style={{ gridTemplateColumns: "repeat(3,1fr)", marginTop: 0 }}>
            {features.map((f) => (
              <div className="card" data-fade key={f.tag}>
                <span className="klabel">{f.tag}</span>
                <h3 style={{ fontSize: 19, letterSpacing: "-.02em" }}>{f.title}</h3>
                <p>{f.desc}</p>
                <ul className="list">
                  {f.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section>
        <div className="wrap" style={{ maxWidth: 1000 }}>
          <div className="center">
            <div className="tag" data-fade>
              <i>✦</i>Compare
            </div>
          </div>
          <h2 className="h2 center" data-fade>
            {comparison.title}
          </h2>
          <p className="sub center" data-fade>
            {comparison.sub}
          </p>
          <div className="cmp" data-fade>
            <div className="row head">
              <div className="cell feat">Features</div>
              <div className="cell hot">{comparison.cols[0]}</div>
              <div className="cell">{comparison.cols[1]}</div>
              <div className="cell">{comparison.cols[2]}</div>
            </div>
            {comparison.rows.map((r) => (
              <div className="row" key={r[0] as string}>
                <div className="cell feat">{r[0] as string}</div>
                <Val v={r[1]} />
                <Val v={r[2]} />
                <Val v={r[3]} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <div className="wrap">
          <h2 className="h2 center" data-fade>
            {testimonialQuote}
          </h2>
          <div className="bento" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
            {testimonials.map((t) => (
              <div className="quote-card" data-fade key={t.name}>
                <div className="srow">★★★★★</div>
                <p>“{t.quote}”</p>
                <div className="who">
                  <i>{t.initials}</i>
                  <div>
                    <b>{t.name}</b>
                    <small>{t.role}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact">
        <div className="wrap">
          <div className="contact-card" data-contact>
            <h2 className="h2">
              {ctaTitle || "Your AI-powered finance team for books, taxes, and payroll."}
            </h2>
            <p>
              Talk to your CPA team and AI agent on WhatsApp or iMessage while your books and filings
              run on autopilot.
            </p>
            <a href="https://app.aceglobal.ai/" className="pill white">
              Get started now
            </a>
          </div>
        </div>
      </section>
    </ThemeShell>
  );
}

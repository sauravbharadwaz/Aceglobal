"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Faithful port of the approved dark/orange landing design. All markup lives
// under the `.ag` wrapper (see app/home-theme.css); the animation code runs
// scoped to the root ref so it never touches the rest of the site, and cleans
// itself up on unmount. Uses the bundled GSAP (not a CDN).

const TESTIMONIALS: [string, string, string, string][] = [
  ["JW", "James Wilson", "Owner, Wilson Auto Repair", "Ace Global handled our books, payroll, and state filings without me having to chase anything."],
  ["LR", "Leo Richards", "COO, TerraForm Services", "Incredible support. My dedicated accountant responds fast and actually understands how a small business operates."],
  ["TR", "Tom Rivera", "Founder, Gridcraft Construction", "We switched from an expensive local firm and saved thousands. The quality is better and communication much faster."],
  ["SL", "Sophie Lin", "Owner, Brightwave Salon", "Onboarding was effortless. Within a week our books were cleaned up, reconciled, and ready for tax season."],
  ["AS", "Aria Song", "CEO, Horizon Lab", "The only accounting team that actually understands small business compliance. They keep us ahead on deadlines."],
  ["PK", "Priya Kapoor", "Owner, Kapoor Dental Group", "We finally have clean financials every month. Ace Global helped us understand cash flow and what to set aside."],
  ["NP", "Nina Park", "CFO, Loopify Retail", "The monthly reports are clear and easy to understand. I know exactly where the business stands."],
  ["MH", "Marcus Hale", "Founder, Stackline Logistics", "Finally an accounting team that speaks business-owner language. They flag issues before they get expensive."],
  ["RC", "Rachel Chen", "Owner, Bay Area Café", "They got payroll, sales tax, and monthly bookkeeping under control. I can focus on customers instead of paperwork."],
  ["DK", "David Kim", "Founder, Kim Home Services", "Before Ace Global, tax season was stressful. Now our books stay updated and we know what to expect before filing."],
  ["AM", "Anita Mehta", "Owner, Mehta Consulting Group", "The real-time dashboard shows revenue, expenses, and cash flow without waiting until month-end."],
];

export default function HomeExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"dark" | "light">("dark");

  // Restore saved mode preference.
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ag-mode");
      if (saved === "light" || saved === "dark") setMode(saved);
    } catch {}
  }, []);

  const toggleMode = () =>
    setMode((m) => {
      const next = m === "light" ? "dark" : "light";
      try {
        localStorage.setItem("ag-mode", next);
      } catch {}
      return next;
    });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const q = (s: string) => Array.from(root.querySelectorAll(s)) as HTMLElement[];

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Failsafe: if anything below throws, make sure the page is fully visible.
    const revealAll = () => {
      q(".w > span").forEach((s) => {
        s.style.opacity = "1";
        s.style.transform = "none";
        s.style.filter = "none";
      });
      q(".hero [data-fade], [data-fade]").forEach((s) => (s.style.opacity = "1"));
      q(".node").forEach((n) => {
        n.style.opacity = "1";
        n.style.transform = "scale(1)";
      });
      const loader = root.querySelector<HTMLElement>(".loader");
      if (loader) loader.style.display = "none";
    };

    const ctx = gsap.context(() => {
      try {
        /* rotating words (idempotent — skip if already built) */
        q(".rot").forEach((r) => {
          if (r.querySelector("span")) return;
          const words = (r.dataset.rot || "").split("|");
          r.innerHTML = words
            .map((w, i) => `<span class="${i ? "" : "on"}">${w}</span>`)
            .join("");
          let i = 0;
          const spans = Array.from(r.querySelectorAll("span"));
          if (reduce || spans.length < 2) return;
          setInterval(() => {
            const prev = spans[i];
            i = (i + 1) % spans.length;
            gsap.to(prev, {
              opacity: 0,
              y: "-.6em",
              duration: 0.4,
              ease: "power2.in",
              onComplete() {
                prev.classList.remove("on");
                gsap.set(prev, { y: ".6em" });
              },
            });
            gsap.fromTo(
              spans[i],
              { opacity: 0, y: ".6em" },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: 0.35,
                ease: "power3.out",
                onStart() {
                  spans[i].classList.add("on");
                },
              }
            );
          }, 2600);
        });

        /* split headings into words (idempotent; keep .rot intact; ignore
           React comment-marker nodes so they don't become "undefined") */
        q("[data-words]").forEach((h) => {
          if (h.querySelector(".w")) return;
          const out: string[] = [];
          h.childNodes.forEach((n) => {
            if (n.nodeType === 3) {
              (n.textContent || "")
                .trim()
                .split(/\s+/)
                .filter(Boolean)
                .forEach((w) => out.push(`<span class="w"><span>${w}</span></span>`));
            } else if (n.nodeType === 1) {
              out.push(`<span class="w"><span>${(n as HTMLElement).outerHTML}</span></span>`);
            }
          });
          h.innerHTML = out.join(" ");
        });
        const wordsIn = (el: Element, opts: gsap.TweenVars = {}) =>
          gsap.to(el.querySelectorAll(".w > span"), {
            opacity: 1,
            x: 0,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
            stagger: 0.08,
            ease: "power3.out",
            ...opts,
          });

        gsap.set(".hero [data-fade]", { opacity: 0, y: 16 });

        /* preloader */
        const pre = gsap.timeline({ defaults: { ease: "power3.out" } });
        pre
          .to(".mark .ring", { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut" })
          .to(".mark .dot", { scale: 1, duration: 0.5, ease: "back.out(2)" }, "-=.3")
          .to(".mark", { rotate: 180, duration: 0.6, ease: "power2.inOut" })
          .to(".loader .word span", { x: 0, opacity: 1, duration: 0.7 }, "-=.3")
          .to(".loader-inner", { opacity: 0, scale: 0.9, duration: 0.5, ease: "power2.in" }, "+=.4")
          .to(".loader", {
            opacity: 0,
            duration: 0.6,
            onComplete() {
              const l = root.querySelector<HTMLElement>(".loader");
              if (l) l.style.display = "none";
            },
          })
          .from(".nav", { y: -20, opacity: 0, duration: 0.7 }, "-=.3")
          .to(".beam", { opacity: 1, x: 0, duration: 1.6, ease: "power2.out" }, "-=.5")
          .add(() => {
            const h1 = root.querySelector(".hero h1");
            if (h1) wordsIn(h1);
          }, "-=1.4")
          .to(".hero [data-fade]", { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, "-=.9")
          .from(".chip", { scale: 0.6, opacity: 0, duration: 0.9, ease: "back.out(1.6)" }, "-=.7")
          .to(".node", { opacity: 1, scale: 1, duration: 0.7, stagger: 0.08, ease: "back.out(1.8)" }, "-=.5");

        /* circuit pulses */
        q(".circuit .pulse").forEach((p, i) => {
          const len = (p as unknown as SVGPathElement).getTotalLength();
          gsap.set(p, { strokeDasharray: `60 ${len}`, strokeDashoffset: 60 });
          gsap.to(p, {
            strokeDashoffset: -len,
            duration: 2.2 + i * 0.3,
            repeat: -1,
            ease: "power1.inOut",
            delay: 1.8 + i * 0.35,
            repeatDelay: 0.8,
          });
        });
        gsap.to(".hero-inner", {
          y: -80,
          opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: ".hero", start: "top top", end: "60% top", scrub: true },
        });
        gsap.to(".circuit", {
          y: -40,
          scale: 0.94,
          ease: "none",
          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
        });

        /* nav float + light-section detection */
        const nav = root.querySelector(".nav");
        ScrollTrigger.create({
          start: 120,
          onToggle: (s) => nav?.classList.toggle("float", s.isActive),
        });
        q("[data-theme]").forEach((p) => {
          const set = (on: boolean) => nav?.classList.toggle("on-light", on);
          ScrollTrigger.create({
            trigger: p,
            start: "top 60px",
            end: "bottom 60px",
            onEnter: () => set(p.dataset.theme === "light"),
            onEnterBack: () => set(p.dataset.theme === "light"),
            onLeaveBack: () => set(false),
          });
        });

        /* reveals */
        q("[data-words]").forEach((h) => {
          if (h.closest(".hero")) return;
          ScrollTrigger.create({ trigger: h, start: "top 85%", once: true, onEnter: () => wordsIn(h) });
        });
        q("[data-fade]").forEach((el, i) => {
          if (el.closest(".hero")) return;
          gsap.fromTo(
            el,
            { opacity: 0, y: 36 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
              delay: (i % 3) * 0.08,
            }
          );
        });
        q(".panel").forEach((p) =>
          gsap.from(p, {
            y: 60,
            scale: 0.985,
            ease: "power2.out",
            scrollTrigger: { trigger: p, start: "top bottom", end: "top 40%", scrub: true },
          })
        );
        q(".card").forEach((c) =>
          c.addEventListener("mousemove", (e) => {
            const r = c.getBoundingClientRect();
            c.style.setProperty("--mx", (e as MouseEvent).clientX - r.left + "px");
            c.style.setProperty("--my", (e as MouseEvent).clientY - r.top + "px");
          })
        );

        /* mock rows / charts / progress */
        q("[data-tx],[data-mock],[data-tax]").forEach((m) =>
          gsap.to(m.querySelectorAll(".row"), {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: m, start: "top 85%", once: true },
          })
        );
        gsap.to("[data-chart] i", {
          scaleY: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-chart]", start: "top 85%", once: true },
        });
        q("[data-progress]").forEach((b) =>
          gsap.to(b, {
            width: b.dataset.progress + "%",
            duration: 1.6,
            ease: "power3.out",
            scrollTrigger: { trigger: b, start: "top 90%", once: true },
          })
        );

        /* chat + deductions */
        q("[data-chat]").forEach((c) =>
          gsap.to(c.querySelectorAll(".msg"), {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.35,
            ease: "power3.out",
            scrollTrigger: { trigger: c, start: "top 85%", once: true },
          })
        );
        const deds = root.querySelector("[data-deds]");
        if (deds)
          ScrollTrigger.create({
            trigger: deds,
            start: "top 85%",
            once: true,
            onEnter: () => deds.classList.add("go"),
          });

        /* counters */
        q("[data-count]").forEach((el) => {
          const t = parseFloat(el.dataset.count || "0");
          const o = { v: 0 };
          gsap.to(o, {
            v: t,
            duration: 2,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
            onUpdate() {
              el.textContent = Math.round(o.v).toLocaleString("en-US");
            },
          });
        });

        /* contact glow */
        const contact = root.querySelector(".contact-card");
        if (contact)
          ScrollTrigger.create({
            trigger: "[data-contact]",
            start: "top 75%",
            once: true,
            onEnter: () => contact.classList.add("lit"),
          });
      } catch (err) {
        console.error("[HomeExperience] init failed, revealing content", err);
        revealAll();
      }
    }, rootRef);

    /* stars (plain DOM) */
    const stars = root.querySelector("#ag-stars");
    if (stars && !stars.children.length) {
      for (let i = 0; i < 60; i++) {
        const s = document.createElement("i");
        s.style.left = Math.random() * 100 + "%";
        s.style.top = Math.random() * 100 + "%";
        s.style.animationDelay = Math.random() * 3 + "s";
        s.style.opacity = String(Math.random() * 0.6 + 0.2);
        stars.appendChild(s);
      }
    }

    /* FAQ accordion */
    const faqCleanups: (() => void)[] = [];
    q(".q").forEach((qEl) => {
      if (qEl.dataset.agFaq) return;
      qEl.dataset.agFaq = "1";
      const a = qEl.querySelector<HTMLElement>(".a");
      const btn = qEl.querySelector("button");
      if (!a || !btn) return;
      if (qEl.classList.contains("open")) gsap.set(a, { height: "auto" });
      const onClick = () => {
        const open = qEl.classList.toggle("open");
        gsap.to(a, { height: open ? "auto" : 0, duration: 0.5, ease: "power3.inOut" });
      };
      btn.addEventListener("click", onClick);
      faqCleanups.push(() => btn.removeEventListener("click", onClick));
    });

    /* globe (canvas 2D — no WebGL needed) */
    let raf = 0;
    let globeTrigger: ScrollTrigger | undefined;
    const cv = root.querySelector<HTMLCanvasElement>("#ag-globe");
    if (cv) {
      try {
        const gctx = cv.getContext("2d");
        if (gctx) {
          const SIZE = 1100;
          cv.width = SIZE;
          cv.height = SIZE * 0.62;
          const perm: number[] = [];
          for (let i = 0; i < 512; i++) perm[i] = Math.floor(Math.random() * 256);
          const fade = (t: number) => t * t * (3 - 2 * t);
          const noise = (x: number, y: number) => {
            const X = Math.floor(x) & 255,
              Y = Math.floor(y) & 255;
            const xf = x - Math.floor(x),
              yf = y - Math.floor(y);
            const a = perm[(X + perm[Y]) & 255] / 255,
              b = perm[(X + 1 + perm[Y]) & 255] / 255,
              c = perm[(X + perm[Y + 1]) & 255] / 255,
              d = perm[(X + 1 + perm[Y + 1]) & 255] / 255;
            const u = fade(xf),
              v = fade(yf);
            return (a * (1 - u) + b * u) * (1 - v) + (c * (1 - u) + d * u) * v;
          };
          const land = (lat: number, lon: number) =>
            noise(lon * 1.3 + 10, lat * 1.3) * 0.6 + noise(lon * 3 + 40, lat * 3) * 0.3 + noise(lon * 6, lat * 6) * 0.1 > 0.52;
          const pts: { lat: number; lon: number }[] = [];
          const R = 380;
          for (let lat = -80; lat <= 80; lat += 3.2) {
            const r = Math.cos((lat * Math.PI) / 180),
              n = Math.max(8, Math.floor(110 * r));
            for (let k = 0; k < n; k++) {
              const lon = (k / n) * 360;
              if (land(lat / 60, lon / 60)) pts.push({ lat: (lat * Math.PI) / 180, lon: (lon * Math.PI) / 180 });
            }
          }
          let rot = 0,
            visible = false;
          const draw = () => {
            if (visible) {
              gctx.clearRect(0, 0, cv.width, cv.height);
              const cx = SIZE / 2,
                cy = SIZE * 0.55;
              const g = gctx.createRadialGradient(cx - 80, cy - 120, 40, cx, cy, R);
              g.addColorStop(0, "#2A1A22");
              g.addColorStop(0.7, "#120E14");
              g.addColorStop(1, "#0B0B0D");
              gctx.fillStyle = g;
              gctx.beginPath();
              gctx.arc(cx, cy, R, 0, Math.PI * 2);
              gctx.fill();
              const rim = gctx.createRadialGradient(cx, cy, R * 0.82, cx, cy, R);
              rim.addColorStop(0, "rgba(255,120,50,0)");
              rim.addColorStop(1, "rgba(255,120,50,.55)");
              gctx.fillStyle = rim;
              gctx.beginPath();
              gctx.arc(cx, cy, R, 0, Math.PI * 2);
              gctx.fill();
              for (const p of pts) {
                const lon = p.lon + rot,
                  x = Math.cos(p.lat) * Math.sin(lon),
                  z = Math.cos(p.lat) * Math.cos(lon),
                  y = Math.sin(p.lat);
                if (z < 0.05) continue;
                gctx.fillStyle = `rgba(235,220,225,${0.25 + z * 0.75})`;
                gctx.beginPath();
                gctx.arc(cx + x * R, cy - y * R, 2.6 * (0.6 + z * 0.5), 0, Math.PI * 2);
                gctx.fill();
              }
              rot += 0.0025;
            }
            raf = requestAnimationFrame(draw);
          };
          draw();
          globeTrigger = ScrollTrigger.create({
            trigger: ".globe-sec",
            start: "top bottom",
            end: "bottom top",
            onToggle: (s) => (visible = s.isActive),
          });
        }
      } catch (err) {
        console.error("[HomeExperience] globe failed", err);
      }
    }

    /* build testimonial marquees */
    const card = (t: [string, string, string, string]) =>
      `<div class="tcard"><header><i>${t[0]}</i><div><b>${t[1]}</b><small>${t[2]}</small></div></header>“${t[3]}”</div>`;
    const a = TESTIMONIALS.slice(0, 6),
      b = TESTIMONIALS.slice(6);
    const tm1 = root.querySelector("#ag-tm1 .tmarq-track");
    const tm2 = root.querySelector("#ag-tm2 .tmarq-track");
    if (tm1 && !tm1.children.length) tm1.innerHTML = [...a, ...a].map(card).join("");
    if (tm2 && !tm2.children.length) tm2.innerHTML = [...b, ...b].map(card).join("");

    // Safety net: hide loader after 4.5s no matter what.
    const safety = window.setTimeout(() => {
      const l = root.querySelector<HTMLElement>(".loader");
      if (l && l.style.display !== "none") revealAll();
    }, 4500);

    return () => {
      window.clearTimeout(safety);
      cancelAnimationFrame(raf);
      globeTrigger?.kill();
      faqCleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <div className="ag" data-mode={mode} ref={rootRef}>
      {/* preloader */}
      <div className="loader">
        <div className="loader-inner">
          <div className="mark">
            <svg viewBox="0 0 60 60">
              <circle className="ring" cx="30" cy="30" r="25" />
              <circle className="dot" cx="30" cy="30" r="11" />
            </svg>
          </div>
          <div className="word">
            <span>Ace Global</span>
          </div>
        </div>
      </div>

      {/* nav */}
      <nav className="nav">
        <div className="wrap">
          <a href="/" className="logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="logo-img" src="/logo-orange.svg" alt="Ace Global logo" />
            <span>Ace Global</span>
          </a>
          <div className="nav-links">
            <a href="#platform">
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
            <button className="mode" onClick={toggleMode} aria-label="Toggle theme" type="button">
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

      {/* hero */}
      <header className="hero">
        <div className="beam" />
        <div className="hero-glow" />
        <div className="wrap">
          <div className="hero-inner">
            <div className="tag" data-fade>
              <i>✦</i>Books &amp; taxes on autopilot
            </div>
            <h1 data-words>
              Your <span className="rot" data-rot="small business|farm|trucking|retail" /> books &amp; taxes — completely
              off your plate.
            </h1>
            <p data-fade>
              Ace Global is the all-in-one accounting platform that combines expert CPAs with powerful software to
              handle everything for you.
            </p>
            <div className="cta">
              <a href="https://app.aceglobal.ai/" className="pill orange" data-fade>
                Get started
              </a>
              <a href="#contact" className="pill ghost" data-fade>
                Chat with sales
              </a>
            </div>
          </div>
          <div className="circuit">
            <svg viewBox="0 0 1200 440" preserveAspectRatio="none">
              <path d="M600 220 H430 V70 H150" />
              <path d="M600 220 H330 V240 H70" />
              <path d="M600 220 H430 V370 H150" />
              <path d="M600 220 H770 V70 H1050" />
              <path d="M600 220 H870 V240 H1130" />
              <path d="M600 220 H770 V370 H1050" />
              <path className="pulse" d="M600 220 H430 V70 H150" />
              <path className="pulse" d="M600 220 H330 V240 H70" />
              <path className="pulse" d="M600 220 H430 V370 H150" />
              <path className="pulse" d="M600 220 H770 V70 H1050" />
              <path className="pulse" d="M600 220 H870 V240 H1130" />
              <path className="pulse" d="M600 220 H770 V370 H1050" />
            </svg>
            <div className="chip">
              <div className="pins top">
                <i /><i /><i /><i /><i /><i />
              </div>
              ACE
              <div className="pins">
                <i /><i /><i /><i /><i /><i />
              </div>
            </div>
            <div className="node n1">M</div>
            <div className="node n2">B</div>
            <div className="node n3">Q</div>
            <div className="node n4">S</div>
            <div className="node n5">$</div>
            <div className="node n6">✓</div>
          </div>
        </div>
        <div className="trust">
          <p data-fade>
            We&apos;ve helped thousands of <span className="rot" data-rot="farm|trucking|retail|small" /> businesses
            manage bookkeeping, taxes and more
          </p>
          <div className="marq dark">
            <div className="marq-track">
              <span>Heather CPA Firm</span><span>Varadhi Firms</span><span>Radio Surabhi</span><span>Urban Systems</span>
              <span>iNRI · Backed by Y Combinator</span><span>Indian Eagle</span>
              <span>Heather CPA Firm</span><span>Varadhi Firms</span><span>Radio Surabhi</span><span>Urban Systems</span>
              <span>iNRI · Backed by Y Combinator</span><span>Indian Eagle</span>
            </div>
          </div>
        </div>
      </header>

      {/* platform (light) */}
      <div className="panel light" data-theme="light" id="platform">
        <section>
          <div className="wrap">
            <div className="center">
              <div className="tag light" data-fade>
                <i>✦</i>Platform
              </div>
            </div>
            <h2 className="h2 center" data-words>
              All-in-one accounting platform built for{" "}
              <span className="rot" data-rot="startups|small businesses|CPA firms|agencies|founders" />
            </h2>
            <div className="feat3">
              <div className="lcard" data-fade>
                <h3>Expert Accountants</h3>
                <p>
                  Dedicated CPAs who understand startup nuances — from Delaware C-Corp compliance to complex multi-state
                  filings.
                </p>
                <div className="chat" data-chat>
                  <div className="msg them">
                    <i className="av" style={{ background: "#5B7CFA" }}>SK</i>
                    <div>
                      <b>Sara Kim, CPA</b>Your Q3 estimated tax is ready — $8,240. Want me to schedule the payment?
                    </div>
                  </div>
                  <div className="msg me">
                    <div>Yes, schedule it for the 12th 👍</div>
                  </div>
                  <div className="msg them">
                    <i className="av" style={{ background: "#2FB37B" }}>JP</i>
                    <div>
                      <b>James Park, CPA</b>Done. Delaware Franchise Tax is also filed ✓
                    </div>
                  </div>
                </div>
                <div className="foot avatars">
                  <i className="av" style={{ background: "#5B7CFA" }}>SK</i>
                  <i className="av" style={{ background: "#2FB37B" }}>JP</i>
                  <i className="av" style={{ background: "#F5A623" }}>AR</i>
                  <b>+12 CPAs on your team</b>
                </div>
              </div>
              <div className="lcard" data-fade>
                <h3>$1M+ Saved</h3>
                <p>Total deductions identified for our business owners.</p>
                <div className="deds" data-deds>
                  <div className="ded">
                    <span>R&amp;D credits</span>
                    <i style={{ ["--w" as string]: "92%" }} />
                    <b>$412k</b>
                  </div>
                  <div className="ded">
                    <span>Depreciation</span>
                    <i style={{ ["--w" as string]: "64%" }} />
                    <b>$286k</b>
                  </div>
                  <div className="ded">
                    <span>Home office &amp; travel</span>
                    <i style={{ ["--w" as string]: "42%" }} />
                    <b>$188k</b>
                  </div>
                  <div className="ded">
                    <span>State credits</span>
                    <i style={{ ["--w" as string]: "28%" }} />
                    <b>$124k</b>
                  </div>
                </div>
                <div className="foot">
                  <div className="big">
                    $<span data-count="1000000">0</span>
                  </div>
                  <small className="cap">and counting</small>
                </div>
              </div>
              <div className="lcard" data-fade>
                <h3>Bookkeeping on Autopilot</h3>
                <p>
                  Real-time sync across bank accounts, Stripe, and business systems — giving your AI finance agents live
                  context to monitor cash flow and prevent month-end surprises.
                </p>
                <a href="/bookkeeping">Learn how →</a>
                <div className="tx" data-tx>
                  <small>Recent transactions</small>
                  <div className="row">
                    <span>Stripe payout<em>Reconciled</em></span>
                    <b>+$12,400</b>
                  </div>
                  <div className="row">
                    <span>Brex card — AWS<em>Reconciled</em></span>
                    <b className="neg">-$890</b>
                  </div>
                  <div className="row">
                    <span>Mercury payroll<em>Reconciled</em></span>
                    <b className="neg">-$24,000</b>
                  </div>
                  <div className="row">
                    <span>Stripe payout<em>Reconciled</em></span>
                    <b>+$8,200</b>
                  </div>
                </div>
              </div>
            </div>
            <div className="trust" style={{ paddingBottom: 0, marginTop: 50 }}>
              <p data-fade>Featured on:</p>
              <div className="marq">
                <div className="marq-track">
                  <span>TechCrunch</span><span>Forbes</span><span>WSJ</span><span>Fast Company</span><span>Bloomberg</span>
                  <span>TechCrunch</span><span>Forbes</span><span>WSJ</span><span>Fast Company</span><span>Bloomberg</span>
                  <span>TechCrunch</span><span>Forbes</span><span>WSJ</span><span>Fast Company</span><span>Bloomberg</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* how it works (dark) */}
      <div className="panel dark" data-theme="dark">
        <section>
          <div className="wrap">
            <div className="center">
              <div className="tag" data-fade>
                <i>✦</i>How it works
              </div>
            </div>
            <h2 className="h2 center" data-words>
              Three steps to financial autopilot
            </h2>
            <div className="bento">
              <div className="card" data-fade>
                <div className="step-num">1</div>
                <h3>Seamless Onboarding</h3>
                <p>Connect your bank accounts and accounting software in minutes. We&apos;ll handle the historical cleanup so you start with a clean slate.</p>
                <ul className="list">
                  <li>Connect in under 15 minutes</li>
                  <li>Automatic historical cleanup</li>
                  <li>No spreadsheets required</li>
                </ul>
                <div className="mock" data-mock style={{ marginTop: 20 }}>
                  <small>Connect your accounts</small>
                  <div className="row"><i>M</i><span>Mercury Bank</span><em>Connected</em></div>
                  <div className="row"><i>B</i><span>Brex</span><em>Connected</em></div>
                  <div className="row"><i>Q</i><span>QuickBooks</span><em>Connected</em></div>
                  <div className="row"><i>S</i><span>Stripe</span><em className="wait">Syncing…</em></div>
                </div>
              </div>
              <div className="card" data-fade>
                <div className="step-num">2</div>
                <h3>Switch to Autopilot</h3>
                <p>Your CPA team manages your books and filings. Your AI agent explains your numbers in real time, so you stay in control without doing the work.</p>
                <ul className="list">
                  <li>Dedicated CPA team</li>
                  <li>Monthly books &amp; filings</li>
                  <li>Ask your AI agent</li>
                </ul>
                <div className="mock" data-mock style={{ marginTop: 20 }}>
                  <small>
                    This month — Autopilot <span className="badge">Running</span>
                  </small>
                  <div className="row"><span className="chk">✓</span><span>Books reconciled</span></div>
                  <div className="row"><span className="chk">✓</span><span>Payroll synced</span></div>
                  <div className="row"><span className="chk">✓</span><span>Q3 taxes prepared</span></div>
                  <div className="row"><span className="chk off" /><span>Investor report sent</span></div>
                </div>
              </div>
              <div className="card" data-fade>
                <div className="step-num">3</div>
                <h3>Back to Building</h3>
                <p>Focus on your product, customers, and growth. Your CPA team and AI agent handle the finance workflow in the background and notify you when your books are closed or taxes are filed.</p>
                <ul className="list">
                  <li>Zero day-to-day finance work</li>
                  <li>Proactive alerts from your AI agent</li>
                  <li>More time to build</li>
                </ul>
                <div className="mock" data-mock style={{ marginTop: 20 }}>
                  <small>
                    Status <span className="badge">Everything handled</span>
                  </small>
                  <div className="row"><span className="chk">✓</span><span>Taxes filed on time</span></div>
                  <div className="row"><span className="chk">✓</span><span>Books closed for June</span></div>
                  <div className="row"><span className="chk">✓</span><span>Nothing needs your attention</span></div>
                </div>
              </div>

              <div className="card wide" data-fade>
                <div>
                  <small className="k">Bookkeeping</small>
                  <h3>Real-time books you can actually trust.</h3>
                  <p>Your books stay continuously updated across banks, Stripe, and business systems — giving you live visibility into burn, runway, cash flow, and what needs attention.</p>
                  <a href="/bookkeeping">Learn More →</a>
                </div>
                <div className="mock">
                  <small>
                    Burn Rate — Last 6 Months <span className="badge">On Track</span>
                  </small>
                  <div className="chart" data-chart>
                    <i style={{ ["--h" as string]: "55%" }} />
                    <i style={{ ["--h" as string]: "70%" }} />
                    <i style={{ ["--h" as string]: "48%" }} />
                    <i style={{ ["--h" as string]: "62%" }} />
                    <i style={{ ["--h" as string]: "40%" }} />
                    <i style={{ ["--h" as string]: "35%" }} />
                  </div>
                  <div className="kpis">
                    <div>
                      Monthly Burn<b>$24,500</b>
                    </div>
                    <div>
                      Runway<b>18 months</b>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card wide" data-fade>
                <div>
                  <small className="k">Corporate Tax</small>
                  <h3>Federal and state taxes handled end to end.</h3>
                  <p>From Delaware Franchise Tax to complex multi-state filings, your CPA team and AI agent keep your company compliant, track deadlines, and surface what needs attention.</p>
                  <a href="/corporate-taxes">Learn More →</a>
                </div>
                <div className="mock tax" data-tax>
                  <small>
                    Tax Filing Status <span className="badge">All Filed ✓</span>
                  </small>
                  <div className="row"><span>Delaware Franchise Tax</span><span>Due Mar 1</span><em>Filed</em></div>
                  <div className="row"><span>Federal Corp. Tax (1120)</span><span>Due Apr 15</span><em>Filed</em></div>
                  <div className="row"><span>CA State Corp. Tax</span><span>Due Apr 15</span><em>Filed</em></div>
                  <div className="row"><span>NY State Corp. Tax</span><span>Due Apr 15</span><em>Filed</em></div>
                  <div className="row"><span>Q3 Estimated Tax</span><span>Due Sep 15</span><em className="wait">Upcoming</em></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* globe / scale */}
        <section className="globe-sec">
          <div className="wrap">
            <div className="center">
              <div className="tag" data-fade>
                <i>✦</i>Established in 2021
              </div>
            </div>
            <h2 className="h2 center" data-words>
              The Ace Global Difference — Expert Accountants + Software
            </h2>
            <p className="sub center" data-fade>
              Built by CPAs, tax experts, and experienced accountants serving 10,000+ clients across bookkeeping, tax,
              payroll, and compliance.
            </p>
            <div className="stat4">
              <div className="card" data-fade>
                <b>
                  <span data-count="10000">0</span>
                  <sup>+</sup>
                </b>
                <p>Clients served — trusted by founders, small businesses, and high-income households.</p>
              </div>
              <div className="card" data-fade>
                <b>
                  $<span data-count="1">0</span>B<sup>+</sup>
                </b>
                <p>Volume processed across business transactions, filings, books, and tax workflows.</p>
              </div>
              <div className="card" data-fade>
                <b>
                  $<span data-count="1">0</span>M<sup>+</sup>
                </b>
                <p>Tax savings identified — helping clients plan smarter and avoid surprises.</p>
              </div>
              <div className="card" data-fade>
                <b>
                  $<span data-count="1">0</span>M<sup>+</sup>
                </b>
                <p>Cash balance managed — accounting on autopilot.</p>
              </div>
            </div>
          </div>
          <div className="globe-stage">
            <div className="stars" id="ag-stars" />
            <div className="globe-atmo" />
            <canvas id="ag-globe" />
          </div>
          <div className="globe-foot">
            <span>10,000+ clients</span>
            <span>$1B+ processed</span>
            <span>$1M+ saved</span>
          </div>
        </section>
      </div>

      {/* savings + testimonials (light) */}
      <div className="panel light" data-theme="light">
        <section>
          <div className="wrap">
            <h2 className="h2 center" data-words>
              Saving small business owners real money
            </h2>
            <div className="founders">
              <div className="founder" data-fade>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/founder-1.webp" alt="Alex Chen" />
                <div>
                  <div className="saved">Saved $125,839</div>
                  <b>Alex Chen</b>
                  <small>CEO at Lumina</small>
                </div>
              </div>
              <div className="founder" data-fade>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/founder-2.webp" alt="Sarah Jenkins" />
                <div>
                  <div className="saved">Saved $84,200</div>
                  <b>Sarah Jenkins</b>
                  <small>Founder at FlowState</small>
                </div>
              </div>
              <div className="founder" data-fade>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/founder-3.webp" alt="Marcus Thorne" />
                <div>
                  <div className="saved">Saved $210,000</div>
                  <b>Marcus Thorne</b>
                  <small>CTO at Nexus Robotics</small>
                </div>
              </div>
            </div>
            <p className="quote-big" data-words>
              &ldquo;This took a huge weight off my shoulders.&rdquo;
            </p>
          </div>
          <div className="tmarq" id="ag-tm1">
            <div className="tmarq-track" />
          </div>
          <div className="tmarq rev" id="ag-tm2">
            <div className="tmarq-track" />
          </div>
        </section>

        {/* difference */}
        <section>
          <div className="wrap">
            <div className="center">
              <div className="tag light" data-fade>
                <i>✦</i>Accounting on autopilot
              </div>
            </div>
            <h2 className="h2 center" data-words>
              Ace Global is the leading technology platform with experienced accounting and tax expertise.
            </h2>
            <div className="diff">
              <div className="lcard" data-fade>
                <h3>Real human experts</h3>
                <p>On your WhatsApp or iMessage.</p>
                <div className="photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/team-smile.webp" alt="Real human experts" />
                </div>
                <div className="chatbubble">
                  &ldquo;Fantastic team. Fast onboarding, clean books, and very easy to work with. We&apos;re very happy
                  with Ace Global.&rdquo;
                  <b>Sebastian Janisch</b>
                  <small>Co-Founder @ Bayesline</small>
                </div>
              </div>
              <div className="lcard" data-fade>
                <h3>Onboard in Minutes</h3>
                <p>Connect your accounts and we handle the historical cleanup.</p>
                <div className="foot">
                  <small style={{ fontSize: 12, color: "var(--ink-muted)", fontWeight: 600 }}>
                    <span data-count="90">0</span>% Complete
                  </small>
                  <div className="progress">
                    <i data-progress="90" />
                  </div>
                </div>
              </div>
              <div className="lcard" data-fade>
                <h3>Your CPA team</h3>
                <p>Built by CPAs, tax experts, and experienced accountants.</p>
                <div className="foot team">
                  <div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/team-david.webp" alt="David Z." />
                    <span>
                      <b>David Z.</b>
                      <small>15+ years of experience</small>
                    </span>
                  </div>
                </div>
                <div className="team" style={{ marginTop: 10 }}>
                  <div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/team-anil.webp" alt="Anil R." />
                    <span>
                      <b>Anil R.</b>
                      <small>12+ years of experience</small>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* faq / contact / products / footer (dark) */}
      <div className="panel dark" data-theme="dark">
        <section id="faq">
          <div className="wrap">
            <h2 className="h2 center" data-words>
              Have more questions?
            </h2>
            <p className="sub center" data-fade>
              We&apos;re here to help you simplify your business finances. Talk to an Ace Global expert today about
              bookkeeping, payroll, taxes, and compliance.
            </p>
            <div className="center" style={{ marginTop: 24 }}>
              <a href="#contact" className="pill orange" data-fade>
                Chat with Sales
              </a>
            </div>
            <div className="faq">
              <div className="q open">
                <button type="button">
                  <i>⌄</i>How long does onboarding take?
                </button>
                <div className="a">
                  <p>Connecting your accounts takes under 15 minutes. We then handle the historical cleanup so you start with a clean slate — most clients are fully onboarded within a week.</p>
                </div>
              </div>
              <div className="q">
                <button type="button">
                  <i>⌄</i>Is my data secure?
                </button>
                <div className="a">
                  <p>Yes. Your data is encrypted in transit and at rest, and account connections use read-only, bank-grade integrations.</p>
                </div>
              </div>
              <div className="q">
                <button type="button">
                  <i>⌄</i>Do you handle business taxes?
                </button>
                <div className="a">
                  <p>Yes — from Delaware Franchise Tax to federal (1120) and multi-state corporate filings, your CPA team handles it end to end.</p>
                </div>
              </div>
              <div className="q">
                <button type="button">
                  <i>⌄</i>What accounting software do you use?
                </button>
                <div className="a">
                  <p>We sync with QuickBooks and connect directly to banks and tools like Mercury, Brex, and Stripe.</p>
                </div>
              </div>
              <div className="q">
                <button type="button">
                  <i>⌄</i>How do you communicate with clients?
                </button>
                <div className="a">
                  <p>Talk to your CPA team and AI agent on WhatsApp or iMessage — no portals or ticket queues.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact">
          <div className="wrap">
            <div className="contact-card" data-contact>
              <h2 className="h2" data-words>
                Your AI-powered finance team for books, taxes, and payroll.
              </h2>
              <p data-fade>
                Talk to your CPA team and AI agent on WhatsApp or iMessage while your books and filings run on autopilot.
              </p>
              <a href="https://app.aceglobal.ai/" className="pill white" data-fade>
                Get started now
              </a>
            </div>
          </div>
        </section>

        <section>
          <div className="wrap">
            <h2 className="h2 center" data-words>
              Explore the platform
            </h2>
            <div className="prod-grid">
              <div className="prod" data-fade>
                <div className="ico" />
                <h3>Bookkeeping</h3>
                <p>Real-time books across banks, Stripe, and business systems — with live visibility into burn, runway, and cash flow.</p>
                <a href="/bookkeeping">Learn more ›</a>
              </div>
              <div className="prod" data-fade>
                <div className="ico" />
                <h3>Business Taxes</h3>
                <p>Federal and state taxes handled end to end, with deadlines tracked and filings done on time.</p>
                <a href="/corporate-taxes">Learn more ›</a>
              </div>
              <div className="prod" data-fade>
                <div className="ico" />
                <h3>Company Formation</h3>
                <p>Form your company and stay compliant from day one with your CPA team behind you.</p>
                <a href="/company-formation">Learn more ›</a>
              </div>
            </div>
          </div>
        </section>

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
                  <i /><i /><i />
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
      </div>
    </div>
  );
}

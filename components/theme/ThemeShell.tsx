"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ThemeNav from "./ThemeNav";
import ThemeFooter from "./ThemeFooter";
import "../../app/home-theme.css";

gsap.registerPlugin(ScrollTrigger);

// Reusable dark/orange page shell: the `.ag` wrapper (with the light/dark mode
// toggle, persisted), the shared nav + footer, plus the shared behaviours the
// content pages need — nav float on scroll, `[data-fade]` reveals, `[data-count]`
// counters, and `.q` FAQ accordions. Scoped to its root and cleaned up on unmount.
export default function ThemeShell({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"dark" | "light">("dark");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ag-mode");
      if (saved === "light" || saved === "dark") setMode(saved);
    } catch {}
  }, []);

  const toggle = () =>
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

    const nav = root.querySelector(".nav");
    const onScroll = () => nav?.classList.toggle("float", window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    /* FAQ accordions */
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

    const ctx = gsap.context(() => {
      q("[data-fade]").forEach((el, i) =>
        gsap.fromTo(
          el,
          { opacity: 0, y: reduce ? 0 : 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
            delay: (i % 3) * 0.06,
          }
        )
      );
      q("[data-count]").forEach((el) => {
        const t = parseFloat(el.dataset.count || "0");
        const o = { v: 0 };
        gsap.to(o, {
          v: t,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate() {
            el.textContent = Math.round(o.v).toLocaleString("en-US");
          },
        });
      });
      const contact = root.querySelector(".contact-card");
      if (contact)
        ScrollTrigger.create({
          trigger: contact,
          start: "top 80%",
          once: true,
          onEnter: () => contact.classList.add("lit"),
        });
    }, rootRef);

    return () => {
      window.removeEventListener("scroll", onScroll);
      faqCleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <div className="ag" data-mode={mode} ref={rootRef}>
      <ThemeNav onToggle={toggle} />
      <main>{children}</main>
      <ThemeFooter />
    </div>
  );
}

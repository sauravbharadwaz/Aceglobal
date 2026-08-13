"use client";

import { useEffect, useState } from "react";

import type { Heading } from "@/lib/toc";

/** Distance below the fixed navbar at which a heading counts as "current". */
const ACTIVE_LINE = 140;

/**
 * Sticky in-article navigation. Stays put beside the post on desktop and
 * highlights whichever section the reader is currently in; collapses to an
 * expandable summary above the article on narrow screens, where there is no
 * room for a column.
 *
 * The `id`s linked here come from lib/toc.ts, which is also what stamps them
 * onto the rendered headings.
 */
export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState("");

  // Depend on the ids rather than the array itself: a new array identity
  // arrives on every parent render, which would re-subscribe needlessly.
  const key = headings.map((h) => h.id).join("|");

  useEffect(() => {
    const ids = key ? key.split("|") : [];
    if (ids.length === 0) return;

    let frame = 0;

    const update = () => {
      frame = 0;

      // The last heading to have crossed the line is the one being read.
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top > ACTIVE_LINE) break;
        current = id;
      }

      // A short final section can never reach the line, so bottom-of-page
      // always resolves to the last heading.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) current = ids[ids.length - 1];

      setActiveId(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [key]);

  if (headings.length === 0) return null;

  const link = (h: Heading) => {
    const active = h.id === activeId;
    return (
      <li key={h.id}>
        <a
          href={`#${h.id}`}
          aria-current={active ? "location" : undefined}
          className={
            "block border-l-2 -ml-px py-1.5 text-sm leading-snug transition-colors " +
            (h.level === 3 ? "pl-7" : "pl-4") +
            (active
              ? " border-[#0053ce] text-[#0053ce] font-medium"
              : " border-transparent text-[#727687] hover:text-[#00174c]")
          }
        >
          {h.text}
        </a>
      </li>
    );
  };

  const label = (
    <p className="text-xs font-semibold uppercase tracking-wider text-[#00174c]">
      On this page
    </p>
  );

  return (
    <aside className="mb-10 lg:mb-0 lg:sticky lg:top-28 lg:self-start">
      {/* Narrow screens: collapsed by default so it never pushes the article
          itself below the fold. */}
      <details className="lg:hidden rounded-2xl border border-[#e3e6ef] px-4 py-3">
        <summary className="cursor-pointer list-none flex items-center justify-between gap-3">
          {label}
          <span aria-hidden className="text-[#727687] text-lg leading-none">
            +
          </span>
        </summary>
        <nav aria-label="On this page" className="mt-3">
          <ul className="border-l border-[#e3e6ef]">{headings.map(link)}</ul>
        </nav>
      </details>

      <nav
        aria-label="On this page"
        className="hidden lg:block max-h-[calc(100vh-9rem)] overflow-y-auto"
      >
        {label}
        <ul className="mt-4 border-l border-[#e3e6ef]">{headings.map(link)}</ul>
      </nav>
    </aside>
  );
}

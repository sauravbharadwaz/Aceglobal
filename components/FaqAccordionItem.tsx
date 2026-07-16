"use client";

import { useState } from "react";

// One expandable question in a blog post. The answer is rendered on the server
// and passed in as `children`, so Portable Text (and its image URLs) never has
// to ship to the client — only the open/closed state lives here.
export default function FaqAccordionItem({
  question,
  defaultOpen = false,
  children,
}: {
  question: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-[#c2c6d8]/30">
      <h2>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="group flex w-full items-start justify-between gap-4 py-5 text-left"
        >
          <span className="text-xl md:text-2xl font-medium text-[#00174c] leading-snug group-hover:text-[#0053ce] transition-colors">
            {question}
          </span>
          <span
            className={`mt-1 shrink-0 text-[#727687] transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </button>
      </h2>

      {/* Kept in the DOM (display:none when closed) so the answers stay
          crawlable for SEO rather than being unmounted. */}
      <div className={open ? "pb-2" : "hidden"}>{children}</div>
    </div>
  );
}

"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Cycles through words with a vertical scrolling animation.
// The box width animates to fit the current word, so there is never an
// empty gap and surrounding text glides smoothly instead of snapping.
export default function RotatingWord({
  words,
  interval = 2400,
  className = "",
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [widths, setWidths] = useState<number[] | null>(null);
  const measureRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  // Measure each word's rendered width (re-measure on resize since the
  // font size changes across breakpoints).
  useLayoutEffect(() => {
    const measure = () =>
      setWidths(measureRefs.current.map((el) => (el ? el.offsetWidth : 0)));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [words]);

  return (
    <span className={`relative inline-block align-bottom ${className}`}>
      {/* Hidden rulers — same font context, used only for measuring */}
      <span aria-hidden className="absolute invisible whitespace-nowrap left-0 top-0">
        {words.map((w, i) => (
          <span
            key={w}
            ref={(el) => {
              measureRefs.current[i] = el;
            }}
            className="inline-block"
          >
            {w}
          </span>
        ))}
      </span>

      {/* Animated-width window the words scroll inside */}
      <motion.span
        className="relative inline-block overflow-hidden align-bottom"
        animate={widths ? { width: widths[index] } : undefined}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={widths ? undefined : { width: "auto" }}
      >
        {/* Invisible current word keeps the line height and baseline */}
        <span className="invisible whitespace-nowrap">{words[index]}</span>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={words[index]}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-0 whitespace-nowrap"
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </span>
  );
}

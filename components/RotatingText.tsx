"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// React Bits–style rotating text. Cycles through `texts`, animating each new
// phrase in with a per-character stagger (slide + fade). The container's width
// glides to fit the current phrase so the surrounding sentence never snaps.
// Respects prefers-reduced-motion (swaps instantly, no animation).
export default function RotatingText({
  texts,
  rotationInterval = 2400,
  staggerDuration = 0.025,
  className = "",
}: {
  texts: string[];
  rotationInterval?: number;
  staggerDuration?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [widths, setWidths] = useState<number[] | null>(null);
  const [reduced, setReduced] = useState(false);
  const measureRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % texts.length),
      rotationInterval
    );
    return () => clearInterval(id);
  }, [texts.length, rotationInterval]);

  // Measure each phrase's rendered width (re-measure on resize since the font
  // size changes across breakpoints).
  useLayoutEffect(() => {
    const measure = () =>
      setWidths(measureRefs.current.map((el) => (el ? el.offsetWidth : 0)));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [texts]);

  const chars = Array.from(texts[index]);
  const NBSP = " ";

  return (
    <span className={`relative inline-block align-bottom ${className}`}>
      {/* Hidden rulers — same font context, used only for measuring widths */}
      <span aria-hidden className="absolute invisible whitespace-nowrap left-0 top-0">
        {texts.map((t, i) => (
          <span
            key={t}
            ref={(el) => {
              measureRefs.current[i] = el;
            }}
            className="inline-block"
          >
            {t}
          </span>
        ))}
      </span>

      {/* Width-animated window the phrases scroll inside */}
      <motion.span
        className="relative inline-block overflow-hidden align-bottom"
        animate={widths ? { width: widths[index] } : undefined}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={widths ? undefined : { width: "auto" }}
      >
        {/* Invisible current phrase holds the line height and baseline */}
        <span className="invisible whitespace-nowrap">{texts[index]}</span>

        {reduced ? (
          <span className="absolute left-0 top-0 whitespace-nowrap">{texts[index]}</span>
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={texts[index]}
              aria-label={texts[index]}
              className="absolute left-0 top-0 inline-flex whitespace-nowrap"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: staggerDuration } },
                exit: { transition: { staggerChildren: staggerDuration, staggerDirection: -1 } },
              }}
            >
              {chars.map((ch, i) => (
                <motion.span
                  key={i}
                  aria-hidden
                  className="inline-block"
                  variants={{
                    hidden: { y: "100%", opacity: 0 },
                    visible: { y: 0, opacity: 1 },
                    exit: { y: "-100%", opacity: 0 },
                  }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  {ch === " " ? NBSP : ch}
                </motion.span>
              ))}
            </motion.span>
          </AnimatePresence>
        )}
      </motion.span>
    </span>
  );
}

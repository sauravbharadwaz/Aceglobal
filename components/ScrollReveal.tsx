"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// 8 entry directions: sides + corners
const DIRECTIONS = [
  { x: -140, y: 0 },   // from left
  { x: 140, y: 0 },    // from right
  { x: 0, y: 90 },     // from bottom
  { x: 0, y: -90 },    // from top
  { x: -120, y: 80 },  // bottom-left
  { x: 120, y: 80 },   // bottom-right
  { x: -120, y: -80 }, // top-left
  { x: 120, y: -80 },  // top-right
];

const SELECTOR = [
  "main section h1",
  "main section h2",
  "main section h3",
  "main section h4",
  "main section h5",
  "main section blockquote",
  "main section p",
  "main section button",
  "main section a",
  "main section img",
  'main section [class*="rounded-"]',
  'footer [class*="rounded-"]',
  "footer .grid > div",
].join(",");

export default function ScrollReveal() {
  useGSAP(() => {
    // Respect users who prefer reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const candidates = gsap.utils.toArray<HTMLElement>(SELECTOR);
    const set = new Set(candidates);

    // Keep only the top-most block — skip any element whose ancestor
    // is already being animated, so cards fly in as a single unit.
    const targets = candidates.filter((el) => {
      let p = el.parentElement;
      while (p) {
        if (set.has(p)) return false;
        p = p.parentElement;
      }
      return true;
    });

    targets.forEach((el) => {
      const d = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
      gsap.from(el, {
        opacity: 0,
        x: d.x,
        y: d.y,
        rotateZ: gsap.utils.random(-6, 6),
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      });
    });

    ScrollTrigger.refresh();
  });

  return null;
}

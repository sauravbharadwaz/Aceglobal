"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const press = ["TechCrunch", "Forbes", "WSJ", "Fast Company", "Bloomberg"];

type Step = {
  n: string;
  title: string;
  desc: string;
  bullets: string[];
  cardClass: string;
  titleClass: string;
  descClass: string;
  badgeClass: string;
  bulletClass: string;
  visual: React.ReactNode;
};

/* ---- Per-card mini visuals ---- */

function OnboardingVisual() {
  const rows = [
    { name: "Mercury Bank", status: "Connected", color: "bg-green-100 text-green-700" },
    { name: "Brex", status: "Connected", color: "bg-green-100 text-green-700" },
    { name: "QuickBooks", status: "Connected", color: "bg-green-100 text-green-700" },
    { name: "Stripe", status: "Syncing…", color: "bg-blue-100 text-blue-700" },
  ];
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-white/50 p-6 w-full">
      <p className="text-sm font-medium text-[#00174c] mb-4">Connect your accounts</p>
      {rows.map((item) => (
        <div
          key={item.name}
          className="flex justify-between items-center py-3 border-b border-[#c2c6d8]/20 last:border-0"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#f2f3ff] border border-[#c2c6d8]/30 flex items-center justify-center text-xs font-semibold text-[#0053ce]">
              {item.name[0]}
            </div>
            <span className="text-sm font-medium text-[#00174c]">{item.name}</span>
          </div>
          <span className={`text-xs px-3 py-1 rounded-full font-medium ${item.color}`}>
            {item.status}
          </span>
        </div>
      ))}
    </div>
  );
}

function AutopilotVisual() {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-white/50 p-6 w-full">
      <div className="flex justify-between items-center mb-5">
        <p className="text-sm font-medium text-[#00174c]">This month — Autopilot</p>
        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
          Running
        </span>
      </div>
      {[
        { task: "Books reconciled", done: true },
        { task: "Payroll synced", done: true },
        { task: "Q3 taxes prepared", done: true },
        { task: "Investor report sent", done: false },
      ].map((t) => (
        <div key={t.task} className="flex items-center gap-3 py-2.5">
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${
              t.done ? "bg-green-100 text-green-600" : "bg-[#f2f3ff] text-[#c2c6d8] border border-[#c2c6d8]/40"
            }`}
          >
            {t.done ? "✓" : ""}
          </div>
          <span className={`text-sm ${t.done ? "text-[#00174c]" : "text-[#727687]"}`}>{t.task}</span>
        </div>
      ))}
    </div>
  );
}

function FreedomVisual() {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-white/50 p-6 w-full">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-lg">
          ✓
        </div>
        <div>
          <p className="text-xs text-[#727687]">Status</p>
          <p className="text-sm font-medium text-[#00174c]">Everything handled</p>
        </div>
      </div>
      {[
        "Taxes filed on time",
        "Books closed for June",
        "Nothing needs your attention",
      ].map((note) => (
        <div
          key={note}
          className="flex items-center gap-3 py-2.5 border-b border-[#c2c6d8]/20 last:border-0"
        >
          <span className="w-2 h-2 rounded-full bg-[#0053ce]" />
          <span className="text-sm text-[#00174c]">{note}</span>
        </div>
      ))}
    </div>
  );
}

const steps: Step[] = [
  {
    n: "1",
    title: "Seamless Onboarding",
    desc: "Connect your bank accounts and accounting software in minutes. We'll handle the historical cleanup so you start with a clean slate.",
    bullets: ["Connect in under 15 minutes", "Automatic historical cleanup", "No spreadsheets required"],
    cardClass: "bg-[#ebedff]",
    titleClass: "text-[#00174c]",
    descClass: "text-[#424655]",
    badgeClass: "bg-[#0053ce] text-white",
    bulletClass: "text-[#00174c]",
    visual: <OnboardingVisual />,
  },
  {
    n: "2",
    title: "Switch to Autopilot",
    desc: "Your dedicated CPA team handles your monthly books and tax filings. You just watch the dashboard while everything runs on its own.",
    bullets: ["Dedicated CPA team", "Monthly books & filings", "Real-time dashboard"],
    cardClass: "bg-[#0053ce]",
    titleClass: "text-white",
    descClass: "text-white/80",
    badgeClass: "bg-white text-[#0053ce]",
    bulletClass: "text-white",
    visual: <AutopilotVisual />,
  },
  {
    n: "3",
    title: "Back to Building",
    desc: "Focus on your product and customers. We'll notify you the moment taxes are filed and your books are closed — nothing else needed.",
    bullets: ["Zero day-to-day finance work", "Proactive notifications", "More time to build"],
    cardClass: "bg-[#172d65]",
    titleClass: "text-white",
    descClass: "text-[#dbe1ff]/80",
    badgeClass: "bg-[#196bfa] text-white",
    bulletClass: "text-[#dbe1ff]",
    visual: <FreedomVisual />,
  },
];

function StepCard({
  step,
  i,
  total,
  progress,
}: {
  step: Step;
  i: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Each later card scales the earlier ones down slightly as it stacks on top.
  const targetScale = 1 - (total - 1 - i) * 0.04;
  const scale = useTransform(progress, [i / total, 1], [1, targetScale]);

  return (
    <div className="sticky top-24 flex justify-center">
      <motion.div
        style={{ scale, top: `${i * 22}px` }}
        className={`relative w-full ${step.cardClass} rounded-[28px] p-6 md:p-10 shadow-[0_16px_48px_rgba(15,38,120,0.14)] origin-top`}
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Text */}
          <div className="flex-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-base mb-4 ${step.badgeClass}`}
            >
              {step.n}
            </div>
            <h3 className={`text-2xl md:text-[30px] font-medium leading-[1.15] mb-3 ${step.titleClass}`}>
              {step.title}
            </h3>
            <p className={`text-base leading-relaxed mb-6 ${step.descClass}`}>{step.desc}</p>
            <ul className="space-y-2.5">
              {step.bullets.map((b) => (
                <li key={b} className={`flex items-center gap-3 ${step.bulletClass}`}>
                  <span className="w-4 h-4 rounded-full bg-current/15 flex items-center justify-center text-xs">
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-sm">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Visual */}
          <div className="flex-1 w-full max-w-sm">{step.visual}</div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section className="py-[120px] bg-white">
      <div className="max-w-[1280px] mx-auto px-5 md:px-6">
        {/* Press logos — running marquee */}
        <div className="flex items-center gap-8 mb-20">
          <span className="text-sm font-medium text-[#00174c] opacity-40 flex-shrink-0">
            Featured on:
          </span>
          <div className="group relative flex-1 overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />
            <div
              className="flex w-max items-center gap-16 opacity-40"
              style={{ animation: "marquee 26s linear infinite" }}
            >
              {[...press, ...press].map((p, i) => (
                <span
                  key={`${p}-${i}`}
                  className="text-base font-semibold text-[#00174c] tracking-tight grayscale whitespace-nowrap"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-[#0053ce] text-sm font-medium uppercase tracking-widest mb-3">
            How it works
          </p>
          <h2 className="text-[28px] md:text-[40px] font-medium leading-[1.2] text-[#00174c]">
            Three steps to financial autopilot
          </h2>
        </div>
      </div>

      {/* Stacking cards */}
      <div ref={containerRef} className="max-w-[940px] mx-auto px-5 md:px-6 pb-[15vh]">
        {steps.map((step, i) => (
          <div key={step.n} className="h-[68vh] flex items-start">
            <StepCard step={step} i={i} total={steps.length} progress={scrollYProgress} />
          </div>
        ))}
      </div>
    </section>
  );
}

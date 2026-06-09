// Minimal floating "drops" — soft blurred circles that gently rise and fade.
// Deterministic values (no Math.random) to avoid hydration mismatches.
const drops = [
  { left: "8%",  top: "30%", size: 120, color: "#94a6fe", opacity: 0.18, duration: 13, delay: 0 },
  { left: "18%", top: "70%", size: 70,  color: "#196bfa", opacity: 0.14, duration: 16, delay: 2 },
  { left: "30%", top: "20%", size: 40,  color: "#0053ce", opacity: 0.12, duration: 11, delay: 4 },
  { left: "47%", top: "85%", size: 90,  color: "#94a6fe", opacity: 0.16, duration: 15, delay: 1 },
  { left: "62%", top: "25%", size: 55,  color: "#196bfa", opacity: 0.13, duration: 12, delay: 3 },
  { left: "75%", top: "65%", size: 140, color: "#94a6fe", opacity: 0.16, duration: 18, delay: 0.5 },
  { left: "88%", top: "35%", size: 60,  color: "#0053ce", opacity: 0.12, duration: 14, delay: 2.5 },
  { left: "92%", top: "78%", size: 45,  color: "#196bfa", opacity: 0.13, duration: 10, delay: 5 },
];

export default function Hero3DBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {drops.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={
            {
              left: d.left,
              top: d.top,
              width: d.size,
              height: d.size,
              background: `radial-gradient(circle at 35% 30%, ${d.color}, transparent 70%)`,
              filter: "blur(6px)",
              opacity: d.opacity,
              "--drop-opacity": d.opacity,
              animation: `float-drop ${d.duration}s ease-in-out ${d.delay}s infinite`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

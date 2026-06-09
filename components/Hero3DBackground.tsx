// Minimal floating particle dots — small crisp blue dots gently drifting.
// Deterministic values (no Math.random) to avoid hydration mismatches.
const dots = [
  { left: "5%",  top: "20%", size: 8,  color: "#196bfa", opacity: 0.6, duration: 9,  delay: 0 },
  { left: "9%",  top: "55%", size: 6,  color: "#4f86ff", opacity: 0.5, duration: 11, delay: 1.5 },
  { left: "4%",  top: "78%", size: 10, color: "#196bfa", opacity: 0.55, duration: 13, delay: 0.8 },
  { left: "15%", top: "35%", size: 5,  color: "#94a6fe", opacity: 0.5, duration: 10, delay: 2.2 },
  { left: "20%", top: "68%", size: 7,  color: "#0053ce", opacity: 0.45, duration: 12, delay: 0.4 },
  { left: "27%", top: "22%", size: 6,  color: "#196bfa", opacity: 0.5, duration: 9,  delay: 3 },
  { left: "33%", top: "82%", size: 5,  color: "#4f86ff", opacity: 0.5, duration: 14, delay: 1.1 },
  { left: "44%", top: "15%", size: 7,  color: "#94a6fe", opacity: 0.45, duration: 11, delay: 2.6 },
  { left: "56%", top: "85%", size: 6,  color: "#196bfa", opacity: 0.5, duration: 10, delay: 0.6 },
  { left: "66%", top: "18%", size: 5,  color: "#0053ce", opacity: 0.45, duration: 13, delay: 3.4 },
  { left: "72%", top: "60%", size: 8,  color: "#196bfa", opacity: 0.55, duration: 12, delay: 1.8 },
  { left: "80%", top: "30%", size: 6,  color: "#4f86ff", opacity: 0.5, duration: 9,  delay: 0.9 },
  { left: "85%", top: "72%", size: 7,  color: "#94a6fe", opacity: 0.5, duration: 11, delay: 2.4 },
  { left: "91%", top: "22%", size: 9,  color: "#196bfa", opacity: 0.55, duration: 14, delay: 0.3 },
  { left: "95%", top: "50%", size: 5,  color: "#0053ce", opacity: 0.45, duration: 10, delay: 3.1 },
  { left: "88%", top: "88%", size: 6,  color: "#196bfa", opacity: 0.5, duration: 12, delay: 1.3 },
];

export default function Hero3DBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            backgroundColor: d.color,
            opacity: d.opacity,
            boxShadow: `0 0 ${d.size}px ${d.color}66`,
            animation: `drift-dot ${d.duration}s ease-in-out ${d.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

const cards = [
  {
    saved: "Saved $125,839",
    name: "Alex Chen",
    role: "CEO at Lumina",
    image: "/founder-1.webp",
  },
  {
    saved: "Saved $84,200",
    name: "Sarah Jenkins",
    role: "Founder at FlowState",
    image: "/founder-2.webp",
  },
  {
    saved: "Saved $210,000",
    name: "Marcus Thorne",
    role: "CTO at Nexus Robotics",
    image: "/founder-3.webp",
  },
];

export default function TestimonialCards() {
  return (
    <section className="py-16 md:py-[120px] bg-white overflow-x-auto">
      <div className="max-w-[1280px] mx-auto px-5 md:px-6">
        <h2 className="text-[28px] md:text-[40px] font-medium leading-[1.2] text-[#00174c] mb-12">
          Saving small business owners real money
        </h2>
        <div className="flex gap-8 pb-8">
          {cards.map((c) => (
            <div
              key={c.name}
              className="min-w-[320px] md:min-w-[400px] h-[500px] rounded-3xl overflow-hidden relative group flex-shrink-0"
            >
              {/* Founder photo — grayscale, color on hover */}
              <img
                src={c.image}
                alt={c.name}
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              {/* Bottom overlay for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#00174c] via-[#00174c]/20 to-transparent opacity-80" />
              {/* Content */}
              <div className="absolute bottom-8 left-8">
                <div className="bg-[#0053ce] px-4 py-2 rounded-full text-white text-sm font-medium mb-4 inline-block shadow-lg">
                  {c.saved}
                </div>
                <p className="text-white text-2xl font-medium mb-1">{c.name}</p>
                <p className="text-white/60 text-sm">{c.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

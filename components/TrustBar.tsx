import fs from "node:fs";
import path from "node:path";
import RotatingWord from "./RotatingWord";

/**
 * Client logo strip.
 *
 * Real logos are read from /public/logos at build time: name the file after the
 * slug below and it replaces the placeholder mark on the next build, with no
 * edit here. That is deliberate, because the files arrive one at a time as each
 * client sends theirs, and a strip where four names have logos and two do not
 * should keep working rather than wait for the set to be complete.
 *
 * Only put a logo here once the client has agreed to it. A logo is a trademark,
 * and permission to be named is not the same as permission to be shown.
 */
const logos = [
  { name: "Heather CPA Firm", slug: "heather-cpa-firm", mark: "circle", badge: null },
  { name: "Varadhi Firms", slug: "varadhi-firms", mark: "diamond", badge: null },
  { name: "Radio Surabhi", slug: "radio-surabhi", mark: "lines", badge: null },
  { name: "Urban Systems", slug: "urban-systems", mark: "square", badge: null },
  { name: "iNRI", slug: "inri", mark: "triangle", badge: "Backed by Y Combinator" },
  { name: "Indian Eagle", slug: "indian-eagle", mark: "circle", badge: null },
] as const;

/* Read once at module load rather than per render. This is a server component,
   so the directory is walked when the page is built, not when it is served. */
const LOGO_DIR = path.join(process.cwd(), "public", "logos");
const present = new Set<string>(
  fs.existsSync(LOGO_DIR) ? fs.readdirSync(LOGO_DIR) : [],
);

/* SVG first: the strip is greyscale and scales with the viewport, which is
   where a raster logo shows its edges. */
const EXTENSIONS = ["svg", "webp", "png", "jpg"] as const;

function logoSrc(slug: string): string | null {
  for (const ext of EXTENSIONS) {
    if (present.has(`${slug}.${ext}`)) return `/logos/${slug}.${ext}`;
  }
  return null;
}

type MarkType = (typeof logos)[number]["mark"];

function Mark({ type }: { type: MarkType }) {
  const common = "w-6 h-6 text-[#00174c]";
  switch (type) {
    case "circle":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
    case "diamond":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2 22 12 12 22 2 12z" />
        </svg>
      );
    case "square":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="4" />
        </svg>
      );
    case "triangle":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 3 22 20 2 20z" />
        </svg>
      );
    case "lines":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <rect x="3" y="5" width="18" height="3" rx="1.5" />
          <rect x="3" y="10.5" width="18" height="3" rx="1.5" />
          <rect x="3" y="16" width="18" height="3" rx="1.5" />
        </svg>
      );
  }
}

export default function TrustBar() {
  const doubled = [...logos, ...logos];
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1280px] mx-auto px-5 md:px-6">
        <p className="text-center text-xs font-medium text-[#c2c6d8] mb-10 tracking-widest uppercase">
          We&apos;ve helped thousands of{" "}
          <RotatingWord words={["farm", "trucking", "retail"]} className="text-[#0053ce]/60" />{" "}
          businesses manage bookkeeping, taxes and more
        </p>
      </div>

      {/* Running marquee of client logos */}
      <div className="group relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

        <div
          className="flex w-max items-center gap-20 opacity-60 grayscale"
          style={{ animation: "marquee 28s linear infinite" }}
        >
          {doubled.map((logo, i) => {
            const src = logoSrc(logo.slug);
            return (
              <div
                key={`${logo.name}-${i}`}
                className="flex items-center gap-2.5 whitespace-nowrap"
              >
                {src ? (
                  /* Plain img rather than next/image: these are decorative marks
                     of a handful of kilobytes, and next/image wants dimensions
                     this component cannot know for a file that may not exist
                     yet. alt is empty because the name follows in text, and a
                     screen reader should not hear it twice. */
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={src}
                    alt=""
                    className="h-7 w-auto max-w-[110px] object-contain"
                  />
                ) : (
                  <Mark type={logo.mark} />
                )}
                <span className="text-lg font-semibold text-[#00174c] tracking-tight">
                  {logo.name}
                </span>
                {logo.badge && (
                  <span className="text-[11px] font-medium text-[#727687] border border-[#c2c6d8]/60 rounded-full px-2.5 py-0.5">
                    {logo.badge}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Link from "next/link";

import { urlForImage } from "@/sanity/image";
import { buildHeadingIds, headingText, isBlock, isFaqHeading, type PTBlock } from "@/lib/toc";

// Dark-theme article renderer. Colours come from the `.ag .prose` CSS, so the
// components stay class-free and semantic. FAQ sections reuse the theme's `.q`
// accordion (wired by ThemeShell), matching the rest of the dark site.
const makeComponents = (ids: Map<string, string>): PortableTextComponents => {
  const anchor = (value: unknown) => ids.get((value as PTBlock)?._key ?? "");
  return {
    block: {
      normal: ({ children }) => <p>{children}</p>,
      h2: ({ children, value }) => <h2 id={anchor(value)}>{children}</h2>,
      h3: ({ children, value }) => <h3 id={anchor(value)}>{children}</h3>,
      h4: ({ children, value }) => <h4 id={anchor(value)}>{children}</h4>,
      blockquote: ({ children }) => <blockquote>{children}</blockquote>,
    },
    list: {
      bullet: ({ children }) => <ul>{children}</ul>,
      number: ({ children }) => <ol>{children}</ol>,
    },
    marks: {
      strong: ({ children }) => <strong>{children}</strong>,
      em: ({ children }) => <em>{children}</em>,
      code: ({ children }) => <code>{children}</code>,
      link: ({ children, value }) => {
        const href: string = value?.href || "#";
        const external = /^https?:\/\//.test(href);
        return external ? (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        ) : (
          <Link href={href}>{children}</Link>
        );
      },
    },
    types: {
      image: ({ value }) => {
        if (!value?.asset) return null;
        const url = urlForImage(value).width(1600).fit("max").auto("format").url();
        return (
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt={value.alt || ""} />
            {value.alt ? <figcaption>{value.alt}</figcaption> : null}
          </figure>
        );
      },
    },
  };
};

type PTValue = Parameters<typeof PortableText>[0]["value"];

type Segment =
  | { kind: "prose"; blocks: PTBlock[] }
  | { kind: "faq"; heading: PTBlock; intro: PTBlock[]; items: { question: string; blocks: PTBlock[] }[] };

function segment(blocks: PTBlock[]): Segment[] {
  const segments: Segment[] = [];
  let inFaq = false;
  const pushProse = (block: PTBlock) => {
    const last = segments[segments.length - 1];
    if (last && last.kind === "prose") last.blocks.push(block);
    else segments.push({ kind: "prose", blocks: [block] });
  };
  for (const block of blocks) {
    if (isFaqHeading(block)) {
      segments.push({ kind: "faq", heading: block, intro: [], items: [] });
      inFaq = true;
      continue;
    }
    if (inFaq && isBlock(block, "h2")) inFaq = false;
    if (inFaq) {
      const faq = segments[segments.length - 1] as Extract<Segment, { kind: "faq" }>;
      if (isBlock(block, "h3")) faq.items.push({ question: headingText(block), blocks: [] });
      else if (faq.items.length > 0) faq.items[faq.items.length - 1].blocks.push(block);
      else faq.intro.push(block);
      continue;
    }
    pushProse(block);
  }
  return segments;
}

export default function PortableTextBodyDark({ value }: { value: unknown }) {
  if (!Array.isArray(value) || value.length === 0) return null;
  const segments = segment(value as PTBlock[]);
  const components = makeComponents(buildHeadingIds(value));

  return (
    <>
      {segments.map((seg, i) =>
        seg.kind === "prose" ? (
          <div className="prose" key={`prose-${i}`}>
            <PortableText value={seg.blocks as unknown as PTValue} components={components} />
          </div>
        ) : (
          <section key={`faq-${i}`}>
            <div className="prose">
              <PortableText value={[seg.heading] as unknown as PTValue} components={components} />
              {seg.intro.length > 0 ? (
                <PortableText value={seg.intro as unknown as PTValue} components={components} />
              ) : null}
            </div>
            {seg.items.length > 0 ? (
              <div className="faq" style={{ marginTop: 16 }}>
                {seg.items.map((item, j) => (
                  <div className="q" key={`${item.question}-${j}`}>
                    <button type="button">
                      <i>⌄</i>
                      {item.question}
                    </button>
                    <div className="a">
                      <div className="prose">
                        <PortableText value={item.blocks as unknown as PTValue} components={components} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </section>
        )
      )}
    </>
  );
}

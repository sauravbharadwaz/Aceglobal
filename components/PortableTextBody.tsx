import {
  PortableText,
  type PortableTextComponents,
} from "@portabletext/react";
import Link from "next/link";

import FaqAccordionItem from "@/components/FaqAccordionItem";
import { urlForImage } from "@/sanity/image";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-[#424655] text-base md:text-lg leading-relaxed mb-6">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="text-[26px] md:text-[34px] font-medium text-[#00174c] leading-[1.2] mt-12 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-medium text-[#00174c] mt-10 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold text-[#00174c] mt-8 mb-2">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#0053ce] pl-5 my-8 italic text-lg text-[#424655]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-6 space-y-2 text-[#424655] text-base md:text-lg">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-6 space-y-2 text-[#424655] text-base md:text-lg">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-[#00174c]">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-[#f2f3ff] text-[#0053ce] rounded px-1.5 py-0.5 text-[0.9em]">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const href: string = value?.href || "#";
      const external = /^https?:\/\//.test(href);
      return external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0053ce] underline underline-offset-2 hover:opacity-80"
        >
          {children}
        </a>
      ) : (
        <Link
          href={href}
          className="text-[#0053ce] underline underline-offset-2 hover:opacity-80"
        >
          {children}
        </Link>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const url = urlForImage(value)
        .width(1600)
        .fit("max")
        .auto("format")
        .url();
      return (
        <figure className="my-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt={value.alt || ""}
            className="w-full rounded-2xl border border-[#c2c6d8]/20"
          />
          {value.alt ? (
            <figcaption className="text-sm text-[#727687] mt-2 text-center">
              {value.alt}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
};

type PTValue = Parameters<typeof PortableText>[0]["value"];

type PTBlock = {
  _type?: string;
  style?: string;
  children?: { text?: string }[];
};

function headingText(block: PTBlock) {
  return (block.children || [])
    .map((c) => c.text || "")
    .join("")
    .trim();
}

const isBlock = (b: PTBlock, style: string) =>
  b._type === "block" && b.style === style;

// Only the post's FAQ section collapses. Everything else is a normal article.
const isFaqHeading = (b: PTBlock) =>
  isBlock(b, "h2") && /frequently asked questions/i.test(headingText(b));

// The article renders straight through as prose. When we reach the
// "Frequently asked questions" h2, we switch modes: that heading stays a
// normal heading, and each h3 question beneath it becomes an expand/collapse
// item — until the next h2 ends the FAQ section and prose resumes.
type Segment =
  | { kind: "prose"; blocks: PTBlock[] }
  | {
      kind: "faq";
      heading: PTBlock;
      intro: PTBlock[];
      items: { question: string; blocks: PTBlock[] }[];
    };

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

    // Any h2 after the FAQ heading closes the FAQ section.
    if (inFaq && isBlock(block, "h2")) inFaq = false;

    if (inFaq) {
      const faq = segments[segments.length - 1] as Extract<
        Segment,
        { kind: "faq" }
      >;
      if (isBlock(block, "h3")) {
        faq.items.push({ question: headingText(block), blocks: [] });
      } else if (faq.items.length > 0) {
        faq.items[faq.items.length - 1].blocks.push(block);
      } else {
        // Text between the FAQ heading and the first question stays visible.
        faq.intro.push(block);
      }
      continue;
    }

    pushProse(block);
  }

  return segments;
}

export default function PortableTextBody({ value }: { value: unknown }) {
  if (!Array.isArray(value) || value.length === 0) return null;

  const segments = segment(value as PTBlock[]);

  return (
    <>
      {segments.map((seg, i) =>
        seg.kind === "prose" ? (
          <PortableText
            key={`prose-${i}`}
            value={seg.blocks as unknown as PTValue}
            components={components}
          />
        ) : (
          <section key={`faq-${i}`}>
            <PortableText
              value={[seg.heading] as unknown as PTValue}
              components={components}
            />
            {seg.intro.length > 0 ? (
              <PortableText
                value={seg.intro as unknown as PTValue}
                components={components}
              />
            ) : null}
            {seg.items.length > 0 ? (
              <div className="border-t border-[#c2c6d8]/30">
                {seg.items.map((item, j) => (
                  <FaqAccordionItem
                    key={`${item.question}-${j}`}
                    question={item.question}
                  >
                    <PortableText
                      value={item.blocks as unknown as PTValue}
                      components={components}
                    />
                  </FaqAccordionItem>
                ))}
              </div>
            ) : null}
          </section>
        )
      )}
    </>
  );
}

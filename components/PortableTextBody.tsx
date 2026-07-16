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

export default function PortableTextBody({ value }: { value: unknown }) {
  if (!Array.isArray(value) || value.length === 0) return null;

  const blocks = value as PTBlock[];

  // These posts are written as FAQs — each h2 is a question and the blocks
  // that follow are its answer. Split on h2 so every question collapses.
  // Anything before the first h2 (quick answer, disclaimer) stays visible,
  // and a post with no h2 at all just renders as a normal article.
  const intro: PTBlock[] = [];
  const sections: { question: string; blocks: PTBlock[] }[] = [];

  for (const block of blocks) {
    if (block._type === "block" && block.style === "h2") {
      sections.push({ question: headingText(block), blocks: [] });
    } else if (sections.length > 0) {
      sections[sections.length - 1].blocks.push(block);
    } else {
      intro.push(block);
    }
  }

  return (
    <>
      {intro.length > 0 ? (
        <PortableText
          value={intro as unknown as PTValue}
          components={components}
        />
      ) : null}

      {sections.length > 0 ? (
        <div className="mt-10 border-t border-[#c2c6d8]/30">
          {sections.map((section, i) => (
            <FaqAccordionItem
              key={`${section.question}-${i}`}
              question={section.question}
            >
              <PortableText
                value={section.blocks as unknown as PTValue}
                components={components}
              />
            </FaqAccordionItem>
          ))}
        </div>
      ) : null}
    </>
  );
}

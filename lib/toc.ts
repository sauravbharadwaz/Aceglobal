/**
 * Heading extraction for the article table of contents.
 *
 * The sidebar links and the `id`s rendered onto the headings themselves have to
 * agree exactly. Rather than have each side slugify independently — which drifts
 * the moment the two walks disagree about which blocks count — both call
 * `buildHeadingIds` on the same body and look the id up by the block's `_key`.
 */

export type PTBlock = {
  _type?: string;
  _key?: string;
  style?: string;
  children?: { text?: string }[];
};

export type Heading = {
  id: string;
  text: string;
  level: 2 | 3;
};

const HEADING_STYLES = new Set(["h2", "h3", "h4"]);

export function headingText(block: PTBlock) {
  return (block.children || [])
    .map((c) => c.text || "")
    .join("")
    .trim();
}

export const isBlock = (b: PTBlock, style: string) =>
  b._type === "block" && b.style === style;

const isHeading = (b: PTBlock) =>
  b._type === "block" && !!b.style && HEADING_STYLES.has(b.style);

// Only the post's FAQ section collapses. Everything else is a normal article.
export const isFaqHeading = (b: PTBlock) =>
  isBlock(b, "h2") && /frequently asked questions/i.test(headingText(b));

export function slugify(text: string) {
  return (
    text
      .toLowerCase()
      .replace(/['‘’"]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "section"
  );
}

/**
 * `_key` → anchor id, for every heading in the body.
 *
 * Two headings with the same text would otherwise produce the same id and every
 * link to the second would jump to the first, so repeats get `-2`, `-3`, and so
 * on. Blocks are keyed by `_key` (Sanity guarantees one per block) so the
 * renderer can resolve an id without tracking its position in the document.
 */
export function buildHeadingIds(value: unknown): Map<string, string> {
  const ids = new Map<string, string>();
  if (!Array.isArray(value)) return ids;

  const seen = new Map<string, number>();

  for (const block of value as PTBlock[]) {
    if (!isHeading(block) || !block._key) continue;
    const text = headingText(block);
    if (!text) continue;

    const base = slugify(text);
    const n = (seen.get(base) ?? 0) + 1;
    seen.set(base, n);
    ids.set(block._key, n === 1 ? base : `${base}-${n}`);
  }

  return ids;
}

/**
 * The h2/h3 headings of a post, in document order.
 *
 * h3s inside the FAQ section are skipped deliberately: PortableTextBody turns
 * those into accordion questions rather than headings, so they carry no `id`
 * and a sidebar link pointing at one would go nowhere.
 */
export function extractHeadings(value: unknown): Heading[] {
  if (!Array.isArray(value)) return [];

  const ids = buildHeadingIds(value);
  const headings: Heading[] = [];
  let inFaq = false;

  for (const block of value as PTBlock[]) {
    const isH2 = isBlock(block, "h2");
    const isH3 = isBlock(block, "h3");
    if (!isH2 && !isH3) continue;

    const id = block._key ? ids.get(block._key) : undefined;
    if (!id) continue;

    if (isH2) {
      // An h2 always closes any open FAQ section — including the FAQ heading
      // itself, which is a real heading and belongs in the list.
      inFaq = isFaqHeading(block);
      headings.push({ id, text: headingText(block), level: 2 });
      continue;
    }

    if (!inFaq) headings.push({ id, text: headingText(block), level: 3 });
  }

  return headings;
}

/**
 * Renders a schema.org JSON-LD block. Pass an object with "@context" set.
 *
 * Only feed this data we control (our own CMS or constants). "<" is escaped so
 * a value containing "</script>" can't terminate the tag early.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      type: "text",
      rows: 3,
      description: "Short summary shown on cards and in link previews.",
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "coverImage",
      type: "image",
      title: "Cover image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    defineField({
      name: "author",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      title: "Published at",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "body", type: "blockContent", title: "Body" }),
    defineField({
      name: "seo",
      type: "object",
      title: "SEO",
      description:
        "Everything here is optional. Leave a field blank and the site falls back to the post title, excerpt and cover image.",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: "metaTitle",
          type: "string",
          title: "Meta title",
          description:
            "Overrides the browser/search title. Aim for 50–60 characters; longer titles get truncated in results.",
          validation: (Rule) =>
            Rule.max(60).warning(
              "Titles over 60 characters get cut off in search results."
            ),
        }),
        defineField({
          name: "metaDescription",
          type: "text",
          rows: 2,
          title: "Meta description",
          description:
            "Overrides the meta description. Aim for 150–160 characters and give a reason to click.",
          validation: (Rule) =>
            Rule.max(160).warning(
              "Descriptions over 160 characters get cut off in search results."
            ),
        }),
        defineField({
          name: "ogImage",
          type: "image",
          title: "Social share image",
          description:
            "Shown when the post is shared on LinkedIn, X, Slack, etc. Use 1200×630. Falls back to the cover image.",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alt text" }],
        }),
        defineField({
          name: "canonicalUrl",
          type: "url",
          title: "Canonical URL",
          description:
            "Only set this if the article was published first somewhere else. Points search engines at the original.",
          validation: (Rule) => Rule.uri({ scheme: ["https", "http"] }),
        }),
        defineField({
          name: "noIndex",
          type: "boolean",
          title: "Hide from search engines",
          description:
            "Adds a noindex tag and drops the post from the sitemap. The page stays reachable by direct link.",
          initialValue: false,
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: "Published (newest first)",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", media: "coverImage", date: "publishedAt" },
    prepare({ title, media, date }) {
      return {
        title,
        media,
        subtitle: date
          ? new Date(date as string).toLocaleDateString()
          : "Unpublished",
      };
    },
  },
});

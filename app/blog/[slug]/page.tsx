import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import ThemeShell from "@/components/theme/ThemeShell";
import PortableTextBodyDark from "@/components/PortableTextBodyDark";
import { getPost, getPostSlugs } from "@/sanity/queries";
import { urlForImage } from "@/sanity/image";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Blog | Ace Global" };
  return {
    title: post.seo?.metaTitle || `${post.title} | Ace Global`,
    description: post.seo?.metaDescription || post.excerpt || undefined,
  };
}

function formatDate(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const cover = post.coverImage?.asset
    ? urlForImage(post.coverImage).width(1600).height(840).fit("crop").auto("format").url()
    : null;
  const authorImg = post.author?.image?.asset
    ? urlForImage(post.author.image).width(96).height(96).fit("crop").url()
    : null;

  return (
    <ThemeShell>
      {/* Header */}
      <section>
        <div className="wrap" style={{ maxWidth: 840 }}>
          <div style={{ textAlign: "center", paddingTop: 24 }}>
            <Link href="/blog" style={{ color: "var(--orange-2)", fontSize: 13, fontWeight: 600 }}>
              ← All articles
            </Link>
            {post.categories?.length ? (
              <div style={{ display: "flex", gap: 8, justifyContent: "center", margin: "18px 0 0" }}>
                {post.categories.map((c) => (
                  <span
                    key={c.slug}
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--orange-2)",
                      background: "rgba(255,90,31,.12)",
                      border: "1px solid var(--line)",
                      padding: "4px 12px",
                      borderRadius: 999,
                    }}
                  >
                    {c.title}
                  </span>
                ))}
              </div>
            ) : null}
            <h1
              style={{
                fontSize: "clamp(28px,4.6vw,48px)",
                fontWeight: 600,
                letterSpacing: "-.02em",
                lineHeight: 1.14,
                margin: "20px 0 22px",
              }}
            >
              {post.title}
            </h1>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                color: "var(--muted)",
                fontSize: 14,
              }}
            >
              {authorImg ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={authorImg}
                  alt={post.author?.name || ""}
                  style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover" }}
                />
              ) : null}
              <div style={{ textAlign: "left" }}>
                {post.author?.name ? (
                  <div style={{ color: "var(--txt)", fontWeight: 600 }}>{post.author.name}</div>
                ) : null}
                <div>{formatDate(post.publishedAt)}</div>
              </div>
            </div>
          </div>

          {cover ? (
            <div className="feat-hero-img" style={{ marginTop: 40, maxWidth: 840 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cover} alt={post.coverImage?.alt || post.title} />
            </div>
          ) : null}
        </div>
      </section>

      {/* Body */}
      <article style={{ padding: "0 0 120px" }}>
        <div className="wrap" style={{ maxWidth: 760 }}>
          <PortableTextBodyDark value={post.body} />
        </div>
      </article>
    </ThemeShell>
  );
}

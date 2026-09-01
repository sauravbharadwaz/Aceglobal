import type { Metadata } from "next";
import Link from "next/link";

import ThemeShell from "@/components/theme/ThemeShell";
import { getPosts, type PostCard } from "@/sanity/queries";
import { urlForImage } from "@/sanity/image";

export const metadata: Metadata = {
  title: "Blog | Ace Global",
  description:
    "Insights on bookkeeping, corporate taxes, payroll, and compliance for small businesses — from the Ace Global team.",
};

export const revalidate = 60;

function formatDate(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function coverUrl(post: PostCard) {
  if (!post.coverImage?.asset) return null;
  return urlForImage(post.coverImage).width(800).height(500).fit("crop").auto("format").url();
}

function categoriesOf(posts: PostCard[]) {
  const seen = new Map<string, { title: string; slug: string }>();
  for (const p of posts) {
    for (const c of p.categories ?? []) {
      if (c?.slug && !seen.has(c.slug)) seen.set(c.slug, { title: c.title, slug: c.slug });
    }
  }
  return [...seen.values()].sort((a, b) => a.title.localeCompare(b.title));
}

function Card({ post }: { post: PostCard }) {
  const img = coverUrl(post);
  const author = post.author;
  const authorImg = author?.image?.asset
    ? urlForImage(author.image).width(64).height(64).fit("crop").auto("format").url()
    : null;
  const readTime = Math.max(1, Math.round(post.readTime || 1));
  return (
    <Link href={`/blog/${post.slug}`} className="bcard" data-fade>
      <div className="cover">
        {img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={img} alt={post.coverImage?.alt || post.title} />
        ) : null}
        {post.categories?.[0] ? <span className="cat">{post.categories[0].title}</span> : null}
      </div>
      <p className="meta">
        {formatDate(post.publishedAt)}
        {post.publishedAt ? " · " : ""}
        {readTime} min read
      </p>
      <h3>{post.title}</h3>
      {author?.name ? (
        <div className="auth">
          {authorImg ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={authorImg} alt={author.name} />
          ) : (
            <span className="ini">{author.name.charAt(0)}</span>
          )}
          {author.name}
        </div>
      ) : null}
    </Link>
  );
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const posts = await getPosts();
  const { category } = await searchParams;
  const active = typeof category === "string" ? category : null;
  const categories = categoriesOf(posts);
  const activeCategory = categories.find((c) => c.slug === active) ?? null;
  const visible = activeCategory
    ? posts.filter((p) => p.categories?.some((c) => c.slug === activeCategory.slug))
    : posts;

  return (
    <ThemeShell>
      <section>
        <div className="wrap">
          <div className="page-head">
            <div className="tag" data-fade>
              <i>✦</i>Blog
            </div>
            <h1 data-fade>
              {activeCategory ? (
                activeCategory.title
              ) : (
                <>
                  Insights for <span className="accent">small business owners.</span>
                </>
              )}
            </h1>
            <p className="sub" data-fade>
              Practical takes on bookkeeping, corporate taxes, payroll, and compliance — from the CPA
              team that handles it every day.
            </p>
          </div>

          {categories.length > 0 ? (
            <div className="rfilter" style={{ marginTop: 32 }}>
              <Link href="/blog" className={!active ? "on" : ""}>
                All
              </Link>
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/blog?category=${c.slug}`}
                  className={active === c.slug ? "on" : ""}
                >
                  {c.title}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          {visible.length === 0 ? (
            <p className="sub center" style={{ padding: "40px 0" }}>
              No posts published yet — check back soon.
            </p>
          ) : (
            <div className="bgrid">
              {visible.map((p) => (
                <Card key={p._id} post={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </ThemeShell>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import ScrollReveal from "@/components/ScrollReveal";
import { getPosts, type PostCard } from "@/sanity/queries";
import { urlForImage } from "@/sanity/image";

export const metadata: Metadata = {
  alternates: { canonical: "/blog" },
  title: "Blog | Ace Global",
  description:
    "Insights on bookkeeping, corporate taxes, payroll, and compliance for small businesses — from the Ace Global team.",
};

// Re-fetch published content at most once a minute.
export const revalidate = 60;

function formatDate(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function coverUrl(post: PostCard, w: number, h: number) {
  if (!post.coverImage?.asset) return null;
  return urlForImage(post.coverImage)
    .width(w)
    .height(h)
    .fit("crop")
    .auto("format")
    .url();
}

function PostCardItem({ post }: { post: PostCard }) {
  const img = coverUrl(post, 800, 500);
  const author = post.author;
  const authorImg = author?.image?.asset
    ? urlForImage(author.image).width(64).height(64).fit("crop").auto("format").url()
    : null;
  const readTime = Math.max(1, Math.round(post.readTime || 1));

  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col">
      {/* Cover image (or branded gradient placeholder) */}
      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-[#e3e7ff] via-[#eef0ff] to-[#cdd6ff]">
        {img ? (
          <Image
            src={img}
            alt={post.coverImage?.alt || post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : null}
        {post.categories?.[0] ? (
          /* Bottom-right, not top-left: cover artwork carries the Ace Global
             logo in its top-left corner and the pill was sitting on top of it. */
          <span className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-[#0053ce] text-xs font-medium px-3 py-1.5 rounded-full shadow-sm">
            {post.categories[0].title}
          </span>
        ) : null}
      </div>

      {/* Meta + title */}
      <div className="mt-5 flex flex-col flex-1">
        <p className="text-sm text-[#727687] mb-2">
          {formatDate(post.publishedAt)}
          {post.publishedAt ? " · " : ""}
          {readTime} min read
        </p>
        <h3 className="text-lg md:text-xl font-semibold text-[#00174c] leading-snug group-hover:text-[#0053ce] transition-colors">
          {post.title}
        </h3>

        {/* Author */}
        {author?.name ? (
          <div className="mt-5 flex items-center gap-2.5">
            {authorImg ? (
              <Image
                src={authorImg}
                alt={author.name}
                width={28}
                height={28}
                className="w-7 h-7 rounded-full object-cover"
              />
            ) : (
              <span className="w-7 h-7 rounded-full bg-[#0053ce]/10 text-[#0053ce] text-xs font-semibold flex items-center justify-center">
                {author.name.charAt(0)}
              </span>
            )}
            <span className="text-sm font-medium text-[#00174c]">{author.name}</span>
          </div>
        ) : null}
      </div>
    </Link>
  );
}

function EmptyState() {
  return (
    <section className="py-16 md:py-28 bg-white">
      <div className="max-w-[640px] mx-auto px-5 md:px-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-[#0053ce]/10 flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-7 h-7 text-[#0053ce]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v8a2 2 0 01-2 2zM9 9h1m-1 4h6m-6 4h6"
            />
          </svg>
        </div>
        <h2 className="text-[24px] md:text-[30px] font-medium text-[#00174c] mb-3">
          No posts published yet
        </h2>
        <p className="text-[#727687] leading-relaxed">
          Our first articles on bookkeeping, taxes, payroll, and compliance are on
          the way. Check back soon.
        </p>
      </div>
    </section>
  );
}

/** Every category in use, de-duplicated, alphabetical — the filter row. */
function categoriesOf(posts: PostCard[]) {
  const seen = new Map<string, { title: string; slug: string }>();
  for (const p of posts) {
    for (const c of p.categories ?? []) {
      if (c?.slug && !seen.has(c.slug)) seen.set(c.slug, { title: c.title, slug: c.slug });
    }
  }
  return [...seen.values()].sort((a, b) => a.title.localeCompare(b.title));
}

function NoMatches({ label }: { label: string }) {
  return (
    <div className="col-span-full py-16 text-center">
      <p className="text-[#00174c] font-medium mb-1">Nothing filed under “{label}” yet.</p>
      <Link href="/blog" className="text-sm text-[#0053ce] hover:underline">
        View all articles
      </Link>
    </div>
  );
}

export default async function BlogPage({
  searchParams,
}: {
  // A promise in this version of Next — it has to be awaited before use.
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

  const chip = (label: string, href: string, isActive: boolean) => (
    <Link
      key={href}
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={
        "px-4 py-2 rounded-full text-sm font-medium border transition-colors " +
        (isActive
          ? "bg-[#00174c] text-white border-[#00174c]"
          : "bg-white text-[#424655] border-[#e3e6ef] hover:border-[#0053ce] hover:text-[#0053ce]")
      }
    >
      {label}
    </Link>
  );

  return (
    <>
      <ScrollReveal />
      <Navbar />
      <main>
        {/* Page header. Deliberately not a full-bleed hero: this is an index, so
            the first article should be reachable without scrolling past a screen
            of decoration. Title, one line of context, and the filters. */}
        <section className="pt-28 md:pt-36 pb-8 md:pb-10 bg-white">
          <div className="max-w-[1280px] mx-auto px-5 md:px-6">
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
              <div>
                <h1 className="text-[34px] md:text-[46px] font-medium leading-[1.1] tracking-[-0.02em] text-[#00174c]">
                  {activeCategory ? activeCategory.title : "Blog"}
                </h1>
                <p className="mt-3 text-base md:text-lg leading-relaxed text-[#727687] max-w-2xl">
                  Practical takes on bookkeeping, corporate taxes, payroll, and
                  compliance — from the CPA team that handles it every day.
                </p>
              </div>
              {posts.length > 0 && (
                <p className="text-sm text-[#727687] pb-1">
                  {visible.length} {visible.length === 1 ? "article" : "articles"}
                </p>
              )}
            </div>

            {categories.length > 1 && (
              /* `rounded-2xl` is load-bearing, not decorative: ScrollReveal targets
                 the outermost `[class*="rounded-"]`, so without it every chip would
                 fly in from its own random direction. This makes the row animate as
                 one. It has no background, so the radius itself is invisible. */
              <nav
                aria-label="Filter articles by category"
                className="mt-8 flex flex-wrap gap-2 rounded-2xl"
              >
                {chip("All", "/blog", !activeCategory)}
                {categories.map((c) =>
                  chip(c.title, `/blog?category=${encodeURIComponent(c.slug)}`, c.slug === activeCategory?.slug),
                )}
              </nav>
            )}
          </div>
          <div className="max-w-[1280px] mx-auto px-5 md:px-6">
            <div className="mt-8 md:mt-10 border-t border-[#eef0f6]" />
          </div>
        </section>

        {/* Uniform card grid */}
        {posts.length === 0 ? (
          <EmptyState />
        ) : (
          <section className="pb-16 md:pb-24 bg-white">
            <div className="max-w-[1280px] mx-auto px-5 md:px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                {visible.length === 0 ? (
                  <NoMatches label={activeCategory?.title ?? ""} />
                ) : (
                  visible.map((post) => <PostCardItem key={post._id} post={post} />)
                )}
              </div>
            </div>
          </section>
        )}

        <CTA />
      </main>
      <Footer />
    </>
  );
}

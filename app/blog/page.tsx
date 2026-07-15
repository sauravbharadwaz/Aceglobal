import type { Metadata } from "next";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import ScrollReveal from "@/components/ScrollReveal";
import { getPosts, type PostCard } from "@/sanity/queries";
import { urlForImage } from "@/sanity/image";

export const metadata: Metadata = {
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
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={img}
            alt={post.coverImage?.alt || post.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : null}
        {post.categories?.[0] ? (
          <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#0053ce] text-xs font-medium px-3 py-1.5 rounded-full shadow-sm">
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
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={authorImg}
                alt={author.name}
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

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <ScrollReveal />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 md:pt-40 pb-12 md:pb-16 overflow-hidden bg-gradient-to-b from-[#e3e7ff] via-[#f2f3ff] to-white">
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            aria-hidden="true"
          >
            <div className="absolute -top-24 -left-24 w-[28rem] h-[28rem] bg-[#0053ce]/25 rounded-full blur-3xl" />
            <div className="absolute top-32 -right-24 w-[30rem] h-[30rem] bg-[#94a6fe]/40 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-white/40 backdrop-blur-md border border-white/50 px-4 py-2 rounded-full mb-6 shadow-sm">
              <span className="text-sm font-medium tracking-wide text-[#243889]">
                Blog
              </span>
            </div>
            <h1 className="text-[32px] sm:text-[40px] md:text-[60px] font-medium leading-[1.12] md:leading-[1.1] tracking-[-0.02em] text-[#00174c] max-w-4xl mx-auto mb-5 md:mb-6">
              Insights for{" "}
              <span className="text-[#0053ce]">small business owners.</span>
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-[#727687] max-w-2xl mx-auto">
              Practical takes on bookkeeping, corporate taxes, payroll, and
              compliance — from the CPA team that handles it every day.
            </p>
          </div>
        </section>

        {/* Uniform card grid */}
        {posts.length === 0 ? (
          <EmptyState />
        ) : (
          <section className="py-12 md:py-20 bg-white">
            <div className="max-w-[1280px] mx-auto px-5 md:px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                {posts.map((post) => (
                  <PostCardItem key={post._id} post={post} />
                ))}
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

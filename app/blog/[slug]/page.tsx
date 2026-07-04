import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import ScrollReveal from "@/components/ScrollReveal";
import PortableTextBody from "@/components/PortableTextBody";
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
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
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
    <>
      <ScrollReveal />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 md:pt-40 pb-8 md:pb-12 overflow-hidden bg-gradient-to-b from-[#e3e7ff] via-[#f2f3ff] to-white">
          <div className="relative z-10 max-w-[820px] mx-auto px-5 md:px-6 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0053ce] hover:opacity-80 mb-6"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              All articles
            </Link>
            {post.categories?.length ? (
              <div className="flex flex-wrap justify-center gap-2 mb-5">
                {post.categories.map((c) => (
                  <span
                    key={c.slug}
                    className="text-xs font-medium bg-[#0053ce]/10 text-[#0053ce] px-3 py-1 rounded-full"
                  >
                    {c.title}
                  </span>
                ))}
              </div>
            ) : null}
            <h1 className="text-[30px] sm:text-[38px] md:text-[52px] font-medium leading-[1.14] tracking-[-0.02em] text-[#00174c] mb-6">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-3 text-sm text-[#727687]">
              {authorImg ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={authorImg}
                  alt={post.author?.name || ""}
                  className="w-9 h-9 rounded-full object-cover"
                />
              ) : null}
              <div className="text-left">
                {post.author?.name ? (
                  <p className="text-[#00174c] font-medium">{post.author.name}</p>
                ) : null}
                <p>{formatDate(post.publishedAt)}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Cover image */}
        {cover ? (
          <div className="max-w-[960px] mx-auto px-5 md:px-6 -mt-2 mb-10 md:mb-14">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cover}
              alt={post.coverImage?.alt || post.title}
              className="w-full rounded-[28px] border border-[#c2c6d8]/20 shadow-lg"
            />
          </div>
        ) : null}

        {/* Body */}
        <article className="pb-16 md:pb-24 bg-white">
          <div className="max-w-[720px] mx-auto px-5 md:px-6">
            <PortableTextBody value={post.body} />
          </div>
        </article>

        <CTA />
      </main>
      <Footer />
    </>
  );
}

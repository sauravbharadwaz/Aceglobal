import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import ScrollReveal from "@/components/ScrollReveal";
import PortableTextBody from "@/components/PortableTextBody";
import TableOfContents from "@/components/TableOfContents";
import JsonLd from "@/components/JsonLd";
import { getPost, getPostSlugs, type PostFull } from "@/sanity/queries";
import { urlForImage } from "@/sanity/image";
import { extractHeadings } from "@/lib/toc";
import { SITE_NAME, SITE_URL } from "@/lib/site-env";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

/**
 * Everything search engines and link previews read from a post, resolved once
 * so generateMetadata and the JSON-LD block can't disagree with each other.
 */
function resolveSeo(post: PostFull) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const title = post.seo?.metaTitle || `${post.title} | ${SITE_NAME}`;
  const description = post.seo?.metaDescription || post.excerpt || undefined;

  // Dedicated share image first, then the cover. Both are cropped to the
  // 1200×630 that LinkedIn, X, Slack and iMessage all expect.
  const imageSource = post.seo?.ogImage?.asset
    ? post.seo.ogImage
    : post.coverImage?.asset
      ? post.coverImage
      : null;
  const image = imageSource
    ? {
        url: urlForImage(imageSource)
          .width(1200)
          .height(630)
          .fit("crop")
          .auto("format")
          .url(),
        width: 1200,
        height: 630,
        alt: imageSource.alt || post.title,
      }
    : null;

  return {
    url,
    title,
    description,
    image,
    canonical: post.seo?.canonicalUrl || url,
    noIndex: post.seo?.noIndex === true,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: `Blog | ${SITE_NAME}` };

  const seo = resolveSeo(post);

  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: seo.canonical },
    // Only emit robots when the editor asked to hide the post; otherwise the
    // layout's environment-based rule (noindex outside production) applies.
    ...(seo.noIndex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      type: "article",
      url: seo.url,
      title: seo.title,
      description: seo.description,
      siteName: SITE_NAME,
      locale: "en_US",
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      section: post.categories?.[0]?.title,
      tags: post.categories?.map((c) => c.title),
      images: seo.image ? [seo.image] : undefined,
    },
    twitter: {
      card: seo.image ? "summary_large_image" : "summary",
      title: seo.title,
      description: seo.description,
      images: seo.image ? [seo.image.url] : undefined,
    },
  };
}

/**
 * schema.org BlogPosting + BreadcrumbList. This is what lets Google show the
 * author, date and image in results and what AI answer engines use to
 * attribute the article. Data comes from our own CMS, so it's safe to inline.
 */
function buildJsonLd(post: PostFull) {
  const seo = resolveSeo(post);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${seo.url}#article`,
        mainEntityOfPage: { "@type": "WebPage", "@id": seo.url },
        headline: post.title,
        description: seo.description,
        image: seo.image ? [seo.image.url] : undefined,
        datePublished: post.publishedAt,
        dateModified: post._updatedAt || post.publishedAt,
        author: post.author?.name
          ? {
              "@type": "Person",
              name: post.author.name,
              jobTitle: post.author.role,
            }
          : { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        publisher: {
          "@type": "Organization",
          "@id": `${SITE_URL}/#organization`,
          name: SITE_NAME,
          url: SITE_URL,
          logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.svg` },
        },
        articleSection: post.categories?.map((c) => c.title),
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: seo.url },
        ],
      },
    ],
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
  const headings = extractHeadings(post.body);
  const jsonLd = buildJsonLd(post);

  return (
    <>
      <JsonLd data={jsonLd} />
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
                <Image
                  src={authorImg}
                  alt={post.author?.name || ""}
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-full object-cover"
                />
              ) : null}
              <div className="text-left">
                {post.author?.name ? (
                  <p className="text-[#00174c] font-medium">{post.author.name}</p>
                ) : null}
                <p>
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Cover image */}
        {cover ? (
          <div className="max-w-[960px] mx-auto px-5 md:px-6 -mt-2 mb-10 md:mb-14">
            <Image
              src={cover}
              alt={post.coverImage?.alt || post.title}
              width={1600}
              height={840}
              preload
              sizes="(max-width: 960px) 100vw, 960px"
              className="w-full h-auto rounded-[28px] border border-[#c2c6d8]/20 shadow-lg"
            />
          </div>
        ) : null}

        {/* Body, with the section nav parked in the left column. The grid only
            engages at lg — below that the nav collapses and stacks above the
            prose, and the article keeps its original single-column measure. */}
        <article className="pb-16 md:pb-24 bg-white">
          <div className="max-w-[1160px] mx-auto px-5 md:px-6">
            <div className="lg:grid lg:grid-cols-[220px_minmax(0,720px)] lg:gap-14 lg:justify-center">
              <TableOfContents headings={headings} />
              <div className="min-w-0 max-w-[720px] mx-auto lg:mx-0">
                <PortableTextBody value={post.body} />
              </div>
            </div>
          </div>
        </article>

        <CTA />
      </main>
      <Footer />
    </>
  );
}

import { groq } from "next-sanity";

import { client } from "./client";
import { isSanityConfigured } from "./env";

// Shared card fields
const postCardFields = groq`
  _id,
  _updatedAt,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  coverImage,
  "noIndex": seo.noIndex == true,
  "readTime": round(length(pt::text(body)) / 5 / 200),
  "author": author->{name, role, image},
  "categories": categories[]->{title, "slug": slug.current}
`;

const postsQuery = groq`*[_type == "post" && defined(slug.current)]
  | order(publishedAt desc){${postCardFields}}`;

const postSlugsQuery = groq`*[_type == "post" && defined(slug.current)].slug.current`;

const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  ${postCardFields},
  body,
  seo
}`;

export type SanityImage = {
  asset?: { _ref: string };
  alt?: string;
  hotspot?: unknown;
};

export type PostSeo = {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImage;
  canonicalUrl?: string;
  noIndex?: boolean;
};

export type PostCard = {
  _id: string;
  _updatedAt?: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  coverImage?: SanityImage;
  noIndex?: boolean;
  readTime?: number;
  author?: { name?: string; role?: string; image?: SanityImage };
  categories?: { title: string; slug: string }[];
};

export type PostFull = PostCard & {
  body?: unknown;
  seo?: PostSeo;
};

export async function getPosts(): Promise<PostCard[]> {
  if (!isSanityConfigured) return [];
  try {
    return await client.fetch<PostCard[]>(
      postsQuery,
      {},
      { next: { revalidate: 60 } }
    );
  } catch {
    return [];
  }
}

export async function getPostSlugs(): Promise<string[]> {
  if (!isSanityConfigured) return [];
  try {
    return await client.fetch<string[]>(postSlugsQuery);
  } catch {
    return [];
  }
}

export async function getPost(slug: string): Promise<PostFull | null> {
  if (!isSanityConfigured) return null;
  try {
    return await client.fetch<PostFull | null>(
      postBySlugQuery,
      { slug },
      { next: { revalidate: 60 } }
    );
  } catch {
    return null;
  }
}

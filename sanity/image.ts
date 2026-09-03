import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

import { client } from "./client";

const builder = createImageUrlBuilder(client);

// Accept our loosely-typed image objects (asset optional) as well as Sanity's
// own source types — callers guard on `asset` before building a URL.
export function urlForImage(source: SanityImageSource | { asset?: unknown }) {
  return builder.image(source as SanityImageSource);
}

/**
 * Intrinsic pixel size of a Sanity image, read from the asset reference.
 * Sanity encodes it in the id: "image-<hash>-<width>x<height>-<format>", so no
 * extra query is needed to give next/image the width/height it requires.
 */
export function imageDimensions(
  source: { asset?: { _ref?: string } } | null | undefined
): { width: number; height: number } | null {
  const ref = source?.asset?._ref;
  const match = ref ? /-(\d+)x(\d+)-[a-z0-9]+$/i.exec(ref) : null;
  if (!match) return null;
  return { width: Number(match[1]), height: Number(match[2]) };
}

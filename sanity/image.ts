import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

import { client } from "./client";

const builder = createImageUrlBuilder(client);

// Accept our loosely-typed image objects (asset optional) as well as Sanity's
// own source types — callers guard on `asset` before building a URL.
export function urlForImage(source: SanityImageSource | { asset?: unknown }) {
  return builder.image(source as SanityImageSource);
}

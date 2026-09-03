// X/Twitter reads twitter:image first and only falls back to og:image on some
// clients, so serve the same default card under both names.
export { default, alt, size, contentType } from "./opengraph-image";

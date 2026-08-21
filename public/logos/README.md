# Client logos

Drop a client's logo here and it replaces the placeholder shape in the trust bar
on the next build. `components/TrustBar.tsx` reads this directory at build time,
so no code change is needed.

## Naming

The file must be named after the slug in `TrustBar.tsx`:

| Client | File |
|---|---|
| Heather CPA Firm | `heather-cpa-firm.svg` |
| Varadhi Firms | `varadhi-firms.svg` |
| Radio Surabhi | `radio-surabhi.svg` |
| Urban Systems | `urban-systems.svg` |
| iNRI | `inri.svg` |
| Indian Eagle | `indian-eagle.svg` |

`.svg` is tried first, then `.webp`, `.png`, `.jpg`. A client with no file here
keeps its placeholder mark, so the strip works with a partial set.

## What to supply

- **SVG** wherever the client has one. The strip is greyscaled and scales with
  the viewport, which is where a raster logo shows its edges.
- Otherwise a **PNG or WebP on a transparent background**, at least 200px tall.
- The mark alone, not the logo with the company name beside it. The name is
  already rendered as text next to it, and a lockup would repeat it.

Rendered at 28px tall and capped at 110px wide, so a very wide logo is scaled
down to fit rather than stretching the row.

## Before adding one

Get the client's agreement first. A logo is a trademark, and permission to be
named as a client is not the same as permission to have your logo displayed.
Most companies have brand guidelines saying what may be used and how.

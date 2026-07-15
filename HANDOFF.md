# Ace Global — Project Handoff

Context note for any new session. The code on disk + git history is the source of
truth; this file captures the things that aren't obvious from the code alone.

## What this is
A marketing website for **Ace Global** (small-business bookkeeping, corporate tax,
payroll & compliance). Design language is **inspired by fondo.com** but all copy is
original to Ace Global. Built fresh — not a fork.

- **Repo:** https://github.com/sauravbharadwaz/New-Ace-Global (branch `main`)
- **Local path:** `C:\Users\gaura\Ace Global\ace-global-website`
- **Stack:** Next.js 16 (App Router) + Tailwind CSS v4 + TypeScript
- **Hosting:** Vercel (custom domain `aceglobal.ai` setup in progress — see below)

## Running locally
```bash
npm install
npm run dev -- -p 3100      # dev server on http://localhost:3100
npm run build               # always build before committing; must pass clean
```
Port **3100** is used because another project sometimes occupies 3000.

> AGENTS.md / CLAUDE.md in the repo warn that this Next.js version has breaking
> changes — read `node_modules/next/dist/docs/` before using unfamiliar APIs.
> Tailwind is **v4** (config lives in `app/globals.css` via `@theme`, not a JS config).

## Pages
- `/` — home (`app/page.tsx`)
- `/bookkeeping` — full platform page (`app/bookkeeping/page.tsx`)
- `/corporate-taxes` — full platform page (`app/corporate-taxes/page.tsx`)
- `/company-formation` — full platform page (`app/company-formation/page.tsx`)
- `/pricing`, `/resources` — marketing pages
- `/blog` + `/blog/[slug]` — Sanity-backed blog (see below)
- `/studio` — embedded Sanity Studio (content editor)

The Navbar "Platform" item is a hover dropdown linking to the platform pages.

## Blog + Sanity (headless CMS)
The blog is powered by **Sanity** (embedded Studio, `next-sanity`).
- **Content model** (`sanity/schemaTypes/`): `post` (title, slug, excerpt,
  coverImage, author→, categories→, publishedAt, body=Portable Text, seo),
  `author`, `category`, `blockContent`.
- **Studio** lives at `/studio` (`app/studio/[[...tool]]/page.tsx`,
  config in `sanity.config.ts`). Edit posts there once the project id is set.
- **Data layer**: `sanity/client.ts`, `sanity/queries.ts` (GROQ + guarded
  fetch helpers), `sanity/image.ts` (image URLs). Body rendered by
  `components/PortableTextBody.tsx` (`@portabletext/react`).
- **Config is env-driven** (`sanity/env.ts`). Until a real project id is set,
  `isSanityConfigured` is false → `/blog` shows an empty state and the build
  still passes (fetches are short-circuited, so no network at build).
- **To go live:** create a free project at https://sanity.io/manage (or
  `npx sanity init`), then set in `.env.local` (Vercel too):
  `NEXT_PUBLIC_SANITY_PROJECT_ID=<id>`, `NEXT_PUBLIC_SANITY_DATASET=production`,
  `NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01`. Add the deployed domain +
  `http://localhost:3100` to the project's CORS origins (sanity.io/manage →
  API → CORS). Then visit `/studio`, create posts, publish.
- **Read token (this project `qpeoflzk`):** the `production` dataset denies
  anonymous reads of content documents (only image assets are public), so the
  site needs a server-side Viewer token. Set `SANITY_API_READ_TOKEN=<token>`
  in `.env.local` AND in Vercel env. `sanity/client.ts` uses it with
  `perspective: "published"`. Without it, `/blog` renders empty even though
  posts exist. (Alternative: make the dataset fully public, then no token
  needed.) The token is server-only — never prefixed `NEXT_PUBLIC_`.
- `.env*` is gitignored here, so the env template isn't committed — the vars
  above are the source of truth.

## Components in use (rendered on home page)
Navbar, Hero, TrustBar, BentoGrid, Timeline, Services, TestimonialCards,
ReviewsWall, DifferenceSection, StatsBento, FAQ, CTA, Footer, ScrollReveal.

NOT used (dead/legacy dark-theme components — ignore unless cleaning up):
Testimonials, ServiceDetail, HowItWorks, LogoCarousel, Stats.

## Design system
- Fonts: **Plus Jakarta Sans**. Heaviest weight used is `font-semibold` (we
  deliberately lightened everything one step from the original).
- Brand colors: primary `#0053ce`, ink `#00174c`, secondary `#94a6fe`,
  dark navy `#172d65`, light bg `#f2f3ff` / `#ebedff`, muted text `#727687`.
- Section vertical rhythm: `py-16 md:py-[120px]`. Cards: `rounded-3xl`/`rounded-[40px]`.
- Mobile: `html, body { overflow-x: clip }` in globals.css prevents stray
  horizontal scroll without breaking the Timeline's sticky stacking.

## Custom motion / interactive components
- `RotatingWord.tsx` — cycles words with a vertical scroll; **animates its width**
  to each word so surrounding text never reflows. Used in Hero headline
  ("Your farm/trucking/retail books…"), BentoGrid heading, and TrustBar heading.
- `CountUp.tsx` — counts a number up when scrolled into view (IntersectionObserver,
  easeOutExpo, respects prefers-reduced-motion). Used for the bento dollar stats.
- `ScrollReveal.tsx` — GSAP ScrollTrigger; reveals elements from random directions.
- `Timeline.tsx` — Framer Motion sticky **stacking cards** (3 "how it works" steps).
- Marquees (TrustBar, ReviewsWall two opposing rows, Timeline press) use the
  `marquee` / `marquee-reverse` keyframes in globals.css.

## Images (all in /public)
- Founder/testimonial photos: `founder-1/2/3.webp`
- CPA team (Difference section): `team-david.webp`, `team-anil.webp` (real user
  photos, Ideogram-upscaled), `team-smile.webp`
- Expert-accountant avatars (BentoGrid): `avatar-1/2/3.webp`
- Hero dashboards: `bookkeeping-hero.webp`, `taxes-hero.webp`

### Image generation note
**gpt-image-2 skill cannot run in this environment** — it needs `OPENAI_API_KEY`
(unset) and Python (not installed). All generated imagery was done with the
**Ideogram MCP** instead (generate + upscale). If an OpenAI key + Python get set
up, gpt-image-2 becomes usable.
- The two hero dashboards carry fictional product labels baked into the image
  ("Ledgery" on bookkeeping, "TAXFLOW" on taxes). Regenerate if you want them to
  read "Ace Global".

## Known placeholders to replace before launch
- **Logos** in TrustBar (real clients: Heather CPA Firm, Varadhi Firms, Radio
  Surabhi, Urban Systems, iNRI [YC-backed], Indian Eagle) and the Timeline press
  row use generic geometric marks. Drop official SVGs into `/public/logos/` and
  swap the `<Mark>`/`<PressMark>` for `<img>`. Confirm permission to display each.
- Footer "Get an AI summary" tiles, Trustpilot badge, and social links are generic.
- Testimonial names/quotes are realistic samples provided by the user — keep or edit.

## Stats / copy that are intentional (don't "correct" them)
- Savings figure is **$1M+ / $1,138,403** (was $100M+; aligned across BentoGrid,
  DifferenceSection badge, StatsBento).
- StatsBento: Established 2021, 10,000+ clients, $1B+ volume, $1M+ tax savings.
- Client comms messaging is **WhatsApp / iMessage / AI agent** (not Slack).

## Repo rename (IMPORTANT)
GitHub renamed the repo from `New-Ace-Global` to **`Aceglobal`**. Pushes still
work via redirect, but update the local remote:
```bash
git remote set-url origin https://github.com/sauravbharadwaz/Aceglobal.git
```

## CI/CD pipeline (set up this session)
- **CI:** `.github/workflows/ci.yml` runs on push + PR to `main` and `staging`:
  `npm ci` → `npm run typecheck` (`tsc --noEmit`) → `npm run build`. Node 20, npm
  cache, concurrency cancels superseded runs.
- **CD:** Vercel auto-deploys `main` → production, `staging` → staging, PRs → previews.
- Branches: **`main`** (production) and **`staging`** both exist on origin.
- TODO (dashboard, not code): add GitHub branch protection requiring the
  "Type-check & build" check on `main` and `staging` to make CI a hard gate.
- No `lint` script — Next 16 removed the built-in linter; add ESLint if wanted.

## Staging environment
- `staging` branch → Vercel staging (intended domain `staging.aceglobal.ai`).
- Staging is behind **Vercel Deployment Protection** (Vercel Authentication), so
  it shows "You Need Access" to anyone not on the Vercel team. To share: use a
  Protection-Bypass share link, password protection (Pro), or invite them to the
  team. This is expected, not a bug.
- Open user question when this session ended: **"Google login doesn't work on
  staging."** Not yet diagnosed. Likely an OAuth redirect-URI / authorized-origins
  issue — whatever Google login they mean must have `staging.aceglobal.ai` added
  to the OAuth client's Authorized JavaScript origins + redirect URIs in Google
  Cloud Console (and matching env vars scoped to Vercel Preview). NOTE: there is
  currently **no auth/login code in this repo** — the marketing site has no Google
  login implemented. Clarify with the user what "Google login on staging" refers
  to (could be the Vercel access wall's Google sign-in, or a separate app).

## SEO / indexing
- `app/robots.ts`: production (`VERCEL_ENV === "production"`) allows all + sitemap;
  staging/preview/dev return `Disallow: /`.
- `app/layout.tsx`: adds `noindex, nofollow` robots meta when not production.
- No `sitemap.xml` yet (robots references `https://aceglobal.ai/sitemap.xml`).

## Vercel custom domain (in progress)
Adding `aceglobal.ai` (primary is `www.aceglobal.ai`; apex 308-redirects to www).
Two blockers seen:
1. Domain was **linked to another Vercel account** → needs a TXT ownership record.
2. Domain currently **points to a Notion site** (Notion's custom-domain feature) —
   that's why visiting `aceglobal.ai` showed a Notion "couldn't load" page. Must
   disconnect it from Notion + remove Notion's DNS records first.
Records to add at **GoDaddy DNS** (use exactly what the Vercel Domains panel shows):
- `TXT` name `_vercel` → `vc-domain-verify=www.aceglobal.ai,1ae9a213c91318988fab`
- `CNAME` name `www` → `b0c9f5a48c55b228.vercel-dns-017.com`
- `A` name `@` → `76.76.21.21` (for the apex→www redirect)
Then Refresh in Vercel; SSL auto-issues. Remove any GoDaddy *forwarding* (wrong tool).

## Workflow conventions established this project
- Build must pass (`npm run build`) before each commit.
- Commit + push after each accepted change; commit messages end with the
  Co-Authored-By trailer.
- Verify visually via the browser MCP when UI changes (dev server on :3100).
- Default to working on `main`; merge `main → staging` (ff-only) to sync staging.

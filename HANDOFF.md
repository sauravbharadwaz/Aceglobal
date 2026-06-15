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

The Navbar "Platform" item is a hover dropdown linking to both platform pages.

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

## Vercel custom domain (in progress)
Adding `aceglobal.ai` (primary is `www.aceglobal.ai`; apex 308-redirects to www).
The domain was previously linked to another Vercel account, so Vercel requires a
**TXT ownership record**. Records to add at **GoDaddy DNS**:
- `TXT` name `_vercel` → value `vc-domain-verify=www.aceglobal.ai,1ae9a213c91318988fab`
- `CNAME` name `www` → value `b0c9f5a48c55b228.vercel-dns-017.com`
- `A` name `@` → `76.76.21.21` (for the apex→www redirect)
Then click Refresh in Vercel; SSL auto-issues. (Disable any GoDaddy *forwarding*
first — forwarding is the wrong mechanism.)

## Workflow conventions established this project
- Build must pass (`npm run build`) before each commit.
- Commit + push after each accepted change; commit messages end with the
  Co-Authored-By trailer.
- Verify visually via the browser MCP when UI changes (dev server on :3100).

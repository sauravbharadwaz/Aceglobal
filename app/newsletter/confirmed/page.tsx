import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter | Ace Global",
  /* Nothing here is worth indexing, and the URL carries a state a search engine
     has no business crawling into. */
  robots: { index: false, follow: false },
};

/* searchParams is a promise in this version of Next and has to be awaited.
   Reading it synchronously silently gives you a promise object rather than the
   values, and every state falls through to the default. */
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const COPY: Record<
  string,
  { heading: string; body: string; tone: "good" | "bad" }
> = {
  ok: {
    heading: "You're subscribed",
    body: "Thanks for confirming. Practical tax, bookkeeping, payroll and compliance tips will land in your inbox, and every one of them has an unsubscribe link.",
    tone: "good",
  },
  expired: {
    heading: "That link has expired",
    body: "Confirmation links work for three days. Subscribe again from the footer of any page and we will send you a fresh one.",
    tone: "bad",
  },
  invalid: {
    heading: "That link did not work",
    body: "It looks incomplete, which usually means an email client broke it across two lines. Subscribe again from the footer of any page and we will send you a new link.",
    tone: "bad",
  },
  error: {
    heading: "Something went wrong",
    body: "We could not finish your subscription just now. Please try again in a few minutes, or write to us and we will add you by hand.",
    tone: "bad",
  },
};

export default async function NewsletterConfirmedPage({ searchParams }: Props) {
  const params = await searchParams;
  const raw = params.state;
  const key = Array.isArray(raw) ? raw[0] : raw;
  const copy = COPY[key ?? ""] ?? COPY.invalid;

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col justify-center px-6 py-24">
      <h1 className="text-3xl font-semibold text-[#00174c]">{copy.heading}</h1>
      <p className="mt-4 text-base leading-relaxed text-[#4a4f63]">
        {copy.body}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/"
          className="rounded-xl bg-[#0053ce] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#196bfa]"
        >
          Back to Ace Global
        </Link>
        {copy.tone === "good" && (
          <Link
            href="/blog"
            className="rounded-xl border border-[#d5d8e2] px-6 py-3 text-sm font-medium text-[#00174c] transition-colors hover:bg-[#f4f5f8]"
          >
            Read the blog
          </Link>
        )}
      </div>
    </main>
  );
}

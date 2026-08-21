import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Double opt-in for the newsletter.
 *
 * Resend has Audiences but no double opt-in of its own, so the confirmation
 * step lives here: subscribing sends a link, and only clicking it adds the
 * address to the audience. Nobody can put someone else on the list by typing
 * their address into the footer.
 *
 * The token is signed rather than stored. A random token would need a table to
 * check it against, which means a migration in the admin's schema and a second
 * place for a half-finished signup to rot. An HMAC over the address and an
 * expiry proves the same thing with nothing to store, and a link that is never
 * clicked simply stops working.
 */

/** Three days. Long enough for a link that sat in a weekend inbox. */
const TTL_SECONDS = 60 * 60 * 24 * 3;

type Verified =
  | { ok: true; email: string }
  | { ok: false; reason: "malformed" | "bad-signature" | "expired" };

export function signSubscribeToken(
  email: string,
  secret: string,
  nowMs: number = Date.now(),
): string {
  const payload = JSON.stringify({
    e: email,
    x: Math.floor(nowMs / 1000) + TTL_SECONDS,
  });
  const data = Buffer.from(payload, "utf8").toString("base64url");
  const sig = createHmac("sha256", secret).update(data).digest("base64url");
  return `${data}.${sig}`;
}

export function verifySubscribeToken(
  token: string,
  secret: string,
  nowMs: number = Date.now(),
): Verified {
  const parts = String(token || "").split(".");
  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    return { ok: false, reason: "malformed" };
  }
  const [data, sig] = parts;

  const expected = createHmac("sha256", secret).update(data).digest("base64url");
  /* Compared with timingSafeEqual, which needs equal lengths, so the length is
     checked first. Returning early on a length mismatch leaks only the length
     of a signature that is already public. */
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return { ok: false, reason: "bad-signature" };
  }

  let parsed: { e?: unknown; x?: unknown };
  try {
    parsed = JSON.parse(Buffer.from(data, "base64url").toString("utf8"));
  } catch {
    return { ok: false, reason: "malformed" };
  }

  const email = typeof parsed.e === "string" ? parsed.e : "";
  const exp = typeof parsed.x === "number" ? parsed.x : 0;
  if (!email) return { ok: false, reason: "malformed" };
  if (Math.floor(nowMs / 1000) > exp) return { ok: false, reason: "expired" };

  return { ok: true, email };
}

export function siteOrigin(): string {
  return (process.env.SITE_URL || "https://aceglobal.ai").replace(/\/+$/, "");
}

function esc(s: string): string {
  return String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ] as string,
  );
}

/**
 * Nothing here throws. A subscriber whose address reached the leads table is
 * captured either way, so a Resend outage must not turn a successful signup
 * into an error on the page. Failures are logged and swallowed, which is the
 * same rule the app repo's mail path follows.
 */
export async function sendConfirmationEmail(email: string): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM;
  const secret = process.env.NEWSLETTER_SECRET;
  if (!key || !from || !secret) {
    console.error("[newsletter] not configured, confirmation not sent");
    return false;
  }

  const link = `${siteOrigin()}/newsletter/confirm?token=${encodeURIComponent(
    signSubscribeToken(email, secret),
  )}`;

  const text = [
    "Confirm your subscription",
    "",
    "You asked to receive practical tax, bookkeeping, payroll and compliance tips from Ace Global.",
    "Open this link to confirm and we will add you to the list:",
    link,
    "",
    "The link works for three days. If you did not ask for this, ignore this email and nothing happens.",
    "",
    "Ace Global",
  ].join("\n");

  const html = `<div style="font-family:system-ui,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#181814">
  <h1 style="font-size:20px;margin:0 0 14px">Confirm your subscription</h1>
  <p style="margin:0 0 14px">You asked to receive practical tax, bookkeeping, payroll and compliance tips from Ace Global.</p>
  <p style="margin:0 0 22px"><a href="${esc(link)}" style="display:inline-block;background:#0053ce;color:#fff;text-decoration:none;padding:12px 22px;border-radius:10px">Confirm subscription</a></p>
  <p style="margin:0 0 14px;color:#66655A;font-size:13px">The link works for three days. If you did not ask for this, ignore this email and nothing happens.</p>
  <p style="margin:0;color:#66655A;font-size:13px">Ace Global</p>
</div>`;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: email,
          subject: "Confirm your subscription to Ace Global",
          html,
          text,
          ...(process.env.MAIL_REPLY_TO
            ? { reply_to: process.env.MAIL_REPLY_TO }
            : {}),
        }),
        signal: controller.signal,
      });
      if (!res.ok) {
        console.error(
          `[newsletter] resend ${res.status}: ${(await res.text()).slice(0, 300)}`,
        );
        return false;
      }
      return true;
    } finally {
      clearTimeout(timer);
    }
  } catch (e) {
    console.error(
      `[newsletter] ${(e as Error)?.message ?? "confirmation send failed"}`,
    );
    return false;
  }
}

/**
 * Adds the address to the Resend audience. Resend treats a repeat contact as an
 * update rather than an error, so clicking the same link twice is harmless.
 */
export async function addToAudience(
  email: string,
): Promise<{ ok: boolean; reason?: string }> {
  const key = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!key || !audienceId) return { ok: false, reason: "not configured" };

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    try {
      const res = await fetch(
        `https://api.resend.com/audiences/${audienceId}/contacts`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, unsubscribed: false }),
          signal: controller.signal,
        },
      );
      if (!res.ok) {
        const body = (await res.text()).slice(0, 300);
        console.error(`[newsletter] audience ${res.status}: ${body}`);
        return { ok: false, reason: `resend ${res.status}` };
      }
      return { ok: true };
    } finally {
      clearTimeout(timer);
    }
  } catch (e) {
    const reason = (e as Error)?.message ?? "add failed";
    console.error(`[newsletter] ${reason}`);
    return { ok: false, reason };
  }
}

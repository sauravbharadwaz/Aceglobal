import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { addToAudience, verifySubscribeToken } from "@/lib/newsletter";

/**
 * The second half of double opt-in: the link in the confirmation email lands
 * here, and this is the only thing that puts an address into the Resend
 * audience.
 *
 * A route handler rather than a page because confirming is a side effect. A
 * page would run it during render, and a render is something the framework may
 * repeat; a handler runs once per request and then hands the visitor to a page
 * that only has to say what happened.
 *
 * GET route handlers are not cached by default in this version, which is what
 * this needs: a cached response would confirm the first subscriber and then
 * show that same answer to everyone after them.
 */
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token") ?? "";
  const secret = process.env.NEWSLETTER_SECRET;

  if (!secret) {
    console.error("[newsletter] NEWSLETTER_SECRET missing, cannot confirm");
    redirect("/newsletter/confirmed?state=error");
  }

  const result = verifySubscribeToken(token, secret);
  if (!result.ok) {
    redirect(
      `/newsletter/confirmed?state=${result.reason === "expired" ? "expired" : "invalid"}`,
    );
  }

  const added = await addToAudience(result.email);
  redirect(`/newsletter/confirmed?state=${added.ok ? "ok" : "error"}`);
}

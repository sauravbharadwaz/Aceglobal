"use server";

import { createClient } from "@supabase/supabase-js";

export type LeadResult = { ok: boolean; error?: string };

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/**
 * Captures a website lead (footer newsletter / contact box) into the Ace Global
 * admin `leads` table via Supabase. Inserts run as the anonymous role, which is
 * allowed insert-only by the RLS policy in the admin's schema.sql.
 */
export async function submitLead(
  _prev: LeadResult,
  formData: FormData,
): Promise<LeadResult> {
  // Honeypot — bots fill hidden fields; humans never see this one.
  if (String(formData.get("company_website") ?? "").trim()) {
    return { ok: true };
  }

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  /* The newsletter form asks for an email and nothing else, so there is no name
     to store. Falling back to the email put the address in both columns, which
     left the admin's Leads list showing a column of addresses under "Name" with
     no way to tell a subscriber from someone who filled in the contact box.
     The fallback is per service rather than blanket: a form that does collect a
     name still uses it, and anything that is not the newsletter keeps the old
     behaviour rather than being mislabelled as a subscriber. */
  const service = String(formData.get("service") ?? "newsletter") || "newsletter";
  const name =
    String(formData.get("name") ?? "").trim() ||
    (service === "newsletter" ? "Newsletter subscriber" : email);

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return { ok: false, error: "Sign-ups are temporarily unavailable." };
  }

  const supabase = createClient(url, key);
  const { error } = await supabase.from("leads").insert({
    name,
    email,
    source: "website",
    service,
    status: "new",
  });

  if (error) {
    return { ok: false, error: "Something went wrong. Please try again." };
  }

  return { ok: true };
}

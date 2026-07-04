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

  const name = String(formData.get("name") ?? "").trim() || email;

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
    service: String(formData.get("service") ?? "newsletter") || "newsletter",
    status: "new",
  });

  if (error) {
    return { ok: false, error: "Something went wrong. Please try again." };
  }

  return { ok: true };
}

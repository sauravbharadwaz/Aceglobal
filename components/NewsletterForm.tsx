"use client";

import { useActionState } from "react";
import { submitLead, type LeadResult } from "@/app/actions";

const initialState: LeadResult = { ok: false };

export default function NewsletterForm() {
  const [state, formAction, pending] = useActionState(submitLead, initialState);

  if (state.ok) {
    return (
      <div className="max-w-md rounded-xl bg-white/10 px-5 py-4 text-sm text-white">
        Thanks — you&apos;re on the list. Our team will be in touch soon.
      </div>
    );
  }

  return (
    <form action={formAction} className="max-w-md">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Honeypot: hidden from real users, catches bots */}
        <input
          type="text"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Enter your email"
          aria-label="Email address"
          className="flex-1 bg-white rounded-xl px-4 py-3.5 text-sm text-[#00174c] placeholder:text-[#727687] focus:outline-none focus:ring-2 focus:ring-[#0053ce]/40"
        />
        <button
          type="submit"
          disabled={pending}
          className="bg-[#0053ce] text-white px-7 py-3.5 rounded-xl text-sm font-medium hover:bg-[#196bfa] transition-colors disabled:opacity-60"
        >
          {pending ? "Submitting…" : "Subscribe"}
        </button>
      </div>
      {state.error && (
        <p className="mt-2 text-sm text-red-300" role="alert">
          {state.error}
        </p>
      )}
    </form>
  );
}

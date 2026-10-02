"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded border border-[#E7E5E4] bg-white p-5 text-sm text-[#1C1917]">
        Thanks. Your message is with us and we&rsquo;ll reply to the email you gave within 2 business days.
      </div>
    );
  }

  const field =
    "w-full rounded border border-[#E7E5E4] bg-white px-3 py-2 text-sm text-[#1C1917] outline-none focus:border-[#1D4ED8]";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-xs font-medium text-[#78716C] mb-1">Name</label>
        <input id="name" name="name" required maxLength={100} className={field} />
      </div>
      <div>
        <label htmlFor="email" className="block text-xs font-medium text-[#78716C] mb-1">Email</label>
        <input id="email" name="email" type="email" required maxLength={200} className={field} />
      </div>
      <div>
        <label htmlFor="message" className="block text-xs font-medium text-[#78716C] mb-1">How can we help?</label>
        <textarea id="message" name="message" required minLength={10} maxLength={4000} rows={6} className={field} />
      </div>
      {/* Honeypot: hidden from people, filled by bots */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      {status === "error" && (
        <p className="text-sm text-[#B91C1C]">Something went wrong. Please try again in a moment.</p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center h-10 px-5 text-sm font-medium rounded bg-[#1D4ED8] text-white hover:bg-[#1e40af] transition-colors disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

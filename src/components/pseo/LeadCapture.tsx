"use client";

import { useState } from "react";
import { createUser, storeUserId } from "@/lib/api/client";

interface LeadCaptureProps {
  resourceName: string;
  ctaNote: string;
  variant?: "inline" | "banner";
}

export function LeadCapture({ resourceName, ctaNote, variant = "inline" }: LeadCaptureProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");
    try {
      const user = await createUser({ email, learningStatus: "lead" });
      storeUserId(user._id);
      setSubmitted(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      if (msg.toLowerCase().includes("duplicate") || msg.includes("11000")) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div
        className={
          variant === "banner"
            ? "bg-[#F0FDF4] border border-[#BBF7D0] rounded-lg p-5"
            : "bg-[#F0FDF4] border border-[#BBF7D0] rounded-lg p-5"
        }
      >
        <p className="text-sm font-semibold text-[#15803D] mb-1">On its way.</p>
        <p className="text-sm text-[#166534]">
          Check your inbox for {resourceName}. While you have it open —
        </p>
        <a
          href="/quiz"
          className="mt-3 inline-flex items-center text-sm font-medium text-[#1D4ED8] hover:text-[#1e40af] transition-colors"
        >
          See which Torvi track fits your role →
        </a>
      </div>
    );
  }

  return (
    <div
      className={
        variant === "banner"
          ? "bg-[#1C1917] rounded-lg p-6"
          : "bg-white border border-[#E7E5E4] rounded-lg p-6"
      }
    >
      <p
        className={`text-[11px] font-semibold uppercase tracking-[0.1em] mb-3 ${
          variant === "banner" ? "text-[#A8A29E]" : "text-[#78716C]"
        }`}
      >
        FREE DOWNLOAD
      </p>
      <p
        className={`font-semibold mb-1 ${
          variant === "banner" ? "text-white" : "text-[#1C1917]"
        }`}
      >
        Get {resourceName}
      </p>
      <p
        className={`text-sm mb-4 leading-[1.7] ${
          variant === "banner" ? "text-[#A8A29E]" : "text-[#78716C]"
        }`}
      >
        {ctaNote}
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Work email"
          required
          className={`flex-1 h-10 px-3 text-sm rounded border outline-none focus:ring-2 focus:ring-[#1D4ED8]/20 ${
            variant === "banner"
              ? "bg-[#292524] border-[#44403C] text-white placeholder-[#78716C]"
              : "bg-white border-[#E7E5E4] text-[#1C1917] placeholder-[#A8A29E]"
          }`}
        />
        <button
          type="submit"
          disabled={loading}
          className="h-10 px-5 text-sm font-medium rounded bg-[#1D4ED8] text-white hover:bg-[#1e40af] transition-colors disabled:opacity-60 whitespace-nowrap"
        >
          {loading ? "Sending…" : "Send it to me"}
        </button>
      </form>
      {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
    </div>
  );
}

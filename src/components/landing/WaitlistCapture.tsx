"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function WaitlistCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <section className="py-16 border-t border-[#E7E5E4] bg-white">
      <div className="max-w-page mx-auto px-6 sm:px-10">
        <div className="grid sm:grid-cols-2 gap-px bg-[#E7E5E4] border border-[#E7E5E4] rounded-lg overflow-hidden">

          {/* Left: free kit via quiz */}
          <div className="bg-white px-8 py-8">
            <p className="text-[11px] font-semibold text-[#78716C] uppercase tracking-[0.1em] mb-3">FREE · NO CARD</p>
            <p className="text-base font-semibold text-[#1C1917] mb-1">Get your role starter kit</p>
            <p className="text-sm text-[#78716C] mb-5 leading-relaxed">
              Prompt pack, tool brief template, and first-week worksheet. Takes 90 seconds. Delivered by email.
            </p>
            <Link
              href="/quiz"
              className="inline-flex items-center gap-1.5 h-10 px-5 text-sm font-medium rounded border border-[#1C1917]/20 text-[#1C1917] hover:bg-[#F7F6F3] transition-colors min-h-[44px] tracking-[-0.01em]"
            >
              Take the 90-second quiz
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* Right: notify for next cohort */}
          <div className="bg-[#F7F6F3] px-8 py-8">
            <p className="text-[11px] font-semibold text-[#78716C] uppercase tracking-[0.1em] mb-3">NEXT COHORT NOTIFICATION</p>
            <p className="text-base font-semibold text-[#1C1917] mb-1">Not ready yet?</p>
            <p className="text-sm text-[#78716C] mb-5 leading-relaxed">
              One email when seats open for the next cohort. No sequences, no nurture.
            </p>
            {submitted ? (
              <p className="text-sm font-medium text-[#1C1917]">You are on the list.</p>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-10 px-4 rounded border border-[#E7E5E4] bg-white text-sm text-[#1C1917] placeholder:text-[#78716C] focus:outline-none focus:border-[#1D4ED8] transition-colors"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center h-10 px-4 rounded bg-[#1D4ED8] text-white text-sm font-medium hover:bg-[#1e40af] disabled:opacity-60 transition-colors min-h-[44px]"
                >
                  {loading ? (
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                  ) : (
                    <ArrowRight size={15} />
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

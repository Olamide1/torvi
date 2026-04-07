"use client";

import { useState } from "react";
import { useQuiz } from "@/context/QuizContext";
import { ROLE_OPTIONS } from "@/lib/types/quiz";
import { storeUserId } from "@/lib/api/client";
import { trackConversion } from "@/lib/analytics";
import { ArrowRight } from "lucide-react";

export function StepEmailCapture() {
  const { state, goToStep } = useQuiz();
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const role = ROLE_OPTIONS.find((r) => r.id === state.role);

  function advance() {
    goToStep("goal");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          learningStatus: "lead",
          roleLabel: role?.label ?? "Torvi",
          quizRole: state.role,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed");
      }
      const { user } = await res.json();
      storeUserId(user._id);
      trackConversion("lead", { role: state.role ?? undefined });
      setSent(true);
      // Advance automatically after a short confirmation pause
      setTimeout(advance, 1200);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      if (msg.includes("11000") || msg.toLowerCase().includes("duplicate")) {
        // Existing lead — still advance
        setSent(true);
        setTimeout(advance, 1200);
      } else {
        setError("Something went wrong. Try again or skip.");
      }
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <p className="text-[11px] font-semibold text-[#78716C] uppercase tracking-[0.1em] mb-3">
          FREE · NO CARD REQUIRED
        </p>
        <h1 className="text-[1.75rem] font-semibold text-[#1C1917] tracking-[-0.03em] leading-[1.15] mb-2">
          Your {role?.label ?? "role"} kit is ready.
        </h1>
        <p className="text-sm text-[#78716C] leading-[1.75]">
          Enter your email and we&apos;ll send it while you finish the quiz — prompt pack, tool brief template, and a Week 1 worksheet matched to your role.
        </p>
      </div>

      {sent ? (
        <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-lg p-5">
          <p className="text-sm font-semibold text-[#15803D]">Kit sent. Continuing…</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            required
            placeholder="Work email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(null); }}
            className="flex-1 h-11 px-4 rounded border border-[#E7E5E4] bg-[#F7F6F3] text-sm text-[#1C1917] placeholder:text-[#78716C] focus:outline-none focus:border-[#1D4ED8] transition-colors"
          />
          <button
            type="submit"
            disabled={sending}
            className="flex items-center justify-center h-11 px-4 rounded bg-[#1C1917] text-white text-sm font-medium hover:bg-black disabled:opacity-60 transition-colors min-h-[44px]"
          >
            {sending ? (
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

      {error && <p className="text-xs text-red-600">{error}</p>}

      {!sent && (
        <button
          onClick={advance}
          className="text-xs text-[#78716C] hover:text-[#1C1917] transition-colors"
        >
          Skip — I&apos;ll get it later →
        </button>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { useQuiz } from "@/context/QuizContext";
import { ROLE_OPTIONS, GOAL_OPTIONS, TIME_OPTIONS, FORMAT_OPTIONS } from "@/lib/types/quiz";
import { storeUserId } from "@/lib/api/client";
import { trackEvent } from "@/lib/analytics";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ROLE_PATH_COPY: Record<string, { headline: string; sub: string }> = {
  product_manager: {
    headline: "PM track — Internal workflow tool",
    sub: "You will build a tool your team actually uses before the run ends. Templates and examples are built around how PMs work.",
  },
  ops_leader: {
    headline: "Ops track — Admin automation",
    sub: "You will ship a working automation that removes a repeat task from your week. The path is built for ops problems.",
  },
  consultant: {
    headline: "Consulting track — Client-facing tool",
    sub: "You will ship a tool you can use on client engagements. The path covers prototype-to-handoff, not general coding skills.",
  },
  founder: {
    headline: "Founder track — Internal build",
    sub: "You will go from idea to live internal tool without touching a dev backlog. Built for founders who move fast.",
  },
  team_lead: {
    headline: "Team lead track — Team tool",
    sub: "You will build a tool your team uses. The path covers scoping, building, and handing off without technical support.",
  },
};

export function QuizResult() {
  const { state } = useQuiz();
  const [email, setEmail] = useState("");
  const [kitSent, setKitSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollError, setEnrollError] = useState<string | null>(null);

  const role = ROLE_OPTIONS.find((r) => r.id === state.role);
  const goal = GOAL_OPTIONS.find((g) => g.id === state.goal);
  const time = TIME_OPTIONS.find((t) => t.id === state.timeCommitment);
  const format = FORMAT_OPTIONS.find((f) => f.id === state.format);
  const pathCopy = ROLE_PATH_COPY[state.role ?? "product_manager"] ?? ROLE_PATH_COPY.product_manager;

  const handleKitSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    trackEvent("kit_email_submitted", { role: state.role ?? undefined, goal: state.goal ?? undefined });
    setSending(true);
    setError(null);
    try {
      // Create a lead record in the DB with quiz answers attached
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          learningStatus: "lead",
          roleLabel: role?.label ?? "your role",
          quizRole: state.role,
          quizGoal: state.goal,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to create user");
      }
      const { user } = await res.json();
      storeUserId(user._id);
      trackEvent("kit_sent", { role: state.role ?? undefined, goal: state.goal ?? undefined });
      setKitSent(true);
    } catch (err) {
      // If user already exists (duplicate email), still mark as sent
      const msg = err instanceof Error ? err.message : "";
      if (msg.toLowerCase().includes("duplicate") || msg.toLowerCase().includes("11000")) {
        setKitSent(true);
      } else {
        setError("Something went wrong. Try again.");
      }
    } finally {
      setSending(false);
    }
  };

  const handleEnrol = async () => {
    const enrolEmail = email || "";
    if (!enrolEmail) {
      setEnrollError("Enter your email above first, then click Enrol.");
      return;
    }
    trackEvent("enrol_clicked", { role: state.role ?? undefined });
    setEnrolling(true);
    setEnrollError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: enrolEmail, role: state.role }),
      });
      const data = await res.json();
      if (!res.ok) {
        setEnrollError(data.error ?? "Something went wrong.");
        return;
      }
      trackEvent("checkout_initiated", { role: state.role ?? undefined });
      window.location.href = data.url;
    } catch {
      setEnrollError("Something went wrong. Try again.");
    } finally {
      setEnrolling(false);
    }
  };

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Path result */}
      <div>
        <p className="text-[11px] font-semibold text-[#78716C] uppercase tracking-[0.1em] mb-4">Your path</p>
        <h1 className="text-[2rem] font-semibold text-[#1C1917] tracking-[-0.03em] leading-[1.15]">{pathCopy.headline}</h1>
        <p className="text-[#78716C] mt-2 text-sm leading-[1.75] max-w-lg">{pathCopy.sub}</p>
      </div>

      {/* Selection summary */}
      <div className="border border-[#E7E5E4] rounded divide-y divide-[#E7E5E4] bg-white">
        {[
          { label: "Your role", value: role?.label },
          { label: "What you will build", value: goal?.label },
          { label: "Weekly time", value: time?.label },
          { label: "Format", value: format?.label },
        ].map((row) => (
          <div key={row.label} className="flex items-center justify-between px-5 py-3.5">
            <span className="text-xs text-[#78716C]">{row.label}</span>
            <span className="text-sm font-medium text-[#1C1917]">{row.value ?? "—"}</span>
          </div>
        ))}
      </div>

      {/* Lead magnet: free role kit */}
      <div className="border border-[#E7E5E4] rounded bg-white p-6">
        <p className="text-[11px] font-semibold text-[#78716C] uppercase tracking-[0.1em] mb-3">FREE · NO CARD REQUIRED</p>
        <p className="text-sm font-semibold text-[#1C1917] mb-1">
          Get your free {role?.label ?? "role"} starter kit
        </p>
        <p className="text-xs text-[#78716C] mb-4 leading-relaxed">
          Prompt pack, tool brief template, and first-week worksheet — matched to your role and build goal.
        </p>
        {kitSent ? (
          <p className="text-sm font-medium text-[#1C1917]">Check your inbox. Kit is on its way.</p>
        ) : (
          <form onSubmit={handleKitSubmit} className="flex gap-2">
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(null); }}
              className="flex-1 h-10 px-4 rounded border border-[#E7E5E4] bg-[#F7F6F3] text-sm text-[#1C1917] placeholder:text-[#78716C] focus:outline-none focus:border-[#1D4ED8] transition-colors"
            />
            <button
              type="submit"
              disabled={sending}
              className="flex items-center justify-center h-10 px-4 rounded bg-[#1C1917] text-white text-sm font-medium hover:bg-black disabled:opacity-60 transition-colors min-h-[44px]"
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
        {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
      </div>

      {/* Enrol CTA */}
      <div className="border border-[#1D4ED8] rounded bg-[#EFF6FF] p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="text-[11px] font-semibold text-[#1D4ED8] uppercase tracking-[0.1em] mb-1">OPEN ENROLMENT · FOUNDING RATE</p>
            <p className="text-sm font-semibold text-[#1C1917]">Guided run · start immediately</p>
            <p className="text-xs text-[#78716C] mt-0.5">Weekly cadence · office hours · guided path</p>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-[1.5rem] font-semibold text-[#1C1917] tracking-[-0.03em] leading-none">€200</div>
            <div className="text-xs text-[#78716C] mt-0.5">+ VAT · one-time</div>
          </div>
        </div>
        <button
          onClick={handleEnrol}
          disabled={enrolling}
          className="flex w-full items-center justify-center h-11 px-6 text-sm font-medium rounded bg-[#1D4ED8] text-white hover:bg-[#1e40af] disabled:opacity-60 transition-colors tracking-[-0.01em] min-h-[44px]"
        >
          {enrolling ? "Redirecting to checkout…" : "Enrol now — start immediately"}
        </button>
        {enrollError && <p className="text-xs text-red-600 mt-2 text-center">{enrollError}</p>}
        <p className="text-xs text-[#78716C] mt-2 text-center">
          <Link href="/refund" className="underline underline-offset-2 hover:text-[#1C1917] transition-colors">
            7-day refund policy
          </Link>{" "}· VAT invoices available
        </p>
      </div>
    </div>
  );
}

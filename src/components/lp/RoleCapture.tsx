"use client";

import { useState } from "react";
import { createUser, storeUserId } from "@/lib/api/client";
import { trackConversion } from "@/lib/analytics";

interface Props {
  roleLabel: string;
  quizRole: string;
}

export function RoleCapture({ roleLabel, quizRole }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const user = await createUser({
        email,
        learningStatus: "lead",
        roleLabel,
        quizRole,
      });
      storeUserId(user._id);
      trackConversion("lead", { role: quizRole });
      trackConversion("complete_registration", { role: quizRole });
      setStatus("done");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      // Duplicate email — treat as success, they'll get the email
      if (msg.includes("11000") || msg.toLowerCase().includes("duplicate")) {
        setStatus("done");
      } else {
        setStatus("error");
      }
    }
  }

  if (status === "done") {
    return (
      <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-lg p-6">
        <p className="font-semibold text-[#15803D] mb-1">Kit sent.</p>
        <p className="text-sm text-[#166534] leading-[1.7]">
          Check your inbox for your {roleLabel} prompt pack, tool brief template, and Week 1 worksheet.
        </p>
        <a
          href={`/quiz?intent=enrol&role=${quizRole}`}
          className="mt-4 inline-flex items-center text-sm font-medium text-[#1D4ED8] hover:text-[#1e40af] transition-colors"
        >
          Ready to enrol? Start the cohort →
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#E7E5E4] rounded-lg p-6 sm:p-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#78716C] mb-3">
        FREE · NO CARD REQUIRED
      </p>
      <p className="font-semibold text-[#1C1917] text-lg mb-1">
        Get the free {roleLabel} starter kit
      </p>
      <p className="text-sm text-[#78716C] leading-[1.7] mb-5">
        Role-specific prompt pack, tool brief template, and a Week 1 worksheet. Sent to your inbox immediately.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Work email"
          required
          className="flex-1 h-11 px-3 text-sm rounded border border-[#E7E5E4] bg-white text-[#1C1917] placeholder-[#A8A29E] outline-none focus:ring-2 focus:ring-[#1D4ED8]/20 focus:border-[#1D4ED8]"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="h-11 px-5 text-sm font-medium rounded bg-[#1D4ED8] text-white hover:bg-[#1e40af] transition-colors disabled:opacity-60 whitespace-nowrap"
        >
          {status === "loading" ? "Sending…" : "Send it to me"}
        </button>
      </form>
      {status === "error" && (
        <p className="text-xs text-red-600 mt-2">Something went wrong. Try again.</p>
      )}
    </div>
  );
}

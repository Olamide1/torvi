"use client";

import { useState } from "react";
import { StatusBadge } from "@/components/ui/Badge";
import type { Learner } from "@/lib/types/cohort";
import { AlertTriangle, Mail } from "lucide-react";

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  return `${days}d ago`;
}

const ROLE_LABELS: Record<string, string> = {
  product_manager: "PM",
  ops_leader: "Ops",
  consultant: "Consultant",
  founder: "Founder",
  team_lead: "Team Lead",
  exec: "Exec",
};

export function StalledLearnersTable({ learners }: { learners: Learner[] }) {
  const stalled = learners.filter((l) => l.learningStatus === "stalled" || l.learningStatus === "payment_issue");
  const [sortBy, setSortBy] = useState<"name" | "lastActive">("lastActive");

  const sorted = [...stalled].sort((a, b) => {
    if (sortBy === "name") return a.fullName.localeCompare(b.fullName);
    return new Date(a.lastActiveAt).getTime() - new Date(b.lastActiveAt).getTime();
  });

  if (sorted.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-[#DDE1E7] p-8 text-center">
        <div className="w-10 h-10 rounded-full bg-[#E2F6EA] flex items-center justify-center mx-auto mb-3">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8l3 3 7-7" stroke="#157347" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="text-sm font-medium text-[#16181D]">No stalled learners</div>
        <div className="text-xs text-[#7B8391] mt-1">Everyone is on track.</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-[#DDE1E7] overflow-hidden">
      <div className="px-5 py-4 border-b border-[#EEF1F4] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle size={15} className="text-[#A15C00]" />
          <span className="text-sm font-semibold text-[#16181D]">Needs attention</span>
          <span className="text-xs font-medium text-[#A15C00] bg-[#FFF1D6] px-2 py-0.5 rounded-full">{sorted.length}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#7B8391]">
          Sort by:
          {["lastActive", "name"].map((s) => (
            <button
              key={s}
              onClick={() => setSortBy(s as "name" | "lastActive")}
              className={`px-2 py-1 rounded transition-colors ${sortBy === s ? "text-[#2F5BFF] font-medium" : "hover:text-[#16181D]"}`}
            >
              {s === "lastActive" ? "Last active" : "Name"}
            </button>
          ))}
        </div>
      </div>

      <div className="divide-y divide-[#EEF1F4]">
        {sorted.map((learner) => (
          <div key={learner.id} className="flex items-center gap-4 px-5 py-4">
            <div className="w-8 h-8 rounded-full bg-[#EEF1F4] flex items-center justify-center text-sm font-medium text-[#4A4F59] flex-shrink-0">
              {learner.fullName.charAt(0)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-[#16181D]">{learner.fullName}</div>
              <div className="text-xs text-[#7B8391] flex items-center gap-2 mt-0.5">
                <span>{ROLE_LABELS[learner.roleTrack]}</span>
                <span>·</span>
                <span>Last active {timeAgo(learner.lastActiveAt)}</span>
                {!learner.onboardingCompletedAt && (
                  <span className="text-[#B42318] font-medium">· Onboarding incomplete</span>
                )}
              </div>
            </div>

            <StatusBadge status={learner.learningStatus} />

            <button
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-[#DDE1E7] text-[#4A4F59] hover:bg-[#F7F8FA] hover:border-[#C8CDD5] transition-all min-h-[36px]"
              aria-label={`Send reminder to ${learner.fullName}`}
            >
              <Mail size={12} />
              Remind
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

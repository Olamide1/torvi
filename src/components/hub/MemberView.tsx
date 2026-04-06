"use client";

import { ExternalLink, BookOpen, CalendarDays, Users } from "lucide-react";
import type { Resource } from "@/lib/types/curriculum";

interface MemberViewProps {
  name: string;
  resources: Resource[];
}

export function MemberView({ name, resources }: MemberViewProps) {
  const firstName = name?.split(" ")[0] ?? "there";

  const templates = resources.filter((r) => r.type === "template");
  const worksheets = resources.filter((r) => r.type === "worksheet");

  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-10 py-12 space-y-8">

      {/* Header */}
      <div>
        <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.06em] bg-[#F0FDF4] text-[#15803D] px-2 py-0.5 rounded-sm mb-4">
          Member
        </span>
        <h1 className="text-[2.25rem] font-semibold text-[#1C1917] tracking-[-0.03em] leading-[1.15] mb-3">
          Welcome back, {firstName}.
        </h1>
        <p className="text-[#78716C] leading-[1.75]">
          You completed the cohort. Your membership keeps you building — use the resources below, join office hours, and enrol in future runs.
        </p>
      </div>

      {/* Three benefit cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-[#E7E5E4] p-5">
          <BookOpen size={18} className="text-[#1D4ED8] mb-3" />
          <p className="text-sm font-semibold text-[#1C1917] mb-1">Template library</p>
          <p className="text-xs text-[#78716C] leading-[1.6]">
            {resources.length > 0
              ? `${resources.length} resource${resources.length !== 1 ? "s" : ""} available across all tracks.`
              : "All prompt packs, templates and worksheets from the cohort."}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-[#E7E5E4] p-5">
          <CalendarDays size={18} className="text-[#1D4ED8] mb-3" />
          <p className="text-sm font-semibold text-[#1C1917] mb-1">Monthly office hours</p>
          <p className="text-xs text-[#78716C] leading-[1.6]">
            Bring your next build. No prep required.
          </p>
          <a
            href="https://cal.com/torvi/office-hours"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-[#1D4ED8] hover:text-[#1e40af] transition-colors mt-2"
          >
            Book a slot <ExternalLink size={11} />
          </a>
        </div>
        <div className="bg-white rounded-lg border border-[#E7E5E4] p-5">
          <Users size={18} className="text-[#1D4ED8] mb-3" />
          <p className="text-sm font-semibold text-[#1C1917] mb-1">Community</p>
          <p className="text-xs text-[#78716C] leading-[1.6]">
            Alumni Slack — swap tool ideas and unblock each other.
          </p>
          <a
            href="https://join.slack.com/t/torvilearning-9lm2359/shared_invite/zt-3um21hbfl-kgECyHcpdKR1DYl6_mJf2Q"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-[#1D4ED8] hover:text-[#1e40af] transition-colors mt-2"
          >
            Open Slack <ExternalLink size={11} />
          </a>
        </div>
      </div>

      {/* Resource library */}
      {resources.length > 0 && (
        <div className="bg-white rounded-lg border border-[#E7E5E4] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#E7E5E4]">
            <p className="text-sm font-semibold text-[#1C1917]">Your resources</p>
            <p className="text-xs text-[#78716C] mt-0.5">All prompt packs, templates and worksheets — yours to keep.</p>
          </div>

          {templates.length > 0 && (
            <div>
              <p className="text-[10px] font-semibold text-[#78716C] uppercase tracking-[0.1em] px-6 py-3 bg-[#FAFAF9] border-b border-[#E7E5E4]">
                Templates &amp; Prompt Packs
              </p>
              <div className="divide-y divide-[#E7E5E4]">
                {templates.map((r) => (
                  <a
                    key={r.id}
                    href={r.url}
                    className="flex items-center justify-between px-6 py-3.5 hover:bg-[#FAFAF9] transition-colors group"
                  >
                    <span className="text-sm text-[#1C1917] group-hover:text-[#1D4ED8] transition-colors">{r.title}</span>
                    <ExternalLink size={13} className="text-[#D6D3D1] group-hover:text-[#1D4ED8] transition-colors flex-shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {worksheets.length > 0 && (
            <div>
              <p className="text-[10px] font-semibold text-[#78716C] uppercase tracking-[0.1em] px-6 py-3 bg-[#FAFAF9] border-b border-[#E7E5E4]">
                Worksheets
              </p>
              <div className="divide-y divide-[#E7E5E4]">
                {worksheets.map((r) => (
                  <a
                    key={r.id}
                    href={r.url}
                    className="flex items-center justify-between px-6 py-3.5 hover:bg-[#FAFAF9] transition-colors group"
                  >
                    <span className="text-sm text-[#1C1917] group-hover:text-[#1D4ED8] transition-colors">{r.title}</span>
                    <ExternalLink size={13} className="text-[#D6D3D1] group-hover:text-[#1D4ED8] transition-colors flex-shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Future runs note */}
      <div className="bg-[#F7F6F5] rounded-lg border border-[#E7E5E4] p-6">
        <p className="text-sm font-semibold text-[#1C1917] mb-2">Join a future run</p>
        <p className="text-xs text-[#78716C] leading-[1.75]">
          When the next cohort opens, you get priority access. Watch for an email or reach out to get on the list.
        </p>
      </div>
    </div>
  );
}

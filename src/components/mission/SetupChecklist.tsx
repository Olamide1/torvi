"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const SLACK_URL = "https://join.slack.com/t/torvilearning-9lm2359/shared_invite/zt-3um21hbfl-kgECyHcpdKR1DYl6_mJf2Q";

const CHECKLIST_ITEMS = [
  { id: "profile", label: "Complete your learner profile", link: "#", required: true },
  { id: "slack", label: "Join the cohort Slack workspace", link: SLACK_URL, required: true },
  { id: "schedule", label: "Add live sessions to your calendar", link: "#", required: false },
  { id: "tools", label: "Set up your tools (Claude, Cursor)", link: "https://cursor.sh", required: false },
  { id: "intro", label: "Post an intro in #cohort-intros", link: SLACK_URL, required: false },
];

export function SetupChecklist() {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const completedCount = checked.size;
  const totalCount = CHECKLIST_ITEMS.length;

  return (
    <div className="bg-white rounded-xl border border-[#DDE1E7] overflow-hidden">
      <div className="px-5 py-4 border-b border-[#EEF1F4] flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-[#16181D]">Getting started checklist</div>
          <div className="text-xs text-[#7B8391] mt-0.5">{completedCount} of {totalCount} complete</div>
        </div>
        <div className="text-xs font-medium text-[#2F5BFF]">
          {Math.round((completedCount / totalCount) * 100)}%
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-[#EEF1F4]">
        <div
          className="h-full bg-[#2F5BFF] transition-all duration-500"
          style={{ width: `${(completedCount / totalCount) * 100}%` }}
        />
      </div>

      <ul className="divide-y divide-[#EEF1F4]">
        {CHECKLIST_ITEMS.map((item) => (
          <li key={item.id} className="flex items-center gap-4 px-5 py-3.5">
            <button
              onClick={() => toggle(item.id)}
              aria-label={checked.has(item.id) ? `Uncheck ${item.label}` : `Check ${item.label}`}
              className={cn(
                "flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all",
                checked.has(item.id)
                  ? "bg-[#157347] border-[#157347]"
                  : "border-[#C8CDD5] hover:border-[#2F5BFF]"
              )}
            >
              {checked.has(item.id) && (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
            <span className={cn("flex-1 text-sm", checked.has(item.id) ? "text-[#7B8391] line-through" : "text-[#16181D]")}>
              {item.label}
              {item.required && !checked.has(item.id) && (
                <span className="ml-1.5 text-xs text-[#B42318]">required</span>
              )}
            </span>
            {item.link && !checked.has(item.id) && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2F5BFF] hover:text-[#2347E0] transition-colors"
                aria-label={`Open ${item.label}`}
              >
                <ExternalLink size={14} />
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

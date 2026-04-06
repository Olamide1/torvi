"use client";

import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import type { Cohort } from "@/lib/types/cohort";
import { mockCohorts } from "@/lib/mock/cohorts";

interface CohortSwitcherProps {
  activeCohortId: string;
  onSelect: (cohortId: string) => void;
}

export function CohortSwitcher({ activeCohortId, onSelect }: CohortSwitcherProps) {
  const [open, setOpen] = useState(false);
  const active = mockCohorts.find((c) => c.id === activeCohortId) ?? mockCohorts[0];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#DDE1E7] bg-white hover:bg-[#F7F8FA] text-sm font-medium text-[#16181D] transition-colors"
      >
        <CohortDot status={active.status} />
        {active.name}
        <ChevronDown size={14} className={`text-[#7B8391] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-[#DDE1E7] rounded-xl shadow-[0_10px_15px_-3px_rgb(0,0,0,0.07)] z-30 py-1">
          {mockCohorts.map((cohort) => (
            <button
              key={cohort.id}
              onClick={() => { onSelect(cohort.id); setOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[#F7F8FA] transition-colors"
            >
              <CohortDot status={cohort.status} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-[#16181D] truncate">{cohort.name}</div>
                <div className="text-xs text-[#7B8391]">{cohort.seatsUsed} learners</div>
              </div>
              {cohort.id === activeCohortId && <Check size={14} className="text-[#2F5BFF] flex-shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function CohortDot({ status }: { status: Cohort["status"] }) {
  return (
    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
      status === "active" ? "bg-[#157347]" :
      status === "upcoming" ? "bg-[#2F5BFF]" :
      "bg-[#C8CDD5]"
    }`} />
  );
}

import type { Learner } from "@/lib/types/cohort";
import { ProgressBar } from "@/components/ui/Progress";

export function CompletionStats({ learners }: { learners: Learner[] }) {
  const total = learners.length;

  const weekStats = [1, 2, 3, 4].map((week) => {
    const completed = learners.filter((l) => {
      const wp = l.weekProgress.find((w) => w.week === week);
      return wp?.assignmentSubmitted && wp.quizPassed;
    }).length;
    return { week, completed, pct: Math.round((completed / total) * 100) };
  });

  const statusCounts = {
    active: learners.filter((l) => l.learningStatus.startsWith("active_")).length,
    stalled: learners.filter((l) => l.learningStatus === "stalled").length,
    payment: learners.filter((l) => l.learningStatus === "payment_issue").length,
    enrolled: learners.filter((l) => l.learningStatus === "enrolled" || l.learningStatus.startsWith("onboarding")).length,
  };

  return (
    <div className="bg-white rounded-xl border border-[#DDE1E7] overflow-hidden">
      <div className="px-5 py-4 border-b border-[#EEF1F4]">
        <div className="text-sm font-semibold text-[#16181D]">Weekly completion</div>
        <div className="text-xs text-[#7B8391] mt-0.5">{total} learners total</div>
      </div>

      <div className="divide-y divide-[#EEF1F4]">
        {weekStats.map(({ week, completed, pct }) => (
          <div key={week} className="px-5 py-4 flex items-center gap-4">
            <div className="w-12 text-xs font-medium text-[#4A4F59]">Week {week}</div>
            <div className="flex-1">
              <ProgressBar value={pct} color={pct === 100 ? "success" : pct > 50 ? "blue" : "blue"} size="sm" />
            </div>
            <div className="text-xs text-[#7B8391] w-16 text-right">{completed}/{total} done</div>
            <div className="text-xs font-semibold text-[#4A4F59] w-10 text-right">{pct}%</div>
          </div>
        ))}
      </div>

      {/* Status breakdown */}
      <div className="px-5 py-4 border-t border-[#EEF1F4] flex items-center gap-6 flex-wrap">
        <StatusPill label="Active" count={statusCounts.active} color="teal" />
        <StatusPill label="Stalled" count={statusCounts.stalled} color="warn" />
        <StatusPill label="Payment issue" count={statusCounts.payment} color="error" />
        <StatusPill label="Onboarding" count={statusCounts.enrolled} color="blue" />
      </div>
    </div>
  );
}

function StatusPill({ label, count, color }: { label: string; count: number; color: "teal" | "warn" | "error" | "blue" }) {
  const classes = {
    teal: "bg-[#D9F3EF] text-[#0F766E]",
    warn: "bg-[#FFF1D6] text-[#A15C00]",
    error: "bg-[#FEE4E2] text-[#B42318]",
    blue: "bg-[#E6EDFF] text-[#2F5BFF]",
  };
  return (
    <div className="flex items-center gap-2">
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${classes[color]}`}>
        {count}
      </span>
      <span className="text-xs text-[#7B8391]">{label}</span>
    </div>
  );
}

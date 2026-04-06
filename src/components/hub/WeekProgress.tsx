import type { Learner } from "@/lib/types/cohort";

export function WeekProgress({ learner }: { learner: Learner }) {
  const currentWeekNum = parseInt(learner.learningStatus.replace("active_week_", "")) || 1;
  const currentWeek = learner.weekProgress.find((w) => w.week === currentWeekNum);
  const deliverableSubmitted = currentWeek?.assignmentSubmitted ?? false;

  return (
    <div className="bg-white rounded-lg border border-[#E7E5E4] p-5">
      <p className="text-[11px] font-semibold text-[#78716C] uppercase tracking-[0.1em] mb-5">PROGRESS</p>

      {/* 4 week indicators */}
      <div className="flex items-center gap-2 mb-5">
        {learner.weekProgress.map((week, i) => {
          const complete = week.assignmentSubmitted;
          const isCurrent = week.week === currentWeekNum;
          const isFuture = week.week > currentWeekNum;

          return (
            <div key={week.week} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-all ${
                  complete
                    ? "bg-[#1D4ED8] border-[#1D4ED8] text-white"
                    : isCurrent
                    ? "bg-white border-[#1D4ED8] text-[#1D4ED8]"
                    : isFuture
                    ? "bg-white border-[#E7E5E4] text-[#D6D3D1]"
                    : "bg-white border-[#D6D3D1] text-[#78716C]"
                }`}
              >
                {complete ? (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : week.week}
              </div>
              {i < 3 && <div className="w-4 h-px bg-[#E7E5E4]" />}
            </div>
          );
        })}
      </div>

      <p className="text-sm font-semibold text-[#1C1917] mb-1">
        Week {currentWeekNum} of 4
      </p>
      <p className={`text-sm ${deliverableSubmitted ? "text-[#15803D]" : "text-[#78716C]"}`}>
        Deliverable {deliverableSubmitted ? "submitted" : "pending"}
      </p>
    </div>
  );
}

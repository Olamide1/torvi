import { Check, Circle } from "lucide-react";
import type { Learner } from "@/lib/types/cohort";
import type { WeekOutput } from "@/lib/types/curriculum";

interface OutputTrackerProps {
  learner: Learner;
  curriculum: WeekOutput[];
}

export function OutputTracker({ learner, curriculum }: OutputTrackerProps) {
  const currentWeekNum = parseInt(learner.learningStatus.replace("active_week_", "")) || 1;

  return (
    <div className="bg-white rounded-xl border border-[#DDE1E7] overflow-hidden">
      <div className="px-5 py-4 border-b border-[#EEF1F4]">
        <div className="text-sm font-semibold text-[#16181D]">Output tracker</div>
        <div className="text-xs text-[#7B8391] mt-0.5">What you are building, week by week</div>
      </div>

      <div className="divide-y divide-[#EEF1F4]">
        {curriculum.slice(1).map((week) => {
          const weekProgress = learner.weekProgress.find((w) => w.week === week.week);
          const isComplete = weekProgress?.assignmentSubmitted && weekProgress.quizPassed;
          const isCurrent = week.week === currentWeekNum;
          const isLocked = week.week > currentWeekNum;

          return (
            <div
              key={week.week}
              className={`flex items-center gap-4 px-5 py-4 ${isCurrent ? "bg-[#E6EDFF]/30" : ""}`}
            >
              <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                isComplete ? "bg-[#157347]" : isCurrent ? "bg-[#2F5BFF]" : "bg-[#EEF1F4]"
              }`}>
                {isComplete
                  ? <Check size={13} className="text-white" />
                  : <Circle size={13} className={isCurrent ? "text-white" : "text-[#7B8391]"} />
                }
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-[#16181D]">Week {week.week}</span>
                  <span className="text-sm text-[#4A4F59]">{week.outcome}</span>
                  {isCurrent && (
                    <span className="text-xs font-medium text-[#2F5BFF] bg-[#E6EDFF] px-2 py-0.5 rounded-full">
                      In progress
                    </span>
                  )}
                </div>
                <div className="text-xs text-[#7B8391] mt-0.5">{week.theme}</div>
              </div>

              <div className="flex-shrink-0">
                {isComplete ? (
                  <span className="text-xs font-medium text-[#157347] bg-[#E2F6EA] px-2.5 py-1 rounded-full">Done</span>
                ) : isCurrent ? (
                  <span className="text-xs text-[#2F5BFF]">
                    {weekProgress?.lessonsCompleted}/{weekProgress?.totalLessons ?? 4} lessons
                  </span>
                ) : (
                  <span className="text-xs text-[#C8CDD5]">{isLocked ? "Locked" : "Not started"}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

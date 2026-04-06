"use client";

import { useQuiz } from "@/context/QuizContext";
import { GOAL_OPTIONS } from "@/lib/types/quiz";
import { cn } from "@/lib/utils/cn";

export function StepBuildGoal() {
  const { state, setGoal } = useQuiz();

  return (
    <div className="space-y-7 animate-slide-up">
      <div>
        <h1 className="text-[2.25rem] font-semibold text-[#1C1917] tracking-[-0.03em] leading-[1.15]">What do you want to build?</h1>
        <p className="text-[#78716C] mt-2 text-sm leading-[1.75]">Choose the type of tool that would make the biggest difference to your work right now.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-2">
        {GOAL_OPTIONS.map((option) => (
          <button
            key={option.id}
            onClick={() => setGoal(option.id)}
            className={cn(
              "flex flex-col items-start px-5 py-4 rounded-lg border text-left transition-all min-h-[72px]",
              state.goal === option.id
                ? "border-[#1D4ED8] bg-[#EFF6FF]"
                : "border-[#E7E5E4] bg-white hover:border-[#D6D3D1] hover:bg-[#F5F4F2]"
            )}
          >
            <div className={cn("text-sm font-semibold", state.goal === option.id ? "text-[#1D4ED8]" : "text-[#1C1917]")}>
              {option.label}
            </div>
            <div className="text-xs text-[#78716C] mt-1 leading-relaxed">{option.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

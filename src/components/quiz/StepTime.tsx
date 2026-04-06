"use client";

import { useQuiz } from "@/context/QuizContext";
import { TIME_OPTIONS } from "@/lib/types/quiz";
import { cn } from "@/lib/utils/cn";

export function StepTime() {
  const { state, setTimeCommitment } = useQuiz();

  return (
    <div className="space-y-7 animate-slide-up">
      <div>
        <h1 className="text-[2.25rem] font-semibold text-[#1C1917] tracking-[-0.03em] leading-[1.15]">How much time can you commit each week?</h1>
        <p className="text-[#78716C] mt-2 text-sm leading-[1.75]">Be realistic. The path works within your actual schedule.</p>
      </div>

      <div className="space-y-2">
        {TIME_OPTIONS.map((option) => (
          <button
            key={option.id}
            onClick={() => setTimeCommitment(option.id)}
            className={cn(
              "w-full flex items-center justify-between px-5 py-4 rounded-lg border text-left transition-all min-h-[56px]",
              state.timeCommitment === option.id
                ? "border-[#1D4ED8] bg-[#EFF6FF]"
                : "border-[#E7E5E4] bg-white hover:border-[#D6D3D1] hover:bg-[#F5F4F2]"
            )}
          >
            <div>
              <div className={cn("text-sm font-semibold", state.timeCommitment === option.id ? "text-[#1D4ED8]" : "text-[#1C1917]")}>
                {option.label}
              </div>
              <div className="text-xs text-[#78716C] mt-0.5">{option.description}</div>
            </div>
            {state.timeCommitment === option.id && (
              <div className="w-5 h-5 rounded-sm bg-[#1D4ED8] flex items-center justify-center flex-shrink-0 ml-4">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

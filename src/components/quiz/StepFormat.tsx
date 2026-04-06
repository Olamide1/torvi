"use client";

import { useQuiz } from "@/context/QuizContext";
import { FORMAT_OPTIONS } from "@/lib/types/quiz";
import { cn } from "@/lib/utils/cn";

export function StepFormat() {
  const { state, setFormat } = useQuiz();

  return (
    <div className="space-y-7 animate-slide-up">
      <div>
        <h1 className="text-[2.25rem] font-semibold text-[#1C1917] tracking-[-0.03em] leading-[1.15]">Run only, or run plus membership?</h1>
        <p className="text-[#78716C] mt-2 text-sm leading-[1.75]">You can add membership after you finish. Both options include the full guided run experience.</p>
      </div>

      <div className="space-y-3">
        {FORMAT_OPTIONS.map((option) => (
          <button
            key={option.id}
            onClick={() => setFormat(option.id)}
            className={cn(
              "w-full flex items-start justify-between px-5 py-5 rounded-lg border text-left transition-all min-h-[72px]",
              state.format === option.id
                ? "border-[#1D4ED8] bg-[#EFF6FF]"
                : "border-[#E7E5E4] bg-white hover:border-[#D6D3D1] hover:bg-[#F5F4F2]"
            )}
          >
            <div className="flex-1">
              <div className={cn("text-sm font-semibold mb-1", state.format === option.id ? "text-[#1D4ED8]" : "text-[#1C1917]")}>
                {option.label}
              </div>
              <div className="text-xs text-[#78716C] leading-relaxed">{option.description}</div>
            </div>
            {state.format === option.id && (
              <div className="w-5 h-5 rounded-sm bg-[#1D4ED8] flex items-center justify-center flex-shrink-0 ml-4 mt-0.5">
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

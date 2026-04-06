"use client";

import { useQuiz } from "@/context/QuizContext";
import { StepRole } from "./StepRole";
import { StepBuildGoal } from "./StepBuildGoal";
import { StepTime } from "./StepTime";
import { StepFormat } from "./StepFormat";
import { QuizResult } from "./QuizResult";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const STEPS = ["Role", "Goal", "Time", "Format"];
const STEP_MAP = {
  role: 0,
  goal: 1,
  time: 2,
  format: 3,
  result: 4,
};

export function QuizShell() {
  const { state, goBack } = useQuiz();
  const stepIndex = STEP_MAP[state.currentStep];
  const isResult = state.currentStep === "result";

  return (
    <div className="min-h-screen bg-[#F7F6F3] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-[#E7E5E4] px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold text-[#1C1917]">
            Torvi
          </Link>

          {!isResult && (
            <div className="flex items-center gap-2">
              {STEPS.map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-sm text-[10px] flex items-center justify-center font-semibold transition-all ${
                      i < stepIndex
                        ? "bg-[#1D4ED8] text-white"
                        : i === stepIndex
                        ? "bg-[#1C1917] text-white"
                        : "bg-[#E7E5E4] text-[#78716C]"
                    }`}
                  >
                    {i < stepIndex ? (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      i + 1
                    )}
                  </div>
                  <span className={`text-xs hidden sm:block ${i === stepIndex ? "text-[#1C1917] font-semibold" : "text-[#78716C]"}`}>
                    {step}
                  </span>
                  {i < STEPS.length - 1 && <div className="w-4 h-px bg-[#E7E5E4] hidden sm:block" />}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-start py-12 px-6">
        <div className="w-full max-w-2xl">
          {!isResult && stepIndex > 0 && (
            <button
              onClick={goBack}
              className="mb-7 flex items-center gap-2 text-sm text-[#78716C] hover:text-[#1C1917] transition-colors"
            >
              <ArrowLeft size={15} />
              Back
            </button>
          )}

          {state.currentStep === "role" && <StepRole />}
          {state.currentStep === "goal" && <StepBuildGoal />}
          {state.currentStep === "time" && <StepTime />}
          {state.currentStep === "format" && <StepFormat />}
          {state.currentStep === "result" && <QuizResult />}
        </div>
      </div>
    </div>
  );
}

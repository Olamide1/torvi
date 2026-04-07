"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { QuizState, QuizStep } from "@/lib/types/quiz";
import { trackEvent } from "@/lib/analytics";

interface QuizContextType {
  state: QuizState;
  setRole: (role: string) => void;
  setGoal: (goal: string) => void;
  setTimeCommitment: (time: string) => void;
  setFormat: (format: string) => void;
  goToStep: (step: QuizStep) => void;
  goBack: () => void;
}

const QuizContext = createContext<QuizContextType | null>(null);

const STEP_ORDER: QuizStep[] = ["role", "email_capture", "goal", "time", "format", "result"];

export function QuizProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<QuizState>({
    currentStep: "role",
    role: null,
    goal: null,
    timeCommitment: null,
    format: null,
  });

  const advance = () => {
    setState((prev) => {
      const idx = STEP_ORDER.indexOf(prev.currentStep);
      const next = STEP_ORDER[idx + 1];
      return next ? { ...prev, currentStep: next } : prev;
    });
  };

  return (
    <QuizContext.Provider
      value={{
        state,
        setRole: (role) => { trackEvent("quiz_step_completed", { step: "role", value: role }); setState((prev) => ({ ...prev, role })); setTimeout(advance, 200); },
        setGoal: (goal) => { trackEvent("quiz_step_completed", { step: "goal", value: goal }); setState((prev) => ({ ...prev, goal })); setTimeout(advance, 200); },
        setTimeCommitment: (timeCommitment) => { trackEvent("quiz_step_completed", { step: "time", value: timeCommitment }); setState((prev) => ({ ...prev, timeCommitment })); setTimeout(advance, 200); },
        setFormat: (format) => { trackEvent("quiz_step_completed", { step: "format", value: format }); setState((prev) => ({ ...prev, format })); setTimeout(advance, 200); },
        goToStep: (step) => setState((prev) => ({ ...prev, currentStep: step })),
        goBack: () => {
          setState((prev) => {
            const idx = STEP_ORDER.indexOf(prev.currentStep);
            const prev2 = STEP_ORDER[idx - 1];
            return prev2 ? { ...prev, currentStep: prev2 } : prev;
          });
        },
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz must be used within QuizProvider");
  return ctx;
}

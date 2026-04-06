"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { QuizState, QuizStep } from "@/lib/types/quiz";

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

const STEP_ORDER: QuizStep[] = ["role", "goal", "time", "format", "result"];

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
        setRole: (role) => { setState((prev) => ({ ...prev, role })); setTimeout(advance, 200); },
        setGoal: (goal) => { setState((prev) => ({ ...prev, goal })); setTimeout(advance, 200); },
        setTimeCommitment: (timeCommitment) => { setState((prev) => ({ ...prev, timeCommitment })); setTimeout(advance, 200); },
        setFormat: (format) => { setState((prev) => ({ ...prev, format })); setTimeout(advance, 200); },
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

import { describe, it, expect } from "vitest";

// Test the pure step-order logic extracted from QuizContext
const STEP_ORDER = ["role", "goal", "time", "format", "result"] as const;
type QuizStep = typeof STEP_ORDER[number];

function advance(currentStep: QuizStep): QuizStep {
  const idx = STEP_ORDER.indexOf(currentStep);
  const next = STEP_ORDER[idx + 1];
  return next ?? currentStep;
}

function goBack(currentStep: QuizStep): QuizStep {
  const idx = STEP_ORDER.indexOf(currentStep);
  const prev = STEP_ORDER[idx - 1];
  return prev ?? currentStep;
}

describe("Quiz step progression", () => {
  it("advances through all steps in order", () => {
    expect(advance("role")).toBe("goal");
    expect(advance("goal")).toBe("time");
    expect(advance("time")).toBe("format");
    expect(advance("format")).toBe("result");
  });

  it("stays on result when already at the last step", () => {
    expect(advance("result")).toBe("result");
  });

  it("goes back through steps correctly", () => {
    expect(goBack("result")).toBe("format");
    expect(goBack("format")).toBe("time");
    expect(goBack("time")).toBe("goal");
    expect(goBack("goal")).toBe("role");
  });

  it("stays on role when already at the first step", () => {
    expect(goBack("role")).toBe("role");
  });

  it("starts at role step", () => {
    expect(STEP_ORDER[0]).toBe("role");
  });

  it("has exactly 5 steps", () => {
    expect(STEP_ORDER.length).toBe(5);
  });
});

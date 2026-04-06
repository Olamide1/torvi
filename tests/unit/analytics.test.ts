import { describe, it, expect, vi, beforeEach } from "vitest";

// trackEvent is a thin wrapper — we test it doesn't throw and calls gtag correctly
describe("trackEvent", () => {
  beforeEach(() => {
    // Reset global
    (global as Record<string, unknown>).window = undefined;
  });

  it("does nothing when called server-side (no window)", async () => {
    const { trackEvent } = await import("@/lib/analytics");
    expect(() => trackEvent("test_event", { foo: "bar" })).not.toThrow();
  });

  it("calls window.gtag when available", async () => {
    const mockGtag = vi.fn();
    (global as Record<string, unknown>).window = { gtag: mockGtag };
    Object.defineProperty(global, "window", {
      value: { gtag: mockGtag },
      writable: true,
      configurable: true,
    });

    const { trackEvent } = await import("@/lib/analytics");
    trackEvent("quiz_started");

    expect(mockGtag).toHaveBeenCalledWith("event", "quiz_started", undefined);
  });

  it("passes params to gtag", async () => {
    const mockGtag = vi.fn();
    Object.defineProperty(global, "window", {
      value: { gtag: mockGtag },
      writable: true,
      configurable: true,
    });

    const { trackEvent } = await import("@/lib/analytics");
    trackEvent("quiz_step_completed", { step: "role", value: "product_manager" });

    expect(mockGtag).toHaveBeenCalledWith("event", "quiz_step_completed", {
      step: "role",
      value: "product_manager",
    });
  });
});

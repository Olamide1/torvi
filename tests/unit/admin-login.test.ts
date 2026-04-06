import { describe, it, expect } from "vitest";

// Extracted validation logic from src/app/api/auth/admin-login/route.ts
function getAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase());
}

function isAdminEmail(email: string): boolean {
  return getAdminEmails().includes(email.toLowerCase());
}

function isCorrectPassword(password: string): boolean {
  return !!password && password === process.env.ADMIN_PASSWORD;
}

describe("Admin login validation", () => {
  it("accepts the configured admin email", () => {
    expect(isAdminEmail("admin@torvi.com")).toBe(true);
  });

  it("rejects unlisted emails", () => {
    expect(isAdminEmail("hacker@evil.com")).toBe(false);
    expect(isAdminEmail("user@torvi.com")).toBe(false);
  });

  it("is case-insensitive for email comparison", () => {
    expect(isAdminEmail("ADMIN@TORVI.COM")).toBe(true);
    expect(isAdminEmail("Admin@Torvi.Com")).toBe(true);
  });

  it("accepts the correct password", () => {
    expect(isCorrectPassword("test_admin_pass")).toBe(true);
  });

  it("rejects an incorrect password", () => {
    expect(isCorrectPassword("wrong_password")).toBe(false);
    expect(isCorrectPassword("")).toBe(false);
  });

  it("rejects undefined/null password", () => {
    expect(isCorrectPassword(undefined as unknown as string)).toBe(false);
    expect(isCorrectPassword(null as unknown as string)).toBe(false);
  });

  it("handles multiple admin emails in env var", () => {
    const original = process.env.ADMIN_EMAILS;
    process.env.ADMIN_EMAILS = "admin@torvi.com, other@torvi.com , third@torvi.com";
    expect(isAdminEmail("other@torvi.com")).toBe(true);
    expect(isAdminEmail("third@torvi.com")).toBe(true);
    expect(isAdminEmail("notlisted@torvi.com")).toBe(false);
    process.env.ADMIN_EMAILS = original;
  });
});

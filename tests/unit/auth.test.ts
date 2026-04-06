import { describe, it, expect, beforeEach } from "vitest";
import { createMagicToken, verifyMagicToken } from "@/lib/auth/magic";
import { SignJWT } from "jose";

const secret = new TextEncoder().encode(process.env.SESSION_SECRET!);

describe("Magic token", () => {
  it("creates a verifiable token with the correct email", async () => {
    const token = await createMagicToken("user@example.com");
    const { email } = await verifyMagicToken(token);
    expect(email).toBe("user@example.com");
  });

  it("rejects a token with the wrong purpose", async () => {
    const badToken = await new SignJWT({ email: "user@example.com", purpose: "session" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("15m")
      .sign(secret);

    await expect(verifyMagicToken(badToken)).rejects.toThrow("Invalid token purpose");
  });

  it("rejects an expired token", async () => {
    const expiredToken = await new SignJWT({ email: "user@example.com", purpose: "magic_link" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("-1s") // already expired
      .sign(secret);

    await expect(verifyMagicToken(expiredToken)).rejects.toThrow();
  });

  it("rejects a token signed with a different secret", async () => {
    const wrongSecret = new TextEncoder().encode("completely-different-secret-value!!");
    const wrongToken = await new SignJWT({ email: "user@example.com", purpose: "magic_link" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("15m")
      .sign(wrongSecret);

    await expect(verifyMagicToken(wrongToken)).rejects.toThrow();
  });

  it("rejects a malformed token", async () => {
    await expect(verifyMagicToken("not.a.real.jwt")).rejects.toThrow();
  });
});

describe("sanitiseNext (URL validation logic)", () => {
  // Extracted logic from src/app/api/auth/verify/route.ts
  function sanitiseNext(next: string | null): string {
    if (!next) return "/hub";
    if (!next.startsWith("/") || next.startsWith("//")) return "/hub";
    return next;
  }

  it("defaults to /hub when null", () => {
    expect(sanitiseNext(null)).toBe("/hub");
  });

  it("allows valid relative paths", () => {
    expect(sanitiseNext("/mission")).toBe("/mission");
    expect(sanitiseNext("/hub")).toBe("/hub");
    expect(sanitiseNext("/admin")).toBe("/admin");
  });

  it("blocks protocol-relative URLs", () => {
    expect(sanitiseNext("//evil.com")).toBe("/hub");
  });

  it("blocks absolute URLs", () => {
    expect(sanitiseNext("https://evil.com")).toBe("/hub");
    expect(sanitiseNext("http://evil.com")).toBe("/hub");
  });

  it("blocks empty string", () => {
    expect(sanitiseNext("")).toBe("/hub");
  });
});

describe("isAdminEmail logic", () => {
  // Extracted logic from src/app/api/auth/verify/route.ts
  function isAdminEmail(email: string): boolean {
    const adminEmails = (process.env.ADMIN_EMAILS ?? "")
      .split(",")
      .map((e) => e.trim().toLowerCase());
    return adminEmails.includes(email.toLowerCase());
  }

  it("returns true for a configured admin email", () => {
    expect(isAdminEmail("admin@torvi.com")).toBe(true);
  });

  it("is case-insensitive", () => {
    expect(isAdminEmail("ADMIN@TORVI.COM")).toBe(true);
    expect(isAdminEmail("Admin@Torvi.Com")).toBe(true);
  });

  it("returns false for non-admin emails", () => {
    expect(isAdminEmail("user@example.com")).toBe(false);
    expect(isAdminEmail("")).toBe(false);
  });
});

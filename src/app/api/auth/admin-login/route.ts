import { NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "crypto";
import { createSession } from "@/lib/auth/session";
import { connectDB } from "@/lib/db/mongodb";
import { User } from "@/lib/db/models/User";
import { AdminLoginAttempt } from "@/lib/db/models/AdminLoginAttempt";

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

function safeEqual(a: string, b: string): boolean {
  const hashA = createHash("sha256").update(a).digest();
  const hashB = createHash("sha256").update(b).digest();
  return timingSafeEqual(hashA, hashB);
}

function getClientIp(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    await connectDB();

    // Rate-limit by IP + email to blunt password brute-forcing. Disabled in
    // development so local/e2e test runs don't lock themselves out.
    const enforceRateLimit = process.env.NODE_ENV !== "development";
    const key = `${getClientIp(req)}:${email.toLowerCase()}`;

    if (enforceRateLimit) {
      const recentAttempts = await AdminLoginAttempt.countDocuments({
        key,
        createdAt: { $gte: new Date(Date.now() - WINDOW_MS) },
      });
      if (recentAttempts >= MAX_ATTEMPTS) {
        return NextResponse.json(
          { error: "Too many attempts. Try again in 15 minutes." },
          { status: 429 }
        );
      }
    }

    const adminEmails = (process.env.ADMIN_EMAILS ?? "")
      .split(",")
      .map((e) => e.trim().toLowerCase());

    if (!adminEmails.includes(email.toLowerCase())) {
      if (enforceRateLimit) await AdminLoginAttempt.create({ key });
      return NextResponse.json({ error: "Not an admin account." }, { status: 403 });
    }

    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!password || !adminPassword || !safeEqual(password, adminPassword)) {
      if (enforceRateLimit) await AdminLoginAttempt.create({ key });
      return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
    }

    if (enforceRateLimit) await AdminLoginAttempt.deleteMany({ key });

    // Find or create admin user record
    let user = await User.findOne({ email: email.toLowerCase() }).lean();
    if (!user) {
      user = await User.create({
        email: email.toLowerCase(),
        fullName: "Admin",
        learningStatus: "lead",
      });
    }

    await createSession(String(user._id), true);

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Login failed";
    console.error("Admin login error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { User } from "@/lib/db/models/User";
import { verifyMagicToken } from "@/lib/auth/magic";
import { createSession } from "@/lib/auth/session";

function isAdminEmail(email: string): boolean {
  const adminEmails = (process.env.ADMIN_EMAILS ?? "").split(",").map((e) => e.trim().toLowerCase());
  return adminEmails.includes(email.toLowerCase());
}

function sanitiseNext(next: string | null): string {
  if (!next) return "/hub";
  // Only allow relative paths
  if (!next.startsWith("/") || next.startsWith("//")) return "/hub";
  return next;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  const next = sanitiseNext(searchParams.get("next"));

  if (!token) {
    return NextResponse.redirect(new URL("/login?error=missing_token", req.url));
  }

  try {
    const { email } = await verifyMagicToken(token);

    await connectDB();
    const user = await User.findOne({ email }).lean();
    if (!user) {
      return NextResponse.redirect(new URL("/login?error=no_account", req.url));
    }

    await createSession(String(user._id), isAdminEmail(email));

    // Redirect through /auth/done so the client can sync localStorage
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const doneUrl = new URL("/auth/done", appUrl);
    doneUrl.searchParams.set("uid", String(user._id));
    doneUrl.searchParams.set("next", next);

    return NextResponse.redirect(doneUrl);
  } catch {
    return NextResponse.redirect(new URL("/login?error=invalid_token", req.url));
  }
}

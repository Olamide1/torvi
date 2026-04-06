import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { User } from "@/lib/db/models/User";
import { createMagicToken } from "@/lib/auth/magic";
import { sendMagicLink } from "@/lib/email";

function isAdminEmail(email: string): boolean {
  const adminEmails = (process.env.ADMIN_EMAILS ?? "").split(",").map((e) => e.trim().toLowerCase());
  return adminEmails.includes(email.toLowerCase());
}

export async function POST(req: Request) {
  try {
    const { email, next = "/hub" } = await req.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    await connectDB();
    const user = await User.findOne({ email: email.toLowerCase() }).lean();
    if (!user) {
      return NextResponse.json({ error: "No account found for that email." }, { status: 404 });
    }

    const token = await createMagicToken(email.toLowerCase());
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const link = `${appUrl}/api/auth/verify?token=${encodeURIComponent(token)}&next=${encodeURIComponent(next)}`;

    await sendMagicLink(email, link);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to send magic link." }, { status: 500 });
  }
}

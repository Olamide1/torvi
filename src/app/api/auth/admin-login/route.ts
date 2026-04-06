import { NextResponse } from "next/server";
import { createSession } from "@/lib/auth/session";
import { connectDB } from "@/lib/db/mongodb";
import { User } from "@/lib/db/models/User";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const adminEmails = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase());

  if (!adminEmails.includes(email.toLowerCase())) {
    return NextResponse.json({ error: "Not an admin account." }, { status: 403 });
  }

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  await connectDB();

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
}

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { User } from "@/lib/db/models/User";
import "@/lib/db/models/Track";
import "@/lib/db/models/Archetype";
import { sendKitEmail } from "@/lib/email";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const query = email ? { email: email.toLowerCase() } : {};
    const users = await User.find(query)
      .populate("trackId", "name slug")
      .populate("archetypeId", "name slug")
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json({ users });
  } catch {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const email = body.email?.toLowerCase();
    if (!email) return NextResponse.json({ error: "email is required" }, { status: 400 });

    // Upsert: create if not exists, return existing if duplicate
    const isNew = !(await User.exists({ email }));
    const user = isNew
      ? await User.create({ ...body, email })
      : await User.findOne({ email }).lean();

    // Send starter kit email to new leads
    if (isNew && body.learningStatus === "lead") {
      const roleLabel = body.roleLabel ?? "your role";
      sendKitEmail(email, roleLabel).catch(() => {});
    }

    return NextResponse.json({ user }, { status: isNew ? 201 : 200 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to create user";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

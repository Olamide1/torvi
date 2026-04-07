import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { User } from "@/lib/db/models/User";
import "@/lib/db/models/Track";
import "@/lib/db/models/Archetype";
import { sendKitEmail } from "@/lib/email";
import { serverTrackLead } from "@/lib/conversions/server";

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

    // Send starter kit email + fire server-side lead conversion for new leads
    if (isNew && body.learningStatus === "lead" && !email.endsWith("@example.com")) {
      const roleLabel = body.roleLabel || "Torvi";
      sendKitEmail(email, roleLabel).catch(() => {});
      serverTrackLead(email).catch(() => {});
    }

    return NextResponse.json({ user }, { status: isNew ? 201 : 200 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to create user";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

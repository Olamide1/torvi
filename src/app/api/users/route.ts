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
    const user = await User.create(body);

    // Send starter kit email to new leads
    if (body.learningStatus === "lead" && body.email) {
      const roleLabel = body.roleLabel ?? "your role";
      sendKitEmail(body.email, roleLabel).catch(() => {
        // Non-blocking — don't fail the request if email fails
      });
    }

    return NextResponse.json({ user }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to create user";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

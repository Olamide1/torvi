import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { ProgressEvent } from "@/lib/db/models/ProgressEvent";
import { User } from "@/lib/db/models/User";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) return NextResponse.json({ error: "userId required" }, { status: 400 });
    const events = await ProgressEvent.find({ userId }).sort({ createdAt: -1 }).limit(50).lean();
    return NextResponse.json({ events });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const event = await ProgressEvent.create(body);

    // Update user's last activity implicitly via updatedAt
    if (body.userId) {
      await User.findByIdAndUpdate(body.userId, { updatedAt: new Date() });
    }

    return NextResponse.json({ event }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to record progress" }, { status: 500 });
  }
}

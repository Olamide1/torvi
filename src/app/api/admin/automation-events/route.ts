import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { AutomationEvent } from "@/lib/db/models/AutomationEvent";
import { User } from "@/lib/db/models/User";

export async function GET() {
  await connectDB();
  const events = await AutomationEvent.find()
    .sort({ createdAt: -1 })
    .limit(30)
    .lean();

  // Attach user names
  const userIds = [...new Set(events.filter((e) => e.userId).map((e) => String(e.userId)))];
  const users = await User.find({ _id: { $in: userIds } }).select("fullName email").lean();
  const userMap = Object.fromEntries(users.map((u) => [String(u._id), u.fullName || u.email]));

  const enriched = events.map((e) => ({
    _id: String(e._id),
    eventName: e.eventName,
    source: e.source,
    target: e.userId ? (userMap[String(e.userId)] ?? "Unknown") : "System",
    processed: e.processed,
    createdAt: e.createdAt,
  }));

  return NextResponse.json({ events: enriched });
}

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { User } from "@/lib/db/models/User";
import "@/lib/db/models/Track";
import "@/lib/db/models/Archetype";
import "@/lib/db/models/Run";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const runId = searchParams.get("runId");
    const learningStatus = searchParams.get("learningStatus");
    const stalled = searchParams.get("stalled");
    const trackId = searchParams.get("trackId");

    const query: Record<string, unknown> = {};
    if (runId) query.runId = runId;
    if (learningStatus) query.learningStatus = learningStatus;
    if (stalled === "true") query.learningStatus = "stalled";
    if (trackId) query.trackId = trackId;

    const users = await User.find(query)
      .populate("trackId", "name slug")
      .populate("archetypeId", "name slug")
      .populate("runId", "name slug status")
      .sort({ updatedAt: -1 })
      .lean();

    return NextResponse.json({ learners: users, total: users.length });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch learners" }, { status: 500 });
  }
}

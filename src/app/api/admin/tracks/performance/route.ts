import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { User } from "@/lib/db/models/User";
import { Track } from "@/lib/db/models/Track";
import { SupportCase } from "@/lib/db/models/SupportCase";

export async function GET() {
  try {
    await connectDB();
    const tracks = await Track.find({ active: true }).lean();

    const performance = await Promise.all(
      tracks.map(async (track) => {
        const learners = await User.find({ trackId: track._id }).lean();
        const total = learners.length;
        const stalled = learners.filter((u) => u.learningStatus === "stalled").length;
        const certified = learners.filter((u) => u.certificateStatus === "issued").length;
        const supportCases = await SupportCase.countDocuments({ userId: { $in: learners.map((u) => u._id) } });

        return {
          track: { id: track._id, name: track.name, slug: track.slug },
          total,
          stalled,
          stalledRate: total > 0 ? Math.round((stalled / total) * 100) : 0,
          certified,
          completionRate: total > 0 ? Math.round((certified / total) * 100) : 0,
          supportCases,
        };
      })
    );

    return NextResponse.json({ performance });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch track performance" }, { status: 500 });
  }
}

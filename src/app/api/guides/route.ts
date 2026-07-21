import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { Guide } from "@/lib/db/models/Guide";
import "@/lib/db/models/Track";
import "@/lib/db/models/Archetype";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const weekId = searchParams.get("weekId");
    const trackId = searchParams.get("trackId");
    const archetypeId = searchParams.get("archetypeId");
    const guideType = searchParams.get("guideType");

    const baseQuery: Record<string, unknown> = {};
    if (weekId !== null) baseQuery.weekId = Number(weekId);
    if (guideType) baseQuery.guideType = guideType;

    // Archetype-specific guides take priority over the track-level generic
    // one for the same week — never both, to keep exactly one guide per week.
    let guides;
    if (archetypeId) {
      guides = await Guide.find({ ...baseQuery, archetypeId })
        .populate("trackId", "name slug")
        .populate("archetypeId", "name slug")
        .sort({ weekId: 1, isRequired: -1 })
        .lean();
      if (guides.length === 0 && trackId) {
        guides = await Guide.find({ ...baseQuery, trackId, archetypeId: null })
          .populate("trackId", "name slug")
          .sort({ weekId: 1, isRequired: -1 })
          .lean();
      }
    } else if (trackId) {
      // No archetype chosen yet — only the track-level generic guide, never
      // an archetype-specific one (they now share the same trackId).
      guides = await Guide.find({
        ...baseQuery,
        archetypeId: null,
        $or: [{ trackId }, { trackId: null }],
      })
        .populate("trackId", "name slug")
        .sort({ weekId: 1, isRequired: -1 })
        .lean();
    } else {
      guides = await Guide.find(baseQuery)
        .populate("trackId", "name slug")
        .populate("archetypeId", "name slug")
        .sort({ weekId: 1, isRequired: -1 })
        .lean();
    }

    return NextResponse.json({ guides });
  } catch (err) {
    console.error("GET /api/guides error:", err);
    return NextResponse.json({ error: "Failed to fetch guides" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const guide = await Guide.create(body);
    return NextResponse.json({ guide }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create guide" }, { status: 500 });
  }
}

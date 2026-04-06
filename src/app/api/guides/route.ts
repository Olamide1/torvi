import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { Guide } from "@/lib/db/models/Guide";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const weekId = searchParams.get("weekId");
    const trackId = searchParams.get("trackId");
    const archetypeId = searchParams.get("archetypeId");
    const guideType = searchParams.get("guideType");

    const query: Record<string, unknown> = {};
    if (weekId !== null) query.weekId = Number(weekId);
    if (trackId) query.$or = [{ trackId }, { trackId: null }];
    if (archetypeId) query.archetypeId = archetypeId;
    if (guideType) query.guideType = guideType;

    const guides = await Guide.find(query)
      .populate("trackId", "name slug")
      .populate("archetypeId", "name slug")
      .sort({ weekId: 1, isRequired: -1 })
      .lean();
    return NextResponse.json({ guides });
  } catch (err) {
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

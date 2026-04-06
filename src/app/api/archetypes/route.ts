import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { Archetype } from "@/lib/db/models/Archetype";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const trackId = searchParams.get("trackId");
    const query = trackId ? { trackId, active: true } : { active: true };
    const archetypes = await Archetype.find(query).populate("trackId", "name slug").sort({ name: 1 }).lean();
    return NextResponse.json({ archetypes });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch archetypes" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const archetype = await Archetype.create(body);
    return NextResponse.json({ archetype }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create archetype" }, { status: 500 });
  }
}

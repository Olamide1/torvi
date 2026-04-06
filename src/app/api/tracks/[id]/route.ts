import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { Track } from "@/lib/db/models/Track";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const track = await Track.findById(id).lean();
    if (!track) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ track });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch track" }, { status: 500 });
  }
}

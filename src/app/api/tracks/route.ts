import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { Track } from "@/lib/db/models/Track";

export async function GET() {
  try {
    await connectDB();
    const tracks = await Track.find({ active: true }).sort({ name: 1 }).lean();
    return NextResponse.json({ tracks });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch tracks" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const track = await Track.create(body);
    return NextResponse.json({ track }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create track" }, { status: 500 });
  }
}

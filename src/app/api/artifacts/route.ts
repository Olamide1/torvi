import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { Artifact } from "@/lib/db/models/Artifact";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) return NextResponse.json({ error: "userId required" }, { status: 400 });
    const artifacts = await Artifact.find({ userId }).sort({ updatedAt: -1 }).lean();
    return NextResponse.json({ artifacts });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch artifacts" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const artifact = await Artifact.create(body);
    return NextResponse.json({ artifact }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create artifact" }, { status: 500 });
  }
}

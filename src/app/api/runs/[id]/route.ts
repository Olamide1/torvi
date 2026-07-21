import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { Run } from "@/lib/db/models/Run";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const run = await Run.findById(id).lean();
    if (!run) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ run });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch run" }, { status: 500 });
  }
}

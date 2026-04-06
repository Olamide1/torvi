import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { Run } from "@/lib/db/models/Run";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const query = status ? { status } : {};
    const runs = await Run.find(query).sort({ weekStartDate: -1 }).lean();
    return NextResponse.json({ runs });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch runs" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const run = await Run.create(body);
    return NextResponse.json({ run }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create run" }, { status: 500 });
  }
}

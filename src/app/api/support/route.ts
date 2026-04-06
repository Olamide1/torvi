import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { SupportCase } from "@/lib/db/models/SupportCase";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const status = searchParams.get("status");
    const query: Record<string, unknown> = {};
    if (userId) query.userId = userId;
    if (status) query.status = status;
    const cases = await SupportCase.find(query).populate("userId", "fullName email").sort({ createdAt: -1 }).lean();
    return NextResponse.json({ cases });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch support cases" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const supportCase = await SupportCase.create(body);
    return NextResponse.json({ supportCase }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create support case" }, { status: 500 });
  }
}

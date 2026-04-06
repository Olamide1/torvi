import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { Resource } from "@/lib/db/models/Resource";

export async function GET(req: NextRequest) {
  await connectDB();
  const roleSlug = req.nextUrl.searchParams.get("roleSlug");

  const query = roleSlug
    ? { $or: [{ roleSlug }, { roleSlug: null }] }
    : {};

  const resources = await Resource.find(query)
    .sort({ createdAt: -1 })
    .select("slug title type roleSlug")
    .lean();

  return NextResponse.json({ resources });
}

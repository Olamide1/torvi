import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { User } from "@/lib/db/models/User";
import { sendStallEmail } from "@/lib/email";

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();
  const user = await User.findById(id).lean();
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });
  await sendStallEmail(user.email, user.fullName ?? "");
  return NextResponse.json({ ok: true });
}

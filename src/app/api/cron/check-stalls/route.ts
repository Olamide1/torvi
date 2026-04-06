import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { runStallCheck } from "@/lib/automation/progression";

// Called daily by a cron job (Vercel cron, GitHub Actions, etc.)
// Protected by a shared secret in production.
export async function POST(req: Request) {
  if (process.env.NODE_ENV !== "development") {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  await connectDB();
  const result = await runStallCheck();
  return NextResponse.json({ ok: true, ...result });
}

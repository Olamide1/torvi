import { redirect } from "next/navigation";
import { verifySession } from "@/lib/auth/session";
import { connectDB } from "@/lib/db/mongodb";
import { User } from "@/lib/db/models/User";
import { Run } from "@/lib/db/models/Run";
import { AutomationEvent } from "@/lib/db/models/AutomationEvent";
import "@/lib/db/models/Track";
import "@/lib/db/models/Archetype";
import { AdminClient } from "./AdminClient";

export const metadata = { title: "Admin — Torvi" };
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await verifySession();
  if (!session) redirect("/login?next=/admin");
  if (!session.isAdmin) redirect("/forbidden");

  await connectDB();

  const [rawUsers, runs, rawEvents] = await Promise.all([
    User.find({ learningStatus: { $ne: "lead" } })
      .populate("trackId", "name slug")
      .sort({ createdAt: -1 })
      .lean(),
    Run.find().sort({ createdAt: -1 }).lean(),
    AutomationEvent.find().sort({ createdAt: -1 }).limit(30).lean(),
  ]);

  // Enrich automation events with user names
  const userIds = [...new Set(rawEvents.filter((e) => e.userId).map((e) => String(e.userId)))];
  const eventUsers = rawUsers.filter((u) => userIds.includes(String(u._id)));
  const userMap = Object.fromEntries(eventUsers.map((u) => [String(u._id), u.fullName || u.email]));

  const users = rawUsers.map((u) => ({
    _id: String(u._id),
    fullName: u.fullName || u.email,
    email: u.email,
    learningStatus: u.learningStatus,
    billingStatus: u.billingStatus,
    certificateStatus: u.certificateStatus,
    quizRole: u.quizRole ?? null,
    currentWeek: u.currentWeek ?? 0,
    runId: u.runId ? String(u.runId) : null,
    updatedAt: u.updatedAt?.toISOString() ?? new Date().toISOString(),
    onboardingCompletedAt: u.onboardingCompletedAt?.toISOString() ?? null,
    trackName: u.trackId && typeof u.trackId === "object" && "name" in u.trackId
      ? (u.trackId as { name: string }).name
      : null,
  }));

  const serialisedRuns = runs.map((r) => ({
    _id: String(r._id),
    name: r.name,
    slug: r.slug,
    status: r.status,
    enrolledCount: r.enrolledCount ?? 0,
    maxLearners: r.maxLearners,
    weekStartDate: r.weekStartDate?.toISOString() ?? null,
  }));

  const events = rawEvents.map((e) => ({
    _id: String(e._id),
    eventName: e.eventName,
    source: e.source,
    target: e.userId ? (userMap[String(e.userId)] ?? "Unknown") : "System",
    processed: e.processed ?? false,
    createdAt: e.createdAt?.toISOString() ?? new Date().toISOString(),
  }));

  return <AdminClient users={users} runs={serialisedRuns} events={events} />;
}

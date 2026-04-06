import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db/mongodb";
import { Track } from "@/lib/db/models/Track";
import { Archetype } from "@/lib/db/models/Archetype";
import { Run } from "@/lib/db/models/Run";
import { Guide } from "@/lib/db/models/Guide";
import { GuideStep } from "@/lib/db/models/GuideStep";
import { CURRICULUM } from "@/lib/seed/curriculum";

const TRACKS = [
  {
    name: "Product / PM",
    slug: "product-pm",
    description: "For professionals building tools tied to planning, research, prioritisation, or internal product work.",
  },
  {
    name: "Ops / Workflow",
    slug: "ops-workflow",
    description: "For professionals building tools tied to intake, reporting, process management, routing, or internal workflows.",
  },
  {
    name: "Consultant / Client Tooling",
    slug: "consultant-client",
    description: "For professionals building tools tied to diagnostics, delivery support, client-facing workflows, or insight packaging.",
  },
];

const ARCHETYPES_BY_TRACK: Record<string, Array<{ name: string; slug: string; description: string }>> = {
  "product-pm": [
    { name: "Research helper", slug: "research-helper", description: "A tool that helps structure and synthesise user research or discovery work." },
    { name: "Roadmap / Review tool", slug: "roadmap-review-tool", description: "A tool that supports roadmap reviews, prioritisation, or stakeholder alignment." },
    { name: "Meeting / Planning tool", slug: "meeting-planning-tool", description: "A tool that prepares, runs, or documents planning meetings and decisions." },
  ],
  "ops-workflow": [
    { name: "Intake workflow", slug: "intake-workflow", description: "A tool that handles requests, triage, and routing from intake to resolution." },
    { name: "Reporting helper", slug: "reporting-helper", description: "A tool that automates or structures operational reports and status updates." },
    { name: "Task routing tool", slug: "task-routing-tool", description: "A tool that assigns, tracks, or escalates tasks based on defined rules." },
  ],
  "consultant-client": [
    { name: "Client diagnostic tool", slug: "client-diagnostic-tool", description: "A tool that helps assess client situations and surfaces key findings." },
    { name: "Delivery tracker", slug: "delivery-tracker", description: "A tool that tracks deliverables, milestones, and client-facing progress." },
    { name: "Insight / Recommendation generator", slug: "insight-recommendation-generator", description: "A tool that synthesises inputs and produces structured recommendations." },
  ],
};

export async function POST(req: Request) {
  // In production, require the admin password as a bearer token
  if (process.env.NODE_ENV === "production") {
    const auth = req.headers.get("authorization") ?? "";
    const token = auth.replace("Bearer ", "");
    if (!process.env.ADMIN_PASSWORD || token !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    await connectDB();

    // Upsert tracks
    const createdTracks: Record<string, { _id: mongoose.Types.ObjectId }> = {};
    for (const trackData of TRACKS) {
      const track = await Track.findOneAndUpdate(
        { slug: trackData.slug },
        trackData,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      createdTracks[trackData.slug] = track;
    }

    // Upsert archetypes
    let archetypeCount = 0;
    for (const [trackSlug, archetypes] of Object.entries(ARCHETYPES_BY_TRACK)) {
      const track = createdTracks[trackSlug];
      for (const archetypeData of archetypes) {
        await Archetype.findOneAndUpdate(
          { trackId: track._id, slug: archetypeData.slug },
          { ...archetypeData, trackId: track._id },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        archetypeCount++;
      }
    }

    // Upsert a sample active run
    await Run.findOneAndUpdate(
      { slug: "run-001" },
      {
        name: "Run 001 — Founding",
        slug: "run-001",
        status: "active",
        weekStartDate: new Date(),
        currentWeek: 0,
        maxLearners: 25,
        officeHoursUrl: "https://cal.com/torvi/office-hours",
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // Seed curriculum guides + steps
    let guidesUpserted = 0;
    let stepsUpserted = 0;
    for (const guideData of CURRICULUM) {
      const { steps, ...guideFields } = guideData;
      const guide = await Guide.findOneAndUpdate(
        { slug: guideFields.slug },
        { ...guideFields, trackId: null, archetypeId: null, nextGuideId: null, stepCount: steps.length },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      guidesUpserted++;
      for (const step of steps) {
        await GuideStep.findOneAndUpdate(
          { guideId: guide._id as mongoose.Types.ObjectId, order: step.order },
          { ...step, guideId: guide._id as mongoose.Types.ObjectId },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        stepsUpserted++;
      }
    }

    return NextResponse.json({
      message: "Seed complete",
      tracks: Object.keys(createdTracks).length,
      archetypes: archetypeCount,
      runs: 1,
      guides: guidesUpserted,
      steps: stepsUpserted,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Seed failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

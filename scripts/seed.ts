/**
 * Standalone seed script — run this against any MongoDB instance.
 *
 * Usage (local):
 *   npx tsx scripts/seed.ts
 *
 * Usage (against Atlas / production):
 *   MONGODB_URI="mongodb+srv://user:pass@cluster.mongodb.net/torvi" npx tsx scripts/seed.ts
 *
 * This is safe to re-run — all operations are upserts.
 */

import { readFileSync } from "fs";
import { resolve } from "path";

// Load .env.local if MONGODB_URI not already set (e.g. running locally without explicit env)
if (!process.env.MONGODB_URI) {
  try {
    const envPath = resolve(process.cwd(), ".env.local");
    const lines = readFileSync(envPath, "utf-8").split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      const value = trimmed.slice(eqIdx + 1).trim();
      if (key && !process.env[key]) process.env[key] = value;
    }
  } catch {
    // no .env.local — expect MONGODB_URI to be set externally
  }
}

import mongoose from "mongoose";
import { Track } from "../src/lib/db/models/Track";
import { Archetype } from "../src/lib/db/models/Archetype";
import { Run } from "../src/lib/db/models/Run";
import { Guide } from "../src/lib/db/models/Guide";
import { GuideStep } from "../src/lib/db/models/GuideStep";
import { CURRICULUM } from "../src/lib/seed/curriculum";

const MONGODB_URI = process.env.MONGODB_URI ?? "mongodb://localhost:27017/torvi";

const TRACKS = [
  {
    name: "Product / PM",
    slug: "product-pm",
    description:
      "For professionals building tools tied to planning, research, prioritisation, or internal product work.",
  },
  {
    name: "Ops / Workflow",
    slug: "ops-workflow",
    description:
      "For professionals building tools tied to intake, reporting, process management, routing, or internal workflows.",
  },
  {
    name: "Consultant / Client Tooling",
    slug: "consultant-client",
    description:
      "For professionals building tools tied to diagnostics, delivery support, client-facing workflows, or insight packaging.",
  },
];

const ARCHETYPES_BY_TRACK: Record<
  string,
  Array<{ name: string; slug: string; description: string }>
> = {
  "product-pm": [
    {
      name: "Research helper",
      slug: "research-helper",
      description:
        "A tool that helps structure and synthesise user research or discovery work.",
    },
    {
      name: "Roadmap / Review tool",
      slug: "roadmap-review-tool",
      description:
        "A tool that supports roadmap reviews, prioritisation, or stakeholder alignment.",
    },
    {
      name: "Meeting / Planning tool",
      slug: "meeting-planning-tool",
      description:
        "A tool that prepares, runs, or documents planning meetings and decisions.",
    },
  ],
  "ops-workflow": [
    {
      name: "Intake workflow",
      slug: "intake-workflow",
      description:
        "A tool that handles requests, triage, and routing from intake to resolution.",
    },
    {
      name: "Reporting helper",
      slug: "reporting-helper",
      description:
        "A tool that automates or structures operational reports and status updates.",
    },
    {
      name: "Task routing tool",
      slug: "task-routing-tool",
      description:
        "A tool that assigns, tracks, or escalates tasks based on defined rules.",
    },
  ],
  "consultant-client": [
    {
      name: "Client diagnostic tool",
      slug: "client-diagnostic-tool",
      description:
        "A tool that helps assess client situations and surfaces key findings.",
    },
    {
      name: "Delivery tracker",
      slug: "delivery-tracker",
      description:
        "A tool that tracks deliverables, milestones, and client-facing progress.",
    },
    {
      name: "Insight / Recommendation generator",
      slug: "insight-recommendation-generator",
      description:
        "A tool that synthesises inputs and produces structured recommendations.",
    },
  ],
};

async function main() {
  console.log(`Connecting to: ${MONGODB_URI.replace(/:\/\/.*@/, "://<credentials>@")}`);
  await mongoose.connect(MONGODB_URI);
  console.log("Connected.\n");

  // ── Tracks ──────────────────────────────────────────────────────────
  const createdTracks: Record<string, { _id: mongoose.Types.ObjectId }> = {};
  for (const trackData of TRACKS) {
    const track = await Track.findOneAndUpdate(
      { slug: trackData.slug },
      trackData,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    createdTracks[trackData.slug] = track;
    console.log(`Track: ${trackData.name}`);
  }

  // ── Archetypes ───────────────────────────────────────────────────────
  let archetypeCount = 0;
  for (const [trackSlug, archetypes] of Object.entries(ARCHETYPES_BY_TRACK)) {
    const track = createdTracks[trackSlug];
    for (const a of archetypes) {
      await Archetype.findOneAndUpdate(
        { trackId: track._id, slug: a.slug },
        { ...a, trackId: track._id },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      archetypeCount++;
      console.log(`  Archetype: ${a.name}`);
    }
  }

  // ── Run ──────────────────────────────────────────────────────────────
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
  console.log("\nRun: Run 001 — Founding");

  // ── Guides + Steps ────────────────────────────────────────────────────
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
    console.log(`Guide (Week ${guideFields.weekId}): ${guideFields.title}`);
  }

  console.log(`\n✓ Done`);
  console.log(`  Tracks: ${Object.keys(createdTracks).length}`);
  console.log(`  Archetypes: ${archetypeCount}`);
  console.log(`  Guides: ${guidesUpserted} (${stepsUpserted} steps)`);

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

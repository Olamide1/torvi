/**
 * POST /api/seed/curriculum
 * Seeds guide + step content. Safe to run in any environment — fully idempotent.
 * Protected by SEED_TOKEN env var (set a long random string, pass as Authorization header).
 *
 * Usage:
 *   curl -X POST https://your-domain.com/api/seed/curriculum \
 *     -H "Authorization: Bearer your-seed-token"
 */
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db/mongodb";
import { Guide } from "@/lib/db/models/Guide";
import { GuideStep } from "@/lib/db/models/GuideStep";
import { CURRICULUM } from "@/lib/seed/curriculum";

export async function POST(req: Request) {
  // Auth check — require SEED_TOKEN in production
  const seedToken = process.env.SEED_TOKEN;
  if (seedToken) {
    const auth = req.headers.get("Authorization") ?? "";
    const token = auth.replace(/^Bearer\s+/i, "");
    if (token !== seedToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    await connectDB();

    let guidesUpserted = 0;
    let stepsUpserted = 0;

    for (const guideData of CURRICULUM) {
      const { steps, ...guideFields } = guideData;

      // Upsert guide by slug
      const guide = await Guide.findOneAndUpdate(
        { slug: guideFields.slug },
        {
          ...guideFields,
          trackId: null,
          archetypeId: null,
          nextGuideId: null,
          stepCount: steps.length,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      guidesUpserted++;

      // Upsert each step by (guideId, order)
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
      message: "Curriculum seed complete",
      guides: guidesUpserted,
      steps: stepsUpserted,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Seed failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

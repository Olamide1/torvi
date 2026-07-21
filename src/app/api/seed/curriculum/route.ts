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
import { Track } from "@/lib/db/models/Track";
import { Archetype } from "@/lib/db/models/Archetype";
import { Guide } from "@/lib/db/models/Guide";
import { GuideStep } from "@/lib/db/models/GuideStep";
import { CURRICULUM, RETIRED_GENERIC_SLUGS } from "@/lib/seed/curriculum";
import { ARCHETYPE_CURRICULUM } from "@/lib/seed/curriculum-archetypes";

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

    const tracks = await Track.find({}).lean();
    const trackIdBySlug = Object.fromEntries(tracks.map((t) => [t.slug, t._id]));

    let guidesUpserted = 0;
    let stepsUpserted = 0;

    for (const guideData of CURRICULUM) {
      const { steps, trackSlug, ...guideFields } = guideData;
      const trackId = trackIdBySlug[trackSlug];
      if (!trackId) throw new Error(`Track not seeded yet: ${trackSlug}. Run /api/seed first.`);

      // Upsert guide by slug
      const guide = await Guide.findOneAndUpdate(
        { slug: guideFields.slug },
        {
          ...guideFields,
          trackId,
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

    // Archetype-specific guides
    const trackSlugById = Object.fromEntries(tracks.map((t) => [String(t._id), t.slug]));
    const archetypes = await Archetype.find({}).lean();
    const archetypeIdByKey = Object.fromEntries(
      archetypes.map((a) => [`${trackSlugById[String(a.trackId)]}:${a.slug}`, a._id])
    );

    let archetypeGuidesUpserted = 0;
    let archetypeStepsUpserted = 0;
    for (const guideData of ARCHETYPE_CURRICULUM) {
      const { steps, trackSlug, archetypeSlug, ...guideFields } = guideData;
      const trackId = trackIdBySlug[trackSlug];
      if (!trackId) throw new Error(`Track not seeded yet: ${trackSlug}. Run /api/seed first.`);
      const archetypeId = archetypeIdByKey[`${trackSlug}:${archetypeSlug}`];
      if (!archetypeId) throw new Error(`Archetype not seeded yet: ${trackSlug}:${archetypeSlug}. Run /api/seed first.`);

      const guide = await Guide.findOneAndUpdate(
        { slug: guideFields.slug },
        { ...guideFields, trackId, archetypeId, nextGuideId: null, stepCount: steps.length },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      archetypeGuidesUpserted++;
      for (const step of steps) {
        await GuideStep.findOneAndUpdate(
          { guideId: guide._id as mongoose.Types.ObjectId, order: step.order },
          { ...step, guideId: guide._id as mongoose.Types.ObjectId },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        archetypeStepsUpserted++;
      }
    }

    // Retire the old generic (trackId: null) weekly guides
    let retiredGuides = 0;
    const staleGuides = await Guide.find({ slug: { $in: RETIRED_GENERIC_SLUGS } }).lean();
    for (const stale of staleGuides) {
      await GuideStep.deleteMany({ guideId: stale._id });
      await Guide.deleteOne({ _id: stale._id });
      retiredGuides++;
    }

    return NextResponse.json({
      message: "Curriculum seed complete",
      guides: guidesUpserted,
      steps: stepsUpserted,
      archetypeGuides: archetypeGuidesUpserted,
      archetypeSteps: archetypeStepsUpserted,
      retiredGuides,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Seed failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

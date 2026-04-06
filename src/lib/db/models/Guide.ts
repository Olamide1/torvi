import mongoose, { Schema, Document, Model } from "mongoose";

export type GuideType = "concept" | "setup" | "build" | "review" | "troubleshoot" | "submit";

export interface IGuide extends Document {
  title: string;
  slug: string;
  trackId: mongoose.Types.ObjectId | null;
  archetypeId: mongoose.Types.ObjectId | null;
  weekId: number;
  purpose: string;
  estimatedTimeMinutes: number;
  prerequisites: string[];
  expectedOutput: string;
  guideType: GuideType;
  contentBody: string;
  commonMistakes: string[];
  doneChecklist: string[];
  nextGuideId: mongoose.Types.ObjectId | null;
  retrievalTags: string[];
  isRequired: boolean;
  difficulty: "beginner" | "intermediate" | "advanced";
  stepCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const GuideSchema = new Schema<IGuide>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    trackId: { type: Schema.Types.ObjectId, ref: "Track", default: null },
    archetypeId: { type: Schema.Types.ObjectId, ref: "Archetype", default: null },
    weekId: { type: Number, required: true, min: 0, max: 4 },
    purpose: { type: String, required: true },
    estimatedTimeMinutes: { type: Number, default: 30 },
    prerequisites: [{ type: String }],
    expectedOutput: { type: String, required: true },
    guideType: {
      type: String,
      enum: ["concept", "setup", "build", "review", "troubleshoot", "submit"],
      required: true,
    },
    contentBody: { type: String, default: "" },
    commonMistakes: [{ type: String }],
    doneChecklist: [{ type: String }],
    nextGuideId: { type: Schema.Types.ObjectId, ref: "Guide", default: null },
    retrievalTags: [{ type: String }],
    isRequired: { type: Boolean, default: true },
    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
    stepCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

GuideSchema.index({ weekId: 1, trackId: 1, archetypeId: 1 });
GuideSchema.index({ retrievalTags: 1 });

export const Guide: Model<IGuide> =
  mongoose.models.Guide ?? mongoose.model<IGuide>("Guide", GuideSchema);

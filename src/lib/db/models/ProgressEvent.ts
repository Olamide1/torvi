import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProgressEvent extends Document {
  userId: mongoose.Types.ObjectId;
  runId: mongoose.Types.ObjectId | null;
  eventName: string;
  source: "stripe" | "lms" | "slack" | "zoom" | "site" | "ai" | "system";
  weekId: number | null;
  guideId: mongoose.Types.ObjectId | null;
  guideStepId: mongoose.Types.ObjectId | null;
  artifactId: mongoose.Types.ObjectId | null;
  payload: Record<string, unknown>;
  processed: boolean;
  processedAt: Date | null;
  createdAt: Date;
}

const ProgressEventSchema = new Schema<IProgressEvent>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    runId: { type: Schema.Types.ObjectId, ref: "Run", default: null },
    eventName: { type: String, required: true },
    source: {
      type: String,
      enum: ["stripe", "lms", "slack", "zoom", "site", "ai", "system"],
      default: "site",
    },
    weekId: { type: Number, default: null },
    guideId: { type: Schema.Types.ObjectId, ref: "Guide", default: null },
    guideStepId: { type: Schema.Types.ObjectId, ref: "GuideStep", default: null },
    artifactId: { type: Schema.Types.ObjectId, ref: "Artifact", default: null },
    payload: { type: Schema.Types.Mixed, default: {} },
    processed: { type: Boolean, default: false },
    processedAt: { type: Date, default: null },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

ProgressEventSchema.index({ userId: 1, createdAt: -1 });
ProgressEventSchema.index({ eventName: 1 });

export const ProgressEvent: Model<IProgressEvent> =
  mongoose.models.ProgressEvent ??
  mongoose.model<IProgressEvent>("ProgressEvent", ProgressEventSchema);

import mongoose, { Schema, Document, Model } from "mongoose";

export type ArtifactType =
  | "tool_brief"
  | "workflow_sketch"
  | "prototype_draft"
  | "usable_version"
  | "reviewed_version"
  | "final_shipped_tool"
  | "recorded_demo";

export type ArtifactStatus =
  | "not_started"
  | "in_progress"
  | "ready_for_review"
  | "needs_revision"
  | "approved"
  | "submitted";

export interface IArtifact extends Document {
  userId: mongoose.Types.ObjectId;
  trackId: mongoose.Types.ObjectId;
  archetypeId: mongoose.Types.ObjectId;
  artifactType: ArtifactType;
  status: ArtifactStatus;
  version: number;
  title: string;
  description: string;
  submissionUrl: string;
  reviewStatus: "pending" | "in_review" | "approved" | "rejected";
  reviewNotes: string;
  createdAt: Date;
  updatedAt: Date;
}

const ArtifactSchema = new Schema<IArtifact>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    trackId: { type: Schema.Types.ObjectId, ref: "Track", required: true },
    archetypeId: { type: Schema.Types.ObjectId, ref: "Archetype", required: true },
    artifactType: {
      type: String,
      enum: [
        "tool_brief", "workflow_sketch", "prototype_draft",
        "usable_version", "reviewed_version", "final_shipped_tool", "recorded_demo",
      ],
      required: true,
    },
    status: {
      type: String,
      enum: ["not_started", "in_progress", "ready_for_review", "needs_revision", "approved", "submitted"],
      default: "not_started",
    },
    version: { type: Number, default: 1 },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    submissionUrl: { type: String, default: "" },
    reviewStatus: {
      type: String,
      enum: ["pending", "in_review", "approved", "rejected"],
      default: "pending",
    },
    reviewNotes: { type: String, default: "" },
  },
  { timestamps: true }
);

ArtifactSchema.index({ userId: 1, artifactType: 1 });

export const Artifact: Model<IArtifact> =
  mongoose.models.Artifact ?? mongoose.model<IArtifact>("Artifact", ArtifactSchema);

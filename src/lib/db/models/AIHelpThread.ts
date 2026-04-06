import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAIMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface IAIHelpThread extends Document {
  userId: mongoose.Types.ObjectId;
  currentWeek: number;
  trackId: mongoose.Types.ObjectId | null;
  archetypeId: mongoose.Types.ObjectId | null;
  currentGuideId: mongoose.Types.ObjectId | null;
  currentGuideStep: number;
  blockerCategory: string;
  messages: IAIMessage[];
  resolutionStatus: "open" | "resolved" | "escalated";
  escalationStatus: "none" | "pending" | "escalated";
  escalatedAt: Date | null;
  resolvedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const AIHelpThreadSchema = new Schema<IAIHelpThread>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    currentWeek: { type: Number, required: true },
    trackId: { type: Schema.Types.ObjectId, ref: "Track", default: null },
    archetypeId: { type: Schema.Types.ObjectId, ref: "Archetype", default: null },
    currentGuideId: { type: Schema.Types.ObjectId, ref: "Guide", default: null },
    currentGuideStep: { type: Number, default: 0 },
    blockerCategory: { type: String, default: "general" },
    messages: [
      {
        role: { type: String, enum: ["user", "assistant"], required: true },
        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    resolutionStatus: {
      type: String,
      enum: ["open", "resolved", "escalated"],
      default: "open",
    },
    escalationStatus: {
      type: String,
      enum: ["none", "pending", "escalated"],
      default: "none",
    },
    escalatedAt: { type: Date, default: null },
    resolvedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

AIHelpThreadSchema.index({ userId: 1, createdAt: -1 });

export const AIHelpThread: Model<IAIHelpThread> =
  mongoose.models.AIHelpThread ??
  mongoose.model<IAIHelpThread>("AIHelpThread", AIHelpThreadSchema);

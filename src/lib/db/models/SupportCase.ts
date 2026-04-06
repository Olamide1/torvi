import mongoose, { Schema, Document, Model } from "mongoose";

export type SupportCategory =
  | "setup_issue"
  | "guide_confusion"
  | "prompt_issue"
  | "build_issue"
  | "account_billing"
  | "final_submission"
  | "certificate_issue"
  | "general";

export interface ISupportCase extends Document {
  userId: mongoose.Types.ObjectId;
  category: SupportCategory;
  subject: string;
  description: string;
  currentWeek: number;
  currentGuideId: mongoose.Types.ObjectId | null;
  aiThreadId: mongoose.Types.ObjectId | null;
  status: "open" | "in_progress" | "resolved" | "closed";
  resolution: string;
  createdAt: Date;
  updatedAt: Date;
}

const SupportCaseSchema = new Schema<ISupportCase>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    category: {
      type: String,
      enum: ["setup_issue", "guide_confusion", "prompt_issue", "build_issue", "account_billing", "final_submission", "certificate_issue", "general"],
      default: "general",
    },
    subject: { type: String, required: true },
    description: { type: String, required: true },
    currentWeek: { type: Number, default: 0 },
    currentGuideId: { type: Schema.Types.ObjectId, ref: "Guide", default: null },
    aiThreadId: { type: Schema.Types.ObjectId, ref: "AIHelpThread", default: null },
    status: {
      type: String,
      enum: ["open", "in_progress", "resolved", "closed"],
      default: "open",
    },
    resolution: { type: String, default: "" },
  },
  { timestamps: true }
);

export const SupportCase: Model<ISupportCase> =
  mongoose.models.SupportCase ??
  mongoose.model<ISupportCase>("SupportCase", SupportCaseSchema);

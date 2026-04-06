import mongoose, { Schema, Document, Model } from "mongoose";

export interface IGuideStep extends Document {
  guideId: mongoose.Types.ObjectId;
  order: number;
  instruction: string;
  expectedAction: string;
  expectedResult: string;
  commonErrorNote: string;
  aiHintRef: string;
  completionRule: string;
  createdAt: Date;
  updatedAt: Date;
}

const GuideStepSchema = new Schema<IGuideStep>(
  {
    guideId: { type: Schema.Types.ObjectId, ref: "Guide", required: true },
    order: { type: Number, required: true },
    instruction: { type: String, required: true },
    expectedAction: { type: String, default: "" },
    expectedResult: { type: String, default: "" },
    commonErrorNote: { type: String, default: "" },
    aiHintRef: { type: String, default: "" },
    completionRule: { type: String, default: "manual" },
  },
  { timestamps: true }
);

GuideStepSchema.index({ guideId: 1, order: 1 });

export const GuideStep: Model<IGuideStep> =
  mongoose.models.GuideStep ?? mongoose.model<IGuideStep>("GuideStep", GuideStepSchema);

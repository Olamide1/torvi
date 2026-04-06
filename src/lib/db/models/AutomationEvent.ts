import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAutomationEvent extends Document {
  eventName: string;
  source: string;
  userId: mongoose.Types.ObjectId | null;
  runId: mongoose.Types.ObjectId | null;
  payload: Record<string, unknown>;
  processed: boolean;
  processedAt: Date | null;
  createdAt: Date;
}

const AutomationEventSchema = new Schema<IAutomationEvent>(
  {
    eventName: { type: String, required: true },
    source: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", default: null },
    runId: { type: Schema.Types.ObjectId, ref: "Run", default: null },
    payload: { type: Schema.Types.Mixed, default: {} },
    processed: { type: Boolean, default: false },
    processedAt: { type: Date, default: null },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

AutomationEventSchema.index({ eventName: 1, processed: 1 });
AutomationEventSchema.index({ userId: 1 });

export const AutomationEvent: Model<IAutomationEvent> =
  mongoose.models.AutomationEvent ??
  mongoose.model<IAutomationEvent>("AutomationEvent", AutomationEventSchema);

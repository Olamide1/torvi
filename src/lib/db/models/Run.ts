import mongoose, { Schema, Document, Model } from "mongoose";

export interface IRun extends Document {
  name: string;
  slug: string;
  status: "upcoming" | "active" | "completed" | "archived";
  weekStartDate: Date;
  currentWeek: number;
  maxLearners: number;
  enrolledCount: number;
  officeHoursUrl: string;
  slackChannelId: string;
  createdAt: Date;
  updatedAt: Date;
}

const RunSchema = new Schema<IRun>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["upcoming", "active", "completed", "archived"],
      default: "upcoming",
    },
    weekStartDate: { type: Date, required: true },
    currentWeek: { type: Number, default: 0 },
    maxLearners: { type: Number, default: 25 },
    enrolledCount: { type: Number, default: 0 },
    officeHoursUrl: { type: String, default: "" },
    slackChannelId: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Run: Model<IRun> =
  mongoose.models.Run ?? mongoose.model<IRun>("Run", RunSchema);

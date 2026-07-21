import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAdminLoginAttempt extends Document {
  key: string;
  createdAt: Date;
}

const AdminLoginAttemptSchema = new Schema<IAdminLoginAttempt>({
  key: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 900 }, // TTL: auto-deleted after 15 min
});

AdminLoginAttemptSchema.index({ key: 1 });

export const AdminLoginAttempt: Model<IAdminLoginAttempt> =
  mongoose.models.AdminLoginAttempt ??
  mongoose.model<IAdminLoginAttempt>("AdminLoginAttempt", AdminLoginAttemptSchema);

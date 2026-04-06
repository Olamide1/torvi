import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICertificate extends Document {
  userId: mongoose.Types.ObjectId;
  runId: mongoose.Types.ObjectId;
  trackId: mongoose.Types.ObjectId;
  archetypeId: mongoose.Types.ObjectId;
  certificateNumber: string;
  issuedAt: Date;
  toolTitle: string;
  toolDescription: string;
  submissionUrl: string;
  status: "active" | "revoked";
  createdAt: Date;
  updatedAt: Date;
}

const CertificateSchema = new Schema<ICertificate>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    runId: { type: Schema.Types.ObjectId, ref: "Run", required: true },
    trackId: { type: Schema.Types.ObjectId, ref: "Track", required: true },
    archetypeId: { type: Schema.Types.ObjectId, ref: "Archetype", required: true },
    certificateNumber: { type: String, required: true, unique: true },
    issuedAt: { type: Date, required: true },
    toolTitle: { type: String, required: true },
    toolDescription: { type: String, default: "" },
    submissionUrl: { type: String, default: "" },
    status: { type: String, enum: ["active", "revoked"], default: "active" },
  },
  { timestamps: true }
);

export const Certificate: Model<ICertificate> =
  mongoose.models.Certificate ??
  mongoose.model<ICertificate>("Certificate", CertificateSchema);

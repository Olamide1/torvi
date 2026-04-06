import mongoose, { Schema, Document, Model } from "mongoose";

export interface IArchetype extends Document {
  trackId: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  description: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ArchetypeSchema = new Schema<IArchetype>(
  {
    trackId: { type: Schema.Types.ObjectId, ref: "Track", required: true },
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

ArchetypeSchema.index({ trackId: 1, slug: 1 }, { unique: true });

export const Archetype: Model<IArchetype> =
  mongoose.models.Archetype ?? mongoose.model<IArchetype>("Archetype", ArchetypeSchema);

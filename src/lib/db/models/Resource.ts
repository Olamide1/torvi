import mongoose, { Schema, Document, Model } from "mongoose";

export interface IResource extends Document {
  slug: string;
  title: string;
  type: "prompt_pack" | "template" | "worksheet";
  roleSlug: string | null;
  contentMarkdown: string;
  generatedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ResourceSchema = new Schema<IResource>(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ["prompt_pack", "template", "worksheet"],
      required: true,
    },
    roleSlug: { type: String, default: null },
    contentMarkdown: { type: String, required: true },
    generatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Resource: Model<IResource> =
  mongoose.models.Resource ?? mongoose.model<IResource>("Resource", ResourceSchema);

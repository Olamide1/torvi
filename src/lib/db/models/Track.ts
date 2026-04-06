import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITrack extends Document {
  name: string;
  slug: string;
  description: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TrackSchema = new Schema<ITrack>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Track: Model<ITrack> =
  mongoose.models.Track ?? mongoose.model<ITrack>("Track", TrackSchema);

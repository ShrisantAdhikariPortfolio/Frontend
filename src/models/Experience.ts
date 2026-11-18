import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IExperience extends Document {
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
  color: string;
  order: number;
}

const ExperienceSchema = new Schema<IExperience>(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, default: '' },
    period: { type: String, required: true },
    highlights: { type: [String], default: [] },
    color: { type: String, default: '#7C3AED' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Experience: Model<IExperience> =
  mongoose.models.Experience ||
  mongoose.model<IExperience>('Experience', ExperienceSchema);

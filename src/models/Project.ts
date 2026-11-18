import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  link: string;
  github: string;
  image: string;
  tags: string[];
  color: string;
  featured: boolean;
  order: number;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, default: '' },
    github: { type: String, default: '' },
    image: { type: String, default: '/kbc.png' },
    tags: { type: [String], default: [] },
    color: { type: String, default: '#7C3AED' },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

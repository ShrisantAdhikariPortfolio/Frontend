import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEducation extends Document {
  degree: string;
  major: string;
  institution: string;
  location: string;
  period: string;
  description: string;
  order: number;
}

const EducationSchema = new Schema<IEducation>(
  {
    degree: { type: String, required: true },
    major: { type: String, default: '' },
    institution: { type: String, default: '' },
    location: { type: String, default: '' },
    period: { type: String, default: '' },
    description: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Education: Model<IEducation> =
  mongoose.models.Education ||
  mongoose.model<IEducation>('Education', EducationSchema);

export interface IEducationPhilosophy extends Document {
  quote: string;
  author: string;
  subheading: string;
}

const PhilosophySchema = new Schema<IEducationPhilosophy>(
  {
    quote: {
      type: String,
      default:
        'Education is not just about acquiring knowledge, but igniting a passion for innovation and problem-solving in the ever-evolving world of technology.',
    },
    author: { type: String, default: 'Shrisant Adhikari' },
    subheading: {
      type: String,
      default: 'Pursuing excellence through continuous learning • January 2026',
    },
  },
  { timestamps: true }
);

export const EducationPhilosophy: Model<IEducationPhilosophy> =
  mongoose.models.EducationPhilosophy ||
  mongoose.model<IEducationPhilosophy>('EducationPhilosophy', PhilosophySchema);

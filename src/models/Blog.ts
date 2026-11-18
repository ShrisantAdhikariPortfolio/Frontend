import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  tags: string[];
  content: string;
  published: boolean;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, default: 'Technology' },
    date: { type: String, default: 'Recent' },
    readTime: { type: String, default: '5 min read' },
    excerpt: { type: String, default: '' },
    tags: { type: [String], default: [] },
    content: { type: String, default: '' },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Blog: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);

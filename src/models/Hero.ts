import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IHero extends Document {
  badge: string;
  name: string;
  lastName: string;
  typewriterLines: string[];
  ctaText: string;
  ctaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
}

const HeroSchema = new Schema<IHero>(
  {
    badge: { type: String, default: 'FULL-STACK DEVELOPER' },
    name: { type: String, default: 'Shrisant' },
    lastName: { type: String, default: 'Adhikari' },
    typewriterLines: {
      type: [String],
      default: [
        'Building modern web experiences',
        'MERN & Next.js Specialist',
        'Crafting scalable full-stack solutions',
        'Currently @ SB Global',
      ],
    },
    ctaText: { type: String, default: 'Explore My Work →' },
    ctaLink: { type: String, default: '#projects' },
    secondaryCtaText: { type: String, default: "Let's Connect" },
    secondaryCtaLink: { type: String, default: '/contact' },
  },
  { timestamps: true }
);

export const Hero: Model<IHero> =
  mongoose.models.Hero || mongoose.model<IHero>('Hero', HeroSchema);

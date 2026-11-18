import { connectDB } from '@/lib/mongodb';
import { Hero } from '@/models/Hero';
import { readFallbackData, writeFallbackData } from '@/lib/fileFallback';
import { HeroData } from '@/types/portfolio';

const defaultHero: HeroData = {
  badge: 'FULL-STACK DEVELOPER',
  name: 'Shrisant',
  lastName: 'Adhikari',
  typewriterLines: [
    'Building modern web experiences',
    'MERN & Next.js Specialist',
    'Crafting scalable full-stack solutions',
    'Currently @ SB Global',
  ],
  ctaText: 'Explore My Work →',
  ctaLink: '#projects',
  secondaryCtaText: "Let's Connect",
  secondaryCtaLink: '/contact',
};

export async function getHero(): Promise<HeroData> {
  const fallback = readFallbackData<HeroData>('hero.json', defaultHero);

  try {
    const conn = await connectDB();
    if (!conn) {
      return fallback;
    }

    let hero = await Hero.findOne().lean();
    if (!hero) {
      // Seed MongoDB with fallback data
      const created = await Hero.create(fallback);
      return {
        badge: created.badge,
        name: created.name,
        lastName: created.lastName,
        typewriterLines: created.typewriterLines,
        ctaText: created.ctaText,
        ctaLink: created.ctaLink,
        secondaryCtaText: created.secondaryCtaText,
        secondaryCtaLink: created.secondaryCtaLink,
      };
    }

    return {
      badge: hero.badge || fallback.badge,
      name: hero.name || fallback.name,
      lastName: hero.lastName || fallback.lastName,
      typewriterLines: hero.typewriterLines || fallback.typewriterLines,
      ctaText: hero.ctaText || fallback.ctaText,
      ctaLink: hero.ctaLink || fallback.ctaLink,
      secondaryCtaText: hero.secondaryCtaText || fallback.secondaryCtaText,
      secondaryCtaLink: hero.secondaryCtaLink || fallback.secondaryCtaLink,
    };
  } catch (error) {
    console.error('getHero error:', error);
    return fallback;
  }
}

export async function updateHero(data: Partial<HeroData>): Promise<HeroData> {
  // Sync to local fallback JSON
  const currentFallback = readFallbackData<HeroData>('hero.json', defaultHero);
  const updatedData: HeroData = { ...currentFallback, ...data };
  writeFallbackData('hero.json', updatedData);

  try {
    const conn = await connectDB();
    if (conn) {
      const hero = await Hero.findOneAndUpdate({}, { $set: updatedData }, {
        new: true,
        upsert: true,
      }).lean();

      return {
        badge: hero.badge,
        name: hero.name,
        lastName: hero.lastName,
        typewriterLines: hero.typewriterLines,
        ctaText: hero.ctaText,
        ctaLink: hero.ctaLink,
        secondaryCtaText: hero.secondaryCtaText,
        secondaryCtaLink: hero.secondaryCtaLink,
      };
    }
  } catch (error) {
    console.error('updateHero error in MongoDB:', error);
  }

  return updatedData;
}

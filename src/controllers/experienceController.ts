import { connectDB } from '@/lib/mongodb';
import { Experience } from '@/models/Experience';
import { readFallbackData, writeFallbackData } from '@/lib/fileFallback';
import { ExperienceItem } from '@/types/portfolio';

const defaultExperiences: ExperienceItem[] = [
  {
    id: 'sb-global',
    role: 'Fullstack Developer',
    company: 'SB Global',
    location: 'Kathmandu - Paknajol',
    period: 'October 2025 – Present',
    highlights: [
      'Developed and deployed SBGlobalVenture.com',
      'Contributed to DragonCharterServices.com',
      'Built Trekking Exploration web app: https://trekking-exploration.vercel.app/',
      'Collaborated in team-based projects focusing on frontend/backend integration',
    ],
    color: '#00D4FF',
  },
  {
    id: 'mindrisers',
    role: 'MERN Developer',
    company: 'Mindrisers',
    location: 'Kathmandu - Putalisadak',
    period: 'October 2024 – October 2025',
    highlights: [
      'Contributed to internnepal.com project',
      'Gained hands-on experience in web development, project deployment & team collaboration',
      'Learned and applied modern fullstack development technologies',
    ],
    color: '#7C3AED',
  },
];

export async function getExperiences(): Promise<ExperienceItem[]> {
  const fallbackList = readFallbackData<ExperienceItem[]>(
    'experience.json',
    defaultExperiences
  );

  try {
    const conn = await connectDB();
    if (!conn) {
      return fallbackList;
    }

    const count = await Experience.countDocuments();
    if (count === 0) {
      for (let i = 0; i < fallbackList.length; i++) {
        const item = fallbackList[i];
        await Experience.create({
          role: item.role,
          company: item.company,
          location: item.location,
          period: item.period,
          highlights: item.highlights,
          color: item.color,
          order: i,
        });
      }
    }

    const items = await Experience.find().sort({ order: 1, createdAt: -1 }).lean();
    return items.map((doc) => ({
      id: doc._id.toString(),
      role: doc.role,
      company: doc.company,
      location: doc.location,
      period: doc.period,
      highlights: doc.highlights,
      color: doc.color,
    }));
  } catch (err) {
    console.error('getExperiences error:', err);
    return fallbackList;
  }
}

export async function createExperience(
  data: Partial<ExperienceItem>
): Promise<ExperienceItem> {
  const newExp = {
    role: data.role || 'New Role',
    company: data.company || 'Company',
    location: data.location || '',
    period: data.period || 'Present',
    highlights: data.highlights || [],
    color: data.color || '#7C3AED',
  };

  try {
    const conn = await connectDB();
    if (conn) {
      const created = await Experience.create(newExp);
      const res: ExperienceItem = {
        id: created._id.toString(),
        role: created.role,
        company: created.company,
        location: created.location,
        period: created.period,
        highlights: created.highlights,
        color: created.color,
      };

      const fallbackList = readFallbackData<ExperienceItem[]>(
        'experience.json',
        defaultExperiences
      );
      writeFallbackData('experience.json', [res, ...fallbackList]);
      return res;
    }
  } catch (err) {
    console.error('createExperience error in MongoDB:', err);
  }

  const fallbackList = readFallbackData<ExperienceItem[]>(
    'experience.json',
    defaultExperiences
  );
  const fallbackItem: ExperienceItem = {
    id: Date.now().toString(),
    ...newExp,
  };
  writeFallbackData('experience.json', [fallbackItem, ...fallbackList]);
  return fallbackItem;
}

export async function updateExperience(
  id: string,
  data: Partial<ExperienceItem>
): Promise<ExperienceItem | null> {
  try {
    const conn = await connectDB();
    if (conn) {
      const updated = await Experience.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true }
      ).lean();
      if (updated) {
        const res: ExperienceItem = {
          id: updated._id.toString(),
          role: updated.role,
          company: updated.company,
          location: updated.location,
          period: updated.period,
          highlights: updated.highlights,
          color: updated.color,
        };

        const fallbackList = readFallbackData<ExperienceItem[]>(
          'experience.json',
          defaultExperiences
        );
        const idx = fallbackList.findIndex((e) => e.id === id);
        if (idx !== -1) {
          fallbackList[idx] = { ...fallbackList[idx], ...res };
          writeFallbackData('experience.json', fallbackList);
        }
        return res;
      }
    }
  } catch (err) {
    console.error('updateExperience error in MongoDB:', err);
  }

  const fallbackList = readFallbackData<ExperienceItem[]>(
    'experience.json',
    defaultExperiences
  );
  const idx = fallbackList.findIndex((e) => e.id === id);
  if (idx !== -1) {
    fallbackList[idx] = { ...fallbackList[idx], ...data };
    writeFallbackData('experience.json', fallbackList);
    return fallbackList[idx];
  }

  return null;
}

export async function deleteExperience(id: string): Promise<boolean> {
  try {
    const conn = await connectDB();
    if (conn) {
      await Experience.findByIdAndDelete(id);
    }
  } catch (err) {
    console.error('deleteExperience error in MongoDB:', err);
  }

  const fallbackList = readFallbackData<ExperienceItem[]>(
    'experience.json',
    defaultExperiences
  );
  const filtered = fallbackList.filter((e) => e.id !== id);
  writeFallbackData('experience.json', filtered);
  return true;
}

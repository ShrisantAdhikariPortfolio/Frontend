import { connectDB } from '@/lib/mongodb';
import { Education, EducationPhilosophy } from '@/models/Education';
import { readFallbackData, writeFallbackData } from '@/lib/fileFallback';
import { EducationData, EducationEntry } from '@/types/portfolio';

const defaultEducation: EducationData = {
  subheading: 'Pursuing excellence through continuous learning • January 2026',
  items: [
    {
      id: 'bit',
      degree: "Bachelor's in Information Technology",
      major: 'Major in Computer Science • 5th Semester (Ongoing)',
      period: 'October 2023 – Present',
      institution: 'Mahendra Multiple Campus',
      location: 'Ghorahi, Dang, Nepal',
      description:
        'Focused on core concepts in software engineering, data structures, algorithms, web technologies, and database systems. Actively applying coursework to real-world projects in full-stack development and AI tooling.',
    },
  ],
  philosophy: {
    quote:
      'Education is not just about acquiring knowledge, but igniting a passion for innovation and problem-solving in the ever-evolving world of technology.',
    author: 'Shrisant Adhikari',
  },
};

export async function getEducation(): Promise<EducationData> {
  const fallback = readFallbackData<EducationData>(
    'education.json',
    defaultEducation
  );

  try {
    const conn = await connectDB();
    if (!conn) {
      return fallback;
    }

    const count = await Education.countDocuments();
    if (count === 0 && fallback.items.length > 0) {
      for (let i = 0; i < fallback.items.length; i++) {
        const item = fallback.items[i];
        await Education.create({
          degree: item.degree,
          major: item.major,
          institution: item.institution,
          location: item.location,
          period: item.period,
          description: item.description,
          order: i,
        });
      }
    }

    let philDoc = await EducationPhilosophy.findOne().lean();
    if (!philDoc) {
      philDoc = await EducationPhilosophy.create({
        quote: fallback.philosophy.quote,
        author: fallback.philosophy.author,
        subheading: fallback.subheading,
      });
    }

    const items = await Education.find().sort({ order: 1, createdAt: -1 }).lean();

    return {
      subheading: philDoc?.subheading || fallback.subheading,
      philosophy: {
        quote: philDoc?.quote || fallback.philosophy.quote,
        author: philDoc?.author || fallback.philosophy.author,
      },
      items: items.map((doc) => ({
        id: doc._id.toString(),
        degree: doc.degree,
        major: doc.major,
        institution: doc.institution,
        location: doc.location,
        period: doc.period,
        description: doc.description,
      })),
    };
  } catch (err) {
    console.error('getEducation error:', err);
    return fallback;
  }
}

export async function createEducationItem(
  data: Partial<EducationEntry>
): Promise<EducationEntry> {
  const newItem = {
    degree: data.degree || 'Degree',
    major: data.major || '',
    institution: data.institution || '',
    location: data.location || '',
    period: data.period || '',
    description: data.description || '',
  };

  try {
    const conn = await connectDB();
    if (conn) {
      const created = await Education.create(newItem);
      const res: EducationEntry = {
        id: created._id.toString(),
        degree: created.degree,
        major: created.major,
        institution: created.institution,
        location: created.location,
        period: created.period,
        description: created.description,
      };

      const fallback = readFallbackData<EducationData>(
        'education.json',
        defaultEducation
      );
      fallback.items = [res, ...fallback.items];
      writeFallbackData('education.json', fallback);
      return res;
    }
  } catch (err) {
    console.error('createEducationItem error in MongoDB:', err);
  }

  const fallback = readFallbackData<EducationData>(
    'education.json',
    defaultEducation
  );
  const fallbackItem: EducationEntry = {
    id: Date.now().toString(),
    ...newItem,
  };
  fallback.items = [fallbackItem, ...fallback.items];
  writeFallbackData('education.json', fallback);
  return fallbackItem;
}

export async function updateEducationItem(
  id: string,
  data: Partial<EducationEntry>
): Promise<EducationEntry | null> {
  try {
    const conn = await connectDB();
    if (conn) {
      const updated = await Education.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true }
      ).lean();
      if (updated) {
        const res: EducationEntry = {
          id: updated._id.toString(),
          degree: updated.degree,
          major: updated.major,
          institution: updated.institution,
          location: updated.location,
          period: updated.period,
          description: updated.description,
        };

        const fallback = readFallbackData<EducationData>(
          'education.json',
          defaultEducation
        );
        const idx = fallback.items.findIndex((e) => e.id === id);
        if (idx !== -1) {
          fallback.items[idx] = { ...fallback.items[idx], ...res };
          writeFallbackData('education.json', fallback);
        }
        return res;
      }
    }
  } catch (err) {
    console.error('updateEducationItem error in MongoDB:', err);
  }

  const fallback = readFallbackData<EducationData>(
    'education.json',
    defaultEducation
  );
  const idx = fallback.items.findIndex((e) => e.id === id);
  if (idx !== -1) {
    fallback.items[idx] = { ...fallback.items[idx], ...data };
    writeFallbackData('education.json', fallback);
    return fallback.items[idx];
  }

  return null;
}

export async function deleteEducationItem(id: string): Promise<boolean> {
  try {
    const conn = await connectDB();
    if (conn) {
      await Education.findByIdAndDelete(id);
    }
  } catch (err) {
    console.error('deleteEducationItem error in MongoDB:', err);
  }

  const fallback = readFallbackData<EducationData>(
    'education.json',
    defaultEducation
  );
  fallback.items = fallback.items.filter((e) => e.id !== id);
  writeFallbackData('education.json', fallback);
  return true;
}

export async function updateEducationPhilosophy(data: {
  quote?: string;
  author?: string;
  subheading?: string;
}): Promise<void> {
  try {
    const conn = await connectDB();
    if (conn) {
      await EducationPhilosophy.findOneAndUpdate(
        {},
        { $set: data },
        { upsert: true, new: true }
      );
    }
  } catch (err) {
    console.error('updateEducationPhilosophy error:', err);
  }

  const fallback = readFallbackData<EducationData>(
    'education.json',
    defaultEducation
  );
  if (data.quote !== undefined) fallback.philosophy.quote = data.quote;
  if (data.author !== undefined) fallback.philosophy.author = data.author;
  if (data.subheading !== undefined) fallback.subheading = data.subheading;
  writeFallbackData('education.json', fallback);
}

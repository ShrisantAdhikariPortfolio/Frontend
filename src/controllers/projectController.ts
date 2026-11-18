import { connectDB } from '@/lib/mongodb';
import { Project } from '@/models/Project';
import { readFallbackData, writeFallbackData } from '@/lib/fileFallback';
import { Project as ProjectType } from '@/types/portfolio';

const defaultProjects: ProjectType[] = [
  {
    id: 'kbc',
    title: 'Kathmandu Business Campus',
    description:
      'A fully functional educational platform designed for campus administration, student access, course management, and information sharing.',
    link: 'http://kathmandubusinesscampus.edu.np/',
    github: '',
    image: '/kbc.png',
    tags: ['Next.js', 'Tailwind CSS', 'Node.js', 'MongoDB'],
    color: '#00D4FF',
    featured: true,
  },
  {
    id: 'sbglobal',
    title: 'SB Global Venture',
    description:
      'Modern company website for a leading IT services provider in Nepal with seamless frontend-backend integration and professional design.',
    link: 'https://sbglobalventure.com/',
    github: '',
    image: '/sbglobal.png',
    tags: ['React', 'Next.js', 'Express', 'MongoDB'],
    color: '#7C3AED',
    featured: true,
  },
  {
    id: 'dragon',
    title: 'Dragon Charter Services',
    description:
      'Service-oriented website developed for a charter & logistics company, focusing on clean UI, responsiveness, and reliable performance.',
    link: 'https://dragoncharterservices.com/',
    github: '',
    image: '/dragon.png',
    tags: ['Next.js', 'Tailwind', 'Node.js'],
    color: '#FF6B6B',
    featured: true,
  },
  {
    id: 'internnepal',
    title: 'Intern Nepal',
    description:
      "Intern Nepal is more than just internships — it's where students, fresh grads, and companies come together to learn, connect, and build the future.",
    link: 'https://internepal.com.np/',
    github: '',
    image: '/intern-nepal.png',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    color: '#00FFA3',
    featured: true,
  },
  {
    id: 'trekking',
    title: 'Trekking Exploration',
    description:
      "Modern web application for Trekking, adventure bookings, itinerary planning, and customer experience in Nepal's tourism sector.",
    link: 'https://trekking-exploration.vercel.app/',
    github: '',
    image: '/trekking.png',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    color: '#00FFA3',
    featured: true,
  },
];

export async function getProjects(featuredOnly = false): Promise<ProjectType[]> {
  const fallbackList = readFallbackData<ProjectType[]>(
    'projects.json',
    defaultProjects
  );

  try {
    const conn = await connectDB();
    if (!conn) {
      return featuredOnly
        ? fallbackList.filter((p) => p.featured)
        : fallbackList;
    }

    const count = await Project.countDocuments();
    if (count === 0) {
      // Seed MongoDB from fallback
      for (let i = 0; i < fallbackList.length; i++) {
        const item = fallbackList[i];
        await Project.create({
          title: item.title,
          description: item.description,
          link: item.link,
          github: item.github || '',
          image: item.image,
          tags: item.tags,
          color: item.color,
          featured: item.featured,
          order: i,
        });
      }
    }

    const query = featuredOnly ? { featured: true } : {};
    const projects = await Project.find(query).sort({ order: 1, createdAt: -1 }).lean();

    return projects.map((doc) => ({
      id: doc._id.toString(),
      title: doc.title,
      description: doc.description,
      link: doc.link,
      github: doc.github,
      image: doc.image,
      tags: doc.tags,
      color: doc.color,
      featured: doc.featured,
      createdAt: (doc as any).createdAt?.toISOString(),
    }));
  } catch (error) {
    console.error('getProjects error:', error);
    return featuredOnly
      ? fallbackList.filter((p) => p.featured)
      : fallbackList;
  }
}

export async function getProjectById(id: string): Promise<ProjectType | null> {
  const fallbackList = readFallbackData<ProjectType[]>(
    'projects.json',
    defaultProjects
  );

  try {
    const conn = await connectDB();
    if (conn) {
      const doc = await Project.findById(id).lean();
      if (doc) {
        return {
          id: doc._id.toString(),
          title: doc.title,
          description: doc.description,
          link: doc.link,
          github: doc.github,
          image: doc.image,
          tags: doc.tags,
          color: doc.color,
          featured: doc.featured,
          createdAt: (doc as any).createdAt?.toISOString(),
        };
      }
    }
  } catch (err) {
    console.error('getProjectById error:', err);
  }

  const found = fallbackList.find((p) => p.id === id);
  return found || null;
}

export async function createProject(data: Partial<ProjectType>): Promise<ProjectType> {
  const newProjectData = {
    title: data.title || 'New Project',
    description: data.description || '',
    link: data.link || '',
    github: data.github || '',
    image: data.image || '/kbc.png',
    tags: data.tags || [],
    color: data.color || '#7C3AED',
    featured: Boolean(data.featured),
  };

  try {
    const conn = await connectDB();
    if (conn) {
      const created = await Project.create(newProjectData);
      const res: ProjectType = {
        id: created._id.toString(),
        title: created.title,
        description: created.description,
        link: created.link,
        github: created.github,
        image: created.image,
        tags: created.tags,
        color: created.color,
        featured: created.featured,
        createdAt: (created as any).createdAt?.toISOString(),
      };

      // Sync to fallback
      const fallbackList = readFallbackData<ProjectType[]>(
        'projects.json',
        defaultProjects
      );
      writeFallbackData('projects.json', [res, ...fallbackList]);
      return res;
    }
  } catch (err) {
    console.error('createProject error in MongoDB:', err);
  }

  // Fallback creation
  const fallbackList = readFallbackData<ProjectType[]>(
    'projects.json',
    defaultProjects
  );
  const fallbackItem: ProjectType = {
    id: Date.now().toString(),
    ...newProjectData,
  };
  writeFallbackData('projects.json', [fallbackItem, ...fallbackList]);
  return fallbackItem;
}

export async function updateProject(
  id: string,
  data: Partial<ProjectType>
): Promise<ProjectType | null> {
  try {
    const conn = await connectDB();
    if (conn) {
      const updated = await Project.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true }
      ).lean();
      if (updated) {
        const res: ProjectType = {
          id: updated._id.toString(),
          title: updated.title,
          description: updated.description,
          link: updated.link,
          github: updated.github,
          image: updated.image,
          tags: updated.tags,
          color: updated.color,
          featured: updated.featured,
          createdAt: (updated as any).createdAt?.toISOString(),
        };

        // Sync to fallback file
        const fallbackList = readFallbackData<ProjectType[]>(
          'projects.json',
          defaultProjects
        );
        const idx = fallbackList.findIndex((p) => p.id === id);
        if (idx !== -1) {
          fallbackList[idx] = { ...fallbackList[idx], ...res };
          writeFallbackData('projects.json', fallbackList);
        }
        return res;
      }
    }
  } catch (err) {
    console.error('updateProject error in MongoDB:', err);
  }

  // Update in fallback file
  const fallbackList = readFallbackData<ProjectType[]>(
    'projects.json',
    defaultProjects
  );
  const idx = fallbackList.findIndex((p) => p.id === id);
  if (idx !== -1) {
    fallbackList[idx] = { ...fallbackList[idx], ...data };
    writeFallbackData('projects.json', fallbackList);
    return fallbackList[idx];
  }

  return null;
}

export async function deleteProject(id: string): Promise<boolean> {
  try {
    const conn = await connectDB();
    if (conn) {
      await Project.findByIdAndDelete(id);
    }
  } catch (err) {
    console.error('deleteProject error in MongoDB:', err);
  }

  const fallbackList = readFallbackData<ProjectType[]>(
    'projects.json',
    defaultProjects
  );
  const filtered = fallbackList.filter((p) => p.id !== id);
  writeFallbackData('projects.json', filtered);
  return true;
}

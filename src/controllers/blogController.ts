import { connectDB } from '@/lib/mongodb';
import { Blog } from '@/models/Blog';
import { readFallbackData, writeFallbackData } from '@/lib/fileFallback';
import { BlogPost } from '@/types/portfolio';

const defaultBlogs: BlogPost[] = [
  {
    id: '1',
    title: 'A Blast from the Open Source Past: Ubucon 2025',
    slug: 'ubucon-2025-nepal',
    category: 'Open Source',
    date: '6mo ago',
    readTime: '8 min read',
    excerpt:
      'I wrote a blog post about my experience at Ubucon 2025 in Nepal, a major event for the open-source community. I had the opportunity to meet and talk with many interesting people...',
    tags: ['Ubuntu', 'Conference', 'Nepal'],
    content:
      'Full insights from attending Ubucon 2025 in Nepal, community building, and open source opportunities.',
    published: true,
  },
  {
    id: '2',
    title: 'Take your Django serializers to the next level',
    slug: 'django-serializers-advanced',
    category: 'Django',
    date: '5mo ago',
    readTime: '12 min read',
    excerpt:
      'Learn the essentials of Django REST Framework serializers — from basic Serializer vs ModelSerializer, methods, context, and custom fields, to practical examples...',
    tags: ['DRF', 'Serializers', 'REST API'],
    content:
      'Deep dive into optimizing serializers, nested writes, and high-performance serialization.',
    published: true,
  },
  {
    id: '3',
    title: 'Experiencing the dualities of hackathon',
    slug: 'hackathon-dualities',
    category: 'Hackathon',
    date: '1y ago',
    readTime: '7 min read',
    excerpt:
      'I reflected on my journey in hackathons, first as a participant and later as a judge. Experiencing the nerves, teamwork, and pressure firsthand...',
    tags: ['Teamwork', 'Productivity', 'Events'],
    content:
      'How participating in and judging hackathons shapes engineering mindset and rapid problem solving.',
    published: true,
  },
  {
    id: '4',
    title: 'TypeScript Advanced Tricks',
    slug: 'typescript-advanced-tricks',
    category: 'TypeScript',
    date: '1y ago',
    readTime: '6 min read',
    excerpt:
      'I revisited my previous JavaScript tips and shared five TypeScript tricks I use daily: checking literal types in IDEs, handling null safely...',
    tags: ['TypeScript', 'Tips', 'Advanced'],
    content: 'Practical TypeScript patterns for enterprise grade codebases.',
    published: true,
  },
  {
    id: '5',
    title: 'From YING to YANG: Understanding Celery',
    slug: 'understanding-celery',
    category: 'Architecture',
    date: '1y ago',
    readTime: '10 min read',
    excerpt:
      'In this article, I explored Celery from basics to advanced usage—how it handles background tasks, concurrency, time limits...',
    tags: ['Celery', 'Task Queue', 'Python'],
    content:
      'Mastering background workers, queues, Redis/RabbitMQ brokers with Celery.',
    published: true,
  },
  {
    id: '6',
    title: 'I have been increasing my development productivity',
    slug: 'dev-productivity-tips',
    category: 'Productivity',
    date: '1y ago',
    readTime: '5 min read',
    excerpt:
      'Practical habits, tools, shortcuts, and mindset shifts that helped me ship faster and with less stress over the past year.',
    tags: ['Productivity', 'Workflow', 'Developer Life'],
    content:
      'Actionable developer habits for shipping faster and building better software.',
    published: true,
  },
];

export async function getBlogs(publishedOnly = false): Promise<BlogPost[]> {
  const fallbackList = readFallbackData<BlogPost[]>('blogs.json', defaultBlogs);

  try {
    const conn = await connectDB();
    if (!conn) {
      return publishedOnly
        ? fallbackList.filter((b) => b.published)
        : fallbackList;
    }

    const count = await Blog.countDocuments();
    if (count === 0 && fallbackList.length > 0) {
      for (const item of fallbackList) {
        await Blog.create({
          title: item.title,
          slug: item.slug,
          category: item.category,
          date: item.date,
          readTime: item.readTime,
          excerpt: item.excerpt,
          tags: item.tags,
          content: item.content || item.excerpt,
          published: item.published,
        });
      }
    }

    const query = publishedOnly ? { published: true } : {};
    const docs = await Blog.find(query).sort({ createdAt: -1 }).lean();

    return docs.map((doc) => ({
      id: doc._id.toString(),
      title: doc.title,
      slug: doc.slug,
      category: doc.category,
      date: doc.date,
      readTime: doc.readTime,
      excerpt: doc.excerpt,
      tags: doc.tags,
      content: doc.content,
      published: doc.published,
      createdAt: (doc as any).createdAt?.toISOString(),
    }));
  } catch (err) {
    console.error('getBlogs error:', err);
    return publishedOnly
      ? fallbackList.filter((b) => b.published)
      : fallbackList;
  }
}

export async function getBlogByIdOrSlug(
  idOrSlug: string
): Promise<BlogPost | null> {
  const fallbackList = readFallbackData<BlogPost[]>('blogs.json', defaultBlogs);

  try {
    const conn = await connectDB();
    if (conn) {
      const isObjectId = idOrSlug.match(/^[0-9a-fA-F]{24}$/);
      const query = isObjectId
        ? { $or: [{ _id: idOrSlug }, { slug: idOrSlug }] }
        : { slug: idOrSlug };

      const doc = await Blog.findOne(query).lean();
      if (doc) {
        return {
          id: doc._id.toString(),
          title: doc.title,
          slug: doc.slug,
          category: doc.category,
          date: doc.date,
          readTime: doc.readTime,
          excerpt: doc.excerpt,
          tags: doc.tags,
          content: doc.content,
          published: doc.published,
          createdAt: (doc as any).createdAt?.toISOString(),
        };
      }
    }
  } catch (err) {
    console.error('getBlogByIdOrSlug error in MongoDB:', err);
  }

  const found = fallbackList.find(
    (b) => b.id === idOrSlug || b.slug === idOrSlug
  );
  return found || null;
}

export async function createBlog(data: Partial<BlogPost>): Promise<BlogPost> {
  const slug =
    data.slug?.trim() ||
    (data.title || 'post')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

  const newBlog = {
    title: data.title || 'New Blog Post',
    slug,
    category: data.category || 'Tech',
    date: data.date || 'Just now',
    readTime: data.readTime || '5 min read',
    excerpt: data.excerpt || '',
    tags: data.tags || [],
    content: data.content || '',
    published: data.published ?? true,
  };

  try {
    const conn = await connectDB();
    if (conn) {
      const created = await Blog.create(newBlog);
      const res: BlogPost = {
        id: created._id.toString(),
        title: created.title,
        slug: created.slug,
        category: created.category,
        date: created.date,
        readTime: created.readTime,
        excerpt: created.excerpt,
        tags: created.tags,
        content: created.content,
        published: created.published,
        createdAt: (created as any).createdAt?.toISOString(),
      };

      const fallbackList = readFallbackData<BlogPost[]>('blogs.json', defaultBlogs);
      writeFallbackData('blogs.json', [res, ...fallbackList]);
      return res;
    }
  } catch (err) {
    console.error('createBlog error in MongoDB:', err);
  }

  const fallbackList = readFallbackData<BlogPost[]>('blogs.json', defaultBlogs);
  const fallbackItem: BlogPost = {
    id: Date.now().toString(),
    ...newBlog,
  };
  writeFallbackData('blogs.json', [fallbackItem, ...fallbackList]);
  return fallbackItem;
}

export async function updateBlog(
  id: string,
  data: Partial<BlogPost>
): Promise<BlogPost | null> {
  try {
    const conn = await connectDB();
    if (conn) {
      const updated = await Blog.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true }
      ).lean();
      if (updated) {
        const res: BlogPost = {
          id: updated._id.toString(),
          title: updated.title,
          slug: updated.slug,
          category: updated.category,
          date: updated.date,
          readTime: updated.readTime,
          excerpt: updated.excerpt,
          tags: updated.tags,
          content: updated.content,
          published: updated.published,
          createdAt: (updated as any).createdAt?.toISOString(),
        };

        const fallbackList = readFallbackData<BlogPost[]>('blogs.json', defaultBlogs);
        const idx = fallbackList.findIndex((b) => b.id === id);
        if (idx !== -1) {
          fallbackList[idx] = { ...fallbackList[idx], ...res };
          writeFallbackData('blogs.json', fallbackList);
        }
        return res;
      }
    }
  } catch (err) {
    console.error('updateBlog error in MongoDB:', err);
  }

  const fallbackList = readFallbackData<BlogPost[]>('blogs.json', defaultBlogs);
  const idx = fallbackList.findIndex((b) => b.id === id);
  if (idx !== -1) {
    fallbackList[idx] = { ...fallbackList[idx], ...data };
    writeFallbackData('blogs.json', fallbackList);
    return fallbackList[idx];
  }

  return null;
}

export async function deleteBlog(id: string): Promise<boolean> {
  try {
    const conn = await connectDB();
    if (conn) {
      await Blog.findByIdAndDelete(id);
    }
  } catch (err) {
    console.error('deleteBlog error in MongoDB:', err);
  }

  const fallbackList = readFallbackData<BlogPost[]>('blogs.json', defaultBlogs);
  const filtered = fallbackList.filter((b) => b.id !== id);
  writeFallbackData('blogs.json', filtered);
  return true;
}

'use client';

import React from 'react';
import Link from 'next/link';
import { useBlogs } from '@/hooks/usePortfolioData';
import { BlogPost } from '@/types/portfolio';

const fallbackBlogs: BlogPost[] = [
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
    published: true,
  },
];

export default function BlogsPage() {
  const { data: blogs } = useBlogs(fallbackBlogs);

  const displayBlogs = blogs && blogs.length > 0 ? blogs : fallbackBlogs;

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
              Articles &amp; Thoughts
            </span>
          </h2>
          <p className="mt-4 text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Practical insights on web development, system architecture, open source, and shipping products.
          </p>
        </div>

        <div className="space-y-6">
          {displayBlogs.map((blog) => (
            <article
              key={blog.id || blog.slug}
              className="group bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-500"
            >
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-purple-50 dark:bg-slate-800/80 text-purple-700 dark:text-purple-400 text-xs font-medium rounded-full border border-purple-200/60 dark:border-slate-700/50">
                  {blog.category}
                </span>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {blog.readTime}
                </span>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  • {blog.date}
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                {blog.title}
              </h3>

              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                {blog.excerpt}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <span className="text-sm font-medium text-purple-600 dark:text-purple-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Read Article →
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

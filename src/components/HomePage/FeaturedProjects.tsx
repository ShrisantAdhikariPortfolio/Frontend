'use client';

import React, { useEffect, useRef } from 'react';
import { useProjects } from '@/hooks/usePortfolioData';
import { Project } from '@/types/portfolio';

const fallbackProjects: Project[] = [
  {
    id: 'kbc',
    title: 'Kathmandu Business Campus',
    description:
      'A fully functional educational platform designed for campus administration, student access, course management, and information sharing.',
    link: 'http://kathmandubusinesscampus.edu.np/',
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
    image: '/dragon.png',
    tags: ['Next.js', 'Tailwind', 'Node.js'],
    color: '#FF6B6B',
    featured: true,
  },
  {
    id: 'internnepal',
    title: 'Intern Nepal',
    description:
      "Intern Nepal is more than just internships — it's where students, fresh grads, and companies come together to learn, connect, and build the future. Find opportunities, attend events, join communities, and grow your career with purpose.",
    link: 'https://internepal.com.np/',
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
    image: '/trekking.png',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    color: '#00FFA3',
    featured: true,
  },
];

export default function FeaturedProjects() {
  const { data: projects } = useProjects(fallbackProjects, true);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-fade-in-up');
            }, index * 150 + 100);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((card) => card && observer.observe(card));
    return () => observer.disconnect();
  }, [projects]);

  const displayProjects = projects.length > 0 ? projects : fallbackProjects;

  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="mt-5 text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Production-grade applications I&apos;ve built or significantly contributed to — from educational platforms to business and tourism solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {displayProjects.map((project, index) => (
            <div
              key={project.id || project.title}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="group relative bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden
                         shadow-xl shadow-slate-200/50 dark:shadow-none hover:border-purple-600/50 hover:shadow-2xl hover:shadow-purple-600/10 dark:hover:shadow-purple-900/20 transition-all duration-500
                         opacity-0 translate-y-12"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image || '/kbc.png'}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 dark:from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              </div>

              <div className="p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                  {project.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-300 mb-6 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-purple-50 dark:bg-slate-800/80 text-purple-700 dark:text-purple-400 text-sm font-medium rounded-full border border-purple-200/60 dark:border-slate-700/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors"
                    >
                      View Live Project
                      <span className="text-lg">→</span>
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 text-sm font-medium transition-colors"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>

              <div
                className="absolute left-0 top-0 w-1 h-full transition-all duration-500 group-hover:h-0"
                style={{ background: project.color }}
              />
            </div>
          ))}
        </div>

        <div className="mt-16 md:mt-24 text-center">
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            These projects represent real-world experience with full-stack development, team collaboration, deployment, and delivering value to clients and users.
          </p>
        </div>
      </div>
    </section>
  );
}

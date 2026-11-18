'use client';

import React, { useEffect, useRef } from 'react';
import { useExperience } from '@/hooks/usePortfolioData';
import { ExperienceItem } from '@/types/portfolio';

const fallbackExperiences: ExperienceItem[] = [
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

export default function Experience() {
  const { data: experiences } = useExperience(fallbackExperiences);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            const card = entry.target as HTMLDivElement;
            setTimeout(() => {
              card.classList.add('animate-fade-in-up');
            }, index * 200 + 100);
            observer.unobserve(card);
          }
        });
      },
      { threshold: 0.15 }
    );

    cardRefs.current.forEach((card) => card && observer.observe(card));

    return () => observer.disconnect();
  }, [experiences]);

  const displayExperiences =
    experiences.length > 0 ? experiences : fallbackExperiences;

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
              Professional Experience
            </span>
          </h2>
          <p className="mt-6 text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            From internship to full-time roles — building real-world products,
            collaborating in teams, and delivering production-grade applications.
          </p>
          <p className="mt-4 text-lg text-purple-600 dark:text-purple-400 font-medium">
            Journey so far • January 2026
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-purple-500/30 via-purple-500/30 to-transparent" />
          <div className="space-y-24 md:space-y-32">
            {displayExperiences.map((exp, index) => (
              <div
                key={exp.id || exp.role}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={`relative opacity-0 translate-y-12 transition-all duration-700 ease-out
                           ${
                             index % 2 === 0
                               ? 'md:ml-auto md:pl-12 md:pr-24'
                               : 'md:mr-auto md:pr-12 md:pl-24'
                           }`}
              >
                <div
                  className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-700/60 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none p-8 md:p-10
                                hover:border-purple-500/50
                                transition-all duration-500 group relative overflow-hidden"
                >
                  <div
                    className="absolute top-0 left-0 w-2 h-full"
                    style={{ background: exp.color || '#7C3AED' }}
                  />

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                    <div>
                      <h3 className="text-3xl font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                        {exp.role}
                      </h3>
                      <p className="text-xl text-purple-600 dark:text-purple-400 mt-1.5 font-medium">
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-medium text-slate-700 dark:text-slate-300">
                        {exp.period}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        {exp.location}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                    {exp.highlights.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-1.5 h-2 w-2 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-30 pointer-events-none transition-opacity duration-500 bg-gradient-to-br from-purple-500/10 via-transparent to-purple-500/5" />
                </div>

                <div className="hidden md:block absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-purple-500 border-4 border-white dark:border-slate-950 shadow-md left-1/2 -translate-x-1/2" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 text-center">
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Each role has been a stepping stone — turning academic knowledge into
            production code, learning team dynamics, and shipping features that
            real users interact with.
          </p>

          <p className="mt-6 text-lg text-slate-500 dark:text-slate-400 italic">
            &quot;The best way to predict the future is to create it.&quot; — through
            code &amp; collaboration
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
}

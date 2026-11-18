'use client'

import React, { useEffect, useRef } from 'react';

const skills = {
  frontend: [
    { name: 'React.js', color: '#61DAFB' },
    { name: 'Next.js', color: '#94a3b8' },
    { name: 'TypeScript', color: '#3178C6' },
    { name: 'Tailwind CSS', color: '#06B6D4' },
  ],
  backend: [
    { name: 'Node.js', color: '#68A063' },
    { name: 'Express.js', color: '#94a3b8' },
    { name: 'Python', color: '#3776AB' },
    { name: 'FastAPI', color: '#009688' },
    { name: 'Django', color: '#2BA977' },
    { name: 'LangChain', color: '#00BFA5' },
  ],
  tools: [
    { name: 'AWS', color: '#FF9900' },
    { name: 'VPS', color: '#AAAAAA' },
    { name: 'MongoDB', color: '#47A248' },
    { name: 'Redis', color: '#D82C20' },
    { name: 'Docker', color: '#2496ED' },
    { name: 'Linux', color: '#FCC624' },
  ],
};

export default function Skills() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            const card = entry.target as HTMLDivElement;
            setTimeout(() => {
              card.classList.add('animate-fade-in-up');
            }, (index % 4) * 70);
            observer.unobserve(card);
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
              Skill Matrix
            </span>
          </h2>

          <p className="mt-6 text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Full-stack engineer focused on modern web, scalable backends, AI tooling, 
            and reliable cloud + infrastructure deployment.
          </p>

          <p className="mt-3 text-lg text-purple-600 dark:text-purple-400 font-medium">
            Core Stack & Technologies • Constantly evolving
          </p>
        </div>

        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="mb-16">
            <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-8 pb-3 border-b border-slate-200 dark:border-slate-700/50 uppercase tracking-wider text-center md:text-left">
              {category === 'frontend' ? 'Frontend & Frameworks' :
               category === 'backend' ? 'Backend & AI' : 'Cloud, Tools & Infrastructure'}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {items.map((skill) => (
                <div
                  key={skill.name}
                  ref={(el) => { if (el && !cardRefs.current.includes(el)) cardRefs.current.push(el); }}
                  className="relative bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-700/50 rounded-2xl shadow-md shadow-slate-200/50 dark:shadow-none p-5 md:p-6
                             hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 dark:hover:shadow-purple-900/20 hover:scale-[1.02] transition-all duration-300 group
                             opacity-0 translate-y-6"
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className="w-3.5 h-3.5 rounded-full flex-shrink-0 transition-transform duration-300 group-hover:scale-125"
                      style={{
                        backgroundColor: skill.color,
                        boxShadow: `0 0 12px ${skill.color}99`,
                      }}
                    />
                    <h4 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                      {skill.name}
                    </h4>
                  </div>

                  <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-30 pointer-events-none transition-opacity duration-500 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent blur-xl" />
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-20 text-center">
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Continuously expanding my toolkit and deepening expertise across modern web architectures, 
            cloud deployment, and emerging AI technologies.
          </p>

          <p className="mt-4 text-slate-500 dark:text-slate-400 italic">
            "Build. Break. Learn. Deploy. Repeat." 
          </p>
        </div>
      </div>
    </section>
  );
}

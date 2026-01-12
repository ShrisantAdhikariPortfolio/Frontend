
'use client'


import React, { useEffect, useRef } from 'react';

const skills = {
  frontend: [
    { name: 'React.js', level: 88, color: '#61DAFB' },
    { name: 'Next.js', level: 85, color: '#000000' },
  ],
  backend: [
    { name: 'Node.js', level: 82, color: '#68A063' },
    { name: 'Express.js', level: 92, color: '#000000' },
    { name: 'Python', level: 90, color: '#3776AB' },
    { name: 'FastAPI', level: 85, color: '#009688' },
    { name: 'Django', level: 78, color: '#103E3E' },
    { name: 'LangChain', level: 75, color: '#00BFA5' },
  ],
  tools: [
    { name: 'AWS', level: 76, color: '#FF9900' },
    { name: 'VPS', level: 72, color: '#AAAAAA' },          // Added - neutral silver/gray for VPS
    { name: 'MongoDB', level: 72, color: '#47A248' },
    { name: 'Redis', level: 68, color: '#D82C20' },
    { name: 'Docker', level: 70, color: '#2496ED' },
    { name: 'Linux', level: 82, color: '#FCC624' },
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
            const progressBar = card.querySelector('.progress-fill') as HTMLDivElement;

            // Stagger animation with delay based on index
            setTimeout(() => {
              if (progressBar) {
                progressBar.style.width = `${progressBar.dataset.width}%`;
                progressBar.style.opacity = '1';
              }
            }, index * 120); // 120ms delay between each card

            // Optional: stop observing after animation starts
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
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

          <p className="mt-6 text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed light:text-black">
            Full-stack engineer focused on modern web, scalable backends, AI tooling, 
            and reliable cloud + infrastructure deployment.
          </p>

          <p className="mt-3 text-lg text-purple-400/80 font-medium">
            January 11, 2026 • Self-assessed • Constantly evolving
          </p>
        </div>

        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="mb-16">
            <h3 className="text-2xl font-semibold text-slate-200 light:text-black/60 mb-8 pb-3 border-b border-slate-700/50 uppercase tracking-wider text-center md:text-left">
              {category === 'frontend' ? 'Frontend & Frameworks' :
               category === 'backend' ? 'Backend & AI' : 'Cloud, Tools & Infrastructure'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((skill, idx) => (
                <div
                  key={skill.name}
                  ref={(el) => { cardRefs.current.push(el); }}
                  className="relative bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 p-6
                             hover:border-purple-500/40 transition-all duration-300 group"
                >
                  <div className="flex justify-between items-baseline mb-4">
                    <h4 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors">
                      {skill.name}
                    </h4>
                    <span className="text-purple-400 light:text-white font-mono text-sm font-medium">
                      {skill.level}%
                    </span>
                  </div>

                  <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="progress-fill h-full rounded-full transition-all duration-1000 ease-out opacity-0"
                      data-width={skill.level}
                      style={{
                        width: '0%',
                        background: skill.color,
                        boxShadow: `0 0 15px ${skill.color}aa`,
                      }}
                    />
                  </div>

                  <div className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-30 pointer-events-none transition-opacity duration-500 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent blur-xl" />
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-20 text-center">
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            These are living values — growing with every late-night debugging session, 
            new deployment, and fresh experiment.
          </p>

          <p className="mt-4 text-slate-500 italic">
            "Build. Break. Learn. Deploy. Repeat." 
          </p>
        </div>
      </div>
    </section>
  );
}
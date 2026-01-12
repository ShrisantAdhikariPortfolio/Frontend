'use client'
import React, { useEffect, useRef } from 'react';

export default function Education() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target as HTMLDivElement;
            card.classList.add('animate-fade-in-up');
            observer.unobserve(card);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
              Academic Journey
            </span>
          </h2>

          <p className="mt-6 text-xl text-white light:text-black/80 max-w-3xl mx-auto leading-relaxed">
            Building a strong foundation in computer science and information technology, 
            blending theoretical knowledge with practical application in full-stack development.
          </p>

          <p className="mt-3 text-lg text-purple-400/80 font-medium">
            Pursuing excellence through continuous learning • January 2026
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div 
            ref={cardRef}
            className="relative bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 p-8 lg:p-10
                       hover:border-purple-500/40 transition-all duration-500 group
                       opacity-0 translate-y-10"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h3 className="text-3xl font-bold text-white group-hover:text-purple-300 transition-colors">
                  Bachelor&apos;s in Information Technology
                </h3>
                <p className="text-xl text-purple-400 light:text-black/60 mt-1">
                  Major in Computer Science • 5th Semester (Ongoing)
                </p>
              </div>
              <span className="text-lg text-slate-400 mt-4 md:mt-0">
                October 2023 – Present
              </span>
            </div>

            <div className="mb-6">
              <h4 className="text-2xl font-semibold text-slate-200 mb-2">
                Mahendra Multiple Campus
              </h4>
              <p className="text-lg text-white light:text-black/80">
                Ghorahi, Dang, Nepal
              </p>
            </div>

            <p className="text-lg text-white light:text-black/80 leading-relaxed">
              Focused on core concepts in software engineering, data structures, algorithms, 
              web technologies, and database systems. Actively applying coursework to real-world 
              projects in full-stack development and AI tooling.
            </p>

            <div className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-30 pointer-events-none transition-opacity duration-500 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent blur-xl" />
          </div>

          <div className="relative bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 p-8 lg:p-10
                          hover:border-purple-500/40 transition-all duration-500 group">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-purple-300 transition-colors">
                Learning Philosophy
              </h3>
              <blockquote className="text-xl italic text-white light:text-black/80 leading-relaxed border-l-4 border-purple-500 pl-6">
                &quot;Education is not just about acquiring knowledge, but igniting a passion 
                for innovation and problem-solving in the ever-evolving world of technology.&quot;
              </blockquote>
              <p className="mt-6 text-lg text-purple-400 light:text-black/60">
                - Shrisant Adhikari
              </p>
            </div>

            <div className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-30 pointer-events-none transition-opacity duration-500 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent blur-xl" />
          </div>
        </div>

        <div className="mt-20 text-center">
          <p className="text-xl text-black/80 max-w-3xl mx-auto">
            This academic path fuels my professional growth, bridging theory with hands-on 
            projects in MERN stack, cloud infrastructure, and beyond.
          </p>

          <p className="mt-4 text-slate-500 italic">
            &quot;Knowledge is power. Application is mastery.&quot;
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
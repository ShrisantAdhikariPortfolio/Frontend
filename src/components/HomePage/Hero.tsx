'use client';

import { useMemo } from 'react';
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';
import { useHero } from '@/hooks/usePortfolioData';
import { HeroData } from '@/types/portfolio';

const fallbackHero: HeroData = {
  badge: 'FULL-STACK DEVELOPER',
  name: 'Shrisant',
  lastName: 'Adhikari',
  typewriterLines: [
    'Building modern web experiences',
    'MERN & Next.js Specialist',
    'Crafting scalable full-stack solutions',
    'Currently at SB Global',
  ],
  ctaText: 'Explore My Work →',
  ctaLink: '#projects',
  secondaryCtaText: "Let's Connect",
  secondaryCtaLink: '/contact',
};

export default function Hero() {
  const { data } = useHero(fallbackHero);

  const typewriterSequence = useMemo(() => {
    const lines =
      data.typewriterLines && data.typewriterLines.length > 0
        ? data.typewriterLines
        : fallbackHero.typewriterLines;

    const seq: (string | number)[] = [];
    lines.forEach((line) => {
      seq.push(line, 2200);
    });
    return seq;
  }, [data.typewriterLines]);

  return (
    <section className="min-h-screen flex items-center relative py-20 md:py-0">
      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        <div className="max-w-4xl">
          <p className="text-purple-400 font-medium tracking-wider mb-3 uppercase">
            {data.badge || fallbackHero.badge}
          </p>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 text-slate-900 dark:text-white">
            {data.name || fallbackHero.name}
            <span className="text-purple-600 dark:text-purple-400">
              {' '}{data.lastName || fallbackHero.lastName}
            </span>
          </h1>

          <div className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-10 min-h-[3.5rem]">
            <TypeAnimation
              key={typewriterSequence.join(',')}
              sequence={typewriterSequence}
              wrapper="span"
              speed={45}
              repeat={Infinity}
            />
          </div>

          <div className="flex flex-wrap gap-5">
            <Link
              href={data.ctaLink || fallbackHero.ctaLink}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-blue-700 text-white font-medium rounded-full transition-all hover:scale-[1.03] shadow-md shadow-purple-500/20"
            >
              {data.ctaText || fallbackHero.ctaText}
            </Link>

            <Link
              href={data.secondaryCtaLink || fallbackHero.secondaryCtaLink}
              className="px-8 py-4 border border-slate-300 dark:border-slate-600 hover:border-purple-500 text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-300 rounded-full font-medium transition-all bg-white/60 dark:bg-transparent backdrop-blur-sm shadow-sm dark:shadow-none"
            >
              {data.secondaryCtaText || fallbackHero.secondaryCtaText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

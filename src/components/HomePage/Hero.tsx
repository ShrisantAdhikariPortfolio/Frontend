'use client'

import { TypeAnimation } from 'react-type-animation'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center relative py-20 md:py-0">
      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        <div className="max-w-4xl">
          <p className="text-purple-400 font-medium tracking-wider mb-3">
            FULL-STACK DEVELOPER
          </p>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 light:text-black/60">
            Shrisant
            <span className="text-purple-400">
              {' '}Adhikari
            </span>
          </h1>

          <div className="text-xl md:text-2xl text-slate-300 light:text-black mb-10 min-h-[3.5rem]">
            <TypeAnimation
              sequence={[
                'Building modern web experiences',
                2200,
                'MERN & Next.js Specialist',
                2000,
                'Crafting scalable full-stack solutions',
                2200,
                'Currently @ SB Global',
                2500,
              ]}
              wrapper="span"
              speed={45}
              repeat={Infinity}
            />
          </div>

          <div className="flex flex-wrap gap-5">
            <Link
              href="#projects"
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-blue-700 text-white font-medium rounded-full transition-all hover:scale-[1.03]"
            >
              Explore My Work →
            </Link>

            <Link
              href="/contact"
              className="px-8 py-4 border border-slate-600 hover:border-purple-500 text-slate-300 hover:text-purple-300 rounded-full font-medium transition-all"
            >
              Let's Connect
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
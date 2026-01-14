import React from 'react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Mail, 
  Globe 
} from 'lucide-react';

export default function Contact() {
  const socialLinks = [
    { 
      name: 'GitHub', 
      icon: Github, 
      href: 'https://github.com/shreesantgithuber?tab=repositories', 
      color: 'hover:text-gray-100' 
    },
    { 
      name: 'LinkedIn', 
      icon: Linkedin, 
      href: 'https://np.linkedin.com/in/shreesant-adhikari-bb667322b', 
      color: 'hover:text-blue-400' 
    },
    { 
      name: 'Twitter / X', 
      icon: Twitter, 
      href: 'https://x.com/ShreesantAdhik2', 
      color: 'hover:text-sky-400' 
    },
    { 
      name: 'Instagram', 
      icon: Instagram, 
      href: 'https://www.instagram.com/css_loverss/?igsh=MWYybnVqanQzM2ptYQ%3D%3D#', 
      color: 'hover:text-pink-500' 
    },
    { 
      name: 'Email', 
      icon: Mail, 
      href: 'mailto:shreesantadhikari4590@gmail.com', 
      color: 'hover:text-purple-400' 
    },
    { 
      name: 'Website', 
      icon: Globe, 
      href: 'https://shrisant-academy-frontend.vercel.app/', 
      color: 'hover:text-emerald-400' 
    },
  ];

  return (
    <section className="min-h-screen py-20 px-6 md:px-12 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex items-center">
      <div className="max-w-5xl mx-auto w-full">
        <div className="text-center space-y-6 md:space-y-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Let's <span className="text-purple-600 dark:text-purple-400">Connect</span>
          </h2>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Got a project in mind? Want to collaborate? Or just want to say hi?  
            I'm just one message away
          </p>

          <div className="
            relative mt-10 md:mt-14
            inline-block mx-auto
            bg-gradient-to-br from-gray-50/70 to-gray-100/50 
            dark:from-gray-900/70 dark:to-gray-800/50
            backdrop-blur-sm
            border border-gray-200/70 dark:border-gray-800/60
            
            overflow-hidden
            group
            transition-all duration-500
            hover:scale-[1.015] hover:shadow-purple-950/30
          ">
            <div className="absolute bottom-0 left-0 right-0 h-[3px] overflow-hidden pointer-events-none">
              <div className="
                absolute bottom-0 left-0 h-full 
                w-0 origin-left
                bg-gradient-to-r from-green-200 to-green-400
                group-hover:w-1/2
                transition-all duration-700 ease-out
              "/>

              <div className="
                absolute bottom-0 right-0 h-full 
                w-0 origin-right
                bg-gradient-to-r from-transparent via-purple-500 to-purple-500
                group-hover:w-1/2
                transition-all duration-700 ease-out
              "/>

              <div className="
                absolute bottom-0 left-0 h-full 
                w-0 origin-left blur-md
                bg-gradient-to-r from-purple-400/60 via-fuchsia-400/50 to-transparent
                group-hover:w-1/2
                transition-all duration-800 ease-out
              "/>

              <div className="
                absolute bottom-0 right-0 h-full 
                w-0 origin-right blur-md
                bg-gradient-to-r from-transparent via-fuchsia-400/50 to-pink-400/60
                group-hover:w-1/2
                transition-all duration-800 ease-out
              "/>
            </div>

            <div className="p-8 md:p-14">
              <div className="inline-flex flex-wrap justify-center gap-6 md:gap-12">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className={`
                      group/icon relative p-5 md:p-6
                      rounded-2xl
                      transition-all duration-300
                      hover:scale-110 hover:-translate-y-1.5
                      active:scale-95
                    `}
                  >
                    <div className="
                      absolute inset-0 rounded-2xl 
                      bg-gradient-to-br from-purple-500/10 to-pink-500/5 
                      opacity-0 group-hover/icon:opacity-100 
                      transition-opacity duration-300
                    "/>

                    <social.icon 
                      size={44} 
                      strokeWidth={1.6}
                      className={`
                        relative text-gray-700 dark:text-gray-300 
                        ${social.color}
                        transition-colors duration-300
                      `}
                    />

                    <span className="
                      absolute -bottom-12 left-1/2 -translate-x-1/2 
                      text-sm font-medium px-4 py-2 rounded-lg
                      bg-gray-900/95 text-white
                      opacity-0 group-hover/icon:opacity-100 
                      transition-all duration-300 scale-95 group-hover/icon:scale-100
                      pointer-events-none whitespace-nowrap
                      border border-gray-700/50 shadow-lg
                    ">
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <p className="text-gray-500 dark:text-gray-500 text-sm md:text-base pt-10">
            Currently open for freelance & interesting opportunities<br />
            (React • Next.js • TypeScript • UI/UX)
          </p>
        </div>
      </div>
    </section>
  );
}
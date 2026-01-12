
// 'use client';

// import React from 'react';
// import Image from 'next/image';
// import { useTheme } from 'next-themes';

// const Sidebar: React.FC = () => {
//   const { theme, setTheme } = useTheme();

//   const navItems = [
//     { label: 'Home', href: '/' },
//     // { label: 'About', href: '/about' },
//     // { label: 'Services', href: '/services' },
//     { label: 'Skills', href: '/skills' },
//     { label: 'Education', href: '/education' },
//     { label: 'Experience', href: '/experience' },
//     { label: 'Resume / CV', href: '/resume' },
//     { label: 'Blog', href: '#blog' },
//     { label: 'Contact', href: '/contact' },
//   ];

//   return (
//     <aside className="fixed top-0 left-0 h-screen w-64 bg-background text-foreground border-r border-border p-6 flex flex-col justify-between transition-colors duration-300">
//       <div className="text-center">
//         <Image
//           src="/shrisat.png"
//           alt="Shrisant Adhikari"
//           width={100}
//           height={100}
//           className="rounded-full mx-auto mb-3"
//         />
//         <h2 className="text-xl font-bold">
//           Shrisant Adhikari
//         </h2>
//         <p className="text-sm text-muted-foreground">Full Stack Developer</p>
//         <p className="text-sm text-muted-foreground">Kathmandu-Paknajol</p>
//       </div>

//       <nav className="mt-8">
//         <ul className="space-y-4">
//           {navItems.map((item, index) => (
//             <li key={item.href}>
//               <a
//                 href={item.href}
//                 className={`block transition-colors hover:text-primary ${
//                   index === 0 ? 'text-primary' : ''
//                 }`}
//               >
//                 {item.label}
//               </a>
//             </li>
//           ))}
//         </ul>
//       </nav>

//       <div className="mt-6">
//         <label className="block text-xs mb-1 text-muted-foreground">
//           Theme
//         </label>
//         <select
//           value={theme}
//           onChange={(e) => setTheme(e.target.value)}
//           className="w-full bg-background text-foreground border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
//         >
//           <option value="light">Light</option>
//           <option value="dark">Dark</option>
//           <option value="high-contrast">High Contrast</option>
//         </select>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;







'use client';

import React from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';

const Sidebar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Skills', href: '/skills' },
    { label: 'Education', href: '/education' },
    { label: 'Experience', href: '/experience' },
    { label: 'Resume / CV', href: '/resume' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-background text-foreground border-r border-border p-6 flex flex-col justify-between transition-colors duration-300 z-50">
      {/* Profile Section */}
      <div className="text-center">
        <div className="relative mx-auto mb-4 w-28 h-28">
          <Image
            src="/shrisat.png"
            alt="Shrisant Adhikari"
            fill
            className="rounded-full object-cover border-4 border-background shadow-lg"
          />
        </div>
        <h2 className="text-xl font-bold tracking-tight">Shrisant Adhikari</h2>
        <p className="text-sm text-muted-foreground mt-1">Full Stack Developer</p>
        <p className="text-xs text-muted-foreground mt-1">Kathmandu, Nepal</p>
      </div>

      {/* Navigation */}
      <nav className="mt-10 flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = 
              (item.href === '/' && pathname === '/') ||
              (item.href !== '/' && pathname.startsWith(item.href));

            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`
                    group relative block px-4 py-3 rounded-xl text-sm font-medium
                    transition-all duration-300
                    ${isActive 
                      ? 'bg-purple-600 text-white shadow-md' 
                      : 'text-foreground/80 hover:text-foreground'
                    }
                  `}
                >
                  {/* Bottom line animation - appears on hover when NOT active */}
                  {!isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] overflow-hidden pointer-events-none">
                      <span className="
                        absolute bottom-0 left-0 h-full w-0 origin-left 
                        bg-gradient-to-r from-purple-500 via-purple-300 to-transparent
                        group-hover:w-1/2 transition-all duration-600 ease-out
                      "/>
                      <span className="
                        absolute bottom-0 right-0 h-full w-0 origin-right 
                        bg-gradient-to-r from-transparent via-fuchsia-500 to-pink-500
                        group-hover:w-1/2 transition-all duration-600 ease-out
                      "/>
                      {/* Subtle glow */}
                      <span className="
                        absolute bottom-0 left-0 h-full w-0 origin-left blur-sm 
                        bg-gradient-to-r from-purple-400/60 via-fuchsia-400/50 to-transparent
                        group-hover:w-1/2 transition-all duration-700 ease-out
                      "/>
                      <span className="
                        absolute bottom-0 right-0 h-full w-0 origin-right blur-sm 
                        bg-gradient-to-r from-transparent via-fuchsia-400/50 to-pink-400/60
                        group-hover:w-1/2 transition-all duration-700 ease-out
                      "/>
                    </span>
                  )}

                  {/* Content */}
                  <span className="relative z-10">
                    {item.label}
                  </span>

                  {/* Active indicator dot */}
                  {isActive && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/90 shadow-sm" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Theme Switcher */}
      <div className="mt-8">
        <label className="block text-xs mb-2 text-muted-foreground font-medium">
          Theme
        </label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="
            w-full bg-background/80 text-foreground 
            border border-border rounded-lg px-3 py-2.5 text-sm
            focus:outline-none focus:ring-2 focus:ring-purple-500/40
            transition-all duration-200
          "
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="high-contrast">High Contrast</option>
          <option value="system">System</option>
        </select>
      </div>
    </aside>
  );
};

export default Sidebar;
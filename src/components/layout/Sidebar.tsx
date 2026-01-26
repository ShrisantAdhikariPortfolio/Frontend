
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X } from 'lucide-react'; 

const Sidebar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

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
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-purple-600 text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-background text-foreground border-r border-border p-6 flex flex-col justify-between transition-transform duration-300 z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        <div className="text-center">
          <div className="relative mx-auto mb-4 w-28 h-28">
            <Image
              src="/shrisant.png"
              alt="Shrisant Adhikari"
              fill
              className="rounded-full border-4 border-background shadow-lg object-contain"
            />
          </div>
          <h2 className="text-xl font-bold tracking-tight">Shrisant Adhikari</h2>
          <p className="text-sm text-muted-foreground mt-1">Full Stack Developer</p>
          <p className="text-xs text-muted-foreground mt-1">Kathmandu, Nepal</p>
        </div>

        <nav className="mt-10 flex-1">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive =
                (item.href === '/' && pathname === '/') ||
                (item.href !== '/' && pathname.startsWith(item.href));

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
                      group relative block px-4 py-3 text-sm font-medium
                      transition-all duration-300
                      ${isActive 
                        ? 'bg-purple-600 text-white' 
                        : 'text-foreground/80 hover:text-foreground'
                      }
                    `}
                    onClick={() => setIsOpen(false)} // close sidebar on mobile after click
                  >
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

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
    </>
  );
};

export default Sidebar;

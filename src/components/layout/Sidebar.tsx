
'use client';

import React from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

const Sidebar: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const navItems = [
    { label: 'Home', href: '/' },
    // { label: 'About', href: '/about' },
    // { label: 'Services', href: '/services' },
    { label: 'Skills', href: '/skills' },
    { label: 'Education', href: '/education' },
    { label: 'Experience', href: '/experience' },
    { label: 'Work', href: '#work' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-background text-foreground border-r border-border p-6 flex flex-col justify-between transition-colors duration-300">
      <div className="text-center">
        <Image
          src="/shrisat.png"
          alt="Shrisant Adhikari"
          width={100}
          height={100}
          className="rounded-full mx-auto mb-3"
        />
        <h2 className="text-xl font-bold">
          Shrisant Adhikari
        </h2>
        <p className="text-sm text-muted-foreground">Full Stack Developer</p>
        <p className="text-sm text-muted-foreground">Kathmandu-Paknajol</p>
      </div>

      <nav className="mt-8">
        <ul className="space-y-4">
          {navItems.map((item, index) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`block transition-colors hover:text-primary ${
                  index === 0 ? 'text-primary' : ''
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-6">
        <label className="block text-xs mb-1 text-muted-foreground">
          Theme
        </label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="w-full bg-background text-foreground border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="high-contrast">High Contrast</option>
        </select>
      </div>
    </aside>
  );
};

export default Sidebar;

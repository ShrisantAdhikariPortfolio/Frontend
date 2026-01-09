'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image'; 

const Sidebar: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }
    setDarkMode(!darkMode);
  };

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Skills', href: '#skills' },
    { label: 'Education', href: '#education' },
    { label: 'Experience', href: '#experience' },
    { label: 'Work', href: '#work' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-white dark:bg-gray-900 p-6 flex flex-col justify-between transition-colors">
      <div className="text-center">
        <Image
          src="/profile-pic.jpg" 
          alt="Your Name"
          width={100}
          height={100}
          className="rounded-full mx-auto mb-2"
        />
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Shrisant Adhikari</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">Full Stack</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">IN YOUR LOCATION</p>
      </div>

      <nav className="mt-8">
        <ul className="space-y-4">
          {navItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                className={`text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 ${index === 0 ? 'text-blue-500 dark:text-blue-400' : ''}`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="text-center">
        <button
          onClick={toggleDarkMode}
          className="mb-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-full"
        >
          {darkMode ? 'Light' : 'Dark'} Mode
        </button>
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2026 All rights reserved</p>
      </div>
    </aside>
  );
};

export default Sidebar;
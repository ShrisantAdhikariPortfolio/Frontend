'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Sparkles,
  FolderGit2,
  Briefcase,
  GraduationCap,
  Mail,
  Newspaper,
  ExternalLink,
  LogOut,
} from 'lucide-react';

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { label: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Hero Section', href: '/admin/hero', icon: Sparkles },
    { label: 'Projects', href: '/admin/projects', icon: FolderGit2 },
    { label: 'Experience', href: '/admin/experience', icon: Briefcase },
    { label: 'Education', href: '/admin/education', icon: GraduationCap },
    { label: 'Contact', href: '/admin/contact', icon: Mail },
    { label: 'Blog Posts', href: '/admin/blogs', icon: Newspaper },
  ];

  const handleLogout = async () => {
    try {
      await fetch('/api/auth', { method: 'DELETE' });
      router.push('/admin');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <header className="mb-8 pb-6 border-b border-border/80">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 font-semibold text-xs rounded-full border border-purple-500/20">
              Admin CMS
            </span>
            <span className="text-xs text-muted-foreground">MongoDB Connected</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mt-1 text-slate-900 dark:text-white">
            Portfolio <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">Management</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-border hover:border-purple-500 text-foreground/80 hover:text-foreground rounded-xl bg-background/50 hover:bg-muted/50 transition-colors"
          >
            <span>View Site</span>
            <ExternalLink size={16} />
          </Link>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <nav className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {navLinks.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200
                ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-500/25'
                    : 'bg-white/40 dark:bg-slate-900/40 text-muted-foreground hover:text-foreground hover:bg-white/80 dark:hover:bg-slate-800/80 border border-border/50'
                }
              `}
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminNav from '@/components/admin/AdminNav';
import {
  Sparkles,
  FolderGit2,
  Briefcase,
  GraduationCap,
  Mail,
  Newspaper,
  Plus,
  ArrowRight,
  Database,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    projectsCount: 0,
    featuredCount: 0,
    experienceCount: 0,
    educationCount: 0,
    blogsCount: 0,
    socialLinksCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [projRes, expRes, eduRes, blogRes, contactRes] = await Promise.all([
          fetch('/api/projects').then((r) => r.json()),
          fetch('/api/experience').then((r) => r.json()),
          fetch('/api/education').then((r) => r.json()),
          fetch('/api/blogs?all=true').then((r) => r.json()),
          fetch('/api/contact').then((r) => r.json()),
        ]);

        const projects = projRes?.data || [];
        const experiences = expRes?.data || [];
        const education = eduRes?.data?.items || [];
        const blogs = blogRes?.data || [];
        const socialLinks = contactRes?.data?.socialLinks || [];

        setStats({
          projectsCount: projects.length,
          featuredCount: projects.filter((p: any) => p.featured).length,
          experienceCount: experiences.length,
          educationCount: education.length,
          blogsCount: blogs.length,
          socialLinksCount: socialLinks.length,
        });
      } catch (err) {
        console.error('Failed to load dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  const cards = [
    {
      title: 'Hero Section',
      subtitle: 'Greeting, Typewriter & CTAs',
      count: 'Configured',
      href: '/admin/hero',
      icon: Sparkles,
      color: 'text-purple-400',
      actionLabel: 'Edit Hero',
    },
    {
      title: 'Projects',
      subtitle: `${stats.featuredCount} Featured Projects`,
      count: `${stats.projectsCount} total`,
      href: '/admin/projects',
      icon: FolderGit2,
      color: 'text-blue-400',
      actionLabel: 'Manage Projects',
    },
    {
      title: 'Experience',
      subtitle: 'Career timeline & roles',
      count: `${stats.experienceCount} entries`,
      href: '/admin/experience',
      icon: Briefcase,
      color: 'text-emerald-400',
      actionLabel: 'Manage Roles',
    },
    {
      title: 'Education',
      subtitle: 'Degrees & Philosophy quote',
      count: `${stats.educationCount} entries`,
      href: '/admin/education',
      icon: GraduationCap,
      color: 'text-amber-400',
      actionLabel: 'Manage Education',
    },
    {
      title: 'Blog Posts',
      subtitle: 'Articles & tutorials',
      count: `${stats.blogsCount} articles`,
      href: '/admin/blogs',
      icon: Newspaper,
      color: 'text-fuchsia-400',
      actionLabel: 'Manage Articles',
    },
    {
      title: 'Contact & Links',
      subtitle: 'Social profiles & info',
      count: `${stats.socialLinksCount} channels`,
      href: '/admin/contact',
      icon: Mail,
      color: 'text-rose-400',
      actionLabel: 'Edit Contact',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-8">
      <AdminNav />

      {/* Hero Welcome banner */}
      <div className="relative mb-10 overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900/30 via-slate-900/60 to-purple-950/40 border border-purple-500/20 p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400 mb-2">
              <Database size={14} />
              <span>Full-Stack Content Management System</span>
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Welcome back, Shrisant
            </h2>
            <p className="text-slate-300 mt-2 max-w-xl text-sm leading-relaxed">
              Manage all content across your portfolio. Changes save directly to
              MongoDB and instantly update live on your website, with fallback
              safeguards.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/projects"
              className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium rounded-xl text-sm transition-all shadow-md shadow-purple-500/20 inline-flex items-center gap-2"
            >
              <Plus size={16} />
              <span>Add Project</span>
            </Link>
            <Link
              href="/admin/blogs"
              className="px-5 py-2.5 border border-slate-700 hover:border-purple-500 text-white font-medium rounded-xl text-sm transition-all bg-slate-900/40 inline-flex items-center gap-2"
            >
              <Plus size={16} />
              <span>New Article</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Grid of Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="group bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-none hover:border-purple-500/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-purple-500/10 ${card.color}`}>
                    <Icon size={22} />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {loading ? '...' : card.count}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-purple-400 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 mb-6">
                  {card.subtitle}
                </p>
              </div>

              <Link
                href={card.href}
                className="inline-flex items-center justify-between w-full pt-4 border-t border-border/60 text-sm font-medium text-purple-600 dark:text-purple-400 group-hover:text-purple-500 transition-colors"
              >
                <span>{card.actionLabel}</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

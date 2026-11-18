'use client';

import React, { useState, useEffect } from 'react';
import AdminNav from '@/components/admin/AdminNav';
import { HeroData } from '@/types/portfolio';
import { Sparkles, Save, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AdminHeroPage() {
  const [formData, setFormData] = useState<HeroData>({
    badge: 'FULL-STACK DEVELOPER',
    name: 'Shrisant',
    lastName: 'Adhikari',
    typewriterLines: [],
    ctaText: 'Explore My Work →',
    ctaLink: '#projects',
    secondaryCtaText: "Let's Connect",
    secondaryCtaLink: '/contact',
  });
  const [typewriterText, setTypewriterText] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    fetch('/api/hero')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setFormData(json.data);
          setTypewriterText((json.data.typewriterLines || []).join('\n'));
        }
      })
      .catch((err) => console.error('Error fetching hero:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);

    const lines = typewriterText
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);

    const payload: HeroData = {
      ...formData,
      typewriterLines: lines,
    };

    try {
      const res = await fetch('/api/hero', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setFormData(json.data);
        setStatus({ type: 'success', message: 'Hero section updated successfully!' });
      } else {
        setStatus({ type: 'error', message: json.error || 'Failed to update hero section' });
      }
    } catch {
      setStatus({ type: 'error', message: 'Network error occurred while saving' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <AdminNav />
        <div className="text-center py-12 text-muted-foreground animate-pulse text-sm">
          Loading Hero configuration...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <AdminNav />

      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="text-purple-400" size={24} />
            <span>Hero Section Editor</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Customize the main banner text, animated typewriter lines, and primary call-to-actions.
          </p>
        </div>
      </div>

      {status && (
        <div
          className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm border ${
            status.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border-emerald-500/30'
              : 'bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 border-red-500/30'
          }`}
        >
          {status.type === 'success' ? (
            <CheckCircle2 size={18} />
          ) : (
            <AlertCircle size={18} />
          )}
          <span>{status.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Badge / Tagline
              </label>
              <input
                type="text"
                value={formData.badge}
                onChange={(e) =>
                  setFormData({ ...formData, badge: e.target.value })
                }
                required
                className="w-full bg-background border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                First Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="w-full bg-background border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Last Name (Accent Color)
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                required
                className="w-full bg-background border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Typewriter Lines (One sentence per line)
            </label>
            <textarea
              rows={5}
              value={typewriterText}
              onChange={(e) => setTypewriterText(e.target.value)}
              placeholder="Building modern web experiences&#10;MERN & Next.js Specialist&#10;Crafting scalable full-stack solutions"
              className="w-full bg-background border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50 leading-relaxed"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Each line will cycle automatically in the animated typewriter text on the homepage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border/80">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Primary Button Label
              </label>
              <input
                type="text"
                value={formData.ctaText}
                onChange={(e) =>
                  setFormData({ ...formData, ctaText: e.target.value })
                }
                className="w-full bg-background border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50 mb-4"
              />

              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Primary Button Link
              </label>
              <input
                type="text"
                value={formData.ctaLink}
                onChange={(e) =>
                  setFormData({ ...formData, ctaLink: e.target.value })
                }
                className="w-full bg-background border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Secondary Button Label
              </label>
              <input
                type="text"
                value={formData.secondaryCtaText}
                onChange={(e) =>
                  setFormData({ ...formData, secondaryCtaText: e.target.value })
                }
                className="w-full bg-background border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50 mb-4"
              />

              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Secondary Button Link
              </label>
              <input
                type="text"
                value={formData.secondaryCtaLink}
                onChange={(e) =>
                  setFormData({ ...formData, secondaryCtaLink: e.target.value })
                }
                className="w-full bg-background border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3.5 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium rounded-xl transition-all shadow-md shadow-purple-500/20 inline-flex items-center gap-2 disabled:opacity-50"
          >
            <Save size={18} />
            <span>{saving ? 'Saving changes...' : 'Save Hero Section'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

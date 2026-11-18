'use client';

import React, { useState, useEffect } from 'react';
import AdminNav from '@/components/admin/AdminNav';
import { ExperienceItem } from '@/types/portfolio';
import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export default function AdminExperiencePage() {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingExp, setEditingExp] = useState<Partial<ExperienceItem> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [highlightsText, setHighlightsText] = useState('');
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/experience');
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setExperiences(json.data);
      }
    } catch (err) {
      console.error('Failed to fetch experiences:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleOpenCreate = () => {
    setIsNew(true);
    setHighlightsText('Collaborated in full-stack engineering and API delivery\nDeployed performant production features');
    setEditingExp({
      role: '',
      company: '',
      location: 'Kathmandu, Nepal',
      period: '2025 – Present',
      color: '#00D4FF',
      highlights: [],
    });
  };

  const handleOpenEdit = (exp: ExperienceItem) => {
    setIsNew(false);
    setEditingExp({ ...exp });
    setHighlightsText((exp.highlights || []).join('\n'));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp) return;

    setSaving(true);
    setStatus(null);

    const highlights = highlightsText
      .split('\n')
      .map((h) => h.trim())
      .filter(Boolean);

    const payload = {
      ...editingExp,
      highlights,
    };

    try {
      const url = isNew
        ? '/api/experience'
        : `/api/experience/${editingExp.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setStatus({
          type: 'success',
          message: isNew ? 'Experience added successfully!' : 'Experience updated successfully!',
        });
        setEditingExp(null);
        await fetchExperiences();
      } else {
        setStatus({ type: 'error', message: json.error || 'Failed to save experience' });
      }
    } catch {
      setStatus({ type: 'error', message: 'Network error occurred' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, role: string) => {
    if (!window.confirm(`Delete experience entry for "${role}"?`)) return;

    try {
      const res = await fetch(`/api/experience/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setStatus({ type: 'success', message: 'Experience deleted successfully' });
        await fetchExperiences();
      } else {
        setStatus({ type: 'error', message: 'Failed to delete experience' });
      }
    } catch {
      setStatus({ type: 'error', message: 'Network error occurred' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <AdminNav />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Briefcase className="text-purple-400" size={24} />
            <span>Professional Experience Manager</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your career history, companies, timelines, and key achievement bullet points.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium rounded-xl text-sm transition-all shadow-md shadow-purple-500/20 inline-flex items-center gap-2 self-start"
        >
          <Plus size={16} />
          <span>Add Experience</span>
        </button>
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

      {loading ? (
        <div className="text-center py-12 text-muted-foreground animate-pulse text-sm">
          Loading experiences from database...
        </div>
      ) : experiences.length === 0 ? (
        <div className="text-center py-16 bg-white/40 dark:bg-slate-900/40 rounded-2xl border border-dashed border-border">
          <p className="text-muted-foreground text-sm">No experience entries found.</p>
          <button
            onClick={handleOpenCreate}
            className="mt-4 text-sm text-purple-400 hover:underline inline-flex items-center gap-1"
          >
            Add your first role →
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col md:flex-row md:items-start justify-between gap-6 relative overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 w-2 h-full"
                style={{ background: exp.color || '#7C3AED' }}
              />

              <div className="flex-1 pl-2">
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {exp.role}
                  </h3>
                  <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                    @{exp.company}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-4">
                  <span>{exp.period}</span>
                  {exp.location && <span>• {exp.location}</span>}
                </div>

                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {(exp.highlights || []).map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-purple-400 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-2 self-end md:self-start shrink-0">
                <button
                  onClick={() => handleOpenEdit(exp)}
                  className="p-2 text-slate-600 dark:text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(exp.id, exp.role)}
                  className="p-2 text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit/Create Modal */}
      {editingExp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                {isNew ? 'Add Experience Role' : 'Edit Experience'}
              </h3>
              <button
                onClick={() => setEditingExp(null)}
                className="p-1 text-muted-foreground hover:text-foreground rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Job Role / Title
                  </label>
                  <input
                    type="text"
                    required
                    value={editingExp.role || ''}
                    onChange={(e) =>
                      setEditingExp({ ...editingExp, role: e.target.value })
                    }
                    placeholder="Fullstack Developer"
                    className="w-full bg-background border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Company Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editingExp.company || ''}
                    onChange={(e) =>
                      setEditingExp({ ...editingExp, company: e.target.value })
                    }
                    placeholder="SB Global"
                    className="w-full bg-background border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Period
                  </label>
                  <input
                    type="text"
                    required
                    value={editingExp.period || ''}
                    onChange={(e) =>
                      setEditingExp({ ...editingExp, period: e.target.value })
                    }
                    placeholder="October 2025 – Present"
                    className="w-full bg-background border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editingExp.location || ''}
                    onChange={(e) =>
                      setEditingExp({ ...editingExp, location: e.target.value })
                    }
                    placeholder="Kathmandu - Paknajol"
                    className="w-full bg-background border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Accent Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={editingExp.color || '#00D4FF'}
                    onChange={(e) =>
                      setEditingExp({ ...editingExp, color: e.target.value })
                    }
                    className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={editingExp.color || '#00D4FF'}
                    onChange={(e) =>
                      setEditingExp({ ...editingExp, color: e.target.value })
                    }
                    className="flex-1 bg-background border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Highlights &amp; Contributions (One point per line)
                </label>
                <textarea
                  rows={5}
                  value={highlightsText}
                  onChange={(e) => setHighlightsText(e.target.value)}
                  placeholder="Developed and deployed SBGlobalVenture.com&#10;Contributed to DragonCharterServices.com&#10;Built Trekking Exploration web app"
                  className="w-full bg-background border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50 leading-relaxed"
                />
              </div>

              <div className="pt-4 border-t border-border flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingExp(null)}
                  className="px-5 py-2.5 border border-border text-foreground hover:bg-muted/50 rounded-xl text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium rounded-xl text-sm transition-all shadow-md shadow-purple-500/20 inline-flex items-center gap-2 disabled:opacity-50"
                >
                  <Save size={16} />
                  <span>{saving ? 'Saving...' : 'Save Experience'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import AdminNav from '@/components/admin/AdminNav';
import { EducationData, EducationEntry } from '@/types/portfolio';
import {
  GraduationCap,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  CheckCircle2,
  AlertCircle,
  Quote,
} from 'lucide-react';

export default function AdminEducationPage() {
  const [eduData, setEduData] = useState<EducationData>({
    subheading: '',
    items: [],
    philosophy: { quote: '', author: '' },
  });
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Partial<EducationEntry> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [savingItem, setSavingItem] = useState(false);
  const [savingMeta, setSavingMeta] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fetchEducation = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/education');
      const json = await res.json();
      if (json.success && json.data) {
        setEduData(json.data);
      }
    } catch (err) {
      console.error('Failed to fetch education:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const handleOpenCreate = () => {
    setIsNew(true);
    setEditingItem({
      degree: "Bachelor's in Information Technology",
      major: 'Major in Computer Science',
      institution: 'Mahendra Multiple Campus',
      location: 'Ghorahi, Dang, Nepal',
      period: 'October 2023 – Present',
      description: '',
    });
  };

  const handleOpenEdit = (item: EducationEntry) => {
    setIsNew(false);
    setEditingItem({ ...item });
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setSavingItem(true);
    setStatus(null);

    try {
      const url = isNew
        ? '/api/education'
        : `/api/education/${editingItem.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setStatus({
          type: 'success',
          message: isNew ? 'Education item added!' : 'Education item updated!',
        });
        setEditingItem(null);
        await fetchEducation();
      } else {
        setStatus({ type: 'error', message: json.error || 'Failed to save item' });
      }
    } catch {
      setStatus({ type: 'error', message: 'Network error occurred' });
    } finally {
      setSavingItem(false);
    }
  };

  const handleDeleteItem = async (id: string, degree: string) => {
    if (!window.confirm(`Delete education entry for "${degree}"?`)) return;

    try {
      const res = await fetch(`/api/education/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setStatus({ type: 'success', message: 'Education entry deleted' });
        await fetchEducation();
      } else {
        setStatus({ type: 'error', message: 'Failed to delete entry' });
      }
    } catch {
      setStatus({ type: 'error', message: 'Network error occurred' });
    }
  };

  const handleSaveMeta = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingMeta(true);
    setStatus(null);

    try {
      const res = await fetch('/api/education', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subheading: eduData.subheading,
          quote: eduData.philosophy?.quote,
          author: eduData.philosophy?.author,
        }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setStatus({ type: 'success', message: 'Philosophy quote updated successfully!' });
      } else {
        setStatus({ type: 'error', message: json.error || 'Failed to update quote' });
      }
    } catch {
      setStatus({ type: 'error', message: 'Network error occurred' });
    } finally {
      setSavingMeta(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <AdminNav />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <GraduationCap className="text-purple-400" size={24} />
            <span>Academic &amp; Education Manager</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your degrees, academic institutions, and personal learning philosophy quote.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium rounded-xl text-sm transition-all shadow-md shadow-purple-500/20 inline-flex items-center gap-2 self-start"
        >
          <Plus size={16} />
          <span>Add Education</span>
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

      {/* Philosophy Editor card */}
      <div className="mb-10 bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-none">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Quote className="text-purple-400" size={18} />
          <span>Learning Philosophy &amp; Header Settings</span>
        </h3>

        <form onSubmit={handleSaveMeta} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              Section Subheading
            </label>
            <input
              type="text"
              value={eduData.subheading || ''}
              onChange={(e) =>
                setEduData({ ...eduData, subheading: e.target.value })
              }
              className="w-full bg-background border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                Philosophy Quote
              </label>
              <textarea
                rows={2}
                value={eduData.philosophy?.quote || ''}
                onChange={(e) =>
                  setEduData({
                    ...eduData,
                    philosophy: {
                      ...eduData.philosophy,
                      quote: e.target.value,
                    },
                  })
                }
                className="w-full bg-background border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                Author
              </label>
              <input
                type="text"
                value={eduData.philosophy?.author || ''}
                onChange={(e) =>
                  setEduData({
                    ...eduData,
                    philosophy: {
                      ...eduData.philosophy,
                      author: e.target.value,
                    },
                  })
                }
                className="w-full bg-background border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50 mb-3"
              />

              <button
                type="submit"
                disabled={savingMeta}
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl text-xs transition-colors inline-flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                <Save size={14} />
                <span>{savingMeta ? 'Saving...' : 'Update Quote'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Education entries list */}
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
        Degrees &amp; Formal Programs
      </h3>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground animate-pulse text-sm">
          Loading education items from database...
        </div>
      ) : (eduData.items || []).length === 0 ? (
        <div className="text-center py-16 bg-white/40 dark:bg-slate-900/40 rounded-2xl border border-dashed border-border">
          <p className="text-muted-foreground text-sm">No education items found.</p>
          <button
            onClick={handleOpenCreate}
            className="mt-4 text-sm text-purple-400 hover:underline inline-flex items-center gap-1"
          >
            Add your degree →
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(eduData.items || []).map((item) => (
            <div
              key={item.id}
              className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                      {item.degree}
                    </h4>
                    {item.major && (
                      <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                        {item.major}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {item.period}
                  </span>
                </div>

                <div className="mb-3 text-xs text-slate-700 dark:text-slate-300">
                  <span className="font-semibold">{item.institution}</span>
                  {item.location && <span> — {item.location}</span>}
                </div>

                <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-border flex justify-end gap-2">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-1.5 text-slate-600 dark:text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDeleteItem(item.id, item.degree)}
                  className="p-1.5 text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
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
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                {isNew ? 'Add Education Entry' : 'Edit Education Entry'}
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1 text-muted-foreground hover:text-foreground rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="p-6 space-y-4 overflow-y-auto">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Degree Title
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.degree || ''}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, degree: e.target.value })
                  }
                  className="w-full bg-background border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Major / Subtitle
                </label>
                <input
                  type="text"
                  value={editingItem.major || ''}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, major: e.target.value })
                  }
                  placeholder="Major in Computer Science • 5th Semester"
                  className="w-full bg-background border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Institution
                  </label>
                  <input
                    type="text"
                    value={editingItem.institution || ''}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        institution: e.target.value,
                      })
                    }
                    className="w-full bg-background border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editingItem.location || ''}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        location: e.target.value,
                      })
                    }
                    className="w-full bg-background border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Period / Timeline
                </label>
                <input
                  type="text"
                  value={editingItem.period || ''}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, period: e.target.value })
                  }
                  placeholder="October 2023 – Present"
                  className="w-full bg-background border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={editingItem.description || ''}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      description: e.target.value,
                    })
                  }
                  className="w-full bg-background border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50 leading-relaxed"
                />
              </div>

              <div className="pt-4 border-t border-border flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-5 py-2.5 border border-border text-foreground hover:bg-muted/50 rounded-xl text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingItem}
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium rounded-xl text-sm transition-all shadow-md shadow-purple-500/20 inline-flex items-center gap-2 disabled:opacity-50"
                >
                  <Save size={16} />
                  <span>{savingItem ? 'Saving...' : 'Save Entry'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import AdminNav from '@/components/admin/AdminNav';
import { Project } from '@/types/portfolio';
import {
  FolderGit2,
  Plus,
  Edit2,
  Trash2,
  Star,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  X,
  Save,
} from 'lucide-react';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [tagsInput, setTagsInput] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/projects');
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setProjects(json.data);
      }
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenCreate = () => {
    setIsNew(true);
    setTagsInput('Next.js, TypeScript, Tailwind CSS');
    setEditingProject({
      title: '',
      description: '',
      link: '',
      github: '',
      image: '/kbc.png',
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      color: '#00D4FF',
      featured: true,
    });
  };

  const handleOpenEdit = (project: Project) => {
    setIsNew(false);
    setEditingProject({ ...project });
    setTagsInput((project.tags || []).join(', '));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    setSaving(true);
    setStatus(null);

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      ...editingProject,
      tags,
    };

    try {
      const url = isNew
        ? '/api/projects'
        : `/api/projects/${editingProject.id}`;
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
          message: isNew ? 'Project created successfully!' : 'Project updated successfully!',
        });
        setEditingProject(null);
        await fetchProjects();
      } else {
        setStatus({ type: 'error', message: json.error || 'Operation failed' });
      }
    } catch {
      setStatus({ type: 'error', message: 'Network error occurred' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setStatus({ type: 'success', message: 'Project deleted successfully' });
        await fetchProjects();
      } else {
        setStatus({ type: 'error', message: 'Failed to delete project' });
      }
    } catch {
      setStatus({ type: 'error', message: 'Network error occurred' });
    }
  };

  const handleToggleFeatured = async (project: Project) => {
    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !project.featured }),
      });
      if (res.ok) {
        setProjects((prev) =>
          prev.map((p) =>
            p.id === project.id ? { ...p, featured: !p.featured } : p
          )
        );
      }
    } catch (err) {
      console.error('Error toggling featured:', err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <AdminNav />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <FolderGit2 className="text-purple-400" size={24} />
            <span>Projects Management</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your portfolio projects, tags, links, and featured items displayed on the homepage.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium rounded-xl text-sm transition-all shadow-md shadow-purple-500/20 inline-flex items-center gap-2 self-start"
        >
          <Plus size={16} />
          <span>Add New Project</span>
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

      {/* Projects List */}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground animate-pulse text-sm">
          Loading projects from database...
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-16 bg-white/40 dark:bg-slate-900/40 rounded-2xl border border-dashed border-border">
          <p className="text-muted-foreground text-sm">No projects found.</p>
          <button
            onClick={handleOpenCreate}
            className="mt-4 text-sm text-purple-400 hover:underline inline-flex items-center gap-1"
          >
            Create your first project →
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video overflow-hidden bg-slate-950">
                  <img
                    src={project.image || '/kbc.png'}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute top-3 left-3 w-3 h-3 rounded-full"
                    style={{ background: project.color }}
                  />
                  <button
                    onClick={() => handleToggleFeatured(project)}
                    title={project.featured ? 'Featured on Home' : 'Not featured'}
                    className={`absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-md transition-all ${
                      project.featured
                        ? 'bg-amber-500/90 text-white'
                        : 'bg-black/40 text-white/50 hover:text-white'
                    }`}
                  >
                    <Star size={14} fill={project.featured ? 'currentColor' : 'none'} />
                  </button>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {(project.tags || []).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[11px] bg-purple-50 dark:bg-slate-800 text-purple-700 dark:text-purple-400 rounded-md border border-purple-200/50 dark:border-slate-700/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50/50 dark:bg-slate-950/40 border-t border-border/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-muted-foreground hover:text-purple-400 transition-colors inline-flex items-center gap-1"
                    >
                      <ExternalLink size={12} />
                      <span>Link</span>
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(project)}
                    className="p-1.5 text-slate-600 dark:text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id, project.title)}
                    className="p-1.5 text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit/Create Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                {isNew ? 'Create New Project' : 'Edit Project'}
              </h3>
              <button
                onClick={() => setEditingProject(null)}
                className="p-1 text-muted-foreground hover:text-foreground rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Project Title
                </label>
                <input
                  type="text"
                  required
                  value={editingProject.title || ''}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, title: e.target.value })
                  }
                  className="w-full bg-background border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingProject.description || ''}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      description: e.target.value,
                    })
                  }
                  className="w-full bg-background border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Live Demo Link
                  </label>
                  <input
                    type="url"
                    value={editingProject.link || ''}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        link: e.target.value,
                      })
                    }
                    placeholder="https://..."
                    className="w-full bg-background border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    GitHub Repo Link
                  </label>
                  <input
                    type="url"
                    value={editingProject.github || ''}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        github: e.target.value,
                      })
                    }
                    placeholder="https://github.com/..."
                    className="w-full bg-background border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Thumbnail Image URL
                  </label>
                  <input
                    type="text"
                    value={editingProject.image || ''}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        image: e.target.value,
                      })
                    }
                    placeholder="/kbc.png or https://..."
                    className="w-full bg-background border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Card Accent Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={editingProject.color || '#7C3AED'}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          color: e.target.value,
                        })
                      }
                      className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0"
                    />
                    <input
                      type="text"
                      value={editingProject.color || '#7C3AED'}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          color: e.target.value,
                        })
                      }
                      className="flex-1 bg-background border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Tech Stack Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="Next.js, Tailwind CSS, TypeScript, MongoDB"
                  className="w-full bg-background border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured-checkbox"
                  checked={Boolean(editingProject.featured)}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      featured: e.target.checked,
                    })
                  }
                  className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
                />
                <label
                  htmlFor="featured-checkbox"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer"
                >
                  Feature this project on the Homepage
                </label>
              </div>

              <div className="pt-4 border-t border-border flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
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
                  <span>{saving ? 'Saving...' : 'Save Project'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

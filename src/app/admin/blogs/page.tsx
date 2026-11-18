'use client';

import React, { useState, useEffect } from 'react';
import AdminNav from '@/components/admin/AdminNav';
import { BlogPost } from '@/types/portfolio';
import {
  Newspaper,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  X,
  Save,
  Eye,
  EyeOff,
} from 'lucide-react';

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBlog, setEditingBlog] = useState<Partial<BlogPost> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [tagsInput, setTagsInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/blogs?all=true');
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setBlogs(json.data);
      }
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleOpenCreate = () => {
    setIsNew(true);
    setTagsInput('Next.js, WebDev, Architecture');
    setEditingBlog({
      title: '',
      slug: '',
      category: 'Web Development',
      date: 'Just now',
      readTime: '5 min read',
      excerpt: '',
      content: '',
      tags: ['Next.js', 'WebDev'],
      published: true,
    });
  };

  const handleOpenEdit = (blog: BlogPost) => {
    setIsNew(false);
    setEditingBlog({ ...blog });
    setTagsInput((blog.tags || []).join(', '));
  };

  const handleTitleChange = (val: string) => {
    if (!editingBlog) return;
    const updates: Partial<BlogPost> = { title: val };
    if (isNew) {
      updates.slug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }
    setEditingBlog({ ...editingBlog, ...updates });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;

    setSaving(true);
    setStatus(null);

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      ...editingBlog,
      tags,
    };

    try {
      const url = isNew ? '/api/blogs' : `/api/blogs/${editingBlog.id}`;
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
          message: isNew
            ? 'Blog article published successfully!'
            : 'Blog article updated successfully!',
        });
        setEditingBlog(null);
        await fetchBlogs();
      } else {
        setStatus({ type: 'error', message: json.error || 'Failed to save blog' });
      }
    } catch {
      setStatus({ type: 'error', message: 'Network error occurred' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete article "${title}"?`)) return;

    try {
      const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setStatus({ type: 'success', message: 'Article deleted successfully' });
        await fetchBlogs();
      } else {
        setStatus({ type: 'error', message: 'Failed to delete article' });
      }
    } catch {
      setStatus({ type: 'error', message: 'Network error occurred' });
    }
  };

  const handleTogglePublished = async (blog: BlogPost) => {
    try {
      const res = await fetch(`/api/blogs/${blog.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !blog.published }),
      });
      if (res.ok) {
        setBlogs((prev) =>
          prev.map((b) =>
            b.id === blog.id ? { ...b, published: !b.published } : b
          )
        );
      }
    } catch (err) {
      console.error('Error toggling published status:', err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <AdminNav />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Newspaper className="text-purple-400" size={24} />
            <span>Blog Articles &amp; Insights</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Write, edit, organize, and publish technical articles and personal updates.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium rounded-xl text-sm transition-all shadow-md shadow-purple-500/20 inline-flex items-center gap-2 self-start"
        >
          <Plus size={16} />
          <span>Write Article</span>
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
          Loading articles from database...
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-16 bg-white/40 dark:bg-slate-900/40 rounded-2xl border border-dashed border-border">
          <p className="text-muted-foreground text-sm">No blog articles found.</p>
          <button
            onClick={handleOpenCreate}
            className="mt-4 text-sm text-purple-400 hover:underline inline-flex items-center gap-1"
          >
            Write your first post →
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 text-xs font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-full border border-purple-500/20">
                    {blog.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {blog.readTime}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    • {blog.date}
                  </span>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                      blog.published
                        ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                    }`}
                  >
                    {blog.published ? 'Published' : 'Draft'}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {blog.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                  {blog.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {(blog.tags || []).map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border border-border/50"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                <button
                  onClick={() => handleTogglePublished(blog)}
                  className={`p-2 rounded-lg transition-colors ${
                    blog.published
                      ? 'text-emerald-500 hover:bg-emerald-500/10'
                      : 'text-muted-foreground hover:bg-slate-800'
                  }`}
                  title={blog.published ? 'Unpublish' : 'Publish'}
                >
                  {blog.published ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
                <button
                  onClick={() => handleOpenEdit(blog)}
                  className="p-2 text-slate-600 dark:text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(blog.id, blog.title)}
                  className="p-2 text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit/Create Modal */}
      {editingBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                {isNew ? 'Write New Article' : 'Edit Article'}
              </h3>
              <button
                onClick={() => setEditingBlog(null)}
                className="p-1 text-muted-foreground hover:text-foreground rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Article Title
                </label>
                <input
                  type="text"
                  required
                  value={editingBlog.title || ''}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full bg-background border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Slug
                  </label>
                  <input
                    type="text"
                    required
                    value={editingBlog.slug || ''}
                    onChange={(e) =>
                      setEditingBlog({ ...editingBlog, slug: e.target.value })
                    }
                    className="w-full bg-background border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Category
                  </label>
                  <input
                    type="text"
                    value={editingBlog.category || ''}
                    onChange={(e) =>
                      setEditingBlog({
                        ...editingBlog,
                        category: e.target.value,
                      })
                    }
                    className="w-full bg-background border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={editingBlog.readTime || ''}
                    onChange={(e) =>
                      setEditingBlog({
                        ...editingBlog,
                        readTime: e.target.value,
                      })
                    }
                    placeholder="8 min read"
                    className="w-full bg-background border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Excerpt / Summary
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingBlog.excerpt || ''}
                  onChange={(e) =>
                    setEditingBlog({ ...editingBlog, excerpt: e.target.value })
                  }
                  className="w-full bg-background border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Full Article Content (Markdown or Text)
                </label>
                <textarea
                  rows={6}
                  value={editingBlog.content || ''}
                  onChange={(e) =>
                    setEditingBlog({ ...editingBlog, content: e.target.value })
                  }
                  placeholder="Full article content goes here..."
                  className="w-full bg-background border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="React, Next.js, Architecture"
                  className="w-full bg-background border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="published-checkbox"
                  checked={Boolean(editingBlog.published)}
                  onChange={(e) =>
                    setEditingBlog({
                      ...editingBlog,
                      published: e.target.checked,
                    })
                  }
                  className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
                />
                <label
                  htmlFor="published-checkbox"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer"
                >
                  Publish this article immediately
                </label>
              </div>

              <div className="pt-4 border-t border-border flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingBlog(null)}
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
                  <span>{saving ? 'Saving...' : 'Save Article'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

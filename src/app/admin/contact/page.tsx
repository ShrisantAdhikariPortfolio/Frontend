'use client';

import React, { useState, useEffect } from 'react';
import AdminNav from '@/components/admin/AdminNav';
import { ContactData, SocialLink } from '@/types/portfolio';
import {
  Mail,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  AlertCircle,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Instagram,
} from 'lucide-react';

export default function AdminContactPage() {
  const [contact, setContact] = useState<ContactData>({
    title: "Let's",
    titleHighlight: 'Connect',
    description: '',
    footerNote: '',
    socialLinks: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    fetch('/api/contact')
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data) {
          setContact(json.data);
        }
      })
      .catch((err) => console.error('Error fetching contact:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleAddSocialLink = () => {
    const newLink: SocialLink = {
      id: Date.now().toString(),
      name: 'Custom',
      icon: 'Globe',
      href: 'https://',
      color: 'hover:text-purple-400',
    };
    setContact({
      ...contact,
      socialLinks: [...contact.socialLinks, newLink],
    });
  };

  const handleRemoveSocialLink = (index: number) => {
    const updated = contact.socialLinks.filter((_, i) => i !== index);
    setContact({ ...contact, socialLinks: updated });
  };

  const handleUpdateSocialLink = (
    index: number,
    field: keyof SocialLink,
    val: string
  ) => {
    const updated = [...contact.socialLinks];
    updated[index] = { ...updated[index], [field]: val };
    setContact({ ...contact, socialLinks: updated });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setContact(json.data);
        setStatus({
          type: 'success',
          message: 'Contact details and social links updated successfully!',
        });
      } else {
        setStatus({
          type: 'error',
          message: json.error || 'Failed to update contact info',
        });
      }
    } catch {
      setStatus({ type: 'error', message: 'Network error occurred' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <AdminNav />
        <div className="text-center py-12 text-muted-foreground animate-pulse text-sm">
          Loading contact information...
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
            <Mail className="text-purple-400" size={24} />
            <span>Contact &amp; Social Links Manager</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Update your public messaging, email, website links, and social channel handles.
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Title Prefix
              </label>
              <input
                type="text"
                value={contact.title}
                onChange={(e) =>
                  setContact({ ...contact, title: e.target.value })
                }
                className="w-full bg-background border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Title Highlight (Purple Accent)
              </label>
              <input
                type="text"
                value={contact.titleHighlight}
                onChange={(e) =>
                  setContact({ ...contact, titleHighlight: e.target.value })
                }
                className="w-full bg-background border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Description Message
            </label>
            <textarea
              rows={2}
              value={contact.description}
              onChange={(e) =>
                setContact({ ...contact, description: e.target.value })
              }
              className="w-full bg-background border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50 leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Footer Note / Availability
            </label>
            <textarea
              rows={2}
              value={contact.footerNote}
              onChange={(e) =>
                setContact({ ...contact, footerNote: e.target.value })
              }
              className="w-full bg-background border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50 leading-relaxed"
            />
          </div>

          {/* Social Links List */}
          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                  Social Channels &amp; Links
                </h3>
                <p className="text-xs text-muted-foreground">
                  Icons will automatically display with hover glow animations.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddSocialLink}
                className="px-3.5 py-1.5 text-xs font-medium bg-purple-500/10 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20 border border-purple-500/30 rounded-xl transition-colors inline-flex items-center gap-1.5"
              >
                <Plus size={14} />
                <span>Add Channel</span>
              </button>
            </div>

            <div className="space-y-3">
              {contact.socialLinks.map((link, idx) => (
                <div
                  key={link.id || idx}
                  className="flex flex-col sm:flex-row items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800"
                >
                  <div className="w-full sm:w-36">
                    <input
                      type="text"
                      value={link.name}
                      onChange={(e) =>
                        handleUpdateSocialLink(idx, 'name', e.target.value)
                      }
                      placeholder="Name (e.g. GitHub)"
                      className="w-full bg-background border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    />
                  </div>

                  <div className="w-full sm:w-28">
                    <select
                      value={link.icon.toLowerCase()}
                      onChange={(e) =>
                        handleUpdateSocialLink(idx, 'icon', e.target.value)
                      }
                      className="w-full bg-background border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    >
                      <option value="github">GitHub</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="twitter">Twitter / X</option>
                      <option value="instagram">Instagram</option>
                      <option value="mail">Email (mailto:)</option>
                      <option value="globe">Website</option>
                    </select>
                  </div>

                  <div className="w-full flex-1">
                    <input
                      type="text"
                      value={link.href}
                      onChange={(e) =>
                        handleUpdateSocialLink(idx, 'href', e.target.value)
                      }
                      placeholder="URL (e.g. https://... or mailto:...)"
                      className="w-full bg-background border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveSocialLink(idx)}
                    className="p-2 text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors shrink-0"
                    title="Remove"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
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
            <span>{saving ? 'Saving changes...' : 'Save Contact Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

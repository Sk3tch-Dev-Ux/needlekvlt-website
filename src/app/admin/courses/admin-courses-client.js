'use client';

import { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import {
  Plus, Pencil, Trash2, Save, X, Lock,
  MessageCircle, Video, Eye, EyeOff,
} from 'lucide-react';

const EMPTY_COURSE = {
  title: '',
  instructor: '',
  duration: '',
  lessons: '',
  level: 'Beginner',
  desc: '',
  videoUrl: '',
  published: true,
};

export default function AdminCoursesClient() {
  const { data: session, status } = useSession();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // course id or 'new'
  const [form, setForm] = useState(EMPTY_COURSE);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const isAdmin = session?.user?.discordId &&
    (process.env.NEXT_PUBLIC_ADMIN_DISCORD_IDS || '').split(',').map(s => s.trim()).includes(session.user.discordId);

  useEffect(() => {
    if (status === 'authenticated') fetchCourses();
  }, [status]);

  async function fetchCourses() {
    setLoading(true);
    try {
      // Admin needs all courses (including unpublished), but GET only returns published.
      // We'll use a query param the API can check, or just fetch all.
      const res = await fetch('/api/courses?all=1');
      const data = await res.json();
      setCourses(data);
    } catch {
      setError('Failed to load courses');
    }
    setLoading(false);
  }

  function startEdit(course) {
    setEditing(course.id);
    setForm({
      title: course.title,
      instructor: course.instructor,
      duration: course.duration,
      lessons: course.lessons,
      level: course.level,
      desc: course.desc,
      videoUrl: course.videoUrl || '',
      published: course.published,
    });
    setError('');
  }

  function startNew() {
    setEditing('new');
    setForm(EMPTY_COURSE);
    setError('');
  }

  function cancelEdit() {
    setEditing(null);
    setForm(EMPTY_COURSE);
    setError('');
  }

  async function handleSave() {
    if (!form.title.trim() || !form.instructor.trim()) {
      setError('Title and instructor are required.');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const isNew = editing === 'new';
      const url = isNew ? '/api/courses' : `/api/courses/${editing}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Save failed');
      }

      await fetchCourses();
      cancelEdit();
    } catch (err) {
      setError(err.message);
    }
    setSaving(false);
  }

  async function handleDelete(id) {
    if (!confirm('Delete this course? This cannot be undone.')) return;

    try {
      const res = await fetch(`/api/courses/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Delete failed');
      }
      await fetchCourses();
    } catch (err) {
      setError(err.message);
    }
  }

  // Loading
  if (status === 'loading') {
    return (
      <section className="max-w-[1400px] mx-auto px-6 py-16 text-center">
        <div className="w-8 h-8 border-2 border-kvlt-lime border-t-transparent rounded-full animate-spin mx-auto" />
      </section>
    );
  }

  // Not logged in
  if (!session) {
    return (
      <section className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="max-w-[500px] mx-auto bg-kvlt-card border border-kvlt-border rounded-2xl p-12 text-center">
          <Lock size={56} className="text-kvlt-lime mx-auto mb-5" strokeWidth={1.5} />
          <h3 className="font-display text-kvlt-lime text-[28px] mb-3">Admin Access Required</h3>
          <p className="text-kvlt-muted mb-6 leading-relaxed">
            Sign in with Discord to manage courses.
          </p>
          <button onClick={() => signIn('discord')}
            className="w-full bg-kvlt-discord text-white border-none py-3.5 font-body tracking-[2px] text-sm font-bold rounded flex items-center justify-center gap-2">
            <MessageCircle size={16} /> CONTINUE WITH DISCORD
          </button>
        </div>
      </section>
    );
  }

  // Not admin
  if (!isAdmin) {
    return (
      <section className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="max-w-[500px] mx-auto bg-kvlt-card border border-kvlt-border rounded-2xl p-12 text-center">
          <Lock size={56} className="text-red-500 mx-auto mb-5" strokeWidth={1.5} />
          <h3 className="font-display text-red-500 text-[24px] mb-3">Access Denied</h3>
          <p className="text-kvlt-muted leading-relaxed">
            You're signed in as <strong className="text-kvlt-lime">{session.user.username}</strong>,
            but your account doesn't have admin access.
          </p>
        </div>
      </section>
    );
  }

  // Admin view
  return (
    <section className="max-w-[1400px] mx-auto px-6 py-16">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div>
          <p className="font-body tracking-[4px] text-[13px] text-kvlt-lime mb-3">ADMIN</p>
          <h2 className="font-display text-white leading-tight" style={{ fontSize: 'clamp(28px, 5vw, 42px)' }}>
            Manage Courses
          </h2>
        </div>
        <button
          onClick={startNew}
          disabled={editing !== null}
          className="bg-kvlt-lime text-black px-6 py-3 font-body tracking-[2px] text-sm font-bold flex items-center gap-2 disabled:opacity-40">
          <Plus size={16} /> ADD COURSE
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 mb-6">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* New course form */}
      {editing === 'new' && (
        <div className="bg-kvlt-card border border-kvlt-lime rounded-lg p-6 mb-6">
          <h3 className="font-body tracking-[2px] text-[15px] text-kvlt-lime font-semibold mb-4">NEW COURSE</h3>
          <CourseForm form={form} setForm={setForm} />
          <div className="flex gap-3 mt-4">
            <button onClick={handleSave} disabled={saving}
              className="bg-kvlt-lime text-black px-6 py-2.5 font-body tracking-[2px] text-sm font-bold flex items-center gap-2 disabled:opacity-50">
              <Save size={14} /> {saving ? 'SAVING...' : 'SAVE'}
            </button>
            <button onClick={cancelEdit}
              className="border border-zinc-700 text-white px-6 py-2.5 font-body tracking-[2px] text-sm flex items-center gap-2 bg-transparent">
              <X size={14} /> CANCEL
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="w-8 h-8 border-2 border-kvlt-lime border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      ) : courses.length === 0 ? (
        <div className="bg-kvlt-card border border-kvlt-border rounded-lg p-12 text-center">
          <Video size={48} className="text-zinc-700 mx-auto mb-4" strokeWidth={1.5} />
          <p className="text-kvlt-muted">No courses yet. Click "Add Course" to create one.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {courses.map(course => (
            <div key={course.id} className="bg-kvlt-card border border-kvlt-border rounded-lg p-6">
              {editing === course.id ? (
                <>
                  <CourseForm form={form} setForm={setForm} />
                  <div className="flex gap-3 mt-4">
                    <button onClick={handleSave} disabled={saving}
                      className="bg-kvlt-lime text-black px-6 py-2.5 font-body tracking-[2px] text-sm font-bold flex items-center gap-2 disabled:opacity-50">
                      <Save size={14} /> {saving ? 'SAVING...' : 'SAVE'}
                    </button>
                    <button onClick={cancelEdit}
                      className="border border-zinc-700 text-white px-6 py-2.5 font-body tracking-[2px] text-sm flex items-center gap-2 bg-transparent">
                      <X size={14} /> CANCEL
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-display text-white text-xl">{course.title}</h3>
                      {course.published ? (
                        <span className="flex items-center gap-1 text-[10px] font-body tracking-[2px] text-green-400 bg-green-400/10 border border-green-400/30 px-2 py-0.5 rounded">
                          <Eye size={10} /> LIVE
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[10px] font-body tracking-[2px] text-zinc-500 bg-zinc-500/10 border border-zinc-500/30 px-2 py-0.5 rounded">
                          <EyeOff size={10} /> DRAFT
                        </span>
                      )}
                    </div>
                    <p className="text-zinc-500 text-sm mb-1">
                      {course.instructor} &middot; {course.duration} &middot; {course.lessons} lessons &middot; {course.level}
                    </p>
                    <p className="text-zinc-600 text-sm">{course.desc}</p>
                    {course.videoUrl && (
                      <p className="text-zinc-700 text-xs mt-1 truncate">Video: {course.videoUrl}</p>
                    )}
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => startEdit(course)} disabled={editing !== null}
                      className="border border-zinc-700 text-white p-2.5 rounded bg-transparent disabled:opacity-30 hover:border-kvlt-lime transition-colors">
                      <Pencil size={14} />
                    </button>
                    <button onClick={() => handleDelete(course.id)} disabled={editing !== null}
                      className="border border-zinc-700 text-red-400 p-2.5 rounded bg-transparent disabled:opacity-30 hover:border-red-500 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function CourseForm({ form, setForm }) {
  function update(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  const inputClass = 'w-full bg-transparent border border-kvlt-border rounded px-3 py-2.5 text-white text-sm font-body focus:border-kvlt-lime focus:outline-none';
  const labelClass = 'block text-[11px] font-body tracking-[2px] text-zinc-500 mb-1.5';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className={labelClass}>TITLE *</label>
        <input className={inputClass} value={form.title} onChange={e => update('title', e.target.value)} placeholder="e.g. Lining Fundamentals" />
      </div>
      <div>
        <label className={labelClass}>INSTRUCTOR *</label>
        <input className={inputClass} value={form.instructor} onChange={e => update('instructor', e.target.value)} placeholder="e.g. Mike Davis" />
      </div>
      <div>
        <label className={labelClass}>DURATION</label>
        <input className={inputClass} value={form.duration} onChange={e => update('duration', e.target.value)} placeholder="e.g. 2h 30m" />
      </div>
      <div>
        <label className={labelClass}>LESSONS</label>
        <input className={inputClass} type="number" value={form.lessons} onChange={e => update('lessons', e.target.value)} placeholder="e.g. 12" />
      </div>
      <div>
        <label className={labelClass}>LEVEL</label>
        <select className={inputClass} value={form.level} onChange={e => update('level', e.target.value)}>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>
      <div>
        <label className={labelClass}>VIDEO URL</label>
        <input className={inputClass} value={form.videoUrl} onChange={e => update('videoUrl', e.target.value)} placeholder="https://..." />
      </div>
      <div className="md:col-span-2">
        <label className={labelClass}>DESCRIPTION</label>
        <textarea className={`${inputClass} resize-none`} rows={3} value={form.desc} onChange={e => update('desc', e.target.value)}
          placeholder="Course description..." />
      </div>
      <div className="md:col-span-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.published} onChange={e => update('published', e.target.checked)}
            className="accent-kvlt-lime w-4 h-4" />
          <span className="text-sm text-kvlt-muted font-body">Published (visible to members)</span>
        </label>
      </div>
    </div>
  );
}

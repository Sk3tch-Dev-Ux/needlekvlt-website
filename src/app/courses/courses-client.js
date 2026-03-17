'use client';

import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import {
  Lock, Shield, MessageCircle, ExternalLink, CheckCircle,
  Video, Clock, BookOpen, Award,
} from 'lucide-react';

const DISCORD_INVITE = process.env.NEXT_PUBLIC_DISCORD_INVITE || 'https://discord.gg/jointhekvlt';

const COURSES = [
  { id: 1, title: 'Lining Fundamentals', instructor: 'Mike Davis', duration: '2h 30m', lessons: 12, level: 'Beginner', desc: 'Master clean, consistent lines. Needle depth, machine speed, skin stretching, and hand positioning.' },
  { id: 2, title: 'Black & Grey Realism', instructor: 'Sarah Chen', duration: '4h 15m', lessons: 18, level: 'Advanced', desc: 'Photorealistic shading techniques. Gradient work, whip shading, and reference preparation.' },
  { id: 3, title: 'Neo-Traditional Color Theory', instructor: 'Jake Torres', duration: '3h 00m', lessons: 14, level: 'Intermediate', desc: 'Bold color palettes, saturation control, and layering for neo-trad styles.' },
  { id: 4, title: 'Piercing Safety & Technique', instructor: 'Alex Kim', duration: '1h 45m', lessons: 8, level: 'Beginner', desc: 'Sterilization protocols, anatomy considerations, jewelry selection, and aftercare guidance.' },
  { id: 5, title: 'Machine Building & Tuning', instructor: 'RJ Black', duration: '3h 30m', lessons: 16, level: 'Advanced', desc: 'Coil machine assembly, spring tuning, contact gap adjustment, and voltage optimization.' },
  { id: 6, title: 'Flash Design for Profit', instructor: 'Luna Vega', duration: '2h 00m', lessons: 10, level: 'Intermediate', desc: 'Design flash sheets that sell. Pricing, digital tools, printing, and marketing your work.' },
];

export default function CoursesClient() {
  const { data: session, status } = useSession();

  // Loading
  if (status === 'loading') {
    return (
      <section className="max-w-[1400px] mx-auto px-6 py-16 text-center">
        <div className="w-8 h-8 border-2 border-kvlt-lime border-t-transparent rounded-full animate-spin mx-auto" />
      </section>
    );
  }

  // ── NOT LOGGED IN ──────────────────────
  if (!session) {
    return (
      <section className="max-w-[1400px] mx-auto px-6 py-16">
        <p className="font-body tracking-[4px] text-[13px] text-kvlt-lime mb-3">MEMBERS ONLY</p>
        <h2 className="font-display text-white mb-4 leading-tight" style={{ fontSize: 'clamp(28px, 5vw, 42px)' }}>
          Courses & Training
        </h2>
        <p className="text-kvlt-muted max-w-[500px] mb-12 leading-relaxed">
          Exclusive video content from professional instructors. Demonstrations, techniques, and deep-dives — available only to verified members.
        </p>
        <div className="max-w-[500px] mx-auto bg-kvlt-card border border-kvlt-border rounded-2xl p-12 text-center">
          <Lock size={56} className="text-kvlt-lime mx-auto mb-5" strokeWidth={1.5} />
          <h3 className="font-display text-kvlt-lime text-[28px] mb-3">Members Only Content</h3>
          <p className="text-kvlt-muted mb-2 leading-relaxed">
            Sign in with Discord to access exclusive courses, demonstrations, and tutorials from professional instructors.
          </p>
          <p className="text-zinc-600 text-[13px] mb-6">
            You must be a member of our Discord server with the required role.
          </p>
          <button onClick={() => signIn('discord')}
            className="w-full bg-kvlt-discord text-white border-none py-3.5 font-body tracking-[2px] text-sm font-bold rounded flex items-center justify-center gap-2 mb-4">
            <MessageCircle size={16} /> CONTINUE WITH DISCORD
          </button>
          <a href={DISCORD_INVITE} target="_blank" rel="noopener noreferrer"
            className="text-kvlt-discord text-[13px] font-body tracking-wider inline-flex items-center gap-1 no-underline hover:underline">
            NOT A MEMBER? JOIN THE KVLT <ExternalLink size={11} />
          </a>
        </div>
      </section>
    );
  }

  // ── LOGGED IN BUT MISSING ROLE ─────────
  if (!session.user.hasRequiredRole) {
    return (
      <section className="max-w-[1400px] mx-auto px-6 py-16">
        <p className="font-body tracking-[4px] text-[13px] text-kvlt-lime mb-3">ACCESS DENIED</p>
        <h2 className="font-display text-white mb-4 leading-tight" style={{ fontSize: 'clamp(28px, 5vw, 42px)' }}>
          Missing Required Role
        </h2>
        <div className="max-w-[500px] mx-auto bg-kvlt-card border border-kvlt-border rounded-2xl p-12 text-center">
          <Shield size={56} className="text-red-500 mx-auto mb-5" strokeWidth={1.5} />
          <h3 className="font-display text-red-500 text-[24px] mb-3">Role Required</h3>
          <p className="text-kvlt-muted mb-2 leading-relaxed">
            You're signed in as <strong className="text-kvlt-lime">{session.user.username}</strong>,
            but your account doesn't have the required Discord role to access courses.
          </p>
          <p className="text-zinc-600 text-[13px] mb-6">
            You need the <strong className="text-kvlt-lime">Verified Artist</strong> role in our Discord server.
          </p>
          <a href={DISCORD_INVITE} target="_blank" rel="noopener noreferrer" className="block no-underline">
            <button className="w-full bg-kvlt-discord text-white border-none py-3.5 font-body tracking-[2px] text-sm font-bold rounded flex items-center justify-center gap-2 mb-3">
              <MessageCircle size={16} /> GO TO DISCORD SERVER
            </button>
          </a>
          <p className="text-zinc-600 text-[12px]">Ask a moderator for the Verified Artist role.</p>
        </div>
      </section>
    );
  }

  // ── AUTHORIZED — SHOW COURSES ──────────
  return (
    <section className="max-w-[1400px] mx-auto px-6 py-16">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-2">
        <div>
          <p className="font-body tracking-[4px] text-[13px] text-kvlt-lime mb-3">MEMBERS ONLY</p>
          <h2 className="font-display text-white mb-4 leading-tight" style={{ fontSize: 'clamp(28px, 5vw, 42px)' }}>
            Courses & Training
          </h2>
        </div>
        <div className="flex items-center gap-2 bg-kvlt-card border border-kvlt-border rounded-lg px-4 py-2">
          <CheckCircle size={14} className="text-kvlt-lime" />
          <span className="font-body text-[12px] tracking-wider text-kvlt-muted">
            SIGNED IN AS <span className="text-kvlt-lime">{session.user.username?.toUpperCase()}</span>
          </span>
        </div>
      </div>
      <p className="text-kvlt-muted max-w-[600px] mb-10 leading-relaxed">
        Exclusive video content from professional instructors. Click a course to begin watching.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {COURSES.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
}

function CourseCard({ course }) {
  const [hovered, setHovered] = useState(false);
  const levelColor = course.level === 'Beginner' ? '#4ade80'
    : course.level === 'Intermediate' ? '#c8ff00' : '#ff6600';

  return (
    <div className={`bg-kvlt-card border rounded-lg p-7 cursor-pointer transition-all duration-300 ${
      hovered ? 'border-kvlt-lime -translate-y-0.5' : 'border-kvlt-border'
    }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <div className="flex justify-between items-start mb-4">
        <div className={`w-11 h-11 rounded-lg flex items-center justify-center transition-colors ${
          hovered ? 'bg-kvlt-lime/15' : 'bg-kvlt-lime/5'
        }`} style={{ border: '1px solid rgba(200,255,0,0.15)' }}>
          <Video size={20} className="text-kvlt-lime" strokeWidth={1.5} />
        </div>
        <span className="font-body text-[10px] tracking-[2px] px-2 py-1 rounded"
          style={{
            color: levelColor,
            background: `${levelColor}15`,
            border: `1px solid ${levelColor}30`,
          }}>
          {course.level.toUpperCase()}
        </span>
      </div>
      <h3 className="font-display text-white text-xl mb-1.5">{course.title}</h3>
      <p className="text-zinc-500 text-[13px] leading-relaxed mb-4">{course.desc}</p>
      <div className="flex flex-wrap gap-4">
        {[
          { Icon: Award, text: course.instructor.toUpperCase() },
          { Icon: Clock, text: course.duration },
          { Icon: BookOpen, text: `${course.lessons} LESSONS` },
        ].map((m, i) => (
          <span key={i} className="flex items-center gap-1 text-zinc-600 text-[12px] font-body tracking-wider">
            <m.Icon size={12} className="text-zinc-600" /> {m.text}
          </span>
        ))}
      </div>
    </div>
  );
}

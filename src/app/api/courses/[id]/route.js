import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'courses.json');

function readCourses() {
  return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
}

function writeCourses(courses) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(courses, null, 2));
}

function isAdmin(session) {
  if (!session?.user) return false;
  const adminIds = (process.env.ADMIN_DISCORD_IDS || '').split(',').map(s => s.trim()).filter(Boolean);
  return adminIds.includes(session.user.discordId);
}

// PUT /api/courses/[id] — admin only, update a course
export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!isAdmin(session)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const id = parseInt(params.id);
    const body = await req.json();
    const courses = readCourses();
    const idx = courses.findIndex(c => c.id === id);

    if (idx === -1) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    courses[idx] = {
      ...courses[idx],
      title: body.title ?? courses[idx].title,
      instructor: body.instructor ?? courses[idx].instructor,
      duration: body.duration ?? courses[idx].duration,
      lessons: body.lessons != null ? parseInt(body.lessons) : courses[idx].lessons,
      level: body.level ?? courses[idx].level,
      desc: body.desc ?? courses[idx].desc,
      videoUrl: body.videoUrl ?? courses[idx].videoUrl,
      published: body.published ?? courses[idx].published,
    };

    writeCourses(courses);
    return NextResponse.json(courses[idx]);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE /api/courses/[id] — admin only, delete a course
export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!isAdmin(session)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const id = parseInt(params.id);
    const courses = readCourses();
    const filtered = courses.filter(c => c.id !== id);

    if (filtered.length === courses.length) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    writeCourses(filtered);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

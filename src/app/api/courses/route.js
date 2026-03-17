import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'courses.json');

function readCourses() {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(raw);
}

function writeCourses(courses) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(courses, null, 2));
}

function isAdmin(session) {
  if (!session?.user) return false;
  const adminIds = (process.env.ADMIN_DISCORD_IDS || '').split(',').map(s => s.trim()).filter(Boolean);
  return adminIds.includes(session.user.discordId);
}

// GET /api/courses — public list of published courses (or all if admin + ?all=1)
export async function GET(req) {
  try {
    const courses = readCourses();
    const { searchParams } = new URL(req.url);

    if (searchParams.get('all') === '1') {
      const session = await getServerSession(authOptions);
      if (isAdmin(session)) {
        return NextResponse.json(courses);
      }
    }

    return NextResponse.json(courses.filter(c => c.published));
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

// POST /api/courses — admin only, create a course
export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!isAdmin(session)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const courses = readCourses();

    const newCourse = {
      id: courses.length ? Math.max(...courses.map(c => c.id)) + 1 : 1,
      title: body.title || '',
      instructor: body.instructor || '',
      duration: body.duration || '',
      lessons: parseInt(body.lessons) || 0,
      level: body.level || 'Beginner',
      desc: body.desc || '',
      videoUrl: body.videoUrl || '',
      published: body.published !== false,
    };

    courses.push(newCourse);
    writeCourses(courses);

    return NextResponse.json(newCourse, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

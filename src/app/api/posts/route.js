import { NextResponse } from 'next/server';
import db from '../../../lib/db';

export async function GET() {
  try {
    const posts = db.prepare('SELECT * FROM posts ORDER BY created_at DESC').all();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { title, content, category, image_url } = await request.json();
    const stmt = db.prepare('INSERT INTO posts (title, content, category, image_url) VALUES (?, ?, ?, ?)');
    const result = stmt.run(title, content, category, image_url);
    return NextResponse.json({ id: result.lastInsertRowid, title, content, category, image_url }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';
import sql from '../../../lib/db';
import jwt from 'jsonwebtoken';

function verifyToken(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.substring(7);
  try {
    const decoded = jwt.verify(token, process.env.NETLIFY_IDENTITY_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function GET() {
  try {
    const posts = await sql`SELECT * FROM posts ORDER BY created_at DESC`;
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  const user = verifyToken(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { title, content, category, image_url } = await request.json();
    const result = await sql`INSERT INTO posts (title, content, category, image_url) VALUES (${title}, ${content}, ${category}, ${image_url}) RETURNING id`;
    return NextResponse.json({ id: result[0].id, title, content, category, image_url }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
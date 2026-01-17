import { NextResponse } from 'next/server';
import db from '../../../lib/db';

export async function GET() {
  try {
    const users = db.prepare('SELECT * FROM users').all();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { name, email } = await request.json();
    const stmt = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
    const result = stmt.run(name, email);
    return NextResponse.json({ id: result.lastInsertRowid, name, email }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
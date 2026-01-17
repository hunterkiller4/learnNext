import { NextResponse } from 'next/server';
import sql from '../../../lib/db';

export async function GET() {
  try {
    const nations = await sql`SELECT * FROM nations ORDER BY name`;
    return NextResponse.json(nations);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { name, flag_url } = await request.json();
    const result = await sql`INSERT INTO nations (name, flag_url) VALUES (${name}, ${flag_url}) RETURNING id`;
    return NextResponse.json({ id: result[0].id, name, flag_url }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
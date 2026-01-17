import { NextResponse } from 'next/server';
import sql from '../../../lib/db';

export async function GET() {
  try {
    const items = await sql`
      SELECT fi.*, n.name as nation_name, n.flag_url
      FROM food_items fi
      JOIN nations n ON fi.nation_id = n.id
      ORDER BY fi.created_at DESC
    `;
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { nation_id, name, description, image_url } = await request.json();
    const result = await sql`INSERT INTO food_items (nation_id, name, description, image_url) VALUES (${nation_id}, ${name}, ${description}, ${image_url}) RETURNING id`;
    return NextResponse.json({ id: result[0].id, nation_id, name, description, image_url }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
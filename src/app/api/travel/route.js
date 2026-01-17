import { NextResponse } from 'next/server';
import sql from '../../../lib/db';

export async function GET() {
  try {
    const items = await sql`
      SELECT ti.*, n.name as nation_name, n.flag_url
      FROM travel_items ti
      JOIN nations n ON ti.nation_id = n.id
      ORDER BY ti.created_at DESC
    `;
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { nation_id, name, description, image_url } = await request.json();
    const result = await sql`INSERT INTO travel_items (nation_id, name, description, image_url) VALUES (${nation_id}, ${name}, ${description}, ${image_url}) RETURNING id`;
    return NextResponse.json({ id: result[0].id, nation_id, name, description, image_url }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
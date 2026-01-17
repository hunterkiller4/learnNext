import { neon } from '@netlify/neon';
import jwt from 'jsonwebtoken';

const sql = neon(process.env.NETLIFY_DATABASE_URL);

export async function handler(event) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    if (event.httpMethod === 'GET') {
      const items = await sql`
        SELECT ti.*, n.name as nation_name, n.flag_url
        FROM travel_items ti
        JOIN nations n ON ti.nation_id = n.id
        ORDER BY ti.created_at DESC
      `;
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(items),
      };
    }

    if (event.httpMethod === 'POST') {
      // Verify JWT token
      const authHeader = event.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: 'Unauthorized' }),
        };
      }

      const token = authHeader.substring(7);
      try {
        jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      } catch (err) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: 'Invalid token' }),
        };
      }

      const { nation_id, name, description, image_url } = JSON.parse(event.body);
      const result = await sql`INSERT INTO travel_items (nation_id, name, description, image_url) VALUES (${nation_id}, ${name}, ${description}, ${image_url}) RETURNING id`;
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({ id: result[0].id, nation_id, name, description, image_url }),
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
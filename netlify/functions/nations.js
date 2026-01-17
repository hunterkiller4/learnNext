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
      const nations = await sql`SELECT * FROM nations ORDER BY name`;
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(nations),
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

      const { name, flag_url } = JSON.parse(event.body);
      const result = await sql`INSERT INTO nations (name, flag_url) VALUES (${name}, ${flag_url}) RETURNING id`;
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({ id: result[0].id, name, flag_url }),
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
import { neon } from '@netlify/neon';

const sql = neon(process.env.DATABASE_URL);

// Create tables if they don't exist
await sql`CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

export default sql;
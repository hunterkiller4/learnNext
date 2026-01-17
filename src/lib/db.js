import { neon } from '@netlify/neon';

const sql = neon(process.env.NETLIFY_DATABASE_URL);

// Create tables if they don't exist
await sql`CREATE TABLE IF NOT EXISTS nations (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  flag_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

await sql`CREATE TABLE IF NOT EXISTS travel_items (
  id SERIAL PRIMARY KEY,
  nation_id INTEGER REFERENCES nations(id),
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

await sql`CREATE TABLE IF NOT EXISTS food_items (
  id SERIAL PRIMARY KEY,
  nation_id INTEGER REFERENCES nations(id),
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

await sql`CREATE TABLE IF NOT EXISTS toy_items (
  id SERIAL PRIMARY KEY,
  nation_id INTEGER REFERENCES nations(id),
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

export default sql;
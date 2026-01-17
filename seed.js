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

// Insert sample nations
const nations = [
  { name: 'Japan', flag_url: 'https://flagcdn.com/w320/jp.png' },
  { name: 'France', flag_url: 'https://flagcdn.com/w320/fr.png' },
  { name: 'Italy', flag_url: 'https://flagcdn.com/w320/it.png' },
  { name: 'Mexico', flag_url: 'https://flagcdn.com/w320/mx.png' },
  { name: 'India', flag_url: 'https://flagcdn.com/w320/in.png' },
  { name: 'Brazil', flag_url: 'https://flagcdn.com/w320/br.png' }
];

for (const nation of nations) {
  await sql`INSERT INTO nations (name, flag_url) VALUES (${nation.name}, ${nation.flag_url}) ON CONFLICT (name) DO NOTHING`;
}

// Get nation ids
const nationRows = await sql`SELECT id, name FROM nations`;
const nationMap = {};
nationRows.forEach(n => nationMap[n.name] = n.id);

// Insert sample travel items
const travelItems = [
  { nation: 'Japan', name: 'Mount Fuji', description: 'Iconic volcano and symbol of Japan', image_url: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=400' },
  { nation: 'France', name: 'Eiffel Tower', description: 'Famous iron lattice tower in Paris', image_url: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400' },
  { nation: 'Italy', name: 'Colosseum', description: 'Ancient amphitheater in Rome', image_url: 'https://images.unsplash.com/photo-1555992336-fb0d29498b13?w=400' },
  { nation: 'Mexico', name: 'Chichen Itza', description: 'Mayan pyramid in Yucatan', image_url: 'https://images.unsplash.com/photo-1518638150340-f706e866195a?w=400' },
  { nation: 'India', name: 'Taj Mahal', description: 'Mughal mausoleum in Agra', image_url: 'https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=400' },
  { nation: 'Brazil', name: 'Christ the Redeemer', description: 'Statue of Jesus Christ in Rio', image_url: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400' }
];

for (const item of travelItems) {
  const nationId = nationMap[item.nation];
  if (nationId) {
    await sql`INSERT INTO travel_items (nation_id, name, description, image_url) VALUES (${nationId}, ${item.name}, ${item.description}, ${item.image_url})`;
  }
}

// Insert sample food items
const foodItems = [
  { nation: 'Japan', name: 'Sushi', description: 'Vinegared rice with seafood', image_url: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400' },
  { nation: 'France', name: 'Croissant', description: 'Buttery flaky pastry', image_url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400' },
  { nation: 'Italy', name: 'Pizza Margherita', description: 'Tomato, mozzarella, basil pizza', image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400' },
  { nation: 'Mexico', name: 'Tacos', description: 'Corn tortillas with fillings', image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400' },
  { nation: 'India', name: 'Butter Chicken', description: 'Creamy tomato curry with chicken', image_url: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400' },
  { nation: 'Brazil', name: 'Feijoada', description: 'Black bean stew with pork', image_url: 'https://images.unsplash.com/photo-1541599468348-e96984315621?w=400' }
];

for (const item of foodItems) {
  const nationId = nationMap[item.nation];
  if (nationId) {
    await sql`INSERT INTO food_items (nation_id, name, description, image_url) VALUES (${nationId}, ${item.name}, ${item.description}, ${item.image_url})`;
  }
}

// Insert sample toy items
const toyItems = [
  { nation: 'Japan', name: 'Tamagotchi', description: 'Digital pet handheld game', image_url: 'https://images.unsplash.com/photo-1558877385-1199c1af4e0e?w=400' },
  { nation: 'France', name: 'Petit Ours Brun', description: 'Teddy bear plush toy', image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400' },
  { nation: 'Italy', name: 'Pinocchio Marionette', description: 'Wooden puppet from the story', image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400' },
  { nation: 'Mexico', name: 'Piñata', description: 'Decorated container filled with treats', image_url: 'https://images.unsplash.com/photo-1541599468348-e96984315621?w=400' },
  { nation: 'India', name: 'Gully Danda', description: 'Traditional stick and ball game', image_url: 'https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=400' },
  { nation: 'Brazil', name: 'Capoeira Angoleiro', description: 'Musical instrument for capoeira', image_url: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400' }
];

for (const item of toyItems) {
  const nationId = nationMap[item.nation];
  if (nationId) {
    await sql`INSERT INTO toy_items (nation_id, name, description, image_url) VALUES (${nationId}, ${item.name}, ${item.description}, ${item.image_url})`;
  }
}

console.log('Sample data inserted');
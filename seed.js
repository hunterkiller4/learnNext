import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'database.db');
const db = new Database(dbPath);

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT,
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Insert sample posts
const posts = [
  {
    title: 'Exploring the Hidden Gems of Kyoto',
    content: 'Kyoto, the ancient capital of Japan, is a city steeped in history and culture. From the serene temples of Kinkaku-ji to the bustling streets of Nishiki Market, there\'s something for everyone. In this post, I\'ll share my favorite spots and tips for making the most of your visit.',
    category: 'Asia',
    image_url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400'
  },
  {
    title: 'A Weekend in Paris: Romance and Cuisine',
    content: 'Paris, the City of Light, never fails to captivate. This weekend getaway included visits to the Eiffel Tower, a Seine River cruise, and indulging in croissants and escargot at local bistros. Here\'s how to experience the best of Parisian charm.',
    category: 'Europe',
    image_url: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400'
  },
  {
    title: 'Hiking the Inca Trail to Machu Picchu',
    content: 'The Inca Trail is one of the most iconic hikes in the world. Spanning four days and covering 26 miles, it leads to the breathtaking Machu Picchu. I\'ll walk you through preparation, the journey, and the unforgettable views.',
    category: 'South America',
    image_url: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=400'
  },
  {
    title: 'Safari Adventures in Kenya',
    content: 'Kenya\'s wildlife reserves offer incredible safari experiences. From the Maasai Mara to the Amboseli National Park, I witnessed the Big Five and learned about conservation efforts. This post covers the best times to visit and what to expect.',
    category: 'Africa',
    image_url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400'
  },
  {
    title: 'Island Hopping in the Greek Isles',
    content: 'The Greek Islands are a paradise of blue waters and white-washed buildings. My trip included Santorini, Mykonos, and Crete. Discover the best beaches, local foods, and hidden coves in this Mediterranean adventure.',
    category: 'Europe',
    image_url: 'https://images.unsplash.com/photo-1501436513145-30f24e19fcc8?w=400'
  },
  {
    title: 'Northern Lights in Iceland',
    content: 'Chasing the Aurora Borealis in Iceland was a dream come true. From Reykjavik to the Golden Circle, and staying in a glass igloo, this trip was filled with natural wonders. Learn how to plan your own aurora-hunting expedition.',
    category: 'Europe',
    image_url: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=400'
  }
];

const insert = db.prepare('INSERT INTO posts (title, content, category, image_url) VALUES (?, ?, ?, ?)');

for (const post of posts) {
  insert.run(post.title, post.content, post.category, post.image_url);
}

console.log('Sample posts inserted');
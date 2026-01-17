'use client';

import Image from "next/image";
import { useState, useEffect } from 'react';

interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  image_url: string;
  created_at: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await fetch('/api/posts');
    const data = await res.json();
    setPosts(data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">House of Gon</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-900 hover:text-gray-600">Home</a>
              <a href="#" className="text-gray-900 hover:text-gray-600">Destinations</a>
              <a href="#" className="text-gray-900 hover:text-gray-600">Blog</a>
              <a href="#" className="text-gray-900 hover:text-gray-600">About</a>
              <a href="#" className="text-gray-900 hover:text-gray-600">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to House of Gon</h2>
          <p className="text-xl mb-8">Discover amazing travel destinations and stories from around the world</p>
          <a href="#posts" className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300">Explore Posts</a>
        </div>
      </section>

      {/* Blog Posts */}
      <section id="posts" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">Latest Travel Stories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {post.image_url && (
                <img src={post.image_url} alt={post.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-6">
                <span className="text-sm text-blue-600 font-semibold">{post.category}</span>
                <h4 className="text-xl font-bold mt-2 mb-3">{post.title}</h4>
                <p className="text-gray-600 text-sm mb-4">{post.content.substring(0, 100)}...</p>
                <span className="text-xs text-gray-500">{new Date(post.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
        {posts.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No posts yet. Add some travel stories!</p>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2026 House of Gon. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

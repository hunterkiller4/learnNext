import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Nation {
  id: number;
  name: string;
  flag_url: string;
}

interface Item {
  id: number;
  nation_id: number;
  name: string;
  description: string;
  image_url: string;
  nation_name: string;
  flag_url: string;
}

export default function Home() {
  const [nations, setNations] = useState<Nation[]>([]);
  const [travelItems, setTravelItems] = useState<Item[]>([]);
  const [foodItems, setFoodItems] = useState<Item[]>([]);
  const [toyItems, setToyItems] = useState<Item[]>([]);
  const [activeTab, setActiveTab] = useState<'travel' | 'food' | 'toy'>('travel');
  const [selectedNation, setSelectedNation] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'nation'>('name');

  useEffect(() => {
    fetchNations();
    fetchItems();
  }, []);

  const fetchNations = async () => {
    try {
      const res = await fetch('/.netlify/functions/nations');
      if (res.ok) {
        const data = await res.json();
        setNations(data);
      }
    } catch (error) {
      console.error('Failed to fetch nations:', error);
    }
  };

  const fetchItems = async () => {
    try {
      const [travelRes, foodRes, toyRes] = await Promise.all([
        fetch('/.netlify/functions/travel'),
        fetch('/.netlify/functions/food'),
        fetch('/.netlify/functions/toy')
      ]);
      if (travelRes.ok) setTravelItems(await travelRes.json());
      if (foodRes.ok) setFoodItems(await foodRes.json());
      if (toyRes.ok) setToyItems(await toyRes.json());
    } catch (error) {
      console.error('Failed to fetch items:', error);
    }
  };

  const getCurrentItems = () => {
    let items: Item[] = [];
    switch (activeTab) {
      case 'travel': items = travelItems; break;
      case 'food': items = foodItems; break;
      case 'toy': items = toyItems; break;
    }

    if (selectedNation) {
      items = items.filter(item => item.nation_id === selectedNation);
    }

    items.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else {
        return a.nation_name.localeCompare(b.nation_name);
      }
    });

    return items;
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
              <Link to="/" className="text-gray-900 hover:text-gray-600">Home</Link>
              <Link to="/travel" className="text-gray-900 hover:text-gray-600">Travel</Link>
              <Link to="/food" className="text-gray-900 hover:text-gray-600">Food</Link>
              <Link to="/toy" className="text-gray-900 hover:text-gray-600">Toy</Link>
              <Link to="/baby" className="text-gray-900 hover:text-gray-600">Baby</Link>
              <Link to="/admin" className="text-gray-900 hover:text-gray-600">Admin</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Explore Nations</h2>
          <p className="text-xl mb-8">Discover iconic travel destinations, foods, and toys from around the world</p>
        </div>
      </section>

      {/* Nations List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h3 className="text-2xl font-bold mb-6">Nations</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {nations.map((nation) => (
            <button
              key={nation.id}
              onClick={() => setSelectedNation(selectedNation === nation.id ? null : nation.id)}
              className={`p-4 rounded-lg border-2 transition-colors ${
                selectedNation === nation.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {nation.flag_url && <img src={nation.flag_url} alt={nation.name} className="w-8 h-6 mx-auto mb-2" />}
              <p className="text-sm font-medium text-center">{nation.name}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Tabs and Items */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('travel')}
              className={`px-4 py-2 rounded ${activeTab === 'travel' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Travel
            </button>
            <button
              onClick={() => setActiveTab('food')}
              className={`px-4 py-2 rounded ${activeTab === 'food' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Food
            </button>
            <button
              onClick={() => setActiveTab('toy')}
              className={`px-4 py-2 rounded ${activeTab === 'toy' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Toy
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <label className="text-sm">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'nation')}
              className="px-3 py-1 border rounded"
            >
              <option value="name">Name</option>
              <option value="nation">Nation</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getCurrentItems().map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={item.image_url} alt={item.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex items-center mb-2">
                  {item.flag_url && <img src={item.flag_url} alt={item.nation_name} className="w-6 h-4 mr-2" />}
                  <span className="text-sm text-gray-600">{item.nation_name}</span>
                </div>
                <h4 className="text-lg font-bold mb-2">{item.name}</h4>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        {getCurrentItems().length === 0 && (
          <p className="text-center text-gray-500 mt-8">No items found.</p>
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
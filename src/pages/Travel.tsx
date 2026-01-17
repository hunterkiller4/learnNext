import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Nation {
  id: number;
  name: string;
  flag_url: string;
}

interface TravelItem {
  id: number;
  nation_id: number;
  name: string;
  description: string;
  image_url: string;
  nation_name: string;
  flag_url: string;
}

export default function Travel() {
  const [nations, setNations] = useState<Nation[]>([]);
  const [items, setItems] = useState<TravelItem[]>([]);
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
      const res = await fetch('/.netlify/functions/travel');
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (error) {
      console.error('Failed to fetch items:', error);
    }
  };

  const getFilteredItems = () => {
    let filteredItems = items;

    if (selectedNation) {
      filteredItems = filteredItems.filter(item => item.nation_id === selectedNation);
    }

    filteredItems.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else {
        return a.nation_name.localeCompare(b.nation_name);
      }
    });

    return filteredItems;
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
              <Link to="/travel" className="text-blue-600 font-semibold">Travel</Link>
              <Link to="/food" className="text-gray-900 hover:text-gray-600">Food</Link>
              <Link to="/toy" className="text-gray-900 hover:text-gray-600">Toy</Link>
              <Link to="/admin" className="text-gray-900 hover:text-gray-600">Admin</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-500 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Travel Destinations</h2>
          <p className="text-xl mb-8">Explore iconic travel spots from nations around the world</p>
        </div>
      </section>

      {/* Nations Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h3 className="text-2xl font-bold mb-6">Filter by Nation</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <button
            onClick={() => setSelectedNation(null)}
            className={`p-4 rounded-lg border-2 transition-colors ${
              selectedNation === null ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <p className="text-sm font-medium text-center">All Nations</p>
          </button>
          {nations.map((nation) => (
            <button
              key={nation.id}
              onClick={() => setSelectedNation(selectedNation === nation.id ? null : nation.id)}
              className={`p-4 rounded-lg border-2 transition-colors ${
                selectedNation === nation.id ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {nation.flag_url && <img src={nation.flag_url} alt={nation.name} className="w-8 h-6 mx-auto mb-2" />}
              <p className="text-sm font-medium text-center">{nation.name}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Sort and Items */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">Travel Items</h3>
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
          {getFilteredItems().map((item) => (
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
        {getFilteredItems().length === 0 && (
          <p className="text-center text-gray-500 mt-8">No travel items found.</p>
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
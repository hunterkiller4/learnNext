import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockReviews, continents, timezones, type Review } from '../data/reviews';

interface Nation {
  id: number;
  name: string;
  flag_url: string;
}

interface ToyItem {
  id: number;
  nation_id: number;
  name: string;
  description: string;
  image_url: string;
  nation_name: string;
  flag_url: string;
}

export default function Toy() {
  const [nations, setNations] = useState<Nation[]>([]);
  const [items, setItems] = useState<ToyItem[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedNation, setSelectedNation] = useState<number | null>(null);
  const [selectedContinent, setSelectedContinent] = useState<string>('All Continents');
  const [selectedTimezone, setSelectedTimezone] = useState<string>('All Timezones');
  const [sortBy, setSortBy] = useState<'name' | 'nation'>('name');

  useEffect(() => {
    fetchNations();
    fetchItems();
    // Load toy reviews
    setReviews(mockReviews.filter(review => review.item_type === 'toy'));
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
      const res = await fetch('/.netlify/functions/toy');
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

    // Filter by continent and timezone using reviews data
    if (selectedContinent !== 'All Continents' || selectedTimezone !== 'All Timezones') {
      const filteredReviewIds = reviews
        .filter(review =>
          (selectedContinent === 'All Continents' || review.continent === selectedContinent) &&
          (selectedTimezone === 'All Timezones' || review.timezone === selectedTimezone)
        )
        .map(review => review.item_id);

      filteredItems = filteredItems.filter(item => filteredReviewIds.includes(item.id));
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
              <Link to="/travel" className="text-gray-900 hover:text-gray-600">Travel</Link>
              <Link to="/food" className="text-gray-900 hover:text-gray-600">Food</Link>
              <Link to="/toy" className="text-purple-600 font-semibold">Toy</Link>
              <Link to="/baby" className="text-gray-900 hover:text-gray-600">Baby</Link>
              <Link to="/admin" className="text-gray-900 hover:text-gray-600">Admin</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-500 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Playful Toys</h2>
          <p className="text-xl mb-8">Discover fun toys and games from nations around the world</p>
        </div>
      </section>

      {/* Nations Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h3 className="text-2xl font-bold mb-6">Filter by Nation</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <button
            onClick={() => setSelectedNation(null)}
            className={`p-4 rounded-lg border-2 transition-colors ${
              selectedNation === null ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <p className="text-sm font-medium text-center">All Nations</p>
          </button>
          {nations.map((nation) => (
            <button
              key={nation.id}
              onClick={() => setSelectedNation(selectedNation === nation.id ? null : nation.id)}
              className={`p-4 rounded-lg border-2 transition-colors ${
                selectedNation === nation.id ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {nation.flag_url && <img src={nation.flag_url} alt={nation.name} className="w-8 h-6 mx-auto mb-2" />}
              <p className="text-sm font-medium text-center">{nation.name}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Advanced Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50">
        <h3 className="text-2xl font-bold mb-6">Advanced Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Continent</label>
            <select
              value={selectedContinent}
              onChange={(e) => setSelectedContinent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {continents.map((continent) => (
                <option key={continent} value={continent}>{continent}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
            <select
              value={selectedTimezone}
              onChange={(e) => setSelectedTimezone(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {timezones.map((timezone) => (
                <option key={timezone} value={timezone}>{timezone}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Sort and Items */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">Toy Items</h3>
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
          {getFilteredItems().map((item) => {
            const itemReviews = reviews.filter(review => review.item_id === item.id);
            const avgRating = itemReviews.length > 0
              ? itemReviews.reduce((sum, review) => sum + review.rating, 0) / itemReviews.length
              : 0;

            return (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={item.image_url} alt={item.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      {item.flag_url && <img src={item.flag_url} alt={item.nation_name} className="w-6 h-4 mr-2" />}
                      <span className="text-sm text-gray-600">{item.nation_name}</span>
                    </div>
                    {avgRating > 0 && (
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="text-sm font-medium">{avgRating.toFixed(1)}</span>
                        <span className="text-sm text-gray-500 ml-1">({itemReviews.length})</span>
                      </div>
                    )}
                  </div>
                  <h4 className="text-lg font-bold mb-2">{item.name}</h4>
                  <p className="text-gray-600 text-sm mb-3">{item.description}</p>

                  {/* Reviews Section */}
                  {itemReviews.length > 0 && (
                    <div className="border-t pt-3">
                      <h5 className="text-sm font-semibold text-gray-800 mb-2">Recent Reviews</h5>
                      <div className="space-y-2">
                        {itemReviews.slice(0, 2).map((review) => (
                          <div key={review.id} className="bg-gray-50 p-2 rounded text-xs">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium">{review.user_name}</span>
                              <div className="flex items-center">
                                <span className="text-yellow-500 mr-1">★</span>
                                <span>{review.rating}</span>
                              </div>
                            </div>
                            <p className="text-gray-600 line-clamp-2">{review.comment}</p>
                            <div className="text-gray-400 mt-1">
                              {review.continent} • {review.timezone}
                            </div>
                          </div>
                        ))}
                        {itemReviews.length > 2 && (
                          <p className="text-xs text-gray-500 text-center">
                            +{itemReviews.length - 2} more reviews
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {getFilteredItems().length === 0 && (
          <p className="text-center text-gray-500 mt-8">No toy items found.</p>
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
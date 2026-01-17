import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Nation {
  id: number;
  name: string;
  flag_url: string;
}

interface NetlifyUser {
  jwt(): string;
  [key: string]: unknown;
}

export default function Admin() {
  const [user, setUser] = useState<NetlifyUser | null>(null);
  const [nations, setNations] = useState<Nation[]>([]);
  const [activeTab, setActiveTab] = useState<'nations' | 'items'>('nations');

  // Nation form
  const [nationName, setNationName] = useState('');
  const [nationFlagUrl, setNationFlagUrl] = useState('');

  // Item form
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemImageUrl, setItemImageUrl] = useState('');
  const [itemNationId, setItemNationId] = useState<number | ''>('');
  const [itemCategory, setItemCategory] = useState<'travel' | 'food' | 'toy'>('travel');

  useEffect(() => {
    // Load Netlify Identity
    const script = document.createElement('script');
    script.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (window.netlifyIdentity) {
        window.netlifyIdentity.init();
        window.netlifyIdentity.on('login', (user?: NetlifyUser) => setUser(user || null));
        window.netlifyIdentity.on('logout', () => setUser(null));
        setUser(window.netlifyIdentity.currentUser());
      }
    };

    fetchNations();

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
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

  const login = () => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.open();
    }
  };

  const logout = () => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.logout();
    }
  };

  const addNation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const token = user.jwt();
    const res = await fetch('/.netlify/functions/nations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ name: nationName, flag_url: nationFlagUrl }),
    });
    if (res.ok) {
      setNationName('');
      setNationFlagUrl('');
      fetchNations();
    }
  };

  const addItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !itemNationId) return;

    const token = user.jwt();
    const endpoint = `/.netlify/functions/${itemCategory}`;
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        nation_id: itemNationId,
        name: itemName,
        description: itemDescription,
        image_url: itemImageUrl,
      }),
    });
    if (res.ok) {
      setItemName('');
      setItemDescription('');
      setItemImageUrl('');
      setItemNationId('');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Admin Access Required</h1>
          <p className="mb-4">Please log in to access the admin dashboard.</p>
          <button onClick={login} className="bg-blue-500 text-white px-6 py-2 rounded">
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">House of Gon - Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex space-x-8">
                <Link to="/" className="text-gray-900 hover:text-gray-600">Home</Link>
                <Link to="/travel" className="text-gray-900 hover:text-gray-600">Travel</Link>
                <Link to="/food" className="text-gray-900 hover:text-gray-600">Food</Link>
                <Link to="/toy" className="text-gray-900 hover:text-gray-600">Toy</Link>
                <Link to="/baby" className="text-gray-900 hover:text-gray-600">Baby</Link>
                <Link to="/admin" className="text-red-600 font-semibold">Admin</Link>
              </nav>
              <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('nations')}
            className={`px-4 py-2 rounded ${activeTab === 'nations' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Manage Nations
          </button>
          <button
            onClick={() => setActiveTab('items')}
            className={`px-4 py-2 rounded ${activeTab === 'items' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Add Items
          </button>
        </div>

        {/* Nations Tab */}
        {activeTab === 'nations' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Add New Nation</h3>
            <form onSubmit={addNation} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Nation Name</label>
                <input
                  type="text"
                  value={nationName}
                  onChange={(e) => setNationName(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Flag URL</label>
                <input
                  type="url"
                  value={nationFlagUrl}
                  onChange={(e) => setNationFlagUrl(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                Add Nation
              </button>
            </form>

            <h3 className="text-xl font-bold mt-8 mb-4">Existing Nations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {nations.map((nation) => (
                <div key={nation.id} className="border rounded p-4">
                  <div className="flex items-center">
                    {nation.flag_url && <img src={nation.flag_url} alt={nation.name} className="w-8 h-6 mr-2" />}
                    <span className="font-medium">{nation.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Items Tab */}
        {activeTab === 'items' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Add New Item</h3>
            <form onSubmit={addItem} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Category</label>
                <select
                  value={itemCategory}
                  onChange={(e) => setItemCategory(e.target.value as 'travel' | 'food' | 'toy')}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="travel">Travel</option>
                  <option value="food">Food</option>
                  <option value="toy">Toy</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Nation</label>
                <select
                  value={itemNationId}
                  onChange={(e) => setItemNationId(e.target.value ? parseInt(e.target.value) : '')}
                  className="w-full px-3 py-2 border rounded"
                  required
                >
                  <option value="">Select a nation</option>
                  {nations.map((nation) => (
                    <option key={nation.id} value={nation.id}>{nation.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Item Name</label>
                <input
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  value={itemDescription}
                  onChange={(e) => setItemDescription(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Image URL</label>
                <input
                  type="url"
                  value={itemImageUrl}
                  onChange={(e) => setItemImageUrl(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                Add Item
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2026 House of Gon. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

// Declare global window
declare global {
  interface Window {
    netlifyIdentity: {
      init: () => void;
      on: (event: string, callback: (user?: NetlifyUser) => void) => void;
      currentUser: () => NetlifyUser | null;
      open: () => void;
      logout: () => void;
    };
  }
}
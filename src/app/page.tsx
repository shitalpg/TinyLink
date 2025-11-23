'use client';

import { useState, useEffect } from 'react';
import AddLinkForm from '../components/AddLinkForm';
import LinkTable from '../components/LinkTable';

interface Link {
  id: string;
  code: string;
  url: string;
  clicks: number;
  last_clicked: string | null;
  created_at: string;
}

export default function Home() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLinks = async () => {
    try {
      const res = await fetch('/api/links');
      if (res.ok) {
        const data = await res.json();
        setLinks(data);
      }
    } catch (error) {
      console.error('Failed to fetch links:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleAdd = () => {
    fetchLinks();
  };

  const handleDelete = () => {
    fetchLinks();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">TinyLink</h1>
        <AddLinkForm onAdd={handleAdd} />
        {loading ? (
          <p className="text-center text-gray-500">Loading links...</p>
        ) : (
          <LinkTable links={links} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}

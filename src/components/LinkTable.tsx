'use client';

import { useState } from 'react';

interface Link {
  id: string;
  code: string;
  url: string;
  clicks: number;
  last_clicked: string | null;
  created_at: string;
}

export default function LinkTable({ links, onDelete }: { links: Link[], onDelete: () => void }) {
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (code: string) => {
    setDeleting(code);
    try {
      const res = await fetch(`/api/links/${code}`, { method: 'DELETE' });
      if (res.ok) {
        onDelete();
      } else {
        alert('Failed to delete link');
      }
    } catch (error) {
      alert('Network error');
    } finally {
      setDeleting(null);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Code</th>
            <th className="border border-gray-300 px-4 py-2">URL</th>
            <th className="border border-gray-300 px-4 py-2">Clicks</th>
            <th className="border border-gray-300 px-4 py-2">Last Clicked</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => (
            <tr key={link.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                <span className="font-mono">{link.code}</span>
                <button
                  onClick={() => copyToClipboard(`${window.location.origin}/${link.code}`)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  Copy
                </button>
              </td>
              <td className="border border-gray-300 px-4 py-2 max-w-xs truncate" title={link.url}>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {link.url}
                </a>
              </td>
              <td className="border border-gray-300 px-4 py-2">{link.clicks}</td>
              <td className="border border-gray-300 px-4 py-2">
                {link.last_clicked ? new Date(link.last_clicked).toLocaleString() : 'Never'}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleDelete(link.code)}
                  disabled={deleting === link.code}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 disabled:opacity-50"
                >
                  {deleting === link.code ? 'Deleting...' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

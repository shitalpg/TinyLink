'use client';

import { useState } from 'react';
import { Link45deg, CodeSlash, ExclamationTriangle, PlusCircle } from 'react-bootstrap-icons';

export default function AddLinkForm({ onAdd }: { onAdd: () => void }) {
  const [url, setUrl] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, code: code || undefined }),
      });

      if (res.ok) {
        setUrl('');
        setCode('');
        onAdd();
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to create link');
      }
    } catch (error) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        space-y-10 
        p-12 
        rounded-3xl 
        shadow-[0_20px_60px_rgba(99,102,241,0.25)] 
        bg-gradient-to-br 
        from-[#ffffff]/90 via-[#f9f9ff]/80 to-[#f0faff]/90
        backdrop-blur-xl
        border-[3px] border-white/30
        font-[Inter]
        transition-all
      "
    >
      {/* Title */}
      <div className="flex items-center space-x-4">
        <h2 className="text-4xl font-extrabold tracking-wide 
          bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
          Add New Link
        </h2>
      </div>

      {/* URL Input */}
      <div className="space-y-3">
        <label className="block text-xl font-semibold text-purple-900 flex items-center">
          <Link45deg size={26} className="mr-3 text-purple-500" />
          URL (Website Link)
        </label>

        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="
            w-full 
            rounded-2xl 
            px-6 py-5 
            text-xl
            bg-white/70 
            shadow-inner 
            focus:shadow-lg 
            focus:ring-4 
            focus:ring-purple-400 
            outline-none 
            transition-all 
            hover:scale-[1.01]
            placeholder:text-gray-400
          "
          placeholder="https://example.com"
        />
      </div>

      {/* Custom Code */}
      <div className="space-y-3">
        <label className="block text-xl font-semibold text-green-900 flex items-center">
          <CodeSlash size={26} className="mr-3 text-green-500" />
          Custom Code (Optional)
        </label>

        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          pattern="^[A-Za-z0-9]{6,8}$"
          className="
            w-full 
            rounded-2xl 
            px-6 py-5 
            text-xl
            bg-white/70 
            shadow-inner 
            focus:shadow-lg 
            focus:ring-4 
            focus:ring-green-400 
            outline-none 
            transition-all 
            hover:scale-[1.01]
            placeholder:text-gray-400
          "
          placeholder="abc12345"
        />
      </div>

      {/* Error Box */}
      {error && (
        <div className="flex items-center space-x-4 text-xl text-red-900 
          bg-gradient-to-r from-red-100 to-red-200 
          p-6 rounded-2xl shadow-inner border border-red-300 animate-pulse">
          <ExclamationTriangle size={28} />
          <p className="font-semibold">{error}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="
          mt-4
          w-full 
          text-2xl
          font-semibold
          bg-gradient-to-r 
          from-pink-500 via-purple-600 to-indigo-600 
          text-white px-8 py-5 
          rounded-2xl 
          shadow-xl 
          hover:shadow-[0_10px_30px_rgba(147,51,234,0.5)] 
          hover:scale-[1.05]
          active:scale-[0.98]
          disabled:opacity-50 
          disabled:cursor-not-allowed 
          transition-all duration-300 ease-in-out
          flex items-center justify-center 
          space-x-4
          relative overflow-hidden
          group
        "
      >
        {/* Shimmer effect */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
          translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></span>

        {loading ? (
          <>
            <div className="animate-spin rounded-full h-7 w-7 border-t-4 border-b-4 border-white/70"></div>
            <span>Creating...</span>
          </>
        ) : (
          <>
            <PlusCircle size={30} />
            <span>Create Link</span>
          </>
        )}
      </button>
    </form>
  );
}

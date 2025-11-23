import pool from '@/lib/db';

export default async function StatsPage({ params }: { params: { code: string } }) {
  const { code } = params;

  try {
    const result = await pool.query('SELECT * FROM links WHERE code = $1', [code]);

    if (result.rows.length === 0) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <h1 className="text-2xl font-bold">404 - Link not found</h1>
        </div>
      );
    }

    const link = result.rows[0];

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Link Stats</h1>
        <div className="bg-white shadow rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="text-lg font-semibold">Code</h2>
              <p className="font-mono">{link.code}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Short URL</h2>
              <p className="font-mono">{`${process.env.BASE_URL || 'http://localhost:3000'}/${link.code}`}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Original URL</h2>
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {link.url}
              </a>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Clicks</h2>
              <p>{link.clicks}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Last Clicked</h2>
              <p>{link.last_clicked ? new Date(link.last_clicked).toLocaleString() : 'Never'}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Created At</h2>
              <p>{new Date(link.created_at).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-2xl font-bold">500 - Internal server error</h1>
      </div>
    );
  }
}

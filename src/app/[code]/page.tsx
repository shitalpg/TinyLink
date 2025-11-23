import { redirect } from 'next/navigation';
import { db } from '@/lib/db';

export default function CodePage({ params }: { params: { code: string } }) {
  const { code } = params;

  // Fetch the link from the database
  const link = db.prepare('SELECT url FROM links WHERE code = ?').get(code);

  if (!link) {
    redirect('/404');
  }

  // Redirect to the original URL
  redirect(link.url);
}

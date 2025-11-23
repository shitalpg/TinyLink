import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { db } from '@/lib/db';
import { linkSchema, generateCode } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, code } = linkSchema.parse(body);

    const finalCode = code || generateCode();

    // Check if code exists
    const existing = db.prepare('SELECT id FROM links WHERE code = ?').get(finalCode);
    if (existing) {
      return NextResponse.json({ error: 'Code already exists' }, { status: 409 });
    }

    // Insert new link
    const stmt = db.prepare('INSERT INTO links (code, url) VALUES (?, ?) RETURNING *');
    const result = stmt.run(finalCode, url);

    // Get the inserted row
    const inserted = db.prepare('SELECT * FROM links WHERE id = ?').get(result.lastInsertRowid);

    return NextResponse.json(inserted);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const result = db.prepare('SELECT * FROM links ORDER BY created_at DESC').all();
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

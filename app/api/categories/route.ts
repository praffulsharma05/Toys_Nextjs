import { NextResponse } from 'next/server';
import { CATEGORIES } from '@/lib/products';

export async function GET() {
  return NextResponse.json({ success: true, data: CATEGORIES });
}

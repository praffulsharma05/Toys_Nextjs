import { NextResponse } from 'next/server';
import { seedDatabase } from '@/prisma/seed';

export async function POST() {
  try {
    await seedDatabase();
    return NextResponse.json({ success: true, message: 'MySQL database seeded successfully!' });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : 'Failed to seed database';
    return NextResponse.json(
      { success: false, error: errMsg },
      { status: 500 }
    );
  }
}

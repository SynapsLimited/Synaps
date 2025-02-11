// app/api/users/authors/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { User } from '@/lib/models/User';

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const authors = await User.find().select('-password');
    return NextResponse.json(authors, { status: 200 });
  } catch (error) {
    console.error('Get Authors Error:', error);
    return NextResponse.json({ message: 'Error retrieving authors.' }, { status: 500 });
  }
}

// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/mongodb';
import { User } from '@/lib/models/User';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Await the params promise to extract the id.
  const { id } = await params;
  
  // Validate that the id is a valid MongoDB ObjectId.
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: "User not found." }, { status: 404 });
  }
  
  try {
    await connectToDatabase();
    const user = await User.findById(id).select('-password').lean();
    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }
    // Remove _id by destructuring instead of delete.
    const { _id, ...userWithoutId } = user;
    const userObj = { ...userWithoutId, id: _id.toString() };
    return NextResponse.json(userObj, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    // Return a 404 for any errors during the fetch process.
    return NextResponse.json({ message: "User not found." }, { status: 404 });
  }
}

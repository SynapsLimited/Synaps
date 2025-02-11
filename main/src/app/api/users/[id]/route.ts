// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { User } from '@/lib/models/User';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Await the params promise to extract the id.
  const { id } = await params;
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
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

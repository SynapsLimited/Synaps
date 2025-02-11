// app/api/posts/users/[userId]/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Post from '@/lib/models/Post';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    await connectToDatabase();
    const { userId } = params;
    
    // Find posts whose "creator" matches the provided userId.
    // (If your creator field is stored as an ObjectId, Mongoose will usually handle conversion.)
    const posts = await Post.find({ creator: userId }).sort({ updatedAt: -1 });
    
    return NextResponse.json(posts, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

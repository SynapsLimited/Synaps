// app/api/posts/users/[userId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Post from '@/lib/models/Post';

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
): Promise<NextResponse> {
  try {
    await connectToDatabase();
    const { userId } = params;
    const posts = await Post.find({ creator: userId }).sort({ updatedAt: -1 });
    return NextResponse.json(posts, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

// lib/serverUtils.ts
import jwt from 'jsonwebtoken';
import { connectToDatabase } from './mongodb';
import { User } from './models/User';
import Post from './models/Post';

export async function getUserFromToken(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    await connectToDatabase();
    const userDoc = await User.findById(decoded.id).select('-password').lean();
    if (!userDoc) return null;
    const { _id, ...userWithoutId } = userDoc;
    return { ...userWithoutId, id: _id.toString() };
  } catch (err) {
    console.error('Error decoding token:', err);
    return null;
  }
}

export async function getPostsByUser(userId: string) {
  try {
    await connectToDatabase();
    const posts = await Post.find({ creator: userId }).sort({ updatedAt: -1 }).lean();
    return posts.map((post: any) => ({
      ...post,
      _id: post._id.toString(),
      // Convert creator to string if possible
      creator: (post.creator && typeof post.creator.toString === 'function')
        ? post.creator.toString()
        : post.creator,
      // Optionally, convert dates to strings if needed
      createdAt: post.createdAt ? post.createdAt.toString() : null,
      updatedAt: post.updatedAt ? post.updatedAt.toString() : null,
    }));
  } catch (err) {
    console.error('Error fetching posts:', err);
    return [];
  }
}

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
    // Destructure _id and convert it to string
    const { _id, ...userWithoutId } = userDoc;
    const user = { ...userWithoutId, id: _id.toString() };
    // Force plain object conversion:
    return JSON.parse(JSON.stringify(user));
  } catch (err) {
    console.error('Error decoding token:', err);
    return null;
  }
}

export async function getPostsByUser(userId: string) {
  try {
    await connectToDatabase();
    const posts = await Post.find({ creator: userId }).sort({ updatedAt: -1 }).lean();
    // Map over posts, converting ObjectIds (and any nested object) to strings.
    const mappedPosts = posts.map((post: any) => ({
      ...post,
      _id: post._id.toString(),
      // Convert creator to a string if needed
      creator: post.creator ? post.creator.toString() : null,
    }));
    // Convert to a plain object.
    return JSON.parse(JSON.stringify(mappedPosts));
  } catch (err) {
    console.error('Error fetching posts:', err);
    return [];
  }
}

// app/api/posts/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Post from '@/lib/models/Post';
import { User } from '@/lib/models/User';
import { slugify } from '@/utils/slugify';
import { uploadToVercelBlob } from '@/lib/utils/uploadtoVercelBlob';
import { deleteFromVercelBlob } from '@/lib/utils/deleteFromVercelBlob';
import { v4 as uuid } from 'uuid';

export async function GET() {
  try {
    await connectToDatabase();
    const posts = await Post.find().sort({ updatedAt: -1 });
    return NextResponse.json(posts);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    // Parse multipart/form-data.
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;
    const file = formData.get('thumbnail') as File;

    if (!title || !category || !description || !file) {
      return NextResponse.json(
        { message: "Fill in all fields and choose a thumbnail." },
        { status: 422 }
      );
    }

    // Convert the File into a Buffer.
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileName = `thumbnails/${Date.now()}-${file.name}`;
    const thumbnailUrl = await uploadToVercelBlob(fileBuffer, fileName);

    // Generate slug from title (append a UUID if duplicate exists).
    let slug = slugify(title);
    const existingPost = await Post.findOne({ slug });
    if (existingPost) {
      slug = `${slug}-${uuid()}`;
    }

    // Replace "dummyUserId" with the actual authenticated user’s id if available.
    const creatorId = "dummyUserId";

    const newPost = await Post.create({
      title,
      slug,
      category,
      description,
      thumbnail: thumbnailUrl,
      creator: creatorId,
    });

    // (Optional) Update the user's post count.
    const currentUser = await User.findById(creatorId);
    if (currentUser) {
      currentUser.posts = (currentUser.posts || 0) + 1;
      await currentUser.save();
    }

    return NextResponse.json(newPost, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

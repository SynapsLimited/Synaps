// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Post from '@/lib/models/Post';
import { slugify } from '@/utils/slugify';
import { uploadToVercelBlob } from '@/lib/utils/uploadtoVercelBlob';
import { v4 as uuid } from 'uuid';

export async function GET(request: NextRequest) {
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

export async function POST(request: NextRequest) {
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

    // Convert File to Buffer.
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileName = `thumbnails/${Date.now()}-${file.name}`;
    const thumbnailUrl = await uploadToVercelBlob(fileBuffer, fileName);

    // Generate slug from title (append a UUID if duplicate exists).
    let slug = slugify(title);
    const existingPost = await Post.findOne({ slug });
    if (existingPost) {
      slug = `${slug}-${uuid()}`;
    }

    // Replace "dummyUserId" with a valid user id. For testing, use a known id.
    const creatorId = "665f2418e38f20b293d9a3fa";

    const newPost = await Post.create({
      title,
      slug,
      category,
      description,
      thumbnail: thumbnailUrl,
      creator: creatorId,
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/posts error:", error);
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

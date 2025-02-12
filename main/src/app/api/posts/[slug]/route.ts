// app/api/posts/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/mongodb';
import Post from '@/lib/models/Post';
import { uploadToVercelBlob } from '@/lib/utils/uploadtoVercelBlob';
import { deleteFromVercelBlob } from '@/lib/utils/deleteFromVercelBlob';
import { slugify } from '@/utils/slugify';
import { v4 as uuid } from 'uuid';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
): Promise<NextResponse> {
  const { slug } = await params;
  try {
    await connectToDatabase();
    // First, try to find the post by its slug field.
    let post = await Post.findOne({ slug });
    // If not found and the slug looks like a valid ObjectId, try to fetch the post by _id.
    if (!post && mongoose.Types.ObjectId.isValid(slug)) {
      post = await Post.findById(slug);
      if (post && !post.slug) {
        // Generate and update the slug for legacy posts.
        let newSlug = slugify(post.title);
        const duplicate = await Post.findOne({ slug: newSlug });
        if (duplicate && duplicate._id.toString() !== post._id.toString()) {
          newSlug = `${newSlug}-${uuid()}`;
        }
        post.slug = newSlug;
        await post.save();
      }
    }
    if (!post) {
      return NextResponse.json(
        { message: "Post not found." },
        { status: 404 }
      );
    }
    return NextResponse.json(post, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Post does not exist" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
): Promise<NextResponse> {
  const { slug } = await params;
  try {
    await connectToDatabase();
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;
    const file = formData.get('thumbnail') as File | null;

    if (!title || !category || !description) {
      return NextResponse.json(
        { message: "Fill in all fields." },
        { status: 422 }
      );
    }

    let oldPost = await Post.findOne({ slug });
    if (!oldPost) {
      // If not found by slug, try by _id if the slug parameter is a valid ObjectId.
      if (mongoose.Types.ObjectId.isValid(slug)) {
        oldPost = await Post.findById(slug);
      }
      if (!oldPost) {
        return NextResponse.json(
          { message: "Post not found." },
          { status: 404 }
        );
      }
    }

    let newThumbnailUrl = oldPost.thumbnail;
    if (file && file.size > 0) {
      const fileBuffer = Buffer.from(await file.arrayBuffer());
      const fileName = `thumbnails/${Date.now()}-${file.name}`;
      newThumbnailUrl = await uploadToVercelBlob(fileBuffer, fileName);
      if (oldPost.thumbnail) {
        await deleteFromVercelBlob(oldPost.thumbnail);
      }
    }

    // If title changes, generate a new slug.
    let newSlug = oldPost.slug;
    if (title !== oldPost.title) {
      newSlug = slugify(title);
      const duplicate = await Post.findOne({ slug: newSlug });
      if (duplicate && duplicate._id.toString() !== oldPost._id.toString()) {
        newSlug = `${newSlug}-${uuid()}`;
      }
    }

    oldPost.title = title;
    oldPost.slug = newSlug;
    oldPost.category = category;
    oldPost.description = description;
    oldPost.thumbnail = newThumbnailUrl;
    await oldPost.save();

    return NextResponse.json(oldPost, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Couldn't update post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
): Promise<NextResponse> {
  const { slug } = await params;
  try {
    await connectToDatabase();
    let post = await Post.findOne({ slug });
    if (!post && mongoose.Types.ObjectId.isValid(slug)) {
      post = await Post.findById(slug);
      if (!post) {
        return NextResponse.json(
          { message: "Post not found." },
          { status: 404 }
        );
      }
    }
    if (post.thumbnail) {
      await deleteFromVercelBlob(post.thumbnail);
    }
    await Post.deleteOne({ _id: post._id });

    return NextResponse.json(
      { message: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Couldn't delete post." },
      { status: 400 }
    );
  }
}

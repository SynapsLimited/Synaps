// app/api/posts/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Post from '@/lib/models/Post';
import { User } from '@/lib/models/User';
import { uploadToVercelBlob } from '@/lib/utils/uploadtoVercelBlob';
import { deleteFromVercelBlob } from '@/lib/utils/deleteFromVercelBlob';
import { slugify } from '@/utils/slugify';
import { v4 as uuid } from 'uuid';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  try {
    await connectToDatabase();
    let post = await Post.findOne({ slug });
    if (!post) {
      // Fallback: perhaps this legacy post was created by _id.
      try {
        post = await Post.findById(slug);
      } catch (error) {
        // invalid id format
      }
      if (post && !post.slug) {
        // Generate and update slug for the legacy post.
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
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
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
      // Fallback: check by _id if not found by slug.
      try {
        oldPost = await Post.findById(slug);
      } catch (error) {}
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
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  try {
    await connectToDatabase();
    let post = await Post.findOne({ slug });
    if (!post) {
      try {
        post = await Post.findById(slug);
      } catch (error) {}
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

    // Update the dummy user's post count. (Replace with real auth logic as needed)
    const currentUser = await User.findById("dummyUserId");
    if (currentUser) {
      currentUser.posts = (currentUser.posts || 1) - 1;
      await currentUser.save();
    }
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

// src/app/api/users/change-avatar/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { User } from '@/lib/models/User';
import { uploadToVercelBlob } from '@/lib/utils/uploadtoVercelBlob';
import { deleteFromVercelBlob } from '@/lib/utils/deleteFromVercelBlob';
import { getAuthUser } from '@/lib/utils/auth';

export const runtime = 'nodejs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    // Get the current user ID using our auth helper.
    const { id: userId } = getAuthUser(req);

    const formData = await req.formData();
    console.log("Form data keys:", Array.from(formData.keys()));

    // The avatar file should be sent under the "avatar" field.
    const file = formData.get('avatar');
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ message: "No avatar file provided." }, { status: 422 });
    }
    console.log("File received:", file.name);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const newPublicId = `avatars/${Date.now()}.jpg`;
    const newAvatarUrl = await uploadToVercelBlob(buffer, newPublicId);
    console.log("Uploaded to Vercel Blob. URL:", newAvatarUrl);

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }
    const oldPublicId = user.avatarPublicId;
    user.avatar = newAvatarUrl;
    user.avatarPublicId = newPublicId;
    const updatedUser = await user.save();

    // Optionally delete the old avatar.
    if (oldPublicId) {
      try {
        await deleteFromVercelBlob(oldPublicId);
      } catch (deleteError) {
        console.error("Failed to delete old avatar:", deleteError);
      }
    }
    return NextResponse.json({ avatar: updatedUser.avatar }, { status: 200 });
  } catch (error) {
    console.error("Error in changing avatar:", error);
    return NextResponse.json({ message: "Failed to update avatar." }, { status: 500 });
  }
}

// src/app/api/users/edit-user/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb';
import { User } from '@/lib/models/User';
import { getAuthUser } from '@/lib/utils/auth';

export async function PATCH(req: NextRequest) {
  try {
    await connectToDatabase();

    // Get authenticated user via our custom auth helper.
    const { id: userId } = getAuthUser(req);

    const { name, email, currentPassword, newPassword, confirmNewPassword } = await req.json();
    if (!name || !email || !currentPassword || !newPassword) {
      return NextResponse.json({ message: "Fill in all fields" }, { status: 422 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 403 });
    }

    const normalizedEmail = email.toLowerCase();
    const emailExist = await User.findOne({ email: normalizedEmail });
    if (emailExist && String(emailExist._id) !== userId) {
      return NextResponse.json({ message: "Email already exists." }, { status: 422 });
    }

    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) {
      return NextResponse.json({ message: "Invalid current password." }, { status: 422 });
    }

    if (newPassword !== confirmNewPassword) {
      return NextResponse.json({ message: "New passwords do not match." }, { status: 422 });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);
    user.name = name;
    user.email = normalizedEmail;
    user.password = hash;

    const updatedUser = await user.save();
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Edit User Error:", error);
    return NextResponse.json({ message: "Failed to edit user." }, { status: 500 });
  }
}

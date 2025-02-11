// app/api/users/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb';
import { User } from '@/lib/models/User';

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { name, email, password, password2 } = await req.json();

    if (!name || !email || !password || !password2) {
      return NextResponse.json({ message: "Fill in all fields." }, { status: 422 });
    }
    const newEmail = email.toLowerCase();

    // Use your environment variable (comma‑separated) for allowed emails
    const allowedEmailsEnv = process.env.ALLOWED_EMAILS;
    const allowedEmails = allowedEmailsEnv
      ? allowedEmailsEnv.split(',').map((e) => e.trim().toLowerCase())
      : [];

    if (!allowedEmails.includes(newEmail)) {
      return NextResponse.json(
        { message: "Not authorized to register. Contact Synaps!" },
        { status: 422 }
      );
    }

    const emailExists = await User.findOne({ email: newEmail });
    if (emailExists) {
      return NextResponse.json({ message: "Email already exists." }, { status: 422 });
    }

    if (password.trim().length < 6) {
      return NextResponse.json(
        { message: "Password should be at least 6 characters." },
        { status: 422 }
      );
    }

    if (password !== password2) {
      return NextResponse.json({ message: "Passwords do not match." }, { status: 422 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const newUser = await User.create({ name, email: newEmail, password: hashedPass });
    return NextResponse.json(
      { message: `New User ${newUser.email} registered.` },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json({ message: "User Registration failed." }, { status: 422 });
  }
}

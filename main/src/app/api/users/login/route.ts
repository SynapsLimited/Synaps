// app/api/users/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/mongodb';
import { User } from '@/lib/models/User';
import mongoose from 'mongoose';

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { email, password } = await req.json();
    const emailInput = email ? email.trim() : '';
    const passwordInput = password ? password.trim() : '';

    if (!emailInput || !passwordInput) {
      return NextResponse.json({ message: "Fill in all fields." }, { status: 422 });
    }
    const newEmail = emailInput.toLowerCase();
    const user = await User.findOne({ email: newEmail });
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 422 });
    }
    const comparePass = await bcrypt.compare(passwordInput, user.password);
    if (!comparePass) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 422 });
    }

    const payload = { id: (user._id as mongoose.Types.ObjectId).toString(), name: user.name };
    // Set token to expire in 1 hour
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "1h" });

    const response = NextResponse.json({ id: (user._id as mongoose.Types.ObjectId).toString(), name: user.name });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60, // 1 hour in seconds
    });
    return response;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { message: "Login failed. Please check your credentials." },
      { status: 422 }
    );
  }
}

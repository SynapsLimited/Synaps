// app/api/users/me/route.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/mongodb';
import { User } from '@/lib/models/User';

export async function GET(req: NextRequest) {
  try {
    // Get the token from cookies
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    await connectToDatabase();
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error in /me route:", error);
    return NextResponse.json({ message: "Authentication failed" }, { status: 500 });
  }
}

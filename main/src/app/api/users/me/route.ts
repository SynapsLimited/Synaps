// app/api/users/me/route.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/mongodb';
import { User } from '@/lib/models/User';

export async function GET(req: NextRequest) {
  try {
    // Try to get the token from cookies.
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(null, { status: 200 });
    }

    // Verify the token.
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

    await connectToDatabase();
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return NextResponse.json(null, { status: 200 });
    }

    // Convert the Mongoose document into a plain object and safely convert _id.
    const userObjRaw = user.toObject();
    const userObj = { ...userObjRaw, id: String(userObjRaw._id) };
    delete userObj._id;

    return NextResponse.json(userObj, { status: 200 });
  } catch (error) {
    console.error("Error in /me route:", error);
    // On error, return null rather than an error code.
    return NextResponse.json(null, { status: 200 });
  }
}

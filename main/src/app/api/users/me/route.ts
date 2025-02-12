// app/api/users/me/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function GET(request: Request) {
  // Await the cookies() promise to obtain the cookie store.
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  // If there's no token, the user is not authenticated.
  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    // Ensure you have your JWT secret in your environment variables.
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not configured');
    }

    // Verify the token and extract the payload.
    const payload = jwt.verify(token, secret) as { id: string; name: string };

    // Return the user information (without the token) in JSON.
    return NextResponse.json({
      id: payload.id,
      name: payload.name,
    });
  } catch (error) {
    // If token verification fails, return an error response.
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}

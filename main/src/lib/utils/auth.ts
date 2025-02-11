// src/lib/utils/auth.ts
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export interface JwtPayload {
  id: string;
  name: string;
}

export const getAuthUser = (req: NextRequest): JwtPayload => {
  const token = req.cookies.get('token')?.value;
  if (!token) {
    // In development, fallback to a default user if provided.
    if (process.env.NODE_ENV !== 'production' && process.env.DEFAULT_USER_ID) {
      return { id: process.env.DEFAULT_USER_ID, name: "Default User" };
    }
    throw new Error("Unauthorized: No token provided.");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    return decoded;
  } catch (err) {
    throw new Error("Unauthorized: Invalid token.");
  }
};

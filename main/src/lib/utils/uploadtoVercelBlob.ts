// lib/utils/uploadtoVercelBlob.ts
import { put } from '@vercel/blob';

export const uploadToVercelBlob = async (
  fileBuffer: Buffer,
  fileName: string
): Promise<string> => {
  try {
    // The options object is cast as any because the typings do not include "headers"
    const options = {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
      headers: { Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN}` },
    } as any;
    const { url } = await put(fileName, fileBuffer, options);
    console.log("Uploaded successfully to Vercel Blob:", url);
    return url;
  } catch (error) {
    console.error("Error uploading file to Vercel Blob:", error);
    throw new Error("Failed to upload file to Vercel Blob");
  }
};

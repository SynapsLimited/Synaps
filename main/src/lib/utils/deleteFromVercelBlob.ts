// lib/utils/deleteFromVercelBlob.ts
import { del } from '@vercel/blob';

export const deleteFromVercelBlob = async (fileName: string): Promise<void> => {
  try {
    const options = {
      token: process.env.BLOB_READ_WRITE_TOKEN,
      headers: { Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN}` },
    } as any;
    await del(fileName, options);
    console.log("Deleted successfully from Vercel Blob:", fileName);
  } catch (error) {
    console.error("Error deleting file from Vercel Blob:", error);
    throw new Error("Failed to delete file from Vercel Blob");
  }
};

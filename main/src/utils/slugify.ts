// src/utils/slugify.ts
export const slugify = (title: string): string => {
    return title
      .toLowerCase() // Convert to lowercase
      .replace(/[:\/?#<>]/g, '') // Remove problematic characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
      .trim(); // Trim leading/trailing whitespace or hyphens
  };
// src/app/blog/authors/[id]/interfaces.ts

export interface Post {
    _id: string;
    slug: string;
    thumbnail: string;
    category: string;
    title: string;
    description: string;
    creator: string;
    createdAt: string;
  }
  
  export interface Author {
    _id: string;
    name: string;
    avatar?: string;
  }
  
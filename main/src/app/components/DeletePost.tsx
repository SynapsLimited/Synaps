'use client';

import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/context/userContext';
import axios from 'axios';

interface DeletePostProps {
  slug: string;
}

const DeletePost: React.FC<DeletePostProps> = ({ slug }) => {
  const router = useRouter();
  const { currentUser, loading } = useContext(UserContext);

  // Check for a logged‑in user
  useEffect(() => {
    if (loading) return;
    if (!currentUser) {
      router.push('/login');
    }
  }, [currentUser, loading, router]);

  const removePost = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      const response = await axios.delete(`/api/posts/${slug}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        router.push('/blog');
      }
    } catch (error: any) {
      console.error("Couldn't delete post:", error.response?.data.message || error);
    }
  };

  return (
    <button className="btn btn-secondary" onClick={removePost}>
      Delete
    </button>
  );
};

export default DeletePost;

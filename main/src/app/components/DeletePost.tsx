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
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  const removePost = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      const response = await axios.delete(`/api/posts/${slug}`, {
        headers: { Authorization: `Bearer ${token}` },
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

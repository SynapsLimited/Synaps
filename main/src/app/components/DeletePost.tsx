// src/components/DeletePost.tsx

'use client';

import React, { useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { UserContext } from '../../context/userContext';
import axios from 'axios';

interface DeletePostProps {
  postId: string;
}

const DeletePost: React.FC<DeletePostProps> = ({ postId }) => {
  const router = useRouter();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  // Redirect to login page for any user who isn't logged in
  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  const removePost = async () => {
    const confirmDelete = confirm('Are you sure you want to delete this post?');
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`/posts/${postId}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        console.log('Post deleted successfully. Redirecting to blog page...');
        router.push('/blog');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Couldn't delete post:", error.response.data.message);
      } else {
        console.error("Couldn't delete post:", error);
      }
    }
  };

  return (
    <button
      className='btn btn-secondary'
      style={{ fontFamily: 'Righteous, sans-serif' }}
      onClick={removePost}
    >
      Delete
    </button>
  );
};

export default DeletePost;

'use client';

import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { UserContext } from '@/context/userContext';
import Loader from '@/app/components/Loader';
import DeletePost from '@/app/components/DeletePost';
import PostAuthor from '@/app/components/PostAuthor';
import { useTranslation } from 'react-i18next';

interface Creator {
  _id: string;
}

interface Post {
  _id: string;
  title: string;
  slug?: string;
  thumbnail?: string;
  description: string;
  creator: Creator | string;
  createdAt: string;
}

const PostDetail = () => {
  const { t } = useTranslation();
  const params = useParams();
  const slugParam = params?.slug as string;
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    if (!slugParam) return;
    const getPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/posts/${slugParam}`);
        setPost(response.data);
      } catch (err: any) {
        setError(
          err.response?.data.message ||
            'An error occurred while fetching the post.'
        );
      } finally {
        setIsLoading(false);
      }
    };
    getPost();
  }, [slugParam]);

  if (isLoading) return <Loader />;
  if (error) return <p className="error">{error}</p>;
  if (!post) return <p className="error">Post not found.</p>;

  // Updated fallback: if no stored slug, use _id.
  const displaySlug =
    post.slug && post.slug.trim().length > 0 ? post.slug : post._id;

  // Determine the post creator's ID.
  const postCreatorId =
    typeof post.creator === 'string' ? post.creator : post.creator._id;
  // currentUser.id is assumed to be the correct identifier.
  const currentUserId = currentUser?.id;

  return (
    <div className="post-detail-section">
      <section className="container post-detail">
        <div className="post-detail-header">
          <PostAuthor authorID={postCreatorId} createdAt={post.createdAt} />
          {currentUserId === postCreatorId && (
            <div className="post-detail-buttons">
              <Link href={`/blog/${displaySlug}/edit`} className="btn btn-primary">
                {t('Dashboard.editButton')}
              </Link>
              <DeletePost slug={displaySlug} />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <div className="post-detail-thumbnail">
          <img
            src={post.thumbnail || '/assets/Blog-default.webp'}
            alt={post.title}
          />
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.description }} />
        <div className="navigation-buttons">
          <Link className="btn btn-primary" href="/blog">
            Back to Blog
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PostDetail;

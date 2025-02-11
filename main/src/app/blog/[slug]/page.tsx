'use client';
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import PostAuthor from '@/app/components/PostAuthor';
import Loader from '@/app/components/Loader';
import DeletePost from '@/app/components/DeletePost';
import { UserContext } from '@/context/userContext';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useParams } from 'next/navigation';

interface Creator {
  _id: string;
}

interface Post {
  _id: string;
  title: string;
  slug: string;
  thumbnail: string;
  description: string;
  creator: Creator | string;
  createdAt: string;
}

const PostDetail: React.FC = () => {
  const { t } = useTranslation();
  const params = useParams();
  const slug = params?.slug;
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const getPost = async () => {
      if (!slug) return;
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/posts/${slug}`);
        const fetchedPost = response.data;
        if (!fetchedPost.slug) {
          fetchedPost.slug = slug;
        }
        setPost(fetchedPost);
      } catch (error: any) {
        setError(error.response?.data.message || 'An error occurred while fetching the post.');
      }
      setIsLoading(false);
    };
    getPost();
  }, [slug]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p className='error'>{error}</p>;
  }

  if (!post) {
    return <p className='error'>Post not found.</p>;
  }

  const defaultThumbnail = '/assets/Blog-default.webp';

  return (
    <div className='post-detail-section'>
      <section data-aos="fade-up" className="container post-detail">
        {post && post.creator ? (
          <div className="post-detail-container">
            <div className="post-detail-header">
              <PostAuthor
                authorID={typeof post.creator === 'string' ? post.creator : post.creator._id}
                createdAt={post.createdAt}
              />
              {currentUser?.id === (typeof post.creator === 'string' ? post.creator : post.creator._id) && (
                <div className="post-detail-buttons">
                  <Link href={`/blog/${post.slug}/edit`} className="btn btn-primary">
                    {t('Dashboard.editButton')}
                  </Link>
                  <DeletePost slug={post.slug} />
                </div>
              )}
            </div>
            <h1>{post.title}</h1>
            <div className="post-detail-thumbnail">
              <img src={post.thumbnail || defaultThumbnail} alt={post.title} />
            </div>
            <p dangerouslySetInnerHTML={{ __html: post.description }}></p>
          </div>
        ) : (
          <p className='error'>Author not found for this post.</p>
        )}
        <div className="flex flex-wrap justify-center items-center pt-[50px] space-x-4">
          <Link className="btn btn-primary px-6 py-3 text-center" href="/blog">
            Back to Blog
          </Link>
          <Link className="btn btn-secondary px-6 py-3 text-center" href="/posts">
            All Posts
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PostDetail;

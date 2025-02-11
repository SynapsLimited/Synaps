// src/app/blog/[slug]/page.tsx
'use client';
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import PostAuthor from '../../components/PostAuthor';
import '../../css/blog.css'; // Adjust the path as needed
import Loader from '../../components/Loader';
import DeletePost from '../../components/DeletePost';
import { UserContext } from '../../../context/userContext';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useParams } from 'next/navigation';
import { slugify } from '../../../utils/slugify';

interface Creator {
  _id: string;
  // Add other fields if needed
}

interface Post {
  _id: string;
  title: string;
  slug?: string; // Optional slug field
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
        // Fetch all posts from the backend (temporary workaround)
        const response = await axios.get(`/posts`);
        const posts = response.data;

        // Find the post with a matching slug or generate a slug dynamically
        const foundPost = posts.find((p: Post) => {
          const generatedSlug = p.slug || slugify(p.title); // Use the slugify utility
          return generatedSlug === slug || p._id === slug; // Match by slug or fallback to id
        });

        if (foundPost) {
          // Generate a slug if it doesn't exist
          foundPost.slug = foundPost.slug || slugify(foundPost.title);
          setPost(foundPost);
        } else {
          setError('No post data found.');
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          setError(error.response.data.message);
        } else {
          setError('An error occurred while fetching the post.');
        }
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

  // Default thumbnail if none is provided
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
                  {/* Note: Update the edit URL to use the slug */}
                  <Link href={`/blog/${post.slug}/edit`} className="btn btn-primary">
                    {t('Dashboard.editButton')}
                  </Link>
                  <DeletePost postId={post._id} />
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
          <Link
            className="btn btn-primary px-6 py-3 text-center"
            href="/blog"
          >
            Back to Blog
          </Link>
          <Link
            className="btn btn-secondary px-6 py-3 text-center"
            href="/posts"
          >
            All Posts
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PostDetail;
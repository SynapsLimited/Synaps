'use client';

import React, { useState, useEffect } from 'react'; 
import PostItem from './PostItem';
import Loader from './Loader';
import axios from 'axios';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

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

interface PostsProps {
  limit?: number;
}

const Posts: React.FC<PostsProps> = ({ limit }) => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<Post[]>(`/api/posts`);
        setPosts(response.data);
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
      setIsLoading(false);
    };
    fetchPosts();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const displayedPosts = limit ? posts.slice(0, limit) : posts;

  return (
    <section data-aos="fade-up" className="posts">
      <div className="blog-title-filtered">
        <h1>{t('posts.title')}</h1>
      </div>
      {displayedPosts.length > 0 ? (
        <div className="container posts-container">
          {displayedPosts.map(({ _id, slug, thumbnail, category, title, description, creator, createdAt }) => (
            <PostItem
              key={_id}
              _id={_id}
              slug={slug}
              thumbnail={thumbnail}
              category={category}
              title={title}
              description={description}
              authorID={creator}
              createdAt={createdAt}
            />
          ))}
        </div>
      ) : (
        <h1 className="error-blog-not-found">{t('posts.noPostsFound')}</h1>
      )}
      {limit && posts.length > limit && (
        <div className="read-more-container">
          <Link href="/posts" className="btn btn-secondary">
            {t('posts.readMore')}
          </Link> 
        </div>
      )}
    </section>
  );
};

export default Posts;

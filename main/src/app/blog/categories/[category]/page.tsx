'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import PostItem from '../../../components/PostItem';
import '../../../css/blog.css'; // Adjust the path as per your project structure
import Loader from '../../../components/Loader';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

interface Post {
  _id: string;
  slug: string;
  thumbnail: string;
  category: string;
  title: string;
  description: string;
  creator: string;
  createdAt: string;
}

const CategoryPosts: React.FC = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const params = useParams();
  const rawCategory = params?.category;

  // Ensure category is a string
  const category = Array.isArray(rawCategory) ? rawCategory[0] : rawCategory;

  useEffect(() => {
    const fetchPosts = async () => {
      if (!category) return;
      setIsLoading(true);
      try {
        // Fetch all posts from the backend endpoint
        const response = await axios.get<Post[]>(`/api/posts`);
        // Filter the posts on the client to include only those with the given category
        const filteredPosts = response.data.filter(
          (post) => post.category.toLowerCase() === category.toLowerCase()
        );
        setPosts(filteredPosts);
      } catch (err: unknown) {
        console.error('Error fetching category posts:', err);
      }
      setIsLoading(false);
    };
    fetchPosts();
  }, [category]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section data-aos="fade-up" className="posts">
      <div className="blog-title-filtered">
        <h1>{category ? t(`CategoryPosts.${category.toLowerCase()}`) : 'Category'}</h1>
      </div>

      {posts.length > 0 ? (
        <div className="container posts-container">
          {posts.map(
            ({
              _id: postId,
              slug,
              thumbnail,
              category,
              title,
              description,
              creator,
              createdAt,
            }) => (
              <PostItem
                key={postId}
                _id={postId}
                slug={slug}
                thumbnail={thumbnail}
                category={category}
                title={title}
                description={description}
                authorID={creator}
                createdAt={createdAt}
              />
            )
          )}
        </div>
      ) : (
        <h1 className="error-blog-not-found">{t('CategoryPosts.noPostsFound')}</h1>
      )}

      <section data-aos="fade-up" className="container blog-categories-section">
        <div className="blog-title">
          <h1>{t('CategoryPosts.categories')}</h1>
        </div>
        <ul className="blog-categories">
          <li className="btn btn-secondary">
            <Link href="/blog/categories/Marketing">{t('CategoryPosts.marketing')}</Link>
          </li>
          <li className="btn btn-secondary">
            <Link href="/blog/categories/Business">{t('CategoryPosts.business')}</Link>
          </li>
          <li className="btn btn-secondary">
            <Link href="/blog/categories/Technology">{t('CategoryPosts.technology')}</Link>
          </li>
          <li className="btn btn-secondary">
            <Link href="/blog/categories/AI">{t('CategoryPosts.ai')}</Link>
          </li>
          <li className="btn btn-secondary">
            <Link href="/blog/categories/Gaming">{t('CategoryPosts.gaming')}</Link>
          </li>
          <li className="btn btn-secondary">
            <Link href="/blog/categories/Product">{t('CategoryPosts.product')}</Link>
          </li>
          <li className="btn btn-secondary">
            <Link href="/blog/categories/Entertainment">{t('CategoryPosts.entertainment')}</Link>
          </li>
        </ul>
      </section>

      <div className="flex flex-wrap justify-center items-center pt-[50px] space-x-4">
        <Link className="btn btn-primary px-6 py-3 text-center" href="/blog">
          Back to Blog
        </Link>
        <Link className="btn btn-secondary px-6 py-3 text-center" href="/posts">
          All Posts
        </Link>
      </div>
    </section>
  );
};

export default CategoryPosts;

'use client';

import React, { useEffect } from 'react';
import useSWR from 'swr';
import PostItem from '@/app/components/PostItem';
import '@/app/css/blog.css';
import Authors from '@/app/components/Authors';
import Loader from '@/app/components/Loader';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import { Post, Author } from './interfaces';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

// SWR fetcher using axios
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const AuthorPosts: React.FC = () => {
  const { t } = useTranslation();
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  // Fetch the specific author details from the API
  const { data: author, error: authorError } = useSWR<Author>(
    id ? `/api/users/${id}` : null,
    fetcher
  );

  // Fetch all posts from the API (the backend does not provide filtering by author)
  const { data: posts, error: postsError } = useSWR<Post[]>(
    `/api/posts`,
    fetcher
  );

  // If the author API returns a 404, automatically navigate to the 404 page.
  useEffect(() => {
    if (authorError && authorError.response && authorError.response.status === 404) {
      router.push('/404');
    }
  }, [authorError, router]);

  if (authorError || postsError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-center text-red-500 text-xl">
          {t('authorPosts.errorFetchingData')}
        </h1>
      </div>
    );
  }

  if (!author || !posts) {
    return <Loader />;
  }

  // Filter posts on the client side to include only those by the selected author
  const authorPosts = posts.filter((post: Post) => post.creator === id);

  return (
    <div>
      <Head>
        <title>{`${author.name} - Synaps Blog`}</title>
      </Head>

      <section data-aos="fade-up" className="posts-page px-4 py-8">
        <div className="blog-title-filtered mb-6">
          <h1 className="text-3xl font-bold text-center">
            {t('AuthorPosts.postsBy', { authorName: author.name })}
          </h1>
        </div>

        <div className="author-info mb-8 flex flex-col items-center">
          <img
            src={author.avatar || '/assets/Avatar-default.png'}
            alt={author.name}
            className="w-24 h-24 rounded-full backdrop-blur-sm object-cover mb-4"
          />
          <h2 className="text-2xl font-semibold">{author.name}</h2>
        </div>

        {authorPosts.length > 0 ? (
          <div className="container mx-auto">
            <div className="posts-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {authorPosts.map((post) => (
                <PostItem
                  key={post._id}
                  _id={post._id}
                  slug={post.slug}
                  thumbnail={post.thumbnail}
                  category={post.category}
                  title={post.title}
                  description={post.description}
                  authorID={post.creator}
                  createdAt={post.createdAt}
                />
              ))}
            </div>
          </div>
        ) : (
          <h1 className="error-blog-not-found text-center text-red-500 text-xl">
            {t('authorPosts.noPostsFound')}
          </h1>
        )}
      </section>

      <section>
        <Authors />
      </section>

      <div className="flex flex-wrap justify-center items-center pt-[50px] space-x-4">
        <Link className="btn btn-primary px-6 py-3 text-center" href="/blog">
          Back to Blog
        </Link>
        <Link className="btn btn-secondary px-6 py-3 text-center" href="/posts">
          All Posts
        </Link>
      </div>
    </div>
  );
};

export default AuthorPosts;

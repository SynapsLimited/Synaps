// src/app/posts/page.tsx

'use client';

import React, { useState, Fragment } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import PostItem from '@/app/components/PostItem';
import Loader from '@/app/components/Loader';
import { Post, Author } from '../blog/authors/[id]/interfaces';
import { useTranslation } from 'react-i18next';
import { Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { 
  UserIcon, 
  TagIcon, 
  ClockIcon, 
  MagnifyingGlassIcon 
} from '@heroicons/react/24/solid'; // Importing additional icons
import Head from 'next/head';
import '@/app/css/blog.css';
import Link from 'next/link';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const timeOptions = [
  { label: 'Last Day', value: '24h' },
  { label: 'Last Week', value: 'week' },
  { label: 'Last Month', value: 'month' },
  { label: 'Last Year', value: 'year' },
];

const PostsPage: React.FC = () => {
  const { t } = useTranslation();

  // Fetch posts and authors
  const { data: posts, error: postsError } = useSWR<Post[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/posts`,
    fetcher
  );

  const { data: authors, error: authorsError } = useSWR<Author[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/users`,
    fetcher
  );

  // State for filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAuthor, setSelectedAuthor] = useState<string>('all');
  const [selectedTime, setSelectedTime] = useState<string>('all');

  // State for dropdown visibility
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isAuthorOpen, setIsAuthorOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);

  // Extract unique categories from posts
  const categories = React.useMemo(() => {
    if (!posts) return [];
    const uniqueCategories = Array.from(new Set(posts.map(post => post.category)));
    return uniqueCategories;
  }, [posts]);

  // Filter posts based on active filters
  const filteredPosts = React.useMemo(() => {
    if (!posts) return [];

    let filtered = posts;

    // Search Filter
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category Filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Author Filter
    if (selectedAuthor !== 'all') {
      filtered = filtered.filter(post => post.creator === selectedAuthor);
    }

    // Time Filter
    if (selectedTime !== 'all') {
      const now = new Date();
      filtered = filtered.filter(post => {
        const postDate = new Date(post.createdAt);
        const diff = now.getTime() - postDate.getTime();
        switch (selectedTime) {
          case '24h':
            return diff <= 24 * 60 * 60 * 1000;
          case 'week':
            return diff <= 7 * 24 * 60 * 60 * 1000;
          case 'month':
            return diff <= 30 * 24 * 60 * 60 * 1000;
          case 'year':
            return diff <= 365 * 24 * 60 * 60 * 1000;
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [posts, searchQuery, selectedCategory, selectedAuthor, selectedTime]);

  // Handle Errors
  if (postsError || authorsError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-center text-red-500 text-xl">
          {t('postsPage.errorFetchingData')}
        </h1>
      </div>
    );
  }

  // Show loader while fetching data
  if (!posts || !authors) {
    return <Loader />;
  }

  return (
    <div>
      <Head>
        <title>{t('postsPage.title')} - Synaps Blog</title>
      </Head>
      <div className='pt-[100px]'>
        <section className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-center">{t('postsPage.heading')}</h1>

          {/* Filters */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 md:gap-6">
            {/* Search Bar */}
            <div className="w-full md:w-1/3 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="w-5 h-5 text-background" />
              </div>
              <input
                type="text"
                placeholder={t('postsPage.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className=" bg-white w-full pl-10 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-background transition duration-300 text-background"
              />
            </div>

            {/* Filters Dropdowns */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full md:w-2/3 text-background" >
              {/* Category Filter */}
              <div className="relative w-full sm:w-1/3">
                <button
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="w-full px-4 py-2 bg-white border rounded-md flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary transition duration-300 hover:bg-gray-100"
                >
                  <div className="flex items-center space-x-2 text-background">
                    <TagIcon className="w-5 h-5 text-background" />
                    <span>
                      {selectedCategory === 'all'
                        ? t('postsPage.filters.category')
                        : t(`categories.${selectedCategory}`)}
                    </span>
                  </div>
                  <ChevronDownIcon className="w-5 h-5 text-background" />
                </button>

                <Transition
                  as={Fragment}
                  show={isCategoryOpen}
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-150"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <div className="absolute z-10 mt-2 w-full bg-white border rounded-md shadow-lg">
                    <ul>
                      <li
                        onClick={() => { setSelectedCategory('all'); setIsCategoryOpen(false); }}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
                      >
                        <TagIcon className="w-4 h-4 text-gray-500" />
                        <span>{t('postsPage.filters.allCategories')}</span>
                      </li>
                      {categories.map(category => (
                        <li
                          key={category}
                          onClick={() => { setSelectedCategory(category); setIsCategoryOpen(false); }}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
                        >
                          <TagIcon className="w-4 h-4 text-gray-500" />
                          <span>{t(`categories.${category}`)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Transition>
              </div>

              {/* Author Filter */}
              <div className="relative w-full sm:w-1/3">
                <button
                  onClick={() => setIsAuthorOpen(!isAuthorOpen)}
                  className="w-full px-4 py-2 bg-white border rounded-md flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary transition duration-300 hover:bg-gray-100"
                >
                  <div className="flex items-center space-x-2">
                    <UserIcon className="w-5 h-5 text-background" />
                    <span>
                      {selectedAuthor === 'all'
                        ? t('postsPage.filters.author')
                        : authors.find(author => author._id === selectedAuthor)?.name || t('postsPage.filters.author')}
                    </span>
                  </div>
                  <ChevronDownIcon className="w-5 h-5 text-background" />
                </button>

                <Transition
                  as={Fragment}
                  show={isAuthorOpen}
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-150"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <div className="absolute z-10 mt-2 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                    <ul>
                      <li
                        onClick={() => { setSelectedAuthor('all'); setIsAuthorOpen(false); }}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
                      >
                        <UserIcon className="w-4 h-4 text-gray-500" />
                        <span>{t('postsPage.filters.allAuthors')}</span>
                      </li>
                      {authors.map(author => (
                        <li
                          key={author._id}
                          onClick={() => { setSelectedAuthor(author._id); setIsAuthorOpen(false); }}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
                        >
                          <img
                            src={author.avatar || '/assets/Avatar-default.png'}
                            alt={author.name}
                            className="w-4 h-4 rounded-full object-cover"
                          />
                          <span>{author.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Transition>
              </div>

              {/* Time Filter */}
              <div className="relative w-full sm:w-1/3">
                <button
                  onClick={() => setIsTimeOpen(!isTimeOpen)}
                  className="w-full px-4 py-2 bg-white border rounded-md flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary transition duration-300 hover:bg-gray-100"
                >
                  <div className="flex items-center space-x-2">
                    <ClockIcon className="w-5 h-5 text-background" />
                    <span>
                      {selectedTime === 'all'
                        ? t('postsPage.filters.time')
                        : t(`postsPage.timeOptions.${selectedTime}`)}
                    </span>
                  </div>
                  <ChevronDownIcon className="w-5 h-5 text-background" />
                </button>

                <Transition
                  as={Fragment}
                  show={isTimeOpen}
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-150"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <div className="absolute z-10 mt-2 w-full bg-white border rounded-md shadow-lg">
                    <ul>
                      <li
                        onClick={() => { setSelectedTime('all'); setIsTimeOpen(false); }}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
                      >
                        <ClockIcon className="w-4 h-4 text-gray-500" />
                        <span>{t('postsPage.filters.allTime')}</span>
                      </li>
                      {timeOptions.map(option => (
                        <li
                          key={option.value}
                          onClick={() => { setSelectedTime(option.value); setIsTimeOpen(false); }}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
                        >
                          <ClockIcon className="w-4 h-4 text-gray-500" />
                          <span>{t(`postsPage.timeOptions.${option.value}`)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Transition>
              </div>
            </div>
          </div>

          {/* Display Filtered Posts */}
          {filteredPosts.length > 0 ? (
            <div className="posts-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredPosts.map(post => (
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
          ) : (
            <h1 className="text-center text-red-500 text-xl mt-8">
              {t('postsPage.noPostsFound')}
            </h1>
          )}

        </section>
        <div className="flex flex-wrap justify-center items-center pt-[50px] space-x-4">
  <Link
    className="btn btn-primary px-6 py-3 text-center"
    href="/blog"
  >
    Back to Blog
  </Link>
  <Link
    className="btn btn-secondary px-6 py-3 text-center"
    href="/"
  >
    Back to Home
  </Link>
</div>
      </div>
    </div>
  );
};

export default PostsPage;

// src/app/dashboard/page.tsx

'use client';

import React, { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserContext } from './../../../context/userContext';
import axios from 'axios';
import Loader from './../../components/Loader';
import DeletePost from './../../components/DeletePost';
import { useTranslation } from 'react-i18next';

interface Post {
  _id: string;
  slug: string;
  thumbnail: string;
  title: string;
}

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const userId = currentUser?.id;

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!userId) return;
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/users/${userId}`, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(response.data);
      } catch (error: unknown) {
        console.error('Error fetching dashboard posts:', error);
      }
      setIsLoading(false);
    };
    fetchPosts();
  }, [userId, token]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section data-aos="fade-up" className="dashboard">
      <div className="blog-title-filtered">
        <h1>{t('Dashboard.dashboard')}</h1>
      </div>

      {posts.length ? (
        <div className="container dashboard-container">
          {posts.map((post) => (
            <article key={post._id} className="dashboard-post">
              <div className="dashboard-post-info">
                <div className="dashboard-post-thumbnail">
                  {/* Use Next.js Image component */}
                  <img src={post.thumbnail} alt={post.title} />
                </div>
                <h4>{post.title}</h4>
              </div>
              <div className="dashboard-post-actions">
                <Link href={`/posts/${post.slug}`} className="btn btn-background">{t('Dashboard.viewButton')}</Link>
                <Link href={`/posts/${post.slug}/edit`} className="btn btn-primary">{t('Dashboard.editButton')}</Link>
                <DeletePost postId={post._id} /> {/* Pass the postId here */}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <h2 className="center">{t('Dashboard.noPosts')}</h2>
      )}
    </section>
  );
};

export default Dashboard;

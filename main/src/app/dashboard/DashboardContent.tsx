// app/dashboard/DashboardContent.tsx
'use client';

import React, { useEffect, useContext } from 'react';
import Link from 'next/link';
import DeletePost from '../components/DeletePost'; // Adjust path as needed
import { UserContext } from '@/context/userContext';

interface DashboardContentProps {
  currentUser: { id: string; name: string };
  posts: any[];
}

const DashboardContent: React.FC<DashboardContentProps> = ({ currentUser, posts }) => {
  const { setCurrentUser } = useContext(UserContext);

  // On mount, populate the UserContext with the server-provided currentUser.
  useEffect(() => {
    setCurrentUser(currentUser);
  }, [currentUser, setCurrentUser]);

  return (
    <section className="dashboard" data-aos="fade-up">
      <div className="blog-title-filtered">
        <h1>Dashboard</h1>
      </div>
      {posts.length > 0 ? (
        <div className="container dashboard-container">
          {posts.map((post: any) => (
            <article key={post._id} className="dashboard-post">
              <div className="dashboard-post-info">
                <div className="dashboard-post-thumbnail">
                  <img src={post.thumbnail} alt={post.title} />
                </div>
                <h4>{post.title}</h4>
              </div>
              <div className="dashboard-post-actions">
                <Link href={`/posts/${post.slug}`} className="btn btn-background">
                  View
                </Link>
                <Link href={`/posts/${post.slug}/edit`} className="btn btn-primary">
                  Edit
                </Link>
                <DeletePost slug={post.slug} />
              </div>
            </article>
          ))}
        </div>
      ) : (
        <h2 className="center">No posts found.</h2>
      )}
    </section>
  );
};

export default DashboardContent;

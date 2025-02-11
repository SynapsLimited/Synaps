'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './../css/blog.css'; // Adjust the path as per your project structure
import axios from 'axios';
import Loader from './Loader';

interface Author {
  _id: string;
  avatar: string;
  name: string;
  posts: number;
}

const Authors: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const defaultAvatar = '/assets/Avatar-default.png'; // Adjust if needed

  useEffect(() => {
    const getAuthors = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/users`);
        setAuthors(response.data);
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
      setIsLoading(false);
    };

    getAuthors();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section data-aos="fade-up" className="authors">
      <div className="blog-title">
        <h1>Authors</h1>
      </div>
      {authors.length > 0 ? (
        <div className="authors-container">
          {authors.map(({ _id: id, avatar, name, posts }) => (
            <Link 
              key={id} 
              href={`/blog/authors/${id}`} 
              className="author"
            >
              <div className="author-avatar">
                <img 
                  src={avatar || defaultAvatar}  
                  alt={`Image of ${name}`} 
                />
              </div>
              <div className="author-info">
                <h4>{name}</h4>
                <p>{posts} {posts === 1 ? 'post' : 'posts'}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <h2 className="error-blog-not-found">No authors found</h2>
      )}
    </section>
  );
};

export default Authors;

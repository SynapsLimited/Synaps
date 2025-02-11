'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import ReactTimeAgo from 'react-time-ago';

interface Author {
  avatar?: string;
  name?: string;
}

const PostAuthor: React.FC<{ authorID: string; createdAt?: string }> = ({ authorID, createdAt }) => {
  const [author, setAuthor] = useState<Author>({});
  const defaultAvatar = '/assets/Avatar-default.png';

  useEffect(() => {
    const getAuthor = async () => {
      try {
        // Updated endpoint to fetch a single author by ID
        const response = await axios.get(`/api/users/authors/${authorID}`);
        setAuthor(response.data);
      } catch (error: any) {
        console.error('Error fetching author:', error.message || error);
      }
    };

    if (typeof authorID === 'string') {
      getAuthor();
    } else {
      console.error('Invalid authorID:', authorID);
    }
  }, [authorID]);

  return (
    <Link href={`/blog/authors/${authorID}`} className="post-author">
      <div className="post-author-avatar">
        <img src={author?.avatar || defaultAvatar} alt={author?.name || 'Author Avatar'} />
      </div>
      <div className="post-author-details">
        <h5>{author?.name || 'Synaps'}</h5>
        {createdAt && (
          <small>
            {/* The locale here is set to "en"; adjust as needed based on your current language */}
            <ReactTimeAgo date={new Date(createdAt)} locale="en" />
          </small>
        )}
      </div>
    </Link>
  );
};

export default PostAuthor;

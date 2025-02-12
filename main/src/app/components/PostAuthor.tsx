'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

interface Author {
  avatar?: string;
  name?: string;
}

function timeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return `${interval} year${interval !== 1 ? 's' : ''} ago`;
  }

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return `${interval} month${interval !== 1 ? 's' : ''} ago`;
  }

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return `${interval} day${interval !== 1 ? 's' : ''} ago`;
  }

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return `${interval} hour${interval !== 1 ? 's' : ''} ago`;
  }

  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return `${interval} minute${interval !== 1 ? 's' : ''} ago`;
  }

  return 'Just now';
}

const PostAuthor: React.FC<{ authorID: string; createdAt?: string }> = ({ authorID, createdAt }) => {
  const [author, setAuthor] = useState<Author>({});
  const defaultAvatar = '/assets/Avatar-default.png';

  useEffect(() => {
    const getAuthor = async () => {
      try {
        // FIX: Use the single user endpoint instead of the authors list.
        const response = await axios.get(`/api/users/${authorID}`);
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
          <small>{timeAgo(new Date(createdAt))}</small>
        )}
      </div>
    </Link>
  );
};

export default PostAuthor;

import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import axios from 'axios';
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';

import en from 'javascript-time-ago/locale/en.json';
import ru from 'javascript-time-ago/locale/ru.json';

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

interface Author {
  avatar?: string;
  name?: string;
}

const PostAuthor: React.FC<{ authorID: string; createdAt?: string }> = ({ authorID, createdAt }) => {
  const [author, setAuthor] = useState<Author>({});

  const defaultAvatar = `${process.env.PUBLIC_URL}/assets/Avatar-default.png`; // Default avatar path

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const response = await axios.get(`/users/${authorID}`);
        setAuthor(response?.data);
      } catch (error: unknown) {
        console.error('Error fetching author:', (error as Error).message || error);
      }
    };
    

    if (typeof authorID === 'string') {
      getAuthor();
    } else {
      console.error('Invalid authorID:', authorID);
    }
  }, [authorID]);

  return (
    <Link href={`/blog/authors/${authorID}`}  className="post-author">
      <div  className="post-author-avatar">
        <img
          src={author?.avatar || defaultAvatar}  // Use default avatar if none exists
          alt={author?.name || 'Author Avatar'}
        />
      </div>
      <div  className="post-author-details">
        <h5>{author?.name || 'Synaps'}</h5>
        {createdAt && (
          <small>
            <ReactTimeAgo date={new Date(createdAt)} locale="en-US" />
          </small>
        )}
      </div>
    </Link>
  );
};

export default PostAuthor;


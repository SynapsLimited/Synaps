import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';

import en from 'javascript-time-ago/locale/en.json';
import ru from 'javascript-time-ago/locale/ru.json';

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const PostAuthor = ({ authorID, createdAt }) => {
  const [author, setAuthor] = useState({});

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${authorID}`);
        setAuthor(response?.data);
      } catch (error) {
        console.log('Error fetching author:', error);
      }
    };

    if (authorID) {
      getAuthor();
    }
  }, [authorID]);

  return (
    <Link to={`/posts/users/${authorID}`} className="post-author">
      <div className="post-author-avatar">
        <img
          src={author?.avatar ? `${process.env.REACT_APP_ASSETS_URL}/${author.avatar}` : '/Synaps_Avatar-b44b4475-2805-4e92-a0d5-f0089b974e1a_szy1ho.png'}
          alt={author?.name || 'Author Avatar'}
        />
      </div>
      <div className="post-author-details">
        <h5>{author?.name || 'Synaps'}</h5>
        {createdAt && (
          <small>
            <ReactTimeAgo date={new Date(createdAt)} locale='en-US' />
          </small>
        )}
      </div>
    </Link>
  );
};

export default PostAuthor;

import React, { useContext, useEffect, useState } from 'react';
import PostAuthor from '../components/PostAuthor';
import { Link, useParams } from 'react-router-dom';
import './../css/blog.css'; // Assuming you have a corresponding CSS file for styling
import Loader from '../components/Loader';
import DeletePost from './DeletePost';
import { UserContext } from '../context/userContext';
import axios from 'axios';
import { useTranslation } from 'react-i18next'; // Importing useTranslation hook

const PostDetail = () => {
  const { t } = useTranslation(); // Initialize useTranslation hook
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`);
        if (response.data) {
          setPost(response.data);
        } else {
          setError('No post data found.');
        }
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    getPost();
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p className='error'>{error}</p>;
  }

  if (!post) {
    return <p className='error'>Post not found.</p>;
  }

  const defaultThumbnail = `${process.env.PUBLIC_URL}/assets/Blog-default.webp`;

  return (
    <div className='post-detail-section'>
      <section className="container post-detail">
        {post && post.creator ? (
          <div className="post-detail-container">
            <div className="post-detail-header">
              {/* Pass the creator's ID (authorID) and post createdAt date */}
              <PostAuthor authorID={post.creator._id} createdAt={post.createdAt} />
              {currentUser?.id === post?.creator._id && (
                <div className="post-detail-buttons">
                  <Link to={`/posts/${post?._id}/edit`} className="btn btn-primary">
                    {t('Dashboard.editButton')}
                  </Link>
                  <DeletePost postId={post._id} /> {/* Pass the postId here */}
                </div>
              )}
            </div>

            <h1>{post.title}</h1>
            <div className="post-detail-thumbnail">
              <img src={post.thumbnail || defaultThumbnail} alt={post.title} />
            </div>
            <p dangerouslySetInnerHTML={{ __html: post.description }}></p>
          </div>
        ) : (
          <p className='error'>Author not found for this post.</p>
        )}

        <a href="/blog" className="btn btn-secondary post-detail-btn">Back to Blog</a>
      </section>
    </div>
  );
};

export default PostDetail;

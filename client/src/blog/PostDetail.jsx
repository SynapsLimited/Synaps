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
          console.log('Fetched post data:', response.data);
        } else {
          console.log('No post data found.');
          setError('No post data found.');
        }
      } catch (error) {
        console.log('Error fetching post data:', error);
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

  return (
    <div className='post-detail-section'>
    <section className="container post-detail">
      {post && post.creator ? ( // Ensure post and creator are defined
        <div className="post-detail-container">
          <div className="post-detail-header">
            <PostAuthor authorID={post.creator} createdAt={post.createdAt} />
            {currentUser?.id === post?.creator && (
              <div className="post-detail-buttons">
                <Link to={`/posts/${post?._id}/edit`} className="btn btn-primary">{t('Dashboard.editButton')}</Link>
                <DeletePost postId={id} />
              </div>
            )}
          </div>

          <h1>{post.title}</h1>
          <div className="post-detail-thumbnail">
            <img src={`${process.env.REACT_APP_ASSETS_URL}/${post.thumbnail}`} alt="" />
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

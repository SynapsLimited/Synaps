import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './../css/blog.css'; // Assuming you have a corresponding CSS file for styling
import { Helmet } from 'react-helmet';
import Posts from '../components/Posts';
import Authors from '../blog/Authors';

const Blog = () => {
  useEffect(() => {
    // Dynamically load the Spline Viewer script
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.7.2/build/spline-viewer.js';
    document.body.appendChild(script);

    // Clean up the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <Helmet>
        <title>Synaps - Blog</title>
      </Helmet>

      <header>
        <div className="container header__container">
          <div className="header__left header-blog">
            <h1>Blog</h1>
            <p>Keep up with the latest news from technology and marketing trends.</p>
            <a href="contact" className="btn btn-secondary">Contact</a>
          </div>
          <div className="header__right" id="spline-container">
            <spline-viewer url="https://prod.spline.design/1VQSYrmiNFt3i0cz/scene.splinecode"></spline-viewer>
          </div>
        </div>
      </header>

      <div className="blog-title">
        <h1>Ready for the latest news?</h1>
        <p>News from us and the world. Technology and marketing trends are our cup of tea. We are ready to keep you updated, tell our opinion, or even our own stories.</p>
      </div>

      <section className="container blog-categories-section">
        <div className="blog-title">
          <h1>Categories</h1>
        </div>
        <ul className="blog-categories">
          <li className="btn btn-secondary"><Link to="/posts/categories/Marketing">Marketing</Link></li>
          <li className="btn btn-secondary"><Link to="/posts/categories/Business">Business</Link></li>
          <li className="btn btn-secondary"><Link to="/posts/categories/Technology">Technology</Link></li>
          <li className="btn btn-secondary"><Link to="/posts/categories/AI">AI</Link></li>
          <li className="btn btn-secondary"><Link to="/posts/categories/Gaming">Gaming</Link></li>
          <li className="btn btn-secondary"><Link to="/posts/categories/Product">Product</Link></li>
          <li className="btn btn-secondary"><Link to="/posts/categories/Entertainment">Entertainment</Link></li>
        </ul>
      </section>

      <Posts limit={6} />

      <section className="container blog-authors-section">
        <Authors />
      </section>
    </div>
  );
};

export default Blog;

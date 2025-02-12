'use client';

import React, { useState, useContext, useEffect, ChangeEvent, FormEvent } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css'; // Updated CSS import for the forked package
import { useRouter, useParams } from 'next/navigation';
import { UserContext } from '@/context/userContext';
import axios from 'axios';
import '@/app/css/blog.css';

// Dynamically import react-quill-new so it only loads on the client.
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

const EditPost: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('Uncategorized');
  const [description, setDescription] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;

  const { currentUser, loading } = useContext(UserContext);
  const token = currentUser?.token;

  // Redirect to login if not logged in (wait until loading is done)
  useEffect(() => {
    if (loading) return;
    if (!currentUser) {
      router.push('/login');
    }
  }, [currentUser, loading, router]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  // Remove 'bullet' from the formats array to avoid registration error.
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', // Only 'list' is needed; it handles both ordered and bullet types.
    'indent',
    'link', 'image'
  ];

  const POST_CATEGORIES: string[] = [
    'Uncategorized',
    'Marketing',
    'Business',
    'Technology',
    'AI',
    'Gaming',
    'Product',
    'Entertainment'
  ];

  // Fetch the current post details
  useEffect(() => {
    const getPost = async () => {
      if (!slug) return;
      try {
        const response = await axios.get(`/api/posts/${slug}`);
        setTitle(response.data.title);
        setCategory(response.data.category);
        setDescription(response.data.description);
      } catch (error: any) {
        console.error('Error fetching post details:', error);
        setError(error.response?.data.message || 'Error fetching post details.');
      }
    };
    getPost();
  }, [slug]);

  const editPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const postData = new FormData();
    postData.set('title', title);
    postData.set('category', category);
    postData.set('description', description);
    if (thumbnail) {
      postData.set('thumbnail', thumbnail);
    }

    try {
      const response = await axios.patch(`/api/posts/${slug}`, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      });
      if (response.status === 200) {
        router.push(`/blog/${response.data.slug}`);
      }
    } catch (err: any) {
      setError(err.response?.data.message || 'An unexpected error occurred.');
    }
  };

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnail(e.target.files[0]);
    }
  };

  return (
    <section data-aos="fade-up" className="edit-post">
      <div className="container">
        <h2>Edit Post</h2>
        {error && <p className="form-error-message">{error}</p>}
        <form className="form edit-post-form" onSubmit={editPost}>
          <input 
            type="text" 
            placeholder="Title" 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            autoFocus 
            required
          />
          <select name="category" value={category} onChange={e => setCategory(e.target.value)}>
            {POST_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <ReactQuill 
            modules={modules} 
            formats={formats} 
            value={description} 
            onChange={setDescription} 
          />
          <div className="custom-file-input-container">
            <input 
              className="custom-file-input" 
              type="file" 
              onChange={handleThumbnailChange} 
              accept="image/png, image/jpg, image/jpeg" 
            />
          </div>
          <button type="submit" className="btn btn-primary btn-submit">Update</button>
        </form>
      </div>
    </section>
  );
};

export default EditPost;

'use client';

import React, { useState, useContext, useEffect, ChangeEvent, FormEvent } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css'; // Updated CSS import for the forked package
import { UserContext } from '@/context/userContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import '@/app/css/blog.css'

// Dynamically import react-quill-new so it only loads on the client.
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('Uncategorized');
  const [description, setDescription] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  // Get both currentUser and loading from your context
  const { currentUser, loading } = useContext(UserContext);

  // Redirect to login if not logged in (wait until loading is done)
  useEffect(() => {
    if (loading) return;
    if (!currentUser) {
      router.push('/login');
    }
  }, [currentUser, loading, router]);

  const token = currentUser?.token;

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

  const createPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const postData = new FormData();
    postData.set('title', title);
    postData.set('category', category);
    postData.set('description', description);
    if (thumbnail) {
      postData.set('thumbnail', thumbnail);
    }

    try {
      const response = await axios.post(`/api/posts`, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      });
      if (response.status === 201) {
        router.push('/blog');
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
    <section data-aos="fade-up" className="create-post">
      <div className="container">
        <h2>Create Post</h2>
        {error && <p className="form-error-message">{error}</p>}
        <form className="form create-post-form" onSubmit={createPost}>
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
              <option key={cat} value={cat}>{cat}</option>
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
          <button type="submit" className="btn btn-primary btn-submit">Create</button>
        </form> 
      </div>
    </section>
  );
};

export default CreatePost;

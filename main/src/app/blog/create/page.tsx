'use client';

import React, { useState, useContext, useEffect, ChangeEvent, FormEvent } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { UserContext } from '@/context/userContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// Dynamically import ReactQuill (client-side only)
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const CreatePost = () => {
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('Uncategorized');
  const [description, setDescription] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const router = useRouter();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean']
    ]
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  const POST_CATEGORIES = [
    'Uncategorized', 'Marketing', 'Business', 'Technology',
    'AI', 'Gaming', 'Product', 'Entertainment'
  ];

  const createPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const postData = new FormData();
    postData.set('title', title);
    postData.set('category', category);
    postData.set('description', description);
    if (thumbnail) {
      postData.append('thumbnail', thumbnail);
    }

    try {
      const response = await axios.post(`/api/posts`, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      });
      if (response.status === 201) {
        // Redirect to the public post detail page using the generated slug
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
    <section className="create-post">
      <div className="container">
        <h2>Create Post</h2>
        {error && <p className="form-error-message">{error}</p>}
        <form onSubmit={createPost}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            autoFocus
            required
          />
          <select value={category} onChange={e => setCategory(e.target.value)}>
            {POST_CATEGORIES.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <ReactQuill modules={modules} formats={formats} value={description} onChange={setDescription} />
          <input type="file" onChange={handleThumbnailChange} accept="image/png, image/jpg, image/jpeg" />
          <button type="submit">Create</button>
        </form>
      </div>
    </section>
  );
};

export default CreatePost;

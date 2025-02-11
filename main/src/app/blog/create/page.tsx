// src/app/blog/create/page.tsx

'use client';

import React, { useState, useContext, useEffect, ChangeEvent, FormEvent } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { UserContext } from '../../../context/userContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('Uncategorized');
  const [description, setDescription] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  // Redirect to login page for any user who isn't logged in
  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  const POST_CATEGORIES: string[] = [
    "Uncategorized",
    "Marketing",
    "Business",
    "Technology",
    "AI",
    "Gaming",
    "Product",
    "Entertainment"
  ];

  const createPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const postData = new FormData();
    postData.set('title', title);
    postData.set('category', category);
    postData.set('description', description);

    if (thumbnail) {
      postData.set('thumbnail', thumbnail); // Attach file if provided
    }

    try {
      const response = await axios.post(`/posts`, postData, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      });
      if (response.status === 201) {
        router.push('/blog');
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message);
      } else {
        setError('An unexpected error occurred.');
      }
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
        {error && <p className='form-error-message'>{error}</p>}
        <form className="form create-post-form" onSubmit={createPost}>
          <input 
            type="text" 
            placeholder='Title' 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            autoFocus 
            required
          />
          <select name="category" value={category} onChange={e => setCategory(e.target.value)}>
            {POST_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
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
              accept='image/png, image/jpg, image/jpeg' 
            />
          </div>          
          <button type="submit" className="btn btn-primary btn-submit">Create</button>
        </form> 
      </div>
    </section>
  );
}

export default CreatePost;

// src/app/blog/[slug]/edit/page.tsx

'use client';

import React, { useState, useContext, useEffect, ChangeEvent, FormEvent } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useRouter, useParams } from 'next/navigation';
import { UserContext } from '../../../../context/userContext';
import axios from 'axios';

interface Post {
  _id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  thumbnail: string;
}

const EditPost: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('Uncategorized');
  const [description, setDescription] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  const router = useRouter();
  const params = useParams();
  const slug = params?.slug;

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
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
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

  const POST_CATEGORIES: string[] = ["Uncategorized", "Marketing", "Business", "Technology", "AI", "Gaming", "Product", "Entertainment"];

  useEffect(() => {
    const getPost = async () => {
      if (!slug) return;
      try {
        const response = await axios.get(`/posts/slug/${slug}`); // Fetch by slug
        setTitle(response.data.title);
        setCategory(response.data.category); // Set the category to the existing post's category
        setDescription(response.data.description);
      } catch (error: unknown) {
        console.error('Error fetching post details:', error);
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

    // Only append thumbnail if it has changed
    if (thumbnail) {
      postData.append('thumbnail', thumbnail);
    }

    try {
      const response = await axios.patch(`/posts/slug/${slug}`, postData, { // Update by slug
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        router.push(`/posts/${slug}`);
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
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
    }
  };

  return (
    <section data-aos="fade-up" className="create-post">
      <div className="container">
        <h2>Edit Post</h2>
        {error && <p className="form-error-message">{error}</p>}
        <form className="form create-post-form" onSubmit={editPost}>
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
          <button type="submit" className="btn btn-primary btn-submit">Update</button>
        </form>
      </div>
    </section>
  );
}

export default EditPost;

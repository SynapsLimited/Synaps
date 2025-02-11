// app/profile/[id]/page.tsx
'use client';

import React, { useState, useContext, useEffect, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import { FaEdit, FaCheck } from 'react-icons/fa';
import axios from 'axios';
import { UserContext } from '@/context/userContext';
import { useRouter, useParams } from 'next/navigation';
import './../../css/blog.css';

const UserProfile: React.FC = () => {
  // Get the id from the route parameters.
  const { id } = useParams();
  const { currentUser } = useContext(UserContext);
  const router = useRouter();

  // If no user is logged in, show a friendly message with a login link.
  if (!currentUser) {
    return (
      <section className="profile">
        <div className="container">
          <p>
            You must be logged in to view your profile. Please <Link href="/login">login</Link>.
          </p>
        </div>
      </section>
    );
  }

  // Optionally: if the route id doesn't match the logged-in user's id, you may show an error.
  if (currentUser.id !== id) {
    return (
      <section className="profile">
        <div className="container">
          <p>You are not authorized to view this profile.</p>
        </div>
      </section>
    );
  }

  const [avatar, setAvatar] = useState<File | null>(null);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [isAvatarTouched, setIsAvatarTouched] = useState<boolean>(false);

  // Fetch user data from your API using the route parameter id.
  useEffect(() => {
    const getUser = async () => {
      if (!id) return;
      try {
        const response = await axios.get(`/api/users/${id}`, {
          withCredentials: true,
        });
        const { name, email, avatar } = response.data;
        setName(name);
        setEmail(email);
        setAvatarPreview(avatar);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    getUser();
  }, [id]);

  // Handle avatar file change.
  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
      setIsAvatarTouched(true);
    }
  };

  // Submit the new avatar to your API.
  const changeAvatarHandler = async () => {
    if (!avatar) return;
    try {
      const formData = new FormData();
      formData.append('avatar', avatar);
      const response = await axios.post(`/api/users/change-avatar`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      setAvatar(null);
      setIsAvatarTouched(false);
      setAvatarPreview(response.data.avatar);
      setError('');
    } catch (error: unknown) {
      console.error('Error changing avatar:', error);
      setError('Failed to update avatar.');
    }
  };

  // Update user details via your API.
  const updateUserDetails = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userData = { name, email, currentPassword, newPassword, confirmNewPassword };
      const response = await axios.patch(`/api/users/edit-user`, userData, {
        withCredentials: true,
      });
      if (response.status === 200) {
        // For example, after updating details, log out for re‑authentication.
        router.push('/logout');
      }
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred.');
      }
    }
  };

  return (
    <section data-aos="fade-up" className="profile">
      <div className="container profile-container">
        {/* Updated the Dashboard link to point to the dynamic dashboard route */}
        <Link href={`/dashboard/${currentUser.id}`} className="btn btn-secondary">
          Dashboard
        </Link>
        <div className="profile-details">
          <div className="avatar-wrapper">
            <div className="profile-avatar">
              {avatarPreview ? <img src={avatarPreview} alt="User Avatar" /> : null}
            </div>
            <form className="avatar-form">
              <input
                type="file"
                name="avatar"
                id="avatar"
                onChange={handleAvatarChange}
                accept="image/png, image/jpeg, image/webp"
              />
              <label className="btn btn-primary profile-avatar-btn" htmlFor="avatar">
                <FaEdit />
              </label>
            </form>
            {isAvatarTouched && (
              <button
                className="btn btn-primary profile-avatar-btn"
                onClick={changeAvatarHandler}
                type="button"
              >
                <FaCheck />
              </button>
            )}
          </div>
          <h1>{currentUser.name}</h1>
          <form className="form profile-form" onSubmit={updateUserDetails}>
            {error && <p className="form-error-message">{error}</p>}
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <button type="submit" className="btn btn-primary btn-submit-profile">
              Update my details
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;

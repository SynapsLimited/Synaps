import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaCheck } from "react-icons/fa";
import './../css/blog.css'; // Ensure you have appropriate CSS
import { UserContext } from '../context/userContext';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const UserProfile = () => {
  const { t } = useTranslation();
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('');
  const [isAvatarTouched, setIsAvatarTouched] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const navigate = useNavigate();

  // Default avatar path (adjust based on your actual server setup)
  const defaultAvatar = `${process.env.PUBLIC_URL}/assets/Avatar-default.png`;

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  // Fetch user data on component mount
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${currentUser.id}`, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });
        const { name, email, avatar } = response.data;
        setName(name);
        setEmail(email);
        setAvatarPreview(avatar || ''); // 'avatar' is the URL for the uploaded avatar
      } catch (error) {
        console.error("Failed to fetch user data.", error);
        setError(t('UserProfile.fetchError'));
      }
    };
    getUser();
  }, [currentUser.id, token, t]);

  // Handle avatar file selection
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setError("Only JPEG, PNG, and WEBP formats are allowed.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError("File size should be less than 5MB.");
        return;
      }
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
      setIsAvatarTouched(true);
      setError(''); // Clear previous errors
    }
  };

  // Upload new avatar to Vercel Blob (or other storage)
  const changeAvatarHandler = async () => {
    if (!avatar) return;

    setIsUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('avatar', avatar);

      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/change-avatar`, formData, {
        withCredentials: true,
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      // Success: update avatar preview with the new avatar URL
      setAvatarPreview(response.data.avatar || '');
      setIsAvatarTouched(false);
    } catch (error) {
      console.error("Failed to upload avatar:", error);
      setError(error.response?.data?.message || "Failed to upload avatar. Server error.");
    } finally {
      setIsUploading(false);
    }
  };

  // Handle profile detail updates
  const updateUserDetails = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setError('');

    // Basic front-end validation
    if (newPassword && newPassword !== confirmNewPassword) {
      setError(t('UserProfile.passwordMismatch'));
      setIsUpdating(false);
      return;
    }

    try {
      const userData = {
        name,
        email,
        currentPassword,
        newPassword: newPassword || undefined, // Only send if provided
        confirmNewPassword: confirmNewPassword || undefined,
      };

      const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/users/edit-user`, userData, {
        withCredentials: true,
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        navigate('/logout'); // Redirect to logout to refresh tokens or session
      }
    } catch (error) {
      console.error("Failed to update user details.", error);
      setError(error.response?.data?.message || "Error");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <section className="profile">
      <div className="container profile-container">
        <Link to={`/myposts/${currentUser.id}`} className="btn btn-secondary">
          {t('UserProfile.dashboardButton')}
        </Link>

        <div className="profile-details">
          <div className="avatar-wrapper">
            <div className="profile-avatar">
              <img 
                src={avatarPreview || defaultAvatar}  // Use default avatar if no preview
                alt="User Avatar"
              />
            </div>
            <form className="avatar-form">
              <input 
                type="file" 
                name="avatar" 
                id="avatar" 
                onChange={handleAvatarChange} 
                accept="image/png, image/jpeg, image/webp" 
                style={{ display: 'none' }} 
              />
              <label className="btn btn-primary profile-avatar-btn" htmlFor="avatar" title={t('UserProfile.changeAvatar')}>
                <FaEdit />
              </label>
            </form>
            {isAvatarTouched && (
              <button 
                className="btn btn-success profile-avatar-btn" 
                onClick={changeAvatarHandler}
                disabled={isUploading}
                title={t('UserProfile.saveAvatar')}
              >
                <FaCheck /> {isUploading ? "Uploading..." : "Save"}
              </button>
            )}
          </div>

          <h1>{name}</h1>

          <form className="form profile-form" onSubmit={updateUserDetails}>
            {error && <p className="form-error-message">{error}</p>}
            <input
              type="text"
              placeholder={t('UserProfile.fullNamePlaceholder')}
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder={t('UserProfile.emailPlaceholder')}
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder={t('UserProfile.currentPasswordPlaceholder')}
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder={t('UserProfile.newPasswordPlaceholder')}
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder={t('UserProfile.confirmNewPasswordPlaceholder')}
              value={confirmNewPassword}
              onChange={e => setConfirmNewPassword(e.target.value)}
            />
            <button 
              type="submit" 
              className='btn btn-primary btn-submit-profile'
              disabled={isUpdating}
            >
              {isUpdating ? t('UserProfile.updating') : t('UserProfile.updateDetailsButton')}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;

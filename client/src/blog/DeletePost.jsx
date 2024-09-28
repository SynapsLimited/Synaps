import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types'; // For prop type validation
import { FaTrash } from "react-icons/fa"; // Icon for delete button

const DeletePost = ({ postId }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const removePost = async () => {
    const confirmDelete = window.confirm(t("DeletePost.confirmationMessage")); // Translation added
    if (!confirmDelete) return;

    setIsDeleting(true);
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/posts/${postId}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        navigate('/blog'); // Redirect to blog or another appropriate page
      }
    } catch (err) {
      console.error("Couldn't delete post.", err);
      setError(err.response?.data?.message || t("DeletePost.genericErrorMessage")); // Translation for error
      setIsDeleting(false); // Re-enable the button after error
    }
  };

  // Ensure the user is authenticated
  if (!token) {
    navigate('/login');
    return null; // Render nothing while redirecting
  }

  return (
    <>
      {error && <p className='form-error-message'>{error}</p>}
      <a 
        className='btn btn-secondary' 
        onClick={removePost} 
        disabled={isDeleting} // Disable button while deleting
        title={t('DeletePost.deleteButtonTooltip')}
      >
        Delete
      </a>
    </>
  );
};

// Prop type validation
DeletePost.propTypes = {
  postId: PropTypes.string.isRequired,
};

export default DeletePost;

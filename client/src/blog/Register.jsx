import React, { useState } from 'react';
import './../css/blog.css'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const changeInputHandler = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/register`, userData, {
        withCredentials: true // Include credentials with the request
      });
      if (response && response.data) {
        const newUser = response.data;
        if (!newUser) {
          setError("Couldn't register user. Please try again.");
        } else {
          navigate('/login');
        }
      } else {
        setError("Unexpected error. Please try again.");
      }
    } catch (err) {
      if (err.response) {
        if (err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError(`Error: ${err.response.status} ${err.response.statusText}`);
        }
      } else if (err.request) {
        setError('No response received from server. Please check your network connection.');
      } else {
        setError(`An unexpected error occurred: ${err.message}`);
      }
    }
  };

  return (
    <section className="register">
      <div className="container">
        <div className="blog-title">
          <h1>Sign Up</h1>
        </div>
        <form className="form register-form" onSubmit={registerUser}>
          {error && <p className="form-error-message">{error}</p>}
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={userData.name}
            onChange={changeInputHandler}
            autoFocus
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={changeInputHandler}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={changeInputHandler}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={userData.password2}
            onChange={changeInputHandler}
          />
          <button type="submit" className="btn btn-secondary btn-submit">
            Register
          </button>
        </form>
        <small>Already have an account? <Link to="/login">Sign In</Link></small>
      </div>
    </section>
  );
};

export default Register;

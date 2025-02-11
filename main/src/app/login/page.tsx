// app/login/page.tsx
'use client';
import React, { useState, useContext, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { UserContext } from '@/context/userContext';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import './../css/blog.css';

interface LoginData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { t } = useTranslation();
  const [userData, setUserData] = useState<LoginData>({ email: '', password: '' });
  const [error, setError] = useState<string>('');
  const router = useRouter();
  const { setCurrentUser } = useContext(UserContext);

  const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const loginUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(
        `/api/users/login`,
        userData,
        { withCredentials: true }
      );
      const user = response.data;
      setCurrentUser(user);
      // Remove the flag so that the UserProvider knows the user is now logged in.
      localStorage.removeItem('loggedOut');
      router.push('/');
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred while logging in. Please try again.');
      }
    }
  };

  return (
    <section data-aos="fade-up" className="login">
      <div className="container">
        <div className="blog-title">
          <h1>{t('Login.signIn')}</h1>
        </div>
        <form className="form login-form" onSubmit={loginUser}>
          {error && <p className="form-error-message">{error}</p>}
          <input
            type="text"
            placeholder={t('Login.emailPlaceholder')}
            name="email"
            value={userData.email}
            onChange={changeInputHandler}
            autoFocus
            required
          />
          <input
            type="password"
            placeholder={t('Login.passwordPlaceholder')}
            name="password"
            value={userData.password}
            onChange={changeInputHandler}
            required
          />
          <button type="submit" className="btn btn-secondary btn-submit">
            {t('Login.loginButton')}
          </button>
        </form>
        <small>
          {t('Login.signUpPrompt')}{' '}
          <Link href="/register">{t('Register.signUp')}</Link>
        </small>
      </div>
    </section>
  );
};

export default Login;

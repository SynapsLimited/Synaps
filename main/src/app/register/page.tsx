// app/register/page.tsx
'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import './../css/blog.css'

interface RegisterData {
  name: string;
  email: string;
  password: string;
  password2: string;
}

const Register: React.FC = () => {
  const { t } = useTranslation();
  const [userData, setUserData] = useState<RegisterData>({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const registerUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/register`,
        userData,
        { withCredentials: true }
      );
      if (response && response.data) {
        router.push('/login');
      } else {
        setError("Unexpected error. Please try again.");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError(`Error: ${err.response.status} ${err.response.statusText}`);
        }
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <section data-aos="fade-up" className="register">
      <div className="container">
        <div className="blog-title">
          <h1>{t('Register.signUp')}</h1>
        </div>
        <form className="form register-form" onSubmit={registerUser}>
          {error && <p className="form-error-message">{error}</p>}
          <input
            type="text"
            placeholder={t('Register.fullNamePlaceholder')}
            name="name"
            value={userData.name}
            onChange={changeInputHandler}
            autoFocus
            required
          />
          <input
            type="email"
            placeholder={t('Register.emailPlaceholder')}
            name="email"
            value={userData.email}
            onChange={changeInputHandler}
            required
          />
          <input
            type="password"
            placeholder={t('Register.passwordPlaceholder')}
            name="password"
            value={userData.password}
            onChange={changeInputHandler}
            required
          />
          <input
            type="password"
            placeholder={t('Register.confirmPasswordPlaceholder')}
            name="password2"
            value={userData.password2}
            onChange={changeInputHandler}
            required
          />
          <button type="submit" className="btn btn-secondary btn-submit">
            {t('Register.registerButton')}
          </button>
        </form>
        <small>
          {t('Register.signInPrompt')}{' '}
          <Link href="/login">{t('Login.signIn')}</Link>
        </small>
      </div>
    </section>
  );
};

export default Register;

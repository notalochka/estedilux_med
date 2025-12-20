import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { LogIn, Lock, User } from 'lucide-react';
import styles from './Login.module.css';

const LoginPage: NextPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        router.push('/admin');
      }
    } catch (error) {
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Помилка при вході');
        setIsLoading(false);
        return;
      }

      router.push('/admin');
    } catch (error) {
      setError('Помилка підключення до сервера');
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Вхід в адмін панель - Estedilux Med</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className={styles.loginPage}>
        <div className={styles.loginContainer}>
          <div className={styles.loginHeader}>
            <div className={styles.logoIcon}>
              <Lock size={48} />
            </div>
            <h1 className={styles.title}>Estedilux Med</h1>
            <p className={styles.subtitle}>Административная панель</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.loginForm}>
            {error && (
              <div className={styles.errorMessage}>
                {error}
              </div>
            )}

            <div className={styles.formGroup}>
              <label htmlFor="username" className={styles.label}>
                <User size={18} />
                Логин
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={styles.input}
                placeholder="Введите логин"
                required
                autoComplete="username"
                disabled={isLoading}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>
                <Lock size={18} />
                Пароль
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                placeholder="Введите пароль"
                required
                autoComplete="current-password"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? (
                'Вход...'
              ) : (
                <>
                  <LogIn size={20} />
                  Войти
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;


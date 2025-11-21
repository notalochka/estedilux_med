import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

const NotFound: NextPage = () => {
  const router = useRouter();
  const { locale } = router;

  return (
    <>
      <Head>
        <title>
          {locale === 'uk' ? '404 - Сторінку не знайдено' : '404 - Page Not Found'}
        </title>
      </Head>

      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4rem 0',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: 'var(--font-size-4xl)', marginBottom: '1rem' }}>404</h1>
            <p style={{ fontSize: 'var(--font-size-xl)', marginBottom: '2rem', color: 'var(--color-text-light)' }}>
              {locale === 'uk'
                ? 'Сторінку не знайдено'
                : 'Page not found'}
            </p>
            <Link
              href="/"
              style={{
                padding: '1rem 2rem',
                background: 'var(--color-primary)',
                color: 'white',
                borderRadius: '8px',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              {locale === 'uk' ? 'Повернутися на головну' : 'Return to Home'}
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default NotFound;


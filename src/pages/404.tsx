import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { t } from '@/lib/translations';

const NotFound: NextPage = () => {
  const router = useRouter();
  const { locale } = router;

  const title = t(
    {
      ru: '404 - Страница не найдена',
      en: '404 - Page Not Found',
      tr: '404 - Sayfa Bulunamadı',
      uk: '404 - Сторінку не знайдено',
    },
    locale
  );

  const pageNotFound = t(
    {
      ru: 'Страница не найдена',
      en: 'Page not found',
      tr: 'Sayfa bulunamadı',
      uk: 'Сторінку не знайдено',
    },
    locale
  );

  const returnHome = t(
    {
      ru: 'Вернуться на главную',
      en: 'Return to Home',
      tr: 'Ana Sayfaya Dön',
      uk: 'Повернутися на головну',
    },
    locale
  );

  return (
    <>
      <Head>
        <title>{title}</title>
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
              {pageNotFound}
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
              {returnHome}
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default NotFound;


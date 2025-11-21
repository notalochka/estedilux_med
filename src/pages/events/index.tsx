import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

const Events: NextPage = () => {
  const router = useRouter();
  const { locale } = router;

  return (
    <>
      <Head>
        <title>
          {locale === 'uk' ? 'Події - Estedilux Med' : 'Events - Estedilux Med'}
        </title>
        <meta
          name="description"
          content={
            locale === 'uk'
              ? 'Переглянути всі медичні події та заходи'
              : 'View all medical events and activities'
          }
        />
      </Head>

      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flex: 1, padding: '4rem 0' }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <h1 style={{ fontSize: 'var(--font-size-4xl)', marginBottom: '2rem', textAlign: 'center' }}>
              {locale === 'uk' ? 'Події' : 'Events'}
            </h1>
            <p style={{ textAlign: 'center', color: 'var(--color-text-light)', marginBottom: '3rem' }}>
              {locale === 'uk'
                ? 'Скоро тут з\'являться заплановані події та заходи'
                : 'Upcoming events and activities will appear here soon'}
            </p>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Events;


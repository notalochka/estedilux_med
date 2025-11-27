import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import Footer from '@/components/Footer/Footer';

const Home: NextPage = () => {
  const router = useRouter();
  const { locale } = router;

  return (
    <>
      <Head>
        <title>
          {locale === 'ru'
            ? 'Estedilux Med - Обучение врачей за рубежом'
            : 'Estedilux Med - Medical Training Abroad'}
        </title>
        <meta
          name="description"
          content={
            locale === 'ru'
              ? 'Профессиональные медицинские программы для развития карьеры врачей'
              : 'Professional medical programs for doctors career development'
          }
        />
      </Head>

      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flex: 1 }}>
          <Hero />
          
          <section style={{ padding: '4rem 0', background: 'var(--color-bg-light)' }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
              <h2 style={{ fontSize: 'var(--font-size-3xl)', marginBottom: '2rem', textAlign: 'center' }}>
                {locale === 'ru' ? 'Скоро здесь появится информация' : 'Soon here will be information'}
              </h2>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;


import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import Footer from '@/components/Footer/Footer';
import UpcomingEvents from '@/components/UpcomingEvents/UpcomingEvents';
import AboutSection from '@/components/AboutSection/AboutSection';
import SolutionsSection from '@/components/SolutionsSection/SolutionsSection';
import BlogPreviewSection from '@/components/BlogPreviewSection/BlogPreviewSection';

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
          <UpcomingEvents />
          <AboutSection />
          <SolutionsSection />
          <BlogPreviewSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;


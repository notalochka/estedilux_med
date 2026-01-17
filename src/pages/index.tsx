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
import { t } from '@/lib/translations';

const Home: NextPage = () => {
  const router = useRouter();
  const { locale } = router;

  const title = t(
    {
      ru: 'Estedilux Med - Обучение врачей за рубежом',
      en: 'Estedilux Med - Medical Training Abroad',
      tr: 'Estedilux Med - Yurtdışında Doktor Eğitimi',
      uk: 'Estedilux Med - Навчання лікарів за кордоном',
    },
    locale
  );

  const description = t(
    {
      ru: 'Профессиональные медицинские программы для развития карьеры врачей',
      en: 'Professional medical programs for doctors career development',
      tr: 'Doktorların kariyer gelişimi için profesyonel tıbbi programlar',
      uk: 'Професійні медичні програми для розвитку кар\'єри лікарів',
    },
    locale
  );

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
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


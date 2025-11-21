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
          {locale === 'uk'
            ? 'Estedilux Med - Навчання лікарів за кордоном'
            : 'Estedilux Med - Medical Training Abroad'}
        </title>
        <meta
          name="description"
          content={
            locale === 'uk'
              ? 'Професійні медичні програми для розвитку кар\'єри лікарів'
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
                {locale === 'uk' ? 'Наші переваги' : 'Our Advantages'}
              </h2>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                gap: '2rem' 
              }}>
                <div style={{ 
                  padding: '2rem', 
                  background: 'white', 
                  borderRadius: '8px', 
                  boxShadow: 'var(--shadow-md)' 
                }}>
                  <h3 style={{ fontSize: 'var(--font-size-xl)', marginBottom: '1rem' }}>
                    {locale === 'uk' ? 'Професійні викладачі' : 'Professional Instructors'}
                  </h3>
                  <p style={{ color: 'var(--color-text-light)' }}>
                    {locale === 'uk'
                      ? 'Досвідчені лікарі та експерти з різних медичних спеціальностей'
                      : 'Experienced doctors and experts from various medical specialties'}
                  </p>
                </div>
                
                <div style={{ 
                  padding: '2rem', 
                  background: 'white', 
                  borderRadius: '8px', 
                  boxShadow: 'var(--shadow-md)' 
                }}>
                  <h3 style={{ fontSize: 'var(--font-size-xl)', marginBottom: '1rem' }}>
                    {locale === 'uk' ? 'Сучасні методики' : 'Modern Methods'}
                  </h3>
                  <p style={{ color: 'var(--color-text-light)' }}>
                    {locale === 'uk'
                      ? 'Актуальні програми навчання з використанням новітніх технологій'
                      : 'Up-to-date training programs using the latest technologies'}
                  </p>
                </div>
                
                <div style={{ 
                  padding: '2rem', 
                  background: 'white', 
                  borderRadius: '8px', 
                  boxShadow: 'var(--shadow-md)' 
                }}>
                  <h3 style={{ fontSize: 'var(--font-size-xl)', marginBottom: '1rem' }}>
                    {locale === 'uk' ? 'Міжнародне визнання' : 'International Recognition'}
                  </h3>
                  <p style={{ color: 'var(--color-text-light)' }}>
                    {locale === 'uk'
                      ? 'Сертифікати та дипломи, визнані у всьому світі'
                      : 'Certificates and diplomas recognized worldwide'}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;


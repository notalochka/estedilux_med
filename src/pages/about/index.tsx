import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

const About: NextPage = () => {
  const router = useRouter();
  const { locale } = router;

  return (
    <>
      <Head>
        <title>
          {locale === 'uk' ? 'Про нас - Estedilux Med' : 'About Us - Estedilux Med'}
        </title>
        <meta
          name="description"
          content={
            locale === 'uk'
              ? 'Дізнайтеся більше про Estedilux Med'
              : 'Learn more about Estedilux Med'
          }
        />
      </Head>

      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flex: 1, padding: '4rem 0' }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <h1 style={{ fontSize: 'var(--font-size-4xl)', marginBottom: '2rem', textAlign: 'center' }}>
              {locale === 'uk' ? 'Про нас' : 'About Us'}
            </h1>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <p style={{ fontSize: 'var(--font-size-lg)', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                {locale === 'uk'
                  ? 'Estedilux Med - це платформа для професійного розвитку лікарів через навчання за кордоном. Ми пропонуємо якісні освітні програми, які допомагають медичним працівникам розширювати свої знання та вдосконалювати навички.'
                  : 'Estedilux Med is a platform for professional development of doctors through training abroad. We offer quality educational programs that help medical professionals expand their knowledge and improve their skills.'}
              </p>
              <p style={{ fontSize: 'var(--font-size-lg)', lineHeight: '1.8' }}>
                {locale === 'uk'
                  ? 'Наша мета - надати лікарям доступ до найкращих міжнародних програм навчання та сприяти їх професійному зростанню.'
                  : 'Our goal is to provide doctors with access to the best international training programs and promote their professional growth.'}
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default About;


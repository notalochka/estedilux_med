import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './Hero.module.css';

const Hero: React.FC = () => {
  const router = useRouter();
  const { locale } = router;

  return (
    <section className={styles.hero}>
      <div className={styles.heroBackground}>
        <Image
          src="/photo1.jpg"
          alt="Estedilux Med Background"
          fill
          className={styles.heroImage}
          priority
          quality={90}
        />
      </div>
      <div className={styles.heroOverlay}></div>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            {locale === 'ru'
              ? 'Обучение врачей за рубежом'
              : 'Medical Training Abroad'}
          </h1>
          <p className={styles.subtitle}>
            {locale === 'ru'
              ? 'Профессиональные медицинские программы для развития вашей карьеры'
              : 'Professional medical programs for your career development'}
          </p>
          <div className={styles.cta}>
            <Link href="/events" className={styles.button}>
              <span>{locale === 'ru' ? 'Посмотреть события' : 'View Events'}</span>
            </Link>
            <Link href="/contact" className={styles.buttonSecondary}>
              <span>{locale === 'ru' ? 'Связаться с нами' : 'Contact Us'}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

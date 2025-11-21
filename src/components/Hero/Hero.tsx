import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './Hero.module.css';

const Hero: React.FC = () => {
  const router = useRouter();
  const { locale } = router;

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            {locale === 'uk'
              ? 'Навчання лікарів за кордоном'
              : 'Medical Training Abroad'}
          </h1>
          <p className={styles.subtitle}>
            {locale === 'uk'
              ? 'Професійні медичні програми для розвитку вашої кар\'єри'
              : 'Professional medical programs for your career development'}
          </p>
          <div className={styles.cta}>
            <Link href="/events" className={styles.button}>
              {locale === 'uk' ? 'Переглянути події' : 'View Events'}
            </Link>
            <Link href="/contact" className={styles.buttonSecondary}>
              {locale === 'uk' ? 'Зв\'язатися з нами' : 'Contact Us'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;


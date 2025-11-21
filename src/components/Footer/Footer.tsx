import React from 'react';
import { useRouter } from 'next/router';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const router = useRouter();
  const { locale } = router;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <h3 className={styles.title}>Estedilux Med</h3>
            <p className={styles.description}>
              {locale === 'uk'
                ? 'Освітні програми для лікарів'
                : 'Educational programs for doctors'}
            </p>
          </div>

          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>
              {locale === 'uk' ? 'Навігація' : 'Navigation'}
            </h4>
            <nav className={styles.nav}>
              <a href="/" className={styles.link}>
                {locale === 'uk' ? 'Головна' : 'Home'}
              </a>
              <a href="/about" className={styles.link}>
                {locale === 'uk' ? 'Про нас' : 'About'}
              </a>
              <a href="/events" className={styles.link}>
                {locale === 'uk' ? 'Події' : 'Events'}
              </a>
              <a href="/blog" className={styles.link}>
                {locale === 'uk' ? 'Блог' : 'Blog'}
              </a>
              <a href="/contact" className={styles.link}>
                {locale === 'uk' ? 'Контакти' : 'Contact'}
              </a>
            </nav>
          </div>

          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>
              {locale === 'uk' ? 'Контакти' : 'Contact'}
            </h4>
            <p className={styles.contactInfo}>
              Email: info@estedilux-med.com
            </p>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            {locale === 'uk'
              ? '© 2024 Estedilux Med. Всі права захищені.'
              : '© 2024 Estedilux Med. All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


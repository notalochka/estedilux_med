import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const router = useRouter();
  const { locale } = router;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <div className={styles.logoContainer}>
              <Image
                src="/logo.jpg"
                alt="Estedilux Med"
                width={250}
                height={80}
                className={styles.logo}
                priority
              />
            </div>
            <h3 className={styles.title}>Estedilux Med</h3>
            <p className={styles.description}>
              {locale === 'ru'
                ? 'Образовательные программы для врачей'
                : 'Educational programs for doctors'}
            </p>
          </div>

          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>
              {locale === 'ru' ? 'Контактная информация' : 'Contact Information'}
            </h4>
            <div className={styles.contactInfo}>
              <a href="mailto:estediluxmed@ukr.net" className={styles.contactItem}>
                <span className={styles.contactIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className={styles.contactText}>estediluxmed@ukr.net</span>
              </a>
              
              <a href="tel:+380509994349" className={styles.contactItem}>
                <span className={styles.contactIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className={styles.contactText}>+380 50 999 43 49</span>
              </a>
              
              <div className={styles.socialLinks}>
                <a 
                  href="https://www.instagram.com/estedilux_med?igsh=MXY5ODA2bHMxMTk1MQ==" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`${styles.socialLink} ${styles.instagram}`}
                  aria-label="Instagram"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="2"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="currentColor" strokeWidth="2"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span>Instagram</span>
                </a>
                
                <a 
                  href="https://www.facebook.com/profile.php?id=61551895149114&mibextid=wwXIfr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`${styles.socialLink} ${styles.facebook}`}
                  aria-label="Facebook"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Facebook</span>
                </a>
          </div>
          </div>
        </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


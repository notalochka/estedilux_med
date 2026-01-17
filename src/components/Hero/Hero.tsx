import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAnimation } from '@/lib/useAnimation';
import { t } from '@/lib/translations';
import styles from './Hero.module.css';

const Hero: React.FC = () => {
  const router = useRouter();
  const { locale } = router;
  const { ref: titleRef, isVisible: titleVisible } = useAnimation({ threshold: 0.2 });
  const { ref: subtitleRef, isVisible: subtitleVisible } = useAnimation({ threshold: 0.2 });
  const { ref: ctaRef, isVisible: ctaVisible } = useAnimation({ threshold: 0.2 });

  return (
    <section className={styles.hero}>
      <div className={styles.heroBackground}>
        <Image
          src="/main_hero_mobile.png"
          alt="Estedilux Med Background"
          fill
          className={`${styles.heroImage} ${styles.heroImageMobile}`}
          priority
        />
        <Image
          src="/main_hero.jpg"
          alt="Estedilux Med Background"
          fill
          className={`${styles.heroImage} ${styles.heroImageDesktop}`}
          priority
        />
      </div>
      <div className={styles.heroOverlay}></div>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 
            ref={titleRef as React.RefObject<HTMLHeadingElement>}
            className={`${styles.title} ${titleVisible ? styles.animateFadeInUp : ''}`}
          >
            {t(
              {
                ru: 'Обучение врачей за рубежом',
                en: 'Medical Training Abroad',
                tr: 'Yurtdışında Doktor Eğitimi',
                uk: 'Навчання лікарів за кордоном',
              },
              locale
            )}
          </h1>
          <p 
            ref={subtitleRef as React.RefObject<HTMLParagraphElement>}
            className={`${styles.subtitle} ${subtitleVisible ? styles.animateFadeInUp : ''} ${styles.animationDelay200}`}
          >
            {t(
              {
                ru: 'Профессиональные медицинские программы для развития вашей карьеры',
                en: 'Professional medical programs for your career development',
                tr: 'Kariyerinizin gelişimi için profesyonel tıbbi programlar',
                uk: 'Професійні медичні програми для розвитку вашої кар\'єри',
              },
              locale
            )}
          </p>
          <div 
            ref={ctaRef as React.RefObject<HTMLDivElement>}
            className={`${styles.cta} ${ctaVisible ? styles.animateFadeInUp : ''} ${styles.animationDelay400}`}
          >
            <Link href="/events" className={styles.button}>
              <span>
                {t(
                  {
                    ru: 'Посмотреть события',
                    en: 'View Events',
                    tr: 'Etkinlikleri Görüntüle',
                    uk: 'Переглянути події',
                  },
                  locale
                )}
              </span>
            </Link>
            <Link href="/contact" className={styles.buttonSecondary}>
              <span>
                {t(
                  {
                    ru: 'Связаться с нами',
                    en: 'Contact Us',
                    tr: 'Bizimle İletişime Geçin',
                    uk: 'Зв\'язатися з нами',
                  },
                  locale
                )}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

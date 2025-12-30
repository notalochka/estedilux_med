import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowRight } from 'lucide-react';
import { useAnimation } from '@/lib/useAnimation';
import styles from './AboutSection.module.css';

const AboutSection: React.FC = () => {
  const router = useRouter();
  const { locale } = router;
  const { ref: textRef, isVisible: textVisible } = useAnimation({ threshold: 0.1 });
  const { ref: imageRef, isVisible: imageVisible } = useAnimation({ threshold: 0.1 });

  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div 
            ref={imageRef as React.RefObject<HTMLDivElement>}
            className={`${styles.imageContent} ${imageVisible ? styles.animateSlideInLeft : ''}`}
          >
            <div className={styles.imageWrapper}>
              <Image
                src="/about_main.jpg"
                alt={locale === 'ru' ? 'Команда Estedilux Med' : 'Estedilux Med Team'}
                fill
                className={styles.aboutImage}
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={90}
              />
              <div className={styles.imageOverlay}></div>
              
              <div 
                ref={textRef as React.RefObject<HTMLDivElement>}
                className={`${styles.textOverlay} ${textVisible ? styles.animateFadeIn : ''}`}
              >
                <div className={styles.headerContent}>
                  <h2 className={styles.sectionLabel}>
                    {locale === 'ru' ? 'ПРО ESTEDILUX MED' : 'ABOUT ESTEDILUX MED'}
                  </h2>
                </div>
                
                <div className={styles.centerContent}>
                  <h3 className={styles.title}>
                    {locale === 'ru'
                      ? 'Ваш партнер в медицинском образовании и развитии'
                      : 'Your Partner in Medical Education and Development'}
                  </h3>
                </div>
                
                <div className={styles.bottomContent}>
                  <Link href="/about" className={styles.moreButton}>
                    <span>{locale === 'ru' ? 'Узнать больше' : 'More About Us'}</span>
                    <ArrowRight size={18} className={styles.arrowIcon} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.textContent}>
            <div className={styles.textBlock}>
              <p className={styles.paragraph}>
                {locale === 'ru'
                  ? 'Estedilux Med — это международная образовательная платформа, которая объединяет обучение, стажировки, профессиональное развитие врачей и полную организацию медицинских мероприятий. Мы сотрудничаем с врачами различных специальностей и разрабатываем программы, которые соответствуют международным медицинским стандартам.'
                  : 'Estedilux Med is an international educational platform that combines training, internships, professional development of doctors and complete organization of medical events. We work with doctors of various specialties and develop programs that meet international medical standards.'}
              </p>
              <p className={styles.paragraph}>
                {locale === 'ru'
                  ? 'Наша цель — внедрять лучшие практики в медицинской сфере, добавляя ценность нашим клиентам и формируя будущее индустрии через инновационные и этичные решения, адаптированные под ваши потребности.'
                  : 'Our goal is to implement best practices in the medical field, adding value to our clients and shaping the future of the industry through innovative and ethical solutions tailored to your needs.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;


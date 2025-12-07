import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowRight } from 'lucide-react';
import styles from './AboutSection.module.css';

const AboutSection: React.FC = () => {
  const router = useRouter();
  const { locale } = router;

  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textWrapper}>
            <div className={styles.headerContent}>
              <h2 className={styles.sectionLabel}>
                {locale === 'ru' ? 'ПРО ESTEDILUX MED' : 'ABOUT ESTEDILUX MED'}
              </h2>
              <h3 className={styles.title}>
                {locale === 'ru'
                  ? 'Гарантия качества в медицинском образовании и развитии'
                  : 'Quality Assurance in Medical Education and Development'}
              </h3>
            </div>
            
            <div className={styles.bodyContent}>
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
              <Link href="/about" className={styles.moreButton}>
                <span>{locale === 'ru' ? 'Узнать больше' : 'More About Us'}</span>
                <ArrowRight size={18} className={styles.arrowIcon} />
              </Link>
            </div>
          </div>
          
          <div className={styles.imageContent}>
            <div className={styles.imageWrapper}>
              <Image
                src="/about_main.jpg"
                alt={locale === 'ru' ? 'Команда Estedilux Med' : 'Estedilux Med Team'}
                fill
                className={styles.aboutImage}
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={90}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;


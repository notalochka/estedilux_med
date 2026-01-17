import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowRight } from 'lucide-react';
import { useAnimation } from '@/lib/useAnimation';
import { t } from '@/lib/translations';
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
                src="/photo1.jpg"
                alt={t({ ru: 'Команда Estedilux Med', en: 'Estedilux Med Team', tr: 'Estedilux Med Ekibi', uk: 'Команда Estedilux Med' }, locale)}
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
                    {t({ ru: 'ПРО ESTEDILUX MED', en: 'ABOUT ESTEDILUX MED', tr: 'ESTEDILUX MED HAKKINDA', uk: 'ПРО ESTEDILUX MED' }, locale)}
                  </h2>
                </div>
                
                <div className={styles.centerContent}>
                  <h3 className={styles.title}>
                    {t(
                      {
                        ru: 'Ваш партнер в медицинском образовании и развитии',
                        en: 'Your Partner in Medical Education and Development',
                        tr: 'Tıbbi Eğitim ve Gelişimde Ortağınız',
                        uk: 'Ваш партнер у медичній освіті та розвитку',
                      },
                      locale
                    )}
                  </h3>
                </div>
                
                <div className={styles.bottomContent}>
                  <Link href="/about" className={styles.moreButton}>
                    <span>{t({ ru: 'Узнать больше', en: 'More About Us', tr: 'Daha Fazla Bilgi', uk: 'Дізнатися більше' }, locale)}</span>
                    <ArrowRight size={18} className={styles.arrowIcon} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.textContent}>
            <div className={styles.textBlock}>
              <p className={styles.paragraph}>
                {t(
                  {
                    ru: 'Estedilux Med — это международная образовательная платформа, которая объединяет обучение, стажировки, профессиональное развитие врачей и полную организацию медицинских мероприятий. Мы сотрудничаем с врачами различных специальностей и разрабатываем программы, которые соответствуют международным медицинским стандартам.',
                    en: 'Estedilux Med is an international educational platform that combines training, internships, professional development of doctors and complete organization of medical events. We work with doctors of various specialties and develop programs that meet international medical standards.',
                    tr: 'Estedilux Med, eğitim, stajlar, doktorların mesleki gelişimi ve tıbbi etkinliklerin tam organizasyonunu birleştiren uluslararası bir eğitim platformudur. Çeşitli uzmanlık alanlarındaki doktorlarla çalışıyoruz ve uluslararası tıbbi standartlara uygun programlar geliştiriyoruz.',
                    uk: 'Estedilux Med — це міжнародна освітня платформа, яка об\'єднує навчання, стажування, професійний розвиток лікарів та повну організацію медичних заходів. Ми співпрацюємо з лікарями різних спеціальностей та розробляємо програми, які відповідають міжнародним медичним стандартам.',
                  },
                  locale
                )}
              </p>
              <p className={styles.paragraph}>
                {t(
                  {
                    ru: 'Наша цель — внедрять лучшие практики в медицинской сфере, добавляя ценность нашим клиентам и формируя будущее индустрии через инновационные и этичные решения, адаптированные под ваши потребности.',
                    en: 'Our goal is to implement best practices in the medical field, adding value to our clients and shaping the future of the industry through innovative and ethical solutions tailored to your needs.',
                    tr: 'Hedefimiz, ihtiyaçlarınıza uyarlanmış yenilikçi ve etik çözümler aracılığıyla müşterilerimize değer katmak ve endüstrinin geleceğini şekillendirerek tıp alanında en iyi uygulamaları hayata geçirmektir.',
                    uk: 'Наша мета — впроваджувати найкращі практики в медичній сфері, додаючи цінність нашим клієнтам та формуючи майбутнє індустрії через інноваційні та етичні рішення, адаптовані під ваші потреби.',
                  },
                  locale
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;


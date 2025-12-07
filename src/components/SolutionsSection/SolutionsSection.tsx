import React from 'react';
import { useRouter } from 'next/router';
import { Globe, Users, DollarSign } from 'lucide-react';
import styles from './SolutionsSection.module.css';

const SolutionsSection: React.FC = () => {
  const router = useRouter();
  const { locale } = router;

  const features = [
    {
      icon: Globe,
      title: locale === 'ru' ? 'Международные стандарты' : 'Global Standards',
      description: locale === 'ru'
        ? 'Все наши услуги предоставляются в соответствии с международными стандартами медицинского образования, гарантируя высокое качество, надежность и профессионализм для наших клиентов.'
        : 'All our services are delivered in adherence to international medical education standards, guaranteeing excellence, reliability, and professionalism for our clients.',
    },
    {
      icon: Users,
      title: locale === 'ru' ? 'Профессиональная команда' : 'Professional Team',
      description: locale === 'ru'
        ? 'Получайте поддержку от высококвалифицированной и признанной на международном уровне профессиональной команды, предоставляющей индивидуальные решения для ваших уникальных потребностей с профессионализмом и заботой.'
        : 'Receive support from a highly experienced and internationally recognized professional team, providing tailored solutions to meet your unique needs with excellence and care.',
    },
    {
      icon: DollarSign,
      title: locale === 'ru' ? 'Доступные цены' : 'Reasonable Prices',
      description: locale === 'ru'
        ? 'Наслаждайтесь прозрачным ценообразованием без скрытых платежей. Мы предлагаем услуги высочайшего качества по конкурентоспособным ценам, обеспечивая доступность без ущерба для качества.'
        : 'Enjoy transparent pricing with no hidden fees. We provide top-quality services at competitive rates, ensuring affordability without compromising on quality.',
    },
  ];

  return (
    <section className={styles.solutionsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {locale === 'ru' ? (
              <>
                Профессиональные услуги в {' '}
                <strong>Медицине</strong> и <strong>Развитии Специалистов</strong>
              </>
            ) : (
              <>
                We Provide Comprehensive <strong>Healthcare</strong> & Professional{' '}
                <strong>Development</strong> Solutions
              </>
            )}
          </h2>
          <p className={styles.description}>
            {locale === 'ru'
              ? 'Estedilux Med - пространство, где врач выходит на международный уровень. Мы создаём обучение, которое даёт не просто знания, а карьерные возможности, новые рынки, международную практику и профессиональный рост.'
              : 'Estedilux Med - space where a doctor goes to the international level. We create training that gives not just knowledge, but career opportunities, new markets, international practice and professional growth.'}
          </p>
        </div>

        <div className={styles.featuresGrid}>
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className={styles.featureCard}>
                <div className={styles.iconWrapper}>
                  <IconComponent size={48} className={styles.icon} />
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;


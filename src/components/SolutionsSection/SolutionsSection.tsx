import React from 'react';
import { useRouter } from 'next/router';
import { useAnimation } from '@/lib/useAnimation';
import { t } from '@/lib/translations';
import styles from './SolutionsSection.module.css';

const SolutionsSection: React.FC = () => {
  const router = useRouter();
  const { locale } = router;
  const { ref: headerRef, isVisible: headerVisible } = useAnimation({ threshold: 0.1 });
  const feature1Ref = useAnimation({ threshold: 0.1 });
  const feature2Ref = useAnimation({ threshold: 0.1 });
  const feature3Ref = useAnimation({ threshold: 0.1 });
  const featureRefs = [feature1Ref, feature2Ref, feature3Ref];

  const features = [
    {
      icon: '/global.svg',
      title: t({ ru: 'Международные стандарты', en: 'Global Standards', tr: 'Uluslararası Standartlar', uk: 'Міжнародні стандарти' }, locale),
      description: t(
        {
          ru: 'Все наши услуги предоставляются в соответствии с международными стандартами медицинского образования, гарантируя высокое качество, надежность и профессионализм для наших клиентов.',
          en: 'All our services are delivered in adherence to international medical education standards, guaranteeing excellence, reliability, and professionalism for our clients.',
          tr: 'Tüm hizmetlerimiz, müşterilerimize mükemmellik, güvenilirlik ve profesyonellik garantisi veren uluslararası tıp eğitimi standartlarına uygun olarak sunulmaktadır.',
          uk: 'Всі наші послуги надаються відповідно до міжнародних стандартів медичної освіти, гарантуючи високу якість, надійність та професійність для наших клієнтів.',
        },
        locale
      ),
    },
    {
      icon: '/team.svg',
      title: t({ ru: 'Профессиональная команда', en: 'Professional Team', tr: 'Profesyonel Ekip', uk: 'Професійна команда' }, locale),
      description: t(
        {
          ru: 'Получайте поддержку от высококвалифицированной и признанной на международном уровне профессиональной команды, предоставляющей индивидуальные решения для ваших уникальных потребностей с профессионализмом и заботой.',
          en: 'Receive support from a highly experienced and internationally recognized professional team, providing tailored solutions to meet your unique needs with excellence and care.',
          tr: 'Mükemmellik ve özenle benzersiz ihtiyaçlarınıza uygun çözümler sunan, yüksek deneyimli ve uluslararası düzeyde tanınmış profesyonel bir ekibin desteğini alın.',
          uk: 'Отримуйте підтримку від висококваліфікованої та визнаної на міжнародному рівні професійної команди, яка надає індивідуальні рішення для ваших унікальних потреб з професійністю та турботою.',
        },
        locale
      ),
    },
    {
      icon: '/cost.svg',
      title: t({ ru: 'Формирование стоимости программ', en: 'Forming the cost of programs', tr: 'Program maliyetinin oluşturulması', uk: 'Формування вартості програм' }, locale),
      description: t(
        {
          ru: 'Стоимость образовательных программ Estedilux Med определяется совокупностью организационных и образовательных факторов, включая формат обучения, уровень подготовки, объём практической части, а также специфику проведения стажировок и профессиональных медицинских мероприятий.',
          en: 'The cost of educational programs in Estedilux Med is determined by the combined organizational and educational factors, including the training format, level of preparation, volume of practical part, as well as the specifics of conducting internships and professional medical events.',
          tr: 'Estedilux Med\'deki eğitim programlarının maliyeti, eğitim formatı, hazırlık seviyesi, pratik kısmın hacmi ve stajların ve profesyonel tıbbi etkinliklerin yürütülmesinin özellikleri dahil olmak üzere organizasyonel ve eğitim faktörlerinin birleşimi ile belirlenir.',
          uk: 'Вартість освітніх програм Estedilux Med визначається сукупністю організаційних та освітніх факторів, включаючи формат навчання, рівень підготовки, обсяг практичної частини, а також специфіку проведення стажувань та професійних медичних заходів.',
        },
        locale
      ),
    },
  ];

  return (
    <section className={styles.solutionsSection}>
      <div className={styles.container}>
        <div 
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`${styles.header} ${headerVisible ? styles.animateFadeInUp : ''}`}
        >
          <h2 className={styles.title}>
            {locale === 'ru' ? (
              <>
                Профессиональные услуги в {' '}
                <strong>Медицине</strong> и <strong>Развитии Специалистов</strong>
              </>
            ) : locale === 'en' ? (
              <>
                We Provide Comprehensive <strong>Healthcare</strong> & Professional{' '}
                <strong>Development</strong> Solutions
              </>
            ) : locale === 'tr' ? (
              <>
                Kapsamlı <strong>Sağlık</strong> ve Profesyonel{' '}
                <strong>Gelişim</strong> Çözümleri Sunuyoruz
              </>
            ) : (
              <>
                Професійні послуги в {' '}
                <strong>Медицині</strong> та <strong>Розвитку Спеціалістів</strong>
              </>
            )}
          </h2>
          <p className={styles.description}>
            {t(
              {
                ru: 'Estedilux Med - пространство, где врач выходит на международный уровень. Мы создаём обучение, которое даёт не просто знания, а карьерные возможности, новые рынки, международную практику и профессиональный рост.',
                en: 'Estedilux Med - space where a doctor goes to the international level. We create training that gives not just knowledge, but career opportunities, new markets, international practice and professional growth.',
                tr: 'Estedilux Med - bir doktorun uluslararası seviyeye çıktığı alan. Sadece bilgi değil, aynı zamanda kariyer fırsatları, yeni pazarlar, uluslararası uygulama ve profesyonel büyüme sağlayan eğitimler oluşturuyoruz.',
                uk: 'Estedilux Med - простір, де лікар виходить на міжнародний рівень. Ми створюємо навчання, яке дає не просто знання, а кар\'єрні можливості, нові ринки, міжнародну практику та професійне зростання.',
              },
              locale
            )}
          </p>
        </div>

        <div className={styles.featuresGrid}>
          {features.map((feature, index) => {
            const { ref, isVisible } = featureRefs[index];
            return (
              <div 
                key={index} 
                ref={ref as React.RefObject<HTMLDivElement>}
                className={`${styles.featureCard} ${isVisible ? styles.animateFadeInUp : ''}`}
                style={{ animationDelay: `${index * 0.1}s`, opacity: isVisible ? 1 : 0 }}
              >
                <div className={styles.iconWrapper}>
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className={styles.icon}
                  />
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


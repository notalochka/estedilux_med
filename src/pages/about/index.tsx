import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAnimation } from '@/lib/useAnimation';
import { t } from '@/lib/translations';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './About.module.css';

const About: NextPage = () => {
  const router = useRouter();
  const { locale } = router;
  const { ref: heroRef, isVisible: heroVisible } = useAnimation({ threshold: 0.2 });
  const { ref: aboutTextRef, isVisible: aboutTextVisible } = useAnimation({ threshold: 0.1 });
  const { ref: graduatesRef, isVisible: graduatesVisible } = useAnimation({ threshold: 0.1 });

  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentVideoSlide, setCurrentVideoSlide] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [loadedVideos, setLoadedVideos] = useState<Set<number>>(new Set());
  const [videosPerView, setVideosPerView] = useState(3);
  const studentImages = Array.from({ length: 9 }, (_, i) => `/students/${i + 1}.jpg`);
  const videoFiles = [
    '/videos/1.MP4',
    '/videos/2.mp4',
    '/videos/3.mp4',
    '/videos/4.mp4',
    '/videos/5.mp4',
    '/videos/6.mp4',
    '/videos/7.mp4',
  ];

  useEffect(() => {
    const updateVideosPerView = () => {
      setVideosPerView(window.innerWidth <= 768 ? 1 : 3);
    };

    updateVideosPerView();
    window.addEventListener('resize', updateVideosPerView);
    return () => window.removeEventListener('resize', updateVideosPerView);
  }, []);

  useEffect(() => {
    // Перевіряємо, чи поточний слайд не виходить за межі при зміні кількості відео на екрані
    const maxSlide = Math.max(0, videoFiles.length - videosPerView);
    if (currentVideoSlide > maxSlide) {
      setCurrentVideoSlide(maxSlide);
    }
  }, [videosPerView, videoFiles.length]);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  };

  const handleVideoLoad = (index: number) => {
    setLoadedVideos((prev) => new Set(prev).add(index));
  };

  const scrollToAboutText = () => {
    const element = document.getElementById('about-text-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % studentImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + studentImages.length) % studentImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextVideoSlide = () => {
    setCurrentVideoSlide((prev) => {
      const maxSlide = Math.max(0, videoFiles.length - videosPerView);
      return prev < maxSlide ? prev + 1 : maxSlide;
    });
  };

  const prevVideoSlide = () => {
    setCurrentVideoSlide((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const goToVideoSlide = (index: number) => {
    const maxSlide = Math.max(0, videoFiles.length - videosPerView);
    setCurrentVideoSlide(Math.min(index, maxSlide));
  };

  const openVideo = (videoSrc: string) => {
    const index = videoFiles.indexOf(videoSrc);
    setCurrentVideoIndex(index >= 0 ? index : 0);
    setSelectedVideo(videoSrc);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  const nextVideo = () => {
    const nextIndex = (currentVideoIndex + 1) % videoFiles.length;
    setCurrentVideoIndex(nextIndex);
    setSelectedVideo(videoFiles[nextIndex]);
  };

  const prevVideo = () => {
    const prevIndex = (currentVideoIndex - 1 + videoFiles.length) % videoFiles.length;
    setCurrentVideoIndex(prevIndex);
    setSelectedVideo(videoFiles[prevIndex]);
  };

  return (
    <>
      <Head>
        <title>
          {t({ ru: 'О нас - Estedilux Med', en: 'About Us - Estedilux Med', tr: 'Hakkımızda - Estedilux Med', uk: 'Про нас - Estedilux Med' }, locale)}
        </title>
        <meta
          name="description"
          content={t(
            {
              ru: 'Узнайте больше о Estedilux Med - международной образовательной платформе для врачей',
              en: 'Learn more about Estedilux Med - international educational platform for doctors',
              tr: 'Estedilux Med hakkında daha fazla bilgi edinin - doktorlar için uluslararası eğitim platformu',
              uk: 'Дізнайтеся більше про Estedilux Med - міжнародну освітню платформу для лікарів',
            },
            locale
          )}
        />
      </Head>

      <div className={styles.aboutPage}>
        <Header />
        <main className={styles.main}>
          {/* Hero Section за макетом */}
          <section className={styles.hero}>
            <div className={styles.heroBackground}>
              <Image
                src="/about_main.jpg"
                alt="Estedilux Med Background"
                fill
                className={styles.heroBannerImage}
                priority
                quality={90}
              />
              <div className={styles.heroOverlay}></div>
            </div>
            <div className={styles.container}>
              <div className={styles.heroContent}>
                {/* Заголовок по центру */}
                <div 
                  ref={heroRef as React.RefObject<HTMLDivElement>}
                  className={`${styles.heroTitleWrapper} ${heroVisible ? styles.animateFadeInUp : ''}`}
                >
                  <h1 className={styles.heroTitle}>
                    {t({ ru: 'Про компанию', en: 'About the Company', tr: 'Şirket Hakkında', uk: 'Про компанію' }, locale)}
            </h1>
                  <div className={styles.heroChevron} onClick={scrollToAboutText}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Детальний текст про компанію на білому фоні */}
          <section id="about-text-section" className={styles.aboutTextSection}>
            <div className={styles.aboutTextContainer}>
              <div 
                ref={aboutTextRef as React.RefObject<HTMLDivElement>}
                className={`${styles.aboutTextContent} ${aboutTextVisible ? styles.animateFadeInUp : ''}`}
              >
                <h2 className={styles.aboutTextTitle}>
                  {t({ ru: 'Про компанию Estedilux\u00A0Med', en: 'About Estedilux\u00A0Med Company', tr: 'Estedilux\u00A0Med Şirketi Hakkında', uk: 'Про компанію Estedilux\u00A0Med' }, locale)}
                </h2>
                <p className={styles.aboutTextDescription}>
                  {t(
                    {
                      ru: 'Estedilux\u00A0Med — это международная образовательная платформа, которая объединяет обучение, стажировки, развитие врачей и организацию медицинских мероприятий под ключ. Мы не просто обучаем - мы открываем врачам двери в международное профессиональное пространство, где важны компетентность, глубина подготовки и безупречный уровень безопасности.',
                      en: 'Estedilux\u00A0Med is an international educational platform that combines training, internships, doctor development and turnkey medical event organization. We don\'t just teach - we open doors for doctors to the international professional space, where competence, depth of training and impeccable level of safety are important.',
                      tr: 'Estedilux\u00A0Med, eğitim, stajlar, doktor gelişimi ve anahtar teslim tıbbi etkinlik organizasyonunu birleştiren uluslararası bir eğitim platformudur. Sadece öğretmiyoruz - doktorlara yetkinlik, eğitim derinliği ve kusursuz güvenlik seviyesinin önemli olduğu uluslararası profesyonel alana kapılar açıyoruz.',
                      uk: 'Estedilux\u00A0Med — це міжнародна освітня платформа, яка об\'єднує навчання, стажування, розвиток лікарів та організацію медичних заходів під ключ. Ми не просто навчаємо - ми відкриваємо лікарям двері в міжнародний професійний простір, де важливі компетентність, глибина підготовки та бездоганний рівень безпеки.',
                    },
                    locale
                  )}
                </p>
              </div>
            </div>
          </section>

          {/* Graduates Carousel Section */}
          <section 
            ref={graduatesRef as React.RefObject<HTMLElement>}
            className={`${styles.graduatesSection} ${graduatesVisible ? styles.animateFadeInUp : ''}`}
          >
            <div className={styles.container}>
              <h2 className={styles.graduatesTitle}>
                {t({ ru: 'Выпускники Estedilux\u00A0Med', en: 'Estedilux\u00A0Med Graduates', tr: 'Estedilux\u00A0Med Mezunları', uk: 'Випускники Estedilux\u00A0Med' }, locale)}
              </h2>
              <div className={styles.carouselWrapper}>
                <button className={styles.carouselButton} onClick={prevSlide} aria-label="Previous slide">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                <div className={styles.carouselContainer}>
                  <div 
                    className={styles.carouselTrack}
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {studentImages.map((src, index) => (
                      <div key={index} className={styles.carouselSlide}>
                        <div className={styles.carouselImageWrapper}>
                          {!loadedImages.has(index) && (
                            <div className={styles.loadingPlaceholder}>
                              <div className={styles.loadingSpinner}></div>
                            </div>
                          )}
                          <Image
                            src={src}
                            alt={`Graduate ${index + 1}`}
                            fill
                            className={`${styles.carouselImage} ${loadedImages.has(index) ? styles.loaded : styles.loading}`}
                            quality={90}
                            onLoad={() => handleImageLoad(index)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <button className={styles.carouselButton} onClick={nextSlide} aria-label="Next slide">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
              <div className={styles.carouselIndicators}>
                {studentImages.map((_, index) => (
                  <button
                    key={index}
                    className={`${styles.indicator} ${currentSlide === index ? styles.active : ''}`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </section>


          {/* Partners Section */}
          <section className={styles.aboutTextSection}>
            <div className={styles.container}>
              <h2 className={styles.partnersTitle}>
                {t({ ru: 'Наши партнеры', en: 'Our Partners', tr: 'Ortaklarımız', uk: 'Наші партнери' }, locale)}
              </h2>
              <div className={styles.partnersGrid}>
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className={styles.partnerCard}>
                    <div className={styles.partnerImageWrapper}>
                      <Image
                        src={`/about/partner${num}.jpg`}
                        alt={`Partner ${num}`}
                        fill
                        className={styles.partnerImage}
                        quality={90}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>


          <section className={styles.aboutTextSection}>
            <div className={styles.aboutTextContainer}>
              <div className={styles.aboutTextContent}>
                <h2 className={styles.aboutTextTitle}>
                  {t({ ru: 'Что мы предлагаем', en: 'What We Offer', tr: 'Ne Sunuyoruz', uk: 'Що ми пропонуємо' }, locale)}
                </h2>
                <p className={styles.aboutTextDescription}>
                  {t(
                    {
                      ru: 'Estedilux\u00A0Med предлагает широкий спектр международных образовательных программ, стажировок и медицинских мероприятий, которые соответствуют высочайшим стандартам качества. Мы открываем врачам доступ к лучшим международным практикам и способствуем их профессиональному росту.',
                      en: 'Estedilux\u00A0Med offers a wide range of international educational programs, internships and medical events that meet the highest quality standards. We open doors for doctors to the best international practices and help them grow professionally.',
                      tr: 'Estedilux\u00A0Med, en yüksek kalite standartlarına uygun geniş bir uluslararası eğitim programları, stajlar ve tıbbi etkinlikler yelpazesi sunar. Doktorlara en iyi uluslararası uygulamalara erişim sağlıyor ve profesyonel olarak büyümelerine yardımcı oluyoruz.',
                      uk: 'Estedilux\u00A0Med пропонує широкий спектр міжнародних освітніх програм, стажувань та медичних заходів, які відповідають найвищим стандартам якості. Ми відкриваємо лікарям доступ до найкращих міжнародних практик та сприяємо їхньому професійному зростанню.',
                    },
                    locale
                  )}
                </p>
              </div>
            </div>
          </section>
          {/* Services Section */}
          <div className={styles.content}>
            <div className={styles.container}>
              <section className={styles.section}>
                <div className={styles.servicesList}>
                  {/* Service 1 */}
                  <div className={`${styles.serviceSection} ${styles.firstService}`}>
                    <div className={styles.serviceContent}>
                      <div>
                        <span className={styles.serviceBadge}>
                          {t({ ru: 'Услуга', en: 'Service', tr: 'Hizmet', uk: 'Послуга' }, locale)}
                        </span>
                        <h3 className={styles.serviceTitle}>
                          {t({ ru: 'Международное обучение для врачей', en: 'International Training for Doctors', tr: 'Doktorlar için Uluslararası Eğitim', uk: 'Міжнародне навчання для лікарів' }, locale)}
                        </h3>
                      </div>
                      <p className={styles.serviceDescription}>
                        {t(
                          {
                            ru: 'Мы проводим профессиональные программы и стажировки в трёх ключевых медицинских центрах мира. Наши программы разработаны с учётом международных стандартов и обеспечивают врачам доступ к передовым методикам и практикам.',
                            en: 'We conduct professional programs and internships in three key medical centers of the world. Our programs are designed with international standards in mind and provide doctors with access to advanced methods and practices.',
                            tr: 'Dünyanın üç önemli tıp merkezinde profesyonel programlar ve stajlar yürütüyoruz. Programlarımız uluslararası standartlar göz önünde bulundurularak tasarlanmıştır ve doktorlara ileri metodlar ve uygulamalara erişim sağlar.',
                            uk: 'Ми проводимо професійні програми та стажування в трьох ключових медичних центрах світу. Наші програми розроблені з урахуванням міжнародних стандартів та забезпечують лікарям доступ до передових методик та практик.',
                          },
                          locale
                        )}
                      </p>
                      <div className={styles.locations}>
                        <span className={styles.locationTag}>
                          🇹🇷 {t({ ru: 'Турция (Стамбул)', en: 'Turkey (Istanbul)', tr: 'Türkiye (İstanbul)', uk: 'Туреччина (Стамбул)' }, locale)}
                        </span>
                        <span className={styles.locationTag}>
                          🇦🇪 {t({ ru: 'ОАЭ (Дубай)', en: 'UAE (Dubai)', tr: 'BAE (Dubai)', uk: 'ОАЕ (Дубай)' }, locale)}
                        </span>
                        <span className={styles.locationTag}>
                          🇬🇪 {t({ ru: 'Грузия (Тбилиси, Батуми)', en: 'Georgia (Tbilisi, Batumi)', tr: 'Gürcistan (Tiflis, Batum)', uk: 'Грузія (Тбілісі, Батумі)' }, locale)}
                        </span>
                      </div>
                    </div>
                    <div className={styles.serviceImageWrapper}>
                      <Image
                        src="/about_team_main.jpg"
                        alt={t({ ru: 'Международное обучение для врачей', en: 'International Training for Doctors', tr: 'Doktorlar için Uluslararası Eğitim', uk: 'Міжнародне навчання для лікарів' }, locale)}
                        fill
                        className={styles.serviceImage}
                        quality={90}
                      />
                    </div>
                  </div>

                  {/* Service 2 */}
                  <div className={styles.serviceSection}>
                    <div className={styles.serviceContent}>
                      <div className={styles.serviceIconWrapper}>
                        <img
                          src="/about/Qualification.svg"
                          alt={t({ ru: 'Повышение квалификации врачей', en: 'Doctor Qualification Enhancement', tr: 'Doktor Nitelik Geliştirme', uk: 'Підвищення кваліфікації лікарів' }, locale)}
                          className={styles.serviceIcon}
                        />
                      </div>
                      <div>
                        <span className={styles.serviceBadge}>
                          {t({ ru: 'Услуга', en: 'Service', tr: 'Hizmet', uk: 'Послуга' }, locale)}
                        </span>
                        <h3 className={styles.serviceTitle}>
                          {t({ ru: 'Повышение квалификации врачей', en: 'Doctor Qualification Enhancement', tr: 'Doktor Nitelik Geliştirme', uk: 'Підвищення кваліфікації лікарів' }, locale)}
                        </h3>
                      </div>
                      <p className={styles.serviceDescription}>
                        {t(
                          {
                            ru: 'Актуальные программы на сегодня по различным медицинским специальностям. Наши курсы основаны на клинической практике и соответствуют международным протоколам.',
                            en: 'Current programs today in various medical specialties. Our courses are based on clinical practice and comply with international protocols.',
                            tr: 'Çeşitli tıp uzmanlık alanlarında güncel programlar. Kurslarımız klinik uygulamaya dayanmaktadır ve uluslararası protokollere uygundur.',
                            uk: 'Актуальні програми на сьогодні з різних медичних спеціальностей. Наші курси засновані на клінічній практиці та відповідають міжнародним протоколам.',
                          },
                          locale
                        )}
                      </p>
                      <div className={styles.specialties}>
                        <span className={styles.specialtyTag}>
                          {t({ ru: 'Инъекционная косметология', en: 'Injectable Cosmetology', tr: 'Enjeksiyonlu Kozmetoloji', uk: 'Ін\'єкційна косметологія' }, locale)}
                        </span>
                        <span className={styles.specialtyTag}>
                          {t({ ru: 'Хирургия', en: 'Surgery', tr: 'Cerrahi', uk: 'Хірургія' }, locale)}
                        </span>
                        <span className={styles.specialtyTag}>
                          {t({ ru: 'Гинекология', en: 'Gynecology', tr: 'Jinekoloji', uk: 'Гінекологія' }, locale)}
                        </span>
                        <span className={styles.specialtyTag}>
                          {t({ ru: 'Стоматология', en: 'Dentistry', tr: 'Diş Hekimliği', uk: 'Стоматологія' }, locale)}
                        </span>
                        <span className={styles.specialtyTag}>
                          {t({ ru: 'Имплантология', en: 'Implantology', tr: 'İmplantoloji', uk: 'Імплантологія' }, locale)}
                        </span>
                        <span className={styles.specialtyTag}>
                          {t({ ru: 'Анатомия и безопасные техники', en: 'Anatomy and Safe Techniques', tr: 'Anatomi ve Güvenli Teknikler', uk: 'Анатомія та безпечні техніки' }, locale)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Service 3 */}
                  <div className={styles.serviceSection}>
                    <div className={styles.serviceContent}>
                      <div className={styles.serviceIconWrapper}>
                        <img
                          src="/about/Cadaver.svg"
                          alt={t({ ru: 'Cadaver курсы', en: 'Cadaver Courses', tr: 'Kadavra Kursları', uk: 'Cadaver курси' }, locale)}
                          className={styles.serviceIcon}
                        />
                      </div>
                      <div>
                        <span className={styles.serviceBadge}>
                          {t({ ru: 'Услуга', en: 'Service', tr: 'Hizmet', uk: 'Послуга' }, locale)}
                        </span>
                        <h3 className={styles.serviceTitle}>
                          {t({ ru: 'Cadaver курсы', en: 'Cadaver Courses', tr: 'Kadavra Kursları', uk: 'Cadaver курси' }, locale)}
                        </h3>
                      </div>
                      <p className={styles.serviceDescription}>
                        {t(
                          {
                            ru: 'Мы организуем и проводим профессиональные программы по анатомии и практическим навыкам. Все курсы проходят в университетах и лабораториях, оснащённых по мировым стандартам.',
                            en: 'We organize and conduct professional programs in anatomy and practical skills. All courses are held in universities and laboratories equipped to world standards.',
                            tr: 'Anatomi ve pratik beceriler konusunda profesyonel programlar düzenliyor ve yürütüyoruz. Tüm kurslar dünya standartlarına göre donatılmış üniversitelerde ve laboratuvarlarda yapılmaktadır.',
                            uk: 'Ми організовуємо та проводимо професійні програми з анатомії та практичних навичок. Всі курси проходять в університетах та лабораторіях, оснащених за світовими стандартами.',
                          },
                          locale
                        )}
                      </p>
                      <ul className={styles.serviceList}>
                        <li className={styles.serviceListItem}>
                          {t({ ru: 'индивидуальные и групповые кадевер курсы', en: 'individual and group cadaver courses', tr: 'bireysel ve grup kadavra kursları', uk: 'індивідуальні та групові кадевер курси' }, locale)}
                        </li>
                        <li className={styles.serviceListItem}>
                          {t({ ru: 'практические диссекционные программы', en: 'practical dissection programs', tr: 'pratik diseksiyon programları', uk: 'практичні диссекційні програми' }, locale)}
                        </li>
                        <li className={styles.serviceListItem}>
                          {t({ ru: 'обучение по анатомии и инъекциям на кадаверах', en: 'training in anatomy and injections on cadavers', tr: 'kadavralarda anatomi ve enjeksiyon eğitimi', uk: 'навчання з анатомії та ін\'єкцій на кадаверах' }, locale)}
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Service 4 */}
                  <div className={styles.serviceSection}>
                    <div className={styles.serviceContent}>
                      <div className={styles.serviceIconWrapper}>
                        <img
                          src="/about/Cadaver_Organization.svg"
                          alt={t({ ru: 'Организация кадавер курсов под ключ', en: 'Turnkey Cadaver Course Organization', tr: 'Anahtar Teslim Kadavra Kursu Organizasyonu', uk: 'Організація кадавер курсів під ключ' }, locale)}
                          className={styles.serviceIcon}
                        />
                      </div>
                      <div>
                        <span className={styles.serviceBadge}>
                          {t({ ru: 'Услуга', en: 'Service', tr: 'Hizmet', uk: 'Послуга' }, locale)}
                        </span>
                        <h3 className={styles.serviceTitle}>
                          {t({ ru: 'Организация кадавер курсов под ключ', en: 'Turnkey Cadaver Course Organization', tr: 'Anahtar Teslim Kadavra Kursu Organizasyonu', uk: 'Організація кадавер курсів під ключ' }, locale)}
                        </h3>
                      </div>
                      <p className={styles.serviceDescription}>
                        {t(
                          {
                            ru: 'Мы берём на себя полностью весь процесс организации. Врач получает готовое мероприятие без организационных сложностей.',
                            en: 'We take on the entire organization process. The doctor receives a ready-made event without organizational difficulties.',
                            tr: 'Tüm organizasyon sürecini üstleniyoruz. Doktor, organizasyonel zorluklar olmadan hazır bir etkinlik alır.',
                            uk: 'Ми беремо на себе повністю весь процес організації. Лікар отримує готову подію без організаційних складнощів.',
                          },
                          locale
                        )}
                      </p>
                      <ul className={styles.serviceList}>
                        <li className={styles.serviceListItem}>
                          {t({ ru: 'переговоры с университетами', en: 'negotiations with universities', tr: 'üniversitelerle müzakereler', uk: 'переговори з університетами' }, locale)}
                        </li>
                        <li className={styles.serviceListItem}>
                          {t({ ru: 'аренда лабораторий', en: 'laboratory rental', tr: 'laboratuvar kiralama', uk: 'оренда лабораторій' }, locale)}
                        </li>
                        <li className={styles.serviceListItem}>
                          {t({ ru: 'преподаватели', en: 'instructors', tr: 'eğitmenler', uk: 'викладачі' }, locale)}
                        </li>
                        <li className={styles.serviceListItem}>
                          {t({ ru: 'расходные материалы', en: 'supplies', tr: 'sarf malzemeleri', uk: 'витратні матеріали' }, locale)}
                        </li>
                        <li className={styles.serviceListItem}>
                          {t({ ru: 'программа', en: 'program', tr: 'program', uk: 'програма' }, locale)}
                        </li>
                        <li className={styles.serviceListItem}>
                          {t({ ru: 'логистика и сопровождение', en: 'logistics and support', tr: 'lojistik ve destek', uk: 'логістика та супровід' }, locale)}
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Service 5 */}
                  <div className={styles.serviceSection}>
                    <div className={styles.serviceContent}>
                      <div className={styles.serviceIconWrapper}>
                        <img
                          src="/about/Medical_Organization.svg"
                          alt={t({ ru: 'Организация медицинских мероприятий под ключ', en: 'Turnkey Medical Event Organization', tr: 'Anahtar Teslim Tıbbi Etkinlik Organizasyonu', uk: 'Організація медичних заходів під ключ' }, locale)}
                          className={styles.serviceIcon}
                        />
                      </div>
                      <div>
                        <span className={styles.serviceBadge}>
                          {t({ ru: 'Услуга', en: 'Service', tr: 'Hizmet', uk: 'Послуга' }, locale)}
                        </span>
                        <h3 className={styles.serviceTitle}>
                          {t({ ru: 'Организация медицинских мероприятий под ключ', en: 'Turnkey Medical Event Organization', tr: 'Anahtar Teslim Tıbbi Etkinlik Organizasyonu', uk: 'Організація медичних заходів під ключ' }, locale)}
                        </h3>
                      </div>
                      <p className={styles.serviceDescription}>
                        {t(
                          {
                            ru: 'Мы создаём профессиональные медицинские мероприятия с полной организацией и сопровождением. От идеи до реализации - всё под нашим контролем.',
                            en: 'We create professional medical events with full organization and support. From idea to implementation - everything under our control.',
                            tr: 'Tam organizasyon ve destekle profesyonel tıbbi etkinlikler oluşturuyoruz. Fikirden uygulamaya - her şey bizim kontrolümüz altında.',
                            uk: 'Ми створюємо професійні медичні заходи з повною організацією та супроводом. Від ідеї до реалізації - все під нашим контролем.',
                          },
                          locale
                        )}
                      </p>
                      <ul className={styles.serviceList}>
                        <li className={styles.serviceListItem}>
                          {t({ ru: 'профессиональные конгрессы', en: 'professional congresses', tr: 'profesyonel kongreler', uk: 'професійні конгреси' }, locale)}
                        </li>
                        <li className={styles.serviceListItem}>
                          {t({ ru: 'мастер-классы', en: 'master classes', tr: 'usta sınıfları', uk: 'майстер-класи' }, locale)}
                        </li>
                        <li className={styles.serviceListItem}>
                          {t({ ru: 'воркшопы', en: 'workshops', tr: 'atölyeler', uk: 'воркшопи' }, locale)}
                        </li>
                        <li className={styles.serviceListItem}>
                          {t({ ru: 'узконаправленные медицинские события', en: 'specialized medical events', tr: 'uzmanlaşmış tıbbi etkinlikler', uk: 'вузьконаправлені медичні події' }, locale)}
                        </li>
                        <li className={styles.serviceListItem}>
                          {t({ ru: 'авторские закрытые обучающие проекты', en: 'custom closed educational projects', tr: 'özel kapalı eğitim projeleri', uk: 'авторські закриті навчальні проекти' }, locale)}
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Service 6 */}
                  <div className={styles.serviceSection}>
                    <div className={styles.serviceContent}>
                      <div className={styles.serviceIconWrapper}>
                        <img
                          src="/about/Clinical_Internships.svg"
                          alt={t({ ru: 'Стажировки в клиниках', en: 'Clinical Internships', tr: 'Klinik Stajları', uk: 'Стажування в клініках' }, locale)}
                          className={styles.serviceIcon}
                        />
                      </div>
                      <div>
                        <span className={styles.serviceBadge}>
                          {t({ ru: 'Услуга', en: 'Service', tr: 'Hizmet', uk: 'Послуга' }, locale)}
                        </span>
                        <h3 className={styles.serviceTitle}>
                          {t({ ru: 'Стажировки в клиниках', en: 'Clinical Internships', tr: 'Klinik Stajları', uk: 'Стажування в клініках' }, locale)}
                        </h3>
                      </div>
                      <p className={styles.serviceDescription}>
                        {t(
                          {
                            ru: 'Официальные стажировки в ведущих клиниках мира. Программы адаптированы под потребности конкретного врача или группы, обеспечивая максимальную практическую пользу.',
                            en: 'Official internships in leading clinics worldwide. Programs are adapted to the needs of a specific doctor or group, ensuring maximum practical benefit.',
                            tr: 'Dünyanın önde gelen kliniklerinde resmi stajlar. Programlar, belirli bir doktorun veya grubun ihtiyaçlarına göre uyarlanmıştır ve maksimum pratik fayda sağlar.',
                            uk: 'Офіційні стажування в провідних клініках світу. Програми адаптовані під потреби конкретного лікаря або групи, забезпечуючи максимальну практичну користь.',
                          },
                          locale
                        )}
                      </p>
                      <div className={styles.locations}>
                        <span className={styles.locationTag}>
                          {t({ ru: 'Дубай', en: 'Dubai', tr: 'Dubai', uk: 'Дубай' }, locale)}
                        </span>
                        <span className={styles.locationTag}>
                          {t({ ru: 'Стамбул', en: 'Istanbul', tr: 'İstanbul', uk: 'Стамбул' }, locale)}
                        </span>
                        <span className={styles.locationTag}>
                          {t({ ru: 'Грузия', en: 'Georgia', tr: 'Gürcistan', uk: 'Грузія' }, locale)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Service 7 */}
                  <div className={styles.serviceSection}>
                    <div className={styles.serviceContent}>
                      <div className={styles.serviceIconWrapper}>
                        <img
                          src="/about/University_Internships.svg"
                          alt={t({ ru: 'Стажировки в университетах', en: 'University Internships', tr: 'Üniversite Stajları', uk: 'Стажування в університетах' }, locale)}
                          className={styles.serviceIcon}
                        />
                      </div>
                      <div>
                        <span className={styles.serviceBadge}>
                          {t({ ru: 'Услуга', en: 'Service', tr: 'Hizmet', uk: 'Послуга' }, locale)}
                        </span>
                        <h3 className={styles.serviceTitle}>
                          {t({ ru: 'Стажировки в университетах', en: 'University Internships', tr: 'Üniversite Stajları', uk: 'Стажування в університетах' }, locale)}
                        </h3>
                      </div>
                      <p className={styles.serviceDescription}>
                        {t(
                          {
                            ru: 'Уникальный доступ к лучшим образовательным ресурсам ведущих университетов мира. Практический опыт в сочетании с теоретической подготовкой.',
                            en: 'Unique access to the best educational resources of leading universities worldwide. Practical experience combined with theoretical training.',
                            tr: 'Dünyanın önde gelen üniversitelerinin en iyi eğitim kaynaklarına benzersiz erişim. Teorik eğitimle birleştirilmiş pratik deneyim.',
                            uk: 'Унікальний доступ до найкращих освітніх ресурсів провідних університетів світу. Практичний досвід у поєднанні з теоретичною підготовкою.',
                          },
                          locale
                        )}
                      </p>
                      <ul className={styles.serviceList}>
                        <li className={styles.serviceListItem}>
                          {t({ ru: 'диссекционным лабораториям', en: 'dissection laboratories', tr: 'diseksiyon laboratuvarlarına', uk: 'дисекційним лабораторіям' }, locale)}
                        </li>
                        <li className={styles.serviceListItem}>
                          {t({ ru: 'кафедрам хирургии и анатомии', en: 'surgery and anatomy departments', tr: 'cerrahi ve anatomi bölümlerine', uk: 'кафедрам хірургії та анатомії' }, locale)}
                        </li>
                        <li className={styles.serviceListItem}>
                          {t({ ru: 'наблюдению за операциями', en: 'observation of operations', tr: 'operasyonları gözlemlemeye', uk: 'спостереженню за операціями' }, locale)}
                        </li>
                        <li className={styles.serviceListItem}>
                          {t({ ru: 'теоретическим и практическим модулям', en: 'theoretical and practical modules', tr: 'teorik ve pratik modüllere', uk: 'теоретичним та практичним модулям' }, locale)}
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Service 8 */}
                  <div className={styles.serviceSection}>
                    <div className={styles.serviceContent}>
                      <div className={styles.serviceIconWrapper}>
                        <img
                          src="/about/Doctor_Relocation.svg"
                          alt={t({ ru: 'Реолокация врачей в Дубай', en: 'Doctor Relocation to Dubai', tr: 'Doktorların Dubai\'ye Taşınması', uk: 'Релокація лікарів у Дубай' }, locale)}
                          className={styles.serviceIcon}
                        />
                      </div>
                      <div>
                        <span className={styles.serviceBadge}>
                          {t({ ru: 'Услуга', en: 'Service', tr: 'Hizmet', uk: 'Послуга' }, locale)}
                        </span>
                        <h3 className={styles.serviceTitle}>
                          {t({ ru: 'Реолокация врачей в Дубай', en: 'Doctor Relocation to Dubai', tr: 'Doktorların Dubai\'ye Taşınması', uk: 'Релокація лікарів у Дубай' }, locale)}
                        </h3>
                      </div>
                      <p className={styles.serviceDescription}>
                        {t(
                          {
                            ru: 'Комплексное сопровождение врачей в процессе релокации в ОАЭ. От консультаций до трудоустройства - мы обеспечиваем полную поддержку на каждом этапе.',
                            en: 'Comprehensive support for doctors in the relocation process to the UAE. From consultations to employment - we provide full support at every stage.',
                            tr: 'BAE\'ye taşınma sürecinde doktorlara kapsamlı destek. Danışmanlıktan istihdama kadar - her aşamada tam destek sağlıyoruz.',
                            uk: 'Комплексний супровід лікарів у процесі релокації в ОАЕ. Від консультацій до працевлаштування - ми забезпечуємо повну підтримку на кожному етапі.',
                          },
                          locale
                        )}
                      </p>
                      <ul className={styles.serviceList}>
                        <li className={styles.serviceListItem}>
                          {t({ ru: 'консультации по требованиям рынка ОАЭ', en: 'consultations on UAE market requirements', tr: 'BAE pazar gereksinimleri hakkında danışmanlık', uk: 'консультації з вимог ринку ОАЕ' }, locale)}
                        </li>
                        <li className={styles.serviceListItem}>
                          {t({ ru: 'подбор клиник и работодателей', en: 'clinic and employer selection', tr: 'klinik ve işveren seçimi', uk: 'підбір клінік та роботодавців' }, locale)}
                        </li>
                        <li className={styles.serviceListItem}>
                          {t({ ru: 'подготовка к экзаменам', en: 'exam preparation', tr: 'sınav hazırlığı', uk: 'підготовка до іспитів' }, locale)}
                        </li>
                        <li className={styles.serviceListItem}>
                          {t({ ru: 'анализ документов', en: 'document analysis', tr: 'belge analizi', uk: 'аналіз документів' }, locale)}
                        </li>
                        <li className={styles.serviceListItem}>
                          {t({ ru: 'сопровождение до момента трудоустройства', en: 'support until employment', tr: 'istihdama kadar destek', uk: 'супровід до моменту працевлаштування' }, locale)}
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Service 9 */}
                  <div className={styles.serviceSection}>
                    <div className={styles.serviceContent}>
                      <div className={styles.serviceIconWrapper}>
                        <img
                          src="/about/Relocation_Document.svg"
                          alt={t({ ru: 'Помощь с документами для релокации', en: 'Relocation Document Assistance', tr: 'Taşınma Belge Desteği', uk: 'Допомога з документами для релокації' }, locale)}
                          className={styles.serviceIcon}
                        />
                      </div>
                      <div>
                        <span className={styles.serviceBadge}>
                          {t({ ru: 'Услуга', en: 'Service', tr: 'Hizmet', uk: 'Послуга' }, locale)}
                        </span>
                        <h3 className={styles.serviceTitle}>
                          {t({ ru: 'Помощь с документами для релокации', en: 'Relocation Document Assistance', tr: 'Taşınma Belge Desteği', uk: 'Допомога з документами для релокації' }, locale)}
                        </h3>
                      </div>
                      <p className={styles.serviceDescription}>
                        {t(
                          {
                            ru: 'Профессиональная подготовка и сопровождение всех необходимых документов для успешной релокации. Мы знаем все требования и поможем пройти процесс максимально быстро и эффективно.',
                            en: 'Professional preparation and support of all necessary documents for successful relocation. We know all the requirements and will help you go through the process as quickly and efficiently as possible.',
                            tr: 'Başarılı bir taşınma için gerekli tüm belgelerin profesyonel hazırlanması ve desteği. Tüm gereksinimleri biliyoruz ve süreci mümkün olduğunca hızlı ve verimli bir şekilde geçmenize yardımcı olacağız.',
                            uk: 'Професійна підготовка та супровід усіх необхідних документів для успішної релокації. Ми знаємо всі вимоги та допоможемо пройти процес максимально швидко та ефективно.',
                          },
                          locale
                        )}
                      </p>
                      <ul className={styles.serviceList}>
                        <li className={styles.serviceListItem}>
                          {t({ ru: 'нострификация', en: 'nostrification', tr: 'nostrifikasyon', uk: 'нострифікація' }, locale)}
                        </li>
                        <li className={styles.serviceListItem}>
                          {t({ ru: 'экзамены', en: 'examinations', tr: 'sınavlar', uk: 'іспити' }, locale)}
                        </li>
                        <li className={styles.serviceListItem}>
                          {t({ ru: 'лицензирование', en: 'licensing', tr: 'lisanslama', uk: 'ліцензування' }, locale)}
                        </li>
                        <li className={styles.serviceListItem}>
                          {t({ ru: 'медицинские документы', en: 'medical documents', tr: 'tıbbi belgeler', uk: 'медичні документи' }, locale)}
                        </li>
                        <li className={styles.serviceListItem}>
                          {t({ ru: 'административные формы', en: 'administrative forms', tr: 'idari formlar', uk: 'адміністративні форми' }, locale)}
                        </li>
                        <li className={styles.serviceListItem}>
                          {t({ ru: 'личные документы врача для MOH/DOH/DHA', en: 'doctor personal documents for MOH/DOH/DHA', tr: 'MOH/DOH/DHA için doktor kişisel belgeleri', uk: 'особисті документи лікаря для MOH/DOH/DHA' }, locale)}
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Service 10 */}
                  <div className={styles.serviceSection}>
                    <div className={styles.serviceContent}>
                      <div className={styles.serviceIconWrapper}>
                        <img
                          src="/about/Custom_Courses.svg"
                          alt={t({ ru: 'Создание авторских курсов, программ и методик', en: 'Creating Custom Courses, Programs and Methodologies', tr: 'Özel Kurslar, Programlar ve Metodolojiler Oluşturma', uk: 'Створення авторських курсів, програм та методик' }, locale)}
                          className={styles.serviceIcon}
                        />
                      </div>
                      <div>
                        <span className={styles.serviceBadge}>
                          {t({ ru: 'Услуга', en: 'Service', tr: 'Hizmet', uk: 'Послуга' }, locale)}
                        </span>
                        <h3 className={styles.serviceTitle}>
                          {t({ ru: 'Создание авторских курсов, программ и методик', en: 'Creating Custom Courses, Programs and Methodologies', tr: 'Özel Kurslar, Programlar ve Metodolojiler Oluşturma', uk: 'Створення авторських курсів, програм та методик' }, locale)}
                        </h3>
                      </div>
                      <p className={styles.serviceDescription}>
                        {t(
                          {
                            ru: 'Для врачей, клиник, школ и образовательных проектов мы разрабатываем уникальные обучающие продукты с индивидуальным подходом к каждому клиенту.',
                            en: 'For doctors, clinics, schools and educational projects, we develop unique educational products with an individual approach to each client.',
                            tr: 'Doktorlar, klinikler, okullar ve eğitim projeleri için her müşteriye bireysel yaklaşımla benzersiz eğitim ürünleri geliştiriyoruz.',
                            uk: 'Для лікарів, клінік, шкіл та освітніх проектів ми розробляємо унікальні навчальні продукти з індивідуальним підходом до кожного клієнта.',
                          },
                          locale
                        )}
                      </p>
                      <ul className={styles.serviceList}>
                        <li className={styles.serviceListItem}>
                          {t({ ru: 'Разрабатываем уникальные обучающие продукты', en: 'We develop unique educational products', tr: 'Benzersiz eğitim ürünleri geliştiriyoruz', uk: 'Розробляємо унікальні навчальні продукти' }, locale)}
                        </li>
                        <li className={styles.serviceListItem}>
                          {t({ ru: 'Создаём методологию', en: 'We create methodology', tr: 'Metodoloji oluşturuyoruz', uk: 'Створюємо методологію' }, locale)}
                        </li>
                        <li className={styles.serviceListItem}>
                          {t({ ru: 'Строим структуру курса', en: 'We build course structure', tr: 'Kurs yapısı oluşturuyoruz', uk: 'Будуємо структуру курсу' }, locale)}
                        </li>
                        <li className={styles.serviceListItem}>
                          {t({ ru: 'Подготавливаем программу под ключ', en: 'We prepare turnkey programs', tr: 'Anahtar teslim programlar hazırlıyoruz', uk: 'Підготовлюємо програму під ключ' }, locale)}
                        </li>
                        <li className={styles.serviceListItem}>
                          {t({ ru: 'Помогаем с внедрением и реализацией', en: 'We help with implementation and execution', tr: 'Uygulama ve yürütmede yardımcı oluyoruz', uk: 'Допомагаємо з впровадженням та реалізацією' }, locale)}
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Service 11 */}
                  <div className={styles.serviceSection}>
                    <div className={styles.serviceContent}>
                      <div className={styles.serviceIconWrapper}>
                        <img
                          src="/about/Individual.svg"
                          alt={t({ ru: 'Индивидуальные образовательные программы под ключ', en: 'Turnkey Individual Educational Programs', tr: 'Anahtar Teslim Bireysel Eğitim Programları', uk: 'Індивідуальні освітні програми під ключ' }, locale)}
                          className={styles.serviceIcon}
                        />
                      </div>
                      <div>
                        <span className={styles.serviceBadge}>
                          {t({ ru: 'Услуга', en: 'Service', tr: 'Hizmet', uk: 'Послуга' }, locale)}
                        </span>
                        <h3 className={styles.serviceTitle}>
                          {t({ ru: 'Индивидуальные образовательные программы под ключ', en: 'Turnkey Individual Educational Programs', tr: 'Anahtar Teslim Bireysel Eğitim Programları', uk: 'Індивідуальні освітні програми під ключ' }, locale)}
                        </h3>
                      </div>
                      <p className={styles.serviceDescription}>
                        {t(
                          {
                            ru: 'Персонализированные программы обучения, разработанные специально под цели и потребности конкретного врача. Индивидуальный подход на каждом этапе.',
                            en: 'Personalized training programs designed specifically for the goals and needs of a particular doctor. Individual approach at every stage.',
                            tr: 'Belirli bir doktorun hedefleri ve ihtiyaçları için özel olarak tasarlanmış kişiselleştirilmiş eğitim programları. Her aşamada bireysel yaklaşım.',
                            uk: 'Персоналізовані програми навчання, розроблені спеціально під цілі та потреби конкретного лікаря. Індивідуальний підхід на кожному етапі.',
                          },
                          locale
                        )}
                      </p>
                      <ul className={styles.serviceList}>
                        <li className={styles.serviceListItem}>
                          {t({ ru: 'наставничество', en: 'mentoring', tr: 'mentörlük', uk: 'наставництво' }, locale)}
                        </li>
                        <li className={styles.serviceListItem}>
                          {t({ ru: 'индивидуальные стажировки', en: 'individual internships', tr: 'bireysel stajlar', uk: 'індивідуальні стажування' }, locale)}
                        </li>
                        <li className={styles.serviceListItem}>
                          {t({ ru: 'персональные диссекции', en: 'personal dissections', tr: 'kişisel diseksiyonlar', uk: 'персональні диссекції' }, locale)}
                        </li>
                        <li className={styles.serviceListItem}>
                          {t({ ru: 'обучение в формате 1:1', en: '1:1 training format', tr: '1:1 eğitim formatı', uk: 'навчання у форматі 1:1' }, locale)}
                        </li>
                        <li className={styles.serviceListItem}>
                          {t({ ru: 'маршруты развития под конкретную цель врача', en: 'development paths tailored to specific doctor goals', tr: 'belirli doktor hedeflerine göre uyarlanmış gelişim yolları', uk: 'маршрути розвитку під конкретну мету лікаря' }, locale)}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Video Gallery Section */}
              <section className={styles.videoGallerySection}>
                <div className={styles.container}>
                  <h2 className={styles.videoGalleryTitle}>
                    {t({ ru: 'Видеогалерея', en: 'Video Gallery', tr: 'Video Galerisi', uk: 'Відеогалерея' }, locale)}
                  </h2>
                  <div className={styles.videoCarouselWrapper}>
                    <button 
                      className={styles.videoCarouselButton} 
                      onClick={prevVideoSlide} 
                      aria-label="Previous video"
                      disabled={currentVideoSlide === 0}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                      </svg>
                    </button>
                    <div className={styles.videoCarouselContainer}>
                      <div 
                        className={styles.videoCarouselTrack}
                        style={{ 
                          '--slide-offset': `${currentVideoSlide}`,
                        } as React.CSSProperties}
                      >
                        {videoFiles.map((videoSrc, index) => (
                          <div key={index} className={styles.videoCarouselSlide}>
                            <div
                              className={styles.videoThumbnail}
                              onClick={() => openVideo(videoSrc)}
                            >
                              <div className={styles.videoThumbnailWrapper}>
                                {!loadedVideos.has(index) && (
                                  <div className={styles.loadingPlaceholder}>
                                    <div className={styles.loadingSpinner}></div>
                                  </div>
                                )}
                                <video
                                  src={videoSrc}
                                  className={`${styles.videoPreview} ${loadedVideos.has(index) ? styles.loaded : styles.loading}`}
                                  muted
                                  playsInline
                                  onLoadedData={() => handleVideoLoad(index)}
                                  onMouseEnter={(e) => {
                                    const video = e.currentTarget;
                                    if (loadedVideos.has(index)) {
                                      video.play();
                                    }
                                  }}
                                  onMouseLeave={(e) => {
                                    const video = e.currentTarget;
                                    video.pause();
                                    video.currentTime = 0;
                                  }}
                                />
                                {loadedVideos.has(index) && (
                                  <div className={styles.playButton}>
                                    <svg width="60" height="60" viewBox="0 0 24 24" fill="white">
                                      <path d="M8 5v14l11-7z" />
                                    </svg>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button 
                      className={styles.videoCarouselButton} 
                      onClick={nextVideoSlide} 
                      aria-label="Next video"
                      disabled={currentVideoSlide >= Math.max(0, videoFiles.length - videosPerView)}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>
                  </div>
                  {videoFiles.length > videosPerView && (
                    <div className={styles.videoCarouselIndicators}>
                      {Array.from({ length: Math.max(1, videoFiles.length - videosPerView + 1) }).map((_, index) => (
                        <button
                          key={index}
                          className={`${styles.videoIndicator} ${currentVideoSlide === index ? styles.active : ''}`}
                          onClick={() => goToVideoSlide(index)}
                          aria-label={`Go to video ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </section>

              {/* Video Modal */}
              {selectedVideo && (
                <div className={styles.videoModal} onClick={closeVideo}>
                  <div className={styles.videoModalContent} onClick={(e) => e.stopPropagation()}>
                    <button className={styles.videoModalClose} onClick={closeVideo} aria-label="Close video">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                    
                    {videoFiles.length > 1 && (
                      <button 
                        className={styles.videoModalNav} 
                        onClick={(e) => {
                          e.stopPropagation();
                          prevVideo();
                        }}
                        aria-label="Previous video"
                        style={{ left: '1rem' }}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                      </button>
                    )}

                    <div className={styles.videoModalMain}>
                      <div className={styles.videoModalPlayer}>
                        <video
                          key={selectedVideo}
                          src={selectedVideo}
                          className={styles.videoPlayer}
                          controls
                          autoPlay
                          playsInline
                        />
                      </div>
                    </div>

                    {videoFiles.length > 1 && (
                      <button 
                        className={styles.videoModalNav} 
                        onClick={(e) => {
                          e.stopPropagation();
                          nextVideo();
                        }}
                        aria-label="Next video"
                        style={{ right: '1rem' }}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </button>
                    )}

                    {videoFiles.length > 1 && (
                      <div className={styles.videoModalThumbnails}>
                        {videoFiles.map((videoSrc, index) => (
                          <button
                            key={index}
                            className={`${styles.videoModalThumbnail} ${currentVideoIndex === index ? styles.active : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentVideoIndex(index);
                              setSelectedVideo(videoSrc);
                            }}
                            aria-label={`Go to video ${index + 1}`}
                          >
                            <video
                              src={videoSrc}
                              muted
                              playsInline
                              className={styles.videoModalThumbnailVideo}
                            />
                            {currentVideoIndex === index && (
                              <div className={styles.videoModalThumbnailActive}></div>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default About;

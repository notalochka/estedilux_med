import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAnimation } from '@/lib/useAnimation';
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
          {locale === 'ru' ? 'О нас - Estedilux Med' : 'About Us - Estedilux Med'}
        </title>
        <meta
          name="description"
          content={
            locale === 'ru'
              ? 'Узнайте больше о Estedilux Med - международной образовательной платформе для врачей'
              : 'Learn more about Estedilux Med - international educational platform for doctors'
          }
        />
      </Head>

      <div className={styles.aboutPage}>
        <Header />
        <main className={styles.main}>
          {/* Hero Section за макетом */}
          <section className={styles.hero}>
            <div className={styles.heroBackground}>
              <Image
                src="/photo3.jpg"
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
                    {locale === 'ru' ? 'Про компанию' : 'About the Company'}
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
                  {locale === 'ru' ? 'Про компанию Estedilux Med' : 'About Estedilux Med Company'}
                </h2>
                <p className={styles.aboutTextDescription}>
                  {locale === 'ru'
                    ? 'Estedilux Med — это международная образовательная платформа, которая объединяет обучение, стажировки, развитие врачей и организацию медицинских мероприятий под ключ. Мы не просто обучаем - мы открываем врачам двери в международное профессиональное пространство, где важны компетентность, глубина подготовки и безупречный уровень безопасности.'
                    : 'Estedilux Med is an international educational platform that combines training, internships, doctor development and turnkey medical event organization. We don\'t just teach - we open doors for doctors to the international professional space, where competence, depth of training and impeccable level of safety are important.'}
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
                {locale === 'ru' ? 'Выпускники Estedilux Med' : 'Estedilux Med Graduates'}
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
                {locale === 'ru' ? 'Наши партнеры' : 'Our Partners'}
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
                  {locale === 'ru' ? 'Что мы предлагаем' : 'What We Offer'}
                </h2>
                <p className={styles.aboutTextDescription}>
                  {locale === 'ru'
                    ? 'Estedilux Med предлагает широкий спектр международных образовательных программ, стажировок и медицинских мероприятий, которые соответствуют высочайшим стандартам качества. Мы открываем врачам доступ к лучшим международным практикам и способствуем их профессиональному росту.'
                    : 'Estedilux Med offers a wide range of international educational programs, internships and medical events that meet the highest quality standards. We open doors for doctors to the best international practices and help them grow professionally.'}
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
                          {locale === 'ru' ? 'Услуга' : 'Service'}
                        </span>
                        <h3 className={styles.serviceTitle}>
                          {locale === 'ru' ? 'Международное обучение для врачей' : 'International Training for Doctors'}
                        </h3>
                      </div>
                      <p className={styles.serviceDescription}>
                        {locale === 'ru'
                          ? 'Мы проводим профессиональные программы и стажировки в трёх ключевых медицинских центрах мира. Наши программы разработаны с учётом международных стандартов и обеспечивают врачам доступ к передовым методикам и практикам.'
                          : 'We conduct professional programs and internships in three key medical centers of the world. Our programs are designed with international standards in mind and provide doctors with access to advanced methods and practices.'}
                      </p>
                      <div className={styles.locations}>
                        <span className={styles.locationTag}>
                          🇹🇷 {locale === 'ru' ? 'Турция (Стамбул)' : 'Turkey (Istanbul)'}
                        </span>
                        <span className={styles.locationTag}>
                          🇦🇪 {locale === 'ru' ? 'ОАЭ (Дубай)' : 'UAE (Dubai)'}
                        </span>
                        <span className={styles.locationTag}>
                          🇬🇪 {locale === 'ru' ? 'Грузия (Тбилиси, Батуми)' : 'Georgia (Tbilisi, Batumi)'}
                        </span>
                      </div>
                    </div>
                    <div className={styles.serviceImageWrapper}>
                      <Image
                        src="/photo1.jpg"
                        alt={locale === 'ru' ? 'Международное обучение для врачей' : 'International Training for Doctors'}
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
                          alt={locale === 'ru' ? 'Повышение квалификации врачей' : 'Doctor Qualification Enhancement'}
                          className={styles.serviceIcon}
                        />
                      </div>
                      <div>
                        <span className={styles.serviceBadge}>
                          {locale === 'ru' ? 'Услуга' : 'Service'}
                        </span>
                        <h3 className={styles.serviceTitle}>
                          {locale === 'ru' ? 'Повышение квалификации врачей' : 'Doctor Qualification Enhancement'}
                        </h3>
                      </div>
                      <p className={styles.serviceDescription}>
                        {locale === 'ru'
                          ? 'Актуальные программы на сегодня по различным медицинским специальностям. Наши курсы основаны на клинической практике и соответствуют международным протоколам.'
                          : 'Current programs today in various medical specialties. Our courses are based on clinical practice and comply with international protocols.'}
                      </p>
                      <div className={styles.specialties}>
                        <span className={styles.specialtyTag}>
                          {locale === 'ru' ? 'Инъекционная косметология' : 'Injectable Cosmetology'}
                        </span>
                        <span className={styles.specialtyTag}>
                          {locale === 'ru' ? 'Хирургия' : 'Surgery'}
                        </span>
                        <span className={styles.specialtyTag}>
                          {locale === 'ru' ? 'Гинекология' : 'Gynecology'}
                        </span>
                        <span className={styles.specialtyTag}>
                          {locale === 'ru' ? 'Стоматология' : 'Dentistry'}
                        </span>
                        <span className={styles.specialtyTag}>
                          {locale === 'ru' ? 'Имплантология' : 'Implantology'}
                        </span>
                        <span className={styles.specialtyTag}>
                          {locale === 'ru' ? 'Анатомия и безопасные техники' : 'Anatomy and Safe Techniques'}
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
                          alt={locale === 'ru' ? 'Cadaver курсы' : 'Cadaver Courses'}
                          className={styles.serviceIcon}
                        />
                      </div>
                      <div>
                        <span className={styles.serviceBadge}>
                          {locale === 'ru' ? 'Услуга' : 'Service'}
                        </span>
                        <h3 className={styles.serviceTitle}>
                          {locale === 'ru' ? 'Cadaver курсы' : 'Cadaver Courses'}
                        </h3>
                      </div>
                      <p className={styles.serviceDescription}>
                        {locale === 'ru'
                          ? 'Мы организуем и проводим профессиональные программы по анатомии и практическим навыкам. Все курсы проходят в университетах и лабораториях, оснащённых по мировым стандартам.'
                          : 'We organize and conduct professional programs in anatomy and practical skills. All courses are held in universities and laboratories equipped to world standards.'}
                      </p>
                      <ul className={styles.serviceList}>
                        <li className={styles.serviceListItem}>
                          {locale === 'ru' ? 'индивидуальные и групповые кадевер курсы' : 'individual and group cadaver courses'}
                        </li>
                        <li className={styles.serviceListItem}>
                          {locale === 'ru' ? 'практические диссекционные программы' : 'practical dissection programs'}
                        </li>
                        <li className={styles.serviceListItem}>
                          {locale === 'ru' ? 'обучение по анатомии и инъекциям на кадаверах' : 'training in anatomy and injections on cadavers'}
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
                          alt={locale === 'ru' ? 'Организация кадавер курсов под ключ' : 'Turnkey Cadaver Course Organization'}
                          className={styles.serviceIcon}
                        />
                      </div>
                      <div>
                        <span className={styles.serviceBadge}>
                          {locale === 'ru' ? 'Услуга' : 'Service'}
                        </span>
                        <h3 className={styles.serviceTitle}>
                          {locale === 'ru' ? 'Организация кадавер курсов под ключ' : 'Turnkey Cadaver Course Organization'}
                        </h3>
                      </div>
                      <p className={styles.serviceDescription}>
                        {locale === 'ru'
                          ? 'Мы берём на себя полностью весь процесс организации. Врач получает готовое мероприятие без организационных сложностей.'
                          : 'We take on the entire organization process. The doctor receives a ready-made event without organizational difficulties.'}
                      </p>
                      <ul className={styles.serviceList}>
                        <li className={styles.serviceListItem}>
                          {locale === 'ru' ? 'переговоры с университетами' : 'negotiations with universities'}
                        </li>
                        <li className={styles.serviceListItem}>
                          {locale === 'ru' ? 'аренда лабораторий' : 'laboratory rental'}
                        </li>
                        <li className={styles.serviceListItem}>
                          {locale === 'ru' ? 'преподаватели' : 'instructors'}
                        </li>
                        <li className={styles.serviceListItem}>
                          {locale === 'ru' ? 'расходные материалы' : 'supplies'}
                        </li>
                        <li className={styles.serviceListItem}>
                          {locale === 'ru' ? 'программа' : 'program'}
                        </li>
                        <li className={styles.serviceListItem}>
                          {locale === 'ru' ? 'логистика и сопровождение' : 'logistics and support'}
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
                          alt={locale === 'ru' ? 'Организация медицинских мероприятий под ключ' : 'Turnkey Medical Event Organization'}
                          className={styles.serviceIcon}
                        />
                      </div>
                      <div>
                        <span className={styles.serviceBadge}>
                          {locale === 'ru' ? 'Услуга' : 'Service'}
                        </span>
                        <h3 className={styles.serviceTitle}>
                          {locale === 'ru' ? 'Организация медицинских мероприятий под ключ' : 'Turnkey Medical Event Organization'}
                        </h3>
                      </div>
                      <p className={styles.serviceDescription}>
                        {locale === 'ru'
                          ? 'Мы создаём профессиональные медицинские мероприятия с полной организацией и сопровождением. От идеи до реализации - всё под нашим контролем.'
                          : 'We create professional medical events with full organization and support. From idea to implementation - everything under our control.'}
                      </p>
                      <ul className={styles.serviceList}>
                        <li className={styles.serviceListItem}>
                          {locale === 'ru' ? 'профессиональные конгрессы' : 'professional congresses'}
                        </li>
                        <li className={styles.serviceListItem}>
                          {locale === 'ru' ? 'мастер-классы' : 'master classes'}
                        </li>
                        <li className={styles.serviceListItem}>
                          {locale === 'ru' ? 'воркшопы' : 'workshops'}
                        </li>
                        <li className={styles.serviceListItem}>
                          {locale === 'ru' ? 'узконаправленные медицинские события' : 'specialized medical events'}
                        </li>
                        <li className={styles.serviceListItem}>
                          {locale === 'ru' ? 'авторские закрытые обучающие проекты' : 'custom closed educational projects'}
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
                          alt={locale === 'ru' ? 'Стажировки в клиниках' : 'Clinical Internships'}
                          className={styles.serviceIcon}
                        />
                      </div>
                      <div>
                        <span className={styles.serviceBadge}>
                          {locale === 'ru' ? 'Услуга' : 'Service'}
                        </span>
                        <h3 className={styles.serviceTitle}>
                          {locale === 'ru' ? 'Стажировки в клиниках' : 'Clinical Internships'}
                        </h3>
                      </div>
                      <p className={styles.serviceDescription}>
                        {locale === 'ru'
                          ? 'Официальные стажировки в ведущих клиниках мира. Программы адаптированы под потребности конкретного врача или группы, обеспечивая максимальную практическую пользу.'
                          : 'Official internships in leading clinics worldwide. Programs are adapted to the needs of a specific doctor or group, ensuring maximum practical benefit.'}
                      </p>
                      <div className={styles.locations}>
                        <span className={styles.locationTag}>
                          {locale === 'ru' ? 'Дубай' : 'Dubai'}
                        </span>
                        <span className={styles.locationTag}>
                          {locale === 'ru' ? 'Стамбул' : 'Istanbul'}
                        </span>
                        <span className={styles.locationTag}>
                          {locale === 'ru' ? 'Грузия' : 'Georgia'}
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
                          alt={locale === 'ru' ? 'Стажировки в университетах' : 'University Internships'}
                          className={styles.serviceIcon}
                        />
                      </div>
                      <div>
                        <span className={styles.serviceBadge}>
                          {locale === 'ru' ? 'Услуга' : 'Service'}
                        </span>
                        <h3 className={styles.serviceTitle}>
                          {locale === 'ru' ? 'Стажировки в университетах' : 'University Internships'}
                        </h3>
                      </div>
                      <p className={styles.serviceDescription}>
                        {locale === 'ru'
                          ? 'Уникальный доступ к лучшим образовательным ресурсам ведущих университетов мира. Практический опыт в сочетании с теоретической подготовкой.'
                          : 'Unique access to the best educational resources of leading universities worldwide. Practical experience combined with theoretical training.'}
                      </p>
                      <ul className={styles.serviceList}>
                        <li className={styles.serviceListItem}>
                          {locale === 'ru' ? 'диссекционным лабораториям' : 'dissection laboratories'}
                        </li>
                        <li className={styles.serviceListItem}>
                          {locale === 'ru' ? 'кафедрам хирургии и анатомии' : 'surgery and anatomy departments'}
                        </li>
                        <li className={styles.serviceListItem}>
                          {locale === 'ru' ? 'наблюдению за операциями' : 'observation of operations'}
                        </li>
                        <li className={styles.serviceListItem}>
                          {locale === 'ru' ? 'теоретическим и практическим модулям' : 'theoretical and practical modules'}
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
                          alt={locale === 'ru' ? 'Реолокация врачей в Дубай' : 'Doctor Relocation to Dubai'}
                          className={styles.serviceIcon}
                        />
                      </div>
                      <div>
                        <span className={styles.serviceBadge}>
                          {locale === 'ru' ? 'Услуга' : 'Service'}
                        </span>
                        <h3 className={styles.serviceTitle}>
                          {locale === 'ru' ? 'Реолокация врачей в Дубай' : 'Doctor Relocation to Dubai'}
                        </h3>
                      </div>
                      <p className={styles.serviceDescription}>
                        {locale === 'ru'
                          ? 'Комплексное сопровождение врачей в процессе релокации в ОАЭ. От консультаций до трудоустройства - мы обеспечиваем полную поддержку на каждом этапе.'
                          : 'Comprehensive support for doctors in the relocation process to the UAE. From consultations to employment - we provide full support at every stage.'}
                      </p>
                      <ul className={styles.serviceList}>
                        <li className={styles.serviceListItem}>
                          {locale === 'ru' ? 'консультации по требованиям рынка ОАЭ' : 'consultations on UAE market requirements'}
                        </li>
                        <li className={styles.serviceListItem}>
                          {locale === 'ru' ? 'подбор клиник и работодателей' : 'clinic and employer selection'}
                        </li>
                        <li className={styles.serviceListItem}>
                          {locale === 'ru' ? 'подготовка к экзаменам' : 'exam preparation'}
                        </li>
                        <li className={styles.serviceListItem}>
                          {locale === 'ru' ? 'анализ документов' : 'document analysis'}
                        </li>
                        <li className={styles.serviceListItem}>
                          {locale === 'ru' ? 'сопровождение до момента трудоустройства' : 'support until employment'}
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
                          alt={locale === 'ru' ? 'Помощь с документами для релокации' : 'Relocation Document Assistance'}
                          className={styles.serviceIcon}
                        />
                      </div>
                      <div>
                        <span className={styles.serviceBadge}>
                          {locale === 'ru' ? 'Услуга' : 'Service'}
                        </span>
                        <h3 className={styles.serviceTitle}>
                          {locale === 'ru' ? 'Помощь с документами для релокации' : 'Relocation Document Assistance'}
                        </h3>
                      </div>
                      <p className={styles.serviceDescription}>
                        {locale === 'ru'
                          ? 'Профессиональная подготовка и сопровождение всех необходимых документов для успешной релокации. Мы знаем все требования и поможем пройти процесс максимально быстро и эффективно.'
                          : 'Professional preparation and support of all necessary documents for successful relocation. We know all the requirements and will help you go through the process as quickly and efficiently as possible.'}
                      </p>
                      <ul className={styles.serviceList}>
                        <li className={styles.serviceListItem}>
                          {locale === 'ru' ? 'нострификация' : 'nostrification'}
                        </li>
                        <li className={styles.serviceListItem}>
                          {locale === 'ru' ? 'экзамены' : 'examinations'}
                        </li>
                        <li className={styles.serviceListItem}>
                          {locale === 'ru' ? 'лицензирование' : 'licensing'}
                        </li>
                        <li className={styles.serviceListItem}>
                          {locale === 'ru' ? 'медицинские документы' : 'medical documents'}
                        </li>
                        <li className={styles.serviceListItem}>
                          {locale === 'ru' ? 'административные формы' : 'administrative forms'}
                        </li>
                        <li className={styles.serviceListItem}>
                          {locale === 'ru' ? 'личные документы врача для MOH/DOH/DHA' : 'doctor personal documents for MOH/DOH/DHA'}
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
                          alt={locale === 'ru' ? 'Создание авторских курсов, программ и методик' : 'Creating Custom Courses, Programs and Methodologies'}
                          className={styles.serviceIcon}
                        />
                      </div>
                      <div>
                        <span className={styles.serviceBadge}>
                          {locale === 'ru' ? 'Услуга' : 'Service'}
                        </span>
                        <h3 className={styles.serviceTitle}>
                          {locale === 'ru' ? 'Создание авторских курсов, программ и методик' : 'Creating Custom Courses, Programs and Methodologies'}
                        </h3>
                      </div>
                      <p className={styles.serviceDescription}>
                        {locale === 'ru'
                          ? 'Для врачей, клиник, школ и образовательных проектов мы разрабатываем уникальные обучающие продукты с индивидуальным подходом к каждому клиенту.'
                          : 'For doctors, clinics, schools and educational projects, we develop unique educational products with an individual approach to each client.'}
                      </p>
                      <ul className={styles.serviceList}>
                        <li className={styles.serviceListItem}>
                          {locale === 'ru' ? 'Разрабатываем уникальные обучающие продукты' : 'We develop unique educational products'}
                        </li>
                        <li className={styles.serviceListItem}>
                          {locale === 'ru' ? 'Создаём методологию' : 'We create methodology'}
                        </li>
                        <li className={styles.serviceListItem}>
                          {locale === 'ru' ? 'Строим структуру курса' : 'We build course structure'}
                        </li>
                        <li className={styles.serviceListItem}>
                          {locale === 'ru' ? 'Подготавливаем программу под ключ' : 'We prepare turnkey programs'}
                        </li>
                        <li className={styles.serviceListItem}>
                          {locale === 'ru' ? 'Помогаем с внедрением и реализацией' : 'We help with implementation and execution'}
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
                          alt={locale === 'ru' ? 'Индивидуальные образовательные программы под ключ' : 'Turnkey Individual Educational Programs'}
                          className={styles.serviceIcon}
                        />
                      </div>
                      <div>
                        <span className={styles.serviceBadge}>
                          {locale === 'ru' ? 'Услуга' : 'Service'}
                        </span>
                        <h3 className={styles.serviceTitle}>
                          {locale === 'ru' ? 'Индивидуальные образовательные программы под ключ' : 'Turnkey Individual Educational Programs'}
                        </h3>
                      </div>
                      <p className={styles.serviceDescription}>
                        {locale === 'ru'
                          ? 'Персонализированные программы обучения, разработанные специально под цели и потребности конкретного врача. Индивидуальный подход на каждом этапе.'
                          : 'Personalized training programs designed specifically for the goals and needs of a particular doctor. Individual approach at every stage.'}
                      </p>
                      <ul className={styles.serviceList}>
                        <li className={styles.serviceListItem}>
                          {locale === 'ru' ? 'наставничество' : 'mentoring'}
                        </li>
                        <li className={styles.serviceListItem}>
                          {locale === 'ru' ? 'индивидуальные стажировки' : 'individual internships'}
                        </li>
                        <li className={styles.serviceListItem}>
                          {locale === 'ru' ? 'персональные диссекции' : 'personal dissections'}
                        </li>
                        <li className={styles.serviceListItem}>
                          {locale === 'ru' ? 'обучение в формате 1:1' : '1:1 training format'}
                        </li>
                        <li className={styles.serviceListItem}>
                          {locale === 'ru' ? 'маршруты развития под конкретную цель врача' : 'development paths tailored to specific doctor goals'}
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
                    {locale === 'ru' ? 'Видеогалерея' : 'Video Gallery'}
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

import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './About.module.css';

const About: NextPage = () => {
  const router = useRouter();
  const { locale } = router;

  const scrollToAboutText = () => {
    const element = document.getElementById('about-text-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
                <div className={styles.heroTitleWrapper}>
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
              <div className={styles.aboutTextContent}>
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

          {/* Logo and Offer Section */}
          <section className={styles.logoOfferSection}>
            <div className={styles.container}>
              <div className={styles.logoOfferContent}>
                <div className={styles.logoWrapper}>
                  <Image
                    src="/about_logo.jpg"
                    alt="Estedilux Med Logo"
                    width={800}
                    height={500}
                    className={styles.aboutLogo}
                  />
                </div>
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
                  <div className={styles.serviceSection}>
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
                  </div>

                  {/* Service 2 */}
                  <div className={styles.serviceSection}>
                    <div className={styles.serviceContent}>
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
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default About;

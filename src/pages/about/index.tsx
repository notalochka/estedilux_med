import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './About.module.css';

const About: NextPage = () => {
  const router = useRouter();
  const { locale } = router;

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
              : 'Learn more about Estedilux Med'
          }
        />
      </Head>

      <div className={styles.aboutPage}>
        <Header />
        <main className={styles.main}>
          {/* Hero Section */}
          <section className={styles.hero}>
            <div className={styles.container}>
              <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>
                Estedilux Med
            </h1>
                <p className={styles.heroDescription}>
                  {locale === 'ru'
                    ? 'международная образовательная платформа, которая объединяет обучение, стажировки, развитие врачей и организацию медицинских мероприятий под ключ.'
                    : 'an international educational platform that combines training, internships, doctor development and turnkey medical event organization.'}
                </p>
                <p className={styles.heroSubtitle}>
                  {locale === 'ru'
                    ? 'Мы работаем с врачами разных специальностей и создаём программы, которые соответствуют мировым медицинским стандартам.'
                    : 'We work with doctors of various specialties and create programs that meet international medical standards.'}
                </p>
              </div>
            </div>
          </section>

          {/* Content Section */}
          <div className={styles.content}>
            <div className={styles.container}>
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  {locale === 'ru' ? 'Что мы делаем' : 'What We Do'}
                </h2>

                <div className={styles.servicesGrid}>
                  {/* Service 1 */}
                  <div className={styles.serviceCard}>
                    <div className={styles.serviceNumber}>1</div>
                    <h3 className={styles.serviceTitle}>
                      {locale === 'ru' ? 'Международное обучение для врачей' : 'International Training for Doctors'}
                    </h3>
                    <p className={styles.serviceDescription}>
                      {locale === 'ru'
                        ? 'Мы проводим профессиональные программы и стажировки в трёх ключевых медицинских центрах мира:'
                        : 'We conduct professional programs and internships in three key medical centers of the world:'}
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

                  {/* Service 2 */}
                  <div className={styles.serviceCard}>
                    <div className={styles.serviceNumber}>2</div>
                    <h3 className={styles.serviceTitle}>
                      {locale === 'ru' ? 'Повышение квалификации врачей' : 'Doctor Qualification Enhancement'}
                    </h3>
                    <p className={styles.serviceDescription}>
                      {locale === 'ru'
                        ? 'Актуальные программы на сегодня по:'
                        : 'Current programs today:'}
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
                    <p className={styles.serviceDescription} style={{ marginTop: 'var(--spacing-md)' }}>
                      {locale === 'ru'
                        ? 'Наши курсы основаны на клинической практике и соответствуют международным протоколам.'
                        : 'Our courses are based on clinical practice and comply with international protocols.'}
                    </p>
                  </div>

                  {/* Service 3 */}
                  <div className={styles.serviceCard}>
                    <div className={styles.serviceNumber}>3</div>
                    <h3 className={styles.serviceTitle}>
                      {locale === 'ru' ? 'Cadaver курсы' : 'Cadaver Courses'}
                    </h3>
                    <p className={styles.serviceDescription}>
                      {locale === 'ru'
                        ? 'Мы организуем и проводим:'
                        : 'We organize and conduct:'}
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
                    <p className={styles.serviceDescription} style={{ marginTop: 'var(--spacing-md)' }}>
                      {locale === 'ru'
                        ? 'Все курсы проходят в университетах и лабораториях, оснащённых по мировым стандартам.'
                        : 'All courses are held in universities and laboratories equipped to world standards.'}
                    </p>
                  </div>

                  {/* Service 4 */}
                  <div className={styles.serviceCard}>
                    <div className={styles.serviceNumber}>4</div>
                    <h3 className={styles.serviceTitle}>
                      {locale === 'ru' ? 'Организация кадавер курсов под ключ' : 'Turnkey Cadaver Course Organization'}
                    </h3>
                    <p className={styles.serviceDescription}>
                      {locale === 'ru'
                        ? 'Мы берём на себя полностью весь процесс:'
                        : 'We take on the entire process:'}
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
                    <p className={styles.serviceDescription} style={{ marginTop: 'var(--spacing-md)' }}>
                      {locale === 'ru'
                        ? 'Врач получает готовое мероприятие без организационных сложностей.'
                        : 'The doctor receives a ready-made event without organizational difficulties.'}
                    </p>
                  </div>

                  {/* Service 5 */}
                  <div className={styles.serviceCard}>
                    <div className={styles.serviceNumber}>5</div>
                    <h3 className={styles.serviceTitle}>
                      {locale === 'ru' ? 'Организация медицинских мероприятий под ключ' : 'Turnkey Medical Event Organization'}
                    </h3>
                    <p className={styles.serviceDescription}>
                      {locale === 'ru'
                        ? 'Мы создаём:'
                        : 'We create:'}
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
                    <p className={styles.serviceDescription} style={{ marginTop: 'var(--spacing-md)' }}>
                      {locale === 'ru'
                        ? 'Полная организация и сопровождение.'
                        : 'Full organization and support.'}
                    </p>
                  </div>

                  {/* Service 6 */}
                  <div className={styles.serviceCard}>
                    <div className={styles.serviceNumber}>6</div>
                    <h3 className={styles.serviceTitle}>
                      {locale === 'ru' ? 'Стажировки в клиниках' : 'Clinical Internships'}
                    </h3>
                    <p className={styles.serviceDescription}>
                      {locale === 'ru'
                        ? 'Официальные стажировки в ведущих клиниках:'
                        : 'Official internships in leading clinics:'}
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
                    <p className={styles.serviceDescription} style={{ marginTop: 'var(--spacing-md)' }}>
                      {locale === 'ru'
                        ? 'Программы адаптированы под потребности конкретного врача или группы.'
                        : 'Programs are adapted to the needs of a specific doctor or group.'}
                    </p>
                  </div>

                  {/* Service 7 */}
                  <div className={styles.serviceCard}>
                    <div className={styles.serviceNumber}>7</div>
                    <h3 className={styles.serviceTitle}>
                      {locale === 'ru' ? 'Стажировки в университетах' : 'University Internships'}
                    </h3>
                    <p className={styles.serviceDescription}>
                      {locale === 'ru'
                        ? 'Доступ к:'
                        : 'Access to:'}
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

                  {/* Service 8 */}
                  <div className={styles.serviceCard}>
                    <div className={styles.serviceNumber}>8</div>
                    <h3 className={styles.serviceTitle}>
                      {locale === 'ru' ? 'Реолокация врачей в Дубай' : 'Doctor Relocation to Dubai'}
                    </h3>
                    <p className={styles.serviceDescription}>
                      {locale === 'ru'
                        ? 'Мы сопровождаем врачей в процессе релокации:'
                        : 'We support doctors in the relocation process:'}
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

                  {/* Service 9 */}
                  <div className={styles.serviceCard}>
                    <div className={styles.serviceNumber}>9</div>
                    <h3 className={styles.serviceTitle}>
                      {locale === 'ru' ? 'Помощь с документами для релокации' : 'Relocation Document Assistance'}
                    </h3>
                    <p className={styles.serviceDescription}>
                      {locale === 'ru'
                        ? 'Подготовка и сопровождение:'
                        : 'Preparation and support:'}
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

                  {/* Service 10 */}
                  <div className={styles.serviceCard}>
                    <div className={styles.serviceNumber}>10</div>
                    <h3 className={styles.serviceTitle}>
                      {locale === 'ru' ? 'Создание авторских курсов, программ и методик' : 'Creating Custom Courses, Programs and Methodologies'}
                    </h3>
                    <p className={styles.serviceDescription}>
                      {locale === 'ru'
                        ? 'Для врачей, клиник, школ и образовательных проектов:'
                        : 'For doctors, clinics, schools and educational projects:'}
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

                  {/* Service 11 */}
                  <div className={styles.serviceCard}>
                    <div className={styles.serviceNumber}>11</div>
                    <h3 className={styles.serviceTitle}>
                      {locale === 'ru' ? 'Индивидуальные образовательные программы под ключ' : 'Turnkey Individual Educational Programs'}
                    </h3>
                    <p className={styles.serviceDescription}>
                      {locale === 'ru'
                        ? 'Личные форматы:'
                        : 'Personal formats:'}
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


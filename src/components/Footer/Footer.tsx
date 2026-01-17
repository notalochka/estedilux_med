import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Mail, Phone, Instagram, Facebook, ArrowUpRight } from 'lucide-react';
import { t } from '@/lib/translations';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const router = useRouter();
  const { locale } = router;

  const quickLinks = [
    { href: '/', label: t({ ru: 'Главная', en: 'Home', tr: 'Ana Sayfa', uk: 'Головна' }, locale) },
    { href: '/about', label: t({ ru: 'О нас', en: 'About', tr: 'Hakkımızda', uk: 'Про нас' }, locale) },
    { href: '/events', label: t({ ru: 'События', en: 'Events', tr: 'Etkinlikler', uk: 'Події' }, locale) },
    { href: '/blog', label: t({ ru: 'Блог', en: 'Blog', tr: 'Blog', uk: 'Блог' }, locale) },
    { href: '/contact', label: t({ ru: 'Контакты', en: 'Contact', tr: 'İletişim', uk: 'Контакти' }, locale) },
  ];

  const contactOptions = [
    {
      label: 'estediluxmed@ukr.net',
      href: 'mailto:estediluxmed@ukr.net',
      icon: Mail,
    },
    {
      label: '+380 50 999 43 49',
      href: 'tel:+380509994349',
      icon: Phone,
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/estedilux_med?igsh=MXY5ODA2bHMxMTk1MQ==',
      icon: Instagram,
    },
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/profile.php?id=61551895149114&mibextid=wwXIfr',
      icon: Facebook,
    },
  ];

  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.gradientOverlay1} />
      <div className={styles.gradientOverlay2} />

      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.section}>
            <Link href="/" className={styles.logoLink} aria-label="Estedilux Med home">
              <span className={styles.logoText}>Estedilux Med</span>
            </Link>
            <p className={styles.description}>
              {t(
                {
                  ru: 'Estedilux Med — это международная образовательная платформа, которая объединяет обучение, стажировки, развитие врачей и организацию медицинских мероприятий под ключ.',
                  en: 'Estedilux Med is an international educational platform that combines training, internships, doctor development and turnkey medical event organization.',
                  tr: 'Estedilux Med, eğitim, stajlar, doktor gelişimi ve anahtar teslim tıbbi etkinlik organizasyonunu birleştiren uluslararası bir eğitim platformudur.',
                  uk: 'Estedilux Med — це міжнародна освітня платформа, яка об\'єднує навчання, стажування, розвиток лікарів та організацію медичних заходів під ключ.',
                },
                locale
              )}
            </p>
            <Link href="/contact" className={styles.ctaButton}>
              <span className={styles.ctaText}>
                {t({ ru: 'Связаться с нами', en: 'Contact Us', tr: 'Bizimle İletişime Geçin', uk: 'Зв\'язатися з нами' }, locale)}
              </span>
              <ArrowUpRight size={16} className={styles.ctaIcon} />
              <div className={styles.ctaGradient} />
            </Link>
          </div>

          <div className={styles.navSection}>
            <h4 className={styles.sectionTitle}>
              {t({ ru: 'Навигация', en: 'Navigation', tr: 'Gezinme', uk: 'Навігація' }, locale)}
            </h4>
            <div className={styles.navGrid}>
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={styles.navLink}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.contactSection}>
            <h4 className={styles.sectionTitle}>
              {t({ ru: 'Контактная информация', en: 'Contact Information', tr: 'İletişim Bilgileri', uk: 'Контактна інформація' }, locale)}
            </h4>
            <div className={styles.contactList}>
              {contactOptions.map((contact) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  className={styles.contactLink}
                  target={contact.href.startsWith('http') ? '_blank' : undefined}
                  rel={contact.href.startsWith('http') ? 'noreferrer' : undefined}
                >
                  <contact.icon size={16} className={styles.contactIcon} />
                  {contact.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Estedilux Med. All rights reserved.
          </p>
          <p className={styles.developed}>
            {t({ ru: 'Разработано', en: 'Developed by', tr: 'Geliştiren', uk: 'Розроблено' }, locale)}{' '}
            <a
              href="https://new.telebots.site/"
              target="_blank"
              rel="noreferrer"
              className={styles.developedLink}
            >
              TeleBots
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Mail, Phone, Instagram, Facebook, ArrowUpRight } from 'lucide-react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const router = useRouter();
  const { locale } = router;

  const quickLinks = [
    { href: '/', label: locale === 'ru' ? 'Главная' : 'Home' },
    { href: '/about', label: locale === 'ru' ? 'О нас' : 'About' },
    { href: '/events', label: locale === 'ru' ? 'События' : 'Events' },
    { href: '/blog', label: locale === 'ru' ? 'Блог' : 'Blog' },
    { href: '/contact', label: locale === 'ru' ? 'Контакты' : 'Contact' },
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
              {locale === 'ru'
                ? 'Estedilux Med — это международная образовательная платформа, которая объединяет обучение, стажировки, развитие врачей и организацию медицинских мероприятий под ключ.'
                : 'Estedilux Med is an international educational platform that combines training, internships, doctor development and turnkey medical event organization.'}
            </p>
            <Link href="/contact" className={styles.ctaButton}>
              <span className={styles.ctaText}>
                {locale === 'ru' ? 'Связаться с нами' : 'Contact Us'}
              </span>
              <ArrowUpRight size={16} className={styles.ctaIcon} />
              <div className={styles.ctaGradient} />
            </Link>
          </div>

          <div className={styles.navSection}>
            <h4 className={styles.sectionTitle}>
              {locale === 'ru' ? 'Навигация' : 'Navigation'}
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
              {locale === 'ru' ? 'Контактная информация' : 'Contact Information'}
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
            {locale === 'ru' ? 'Разработано' : 'Developed by'}{' '}
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


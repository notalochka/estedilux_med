import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const router = useRouter();
  const { locale, locales, asPath } = router;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const changeLanguage = (newLocale: string) => {
    router.push(asPath, asPath, { locale: newLocale });
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Закриваємо меню при зміні маршруту
  useEffect(() => {
    const handleRouteChange = () => {
      setIsMenuOpen(false);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  // Блокуємо прокрутку body коли меню відкрите на мобільних
  useEffect(() => {
    if (isMenuOpen) {
      // Блокуємо прокрутку
      document.body.style.overflow = 'hidden';
      // Для iOS
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      // Відновлюємо прокрутку
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    // Очищення при розмонтуванні
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isMenuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" onClick={closeMenu}>
            <Image
              src="/logo.jpg"
              alt="Estedilux Med"
              width={150}
              height={50}
              priority
              className={styles.logoImage}
            />
          </Link>
        </div>

        {/* Бургер-меню кнопка */}
        <button
          className={`${styles.burgerButton} ${isMenuOpen ? styles.active : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className={styles.burgerLine}></span>
          <span className={styles.burgerLine}></span>
          <span className={styles.burgerLine}></span>
        </button>

        {/* Десктоп навігація */}
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>
            {locale === 'uk' ? 'Головна' : 'Home'}
          </Link>
          <Link href="/about" className={styles.navLink}>
            {locale === 'uk' ? 'Про нас' : 'About'}
          </Link>
          <Link href="/events" className={styles.navLink}>
            {locale === 'uk' ? 'Події' : 'Events'}
          </Link>
          <Link href="/blog" className={styles.navLink}>
            {locale === 'uk' ? 'Блог' : 'Blog'}
          </Link>
          <Link href="/contact" className={styles.navLink}>
            {locale === 'uk' ? 'Контакти' : 'Contact'}
          </Link>
        </nav>

        {/* Десктоп перемикач мови */}
        <div className={styles.languageSwitcher}>
          {locales?.map((loc) => (
            <button
              key={loc}
              onClick={() => changeLanguage(loc)}
              className={`${styles.langButton} ${locale === loc ? styles.active : ''}`}
              aria-label={`Switch to ${loc}`}
            >
              {loc.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Мобільне меню */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <nav className={styles.mobileNav}>
          <Link href="/" className={styles.mobileNavLink} onClick={closeMenu}>
            {locale === 'uk' ? 'Головна' : 'Home'}
          </Link>
          <Link href="/about" className={styles.mobileNavLink} onClick={closeMenu}>
            {locale === 'uk' ? 'Про нас' : 'About'}
          </Link>
          <Link href="/events" className={styles.mobileNavLink} onClick={closeMenu}>
            {locale === 'uk' ? 'Події' : 'Events'}
          </Link>
          <Link href="/blog" className={styles.mobileNavLink} onClick={closeMenu}>
            {locale === 'uk' ? 'Блог' : 'Blog'}
          </Link>
          <Link href="/contact" className={styles.mobileNavLink} onClick={closeMenu}>
            {locale === 'uk' ? 'Контакти' : 'Contact'}
          </Link>
        </nav>
        <div className={styles.mobileLanguageSwitcher}>
          {locales?.map((loc) => (
            <button
              key={loc}
              onClick={() => changeLanguage(loc)}
              className={`${styles.mobileLangButton} ${locale === loc ? styles.active : ''}`}
              aria-label={`Switch to ${loc}`}
            >
              {loc.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Overlay для закриття меню */}
      {isMenuOpen && (
        <div className={styles.overlay} onClick={closeMenu}></div>
      )}
    </header>
  );
};

export default Header;


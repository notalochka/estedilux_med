import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Menu, X } from 'lucide-react';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const router = useRouter();
  const { locale, locales, asPath } = router;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [savedScrollPosition, setSavedScrollPosition] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Відновлюємо позицію скролу після зміни мови
  useEffect(() => {
    if (savedScrollPosition !== null) {
      // Використовуємо setTimeout для забезпечення того, що DOM оновився
      setTimeout(() => {
        window.scrollTo(0, savedScrollPosition);
        setSavedScrollPosition(null);
      }, 0);
    }
  }, [locale, savedScrollPosition]);

  const changeLanguage = (newLocale: string) => {
    // Зберігаємо поточну позицію скролу
    const scrollPosition = window.scrollY;
    setSavedScrollPosition(scrollPosition);
    
    // Змінюємо мову без скролу на початок
    router.push(asPath, asPath, { locale: newLocale, scroll: false });
    
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
      // Зберігаємо поточну позицію скролу
      const scrollY = window.scrollY;
      
      // Блокуємо прокрутку
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      return () => {
        // Відновлюємо прокрутку та позицію
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    }
  }, [isMenuOpen]);

  const isScrolled = scrollY > 50;

  // Функція для визначення активної сторінки
  const isActive = (path: string) => {
    if (path === '/') {
      return asPath === '/' || asPath === `/${locale}`;
    }
    return asPath.startsWith(path);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : styles.transparent}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" onClick={closeMenu}>
            <Image
              src="/logo.jpg"
              alt="Estedilux Med"
              width={160}
              height={48}
              priority
              className={styles.logoImage}
            />
          </Link>
        </div>

        {/* Десктоп навігація */}
        <nav className={styles.nav}>
          <Link href="/" className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}>
            {locale === 'ru' ? 'Главная' : 'Home'}
          </Link>
          <Link href="/about" className={`${styles.navLink} ${isActive('/about') ? styles.active : ''}`}>
            {locale === 'ru' ? 'О нас' : 'About'}
          </Link>
          <Link href="/events" className={`${styles.navLink} ${isActive('/events') ? styles.active : ''}`}>
            {locale === 'ru' ? 'События' : 'Events'}
          </Link>
          <Link href="/blog" className={`${styles.navLink} ${isActive('/blog') ? styles.active : ''}`}>
            {locale === 'ru' ? 'Блог' : 'Blog'}
          </Link>
          <Link href="/contact" className={`${styles.navLink} ${isActive('/contact') ? styles.active : ''}`}>
            {locale === 'ru' ? 'Контакты' : 'Contact'}
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

        {/* Бургер-меню кнопка */}
        <button
          type="button"
          onClick={toggleMenu}
          className={styles.burgerButton}
          aria-label="Toggle menu"
        >
          <Menu size={24} className={isScrolled ? styles.burgerIconScrolled : styles.burgerIcon} />
        </button>
      </div>

      {/* Мобільне меню */}
      {isMenuOpen && (
        <>
          <div 
            className={styles.mobileOverlay}
            onClick={closeMenu}
          />
          <div className={styles.mobileCloseButton}>
            <button
              type="button"
              onClick={closeMenu}
              className={styles.closeButton}
              aria-label="Close menu"
            >
              <X size={24} className={styles.closeIcon} />
            </button>
          </div>
          <div className={styles.mobileMenu}>
            <div className={styles.mobileMenuContent}>
              <Link href="/" className={`${styles.mobileNavLink} ${isActive('/') ? styles.active : ''}`} onClick={closeMenu}>
                {locale === 'ru' ? 'Главная' : 'Home'}
              </Link>
              <Link href="/about" className={`${styles.mobileNavLink} ${isActive('/about') ? styles.active : ''}`} onClick={closeMenu}>
                {locale === 'ru' ? 'О нас' : 'About'}
              </Link>
              <Link href="/events" className={`${styles.mobileNavLink} ${isActive('/events') ? styles.active : ''}`} onClick={closeMenu}>
                {locale === 'ru' ? 'События' : 'Events'}
              </Link>
              <Link href="/blog" className={`${styles.mobileNavLink} ${isActive('/blog') ? styles.active : ''}`} onClick={closeMenu}>
                {locale === 'ru' ? 'Блог' : 'Blog'}
              </Link>
              <Link href="/contact" className={`${styles.mobileNavLink} ${isActive('/contact') ? styles.active : ''}`} onClick={closeMenu}>
                {locale === 'ru' ? 'Контакты' : 'Contact'}
              </Link>
            </div>
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
        </>
      )}
    </header>
  );
};

export default Header;

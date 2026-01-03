import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { X, Globe, ChevronDown } from 'lucide-react';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const router = useRouter();
  const { locale, locales, asPath } = router;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [savedScrollPosition, setSavedScrollPosition] = useState<number | null>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Calculate scroll progress
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, scrolled)));
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
    setIsLangDropdownOpen(false);
  };

  // Закриваємо dropdown при кліку поза ним
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      // Не закриваємо dropdown, якщо клік був на overlay (він має закривати тільки меню)
      if (target && (target as Element).closest && (target as Element).closest('[class*="mobileOverlay"]')) {
        return;
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(target)) {
        setIsLangDropdownOpen(false);
      }
    };

    if (isLangDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLangDropdownOpen]);

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
    // Видаляємо locale з asPath для порівняння
    const pathWithoutLocale = asPath.replace(`/${locale}`, '') || '/';
    
    // Для точного співпадіння (наприклад, /event не повинен співпадати з /events)
    if (path === '/event') {
      return pathWithoutLocale === '/event' || pathWithoutLocale.startsWith('/event/');
    }
    if (path === '/events') {
      return pathWithoutLocale === '/events' || pathWithoutLocale.startsWith('/events/');
    }
    
    // Для інших шляхів використовуємо startsWith
    return pathWithoutLocale.startsWith(path);
  };

  return (
    <>
      <div 
        className={styles.scrollProgress}
        style={{ width: `${scrollProgress}%` }}
      />
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : styles.transparent}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" onClick={closeMenu} className={styles.logoLink}>
            <span className={styles.logoText}>Estedilux&nbsp;Med</span>
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
          <Link href="/event" className={`${styles.navLink} ${isActive('/event') ? styles.active : ''}`}>
            {locale === 'ru' ? 'События' : 'Events'}
          </Link>
          <Link href="/events" className={`${styles.navLink} ${isActive('/events') ? styles.active : ''}`}>
            {locale === 'ru' ? 'Направления' : 'Directions'}
          </Link>
          <Link href="/blog" className={`${styles.navLink} ${isActive('/blog') ? styles.active : ''}`}>
            {locale === 'ru' ? 'Блог' : 'Blog'}
          </Link>
          <Link href="/contact" className={`${styles.navLink} ${isActive('/contact') ? styles.active : ''}`}>
            {locale === 'ru' ? 'Контакты' : 'Contact'}
          </Link>
        </nav>

        {/* Десктоп перемикач мови */}
        <div 
          ref={langDropdownRef}
          className={styles.languageSwitcher}
        >
          <button
            onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
            className={styles.langTrigger}
            aria-label="Change language"
            aria-expanded={isLangDropdownOpen}
          >
            <Globe size={20} className={styles.langIcon} />
            <span className={styles.langCurrent}>{locale?.toUpperCase()}</span>
            <ChevronDown 
              size={16} 
              className={`${styles.langChevron} ${isLangDropdownOpen ? styles.open : ''}`} 
            />
          </button>
          
          {isLangDropdownOpen && (
            <div className={styles.langDropdown}>
              {locales?.map((loc) => (
                <button
                  key={loc}
                  onClick={() => changeLanguage(loc)}
                  className={`${styles.langOption} ${locale === loc ? styles.active : ''}`}
                  aria-label={`Switch to ${loc}`}
                >
                  <span>{loc.toUpperCase()}</span>
                  {locale === loc && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Бургер-меню кнопка */}
        <button
          type="button"
          onClick={toggleMenu}
          className={styles.burgerButton}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X size={32} strokeWidth={3} className={styles.burgerIcon} />
          ) : (
            <div className={styles.burgerLines}>
              <span className={`${styles.burgerLine} ${styles.burgerLineTop}`}></span>
              <span className={`${styles.burgerLine} ${styles.burgerLineMiddle}`}></span>
              <span className={`${styles.burgerLine} ${styles.burgerLineBottom}`}></span>
            </div>
          )}
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
              <X size={32} strokeWidth={3} className={styles.closeIcon} />
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
              <Link href="/event" className={`${styles.mobileNavLink} ${isActive('/event') ? styles.active : ''}`} onClick={closeMenu}>
                {locale === 'ru' ? 'События' : 'Events'}
              </Link>
              <Link href="/events" className={`${styles.mobileNavLink} ${isActive('/events') ? styles.active : ''}`} onClick={closeMenu}>
                {locale === 'ru' ? 'Направления' : 'Directions'}
              </Link>
              <Link href="/blog" className={`${styles.mobileNavLink} ${isActive('/blog') ? styles.active : ''}`} onClick={closeMenu}>
                {locale === 'ru' ? 'Блог' : 'Blog'}
              </Link>
              <Link href="/contact" className={`${styles.mobileNavLink} ${isActive('/contact') ? styles.active : ''}`} onClick={closeMenu}>
                {locale === 'ru' ? 'Контакты' : 'Contact'}
              </Link>
            </div>
            <div className={styles.mobileLanguageSwitcher}>
              <div 
                ref={langDropdownRef}
                className={styles.languageSwitcher}
              >
                <button
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  className={styles.langTrigger}
                  aria-label="Change language"
                  aria-expanded={isLangDropdownOpen}
                >
                  <Globe size={20} className={styles.langIcon} />
                  <span className={styles.langCurrent}>{locale?.toUpperCase()}</span>
                  <ChevronDown 
                    size={16} 
                    className={`${styles.langChevron} ${isLangDropdownOpen ? styles.open : ''}`} 
                  />
                </button>
                
                {isLangDropdownOpen && (
                  <div className={styles.langDropdown}>
                    {locales?.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => changeLanguage(loc)}
                        className={`${styles.langOption} ${locale === loc ? styles.active : ''}`}
                        aria-label={`Switch to ${loc}`}
                      >
                        <span>{loc.toUpperCase()}</span>
                        {locale === loc && (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
      </div>
        </>
      )}
    </header>
    </>
  );
};

export default Header;

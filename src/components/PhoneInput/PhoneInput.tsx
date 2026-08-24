import React, { useMemo, useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  COUNTRY_CODES,
  formatFullPhone,
  getDefaultCountryCode,
  type CountryCode,
} from '@/lib/countryCodes';
import styles from './PhoneInput.module.css';

export type PhoneInputProps = {
  id?: string;
  name?: string;
  value: string; // повний номер з кодом, напр. "+380501234567"
  onChange: (fullPhone: string) => void;
  locale?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  disabled?: boolean;
};

const PhoneInput: React.FC<PhoneInputProps> = ({
  id = 'phone',
  name = 'phone',
  value,
  onChange,
  locale = 'uk',
  required = false,
  placeholder,
  className,
  inputClassName,
  disabled = false,
}) => {
  const defaultCode = getDefaultCountryCode(locale);
  const [countryCode, setCountryCode] = useState(defaultCode);
  const [localNumber, setLocalNumber] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const wrapperRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = useMemo(
    () => COUNTRY_CODES.find((c) => c.code === countryCode) || COUNTRY_CODES[0],
    [countryCode]
  );

  // Синхронізація ззовні (наприклад після reset форми)
  useEffect(() => {
    if (!value) {
      setLocalNumber('');
      return;
    }
    const digits = value.replace(/\D/g, '');
    const dialDigits = selected.dial.replace(/\D/g, '');
    if (value.startsWith(selected.dial) || digits.startsWith(dialDigits)) {
      setLocalNumber(digits.slice(dialDigits.length));
    }
  }, [value, selected.dial]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  useEffect(() => {
    if (!isOpen || !wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const openUp = spaceBelow < 300 && rect.top > spaceBelow;
    setDropdownStyle({
      position: 'fixed',
      left: rect.left,
      width: Math.max(rect.width, 260),
      ...(openUp
        ? { bottom: window.innerHeight - rect.top + 4, top: 'auto' }
        : { top: rect.bottom + 4, bottom: 'auto' }),
      zIndex: 10050,
    });
    if (searchRef.current) searchRef.current.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onScrollOrResize = () => setIsOpen(false);
    window.addEventListener('scroll', onScrollOrResize, true);
    window.addEventListener('resize', onScrollOrResize);
    return () => {
      window.removeEventListener('scroll', onScrollOrResize, true);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [isOpen]);

  const countryName = (c: CountryCode) => {
    if (locale === 'ru') return c.name.ru;
    if (locale === 'tr') return c.name.tr;
    if (locale === 'uk') return c.name.uk;
    return c.name.en;
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return COUNTRY_CODES;
    return COUNTRY_CODES.filter((c) => {
      const name =
        locale === 'ru' ? c.name.ru : locale === 'tr' ? c.name.tr : locale === 'uk' ? c.name.uk : c.name.en;
      return (
        name.toLowerCase().includes(q) ||
        c.dial.includes(q) ||
        c.code.toLowerCase().includes(q)
      );
    });
  }, [search, locale]);

  const emitChange = (dial: string, number: string) => {
    onChange(formatFullPhone(dial, number));
  };

  const handleCountrySelect = (c: CountryCode) => {
    setCountryCode(c.code);
    setIsOpen(false);
    setSearch('');
    emitChange(c.dial, localNumber);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value.replace(/[^\d\s\-()]/g, '');
    setLocalNumber(next);
    emitChange(selected.dial, next);
  };

  const numberPlaceholder =
    placeholder ||
    (locale === 'ru'
      ? '00 000 00 00'
      : locale === 'tr'
        ? '5XX XXX XX XX'
        : locale === 'en'
          ? 'Phone number'
          : '00 000 00 00');

  return (
    <div className={`${styles.phoneInput} ${className || ''}`} ref={wrapperRef}>
      <div className={styles.row}>
        <button
          type="button"
          className={styles.countryBtn}
          onClick={() => !disabled && setIsOpen((o) => !o)}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label="Country code"
        >
          <span className={styles.flag}>{selected.flag}</span>
          <span className={styles.dial}>{selected.dial}</span>
          <ChevronDown size={16} className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`} />
        </button>

        <input
          type="tel"
          id={id}
          name={name}
          value={localNumber}
          onChange={handleNumberChange}
          required={required}
          disabled={disabled}
          placeholder={numberPlaceholder}
          className={`${styles.numberInput} ${inputClassName || ''}`}
          autoComplete="tel-national"
          inputMode="tel"
        />
      </div>

      {/* Hidden field with full international number for native form submit if needed */}
      <input type="hidden" name={`${name}_full`} value={formatFullPhone(selected.dial, localNumber)} readOnly />

      {isOpen && (
        <div className={styles.dropdown} role="listbox" style={dropdownStyle}>
          <input
            ref={searchRef}
            type="text"
            className={styles.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              locale === 'ru'
                ? 'Поиск страны...'
                : locale === 'tr'
                  ? 'Ülke ara...'
                  : locale === 'en'
                    ? 'Search country...'
                    : 'Пошук країни...'
            }
          />
          <ul className={styles.list}>
            {filtered.map((c) => (
              <li key={`${c.code}-${c.dial}`}>
                <button
                  type="button"
                  className={`${styles.option} ${c.code === countryCode ? styles.optionActive : ''}`}
                  onClick={() => handleCountrySelect(c)}
                  role="option"
                  aria-selected={c.code === countryCode}
                >
                  <span className={styles.flag}>{c.flag}</span>
                  <span className={styles.optionName}>{countryName(c)}</span>
                  <span className={styles.optionDial}>{c.dial}</span>
                </button>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className={styles.empty}>
                {locale === 'ru'
                  ? 'Ничего не найдено'
                  : locale === 'tr'
                    ? 'Sonuç yok'
                    : locale === 'en'
                      ? 'No results'
                      : 'Нічого не знайдено'}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PhoneInput;

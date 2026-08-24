export type CountryCode = {
  code: string; // ISO 3166-1 alpha-2
  dial: string; // e.g. "+380"
  name: { ru: string; en: string; tr: string; uk: string };
  flag: string;
};

/** Популярні коди країн для студентів з усього світу */
export const COUNTRY_CODES: CountryCode[] = [
  { code: 'UA', dial: '+380', flag: '🇺🇦', name: { ru: 'Украина', en: 'Ukraine', tr: 'Ukrayna', uk: 'Україна' } },
  { code: 'TR', dial: '+90', flag: '🇹🇷', name: { ru: 'Турция', en: 'Turkey', tr: 'Türkiye', uk: 'Туреччина' } },
  { code: 'PL', dial: '+48', flag: '🇵🇱', name: { ru: 'Польша', en: 'Poland', tr: 'Polonya', uk: 'Польща' } },
  { code: 'DE', dial: '+49', flag: '🇩🇪', name: { ru: 'Германия', en: 'Germany', tr: 'Almanya', uk: 'Німеччина' } },
  { code: 'US', dial: '+1', flag: '🇺🇸', name: { ru: 'США', en: 'United States', tr: 'ABD', uk: 'США' } },
  { code: 'GB', dial: '+44', flag: '🇬🇧', name: { ru: 'Великобритания', en: 'United Kingdom', tr: 'Birleşik Krallık', uk: 'Велика Британія' } },
  { code: 'RU', dial: '+7', flag: '🇷🇺', name: { ru: 'Россия', en: 'Russia', tr: 'Rusya', uk: 'Росія' } },
  { code: 'KZ', dial: '+7', flag: '🇰🇿', name: { ru: 'Казахстан', en: 'Kazakhstan', tr: 'Kazakistan', uk: 'Казахстан' } },
  { code: 'UZ', dial: '+998', flag: '🇺🇿', name: { ru: 'Узбекистан', en: 'Uzbekistan', tr: 'Özbekistan', uk: 'Узбекистан' } },
  { code: 'AZ', dial: '+994', flag: '🇦🇿', name: { ru: 'Азербайджан', en: 'Azerbaijan', tr: 'Azerbaycan', uk: 'Азербайджан' } },
  { code: 'GE', dial: '+995', flag: '🇬🇪', name: { ru: 'Грузия', en: 'Georgia', tr: 'Gürcistan', uk: 'Грузія' } },
  { code: 'MD', dial: '+373', flag: '🇲🇩', name: { ru: 'Молдова', en: 'Moldova', tr: 'Moldova', uk: 'Молдова' } },
  { code: 'BY', dial: '+375', flag: '🇧🇾', name: { ru: 'Беларусь', en: 'Belarus', tr: 'Belarus', uk: 'Білорусь' } },
  { code: 'RO', dial: '+40', flag: '🇷🇴', name: { ru: 'Румыния', en: 'Romania', tr: 'Romanya', uk: 'Румунія' } },
  { code: 'BG', dial: '+359', flag: '🇧🇬', name: { ru: 'Болгария', en: 'Bulgaria', tr: 'Bulgaristan', uk: 'Болгарія' } },
  { code: 'CZ', dial: '+420', flag: '🇨🇿', name: { ru: 'Чехия', en: 'Czech Republic', tr: 'Çekya', uk: 'Чехія' } },
  { code: 'SK', dial: '+421', flag: '🇸🇰', name: { ru: 'Словакия', en: 'Slovakia', tr: 'Slovakya', uk: 'Словаччина' } },
  { code: 'HU', dial: '+36', flag: '🇭🇺', name: { ru: 'Венгрия', en: 'Hungary', tr: 'Macaristan', uk: 'Угорщина' } },
  { code: 'IT', dial: '+39', flag: '🇮🇹', name: { ru: 'Италия', en: 'Italy', tr: 'İtalya', uk: 'Італія' } },
  { code: 'ES', dial: '+34', flag: '🇪🇸', name: { ru: 'Испания', en: 'Spain', tr: 'İspanya', uk: 'Іспанія' } },
  { code: 'FR', dial: '+33', flag: '🇫🇷', name: { ru: 'Франция', en: 'France', tr: 'Fransa', uk: 'Франція' } },
  { code: 'NL', dial: '+31', flag: '🇳🇱', name: { ru: 'Нидерланды', en: 'Netherlands', tr: 'Hollanda', uk: 'Нідерланди' } },
  { code: 'BE', dial: '+32', flag: '🇧🇪', name: { ru: 'Бельгия', en: 'Belgium', tr: 'Belçika', uk: 'Бельгія' } },
  { code: 'AT', dial: '+43', flag: '🇦🇹', name: { ru: 'Австрия', en: 'Austria', tr: 'Avusturya', uk: 'Австрія' } },
  { code: 'CH', dial: '+41', flag: '🇨🇭', name: { ru: 'Швейцария', en: 'Switzerland', tr: 'İsviçre', uk: 'Швейцарія' } },
  { code: 'IL', dial: '+972', flag: '🇮🇱', name: { ru: 'Израиль', en: 'Israel', tr: 'İsrail', uk: 'Ізраїль' } },
  { code: 'AE', dial: '+971', flag: '🇦🇪', name: { ru: 'ОАЭ', en: 'UAE', tr: 'BAE', uk: 'ОАЕ' } },
  { code: 'SA', dial: '+966', flag: '🇸🇦', name: { ru: 'Саудовская Аравия', en: 'Saudi Arabia', tr: 'Suudi Arabistan', uk: 'Саудівська Аравія' } },
  { code: 'CA', dial: '+1', flag: '🇨🇦', name: { ru: 'Канада', en: 'Canada', tr: 'Kanada', uk: 'Канада' } },
  { code: 'IN', dial: '+91', flag: '🇮🇳', name: { ru: 'Индия', en: 'India', tr: 'Hindistan', uk: 'Індія' } },
  { code: 'CN', dial: '+86', flag: '🇨🇳', name: { ru: 'Китай', en: 'China', tr: 'Çin', uk: 'Китай' } },
  { code: 'KR', dial: '+82', flag: '🇰🇷', name: { ru: 'Южная Корея', en: 'South Korea', tr: 'Güney Kore', uk: 'Південна Корея' } },
  { code: 'JP', dial: '+81', flag: '🇯🇵', name: { ru: 'Япония', en: 'Japan', tr: 'Japonya', uk: 'Японія' } },
  { code: 'EG', dial: '+20', flag: '🇪🇬', name: { ru: 'Египет', en: 'Egypt', tr: 'Mısır', uk: 'Єгипет' } },
  { code: 'AM', dial: '+374', flag: '🇦🇲', name: { ru: 'Армения', en: 'Armenia', tr: 'Ermenistan', uk: 'Вірменія' } },
  { code: 'KG', dial: '+996', flag: '🇰🇬', name: { ru: 'Кыргызстан', en: 'Kyrgyzstan', tr: 'Kırgızistan', uk: 'Киргизстан' } },
  { code: 'TJ', dial: '+992', flag: '🇹🇯', name: { ru: 'Таджикистан', en: 'Tajikistan', tr: 'Tacikistan', uk: 'Таджикистан' } },
  { code: 'TM', dial: '+993', flag: '🇹🇲', name: { ru: 'Туркменистан', en: 'Turkmenistan', tr: 'Türkmenistan', uk: 'Туркменістан' } },
  { code: 'LT', dial: '+370', flag: '🇱🇹', name: { ru: 'Литва', en: 'Lithuania', tr: 'Litvanya', uk: 'Литва' } },
  { code: 'LV', dial: '+371', flag: '🇱🇻', name: { ru: 'Латвия', en: 'Latvia', tr: 'Letonya', uk: 'Латвія' } },
  { code: 'EE', dial: '+372', flag: '🇪🇪', name: { ru: 'Эстония', en: 'Estonia', tr: 'Estonya', uk: 'Естонія' } },
];

export function getDefaultCountryCode(locale?: string): string {
  if (locale === 'tr') return 'TR';
  if (locale === 'en') return 'US';
  return 'UA';
}

/** Збирає повний номер: +380XXXXXXXXX */
export function formatFullPhone(dial: string, localNumber: string): string {
  const digits = localNumber.replace(/\D/g, '');
  if (!digits) return '';
  return `${dial}${digits}`;
}

/** Розбирає повний номер на код країни + локальний номер (якщо можливо) */
export function parseFullPhone(fullPhone: string): { countryCode: string; localNumber: string } | null {
  if (!fullPhone) return null;
  const normalized = fullPhone.replace(/\s/g, '');
  if (!normalized.startsWith('+')) {
    return { countryCode: 'UA', localNumber: normalized.replace(/\D/g, '') };
  }
  // Сортуємо за довжиною dial (довші спочатку), щоб +998 не сплутати з +9
  const sorted = [...COUNTRY_CODES].sort((a, b) => b.dial.length - a.dial.length);
  for (const c of sorted) {
    if (normalized.startsWith(c.dial)) {
      return {
        countryCode: c.code,
        localNumber: normalized.slice(c.dial.length).replace(/\D/g, ''),
      };
    }
  }
  return { countryCode: 'UA', localNumber: normalized.replace(/\D/g, '') };
}

/**
 * Утиліта для роботи з країнами та прапорами
 */

export type CountryCode = 'TR' | 'AE' | 'GE';

export interface CountryInfo {
  code: CountryCode;
  name: {
    ru: string;
    en: string;
  };
  emoji: string;
}

export const countries: Record<CountryCode, CountryInfo> = {
  TR: {
    code: 'TR',
    name: {
      ru: 'Турция',
      en: 'Turkey',
    },
    emoji: '🇹🇷',
  },
  AE: {
    code: 'AE',
    name: {
      ru: 'ОАЭ',
      en: 'UAE',
    },
    emoji: '🇦🇪',
  },
  GE: {
    code: 'GE',
    name: {
      ru: 'Грузия',
      en: 'Georgia',
    },
    emoji: '🇬🇪',
  },
};

/**
 * Визначає країну за локацією
 */
export function getCountryFromLocation(location: string): CountryInfo | null {
  const locationLower = location.toLowerCase();
  
  // Туреччина
  if (locationLower.includes('турция') || locationLower.includes('turkey') || 
      locationLower.includes('istanbul') || locationLower.includes('istanbul') ||
      locationLower.includes('анкара') || locationLower.includes('ankara')) {
    return countries.TR;
  }
  
  // ОАЕ
  if (locationLower.includes('оаэ') || locationLower.includes('uae') ||
      locationLower.includes('дубай') || locationLower.includes('dubai') ||
      locationLower.includes('абу-даби') || locationLower.includes('abu dhabi')) {
    return countries.AE;
  }
  
  // Грузія
  if (locationLower.includes('грузия') || locationLower.includes('georgia') ||
      locationLower.includes('тбилиси') || locationLower.includes('tbilisi') ||
      locationLower.includes('батуми') || locationLower.includes('batumi')) {
    return countries.GE;
  }
  
  return null;
}

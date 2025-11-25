// Типи для подій та категорій

export interface EventCategory {
  id: string;
  title: {
    ru: string;
    en: string;
  };
  description: {
    ru: string;
    en: string;
  };
  subcategories: {
    ru: string;
    en: string;
  }[];
  icon?: string; // Для майбутнього використання іконок
}

export interface Event {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  date?: string;
  location?: string;
  price?: number;
  duration?: string;
  image?: string;
}


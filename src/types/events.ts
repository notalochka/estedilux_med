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
    description?: {
      ru: string;
      en: string;
    };
  }[];
  icon?: string;
}

export interface Event {
  id: string;
  categoryId: string;
  title: {
    ru: string;
    en: string;
  };
  description?: {
    ru: string;
    en: string;
  };
  date?: string;
  location?: {
    ru: string;
    en: string;
  };
  price?: number;
  duration?: string;
  image?: string;
}


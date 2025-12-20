// Типи для подій та категорій

export interface EventCategory {
  id: number;
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
  id: number;
  categoryId: number;
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
  published?: boolean;  // Чи опублікована подія (для відображення на публічному сайті)
}


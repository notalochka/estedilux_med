// Типи для подій та категорій

export interface EventCategory {
  id: number;
  title: {
    ru: string;
    en: string;
    tr?: string;
    uk?: string;
  };
  description: {
    ru: string;
    en: string;
    tr?: string;
    uk?: string;
  };
  subcategories: {
    ru: string;
    en: string;
    tr?: string;
    uk?: string;
    description?: {
      ru: string;
      en: string;
      tr?: string;
      uk?: string;
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
    tr?: string;
    uk?: string;
  };
  description?: {
    ru: string;
    en: string;
    tr?: string;
    uk?: string;
  };
  date?: string;
  endDate?: string;
  location?: {
    ru: string;
    en: string;
    tr?: string;
    uk?: string;
  };
  price?: number;
  duration?: string;
  image?: string;
  published?: boolean;  // Чи опублікована подія (для відображення на публічному сайті)
}

